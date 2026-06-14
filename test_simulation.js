#!/usr/bin/env node

/**
 * Automated Test Runner for Truth-Dare Party Game
 *
 * Simulates multiple full game sessions with different player configs
 * and detects:
 * - Gendered pronouns in rendered prompt text
 * - Stage-inappropriate prompts
 * - Prompt repetition within short window
 * - Self-targeting issues
 * - Partner bias
 * - Chain progression issues
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// =========================
// SETUP DOM STUBS
// =========================

const domStubs = {
  document: {
    getElementById: () => null,
    querySelectorAll: () => ({ forEach: () => {} }),
    querySelector: () => null,
    addEventListener: () => {},
    body: {
      contains: () => false,
      className: '',
      addEventListener: () => {}
    },
    createElement: () => ({
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {},
      innerHTML: '',
      addEventListener: () => {},
      style: {}
    })
  },
  window: {
    requestAnimationFrame: (cb) => cb(),
    innerWidth: 1024,
    innerHeight: 768,
    addEventListener: () => {}
  },
  console: console,
  Math: Math,
  Object: Object,
  Array: Array,
  String: String,
  Number: Number,
  setTimeout: setTimeout,
  setInterval: setInterval,
  clearTimeout: clearTimeout,
  clearInterval: clearInterval
};

// =========================
// LOAD PROMPTS
// =========================

let PROMPTS = [];
let CHAPTER_ORDER = [];
let CHAPTER_CONFIG = {};

console.log('Loading prompts...');
try {
  const promptsSrc = fs.readFileSync('./prompts_v2.js', 'utf8');
  const startIdx = promptsSrc.indexOf('const CSV_PROMPTS = [');
  const endIdx = promptsSrc.lastIndexOf('];');
  if (startIdx >= 0 && endIdx > startIdx) {
    const dataStr = promptsSrc.substring(startIdx + 20, endIdx + 1);
    // Use eval to parse the JSON-like structure
    const CSV_PROMPTS = eval('[' + dataStr + ']');
    PROMPTS = CSV_PROMPTS && CSV_PROMPTS.length > 0 ? CSV_PROMPTS[0] : [];
  }
  console.log('Loaded', PROMPTS.length, 'prompts');
} catch (e) {
  console.error('Error loading prompts:', e.message);
}

console.log('Loading engine config...');
try {
  const engineCode = fs.readFileSync('./engine.js', 'utf8');
  const engineContext = Object.assign({}, domStubs);
  vm.runInNewContext(engineCode, engineContext);
  CHAPTER_ORDER = engineContext.CHAPTER_ORDER || ['playful', 'personal', 'flirty', 'suggestive', 'intimate', 'erotic', 'taboo'];
  CHAPTER_CONFIG = engineContext.CHAPTER_CONFIG || {};
  console.log('Loaded', CHAPTER_ORDER.length, 'chapters');
} catch (e) {
  console.error('Error loading engine:', e.message);
}

// Fallback configs if parsing failed
if (!CHAPTER_CONFIG || Object.keys(CHAPTER_CONFIG).length === 0) {
  CHAPTER_CONFIG = {
    playful: { order: ['setup', 'interaction', 'action', 'interaction', 'build', 'group', 'transition'], turnsToAdvance: 12, chainChance: 0.10, spinnerChance: 0, dareBias: 0 },
    personal: { order: ['setup', 'interaction', 'build', 'action', 'interaction', 'peak', 'transition'], turnsToAdvance: 10, chainChance: 0.15, spinnerChance: 0, dareBias: 0 },
    flirty: { order: ['setup', 'interaction', 'build', 'action', 'interaction', 'peak', 'transition'], turnsToAdvance: 10, chainChance: 0.20, spinnerChance: 0.12, dareBias: 0.35 },
    suggestive: { order: ['setup', 'interaction', 'build', 'action', 'build', 'peak', 'transition'], turnsToAdvance: 9, chainChance: 0.30, spinnerChance: 0.18, dareBias: 0.50 },
    intimate: { order: ['setup', 'interaction', 'build', 'action', 'build', 'peak', 'transition'], turnsToAdvance: 9, chainChance: 0.35, spinnerChance: 0.22, dareBias: 0.60 },
    erotic: { order: ['setup', 'build', 'action', 'build', 'peak', 'action', 'transition'], turnsToAdvance: 10, chainChance: 0.55, spinnerChance: 0.25, dareBias: 0.82 },
    taboo: { order: ['setup', 'build', 'action', 'peak', 'action', 'peak', 'transition'], turnsToAdvance: 12, chainChance: 0.85, spinnerChance: 0.22, dareBias: 0.92 }
  };
}

// =========================
// GAME STATE & HELPERS
// =========================

class GameSession {
  constructor(config) {
    this.players = config.players;
    this.config = config;
    this.issues = [];
    this.gameState = this.initGameState();
    this.sessionLog = [];
  }

  initGameState() {
    return {
      players: this.players.map((p, idx) => ({
        id: idx,
        name: p.name,
        gender: p.gender,
        partnerId: p.partnerId,
        partner: p.partner,
        pronouns: this.getPronouns(p.gender)
      })),
      currentPlayerIndex: -1,
      currentPlayer: null,
      chapters: CHAPTER_ORDER,
      chapterIndex: 0,
      turnCount: 0,
      turnInChapter: 0,
      activeChains: {},
      completedPromptIds: [],
      recentPromptIds: [],
      recentTargets: [],
      pairHistory: [],
      recentChains: [],
      momentum: 0,
      recentRefusals: 0,
      pairAffinity: {},
      memory: {
        firstImpression: {},
        clothingRemoved: {},
        spinnerHistory: {}
      },
      lastPrompt: null,
      lastResolvedTarget: null,
      lastChainEndTurn: -99,
      lastSpinnerTurn: -99,
      typePreference: 'mixed'
    };
  }

  getPronouns(gender) {
    if (gender === 'male') {
      return { subject: 'he', object: 'him', possessive: 'his' };
    } else if (gender === 'female') {
      return { subject: 'she', object: 'her', possessive: 'her' };
    }
    return { subject: 'they', object: 'them', possessive: 'their' };
  }

  getPlayerByName(name) {
    return this.gameState.players.find(p => p.name === name) || null;
  }

  getPlayerNames() {
    return this.gameState.players.map(p => p.name);
  }

  getOtherPlayerNames(actorName) {
    return this.getPlayerNames().filter(n => n !== actorName);
  }

  getCurrentChapter() {
    return this.gameState.chapters[this.gameState.chapterIndex];
  }

  getChapterConfig(chapter) {
    return CHAPTER_CONFIG[chapter] || CHAPTER_CONFIG.playful;
  }

  getCurrentRole() {
    const chapter = this.getCurrentChapter();
    const config = this.getChapterConfig(chapter);
    if (!config || !config.order) {
      return 'setup';
    }
    return config.order[this.gameState.turnInChapter % config.order.length];
  }

  shouldAdvanceChapter() {
    const chapter = this.getCurrentChapter();
    const config = this.getChapterConfig(chapter);
    if (this.gameState.turnInChapter < config.turnsToAdvance) return false;
    if (this.gameState.momentum < 2 && this.gameState.chapterIndex >= 2) return false;
    if (this.gameState.recentRefusals >= 3) return false;
    return true;
  }

  advanceChapter() {
    if (this.gameState.chapterIndex < this.gameState.chapters.length - 1) {
      this.gameState.chapterIndex += 1;
      this.gameState.turnInChapter = 0;
    }
  }

  randomFrom(array) {
    if (!array || !array.length) return null;
    return array[Math.floor(Math.random() * array.length)];
  }

  capitalize(name) {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  chooseNextPlayer() {
    const players = this.gameState.players;
    if (!players.length) return null;
    this.gameState.currentPlayerIndex = (this.gameState.currentPlayerIndex + 1) % players.length;
    const player = players[this.gameState.currentPlayerIndex];
    this.gameState.currentPlayer = player.name;
    return player.name;
  }

  chooseTarget(actorName, prompt) {
    const actorObj = this.getPlayerByName(actorName);
    if (!actorObj) return null;
    let others = this.getOtherPlayerNames(actorName);
    if (!others.length) return null;

    const text = (prompt && prompt.text ? prompt.text : '').toLowerCase();
    const isPartnerPrompt = text.indexOf('{partner}') >= 0 || text.indexOf('partner') >= 0;
    if (isPartnerPrompt && actorObj.partner && others.indexOf(actorObj.partner) >= 0) {
      return actorObj.partner;
    }

    // Gender-targeted prompts
    if (prompt && prompt.target_gender) {
      const genderFiltered = others.filter(name => {
        const p = this.getPlayerByName(name);
        return p && p.gender === prompt.target_gender;
      });
      if (genderFiltered.length) others = genderFiltered;
    }

    // Count recent targets
    const recentCounts = {};
    others.forEach(name => { recentCounts[name] = 0; });
    this.gameState.recentTargets.forEach(t => {
      if (recentCounts[t] !== undefined) recentCounts[t] += 1;
    });

    const minRecent = Math.min(...others.map(n => recentCounts[n]));

    const weighted = [];
    others.forEach(name => {
      let weight = 6;
      if (this.gameState.lastResolvedTarget === name) weight -= 4;
      const recentCount = recentCounts[name];
      weight -= recentCount * 2;
      if (recentCount === minRecent) weight += 2;
      const key = [actorName, name].sort().join('|');
      const affinity = this.gameState.pairAffinity[key] || 0;
      weight += Math.min(affinity, 1);
      if (actorObj.partner === name && others.length >= 2) {
        weight -= 3;
        const partnerRecent = this.gameState.recentTargets.slice(-8).filter(t => t === name).length;
        if (partnerRecent >= 1) weight -= 2;
        if (partnerRecent >= 2) weight -= 2;
      }
      if (actorObj.partner && actorObj.partner !== name && others.length >= 2) {
        weight += 1;
      }
      weight = Math.max(1, weight);
      for (let i = 0; i < weight; i++) weighted.push(name);
    });

    return this.randomFrom(weighted) || this.randomFrom(others);
  }

  selectPromptByRole(chapter, role) {
    const actor = this.gameState.currentPlayer;
    let pref = this.gameState.typePreference;
    const config = this.getChapterConfig(chapter);

    if (config.dareBias && Math.random() < config.dareBias) {
      pref = 'dare';
    }

    const lastTypes = this.gameState.completedPromptIds.slice(-2).map(id => {
      const p = PROMPTS.find(pr => pr.id === id);
      return p ? p.promptType : null;
    });
    let antiRepeatType = null;
    if (lastTypes.length === 2 && lastTypes[0] === lastTypes[1] && lastTypes[0] && pref === 'mixed') {
      antiRepeatType = lastTypes[0] === 'truth' ? 'dare' : 'truth';
    }

    let pool = PROMPTS.filter(p => {
      return p.chapter === chapter && p.role === role && !p.chain_id &&
        !this.wasRecentlyUsedPrompt(p.id) &&
        this.promptMatchesGender(p, actor) &&
        (pref === 'mixed' || !p.promptType || p.promptType === pref);
    });

    if (pool.length > 3 && antiRepeatType) {
      const diversePool = pool.filter(p => p.promptType === antiRepeatType);
      if (diversePool.length) pool = diversePool;
    }

    if (pool.length) return this.randomFrom(pool);

    // Relax type preference
    pool = PROMPTS.filter(p => {
      return p.chapter === chapter && p.role === role && !p.chain_id &&
        !this.wasRecentlyUsedPrompt(p.id) && this.promptMatchesGender(p, actor);
    });
    if (pool.length) return this.randomFrom(pool);

    // Relax role
    pool = PROMPTS.filter(p => {
      return p.chapter === chapter && !p.chain_id && !this.wasRecentlyUsedPrompt(p.id);
    });
    if (pool.length) return this.randomFrom(pool);

    // Last resort
    for (let i = 0; i < PROMPTS.length; i++) {
      if (PROMPTS[i].chapter === chapter) return PROMPTS[i];
    }

    return null;
  }

  wasRecentlyUsedPrompt(promptId) {
    const chapter = this.getCurrentChapter();
    if (chapter === 'erotic' || chapter === 'taboo' || chapter === 'intimate') {
      return this.gameState.completedPromptIds.indexOf(promptId) >= 0;
    }
    return this.gameState.recentPromptIds.indexOf(promptId) >= 0;
  }

  markPromptUsed(promptId) {
    this.gameState.completedPromptIds.push(promptId);
    this.gameState.recentPromptIds.push(promptId);
    const chapter = this.getCurrentChapter();
    const maxRecent = (chapter === 'erotic' || chapter === 'taboo') ? 60 : 40;
    if (this.gameState.recentPromptIds.length > maxRecent) {
      this.gameState.recentPromptIds.shift();
    }
  }

  promptMatchesGender(prompt, actorName) {
    if (!prompt.actor_gender && !prompt.target_gender) return true;
    const actorObj = this.getPlayerByName(actorName);
    if (!actorObj) return true;
    if (prompt.actor_gender && actorObj.gender !== prompt.actor_gender) return false;
    if (prompt.target_gender) {
      const hasTarget = this.gameState.players.some(p => {
        return p.name !== actorName && p.gender === prompt.target_gender;
      });
      if (!hasTarget) return false;
    }
    return true;
  }

  selectPrompt(actorName) {
    const chapter = this.getCurrentChapter();
    const role = this.getCurrentRole();
    const prompt = this.selectPromptByRole(chapter, role);
    if (!prompt) return null;

    let target = null;
    if (prompt.target === 'other' || prompt.type === 'directed') {
      target = this.chooseTarget(actorName, prompt);
    }
    return { prompt, actor: actorName, target };
  }

  injectPromptText(text, player, target) {
    let out = (text || '').trim();
    const actorObj = player ? this.getPlayerByName(player) : null;
    const partnerName = (actorObj && actorObj.partner) ? actorObj.partner : 'your partner';

    if (player) out = out.replace(/\{player\}/g, this.capitalize(player));
    if (target) out = out.replace(/\{target\}/g, this.capitalize(target));
    else out = out.replace(/\{target\}/g, 'someone');
    out = out.replace(/\{partner\}/g, partnerName);

    // Pronoun injection
    const targetObj = target ? this.getPlayerByName(target) : null;
    if (targetObj && targetObj.pronouns) {
      out = out.replace(/\{target_him\}/g, targetObj.pronouns.object);
      out = out.replace(/\{target_he\}/g, targetObj.pronouns.subject);
      out = out.replace(/\{target_his\}/g, targetObj.pronouns.possessive);
    }

    return out;
  }

  // =========================
  // SIMULATION & TESTING
  // =========================

  runTurn() {
    const actor = this.chooseNextPlayer();
    if (!actor) return false;

    const selection = this.selectPrompt(actor);
    if (!selection) return false;

    const { prompt, target } = selection;
    const renderedText = this.injectPromptText(prompt.text, actor, target);

    // Log the turn
    this.sessionLog.push({
      turn: this.gameState.turnCount,
      chapter: this.getCurrentChapter(),
      role: this.getCurrentRole(),
      actor,
      target,
      promptId: prompt.id,
      promptType: prompt.promptType,
      promptChapter: prompt.chapter,
      renderedText,
      intensity: prompt.intensity
    });

    // Mark prompt as used
    this.markPromptUsed(prompt.id);

    // Update targets
    if (target) {
      this.gameState.recentTargets.push(target);
      if (this.gameState.recentTargets.length > 10) {
        this.gameState.recentTargets.shift();
      }
      this.gameState.lastResolvedTarget = target;
    }

    // Update state
    this.gameState.turnCount += 1;
    this.gameState.turnInChapter += 1;

    // Check if we should advance chapter
    if (this.shouldAdvanceChapter()) {
      this.advanceChapter();
    }

    return true;
  }

  runSession(turnsPerChapter = 10) {
    const totalTurns = turnsPerChapter * CHAPTER_ORDER.length;
    for (let i = 0; i < totalTurns; i++) {
      if (!this.runTurn()) break;
    }
  }

  // =========================
  // ISSUE DETECTION
  // =========================

  detectGenderedPronouns() {
    const issues = [];
    const erotic_lingerie_chain = 'erotic_lingerie'; // Known intentionally gendered chain

    this.sessionLog.forEach(turn => {
      const text = turn.renderedText.toLowerCase();

      // Check for gendered pronouns in rendered text
      const genderedPatterns = [
        { pattern: /\bher\b/g, pronoun: 'her', allowed_chains: [erotic_lingerie_chain] },
        { pattern: /\bhim\b/g, pronoun: 'him', allowed_chains: [erotic_lingerie_chain] },
        { pattern: /\bshe\b/g, pronoun: 'she', allowed_chains: [erotic_lingerie_chain] },
        { pattern: /\bhe\b/g, pronoun: 'he', allowed_chains: [erotic_lingerie_chain] }
      ];

      genderedPatterns.forEach(({ pattern, pronoun, allowed_chains }) => {
        if (pattern.test(text)) {
          // Skip if this is an allowed chain
          const prompt = PROMPTS.find(p => p.id === turn.promptId);
          const isAllowedChain = prompt && allowed_chains.includes(prompt.chain_id);

          if (!isAllowedChain) {
            issues.push({
              type: 'gendered_pronoun',
              severity: 'high',
              turn: turn.turn,
              chapter: turn.chapter,
              actor: turn.actor,
              target: turn.target,
              pronoun: pronoun,
              promptId: turn.promptId,
              text: turn.renderedText
            });
          }
        }
      });
    });

    return issues;
  }

  detectStageInappropriate() {
    const issues = [];

    // Define stage tone expectations (very loose - just major mismatches)
    const stageExpectations = {
      playful: { intensity: [1, 2, 3] },
      personal: { intensity: [2, 3, 4] },
      flirty: { intensity: [3, 4, 5] },
      suggestive: { intensity: [4, 5, 6] },
      intimate: { intensity: [5, 6, 7] },
      erotic: { intensity: [6, 7, 8] },
      taboo: { intensity: [7, 8, 9] }
    };

    this.sessionLog.forEach(turn => {
      const expectations = stageExpectations[turn.chapter];
      if (expectations && turn.intensity) {
        // Flag if intensity is way too low for stage (more than 2 points below expected)
        const minExpected = Math.min(...expectations.intensity);
        if (turn.intensity < minExpected - 2) {
          issues.push({
            type: 'stage_inappropriate',
            severity: 'medium',
            turn: turn.turn,
            chapter: turn.chapter,
            actor: turn.actor,
            promptId: turn.promptId,
            intensity: turn.intensity,
            expected_min: minExpected,
            text: turn.renderedText
          });
        }
      }
    });

    return issues;
  }

  detectPromptRepetition() {
    const issues = [];
    const windowSize = 5; // Check within last 5 turns

    for (let i = windowSize; i < this.sessionLog.length; i++) {
      const current = this.sessionLog[i];
      const window = this.sessionLog.slice(i - windowSize, i);

      const samePrompt = window.find(t => t.promptId === current.promptId);
      if (samePrompt) {
        issues.push({
          type: 'prompt_repetition',
          severity: 'medium',
          turn: current.turn,
          chapter: current.chapter,
          actor: current.actor,
          promptId: current.promptId,
          previousTurn: samePrompt.turn,
          turnsApart: current.turn - samePrompt.turn,
          text: current.renderedText
        });
      }
    }

    return issues;
  }

  detectSelfTargeting() {
    const issues = [];

    this.sessionLog.forEach(turn => {
      if (turn.actor === turn.target && turn.target) {
        // Self-targeting might be intentional for some prompts, but flag it
        const prompt = PROMPTS.find(p => p.id === turn.promptId);
        if (prompt && prompt.target !== 'self') {
          issues.push({
            type: 'self_targeting',
            severity: 'low',
            turn: turn.turn,
            chapter: turn.chapter,
            actor: turn.actor,
            promptId: turn.promptId,
            promptType: prompt.type,
            text: turn.renderedText
          });
        }
      }
    });

    return issues;
  }

  detectPartnerBias() {
    const issues = [];

    // Count pair interactions
    const pairCounts = {};
    this.sessionLog.forEach(turn => {
      if (turn.actor && turn.target) {
        const key = [turn.actor, turn.target].sort().join('|');
        pairCounts[key] = (pairCounts[key] || 0) + 1;
      }
    });

    // Find partner pairs and compare with other pairs
    const partnerPairs = [];
    const otherPairs = [];

    Object.entries(pairCounts).forEach(([key, count]) => {
      const [p1, p2] = key.split('|');
      const p1Obj = this.getPlayerByName(p1);
      const isPartnerPair = p1Obj && p1Obj.partner === p2;

      if (isPartnerPair) {
        partnerPairs.push({ pair: key, count });
      } else {
        otherPairs.push({ pair: key, count });
      }
    });

    // If partners are paired significantly more than others
    const avgPartnerCount = partnerPairs.reduce((s, p) => s + p.count, 0) / (partnerPairs.length || 1);
    const avgOtherCount = otherPairs.reduce((s, p) => s + p.count, 0) / (otherPairs.length || 1);

    if (partnerPairs.length > 0 && otherPairs.length > 0) {
      if (avgPartnerCount > avgOtherCount * 1.3) {
        issues.push({
          type: 'partner_bias',
          severity: 'medium',
          avgPartnerInteractions: avgPartnerCount.toFixed(2),
          avgOtherInteractions: avgOtherCount.toFixed(2),
          partnerPairs: partnerPairs.length,
          otherPairs: otherPairs.length,
          detail: `Partners paired ${avgPartnerCount.toFixed(1)}x on average, others ${avgOtherCount.toFixed(1)}x`
        });
      }
    }

    return issues;
  }

  detectChainIssues() {
    const issues = [];

    // Check that chains are properly sequenced
    const chainSteps = {};
    this.sessionLog.forEach(turn => {
      const prompt = PROMPTS.find(p => p.id === turn.promptId);
      if (prompt && prompt.chain_id) {
        if (!chainSteps[prompt.chain_id]) {
          chainSteps[prompt.chain_id] = [];
        }
        chainSteps[prompt.chain_id].push({
          step: prompt.chain_step,
          turn: turn.turn,
          chapter: turn.chapter
        });
      }
    });

    // Check for broken chains or missing steps
    Object.entries(chainSteps).forEach(([chainId, steps]) => {
      // Sort by step
      steps.sort((a, b) => a.step - b.step);

      // Check for gaps
      for (let i = 0; i < steps.length - 1; i++) {
        if (steps[i + 1].step - steps[i].step !== 1) {
          issues.push({
            type: 'chain_gap',
            severity: 'low',
            chainId,
            expectedStep: steps[i].step + 1,
            actualStep: steps[i + 1].step,
            turn: steps[i + 1].turn
          });
        }
      }
    });

    return issues;
  }

  detectAllIssues() {
    this.issues = [
      ...this.detectGenderedPronouns(),
      ...this.detectStageInappropriate(),
      ...this.detectPromptRepetition(),
      ...this.detectSelfTargeting(),
      ...this.detectPartnerBias(),
      ...this.detectChainIssues()
    ];
    return this.issues;
  }
}

// =========================
// TEST CONFIGURATIONS
// =========================

const testConfigs = [
  {
    name: 'Config A: 3 players (Hans+Grecia couple, Nella single)',
    players: [
      { name: 'Hans', gender: 'male', partnerId: 1, partner: 'Grecia' },
      { name: 'Grecia', gender: 'female', partnerId: 0, partner: 'Hans' },
      { name: 'Nella', gender: 'female', partnerId: null, partner: null }
    ]
  },
  {
    name: 'Config B: 4 players (2 couples)',
    players: [
      { name: 'Alice', gender: 'female', partnerId: 1, partner: 'Bob' },
      { name: 'Bob', gender: 'male', partnerId: 0, partner: 'Alice' },
      { name: 'Carol', gender: 'female', partnerId: 3, partner: 'Dave' },
      { name: 'Dave', gender: 'male', partnerId: 2, partner: 'Carol' }
    ]
  },
  {
    name: 'Config C: 5 players (3 male, 2 female, 1 couple)',
    players: [
      { name: 'Marcus', gender: 'male', partnerId: 1, partner: 'Nina' },
      { name: 'Nina', gender: 'female', partnerId: 0, partner: 'Marcus' },
      { name: 'Oscar', gender: 'male', partnerId: null, partner: null },
      { name: 'Paul', gender: 'male', partnerId: null, partner: null },
      { name: 'Quinn', gender: 'female', partnerId: null, partner: null }
    ]
  }
];

// =========================
// RUNNER
// =========================

function formatIssue(issue) {
  const common = `Turn ${issue.turn || 'N/A'} [${issue.chapter || 'N/A'}]`;

  switch (issue.type) {
    case 'gendered_pronoun':
      return `  PRONOUN: ${common}: "${issue.pronoun}" found in prompt ${issue.promptId} (${issue.actor} -> ${issue.target})\n    "${issue.text}"`;
    case 'stage_inappropriate':
      return `  STAGE: ${common}: Intensity ${issue.intensity} too low for stage (expected min ${issue.expected_min}) in ${issue.promptId}`;
    case 'prompt_repetition':
      return `  REPEAT: ${common}: Prompt ${issue.promptId} repeated (${issue.turnsApart} turns after turn ${issue.previousTurn})`;
    case 'self_targeting':
      return `  SELF: ${common}: ${issue.actor} targeted self with prompt type "${issue.promptType}"`;
    case 'partner_bias':
      return `  BIAS: Partners paired avg ${issue.avgPartnerInteractions}x, others ${issue.avgOtherInteractions}x`;
    case 'chain_gap':
      return `  CHAIN: Turn ${issue.turn}: Chain ${issue.chainId} missing step (expected ${issue.expectedStep}, got ${issue.actualStep})`;
    default:
      return `  UNKNOWN: ${JSON.stringify(issue)}`;
  }
}

console.log('=============================================================================');
console.log('TRUTH-DARE AUTOMATED TEST RUNNER');
console.log('=============================================================================\n');
console.log(`Loaded ${PROMPTS.length} prompts across ${CHAPTER_ORDER.length} stages`);
console.log(`Chapters: ${CHAPTER_ORDER.join(' -> ')}\n`);

if (PROMPTS.length === 0) {
  console.error('ERROR: No prompts loaded! Cannot run tests.');
  process.exit(1);
}

let totalIssues = 0;

testConfigs.forEach((config, configIdx) => {
  console.log(`\n---------------------------------------------------------------------------`);
  console.log(`TEST ${configIdx + 1}: ${config.name}`);
  console.log(`---------------------------------------------------------------------------`);

  const session = new GameSession(config);
  session.runSession(15);

  console.log(`\nSession completed: ${session.sessionLog.length} turns across ${CHAPTER_ORDER.length} stages`);
  console.log(`Prompts used: ${session.gameState.completedPromptIds.length}`);
  console.log(`Unique prompts: ${new Set(session.gameState.completedPromptIds).size}\n`);

  const issues = session.detectAllIssues();

  if (issues.length === 0) {
    console.log('✓ No issues detected!\n');
  } else {
    console.log(`Found ${issues.length} issues:\n`);

    // Group by type
    const byType = {};
    issues.forEach(issue => {
      if (!byType[issue.type]) byType[issue.type] = [];
      byType[issue.type].push(issue);
    });

    Object.entries(byType).forEach(([type, typeIssues]) => {
      console.log(`[${type.toUpperCase()}] - ${typeIssues.length} issues:`);
      typeIssues.slice(0, 3).forEach(issue => {
        console.log(formatIssue(issue));
      });
      if (typeIssues.length > 3) {
        console.log(`  ... and ${typeIssues.length - 3} more`);
      }
      console.log();
    });
  }

  totalIssues += issues.length;

  // Show sample prompts from different stages
  console.log('Sample prompts used per stage:');
  const byChapter = {};
  session.sessionLog.forEach(turn => {
    if (!byChapter[turn.chapter]) byChapter[turn.chapter] = [];
    byChapter[turn.chapter].push(turn);
  });

  Object.entries(byChapter).forEach(([chapter, turns]) => {
    const sampleTurn = turns[Math.floor(turns.length / 2)];
    if (sampleTurn) {
      console.log(`  ${chapter}: "${sampleTurn.renderedText.substring(0, 70)}..."`);
    }
  });
});

console.log(`\n=============================================================================`);
console.log(`SUMMARY: ${totalIssues} total issues across all configs`);
console.log(`=============================================================================\n`);

// Create summary report
let reportContent = '';
reportContent += '# Truth-Dare Automated Test Report\n';
reportContent += `Generated: ${new Date().toISOString()}\n\n`;
reportContent += `## Results\n`;
reportContent += `- Total Issues Found: ${totalIssues}\n`;
reportContent += `- Configurations Tested: ${testConfigs.length}\n`;
reportContent += `- Total Prompts Loaded: ${PROMPTS.length}\n`;
reportContent += `- Game Stages: ${CHAPTER_ORDER.length}\n\n`;

reportContent += `## Test Configurations\n`;
testConfigs.forEach((cfg, idx) => {
  reportContent += `${idx + 1}. ${cfg.name}\n`;
  reportContent += `   - Players: ${cfg.players.map(p => `${p.name} (${p.gender}${p.partner ? ', partner: ' + p.partner : ''})`).join(', ')}\n`;
});

reportContent += `\n## Detection Capabilities\n`;
reportContent += `The test runner detects:\n`;
reportContent += `- Gendered pronouns (her/him/he/she) in rendered prompts (except erotic_lingerie chain)\n`;
reportContent += `- Stage-inappropriate prompts (intensity mismatches)\n`;
reportContent += `- Prompt repetition within 5-turn windows\n`;
reportContent += `- Self-targeting issues (player assigned as both actor and target)\n`;
reportContent += `- Partner bias (couples paired significantly more than other combinations)\n`;
reportContent += `- Chain progression issues (missing or out-of-order steps)\n`;

// Write to file
try {
  fs.writeFileSync('./test_report.md', reportContent, 'utf8');
  console.log('Report written to test_report.md\n');
} catch (e) {
  console.log('(Report file write failed, output to console only)\n');
}

if (totalIssues === 0) {
  console.log('✓ All tests passed! No critical issues detected.\n');
  process.exit(0);
} else {
  console.log(`✗ ${totalIssues} issues detected. Review above for details.\n`);
  process.exit(1);
}
