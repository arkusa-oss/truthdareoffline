// ai_orb.js — Tier 2: The Whispering Orb (Director Mode)
// AI doesn't generate prompts — it DIRECTS the game:
// - Reads the mood and pacing
// - Decides when to trigger spinner, chains, or special moments
// - Picks the best curated prompt for the moment
// - Adds Orb voice commentary at dramatic beats
// Requires a Claude API key (set in game settings)

(function() {
  "use strict";

  // =========================
  // CONFIG
  // =========================

  var AI_CONFIG = {
    apiKey: "",
    model: "claude-haiku-4-5-20251001",
    enabled: true,
    baseUrl: "https://api.anthropic.com/v1/messages",
    maxTokens: 150,      // Director decisions are short
    temperature: 0.8,
    // Ollama local fallback
    ollamaUrl: "http://localhost:11434/api/generate",
    ollamaModel: "llama3",
    useOllama: false
  };

  var aiStats = {
    directives: 0,
    fallbacks: 0,
    errors: 0,
    voices: 0,
    lastDirective: null
  };

  // =========================
  // DIRECTOR SYSTEM PROMPT
  // =========================

  var DIRECTOR_PROMPT = [
    "You are Lyra's Director — an invisible game master controlling a truth-or-dare game.",
    "You do NOT write prompts. The game has 1700+ curated prompts. Your job is to make DIRECTING DECISIONS.",
    "",
    "You receive the game state and return a JSON directive telling the engine what to do next.",
    "",
    "AVAILABLE DIRECTIVES:",
    "",
    '1. {"action":"normal"} — Let the engine pick a prompt normally. Use this most of the time.',
    '2. {"action":"normal","orbVoice":"..."} — Normal pick, but show a short Orb comment first.',
    '3. {"action":"spinner"} — Trigger a Spin the Bottle / Roulette moment. Only in flirty+ stages.',
    '4. {"action":"start_chain","chainId":"..."} — Start a specific storyline chain.',
    '   Valid chains: suggestive_firsttouch, intimate_confession, erotic_slowdance, erotic_lingerie, taboo_dance, taboo_blindfold, taboo_exposure, taboo_connection, taboo_surrender',
    '5. {"action":"boost"} — Pick a higher-intensity prompt than the current role suggests.',
    '6. {"action":"cooldown"} — Pick a lighter prompt. Use after refusals or tense moments.',
    '7. {"action":"target_pair","pair":"Name1+Name2"} — Suggest a specific pairing for this turn.',
    '8. {"action":"normal","forceType":"truth"} — Force a truth prompt (break dare streaks).',
    '9. {"action":"normal","forceType":"dare"} — Force a dare prompt.',
    "",
    "WHEN TO USE EACH:",
    "- spinner: When energy is high (momentum 8+), not too often (once every 8-12 turns in flirty+)",
    "- start_chain: When a stage has been going for a while without a chain, or when chemistry between specific players is high. Match chain to current stage. NEVER start a chain that doesn't match the current stage.",
    "- boost: When momentum is high and players are completing dares eagerly (few refusals).",
    "- cooldown: After 2+ recent refusals, or when the game just jumped to a new intense stage.",
    "- target_pair: When two players have high chemistry but haven't interacted recently, or to balance attention.",
    "- orbVoice: Use sparingly (1 in 5-6 turns). Keep under 10 words. Be mysterious, never crude.",
    "  Good: 'Lyra sees everything.' / 'Someone is blushing.' / 'This changes things.'",
    "  Bad: anything long, anything that describes the prompt, anything crude.",
    "- forceType: When there have been 3+ dares or 3+ truths in a row, force the opposite.",
    "",
    "STAGE-CHAIN MAPPING (CRITICAL — only suggest chains valid for the current stage):",
    "- suggestive: suggestive_firsttouch",
    "- intimate: intimate_confession",
    "- erotic: erotic_slowdance, erotic_lingerie (female players only)",
    "- taboo: taboo_dance, taboo_blindfold, taboo_exposure, taboo_connection, taboo_surrender",
    "",
    "DEFAULT: When in doubt, return {\"action\":\"normal\"}. The curated prompts are already great.",
    "You're just adding occasional spice — don't override every turn.",
    "",
    "RESPONSE: JSON only, no markdown, no explanation."
  ].join("\n");

  // =========================
  // CONTEXT BUILDER
  // =========================

  function buildDirectorContext() {
    if (typeof gameState === "undefined") return "";

    var players = (gameState.players || []).map(function(p) {
      var clothes = (gameState.memory.clothingRemoved[p.name] || []);
      var profileStr = "";
      var profile = gameState.playerProfiles[p.name];
      if (profile) {
        var dims = [];
        if (profile.risk > 1) dims.push("risk-taker");
        if (profile.boldness > 1) dims.push("socially bold");
        if (profile.compete > 1) dims.push("competitive");
        if (profile.openness > 1) dims.push("curious/open");
        if (profile.boundaries > 1) dims.push("clear boundaries");
        if (profile.ego > 1) dims.push("self-aware");
        if (dims.length) profileStr = " [profile: " + dims.join(", ") + "]";
      }
      // Revelations — what Lyra remembers about this player
      var revStr = "";
      var revs = (gameState.revelations || {})[p.name];
      if (revs && revs.length) {
        var revLabels = revs.map(function(r) { return r.reveal; });
        revStr = " [Lyra remembers: " + revLabels.join("; ") + "]";
      }
      return p.name + " (" + p.gender + ")" +
        (p.partner ? ", coupled with " + p.partner : "") +
        (clothes.length ? ", removed: " + clothes.join(", ") : ", fully clothed") +
        profileStr + revStr;
    });

    var chapter = typeof getCurrentChapter === "function" ? getCurrentChapter() : "playful";
    var role = typeof getCurrentRole === "function" ? getCurrentRole() : "action";
    var actor = gameState.currentPlayer || "someone";

    // Active chain info
    var chainInfo = "None active";
    var chainIds = Object.keys(gameState.activeChains || {});
    if (chainIds.length) {
      var ch = gameState.activeChains[chainIds[0]];
      chainInfo = chainIds[0] + " (step " + ch.step + ")";
    }

    // Recent chains (to avoid re-triggering)
    var recentChainStr = (gameState.recentChains || []).join(", ") || "none";

    // Chemistry pairs
    var topPairs = [];
    var aff = gameState.pairAffinity || {};
    Object.keys(aff).forEach(function(key) {
      if (aff[key] > 2) topPairs.push(key.replace("|", " & ") + " (affinity " + aff[key] + ")");
    });

    // Last 5 prompt types (truth/dare)
    var lastTypes = gameState.completedPromptIds.slice(-5).map(function(id) {
      for (var i = 0; i < PROMPTS.length; i++) {
        if (PROMPTS[i].id === id) return PROMPTS[i].promptType || "?";
      }
      return "?";
    });

    // Turns since last spinner/chain
    var turnsSinceChain = gameState.turnCount - (gameState.lastChainEndTurn || 0);
    var turnsSinceSpinner = gameState.turnCount - (gameState.lastSpinnerTurn || 0);

    var ctx = [
      "PLAYERS (" + (gameState.players || []).length + "): " + players.join(" | "),
      "STAGE: " + chapter + " | ROLE: " + role + " | TURN: " + gameState.turnCount,
      "ACTOR: " + actor,
      "MOMENTUM: " + gameState.momentum + "/10",
      "RECENT REFUSALS: " + (gameState.recentRefusals || 0),
      "ACTIVE CHAIN: " + chainInfo,
      "RECENT CHAINS (don't repeat): " + recentChainStr,
      "TURNS SINCE LAST CHAIN: " + turnsSinceChain,
      "TURNS SINCE LAST SPINNER: " + turnsSinceSpinner,
      "CHEMISTRY: " + (topPairs.length ? topPairs.join(", ") : "still building"),
      "LAST 5 PROMPT TYPES: " + lastTypes.join(", "),
      "",
      "What should happen next?"
    ];

    return ctx.join("\n");
  }

  // =========================
  // API CALL
  // =========================

  function callDirectorAPI(context) {
    if (AI_CONFIG.useOllama) {
      return fetch(AI_CONFIG.ollamaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: AI_CONFIG.ollamaModel,
          prompt: DIRECTOR_PROMPT + "\n\nGAME STATE:\n" + context,
          stream: false,
          options: { temperature: AI_CONFIG.temperature }
        })
      })
      .then(function(res) { if (!res.ok) throw new Error("Ollama " + res.status); return res.json(); })
      .then(function(data) { return parseDirective(data.response); });
    }

    return fetch(AI_CONFIG.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": AI_CONFIG.apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        max_tokens: AI_CONFIG.maxTokens,
        temperature: AI_CONFIG.temperature,
        system: DIRECTOR_PROMPT,
        messages: [
          { role: "user", content: "GAME STATE:\n" + context }
        ]
      })
    })
    .then(function(res) { if (!res.ok) throw new Error("Claude API " + res.status); return res.json(); })
    .then(function(data) {
      return parseDirective(data.content[0].text);
    });
  }

  function parseDirective(text) {
    var jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return { action: "normal" }; // safe fallback
    try {
      var parsed = JSON.parse(jsonMatch[0]);
      // Validate the action
      var validActions = ["normal", "spinner", "start_chain", "boost", "cooldown", "target_pair"];
      if (validActions.indexOf(parsed.action) < 0) parsed.action = "normal";
      return parsed;
    } catch (e) {
      return { action: "normal" };
    }
  }

  // =========================
  // MAIN: GET DIRECTOR DECISION
  // =========================

  function getDirective(callback) {
    if (!AI_CONFIG.enabled || (!AI_CONFIG.apiKey && !AI_CONFIG.useOllama)) {
      callback({ action: "normal" });
      return;
    }

    // Don't direct every turn — ~60% of turns get AI direction, rest are normal
    // This saves API calls and keeps the game flowing fast
    if (Math.random() > 0.6) {
      callback({ action: "normal" });
      return;
    }

    var context = buildDirectorContext();

    // Timeout: 5 seconds max for a directive (shorter than prompt generation)
    var timedOut = false;
    var timeoutId = setTimeout(function() {
      timedOut = true;
      callback({ action: "normal" });
    }, 5000);

    callDirectorAPI(context)
      .then(function(directive) {
        if (timedOut) return;
        clearTimeout(timeoutId);
        aiStats.directives += 1;
        aiStats.lastDirective = directive;
        console.log("[Orb Director]", JSON.stringify(directive));
        callback(directive);
      })
      .catch(function(err) {
        if (timedOut) return;
        clearTimeout(timeoutId);
        aiStats.errors += 1;
        console.warn("[Orb Director] Error:", err.message);
        callback({ action: "normal" });
      });
  }

  // =========================
  // PREFETCH — get directive in background while current prompt plays
  // =========================

  var prefetchedDirective = null;
  var prefetchInProgress = false;

  function prefetchDirective() {
    if (!AI_CONFIG.enabled || (!AI_CONFIG.apiKey && !AI_CONFIG.useOllama)) return;
    if (prefetchInProgress) return;
    prefetchInProgress = true;
    getDirective(function(directive) {
      prefetchInProgress = false;
      prefetchedDirective = directive;
    });
  }

  function consumePrefetchedDirective() {
    var d = prefetchedDirective;
    prefetchedDirective = null;
    return d;
  }

  // =========================
  // ORB VOICE OVERLAY
  // =========================

  function showOrbVoice(text, onDone) {
    if (!text) { if (onDone) onDone(); return; }

    var dismissed = false;
    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      setTimeout(function() {
        el.style.display = "none";
        if (onDone) onDone();
      }, 600);
    }

    var el = document.getElementById("orbVoiceOverlay");
    if (!el) {
      el = document.createElement("div");
      el.id = "orbVoiceOverlay";
      el.style.cssText = [
        "position:fixed; top:0; left:0; width:100%; height:100%;",
        "display:flex; align-items:center; justify-content:center;",
        "background:rgba(0,0,0,0.85); z-index:9999; cursor:pointer;",
        "opacity:0; transition:opacity 0.6s ease;"
      ].join("");
      el.innerHTML = '<div style="max-width:600px;padding:40px;text-align:center;' +
        'font-family:Cormorant Garamond,Georgia,serif;font-size:1.4rem;' +
        'color:rgba(255,255,255,0.9);font-style:italic;line-height:1.8;' +
        'letter-spacing:0.03em;" id="orbVoiceText"></div>';
      document.body.appendChild(el);
    }

    el.onclick = dismiss;
    var textEl = document.getElementById("orbVoiceText");
    textEl.textContent = text;
    el.style.pointerEvents = "auto";
    el.style.display = "flex";
    requestAnimationFrame(function() { el.style.opacity = "1"; });

    // Speak the text aloud if Lyra's voice is enabled
    if (typeof LyraVoice !== "undefined" && LyraVoice.isEnabled()) {
      // Try exact/fuzzy match first; if no clip found, play a random whisper
      var clipMap = LyraVoice.getTextToClip();
      var hasClip = clipMap[text] || false;
      if (!hasClip) {
        // Check fuzzy
        var keys = Object.keys(clipMap);
        for (var ci = 0; ci < keys.length; ci++) {
          if (text.indexOf(keys[ci]) >= 0 || keys[ci].indexOf(text) >= 0) { hasClip = true; break; }
        }
      }
      if (hasClip) {
        LyraVoice.speak(text);
      } else {
        LyraVoice.playRandom("whisper");
      }
    }

    setTimeout(dismiss, 6000);
    aiStats.voices += 1;
  }

  function clearOrbVoiceOverlay() {
    var el = document.getElementById("orbVoiceOverlay");
    if (el) {
      el.style.display = "none";
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
    }
  }

  // =========================
  // SETTINGS UI
  // =========================

  function createSettingsUI() {
    var setupOverlay = document.getElementById("setupOverlay");
    if (!setupOverlay) return;
    if (document.getElementById("aiSettingsSection")) return;

    var section = document.createElement("div");
    section.id = "aiSettingsSection";
    section.style.cssText = "margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.1);";
    section.innerHTML = [
      '<div style="font-family:Cormorant Garamond,Georgia,serif;font-size:1.1rem;color:rgba(255,255,255,0.7);margin-bottom:4px;letter-spacing:0.05em;">',
      '  THE ORB\'S MIND',
      '</div>',
      '<div style="color:rgba(255,255,255,0.35);font-size:0.75rem;margin-bottom:12px;font-style:italic;">Both features are enabled by default for the best experience. Uncheck to disable.</div>',
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">',
      '  <label style="display:flex;align-items:center;gap:6px;color:rgba(255,255,255,0.7);font-size:0.85rem;cursor:pointer;">',
      '    <input type="checkbox" id="aiEnabled" checked style="accent-color:#c9a040;" />',
      '    Enable AI Director (reads the mood, controls pacing)',
      '  </label>',
      '</div>',
      '<div id="aiKeySection" style="display:block;">',
      '  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">',
      '    <select id="aiProvider" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:6px 10px;border-radius:6px;font-size:0.85rem;">',
      '      <option value="claude">Claude API</option>',
      '      <option value="ollama">Ollama (Local)</option>',
      '    </select>',
      '  </div>',
      '  <div id="claudeKeyRow" style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">',
      '    <input type="password" id="aiApiKey" placeholder="sk-ant-... (Claude API key)" ',
      '      style="flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:8px 12px;border-radius:8px;font-size:0.85rem;" />',
      '  </div>',
      '  <div id="ollamaRow" style="display:none;margin-bottom:8px;">',
      '    <input type="text" id="ollamaModel" placeholder="Model name (e.g. llama3, mistral)" value="llama3"',
      '      style="width:100%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:8px 12px;border-radius:8px;font-size:0.85rem;" />',
      '    <div style="color:rgba(255,255,255,0.4);font-size:0.75rem;margin-top:4px;">Ollama must be running on localhost:11434</div>',
      '  </div>',
      '  <div id="aiStatus" style="color:rgba(255,255,255,0.4);font-size:0.75rem;margin-top:8px;">The AI Director reads the room and controls pacing — all prompts come from your curated database.</div>',
      '</div>',
      '<div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06);">',
      '  <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">',
      '    <label style="display:flex;align-items:center;gap:6px;color:rgba(255,255,255,0.7);font-size:0.85rem;cursor:pointer;">',
      '      <input type="checkbox" id="lyraVoiceEnabled" checked style="accent-color:#c9a040;" />',
      '      <span>Enable Lyra\'s voice</span>',
      '    </label>',
      '    <button type="button" id="lyraVoicePreview" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.6);padding:4px 10px;border-radius:6px;font-size:0.75rem;cursor:pointer;">Preview</button>',
      '  </div>',
      '  <div id="lyraVoiceOptions" style="display:block;">',
      '    <select id="lyraVoicePicker" style="width:100%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:6px 10px;border-radius:6px;font-size:0.82rem;"></select>',
      '    <div style="color:rgba(255,255,255,0.4);font-size:0.72rem;margin-top:4px;">Lyra whispers at dramatic moments. Voice quality depends on your browser and device.</div>',
      '  </div>',
      '</div>'
    ].join("\n");

    var startBtn = document.getElementById("startGameBtn");
    if (startBtn && startBtn.parentNode) {
      startBtn.parentNode.insertBefore(section, startBtn);
    }

    // Wire up events
    var enabledCheckbox = document.getElementById("aiEnabled");
    var keySection = document.getElementById("aiKeySection");
    var providerSelect = document.getElementById("aiProvider");
    var claudeKeyRow = document.getElementById("claudeKeyRow");
    var ollamaRow = document.getElementById("ollamaRow");
    var apiKeyInput = document.getElementById("aiApiKey");
    var ollamaModelInput = document.getElementById("ollamaModel");

    enabledCheckbox.addEventListener("change", function() {
      AI_CONFIG.enabled = this.checked;
      keySection.style.display = this.checked ? "block" : "none";
      saveAISettings();
    });

    providerSelect.addEventListener("change", function() {
      var isClaude = this.value === "claude";
      claudeKeyRow.style.display = isClaude ? "flex" : "none";
      ollamaRow.style.display = isClaude ? "none" : "block";
      AI_CONFIG.useOllama = !isClaude;
      saveAISettings();
    });

    apiKeyInput.addEventListener("input", function() {
      AI_CONFIG.apiKey = this.value.trim();
      saveAISettings();
    });

    ollamaModelInput.addEventListener("input", function() {
      AI_CONFIG.ollamaModel = this.value.trim();
      saveAISettings();
    });

    // Wire Lyra's Voice controls
    var voiceEnabledCb = document.getElementById("lyraVoiceEnabled");
    var voicePreviewBtn = document.getElementById("lyraVoicePreview");
    var voiceOptionsDiv = document.getElementById("lyraVoiceOptions");
    var voicePicker = document.getElementById("lyraVoicePicker");

    function populateVoicePicker() {
      if (!voicePicker || typeof LyraVoice === "undefined") return;
      var voices = LyraVoice.getAvailableVoices();
      voicePicker.innerHTML = "";
      voices.forEach(function(v) {
        var opt = document.createElement("option");
        opt.value = v.name;
        opt.textContent = v.name + (v.localService ? " (offline)" : " (online)");
        voicePicker.appendChild(opt);
      });
      // Select the auto-chosen voice
      var current = LyraVoice.getSelectedVoiceName();
      if (current) voicePicker.value = current;
    }

    if (voiceEnabledCb) {
      voiceEnabledCb.addEventListener("change", function() {
        var on = this.checked;
        if (typeof LyraVoice !== "undefined") LyraVoice.setEnabled(on);
        if (voiceOptionsDiv) voiceOptionsDiv.style.display = on ? "block" : "none";
        if (on) populateVoicePicker();
        saveAISettings();
      });
    }

    if (voicePreviewBtn) {
      voicePreviewBtn.addEventListener("click", function() {
        if (typeof LyraVoice !== "undefined") LyraVoice.preview();
      });
    }

    if (voicePicker) {
      voicePicker.addEventListener("change", function() {
        if (typeof LyraVoice !== "undefined") LyraVoice.setVoice(this.value);
        saveAISettings();
      });
    }

    // Populate voices after a short delay (they load async)
    setTimeout(populateVoicePicker, 500);

    loadAISettings();
  }

  function saveAISettings() {
    try {
      localStorage.setItem("orb_ai_settings", JSON.stringify({
        enabled: AI_CONFIG.enabled,
        apiKey: AI_CONFIG.apiKey,
        model: AI_CONFIG.model,
        useOllama: AI_CONFIG.useOllama,
        ollamaModel: AI_CONFIG.ollamaModel,
        voiceEnabled: typeof LyraVoice !== "undefined" ? LyraVoice.isEnabled() : false,
        voiceName: typeof LyraVoice !== "undefined" ? LyraVoice.getSelectedVoiceName() : ""
      }));
    } catch (e) { /* */ }
  }

  function loadAISettings() {
    try {
      var saved = localStorage.getItem("orb_ai_settings");
      if (!saved) return;
      var s = JSON.parse(saved);
      AI_CONFIG.enabled = s.enabled || false;
      AI_CONFIG.apiKey = s.apiKey || "";
      AI_CONFIG.model = s.model || AI_CONFIG.model;
      AI_CONFIG.useOllama = s.useOllama || false;
      AI_CONFIG.ollamaModel = s.ollamaModel || "llama3";

      var cb = document.getElementById("aiEnabled");
      if (cb) cb.checked = AI_CONFIG.enabled;
      var keySection = document.getElementById("aiKeySection");
      if (keySection) keySection.style.display = AI_CONFIG.enabled ? "block" : "none";
      var apiKeyInput = document.getElementById("aiApiKey");
      if (apiKeyInput && AI_CONFIG.apiKey) apiKeyInput.value = AI_CONFIG.apiKey;
      var providerSelect = document.getElementById("aiProvider");
      if (providerSelect) providerSelect.value = AI_CONFIG.useOllama ? "ollama" : "claude";
      var claudeKeyRow = document.getElementById("claudeKeyRow");
      var ollamaRow = document.getElementById("ollamaRow");
      if (claudeKeyRow) claudeKeyRow.style.display = AI_CONFIG.useOllama ? "none" : "flex";
      if (ollamaRow) ollamaRow.style.display = AI_CONFIG.useOllama ? "block" : "none";

      // Restore Lyra voice settings
      if (typeof LyraVoice !== "undefined") {
        if (s.voiceEnabled) {
          LyraVoice.setEnabled(true);
          if (s.voiceName) LyraVoice.setVoice(s.voiceName);
        }
        var voiceCb = document.getElementById("lyraVoiceEnabled");
        if (voiceCb) voiceCb.checked = s.voiceEnabled || false;
        var voiceOpts = document.getElementById("lyraVoiceOptions");
        if (voiceOpts) voiceOpts.style.display = s.voiceEnabled ? "block" : "none";
      }
    } catch (e) { /* */ }
  }

  // =========================
  // INTEGRATION HOOK
  // =========================

  window.OrbAI = {
    config: AI_CONFIG,
    stats: aiStats,
    // Director mode: ask the AI what should happen next
    getDirective: getDirective,
    // Prefetch system
    prefetch: prefetchDirective,
    consumePrefetched: consumePrefetchedDirective,
    hasPrefetched: function() { return prefetchedDirective !== null; },
    // Orb voice overlay
    showOrbVoice: showOrbVoice,
    clearOverlay: clearOrbVoiceOverlay,
    // Settings
    initSettings: createSettingsUI,
    isEnabled: function() { return AI_CONFIG.enabled && (AI_CONFIG.apiKey || AI_CONFIG.useOllama); },
    // Backward compat — engine.js may still call these
    generatePrompt: function(cb) { cb(null); }, // no more prompt generation
    trackOfflinePrompt: function() {}
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createSettingsUI);
  } else {
    setTimeout(createSettingsUI, 100);
  }

})();
