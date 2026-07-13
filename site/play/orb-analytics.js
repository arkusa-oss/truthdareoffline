// =========================
// ORB STATS — first-party, privacy-safe funnel analytics
// =========================
// Tracks how far games get (stage drop-off), by mode and language, entirely in
// localStorage. NO prompt text, NO player names, NO answers ever recorded — only
// stage names, counts, and timestamps. Built for the playtest phase: run the
// game on one device at the table and every session accumulates here.
//
// View the funnel:  add ?stats to the URL, or run  OrbStats.show()  in console.
// Reset the data:   OrbStats.reset()
// Export raw JSON:  OrbStats.export()
//
// Optional remote sink: set window.ORB_STATS_ENDPOINT = "https://..." and each
// event is also POSTed via sendBeacon (fire-and-forget). Off by default.

var OrbStats = (function () {
  "use strict";

  var STAGES = ["personal", "playful", "flirty", "suggestive", "intimate", "erotic", "taboo"];
  var FUNNEL_KEY = "orb_funnel_v1";
  var CURRENT_KEY = "orb_stats_current_v1";

  function now() { return Date.now(); }

  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function save(key, obj) {
    try { localStorage.setItem(key, JSON.stringify(obj)); } catch (e) {}
  }

  function blankFunnel() {
    var byStage = {};
    STAGES.forEach(function (s) { byStage[s] = 0; });
    return {
      games: 0,            // games started
      byStage: byStage,    // games that REACHED each stage (monotonic = drop-off)
      completions: 0,      // games that reached taboo
      byMode: { couple: 0, group: 0 },
      byLang: { en: 0, es: 0 },
      turnsTotal: 0,
      updatedAt: 0
    };
  }

  function getFunnel() { return load(FUNNEL_KEY, blankFunnel()); }

  function beacon(evt, props) {
    var url = (typeof window !== "undefined") ? window.ORB_STATS_ENDPOINT : null;
    if (!url || typeof navigator === "undefined" || !navigator.sendBeacon) return;
    try {
      navigator.sendBeacon(url, JSON.stringify({ e: evt, p: props || {}, t: now() }));
    } catch (e) {}
  }

  // Commit a finished/abandoned game into the aggregate funnel.
  function commit(cg) {
    if (!cg || cg.committed) return;
    var f = getFunnel();
    f.games += 1;
    var idx = STAGES.indexOf(cg.maxStage);
    if (idx < 0) idx = 0;
    for (var i = 0; i <= idx; i++) { f.byStage[STAGES[i]] += 1; }
    if (idx === STAGES.length - 1) f.completions += 1;
    if (cg.mode === "couple" || cg.mode === "group") f.byMode[cg.mode] += 1;
    if (cg.lang === "es") f.byLang.es += 1; else f.byLang.en += 1;
    f.turnsTotal += (cg.turns || 0);
    f.updatedAt = now();
    save(FUNNEL_KEY, f);
    cg.committed = true;
    save(CURRENT_KEY, cg);
    beacon("game_committed", { maxStage: cg.maxStage, mode: cg.mode, lang: cg.lang, turns: cg.turns });
  }

  // A new game begins — commit any prior uncommitted game first.
  function startGame(info) {
    info = info || {};
    var prev = load(CURRENT_KEY, null);
    if (prev && !prev.committed) commit(prev);
    var cg = {
      mode: info.mode || "group",
      lang: info.lang || "en",
      players: info.players || 0,
      maxStage: "personal",
      turns: 0,
      startedAt: now(),
      committed: false
    };
    save(CURRENT_KEY, cg);
    beacon("game_start", { mode: cg.mode, lang: cg.lang, players: cg.players });
  }

  // Record reaching a stage; keeps the furthest one for this game.
  function stage(name, turns) {
    var cg = load(CURRENT_KEY, null);
    if (!cg) { startGame({}); cg = load(CURRENT_KEY, null); }
    var idxNew = STAGES.indexOf(name);
    var idxCur = STAGES.indexOf(cg.maxStage);
    if (idxNew > idxCur) cg.maxStage = name;
    if (typeof turns === "number") cg.turns = turns;
    cg.committed = false;
    save(CURRENT_KEY, cg);
    beacon("stage_reached", { stage: name, turns: cg.turns });
  }

  // Flush the in-progress game (tab close / page hide) so abandons still count.
  function flush() {
    var cg = load(CURRENT_KEY, null);
    if (cg && !cg.committed) commit(cg);
  }

  function report() {
    var f = getFunnel();
    var started = f.games || 0;
    var rows = STAGES.map(function (s) {
      var reached = f.byStage[s] || 0;
      return {
        stage: s,
        reached: reached,
        pct: started ? Math.round((reached / started) * 100) : 0
      };
    });
    return {
      started: started,
      completions: f.completions,
      completionPct: started ? Math.round((f.completions / started) * 100) : 0,
      avgTurns: started ? Math.round(f.turnsTotal / started) : 0,
      byMode: f.byMode,
      byLang: f.byLang,
      funnel: rows
    };
  }

  function reset() {
    save(FUNNEL_KEY, blankFunnel());
    try { localStorage.removeItem(CURRENT_KEY); } catch (e) {}
    return "OrbStats reset.";
  }

  function exportJSON() { return JSON.stringify(getFunnel(), null, 2); }

  // ── Visual funnel panel ──
  function show() {
    if (typeof document === "undefined") return;
    var existing = document.getElementById("orbStatsPanel");
    if (existing) existing.parentNode.removeChild(existing);
    var r = report();

    var wrap = document.createElement("div");
    wrap.id = "orbStatsPanel";
    wrap.setAttribute("style",
      "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;" +
      "background:rgba(2,2,10,0.86);backdrop-filter:blur(4px);font-family:Inter,system-ui,sans-serif;color:#e8e6ff;");

    var maxReached = r.funnel.length ? r.funnel[0].reached : 0;
    var bars = r.funnel.map(function (row) {
      var w = maxReached ? Math.round((row.reached / maxReached) * 100) : 0;
      var drop = "";
      return (
        '<div style="display:flex;align-items:center;gap:10px;margin:4px 0;">' +
          '<div style="width:96px;text-transform:capitalize;font-size:13px;opacity:.85;">' + row.stage + "</div>" +
          '<div style="flex:1;background:rgba(255,255,255,.06);border-radius:6px;overflow:hidden;height:22px;position:relative;">' +
            '<div style="height:100%;width:' + w + '%;background:linear-gradient(90deg,#6f7bff,#c86bff);"></div>' +
          "</div>" +
          '<div style="width:118px;text-align:right;font-size:13px;">' + row.reached + " · " + row.pct + "%</div>" +
        "</div>"
      );
    }).join("");

    var card =
      '<div style="width:min(560px,92vw);max-height:88vh;overflow:auto;background:linear-gradient(180deg,#141126,#0b0918);' +
        'border:1px solid rgba(150,120,255,.25);border-radius:16px;padding:22px 24px;box-shadow:0 20px 80px rgba(0,0,0,.6);">' +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">' +
          '<div style="font-size:18px;font-weight:600;letter-spacing:.02em;">Lyra Stats — stage drop-off</div>' +
          '<button id="orbStatsClose" style="background:none;border:none;color:#b9b6d6;font-size:22px;cursor:pointer;line-height:1;">×</button>' +
        "</div>" +
        '<div style="font-size:13px;opacity:.75;margin-bottom:16px;">' +
          r.started + " games · " + r.completions + " reached taboo (" + r.completionPct + "%) · avg " + r.avgTurns + " turns" +
        "</div>" +
        bars +
        '<div style="display:flex;gap:18px;margin-top:16px;font-size:13px;opacity:.85;flex-wrap:wrap;">' +
          "<div>Couple: <b>" + r.byMode.couple + "</b> · Group: <b>" + r.byMode.group + "</b></div>" +
          "<div>EN: <b>" + r.byLang.en + "</b> · ES: <b>" + r.byLang.es + "</b></div>" +
        "</div>" +
        '<div style="margin-top:18px;display:flex;gap:8px;">' +
          '<button id="orbStatsExport" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(150,120,255,.3);background:rgba(255,255,255,.04);color:#e8e6ff;cursor:pointer;">Copy JSON</button>' +
          '<button id="orbStatsReset" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(255,90,90,.35);background:rgba(255,60,60,.08);color:#ffbcbc;cursor:pointer;">Reset data</button>' +
        "</div>" +
      "</div>";
    wrap.innerHTML = card;
    document.body.appendChild(wrap);

    function close() { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); }
    document.getElementById("orbStatsClose").onclick = close;
    wrap.addEventListener("click", function (e) { if (e.target === wrap) close(); });
    document.getElementById("orbStatsExport").onclick = function () {
      var txt = exportJSON();
      try { navigator.clipboard.writeText(txt); this.textContent = "Copied!"; }
      catch (e) { window.prompt("Copy stats JSON:", txt); }
    };
    document.getElementById("orbStatsReset").onclick = function () {
      if (window.confirm("Erase all recorded stats?")) { reset(); close(); }
    };
  }

  // Auto-flush on tab close so abandoned games are counted.
  if (typeof window !== "undefined") {
    window.addEventListener("pagehide", flush);
    window.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") flush();
    });
    // ?stats in the URL opens the panel once the page is ready.
    if (typeof location !== "undefined" && /[?&]stats\b/.test(location.search)) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () { setTimeout(show, 300); });
      } else { setTimeout(show, 300); }
    }
  }

  return {
    startGame: startGame,
    stage: stage,
    flush: flush,
    report: report,
    show: show,
    reset: reset,
    export: exportJSON,
    STAGES: STAGES
  };
})();

if (typeof window !== "undefined") window.OrbStats = OrbStats;
