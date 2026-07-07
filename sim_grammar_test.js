#!/usr/bin/env node
/**
 * sim_grammar_test.js — Mock-plays the REAL game engine (not a copy) in
 * couple and group modes and scans every rendered prompt for grammar
 * artifacts and functional hiccups.
 *
 * Loads the exact files index.html ships, with DOM stubs, drives nextTurn()
 * and the feedback buttons like a player would.
 *
 * Usage: node sim_grammar_test.js [--games 5] [--turns 120]
 */
'use strict';
var fs = require('fs');
var vm = require('vm');

var args = process.argv.slice(2);
function getArg(name, fallback) {
  var i = args.indexOf(name);
  return (i >= 0 && args[i + 1]) ? args[i + 1] : fallback;
}
var N_GAMES = parseInt(getArg('--games', '5'), 10);
var MAX_TURNS = parseInt(getArg('--turns', '120'), 10);

// ─── DOM STUBS ─────────────────────────────────────────────────────────────

function makeEl(id) {
  var el = {
    _id: id,
    textContent: '',
    value: '',
    disabled: false,
    checked: false,
    className: '',
    dataset: {},
    style: {},
    children: [],
    classList: {
      _set: {},
      add: function (c) { this._set[c] = 1; },
      remove: function (c) { delete this._set[c]; },
      toggle: function (c, v) { if (v) this._set[c] = 1; else delete this._set[c]; },
      contains: function (c) { return !!this._set[c]; }
    },
    setAttribute: function () {},
    getAttribute: function () { return null; },
    removeAttribute: function () {},
    appendChild: function (c) { this.children.push(c); return c; },
    remove: function () {},
    addEventListener: function (ev, fn) { (this._handlers[ev] = this._handlers[ev] || []).push(fn); },
    removeEventListener: function () {},
    querySelector: function () { return null; },
    querySelectorAll: function () { return []; },
    closest: function () { return null; },
    focus: function () {},
    click: function () { var hs = (this._handlers.click || []).slice(); for (var i = 0; i < hs.length; i++) hs[i].call(this, { stopPropagation: function () {} }); },
    offsetWidth: 0
  };
  el._handlers = {};
  // innerHTML assignment clears children (engine uses wrap.innerHTML = "")
  var _html = '';
  Object.defineProperty(el, 'innerHTML', {
    get: function () { return _html; },
    set: function (v) { _html = v; el.children.length = 0; }
  });
  // querySelector supports the '.class' lookups the engine uses, so repeated
  // getFeedbackPanelButtonsWrap() calls reuse ONE wrap instead of stacking them
  el.querySelector = function (sel) {
    if (!sel || sel[0] !== '.') return null;
    var cls = sel.slice(1);
    function find(node) {
      for (var i = 0; i < node.children.length; i++) {
        var ch = node.children[i];
        if ((ch.className || '').split(' ').indexOf(cls) >= 0 || (ch.classList && ch.classList.contains(cls))) return ch;
        var deep = find(ch);
        if (deep) return deep;
      }
      return null;
    }
    return find(el);
  };
  return el;
}

function buildSandbox() {
  var elements = {};
  var timerQueue = [];

  var documentStub = {
    getElementById: function (id) {
      if (!elements[id]) elements[id] = makeEl(id);
      return elements[id];
    },
    querySelector: function () { return null; },
    querySelectorAll: function () { return []; },
    createElement: function (tag) { return makeEl('created-' + tag); },
    addEventListener: function () {},
    body: (function () {
      var b = makeEl('body');
      b.className = '';
      return b;
    })()
  };

  var sandbox = {
    document: documentStub,
    window: {},
    localStorage: {
      _s: {},
      getItem: function (k) { return this._s[k] || null; },
      setItem: function (k, v) { this._s[k] = String(v); },
      removeItem: function (k) { delete this._s[k]; }
    },
    navigator: { userAgent: 'sim' },
    alert: function () {},
    confirm: function () { return true; },
    console: { log: function () {}, warn: function () {}, error: function () {} },
    setTimeout: function (fn) { timerQueue.push(fn); return timerQueue.length; },
    clearTimeout: function () {},
    requestAnimationFrame: function (fn) { timerQueue.push(fn); return 0; },
    cancelAnimationFrame: function () {},
    setInterval: function () { return 0; },
    clearInterval: function () {},
    Math: Math,
    JSON: JSON,
    Object: Object,
    Array: Array,
    String: String,
    Number: Number,
    Boolean: Boolean,
    RegExp: RegExp,
    Error: Error,
    Date: Date,
    Set: Set,
    Map: Map,
    parseInt: parseInt,
    parseFloat: parseFloat,
    isNaN: isNaN
  };
  sandbox.window = sandbox; // window === global, like a browser
  sandbox.globalThis = sandbox;
  sandbox._timerQueue = timerQueue;
  return sandbox;
}

// ─── LOAD REAL GAME FILES ──────────────────────────────────────────────────

var LOAD_ORDER = [
  'prompts_v2.js',
  'couples_prompts_v2.js',
  'couples_prompts_early.js',
  'orb-data.js',
  'orb-templates.js',
  'orb-state.js',
  'orb-memory.js',
  'orb-engine.js'
];

// const/let at a script's top level do NOT become properties of the vm global,
// so run all files as ONE script and export the bindings we need explicitly.
var EXPORT_TAIL = `
// Stubs for functions defined in orb-ui.js (not loaded in the sim)
;globalThis.updateHistoryButtons = function () {};
globalThis.browseHistory = function () {};
globalThis.returnToCurrent = function () {};
// trace nextTurn callers
var __origNT = nextTurn;
nextTurn = function () {
  if (globalThis.__ntTrace) {
    var st = new Error().stack.split(String.fromCharCode(10)).slice(2, 4).join(' | ');
    globalThis.__ntTrace(gameState.turnCount, gameState.awaitingResolution, st);
  }
  return __origNT();
};
// trace chain completions
var __origRPC = recordPromptCompletion;
recordPromptCompletion = function (prompt, response) {
  if (prompt && prompt.chain_id && globalThis.__chainTrace) {
    globalThis.__chainTrace('complete', prompt.chain_id, prompt.chain_step, response, JSON.stringify(gameState.activeChains[prompt.chain_id] || null));
  }
  return __origRPC(prompt, response);
};
globalThis.__game = {
  gameState: gameState,
  nextTurn: nextTurn,
  recordFeedback: recordFeedback,
  finalizePromptAfterFeedback: finalizePromptAfterFeedback,
  resetGame: function () { return resetGame(); },
  getCurrentChapter: getCurrentChapter,
  getPronouns: getPronouns,
  getPromptUndressInfo: getPromptUndressInfo,
  undressSubjectName: undressSubjectName,
  doOneSpin: doOneSpin,
  setRenderPromptWrapper: function (wrap) {
    var orig = renderPrompt;
    renderPrompt = function (prompt, player, target) {
      orig(prompt, player, target);
      wrap(prompt, player, target);
    };
  }
};
`;

function loadGame(sandbox) {
  vm.createContext(sandbox);
  var src = LOAD_ORDER.map(function (f) {
    return fs.readFileSync(__dirname + '/' + f, 'utf8');
  }).join('\n;\n') + EXPORT_TAIL;
  vm.runInContext(src, sandbox, { filename: 'game-bundle.js' });
}

// ─── GRAMMAR / FUNCTIONAL CHECKS ───────────────────────────────────────────

var CHECKS = [
  { name: 'raw-placeholder',   re: /\{[a-zA-Z_]+\}/ },
  { name: 'broken-contraction', re: /\b(?:[Hh]e|[Ss]he)'(?:re|ve)\b/ },
  // "she have" is fine after a modal/aux inversion ("what would she have to do") —
  // only flag when NOT preceded by would/could/should/might/must/do/does/did/will/shall/may/can
  { name: 'bad-conjugation',   re: /\b(?<!\b(?:would|could|should|might|must|do|does|did|will|shall|may|can) )(?:he|she) (?:are|were|have|don't|aren't)\b/i },
  { name: 'undefined-in-text', re: /\bundefined\b|\bNaN\b|\bnull\b/ },
  { name: 'double-space',      re: /  +/ }
];

function scanText(text, ctx, issues) {
  CHECKS.forEach(function (c) {
    if (c.couplesOnly && !ctx.couples) return;
    if (c.re.test(text)) {
      issues.push({ type: c.name, text: text, id: ctx.promptId, mode: ctx.mode, chapter: ctx.chapter });
    }
  });
}

// ─── GAME DRIVER ───────────────────────────────────────────────────────────

function playGame(config) {
  var sandbox = buildSandbox();
  var issues = [];
  var rendered = [];
  var stalls = 0;
  var errors = [];

  try {
    loadGame(sandbox);
  } catch (e) {
    return { issues: [{ type: 'load-error', text: e.message }], rendered: 0, stalls: 0, errors: [e.message] };
  }

  var g = sandbox.__game;
  sandbox.__ntTrace = function (t, aw, st) { if (process.env.NT_TRACE) console.error('[nt]', config.name, 'turn', t, 'awaiting', aw, st); };
  sandbox.__chainTrace = function () { if (process.env.COMPLETE_TRACE) console.error.apply(console, ['[cmpl]', config.name].concat([].slice.call(arguments))); };

  // ── Undress-progression + chain-integrity ledgers ──
  // Sim-side clothing ledger, independent of the engine's own tracking,
  // so we catch the engine failing to prevent contradictions.
  var simClothing = {};   // player -> layers removed count
  var simFullyBare = {};  // player -> true once fully undressed
  var chainSeq = {};      // chain_id -> [steps in render order]
  var UNDRESS_FLOOR = { personal: 1, playful: 1, flirty: 1, suggestive: 1, intimate: 5, erotic: 6, taboo: 7 };
  var STAGE_NUM = { personal: 1, playful: 2, flirty: 3, suggestive: 4, intimate: 5, erotic: 6, taboo: 7 };

  // Wrap renderPrompt to capture every rendered prompt with its source object
  g.setRenderPromptWrapper(function (prompt, player, target) {
    var text = sandbox.document.getElementById('promptText').textContent;
    rendered.push({ prompt: prompt, player: player, target: target, text: text });

    var ctx = {
      promptId: prompt && prompt.id,
      mode: config.name,
      chapter: prompt && prompt.chapter,
      couples: config.players.length === 2
    };
    scanText(text, ctx, issues);

    // "someone" fallback: {target} in source but no target chosen → renders as "someone"
    if (!target && prompt && /\{target\}/.test(prompt.text)) {
      issues.push({ type: 'someone-fallback', text: text, id: ctx.promptId, mode: config.name, chapter: ctx.chapter });
    }

    // ── UNDRESS PROGRESSION AUDIT ──
    var uInfo = g.getPromptUndressInfo(prompt);
    if (uInfo) {
      var subjects = uInfo.subject === 'both' ? [player, target].filter(Boolean)
        : [uInfo.subject === 'actor' ? player : (target || null)].filter(Boolean);
      // Contradiction: an undress prompt served to someone already fully bare
      var subject = subjects.find(function (s) { return simFullyBare[s]; });
      if (subject) {
        issues.push({ type: 'undress-contradiction', text: '[' + subject + ' already fully undressed] ' + text, id: ctx.promptId, mode: config.name, chapter: ctx.chapter });
      }
      // Full-strip dares before the intimate stage violate the escalation vision
      var stageNum = STAGE_NUM[prompt.chapter] || 0;
      if (uInfo.makesFull && stageNum < STAGE_NUM.erotic) {
        issues.push({ type: 'full-undress-too-early', text: text, id: ctx.promptId, mode: config.name, chapter: ctx.chapter });
      }
    }

    // ── CHAIN INTEGRITY AUDIT ──
    if (prompt && prompt.chain_id && prompt.chain_step) {
      var seq = chainSeq[prompt.chain_id] = chainSeq[prompt.chain_id] || [];
      var last = seq.length ? seq[seq.length - 1] : 0;
      // Steps must move FORWARD. Skips are legal (pass-skip, clothing-skip);
      // restarts from 1 are legal (chain re-run). Repeats and regressions are bugs.
      if (prompt.chain_step <= last && prompt.chain_step !== 1) {
        issues.push({ type: 'chain-step-repeat-or-regress', text: '[' + prompt.chain_id + ' step ' + prompt.chain_step + ' after step ' + last + '] ' + text.slice(0, 80), id: ctx.promptId, mode: config.name, chapter: ctx.chapter });
      }
      seq.push(prompt.chain_step);
      if (process.env.CHAIN_TRACE) console.error('[chain]', config.name, 'turn', g.gameState.turnCount, prompt.chain_id, 'step', prompt.chain_step, 'id', prompt.id, 'activeStep', JSON.stringify(g.gameState.activeChains[prompt.chain_id]));
    }
    // Self-targeting
    if (player && target && player === target) {
      issues.push({ type: 'self-target', text: text, id: ctx.promptId, mode: config.name, chapter: ctx.chapter });
    }
    // coupleType leakage (only meaningful for tagged early-stage prompts)
    if (ctx.couples && prompt && prompt.coupleType && prompt.coupleType !== 'both' &&
        prompt.coupleType !== g.gameState.coupleType) {
      issues.push({ type: 'coupleType-leak', text: '[' + prompt.coupleType + ' served to ' + g.gameState.coupleType + '] ' + text, id: prompt.id, mode: config.name, chapter: ctx.chapter });
    }
    // Leftover neutral pronouns after gendered smart-replace: only flag when
    // the source text had {target} and the target player is gendered
    if (target && prompt && /\{target\}/.test(prompt.text)) {
      var tp = g.gameState.players.find(function (p) { return p.name === target; });
      if (tp && (tp.gender === 'male' || tp.gender === 'female') && /\b(?:they|their|them|themselves)\b/i.test(text)) {
        issues.push({ type: 'leftover-neutral-pronoun', text: text, id: prompt.id, mode: config.name, chapter: ctx.chapter });
      }
    }
  });

  // Set up players like the setup screen would
  g.gameState.players = config.players.map(function (p, i) {
    return {
      id: i + 1, name: p.name, gender: p.gender,
      pronouns: g.getPronouns(p.gender),
      partnerId: p.partnerId || null, partner: p.partner || null,
      isSeducer: !!p.isSeducer, remembered: false
    };
  });
  g.gameState.gameMode = config.players.length === 2 ? 'couple' : 'group';
  if (config.coupleType) g.gameState.coupleType = config.coupleType;

  g.resetGame();
  // resetGame re-applies coupleType default? (it shouldn't reset it — verify holds)
  if (config.coupleType && g.gameState.coupleType !== config.coupleType) {
    issues.push({ type: 'state-bug', text: 'coupleType lost after resetGame: ' + g.gameState.coupleType });
    g.gameState.coupleType = config.coupleType;
  }

  function drainTimers(cap) {
    // Run the queue to empty — dropping callbacks loses state transitions
    // (e.g. the one that arms awaitingResolution). Cap only guards runaway loops.
    var n = 0;
    while (sandbox._timerQueue.length && n < cap) {
      var fn = sandbox._timerQueue.shift();
      try { fn(); } catch (e) { errors.push(e.message + ' (timer)'); }
      n++;
    }
    if (sandbox._timerQueue.length) {
      errors.push('timer queue not drained (' + sandbox._timerQueue.length + ' left after ' + cap + ')');
      sandbox._timerQueue.length = 0;
    }
  }

  var turns = 0;
  var lastRenderCount = 0;
  while (turns < config.maxTurns) {
    turns++;
    try {
      if (!g.gameState.awaitingResolution) {
        g.nextTurn();
      }
      drainTimers(1000);
      // Interactive overlays (voting, penalty spinner): auto-click through
      // them like a real player. Buttons live under the feedback panel stub.
      var uiGuard = 0;
      while ((g.gameState.votingActive || g.gameState.spinner || g.gameState.verdictActive) && uiGuard++ < 30) {
        var panel = sandbox.document.getElementById('feedbackPanel');
        var buttons = [];
        (function collect(el) {
          if (!el || !el.children) return;
          el.children.forEach(function (ch) {
            if (ch._handlers && ch._handlers.click) buttons.push(ch);
            collect(ch);
          });
        })(panel);
        if (!buttons.length) break;
        buttons[Math.floor(Math.random() * buttons.length)].click();
        drainTimers(1000);
      }

      if (g.gameState.awaitingResolution) {
        // Player responds: mostly done, occasionally pass to exercise penalty paths
        var response = Math.random() < 0.9 ? 'done' : 'pass';
        var prompt = g.gameState.lastPrompt;
        if (prompt && prompt.promptType === 'truth' && response === 'done') response = 'answered';
        // Maintain the sim-side clothing ledger BEFORE completing the prompt
        if ((response === 'done') && prompt) {
          var ui = g.getPromptUndressInfo(prompt);
          if (ui) {
            var subjs = ui.subject === 'both'
              ? [g.gameState.currentPlayer, g.gameState.lastResolvedTarget].filter(Boolean)
              : [ui.subject === 'actor' ? g.gameState.currentPlayer : g.gameState.lastResolvedTarget].filter(Boolean);
            subjs.forEach(function (subj) {
              simClothing[subj] = (simClothing[subj] || 0) + 1;
              if (ui.makesFull || simClothing[subj] >= 3) simFullyBare[subj] = true;
            });
          }
        }
        // recordFeedback finalizes internally (which auto-queues the next turn) —
        // calling finalizePromptAfterFeedback here too double-completes prompts
        g.recordFeedback(response);
        drainTimers(1000);
      }
    } catch (e) {
      errors.push('turn ' + turns + ' [' + g.getCurrentChapter() + ']: ' + e.message);
      // try to recover
      g.gameState.awaitingResolution = false;
    }
    if (rendered.length === lastRenderCount) {
      stalls++;
      if (process.env.STALL_TRACE) console.error('[stall]', config.name, 'turn', turns, 'awaiting', g.gameState.awaitingResolution, 'spinner', !!g.gameState.spinner, 'voting', g.gameState.votingActive, 'chains', JSON.stringify(g.gameState.activeChains), 'bridge', !!g.gameState.postChainBridge, 'ft', !!g.gameState.followThroughQueue);
    }
    lastRenderCount = rendered.length;
  }

  return {
    issues: issues,
    rendered: rendered.length,
    stalls: stalls,
    errors: errors,
    finalChapter: g.getCurrentChapter(),
    turnCount: g.gameState.turnCount
  };
}

// ─── CONFIGS ───────────────────────────────────────────────────────────────

var CONFIGS = [
  {
    name: 'couple-established-MF',
    coupleType: 'established',
    maxTurns: MAX_TURNS,
    players: [
      { name: 'Hans', gender: 'male', partner: 'Grecia', partnerId: 2 },
      { name: 'Grecia', gender: 'female', partner: 'Hans', partnerId: 1 }
    ]
  },
  {
    name: 'couple-new-MF',
    coupleType: 'new',
    maxTurns: MAX_TURNS,
    players: [
      { name: 'Miro', gender: 'female', partner: 'Alex', partnerId: 2 },
      { name: 'Alex', gender: 'male', partner: 'Miro', partnerId: 1 }
    ]
  },
  {
    name: 'couple-established-FF',
    coupleType: 'established',
    maxTurns: MAX_TURNS,
    players: [
      { name: 'Ana', gender: 'female', partner: 'Bea', partnerId: 2 },
      { name: 'Bea', gender: 'female', partner: 'Ana', partnerId: 1 }
    ]
  },
  {
    name: 'group-4-seducer',
    maxTurns: MAX_TURNS,
    players: [
      { name: 'Hans', gender: 'male', partner: 'Grecia', partnerId: 2 },
      { name: 'Grecia', gender: 'female', partner: 'Hans', partnerId: 1 },
      { name: 'Miro', gender: 'female', isSeducer: true },
      { name: 'Leo', gender: 'male' }
    ]
  },
  {
    name: 'group-3',
    maxTurns: MAX_TURNS,
    players: [
      { name: 'Ana', gender: 'female' },
      { name: 'Leo', gender: 'male' },
      { name: 'Sam', gender: 'other' }
    ]
  }
];

// ─── RUN ───────────────────────────────────────────────────────────────────

var allIssues = [];
var summary = [];

CONFIGS.forEach(function (config) {
  var totRendered = 0, totStalls = 0, totErrors = [], chapters = {};
  for (var i = 0; i < N_GAMES; i++) {
    var r = playGame(config);
    totRendered += r.rendered;
    totStalls += r.stalls;
    totErrors = totErrors.concat(r.errors);
    chapters[r.finalChapter] = (chapters[r.finalChapter] || 0) + 1;
    r.issues.forEach(function (is) { is.config = config.name; allIssues.push(is); });
  }
  summary.push({
    config: config.name,
    games: N_GAMES,
    prompts: totRendered,
    stalls: totStalls,
    errors: totErrors,
    finalChapters: chapters
  });
});

// ─── REPORT ────────────────────────────────────────────────────────────────

console.log('══ SIM SUMMARY ══');
summary.forEach(function (s) {
  console.log('\n' + s.config + ': ' + s.games + ' games, ' + s.prompts + ' prompts rendered, ' +
    s.stalls + ' stalled turns, ' + s.errors.length + ' errors');
  console.log('  final chapters: ' + JSON.stringify(s.finalChapters));
  if (s.errors.length) {
    var uniq = {};
    s.errors.forEach(function (e) { uniq[e] = (uniq[e] || 0) + 1; });
    Object.keys(uniq).slice(0, 5).forEach(function (e) { console.log('  ERROR (' + uniq[e] + '×): ' + e); });
  }
});

console.log('\n══ ISSUES (' + allIssues.length + ') ══');
var byType = {};
allIssues.forEach(function (i) { (byType[i.type] = byType[i.type] || []).push(i); });
Object.keys(byType).forEach(function (t) {
  var list = byType[t];
  console.log('\n[' + t + '] ' + list.length + ' hits');
  // dedupe by prompt id, show up to 5 unique samples
  var seen = {};
  var shown = 0;
  for (var i = 0; i < list.length && shown < 5; i++) {
    var key = list[i].id || list[i].text.slice(0, 40);
    if (seen[key]) continue;
    seen[key] = 1;
    shown++;
    console.log('  · ' + (list[i].id || '?') + ' (' + list[i].config + ', ' + (list[i].chapter || '?') + '): ' +
      list[i].text.slice(0, 160).replace(/\n/g, ' '));
  }
});
if (!allIssues.length) console.log('  none — clean run');

// CI: fail the build on any content issue or engine error
var totalErrors = summary.reduce(function (n, s) { return n + s.errors.length; }, 0);
var totalStalls = summary.reduce(function (n, s) { return n + s.stalls; }, 0);
if (allIssues.length || totalErrors) {
  console.log('\nFAIL: ' + allIssues.length + ' issues, ' + totalErrors + ' errors, ' + totalStalls + ' stalls');
  process.exitCode = 1;
} else {
  console.log('\nPASS: all games clean' + (totalStalls ? ' (' + totalStalls + ' stalled turns)' : ''));
}
