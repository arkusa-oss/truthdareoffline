// ai_orb.js — Lyra's Mind: the AI Author
// =========================================
// When enabled, Lyra WRITES the next prompt herself instead of picking one
// from the curated pool. The game sends the night's context to the Worker
// (worker/src/ai.js), which holds the Anthropic key; the browser never sees
// a key. Everything Lyra returns is validated by the engine (stage ladder,
// wardrobe, valid target) and falls back to the curated pool on any doubt.
//
// Config:  window.ORB_AI_ENDPOINT  (index.html) — empty = feature hidden.
//          localStorage orb_ai_settings { enabled, code }
// Public:  window.OrbAI.isEnabled(), takePrompt(actor, cb), prefetch(),
//          showOrbVoice(text, cb), stats
//
// Chains, follow-throughs, bridges and story beats keep priority over Lyra's
// own writing — the engine decides when to ask her.

(function() {
  "use strict";

  var ENDPOINT = (typeof window !== "undefined" && typeof window.ORB_AI_ENDPOINT === "string") ? window.ORB_AI_ENDPOINT.trim() : "";
  var SETTINGS_KEY = "orb_ai_settings";
  var TIMEOUT_MS = 9000;
  var RECENT_TURNS = 10;

  var settings = { enabled: false, code: "" };
  try {
    var saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
    if (saved && typeof saved === "object") { settings.enabled = !!saved.enabled; settings.code = String(saved.code || ""); }
  } catch (e) {}
  function persistSettings() { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {} }

  var session = null;
  function sessionId() {
    if (session) return session;
    var s = "";
    try {
      var a = new Uint8Array(12); crypto.getRandomValues(a);
      for (var i = 0; i < a.length; i++) s += ("0" + a[i].toString(16)).slice(-2);
    } catch (e) { s = String(Date.now()) + Math.random().toString(16).slice(2); }
    session = s;
    return s;
  }

  var stats = { requests: 0, served: 0, rejected: 0, errors: 0, lastError: null, lastUsage: null, disabledUntil: 0 };
  var outcomes = {}; // turn number -> response (promptHistory entries carry `turn`)

  function isEnabled() {
    return !!ENDPOINT && settings.enabled && Date.now() >= stats.disabledUntil;
  }

  // =========================
  // CONTEXT
  // =========================

  var CHAPTER_RANGE = { personal: [1, 3], playful: [2, 4], flirty: [4, 5.5], suggestive: [5.5, 6.5], intimate: [7, 8], erotic: [8, 9], taboo: [9, 10] };

  function traitList(name) {
    var prof = gameState.playerProfiles[name];
    if (!prof) return [];
    var out = [];
    if (prof.risk > 1) out.push("risk-taker");
    if (prof.boldness > 1) out.push("bold");
    if (prof.compete > 1) out.push("competitive");
    if (prof.openness > 1) out.push("open");
    if (prof.boundaries > 1) out.push("guards boundaries");
    if (prof.ego > 1) out.push("confident");
    var j = gameState.memory && gameState.memory.jealousy && gameState.memory.jealousy[name];
    if (j === "jealous") out.push("jealous");
    if (j === "not_jealous") out.push("claims not jealous");
    return out;
  }

  function dossierFor(name) {
    var lines = [];
    try {
      if (typeof LyraMemory !== "undefined" && LyraMemory.hasPlayer(name)) {
        var rec = LyraMemory.loadPlayer(name);
        if (rec) {
          (rec.notes || []).slice(-8).forEach(function(n) { lines.push(n.note || n); });
          if (rec.preferredKiss) lines.push("once chose to kiss " + rec.preferredKiss);
          if (rec.firstImpression) lines.push("first noticed " + rec.firstImpression);
        }
      }
    } catch (e) {}
    return lines;
  }

  function buildContext(actor, requestedType) {
    var chapter = getCurrentChapter();
    var players = gameState.players.map(function(p) {
      var rec = null;
      try { rec = (typeof LyraMemory !== "undefined" && LyraMemory.hasPlayer(p.name)) ? LyraMemory.loadPlayer(p.name) : null; } catch (e) {}
      var revealed = ((gameState.revelations || {})[p.name] || []).map(function(r) { return r.reveal; }).filter(Boolean).slice(-6);
      return {
        name: p.name, gender: p.gender, partner: p.partner || null, isSeducer: !!p.isSeducer,
        removed: (gameState.memory.clothingRemoved[p.name] || []).slice(),
        fullyUndressed: !!(gameState.memory.fullyUndressed && gameState.memory.fullyUndressed[p.name]),
        traits: traitList(p.name),
        nightsPlayed: rec ? (rec.nightsPlayed || 0) : 0,
        dossier: dossierFor(p.name),
        revealed: revealed,
        object: p.object || null
      };
    });
    var chem = [];
    Object.keys(gameState.pairAffinity || {}).forEach(function(k) {
      if (gameState.pairAffinity[k] >= 3) chem.push(k.replace("|", " & ") + " (" + gameState.pairAffinity[k] + ")");
    });
    var recent = gameState.promptHistory.slice(-RECENT_TURNS).map(function(h) {
      return { chapter: h.chapter, actor: h.player, target: h.target || null, type: h.promptType || null, response: outcomes[h.turn] || null, text: String(h.text || "").slice(0, 160) };
    });
    var lastTypes = gameState.promptHistory.slice(-4).map(function(h) { return h.promptType || "?"; });
    var story = null, limits = [];
    try {
      if (typeof OrbStory !== "undefined") {
        var n = OrbStory.narrative();
        limits = Object.keys(n.limits || {}).filter(function(k) { return n.limits[k]; });
        if (OrbStory.isActive()) {
          var st = OrbStory.activeStory();
          var ready = [], missing = [];
          st.props.forEach(function(pr) { (OrbStory.propReady(pr.id) ? ready : missing).push(pr.label); });
          story = {
            name: st.name, chapterTitle: (st.chapters[chapter] || {}).title || "",
            propsReady: ready, propsMissing: missing, limits: limits,
            moments: (n.moments || []).slice(-6).map(function(m) { return m.kind + ": " + m.actor + (m.target ? "->" + m.target : "") + " [" + m.chapter + "]"; })
          };
        }
      }
    } catch (e) {}
    return {
      lang: (typeof GAME_LANG !== "undefined") ? GAME_LANG : "en",
      mode: gameState.gameMode, chapter: chapter, role: getCurrentRole(), turn: gameState.turnCount,
      momentum: gameState.momentum, recentRefusals: gameState.recentRefusals,
      actor: actor, requestedType: requestedType || null,
      players: players, chemistry: chem, story: story, limits: limits, recent: recent, lastTypes: lastTypes
    };
  }

  // =========================
  // VALIDATION — the engine, not the model, owns the ladder
  // =========================

  function validate(raw, actor) {
    if (!raw || typeof raw.text !== "string") return null;
    var text = raw.text.trim().replace(/\s+/g, " ");
    if (text.length < 8 || text.length > 320) return null;
    if (/\{[a-z_]+\}/i.test(text)) return null;                    // placeholders leaked
    if (/\bseducer\b|\bseductor/i.test(text)) return null;          // secret role named
    var chapter = getCurrentChapter();
    var range = CHAPTER_RANGE[chapter] || [1, 10];
    var intensity = Number(raw.intensity);
    if (!isFinite(intensity)) intensity = range[0];
    intensity = Math.max(range[0], Math.min(range[1], intensity));
    var promptType = raw.promptType === "truth" ? "truth" : "dare";
    var target = null;
    if (raw.target) {
      var tObj = getPlayerByName(String(raw.target));
      if (!tObj || tObj.name === actor) return null;
      target = tObj.name;
    }
    if (isCouplesMode()) {
      if (/\beveryone\b|\btodos\b/i.test(text)) return null;
      var others = getOtherPlayerNames(actor);
      if (!target && others.length === 1 && text.indexOf(others[0]) >= 0) target = others[0];
    } else if (!target) {
      // A named other player in the text without a target field: adopt it
      var mentioned = getOtherPlayerNames(actor).filter(function(nm) { return new RegExp("\\b" + nm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(text); });
      if (mentioned.length === 1) target = mentioned[0];
    }
    var prompt = {
      id: "AI_" + gameState.turnCount + "_" + Math.floor(Math.random() * 1e6),
      chapter: chapter, role: getCurrentRole(), type: target ? "directed" : "self",
      promptType: promptType, intensity: intensity, text: text, target: target ? "other" : "self",
      _ai: true, _textResolved: true,
      orb_voice: (typeof raw.lyraLine === "string" && raw.lyraLine.trim() && raw.lyraLine.length <= 80) ? raw.lyraLine.trim() : null
    };
    // Ladder + wardrobe: the same checks every curated prompt passes
    if (promptType === "dare" && typeof clothingContradiction === "function" && clothingContradiction(prompt, actor)) return null;
    if (promptType === "dare" && target && typeof undressBlockedFor === "function") {
      var info = getPromptUndressInfo(prompt);
      if (info && (info.subject === "target" || info.subject === "both") && undressBlockedFor(prompt, target, info)) return null;
    }
    if (typeof chapterNumber === "function" && chapterNumber() < 5) {
      if (/\b(bra|underwear|panties|boxers|naked|nude|nipple|breast|genital|cock|pussy|orgasm)\b/i.test(text)) return null;
      if (/\b(undress|strip|take off|peel off|remove)\b/i.test(text) && chapterNumber() < 4) return null;
    }
    if (typeof chapterNumber === "function" && chapterNumber() < 3 && /\bkiss\b/i.test(text) && !/\b(cheek|forehead|hand|air)\b/i.test(text)) return null;
    return { prompt: prompt, actor: actor, target: target, notes: Array.isArray(raw.memoryNotes) ? raw.memoryNotes.slice(0, 2) : [] };
  }

  // =========================
  // MEMORY NOTES → dossier (persists only if the host keeps Lyra's memory)
  // =========================

  function applyNotes(notes) {
    if (!notes || !notes.length || typeof LyraMemory === "undefined") return;
    notes.forEach(function(n) {
      if (!n || !n.player || !n.note) return;
      var pObj = getPlayerByName(String(n.player));
      if (!pObj) return;
      try {
        var rec = LyraMemory.loadPlayer(pObj.name) || {};
        var list = (rec.notes || []).slice(-19);
        var note = String(n.note).slice(0, 120);
        if (list.some(function(x) { return (x.note || x) === note; })) return;
        list.push({ note: note, turn: gameState.turnCount, at: new Date().toISOString().slice(0, 10) });
        LyraMemory.savePlayer(pObj.name, { notes: list });
      } catch (e) {}
      try { if (typeof OrbStory !== "undefined") OrbStory.recordMoment("note", pObj.name, null, String(n.note)); } catch (e) {}
    });
  }

  // =========================
  // FETCH + PREFETCH
  // =========================

  function request(ctx) {
    stats.requests += 1;
    var ctrl = (typeof AbortController !== "undefined") ? new AbortController() : null;
    var timer = setTimeout(function() { if (ctrl) ctrl.abort(); }, TIMEOUT_MS);
    return fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session: sessionId(), code: settings.code || undefined, context: ctx }),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function(res) {
      clearTimeout(timer);
      return res.json().then(function(j) { j._status = res.status; return j; });
    }).then(function(j) {
      if (!j.ok) {
        var err = new Error(j.error || ("http " + j._status));
        err.code = j.error; err.status = j._status;
        throw err;
      }
      stats.lastUsage = j.usage || null;
      return j.prompt;
    }).catch(function(e) {
      clearTimeout(timer);
      stats.errors += 1;
      stats.lastError = e.code || e.message;
      // Budget or auth problems: stop asking for the rest of the night
      if (e.status === 401 || e.status === 429 || e.status === 503) stats.disabledUntil = Date.now() + 6 * 3600 * 1000;
      else if (e.status === 502 || e.status === 500) stats.disabledUntil = Date.now() + 60 * 1000;
      setStatus(statusText());
      throw e;
    });
  }

  var prefetched = null;   // { actor, chapter, turn, promise, result }
  function prefetch() {
    if (!isEnabled()) return;
    if (gameState.followThroughQueue || gameState.postChainBridge) return;
    if (typeof getActiveChainIds === "function" && getActiveChainIds().length) return;
    if (prefetched && !prefetched.result) return; // one in flight
    var actor = chooseNextPlayer(true);
    if (!actor) return;
    var entry = { actor: actor, chapter: getCurrentChapter(), turn: gameState.turnCount, result: null };
    entry.promise = request(buildContext(actor, null)).then(function(raw) {
      entry.result = { raw: raw }; return entry;
    }).catch(function() { entry.result = { raw: null }; return entry; });
    prefetched = entry;
  }

  // Engine hook. cb(selected|null). The engine already chose `actor` by its
  // rotation; a prefetched prompt is used when it was written for that actor
  // in this chapter, otherwise Lyra writes one now (short wait).
  function takePrompt(actor, cb) {
    if (!isEnabled()) { cb(null); return; }
    var pf = prefetched;
    prefetched = null;
    function finish(raw) {
      var sel = null;
      try { sel = validate(raw, actor); } catch (e) { sel = null; }
      if (sel) { stats.served += 1; applyNotes(sel.notes); }
      else if (raw) stats.rejected += 1;
      cb(sel ? { prompt: sel.prompt, actor: sel.actor, target: sel.target } : null);
    }
    if (pf && pf.actor === actor && pf.chapter === getCurrentChapter()) {
      if (pf.result) { finish(pf.result.raw); return; }
      showThinking(true);
      pf.promise.then(function(e) { showThinking(false); finish(e.result && e.result.raw); });
      return;
    }
    showThinking(true);
    request(buildContext(actor, null)).then(function(raw) { showThinking(false); finish(raw); })
      .catch(function() { showThinking(false); finish(null); });
  }

  function showThinking(on) {
    var el = document.getElementById("promptText");
    if (!el) return;
    if (on) {
      el.textContent = T("ai.thinking", "Lyra is thinking…");
      el.style.opacity = "0.55";
      el.classList.add("is-thinking");
    } else {
      el.classList.remove("is-thinking");
      el.style.opacity = "0"; // back to the pre-reveal state nextTurn left; the reveal animation takes over
    }
  }
  function clearPrefetch() { prefetched = null; }

  // =========================
  // ORB VOICE OVERLAY — Lyra's short line before a prompt
  // =========================

  function showOrbVoice(text, onDone) {
    if (!text) { if (onDone) onDone(); return; }
    var done = false;
    function dismiss() {
      if (done) return; done = true;
      el.style.opacity = "0"; el.style.pointerEvents = "none";
      setTimeout(function() { el.style.display = "none"; if (onDone) onDone(); }, 500);
    }
    var el = document.getElementById("orbVoiceOverlay");
    if (!el) {
      el = document.createElement("div");
      el.id = "orbVoiceOverlay";
      el.className = "orb-voice-overlay";
      el.innerHTML = '<div class="orb-voice-text" id="orbVoiceText"></div>';
      document.body.appendChild(el);
    }
    el.onclick = dismiss;
    document.getElementById("orbVoiceText").textContent = text;
    el.style.pointerEvents = "auto"; el.style.display = "flex";
    requestAnimationFrame(function() { el.style.opacity = "1"; });
    try { if (typeof LyraVoice !== "undefined" && LyraVoice.isEnabled()) LyraVoice.speak(text); } catch (e) {}
    setTimeout(dismiss, 4500);
  }

  // =========================
  // OUTCOMES — remember how each prompt went (feeds the next context)
  // =========================

  if (typeof recordFeedback === "function") {
    var _recordFeedback = recordFeedback;
    recordFeedback = function(response) {
      try { if (gameState.lastPrompt) outcomes[gameState.turnCount] = response; } catch (e) {}
      return _recordFeedback.apply(this, arguments);
    };
  }
  if (typeof resetGame === "function") {
    var _resetGame = resetGame;
    resetGame = function() {
      outcomes = {}; prefetched = null; session = null;
      return _resetGame.apply(this, arguments);
    };
  }

  // =========================
  // SETTINGS (setup screen)
  // =========================

  var statusEl = null;
  function statusText() {
    if (!ENDPOINT) return "";
    if (!settings.enabled) return T("ai.off", "Off — Lyra plays from her curated collection.");
    if (stats.lastError === "unauthorized") return T("ai.bad_code", "That code isn't hers. Lyra plays from her collection tonight.");
    if (stats.lastError === "session_cap" || stats.lastError === "daily_cap") return T("ai.cap", "Lyra has written enough for tonight. Her collection takes over.");
    if (stats.lastError === "not_configured") return T("ai.unavailable", "Lyra's mind is not connected yet.");
    return T("ai.on", "On — Lyra writes each prompt for the people in the room. Needs internet.");
  }
  function setStatus(txt) { if (statusEl) statusEl.textContent = txt; }

  function createSettingsUI() {
    if (!ENDPOINT) return;
    var overlay = document.getElementById("setupOverlay");
    var footer = overlay ? overlay.querySelector(".setup-footer") : null;
    if (!overlay || !footer || document.getElementById("aiSettingsSection")) return;
    var section = document.createElement("div");
    section.id = "aiSettingsSection";
    section.className = "setup-field setup-field-wide ai-settings";
    section.innerHTML =
      '<label for="aiEnabled" class="checkbox-label music-toggle-label">' +
        '<input id="aiEnabled" type="checkbox" autocomplete="off"' + (settings.enabled ? ' checked' : '') + ' />' +
        '<span>' + T("ai.toggle", "Lyra writes her own prompts (AI)") + '</span>' +
      '</label>' +
      '<div class="ai-code-row" id="aiCodeRow">' +
        '<input id="aiCode" type="password" autocomplete="off" placeholder="' + T("ai.code_ph", "Lyra’s code (if you were given one)") + '" />' +
      '</div>' +
      '<div class="setup-field-hint" id="aiStatus"></div>';
    footer.parentNode.insertBefore(section, footer);
    statusEl = document.getElementById("aiStatus");
    var cb = document.getElementById("aiEnabled");
    var codeInput = document.getElementById("aiCode");
    var codeRow = document.getElementById("aiCodeRow");
    codeInput.value = settings.code || "";
    function paint() { codeRow.style.display = settings.enabled ? "" : "none"; setStatus(statusText()); }
    cb.addEventListener("change", function() { settings.enabled = cb.checked; stats.disabledUntil = 0; stats.lastError = null; persistSettings(); paint(); });
    codeInput.addEventListener("input", function() { settings.code = codeInput.value.trim(); stats.disabledUntil = 0; stats.lastError = null; persistSettings(); paint(); });
    paint();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", createSettingsUI);
  else setTimeout(createSettingsUI, 50);

  window.OrbAI = {
    isEnabled: isEnabled,
    takePrompt: takePrompt,
    prefetch: prefetch,
    clearPrefetch: clearPrefetch,
    showOrbVoice: showOrbVoice,
    buildContext: buildContext,
    validate: validate,
    stats: stats,
    settings: settings,
    endpoint: ENDPOINT
  };
})();
