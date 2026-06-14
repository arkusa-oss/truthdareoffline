#!/usr/bin/env node
/**
 * sim_runner.js — Multi-game simulation: group (seducer role) + couples mode
 *
 * Runs N games per config, aggregates issues across all runs, and outputs
 * a markdown report with prioritized problems and a fix plan.
 *
 * Usage:  node sim_runner.js [--games 15] [--turns-per-stage 12]
 *
 * Group checks:
 *   - Stage intensity mismatches
 *   - Seducer turn distribution per stage
 *   - Chain trigger/completion rates
 *   - Prompt repetition within a sliding window
 *   - Target imbalance
 *   - Stage stall
 *
 * Couples checks (no seducer, partner always targeted):
 *   - Stage intensity mismatches
 *   - Chain trigger/completion rates
 *   - Prompt repetition within a sliding window
 */

'use strict';
var fs   = require('fs');
var path = require('path');

var BASE = __dirname;

// ─── CLI ARGS ──────────────────────────────────────────────────────────────

var args = process.argv.slice(2);
var N_GAMES          = parseInt(getArg('--games', '15'), 10);
var TURNS_PER_STAGE  = parseInt(getArg('--turns-per-stage', '12'), 10);

function getArg(name, fallback) {
  var idx = args.indexOf(name);
  return (idx >= 0 && args[idx + 1]) ? args[idx + 1] : fallback;
}

// ─── CONSTANTS ─────────────────────────────────────────────────────────────

var CHAPTER_ORDER = ['playful','personal','flirty','suggestive','intimate','erotic','taboo'];

// From orb-templates.js (real values)
var CHAPTER_CONFIG = {
  playful:    { turnsToAdvance: 8,  chainChance: 0.14, dareBias: 0.15, seducerBonus: 3  },
  personal:   { turnsToAdvance: 7,  chainChance: 0.18, dareBias: 0.12, seducerBonus: 2  },
  flirty:     { turnsToAdvance: 8,  chainChance: 0.22, dareBias: 0.40, seducerBonus: 4  },
  suggestive: { turnsToAdvance: 8,  chainChance: 0.32, dareBias: 0.55, seducerBonus: 5  },
  intimate:   { turnsToAdvance: 9,  chainChance: 0.35, dareBias: 0.60, seducerBonus: 6  },
  erotic:     { turnsToAdvance: 10, chainChance: 0.55, dareBias: 0.82, seducerBonus: 7  },
  taboo:      { turnsToAdvance: 12, chainChance: 0.85, dareBias: 0.92, seducerBonus: 8  }
};

// Intensity floor per stage (prompts below this are wrong-stage)
var STAGE_INTENSITY_MIN = {
  playful: 1, personal: 2, flirty: 3, suggestive: 4,
  intimate: 5, erotic: 6, taboo: 7
};

// Intensity ceiling per stage (prompts above this are too hot for stage)
var STAGE_INTENSITY_MAX = {
  playful: 3, personal: 4, flirty: 5, suggestive: 6,
  intimate: 7, erotic: 9, taboo: 10
};

var REPEAT_WINDOW = 8;   // flag if same promptId used again within this many turns

// ─── PROMPT LOADING ────────────────────────────────────────────────────────

function loadGroupPrompts() {
  var src = fs.readFileSync(path.join(BASE, 'prompts_v2.js'), 'utf8');
  var m = src.match(/const CSV_PROMPTS\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) { console.error('Cannot parse prompts_v2.js'); return []; }
  try { return eval(m[1]); } catch(e) { console.error('eval prompts_v2.js:', e.message); return []; }
}

function loadChainPrompts() {
  var src = fs.readFileSync(path.join(BASE, 'orb-data.js'), 'utf8');
  var m = src.match(/const CHAIN_PROMPTS\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) return [];
  try { return eval(m[1]); } catch(e) { console.error('eval CHAIN_PROMPTS:', e.message); return []; }
}

function loadCouplesPrompts() {
  var src = fs.readFileSync(path.join(BASE, 'couples_prompts_v2.js'), 'utf8');
  var m = src.match(/const CSV_COUPLES_PROMPTS\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) { console.error('Cannot parse couples_prompts_v2.js'); return []; }
  try { return eval(m[1]); } catch(e) { console.error('eval couples_prompts_v2.js:', e.message); return []; }
}

// Couples chapter config — turnsToAdvance overrides from orb-templates.js
var COUPLES_TURNS = {
  personal:   10,
  playful:    12,
  flirty:     12,
  suggestive: 12,
  intimate:   12,
  erotic:     12,
  taboo:      14
};

// ─── TEST CONFIGS ──────────────────────────────────────────────────────────

var TEST_CONFIGS = [
  {
    name: '3-player: seducer + couple + single (Hans seduces)',
    players: [
      { name: 'Hans',   gender: 'male',   partner: 'Grecia', isSeducer: true  },
      { name: 'Grecia', gender: 'female', partner: 'Hans',   isSeducer: false },
      { name: 'Nella',  gender: 'female', partner: null,     isSeducer: false }
    ]
  },
  {
    name: '3-player: seducer + couple + single (Nella seduces)',
    players: [
      { name: 'Hans',   gender: 'male',   partner: 'Grecia', isSeducer: false },
      { name: 'Grecia', gender: 'female', partner: 'Hans',   isSeducer: false },
      { name: 'Nella',  gender: 'female', partner: null,     isSeducer: true  }
    ]
  },
  {
    name: '4-player: seducer + 2 couples (Alice seduces)',
    players: [
      { name: 'Alice', gender: 'female', partner: 'Bob',   isSeducer: true  },
      { name: 'Bob',   gender: 'male',   partner: 'Alice', isSeducer: false },
      { name: 'Carol', gender: 'female', partner: 'Dave',  isSeducer: false },
      { name: 'Dave',  gender: 'male',   partner: 'Carol', isSeducer: false }
    ]
  },
  {
    name: '4-player: seducer + 2 couples (Dave seduces)',
    players: [
      { name: 'Alice', gender: 'female', partner: 'Bob',   isSeducer: false },
      { name: 'Bob',   gender: 'male',   partner: 'Alice', isSeducer: false },
      { name: 'Carol', gender: 'female', partner: 'Dave',  isSeducer: false },
      { name: 'Dave',  gender: 'male',   partner: 'Carol', isSeducer: true  }
    ]
  }
];

var COUPLES_TEST_CONFIGS = [
  {
    name: 'Couples: male + female',
    mode: 'couples',
    players: [
      { name: 'Hans',   gender: 'male',   partner: 'Grecia', isSeducer: false },
      { name: 'Grecia', gender: 'female', partner: 'Hans',   isSeducer: false }
    ]
  },
  {
    name: 'Couples: female + female',
    mode: 'couples',
    players: [
      { name: 'Nella',  gender: 'female', partner: 'Sofia', isSeducer: false },
      { name: 'Sofia',  gender: 'female', partner: 'Nella', isSeducer: false }
    ]
  },
  {
    name: 'Couples: male + male',
    mode: 'couples',
    players: [
      { name: 'Marco', gender: 'male', partner: 'Luis', isSeducer: false },
      { name: 'Luis',  gender: 'male', partner: 'Marco', isSeducer: false }
    ]
  }
];

// ─── GAME SESSION ──────────────────────────────────────────────────────────

function GameSession(config, groupPrompts, chainPrompts) {
  this.config       = config;
  this.mode         = config.mode || 'group';
  this.groupPrompts = groupPrompts;  // regular prompts (no chain_id)
  this.chainPrompts = chainPrompts;  // chain prompts only
  this.log          = [];  // one entry per turn
  this.issues       = [];
  this.chainStats   = {};  // chainId → { triggered, stepsCompleted, maxExpected, completed, chapter }

  this.s = {
    players: config.players.map(function(p, i) {
      return {
        id: i, name: p.name, gender: p.gender,
        partner: p.partner || null, isSeducer: !!p.isSeducer
      };
    }),
    chapterIndex:    0,
    turnInChapter:   0,
    turnCount:       0,
    momentum:        3,
    recentRefusals:  0,
    usedIds:         [],
    recentIds:       [],    // sliding window for repeat detection
    recentTargets:   [],
    activeChain:     null,  // { chainId, step, actor, target }
    lastChainEndTurn: -99,
    usedChainIds:    []
  };
}

GameSession.prototype.chapter = function() {
  return CHAPTER_ORDER[this.s.chapterIndex];
};

GameSession.prototype.cfg = function() {
  var base = Object.assign({}, CHAPTER_CONFIG[this.chapter()]);
  if (this.mode === 'couples' && COUPLES_TURNS[this.chapter()]) {
    base.turnsToAdvance = COUPLES_TURNS[this.chapter()];
  }
  return base;
};

GameSession.prototype.playerObj = function(name) {
  return this.s.players.find(function(p) { return p.name === name; }) || null;
};

// Weighted player selection — seducer gets bonus turns matching the engine.
// Couples mode: simple 50/50 (no seducer).
GameSession.prototype.chooseActor = function() {
  var players = this.s.players;
  if (this.mode === 'couples') {
    return players[Math.floor(Math.random() * players.length)].name;
  }
  var cfg      = this.cfg();
  var bonus    = cfg.seducerBonus || 0;
  var weighted = [];
  players.forEach(function(p) {
    var w = 3 + (p.isSeducer ? bonus : 0);
    for (var i = 0; i < w; i++) weighted.push(p.name);
  });
  return weighted[Math.floor(Math.random() * weighted.length)];
};

// Target selection. Couples: always the partner. Group: anti-repeat weighted.
GameSession.prototype.chooseTarget = function(actorName) {
  var others = this.s.players.filter(function(p) { return p.name !== actorName; });
  if (!others.length) return null;

  if (this.mode === 'couples') {
    // Always target the partner (only one other player in couples mode)
    return others[0].name;
  }

  var recentTargets = this.s.recentTargets;
  var recentCounts = {};
  others.forEach(function(p) { recentCounts[p.name] = 0; });
  recentTargets.slice(-10).forEach(function(t) {
    if (recentCounts[t] !== undefined) recentCounts[t]++;
  });

  var weighted = [];
  others.forEach(function(p) {
    var w = Math.max(1, 5 - recentCounts[p.name] * 2);
    for (var i = 0; i < w; i++) weighted.push(p.name);
  });
  return weighted[Math.floor(Math.random() * weighted.length)];
};

// Chain max step lookup
GameSession.prototype.chainMaxStep = function(chainId) {
  var steps = this.chainPrompts
    .filter(function(p) { return p.chain_id === chainId; })
    .map(function(p) { return p.chain_step; });
  return steps.length ? Math.max.apply(null, steps) : 0;
};

// Try to advance or complete an active chain; returns prompt or null
GameSession.prototype.continueChain = function() {
  var active = this.s.activeChain;
  if (!active) return null;

  var nextStep = active.step + 1;
  var nextPrompt = this.chainPrompts.find(function(p) {
    return p.chain_id === active.chainId && p.chain_step === nextStep;
  });

  if (nextPrompt) {
    active.step = nextStep;
    if (this.chainStats[active.chainId]) {
      this.chainStats[active.chainId].stepsCompleted++;
      // Mark complete immediately if no further step exists (game may end before next call)
      var hasNextNext = this.chainPrompts.some(function(p) {
        return p.chain_id === active.chainId && p.chain_step === nextStep + 1;
      });
      if (!hasNextNext) {
        this.chainStats[active.chainId].completed = true;
        this.s.lastChainEndTurn = this.s.turnCount;
        this.s.activeChain = null;
      }
    }
    return nextPrompt;
  }

  // No more steps — chain complete
  if (this.chainStats[active.chainId]) {
    this.chainStats[active.chainId].completed = true;
  }
  this.s.lastChainEndTurn = this.s.turnCount;
  this.s.activeChain = null;
  return null;
};

// Maybe start a new chain
GameSession.prototype.maybeStartChain = function(actor, chapter) {
  var cfg      = this.cfg();
  var s        = this.s;

  if (s.momentum < 2)                    return null;
  if (s.turnCount < 5)                   return null;
  if (Math.random() > cfg.chainChance)   return null;

  var cooldown = (chapter === 'taboo') ? 0 : (chapter === 'erotic') ? 1 : 2;
  if (s.turnCount - s.lastChainEndTurn < cooldown) return null;

  var usedChainIds = s.usedChainIds;
  var self = this;

  var starters = this.chainPrompts.filter(function(p) {
    return p.chapter === chapter && p.chain_step === 1 &&
      usedChainIds.indexOf(p.chain_id) < 0;
  });
  if (!starters.length) return null;

  var starter = starters[Math.floor(Math.random() * starters.length)];
  var target  = this.chooseTarget(actor);

  s.activeChain = { chainId: starter.chain_id, step: 1, actor: actor, target: target };
  s.usedChainIds.push(starter.chain_id);

  var maxStep = this.chainMaxStep(starter.chain_id);
  this.chainStats[starter.chain_id] = {
    triggered:       s.turnCount,
    stepsCompleted:  1,
    maxExpected:     maxStep,
    completed:       (maxStep === 1),
    chapter:         chapter
  };

  return starter;
};

// Select next regular prompt (no chain)
GameSession.prototype.selectRegularPrompt = function(actor, chapter) {
  var s    = this.s;
  var actorObj = this.playerObj(actor);

  var pool = this.groupPrompts.filter(function(p) {
    if (p.chapter !== chapter) return false;
    if (s.recentIds.indexOf(p.id) >= 0) return false;
    if (p.actor_gender && actorObj && p.actor_gender !== actorObj.gender) return false;
    return true;
  });

  if (!pool.length) {
    pool = this.groupPrompts.filter(function(p) { return p.chapter === chapter; });
  }
  if (!pool.length) {
    pool = this.groupPrompts;
  }

  return pool[Math.floor(Math.random() * pool.length)] || null;
};

GameSession.prototype.runTurn = function() {
  var s       = this.s;
  var chapter = this.chapter();
  var cfg     = this.cfg();
  var actor   = this.chooseActor();
  var isChain = false;
  var prompt  = null;

  // 1) Continue active chain
  if (s.activeChain) {
    var nextChainPrompt = this.continueChain();
    if (nextChainPrompt) {
      prompt  = nextChainPrompt;
      isChain = true;
    }
  }

  // 2) Maybe start new chain
  if (!prompt && !s.activeChain) {
    var chainStarter = this.maybeStartChain(actor, chapter);
    if (chainStarter) {
      prompt  = chainStarter;
      isChain = true;
    }
  }

  // 3) Regular prompt
  if (!prompt) {
    prompt = this.selectRegularPrompt(actor, chapter);
  }

  if (!prompt) return false;

  var target = (prompt.target === 'other' || prompt.type === 'directed')
    ? this.chooseTarget(actor)
    : null;

  var text = (prompt.text || '')
    .replace(/\{player\}/g, actor)
    .replace(/\{target\}/g, target || 'someone')
    .replace(/\{partner\}/g, actor);

  this.log.push({
    turn:       s.turnCount,
    chapter:    chapter,
    actor:      actor,
    isSeducer:  !!(this.playerObj(actor) && this.playerObj(actor).isSeducer),
    target:     target,
    promptId:   prompt.id,
    promptType: prompt.promptType,
    intensity:  prompt.intensity,
    isChain:    isChain,
    chainId:    isChain && s.activeChain ? s.activeChain.chainId : null,
    chainStep:  isChain && s.activeChain ? s.activeChain.step    : null,
    text:       text
  });

  // Update state
  if (!isChain) {
    s.usedIds.push(prompt.id);
    s.recentIds.push(prompt.id);
    if (s.recentIds.length > 40) s.recentIds.shift();
  }

  if (target) {
    s.recentTargets.push(target);
    if (s.recentTargets.length > 12) s.recentTargets.shift();
  }

  // Slowly build momentum (simplified — real engine tracks accepts/refusals)
  if (Math.random() < 0.7) s.momentum = Math.min(10, s.momentum + 0.3);

  s.turnCount++;
  s.turnInChapter++;

  // Advance chapter when ready and no active chain
  if (!s.activeChain && s.turnInChapter >= cfg.turnsToAdvance) {
    if (s.momentum >= 2 && s.recentRefusals < 3) {
      if (s.chapterIndex < CHAPTER_ORDER.length - 1) {
        s.chapterIndex++;
        s.turnInChapter = 0;
      }
    }
  }

  return true;
};

GameSession.prototype.run = function() {
  var total = TURNS_PER_STAGE * CHAPTER_ORDER.length;
  for (var i = 0; i < total; i++) {
    if (!this.runTurn()) break;
  }
};

// ─── ISSUE DETECTION ───────────────────────────────────────────────────────

GameSession.prototype.detectIssues = function() {
  var issues = [];
  var self   = this;
  var s      = this.s;

  // 1) Stage intensity mismatch
  this.log.forEach(function(t) {
    if (t.isChain) return; // chain steps intentionally escalate beyond stage ceiling
    var minI = STAGE_INTENSITY_MIN[t.chapter];
    var maxI = STAGE_INTENSITY_MAX[t.chapter];
    if (t.intensity == null) return;
    if (t.intensity < minI - 1) {
      issues.push({ type: 'intensity_too_low',  severity: 'HIGH',   turn: t.turn, chapter: t.chapter, promptId: t.promptId, intensity: t.intensity, minExpected: minI });
    }
    if (t.intensity > maxI + 1) {
      issues.push({ type: 'intensity_too_high', severity: 'MEDIUM', turn: t.turn, chapter: t.chapter, promptId: t.promptId, intensity: t.intensity, maxExpected: maxI });
    }
  });

  // 2) Prompt repetition within REPEAT_WINDOW turns
  for (var i = REPEAT_WINDOW; i < this.log.length; i++) {
    var cur    = this.log[i];
    var window = this.log.slice(i - REPEAT_WINDOW, i);
    if (window.some(function(t) { return t.promptId === cur.promptId; })) {
      issues.push({ type: 'prompt_repeat', severity: 'MEDIUM', turn: cur.turn, chapter: cur.chapter, promptId: cur.promptId });
    }
  }

  // 3) Seducer turn share per stage (group only — couples has no seducer)
  if (this.mode !== 'couples') {
    CHAPTER_ORDER.forEach(function(ch) {
      var stageTurns    = self.log.filter(function(t) { return t.chapter === ch; });
      if (!stageTurns.length) return;
      var seducerTurns  = stageTurns.filter(function(t) { return t.isSeducer; });
      var ratio         = seducerTurns.length / stageTurns.length;
      var cfg           = CHAPTER_CONFIG[ch];
      var playerCount   = self.config.players.length;
      var baseWeight    = 3;
      var seducerWeight = baseWeight + cfg.seducerBonus;
      var totalWeight   = seducerWeight + baseWeight * (playerCount - 1);
      var expectedRatio = seducerWeight / totalWeight;

      // Require at least 10 stage turns to avoid small-sample false positives (short stages are noisy)
      if (stageTurns.length < 10) return;
      // Flag if actual ratio is <50% or >2× expected
      if (ratio < expectedRatio * 0.5) {
        issues.push({ type: 'seducer_too_few_turns', severity: 'MEDIUM', chapter: ch, actual: ratio.toFixed(2), expected: expectedRatio.toFixed(2), seducerTurns: seducerTurns.length, totalTurns: stageTurns.length });
      } else if (ratio > Math.min(0.90, expectedRatio * 2.0)) {
        issues.push({ type: 'seducer_too_many_turns', severity: 'LOW',    chapter: ch, actual: ratio.toFixed(2), expected: expectedRatio.toFixed(2), seducerTurns: seducerTurns.length, totalTurns: stageTurns.length });
      }
    });
  }

  // 4) Chain completion
  // Only flag chains that were never completed AND started early enough to realistically finish.
  // Game-end cutoffs (chain fired in last maxExpected turns of the session) are sim artifacts.
  var totalTurns = this.log.length;
  Object.keys(this.chainStats).forEach(function(chainId) {
    var cs = self.chainStats[chainId];
    if (!cs.completed && cs.maxExpected > 1) {
      var remainingAtTrigger = totalTurns - cs.triggered;
      var couldHaveFinished  = remainingAtTrigger >= cs.maxExpected;
      if (!couldHaveFinished) return; // sim artifact — chain fired too late to finish in allotted turns
      var completedPct = Math.round((cs.stepsCompleted / cs.maxExpected) * 100);
      // HIGH only if < 33% progress AND had plenty of turns; otherwise MEDIUM
      var severity = (completedPct < 33 && remainingAtTrigger >= cs.maxExpected * 2) ? 'HIGH' : 'MEDIUM';
      issues.push({ type: 'chain_abandoned', severity: severity, chainId: chainId, chapter: cs.chapter, stepsCompleted: cs.stepsCompleted, maxExpected: cs.maxExpected, completedPct: completedPct });
    }
  });

  // 5) Target imbalance — one non-seducer gets targeted >2× the fair share
  // Skip for couples: only 2 players, target is always the partner.
  if (this.mode !== 'couples') {
    var targetCounts = {};
    var seducerName  = null;
    this.config.players.forEach(function(p) {
      targetCounts[p.name] = 0;
      if (p.isSeducer) seducerName = p.name;
    });
    this.log.forEach(function(t) {
      if (t.target && targetCounts[t.target] !== undefined) targetCounts[t.target]++;
    });
    var totalTargeted     = Object.values(targetCounts).reduce(function(a,b) { return a+b; }, 0);
    var playerCount       = this.config.players.length;
    var fairSharePerPlayer= totalTargeted / playerCount;
    Object.keys(targetCounts).forEach(function(name) {
      if (name === seducerName) return;
      if (targetCounts[name] > fairSharePerPlayer * 2.2) {
        issues.push({ type: 'target_imbalance', severity: 'MEDIUM', player: name, count: targetCounts[name], fairShare: Math.round(fairSharePerPlayer) });
      }
    });
  }

  // 6) Stage stall — stage took >2× turnsToAdvance without advancing
  // Skip the final chapter: it never advances (game ends there), so high turn counts are expected.
  var lastChapter     = CHAPTER_ORDER[CHAPTER_ORDER.length - 1];
  var stageTurnCounts = {};
  CHAPTER_ORDER.forEach(function(ch) { stageTurnCounts[ch] = 0; });
  this.log.forEach(function(t) { if (stageTurnCounts[t.chapter] !== undefined) stageTurnCounts[t.chapter]++; });
  CHAPTER_ORDER.forEach(function(ch) {
    if (ch === lastChapter) return; // final stage never advances — skip stall check
    var expected = CHAPTER_CONFIG[ch].turnsToAdvance;
    if (stageTurnCounts[ch] > expected * 2.5) {
      issues.push({ type: 'stage_stall', severity: 'LOW', chapter: ch, turns: stageTurnCounts[ch], expected: expected });
    }
  });

  this.issues = issues;
  return issues;
};

// ─── MULTI-GAME AGGREGATOR ─────────────────────────────────────────────────

function AggregatedResult(config) {
  this.config       = config;
  this.gamesRun     = 0;
  this.issueCounts  = {};
  this.issueExamples= {};
  this.chainTriggerRates   = {};  // chainId → { triggered, total }
  this.chainCompletionRates= {};  // chainId → { completed, triggered }
  this.stageSeducerRatios  = {};  // chapter → [ratio, ...]
  this.totalTurnsPerStage  = {};  // chapter → total turns across all games
  CHAPTER_ORDER.forEach(function(ch) {
    this.stageSeducerRatios[ch] = [];
    this.totalTurnsPerStage[ch] = 0;
  }, this);
}

AggregatedResult.prototype.absorb = function(session) {
  this.gamesRun++;

  // Chain stats
  Object.keys(session.chainStats).forEach(function(chainId) {
    var cs = session.chainStats[chainId];
    if (!this.chainTriggerRates[chainId])   this.chainTriggerRates[chainId]   = { triggered: 0, total: 0 };
    if (!this.chainCompletionRates[chainId]) this.chainCompletionRates[chainId] = { completed: 0, triggered: 0 };
    this.chainTriggerRates[chainId].triggered++;
    if (cs.completed) this.chainCompletionRates[chainId].completed++;
    this.chainCompletionRates[chainId].triggered++;
  }, this);

  // Seducer ratio per stage
  var self = this;
  CHAPTER_ORDER.forEach(function(ch) {
    var stageTurns   = session.log.filter(function(t) { return t.chapter === ch; });
    var seducerTurns = stageTurns.filter(function(t) { return t.isSeducer; });
    self.totalTurnsPerStage[ch] += stageTurns.length;
    if (stageTurns.length) {
      self.stageSeducerRatios[ch].push(seducerTurns.length / stageTurns.length);
    }
  });

  // Issues
  session.issues.forEach(function(issue) {
    var key = issue.type + (issue.chapter ? ':' + issue.chapter : '') + (issue.chainId ? ':' + issue.chainId : '');
    this.issueCounts[key]  = (this.issueCounts[key]  || 0) + 1;
    if (!this.issueExamples[key]) this.issueExamples[key] = issue;
  }, this);
};

// ─── REPORT GENERATION ─────────────────────────────────────────────────────

function avg(arr) {
  if (!arr.length) return 0;
  return arr.reduce(function(a,b) { return a+b; }, 0) / arr.length;
}

function pct(n, d) {
  if (!d) return '–';
  return Math.round(n / d * 100) + '%';
}

function pad(str, len) {
  str = String(str);
  while (str.length < len) str += ' ';
  return str;
}

function generateReport(configs, aggregates, groupPromptCount, chainPromptsByChain) {
  var lines = [];
  var now   = new Date().toISOString().slice(0, 19).replace('T', ' ');

  lines.push('# Lyra\'s Orb — Simulation Report');
  lines.push('');
  lines.push('Generated: ' + now + '  |  Games per config: ' + N_GAMES + '  |  Turns/stage: ' + TURNS_PER_STAGE);
  lines.push('Group prompt pool: ' + groupPromptCount + '  |  Chain definitions: ' + Object.keys(chainPromptsByChain).length);
  lines.push('');
  lines.push('---');

  // Per-config results
  configs.forEach(function(config, ci) {
    var agg = aggregates[ci];
    lines.push('');
    lines.push('## Config ' + (ci + 1) + ': ' + config.name);
    lines.push('');
    lines.push('Players: ' + config.players.map(function(p) {
      return p.name + ' (' + p.gender + (p.isSeducer ? ', **seducer**' : '') + ')';
    }).join(', '));
    lines.push('');

    // Seducer turn share table (group mode only — couples has no seducer)
    if (config.mode !== 'couples') {
      lines.push('### Seducer Turn Share per Stage');
      lines.push('');
      lines.push('| Stage | Avg Actual | Expected | Delta | Status |');
      lines.push('|-------|-----------|----------|-------|--------|');

      var playerCount = config.players.length;
      CHAPTER_ORDER.forEach(function(ch) {
        var cfg          = CHAPTER_CONFIG[ch];
        var baseW        = 3;
        var seducerW     = baseW + cfg.seducerBonus;
        var totalW       = seducerW + baseW * (playerCount - 1);
        var expectedRatio= seducerW / totalW;
        var actualRatios = agg.stageSeducerRatios[ch];
        var actualAvg    = avg(actualRatios);
        var delta        = actualAvg - expectedRatio;
        var status       = Math.abs(delta) < 0.08 ? 'OK' : (delta < 0 ? 'LOW' : 'HIGH');
        lines.push('| ' + pad(ch, 10) + ' | ' + pad((actualAvg*100).toFixed(0)+'%', 10) + ' | ' + pad((expectedRatio*100).toFixed(0)+'%', 8) + ' | ' + pad((delta > 0 ? '+' : '') + (delta*100).toFixed(0)+'%', 5) + ' | ' + status + ' |');
      });
      lines.push('');
    }

    // Chain stats
    lines.push('### Chain Event Results (' + N_GAMES + ' games)');
    lines.push('');
    var chainIds = Object.keys(agg.chainTriggerRates).concat(
      Object.keys(chainPromptsByChain).filter(function(id) { return !agg.chainTriggerRates[id]; })
    ).filter(function(id, idx, arr) { return arr.indexOf(id) === idx; });

    if (!chainIds.length) {
      lines.push('_No chains triggered._');
    } else {
      lines.push('| Chain ID | Triggered | Trigger Rate | Completed | Completion Rate |');
      lines.push('|----------|-----------|-------------|-----------|----------------|');
      chainIds.forEach(function(chainId) {
        var tr  = agg.chainTriggerRates[chainId]    || { triggered: 0, total: 0 };
        var cr  = agg.chainCompletionRates[chainId] || { completed: 0, triggered: 0 };
        var trigRate = pct(tr.triggered, N_GAMES);
        var compRate = cr.triggered ? pct(cr.completed, cr.triggered) : '–';
        var flag = (tr.triggered === 0) ? ' ← never fired' : (cr.triggered > 0 && cr.completed / cr.triggered < 0.5) ? ' ← low completion' : '';
        lines.push('| ' + pad(chainId, 26) + ' | ' + pad(tr.triggered, 9) + ' | ' + pad(trigRate, 12) + ' | ' + pad(cr.completed, 9) + ' | ' + pad(compRate, 15) + ' |' + flag);
      });
    }
    lines.push('');

    // Issue summary
    lines.push('### Issues Detected (across ' + N_GAMES + ' games)');
    lines.push('');
    var issueKeys = Object.keys(agg.issueCounts).sort(function(a, b) {
      return agg.issueCounts[b] - agg.issueCounts[a];
    });
    if (!issueKeys.length) {
      lines.push('_No issues detected._');
    } else {
      lines.push('| Issue | Count | Severity | Example |');
      lines.push('|-------|-------|----------|---------|');
      issueKeys.forEach(function(key) {
        var ex  = agg.issueExamples[key];
        var sev = ex.severity || '–';
        var desc = describeIssue(ex);
        lines.push('| ' + key + ' | ' + agg.issueCounts[key] + ' | ' + sev + ' | ' + desc + ' |');
      });
    }
    lines.push('');
  });

  // ─── GLOBAL FINDINGS ───────────────────────────────────────────────────

  lines.push('---');
  lines.push('');
  lines.push('## Global Findings');
  lines.push('');

  // Merge all issues across configs
  var globalCounts = {};
  var globalExamples = {};
  aggregates.forEach(function(agg) {
    Object.keys(agg.issueCounts).forEach(function(key) {
      globalCounts[key]  = (globalCounts[key] || 0) + agg.issueCounts[key];
      if (!globalExamples[key]) globalExamples[key] = agg.issueExamples[key];
    });
  });

  var globalKeys = Object.keys(globalCounts).sort(function(a,b) { return globalCounts[b] - globalCounts[a]; });
  if (!globalKeys.length) {
    lines.push('No issues found across all configs.');
  } else {
    lines.push('| Rank | Issue | Total Occurrences | Severity |');
    lines.push('|------|-------|-------------------|----------|');
    globalKeys.forEach(function(key, idx) {
      var ex  = globalExamples[key];
      var sev = ex ? ex.severity : '–';
      lines.push('| ' + (idx+1) + ' | `' + key + '` | ' + globalCounts[key] + ' | ' + sev + ' |');
    });
  }
  lines.push('');

  // ─── FIX PLAN ──────────────────────────────────────────────────────────

  lines.push('---');
  lines.push('');
  lines.push('## Fix Plan');
  lines.push('');
  lines.push('Prioritized by severity × frequency. Each item has: **problem → root cause → fix**.');
  lines.push('');

  var planItems = buildFixPlan(globalCounts, globalExamples, aggregates, chainPromptsByChain);

  if (!planItems.length) {
    lines.push('_No fixes needed — all checks passed._');
  } else {
    planItems.forEach(function(item, idx) {
      lines.push((idx+1) + '. **[' + item.severity + '] ' + item.title + '**  ');
      lines.push('   - Problem: ' + item.problem);
      lines.push('   - Root cause: ' + item.cause);
      lines.push('   - Fix: ' + item.fix);
      lines.push('');
    });
  }

  lines.push('---');
  lines.push('');
  lines.push('_Generated by sim\\_runner.js — re-run after fixes to verify._');
  lines.push('');

  return lines.join('\n');
}

function describeIssue(ex) {
  if (!ex) return '–';
  switch (ex.type) {
    case 'intensity_too_low':   return 'turn ' + ex.turn + ': ' + ex.promptId + ' intensity=' + ex.intensity + ' (min ' + ex.minExpected + ') in ' + ex.chapter;
    case 'intensity_too_high':  return 'turn ' + ex.turn + ': ' + ex.promptId + ' intensity=' + ex.intensity + ' (max ' + ex.maxExpected + ') in ' + ex.chapter;
    case 'prompt_repeat':       return 'turn ' + ex.turn + ': ' + ex.promptId + ' repeated in ' + ex.chapter;
    case 'seducer_too_few_turns':   return ex.chapter + ': actual=' + ex.actual + ' expected=' + ex.expected;
    case 'seducer_too_many_turns':  return ex.chapter + ': actual=' + ex.actual + ' expected=' + ex.expected;
    case 'chain_abandoned':     return ex.chainId + ': ' + ex.stepsCompleted + '/' + ex.maxExpected + ' steps (' + ex.completedPct + '%)';
    case 'target_imbalance':    return ex.player + ' targeted ' + ex.count + '× (fair share ~' + ex.fairShare + ')';
    case 'stage_stall':         return ex.chapter + ': ' + ex.turns + ' turns (expected ' + ex.expected + ')';
    default: return JSON.stringify(ex).slice(0, 60);
  }
}

function buildFixPlan(globalCounts, globalExamples, aggregates, chainPromptsByChain) {
  var items = [];
  var SEVERITY_SCORE = { HIGH: 3, MEDIUM: 2, LOW: 1 };

  // Score each issue type
  var scored = Object.keys(globalCounts).map(function(key) {
    var ex    = globalExamples[key];
    var sev   = ex ? ex.severity : 'LOW';
    var score = (SEVERITY_SCORE[sev] || 1) * globalCounts[key];
    return { key: key, score: score, severity: sev, ex: ex, count: globalCounts[key] };
  }).sort(function(a,b) { return b.score - a.score; });

  scored.forEach(function(item) {
    var plan = fixPlanForIssue(item.key, item.ex, item.count, chainPromptsByChain);
    if (plan) {
      plan.severity = item.severity;
      items.push(plan);
    }
  });

  return items;
}

function fixPlanForIssue(key, ex, count, chainPromptsByChain) {
  if (!ex) return null;

  switch (ex.type) {

    case 'intensity_too_low':
      return {
        title:   'Prompts below intensity floor for stage (' + count + ' occurrences)',
        problem: 'Prompts with intensity ' + ex.intensity + ' appear during ' + ex.chapter + ' (min ' + ex.minExpected + '). Players feel whiplash — a weak prompt breaks the mood.',
        cause:   'Prompt tagged with wrong chapter in prompts_v2.js, or fallback selection ignores intensity when main pool is exhausted.',
        fix:     'Audit prompts_v2.js for prompts with chapter=' + ex.chapter + ' and intensity<' + ex.minExpected + '. Either raise their intensity value or move them to an earlier chapter. In orb-engine.js selectPromptByRole(), add intensity filter before the chapter-only fallback so stage floor is never violated.'
      };

    case 'intensity_too_high':
      return {
        title:   'Prompts above intensity ceiling for stage (' + count + ' occurrences)',
        problem: 'Prompts with intensity ' + ex.intensity + ' appear during ' + ex.chapter + ' (max ' + ex.maxExpected + '). Game escalates too fast.',
        cause:   'Prompt tagged with wrong (early) chapter but has high intensity — common when migrating content from old CSV.',
        fix:     'grep prompts_v2.js for chapter=' + ex.chapter + ' intensity>' + ex.maxExpected + '. Move these to a later chapter or lower intensity value.'
      };

    case 'prompt_repeat':
      return {
        title:   'Prompt repeats within ' + REPEAT_WINDOW + '-turn window (' + count + ' occurrences)',
        problem: 'Same prompt ID seen twice in ' + REPEAT_WINDOW + ' turns. Players notice repetition immediately and trust in the Orb breaks.',
        cause:   'Pool exhaustion in ' + ex.chapter + ' stage — not enough prompts with matching role/chapter causing the same prompts to recycle.',
        fix:     'Count prompts per chapter in prompts_v2.js. Target ≥50 per stage. If a stage is thin, either (a) add prompts in that chapter\'s intensity range, or (b) expand the recentIds window in orb-engine.js wasRecentlyUsedPrompt() for that stage. Also check that the fallback in selectPromptByRole() widens the pool before recycling.'
      };

    case 'seducer_too_few_turns':
      return {
        title:   'Seducer gets too few turns in ' + ex.chapter + ' (' + count + ' occurrences)',
        problem: 'Seducer\'s actual turn share (' + ex.actual + ') is far below expected (' + ex.expected + ') in ' + ex.chapter + '. The seducer\'s escalation arc loses steam.',
        cause:   'Either the weighting isn\'t applied correctly in chooseNextPlayer(), or the player rotation is round-robin overriding weights.',
        fix:     'In orb-engine.js chooseNextPlayer(): verify seducerWeightBonus is applied when gameState.seducerName matches. Check that the weighted array is rebuilt every turn (not cached). Confirm that player.isSeducer is correctly set from setup form into gameState.players.'
      };

    case 'seducer_too_many_turns':
      return {
        title:   'Seducer dominates turns in ' + ex.chapter + ' (' + count + ' occurrences)',
        problem: 'Seducer\'s actual turn share (' + ex.actual + ') far exceeds expected (' + ex.expected + ') in ' + ex.chapter + '. Other players feel sidelined.',
        cause:   'seducerBonus may be too high for this stage, or other players have low base weight.',
        fix:     'In orb-templates.js CHAPTER_CONFIG.' + ex.chapter + ', consider reducing seducerBonus by 1–2. Balance check: seducerShare should not exceed 60% even in taboo for a 3-player game.'
      };

    case 'chain_abandoned':
      var pct = ex.completedPct;
      return {
        title:   'Chain "' + ex.chainId + '" abandons before completion (' + count + ' occurrences, ' + pct + '% avg progress)',
        problem: 'Chain starts but never reaches its final step. Players build anticipation and get cut off.',
        cause:   (pct < 30)
          ? 'Chain fires but step 2+ is never selected — possibly a chapter-advance mid-chain (should be blocked), or the chain step selection logic fails to find step 2 when a different actor is chosen.'
          : 'Late steps require specific role/gender that is unavailable, or another chain fires before this one resolves.',
        fix:     (pct < 30)
          ? 'In orb-engine.js shouldAdvanceChapter(): confirm getActiveChainIds().length > 0 check is active and working. Also confirm getChainPrompt() finds step ' + (ex.stepsCompleted+1) + ' of chain "' + ex.chainId + '" — check chain_step values in orb-engine.js CHAIN_PROMPTS match sequential integers.'
          : 'Check that CHAIN_PROMPTS has all steps for "' + ex.chainId + '" defined. Confirm no role/gender constraint blocks later steps. Consider making chain steps use type="directed" with any target so they are never filtered out.'
      };

    case 'target_imbalance':
      return {
        title:   'Player "' + ex.player + '" targeted disproportionately (' + count + ' occurrences)',
        problem: ex.player + ' received ' + ex.count + ' directed prompts (fair share ~' + ex.fairShare + '). Creates an uncomfortable spotlight.',
        cause:   'Anti-repeat weighting may not be strong enough, or this player is a partner of several others creating natural pairings that stack.',
        fix:     'In chooseTarget(): increase the penalty for recently-targeted players. Specifically: if recentTargets.slice(-5) contains a name ≥2 times, zero out its weight. Also add a "hard block" if the same target was chosen last turn.'
      };

    case 'stage_stall':
      return {
        title:   'Stage "' + ex.chapter + '" stalls for ' + ex.turns + ' turns (' + count + ' occurrences)',
        problem: 'Chapter takes >2× expected duration. Late-stage players are stuck in low-intensity content.',
        cause:   'momentum check (<2) blocking advancement, or recentRefusals ≥3 holding the stage. In simulation, momentum building is slow.',
        fix:     'Review shouldAdvanceChapter() momentum gate. Consider: if turnInChapter > turnsToAdvance * 2, force advance regardless of momentum. Alternatively, lower the momentum threshold for taboo/erotic so the final stages are not gated behind a score that\'s hard to reach.'
      };

    default:
      return null;
  }
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

console.log('Loading prompts...');
var groupPrompts  = loadGroupPrompts();
var chainPrompts  = loadChainPrompts();

// Index group chains by chainId for reporting
var chainPromptsByChain = {};
chainPrompts.forEach(function(p) {
  if (!chainPromptsByChain[p.chain_id]) chainPromptsByChain[p.chain_id] = [];
  chainPromptsByChain[p.chain_id].push(p);
});

// Load couples prompts — split into regular + chain
var allCouplesPrompts      = loadCouplesPrompts();
var couplesRegularPrompts  = allCouplesPrompts.filter(function(p) { return !p.chain_id; });
var couplesChainPrompts    = allCouplesPrompts.filter(function(p) { return !!p.chain_id; });

var couplesChainsByChain = {};
couplesChainPrompts.forEach(function(p) {
  if (!couplesChainsByChain[p.chain_id]) couplesChainsByChain[p.chain_id] = [];
  couplesChainsByChain[p.chain_id].push(p);
});

console.log('Group prompts: ' + groupPrompts.length + '  |  Group chains: ' + Object.keys(chainPromptsByChain).length);
console.log('Couples prompts: ' + couplesRegularPrompts.length + '  |  Couples chains: ' + Object.keys(couplesChainsByChain).length);
console.log('');

if (!groupPrompts.length) {
  console.error('ERROR: No group prompts loaded. Aborting.');
  process.exit(1);
}

// ─── GROUP CONFIGS ─────────────────────────────────────────────────────────

console.log('=== GROUP MODE ===');
var groupAggregates = TEST_CONFIGS.map(function() { return null; });

TEST_CONFIGS.forEach(function(config, ci) {
  var agg = new AggregatedResult(config);
  groupAggregates[ci] = agg;

  console.log('[Group ' + (ci+1) + '/' + TEST_CONFIGS.length + '] ' + config.name);

  for (var g = 0; g < N_GAMES; g++) {
    var session = new GameSession(config, groupPrompts, chainPrompts);
    session.run();
    session.detectIssues();
    agg.absorb(session);
    if ((g + 1) % 5 === 0) process.stdout.write('  game ' + (g+1) + '/' + N_GAMES + '\n');
  }

  var totalIssues = Object.values(agg.issueCounts).reduce(function(a,b) { return a+b; }, 0);
  console.log('  → ' + totalIssues + ' issues');

  var chainKeys  = Object.keys(agg.chainTriggerRates);
  var neverFired = Object.keys(chainPromptsByChain).filter(function(id) { return !agg.chainTriggerRates[id]; });
  if (chainKeys.length) {
    console.log('  → Chains: ' + chainKeys.length + '/' + Object.keys(chainPromptsByChain).length +
                (neverFired.length ? ' (never: ' + neverFired.join(', ') + ')' : ''));
  }
  console.log('');
});

// ─── COUPLES CONFIGS ───────────────────────────────────────────────────────

console.log('=== COUPLES MODE ===');
var couplesAggregates = COUPLES_TEST_CONFIGS.map(function() { return null; });

COUPLES_TEST_CONFIGS.forEach(function(config, ci) {
  var agg = new AggregatedResult(config);
  couplesAggregates[ci] = agg;

  console.log('[Couples ' + (ci+1) + '/' + COUPLES_TEST_CONFIGS.length + '] ' + config.name);

  for (var g = 0; g < N_GAMES; g++) {
    var session = new GameSession(config, couplesRegularPrompts, couplesChainPrompts);
    session.run();
    session.detectIssues();
    agg.absorb(session);
    if ((g + 1) % 5 === 0) process.stdout.write('  game ' + (g+1) + '/' + N_GAMES + '\n');
  }

  var totalIssues = Object.values(agg.issueCounts).reduce(function(a,b) { return a+b; }, 0);
  console.log('  → ' + totalIssues + ' issues');

  var chainKeys  = Object.keys(agg.chainTriggerRates);
  var neverFired = Object.keys(couplesChainsByChain).filter(function(id) { return !agg.chainTriggerRates[id]; });
  if (chainKeys.length || Object.keys(couplesChainsByChain).length) {
    console.log('  → Chains: ' + chainKeys.length + '/' + Object.keys(couplesChainsByChain).length +
                (neverFired.length ? ' (never: ' + neverFired.join(', ') + ')' : ''));
  }
  console.log('');
});

// ─── REPORT ────────────────────────────────────────────────────────────────

console.log('Generating report...');

var groupReport   = generateReport(TEST_CONFIGS,         groupAggregates,   groupPrompts.length,          chainPromptsByChain);
var couplesReport = generateReport(COUPLES_TEST_CONFIGS, couplesAggregates, couplesRegularPrompts.length, couplesChainsByChain);

// Combine into one file with sections
var combinedReport = groupReport
  + '\n\n---\n\n# Couples Mode\n\n'
  + couplesReport.replace(/^# Lyra.*\n[\s\S]*?---\n\n/, ''); // strip redundant header from couples section

var reportPath = path.join(BASE, 'sim_report.md');
fs.writeFileSync(reportPath, combinedReport, 'utf8');

console.log('Report written to: sim_report.md');
console.log('');
console.log('Run again after fixes to track improvement.');
