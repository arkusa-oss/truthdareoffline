// =========================
// STATE
// =========================

const gameState = {
  gameMode: "group",  // "group" or "couple"
  players: [],
  playerHistory: [],
  currentPlayer: null,
  currentPlayerIndex: -1,

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
    attraction: {},
    preferredKiss: {},
    massageTarget: {},
    lastSelectedByPlayer: {},
    firstImpression: {},
    clothingRemoved: {},
    spinnerHistory: {},
    jealousy: {}           // { "Grecia": "not_jealous" | "jealous" | "unsure" }
  },

  // Jealousy test tracking: which arcs have fired, which players have been tested
  jealousyTested: {},      // { "Grecia": ["jealousy_test_soft"] } — completed arcs per player
  jealousyTestActive: null, // { jealousPlayer, partner, seducer, chainId } — active test trio

  // Voting & vulnerability system
  vulnerability: {},       // { "Hans": 3, "Grecia": 5 } — how open a player has been
  votingActive: false,
  lastVotedTurn: -99,
  lastMinigameTurn: -99,

  // Player rotation anti-repeat
  lastActor: null,
  consecutiveActorCount: 0,

  // Post-chain BRIDGE: third player joins the pair to maintain energy
  postChainBridge: null,        // { actor, target, third, step, maxSteps, intensity, chapter }

  // Truth→Dare follow-through queue: when a truth reveals something, follow up with a dare that acts on it
  followThroughQueue: null,     // { actor, target, prompt } — queued dare to play next turn

  // Player psychological profiles (built during personal stage)
  // Each player → { risk: 0, boldness: 0, compete: 0, openness: 0, boundaries: 0, ego: 0 }
  // Scores are cumulative: answering a profiling prompt adds to the dimension score.
  // Passing/refusing subtracts. Voting "reveal more" on someone adds to their dimension.
  playerProfiles: {},
  profilingComplete: {},  // { "PlayerName": true } — has this player answered enough profiling Qs?

  // Spinner state
  spinner: null,  // { spinsLeft: 2, outcomes: [], pool: [...], currentResults: [] }

  // Seducer role system
  seducerName: null,

  lastPrompt: null,
  promptHistory: [],    // [{ text, player, target, chapter, role, promptType, turn }]
  historyIndex: -1,     // -1 = viewing current prompt, >= 0 = browsing history
  lastResolvedTarget: null,
  lastChainEndTurn: -99,
  lastSpinnerTurn: -99,
  awaitingResolution: false,
  typePreference: "mixed"
};

// =========================
// DOM
// =========================

const promptTextEl = document.getElementById("promptText");
const metaTextEl = document.getElementById("metaText");
const nextBtn = document.getElementById("nextBtn");
const skipBtn = document.getElementById("skipBtn");
const resetBtn = document.getElementById("resetBtn");
const typePreferenceEl = document.getElementById("typePreference");
const stageLabelEl = document.getElementById("stageLabel");
const heatLabelEl = document.getElementById("heatLabel");
const orbRingEl = document.getElementById("orbRing");
const orbInnerGlowEl = document.getElementById("orbInnerGlow");
const playerLabelEl = document.getElementById("playerLabel");
const orbNameWheelEl = document.getElementById("orbNameWheel");
const setupOverlayEl = document.getElementById("setupOverlay");
const playerNameInputEl = document.getElementById("playerNameInput");
const playerGenderInputEl = document.getElementById("playerGenderInput");
const playerPartnerInputEl = document.getElementById("playerPartnerInput");
const addPlayerBtn = document.getElementById("addPlayerBtn");
const setupPlayerListEl = document.getElementById("setupPlayerList");
const startGameBtn = document.getElementById("startGameBtn");
const feedbackPanelEl = document.getElementById("feedbackPanel");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const passBtn = document.getElementById("passBtn");
const rulesOverlayEl = document.getElementById("rulesOverlay");
const rulesAcceptBtn = document.getElementById("rulesAcceptBtn");
const toastOverlayEl = document.getElementById("toastOverlay");
const toastTitleEl = document.getElementById("toastTitle");
const toastMessageEl = document.getElementById("toastMessage");
const toastDismissBtn = document.getElementById("toastDismissBtn");
const histPrevBtn = document.getElementById("histPrevBtn");
const histNextBtn = document.getElementById("histNextBtn");

let orbNameRevealEl = null;

