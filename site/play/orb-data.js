// engine.js
// Orb Engine v3 — 7-Stage Curated Prompt System
// Loads curated prompts from prompts_v2.js (chain system ready but empty for now)

// =========================
// CHAIN PROMPTS — disabled for now, to be replaced with real T/D chains later
// =========================

const CHAIN_PROMPTS = [
  {
    "id": "CHN2000",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "Lock eyes with {target} for 10 seconds without looking away.",
    "target": "other",
    "chain_id": "flirty_eye_contact",
    "chain_step": 1
  },
  {
    "id": "CHN2001",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "Give {target} your most flirtatious smile and hold it.",
    "target": "other",
    "chain_id": "flirty_eye_contact",
    "chain_step": 2
  },
  {
    "id": "CHN2002",
    "chapter": "flirty",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "Whisper to {target} what you were thinking during that eye contact.",
    "target": "other",
    "chain_id": "flirty_eye_contact",
    "chain_step": 3
  },
  {
    "id": "CHN2003",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "What's the first thing you noticed about {target} when you met them?",
    "target": "other",
    "chain_id": "flirty_compliment",
    "chain_step": 1
  },
  {
    "id": "CHN2004",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "Give {target} the most genuine compliment you can think of — make them feel it.",
    "target": "other",
    "chain_id": "flirty_compliment",
    "chain_step": 2
  },
  {
    "id": "CHN2005",
    "chapter": "flirty",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "Look {target} in the eyes and tell them what makes them attractive.",
    "target": "other",
    "chain_id": "flirty_compliment",
    "chain_step": 3
  },
  {
    "id": "CHN2006",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "Where on your body do you like being touched the most?",
    "target": "self",
    "chain_id": "suggestive_touch",
    "chain_step": 1
  },
  {
    "id": "CHN2007",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "Place your hand on {target}'s knee and leave it there for 30 seconds.",
    "target": "other",
    "chain_id": "suggestive_touch",
    "chain_step": 2
  },
  {
    "id": "CHN2008",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "Slowly trace your fingers up {target}'s arm from wrist to shoulder.",
    "target": "other",
    "chain_id": "suggestive_touch",
    "chain_step": 3
  },
  {
    "id": "CHN2009",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "What's the most seductive thing anyone has ever said to you?",
    "target": "self",
    "chain_id": "suggestive_tease",
    "chain_step": 1
  },
  {
    "id": "CHN2010",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "Lean close to {target} and whisper something that would make them blush.",
    "target": "other",
    "chain_id": "suggestive_tease",
    "chain_step": 2
  },
  {
    "id": "CHN2011",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "In your most seductive voice, describe to {target} what a perfect first kiss would look like.",
    "target": "other",
    "chain_id": "suggestive_tease",
    "chain_step": 3
  },
  {
    "id": "CHN2012",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "Stand up and do your best slow, sensual walk across the room.",
    "target": "self",
    "chain_id": "suggestive_dance",
    "chain_step": 1
  },
  {
    "id": "CHN2013",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "Dance slowly in front of {target} — make it impossible for them to look away.",
    "target": "other",
    "chain_id": "suggestive_dance",
    "chain_step": 2
  },
  {
    "id": "CHN2014",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "Pull {target} up and slow dance together, as close as you dare.",
    "target": "other",
    "chain_id": "suggestive_dance",
    "chain_step": 3
  },
  {
    "id": "CHN2015",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "Describe the best kiss you've ever had — where was it, and what made it unforgettable?",
    "target": "self",
    "chain_id": "intimate_kiss",
    "chain_step": 1
  },
  {
    "id": "CHN2016",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "Give {target} a slow, gentle kiss on the cheek.",
    "target": "other",
    "chain_id": "intimate_kiss",
    "chain_step": 2
  },
  {
    "id": "CHN2017",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "Kiss {target} on the lips — take your time.",
    "target": "other",
    "chain_id": "intimate_kiss",
    "chain_step": 3
  },
  {
    "id": "CHN2018",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "What's something someone did on a date that completely caught you off guard — in the best way?",
    "target": "self",
    "chain_id": "intimate_closeness",
    "chain_step": 1
  },
  {
    "id": "CHN2019",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "Slow dance with {target} for one full song — no talking, just eye contact.",
    "target": "other",
    "chain_id": "intimate_closeness",
    "chain_step": 2
  },
  {
    "id": "CHN2020",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "Whisper something in {target}'s ear that you've been thinking all night but haven't said out loud.",
    "target": "other",
    "chain_id": "intimate_closeness",
    "chain_step": 3
  },
  {
    "id": "CHN2021",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "What kind of touch relaxes you the most?",
    "target": "self",
    "chain_id": "intimate_massage",
    "chain_step": 1
  },
  {
    "id": "CHN2022",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "Give {target} a gentle shoulder and neck massage for one minute.",
    "target": "other",
    "chain_id": "intimate_massage",
    "chain_step": 2
  },
  {
    "id": "CHN2023",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "Give {target} a slow back massage — they can tell you exactly where.",
    "target": "other",
    "chain_id": "intimate_massage",
    "chain_step": 3
  },
  {
    "id": "CHN2030",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "What's the boldest move someone has ever made on you — and did it work?",
    "target": "self",
    "chain_id": "intimate_boldness",
    "chain_step": 1
  },
  {
    "id": "CHN2031",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "Make a bold move on {target} right now — something that would make Lyra proud.",
    "target": "other",
    "chain_id": "intimate_boldness",
    "chain_step": 2
  },
  {
    "id": "CHN2032",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{target}, your turn. Show them what a real bold move looks like.",
    "target": "other",
    "chain_id": "intimate_boldness",
    "chain_step": 3
  },
  {
    "id": "CHN2033",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "If you could relive one moment with someone in this room, what would it be — and what would you change?",
    "target": "self",
    "chain_id": "intimate_desire",
    "chain_step": 1
  },
  {
    "id": "CHN2034",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "Look at {target} and finish this sentence out loud: 'The thing I want most right now is...'",
    "target": "other",
    "chain_id": "intimate_desire",
    "chain_step": 2
  },
  {
    "id": "CHN2035",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.8,
    "text": "Show {target} what you just said — without words.",
    "target": "other",
    "chain_id": "intimate_desire",
    "chain_step": 3
  },
  {
    "id": "CHN2036",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "What's the most seductive thing someone can do without touching you?",
    "target": "self",
    "chain_id": "intimate_tease",
    "chain_step": 1
  },
  {
    "id": "CHN2037",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "Try to seduce {target} using only your eyes and body language — no touching, no talking. You have 30 seconds.",
    "target": "other",
    "chain_id": "intimate_tease",
    "chain_step": 2
  },
  {
    "id": "CHN2038",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "Now you can touch. Pick up where you left off with {target} — but slowly.",
    "target": "other",
    "chain_id": "intimate_tease",
    "chain_step": 3
  },
  {
    "id": "CHN2024",
    "chapter": "erotic",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "Remove one item of your own clothing — your choice.",
    "target": "self",
    "chain_id": "erotic_undress",
    "chain_step": 1
  },
  {
    "id": "CHN2025",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "Let {target} choose which item of clothing you take off next.",
    "target": "other",
    "chain_id": "erotic_undress",
    "chain_step": 2
  },
  {
    "id": "CHN2026",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "Slowly remove an item of {target}'s clothing for them.",
    "target": "other",
    "chain_id": "erotic_undress",
    "chain_step": 3
  },
  {
    "id": "CHN2027",
    "chapter": "erotic",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "Do your most seductive walk over to {target} and sit next to them.",
    "target": "other",
    "chain_id": "erotic_lapdance",
    "chain_step": 1
  },
  {
    "id": "CHN2028",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "Sit on {target}'s lap facing them — hold the position.",
    "target": "other",
    "chain_id": "erotic_lapdance",
    "chain_step": 2
  },
  {
    "id": "CHN2029",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "Give {target} a full lap dance — take your time and own it.",
    "target": "other",
    "chain_id": "erotic_lapdance",
    "chain_step": 3
  },
  {
    "id": "CHN2039",
    "chapter": "erotic",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "What's a sexual fantasy you've never told anyone about?",
    "target": "self",
    "chain_id": "erotic_confession",
    "chain_step": 1
  },
  {
    "id": "CHN2040",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "If you could do anything with {target} tonight with no consequences, what would it be?",
    "target": "other",
    "chain_id": "erotic_confession",
    "chain_step": 2
  },
  {
    "id": "CHN2041",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "Look {target} in the eyes and tell them exactly what you'd do to them right now if you could.",
    "target": "other",
    "chain_id": "erotic_confession",
    "chain_step": 3
  },
  // =============================================
  // TABOO SEDUCTION ARC A: The Blindfold Path
  // Sensory escalation — trust, touch, surrender
  // =============================================
  { id: "ARC_A1", chapter: "taboo", role: "setup", type: "directed", promptType: "truth",
    intensity: 8, text: "Where on your body are you most sensitive to being touched?",
    target: "self", chain_id: "taboo_blindfold", chain_step: 1 },
  { id: "ARC_A2", chapter: "taboo", role: "build", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Close your eyes and let {target} trace a finger slowly from your wrist to your shoulder.",
    target: "other", chain_id: "taboo_blindfold", chain_step: 2 },
  { id: "ARC_A3", chapter: "taboo", role: "action", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Remove one item of clothing — make it slow and deliberate for {target}.",
    target: "other", chain_id: "taboo_blindfold", chain_step: 3 },
  { id: "ARC_A4", chapter: "taboo", role: "build", type: "directed", promptType: "dare",
    intensity: 9, text: "Blindfold yourself. {target} gets to touch you anywhere above the waist for 20 seconds.",
    target: "other", chain_id: "taboo_blindfold", chain_step: 4 },
  { id: "ARC_A5", chapter: "taboo", role: "action", type: "directed", promptType: "dare",
    intensity: 9, text: "Keep the blindfold on. {target} gives you a slow neck and shoulder massage.",
    target: "other", chain_id: "taboo_blindfold", chain_step: 5 },
  { id: "ARC_A6", chapter: "taboo", role: "build", type: "directed", promptType: "truth",
    intensity: 9, text: "Still blindfolded — if someone else kissed you right now, would you want them to?",
    target: "self", chain_id: "taboo_blindfold", chain_step: 6 },
  { id: "ARC_A7", chapter: "taboo", role: "peak", type: "directed", promptType: "dare",
    intensity: 9.5, text: "Remove the blindfold. French kiss {target} — slow, deep, no rush.",
    target: "other", chain_id: "taboo_blindfold", chain_step: 7 },

  // =============================================
  // TABOO SEDUCTION ARC B: The Exposure Path
  // Clothing, vulnerability, temptation
  // =============================================
  { id: "ARC_B1", chapter: "taboo", role: "setup", type: "directed", promptType: "dare",
    intensity: 8, text: "Do a slow strip — remove one piece of clothing as seductively as you can for {target}.",
    target: "other", chain_id: "taboo_exposure", chain_step: 1 },
  { id: "ARC_B2", chapter: "taboo", role: "build", type: "directed", promptType: "truth",
    intensity: 8.5, text: "Which player here would you most want to undress you — and why?",
    target: "self", chain_id: "taboo_exposure", chain_step: 2 },
  { id: "ARC_B3", chapter: "taboo", role: "action", type: "directed", promptType: "dare",
    intensity: 9, text: "Let {target} slowly remove one piece of your clothing using only their teeth.",
    target: "other", chain_id: "taboo_exposure", chain_step: 3 },
  { id: "ARC_B4", chapter: "taboo", role: "build", type: "directed", promptType: "dare",
    intensity: 9, text: "Swap an item of clothing with {target} — wear each other's piece for the next 3 turns.",
    target: "other", chain_id: "taboo_exposure", chain_step: 4 },
  { id: "ARC_B5", chapter: "taboo", role: "action", type: "directed", promptType: "dare",
    intensity: 9, text: "Both you and {target} remove an item at the same time — whoever hesitates does an extra one.",
    target: "other", chain_id: "taboo_exposure", chain_step: 5 },
  { id: "ARC_B6", chapter: "taboo", role: "build", type: "directed", promptType: "truth",
    intensity: 9.5, text: "Look at {target} right now — what do you want to happen next between you two?",
    target: "other", chain_id: "taboo_exposure", chain_step: 6 },
  { id: "ARC_B7", chapter: "taboo", role: "peak", type: "directed", promptType: "dare",
    intensity: 9.5, text: "Kiss {target} from their neck down to their waist — take your time.",
    target: "other", chain_id: "taboo_exposure", chain_step: 7 },

  // =============================================
  // TABOO SEDUCTION ARC C: The Connection Path
  // REWORKED: More buildup — caressing, kissing, clothing BEFORE threesome
  // =============================================
  { id: "ARC_C1", chapter: "taboo", role: "setup", type: "directed", promptType: "truth",
    intensity: 8, text: "Where do you secretly love being kissed — besides the lips?",
    target: "self", chain_id: "taboo_connection", chain_step: 1 },
  { id: "ARC_C2", chapter: "taboo", role: "build", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Kiss {target}'s neck slowly — find the spot that makes them react.",
    target: "other", chain_id: "taboo_connection", chain_step: 2 },
  { id: "ARC_C3", chapter: "taboo", role: "action", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Let {target} slowly remove one piece of your clothing. Hold eye contact the entire time.",
    target: "other", chain_id: "taboo_connection", chain_step: 3 },
  { id: "ARC_C4", chapter: "taboo", role: "build", type: "directed", promptType: "dare",
    intensity: 9, text: "Run your hands slowly down {target}'s back — from their shoulders to their waist. Take your time.",
    target: "other", chain_id: "taboo_connection", chain_step: 4 },
  { id: "ARC_C5", chapter: "taboo", role: "action", type: "directed", promptType: "dare",
    intensity: 9, text: "French kiss {target} for 15 seconds — make it deep, make it count.",
    target: "other", chain_id: "taboo_connection", chain_step: 5 },
  { id: "ARC_C6", chapter: "taboo", role: "build", type: "directed", promptType: "truth",
    intensity: 9, text: "Have you ever fantasized about being with more than one person at once? Be honest.",
    target: "self", chain_id: "taboo_connection", chain_step: 6 },
  { id: "ARC_C7", chapter: "taboo", role: "action", type: "directed", promptType: "truth",
    intensity: 9.5, text: "Look around the room. If a threesome happened right now — who would you choose? Say their names.",
    target: "self", chain_id: "taboo_connection", chain_step: 7 },
  { id: "ARC_C8", chapter: "taboo", role: "build", type: "directed", promptType: "dare",
    intensity: 9.5, text: "Kiss both people you named — one after the other. Show them you meant it.",
    target: "self", chain_id: "taboo_connection", chain_step: 8 },
  { id: "ARC_C9", chapter: "taboo", role: "peak", type: "directed", promptType: "dare",
    intensity: 9.5, text: "The three of you — 30 seconds. Close your eyes and let whatever happens, happen.",
    target: "self", chain_id: "taboo_connection", chain_step: 9 },

  // =============================================
  // TABOO SEDUCTION ARC D: The Surrender Path
  // Clothing removal → kisses → blindfolded four-handed massage
  // =============================================
  { id: "ARC_D1", chapter: "taboo", role: "setup", type: "directed", promptType: "dare",
    intensity: 8, text: "Remove one item of clothing — slowly, while looking at {target}. Make them watch.",
    target: "other", chain_id: "taboo_surrender", chain_step: 1 },
  { id: "ARC_D2", chapter: "taboo", role: "build", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Kiss {target}'s neck — softly at first, then let your lips linger.",
    target: "other", chain_id: "taboo_surrender", chain_step: 2 },
  { id: "ARC_D3", chapter: "taboo", role: "action", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Let {target} remove one of your remaining items of clothing. No rushing.",
    target: "other", chain_id: "taboo_surrender", chain_step: 3 },
  { id: "ARC_D4", chapter: "taboo", role: "build", type: "directed", promptType: "truth",
    intensity: 9, text: "If you could have anyone in this room give you a full-body massage right now — who would it be? Be honest.",
    target: "self", chain_id: "taboo_surrender", chain_step: 4 },
  { id: "ARC_D5", chapter: "taboo", role: "action", type: "directed", promptType: "dare",
    intensity: 9, text: "Blindfold yourself. No peeking. Trust the room.",
    target: "self", chain_id: "taboo_surrender", chain_step: 5 },
  { id: "ARC_D6", chapter: "taboo", role: "build", type: "group", promptType: "dare",
    intensity: 9.5, text: "Everyone: the blindfolded player is yours now. Two of you — place your hands on their shoulders and begin a slow, four-handed massage. Don't speak.",
    target: "group", chain_id: "taboo_surrender", chain_step: 6 },
  { id: "ARC_D7", chapter: "taboo", role: "peak", type: "group", promptType: "dare",
    intensity: 9.5, text: "Keep the blindfold on. Four hands, slow and everywhere above the waist. 60 seconds. Let go completely.",
    target: "group", chain_id: "taboo_surrender", chain_step: 7 },

  // =============================================
  // EROTIC ARC E: The Slow Dance Path
  // Atmosphere → dance → caress → whisper → undress
  // =============================================
  { id: "ARC_E1", chapter: "erotic", role: "setup", type: "group", promptType: "dare",
    intensity: 7.5, text: "Everyone — dim the lights. Lyra demands a change of atmosphere.",
    target: "group", chain_id: "erotic_slowdance", chain_step: 1 },
  { id: "ARC_E2", chapter: "erotic", role: "build", type: "directed", promptType: "dare",
    intensity: 8, text: "Stand up, take {target}'s hand, and pull them into a slow dance. No music needed — just move together.",
    target: "other", chain_id: "erotic_slowdance", chain_step: 2 },
  { id: "ARC_E3", chapter: "erotic", role: "action", type: "directed", promptType: "dare",
    intensity: 8, text: "While slow dancing with {target}, run your fingers through their hair and caress the back of their neck.",
    target: "other", chain_id: "erotic_slowdance", chain_step: 3 },
  { id: "ARC_E4", chapter: "erotic", role: "build", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Pull {target} close — press your body against theirs and whisper something that will stay with them all night.",
    target: "other", chain_id: "erotic_slowdance", chain_step: 4 },
  { id: "ARC_E5", chapter: "erotic", role: "action", type: "directed", promptType: "dare",
    intensity: 8.5, text: "While still holding {target}, slowly remove one item of their clothing. Don't stop dancing.",
    target: "other", chain_id: "erotic_slowdance", chain_step: 5 },
  { id: "ARC_E6", chapter: "erotic", role: "peak", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Kiss {target}'s neck while swaying together. Let the rest of the room watch.",
    target: "other", chain_id: "erotic_slowdance", chain_step: 6 },

  // =============================================
  // TABOO ARC F: The Dance Returns
  // slow dance → partner switch → deep connection
  // =============================================
  { id: "ARC_F1", chapter: "taboo", role: "setup", type: "group", promptType: "dare",
    intensity: 8.5, text: "Lyra remembers your dance. Lights low again. This time — move slow. Move close. Let the music tell you what to do.",
    target: "group", chain_id: "taboo_dance", chain_step: 1 },
  { id: "ARC_F2", chapter: "taboo", role: "build", type: "directed", promptType: "dare",
    intensity: 9, text: "Pull {target} in close. Hold them tight — one hand on their lower back, the other in their hair. Dance like you mean it.",
    target: "other", chain_id: "taboo_dance", chain_step: 2 },
  { id: "ARC_F3", chapter: "taboo", role: "action", type: "directed", promptType: "dare",
    intensity: 9, text: "While holding {target}, slowly trace your lips along their collarbone. Keep swaying.",
    target: "other", chain_id: "taboo_dance", chain_step: 3 },
  { id: "ARC_F4", chapter: "taboo", role: "build", type: "directed", promptType: "dare",
    intensity: 9, text: "Kiss {target} — slow and deep. The music doesn't stop and neither do you.",
    target: "other", chain_id: "taboo_dance", chain_step: 4 },
  { id: "ARC_F5", chapter: "taboo", role: "action", type: "group", promptType: "dare",
    intensity: 9.5, text: "Switch partners. Someone new. Pull them in just as close — no hesitation.",
    target: "group", chain_id: "taboo_dance", chain_step: 5 },
  { id: "ARC_F6", chapter: "taboo", role: "build", type: "directed", promptType: "dare",
    intensity: 9.5, text: "With your new partner — run your hands slowly down their sides. Feel them breathe.",
    target: "other", chain_id: "taboo_dance", chain_step: 6 },
  { id: "ARC_F7", chapter: "taboo", role: "peak", type: "directed", promptType: "dare",
    intensity: 9.5, text: "Hold your partner tight. Forehead to forehead. Breathe together. Let the moment be whatever it wants to be.",
    target: "other", chain_id: "taboo_dance", chain_step: 7 },

  // =============================================
  // TABOO ARC J: The Center of Attention Path
  // The single player becomes the focus — couple and single converge
  // Clothing removal → positioning → group intimacy
  // =============================================
  { id: "ARC_J1", chapter: "taboo", role: "setup", type: "group", promptType: "dare",
    intensity: 8.5, text: "Everyone — each of you removes one item of clothing right now. No excuses. Lyra is watching.",
    target: "group", chain_id: "taboo_centerpiece", chain_step: 1 },
  { id: "ARC_J2", chapter: "taboo", role: "build", type: "directed", promptType: "dare",
    intensity: 9, text: "Walk over to {target}. Stand behind them, place your hands on their shoulders, and slowly massage the tension out.",
    target: "other", chain_id: "taboo_centerpiece", chain_step: 2 },
  { id: "ARC_J3", chapter: "taboo", role: "action", type: "directed", promptType: "dare",
    intensity: 9, text: "Take {target} by the hand and guide them to sit between the other two players. They're the centerpiece now.",
    target: "other", chain_id: "taboo_centerpiece", chain_step: 3 },
  { id: "ARC_J4", chapter: "taboo", role: "build", type: "group", promptType: "dare",
    intensity: 9, text: "The two players on each side — turn toward the one in the middle. Each of you place a hand on their knee. Slowly.",
    target: "group", chain_id: "taboo_centerpiece", chain_step: 4 },
  { id: "ARC_J5", chapter: "taboo", role: "action", type: "group", promptType: "dare",
    intensity: 9.5, text: "The person in the middle — close your eyes. The other two: one of you whispers in their left ear, the other in their right. Say something they won't forget.",
    target: "group", chain_id: "taboo_centerpiece", chain_step: 5 },
  { id: "ARC_J6", chapter: "taboo", role: "build", type: "group", promptType: "dare",
    intensity: 9.5, text: "Everyone removes one more item. Then the two outside players — each kiss one side of the center player's neck. Slowly. At the same time.",
    target: "group", chain_id: "taboo_centerpiece", chain_step: 6 },
  { id: "ARC_J7", chapter: "taboo", role: "peak", type: "group", promptType: "dare",
    intensity: 9.5, text: "All three of you — hands, lips, skin. 30 seconds. No rules. Let the moment take over.",
    target: "group", chain_id: "taboo_centerpiece", chain_step: 7 },

  // =============================================
  // EROTIC ARC K: The Kiss Comparison
  // Seducer picks two players, compares how they kiss
  // =============================================
  { id: "ARC_K1", chapter: "erotic", role: "setup", type: "group", promptType: "truth",
    intensity: 7.5, text: "Everyone — who do you think is the best kisser in this room? Don't be shy. The Orb is watching.",
    target: "group", chain_id: "erotic_kiss_compare", chain_step: 1 },
  { id: "ARC_K2", chapter: "erotic", role: "build", type: "group", promptType: "dare",
    intensity: 8, text: "{actor}, pick two people. Kiss the first one — slow, deliberate, like you want them to remember it.",
    target: "other", chain_id: "erotic_kiss_compare", chain_step: 2 },
  { id: "ARC_K3", chapter: "erotic", role: "action", type: "group", promptType: "dare",
    intensity: 8.5, text: "Now kiss the second one. Same rules — slow and deliberate. The group is judging.",
    target: "other", chain_id: "erotic_kiss_compare", chain_step: 3 },
  { id: "ARC_K4", chapter: "erotic", role: "peak", type: "group", promptType: "truth",
    intensity: 8.5, text: "Be honest — who kissed better? And the loser gets to try again. Harder this time.",
    target: "group", chain_id: "erotic_kiss_compare", chain_step: 4 },

  // =============================================
  // TABOO ARC K2: The Stocking Path
  // Two players dress/undress a third — sensual escalation
  // Self-contained: starts with leg reveal so no prerequisites needed
  // =============================================
  { id: "ARC_K2_1", chapter: "taboo", role: "setup", type: "group", promptType: "truth",
    intensity: 8.5, text: "Everyone — who in this room has the best legs? Be honest. The Orb already knows.",
    target: "group", chain_id: "taboo_stockings", chain_step: 1 },
  { id: "ARC_K2_2", chapter: "taboo", role: "build", type: "group", promptType: "dare",
    intensity: 9, text: "The winner — stand in the center. If your legs aren't showing yet, fix that. The other two — enjoy the view for a moment.",
    target: "group", chain_id: "taboo_stockings", chain_step: 2 },
  { id: "ARC_K2_3", chapter: "taboo", role: "action", type: "group", promptType: "dare",
    intensity: 9, text: "Each of you take a stocking. Slowly roll them up — one leg each. From ankle to thigh. Take your time. Eye contact with the center.",
    target: "group", chain_id: "taboo_stockings", chain_step: 3 },
  { id: "ARC_K2_4", chapter: "taboo", role: "build", type: "group", promptType: "dare",
    intensity: 9.2, text: "Center player — close your eyes. The other two — slowly peel the stockings back off. One inch at a time. Let your fingers linger on the skin underneath.",
    target: "group", chain_id: "taboo_stockings", chain_step: 4 },
  { id: "ARC_K2_5", chapter: "taboo", role: "peak", type: "group", promptType: "dare",
    intensity: 9.5, text: "Stockings off. Now each of you — kiss one of their legs. Start at the ankle. Work your way up. Stop where you dare.",
    target: "group", chain_id: "taboo_stockings", chain_step: 5 },

  // =============================================
  // TABOO ARC L: The Toy Path
  // Sex toy confession → reveal → teasing
  // =============================================
  { id: "ARC_L1", chapter: "taboo", role: "setup", type: "group", promptType: "truth",
    intensity: 8.5, text: "Everyone answers: what is your favorite sex toy? If you don't have one — what would you want?",
    target: "group", chain_id: "taboo_toys", chain_step: 1 },
  { id: "ARC_L2", chapter: "taboo", role: "build", type: "group", promptType: "dare",
    intensity: 9, text: "Whoever was most honest — go get your toy. Show the group. No shame — Lyra rewards bravery.",
    target: "group", chain_id: "taboo_toys", chain_step: 2 },
  { id: "ARC_L3", chapter: "taboo", role: "action", type: "directed", promptType: "dare",
    intensity: 9, text: "Take the toy and slowly run it along {target}'s arm, then their neck, then their collarbone. Watch their reaction.",
    target: "other", chain_id: "taboo_toys", chain_step: 3 },
  { id: "ARC_L4", chapter: "taboo", role: "build", type: "directed", promptType: "dare",
    intensity: 9.5, text: "Use the toy to tease {target} — trace it slowly down their chest. Let them feel the anticipation.",
    target: "other", chain_id: "taboo_toys", chain_step: 4 },
  { id: "ARC_L5", chapter: "taboo", role: "peak", type: "group", promptType: "dare",
    intensity: 9.5, text: "Pass the toy to the next player. Now it's their turn — use it on someone else. Lyra wants to see everyone squirm.",
    target: "group", chain_id: "taboo_toys", chain_step: 5 },
  { id: "ARC_L6", chapter: "taboo", role: "peak", type: "directed", promptType: "dare",
    intensity: 10, text: "Tie {target}'s hands together gently. Now take the toy and tease them — slowly, everywhere. Lyra feeds on their surrender.",
    target: "other", chain_id: "taboo_toys", chain_step: 6 },

  // =============================================
  // EROTIC ARC G: The Lingerie Path (female-female)
  // Stockings, bra, sensual touch between women
  // =============================================
  { id: "ARC_G1", chapter: "erotic", role: "setup", type: "directed", promptType: "dare",
    intensity: 7.5, text: "Kneel in front of {target} and slowly roll a stocking up her leg — from ankle to thigh. Make it sensual.",
    target: "other", chain_id: "erotic_lingerie", chain_step: 1,
    actor_gender: "female", target_gender: "female" },
  { id: "ARC_G2", chapter: "erotic", role: "build", type: "directed", promptType: "dare",
    intensity: 8, text: "Stand behind {target}. Unhook her bra — through her clothes if she's still wearing them, directly if she isn't. Take your time.",
    target: "other", chain_id: "erotic_lingerie", chain_step: 2,
    actor_gender: "female", target_gender: "female" },
  { id: "ARC_G3", chapter: "erotic", role: "action", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Slide the bra strap off {target}'s shoulder — slowly — and hand it to another player.",
    target: "other", chain_id: "erotic_lingerie", chain_step: 3,
    actor_gender: "female", target_gender: "female" },
  { id: "ARC_G4", chapter: "erotic", role: "build", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Trace your fingertips from {target}'s knee slowly up to her thigh. Don't rush — let her feel every second.",
    target: "other", chain_id: "erotic_lingerie", chain_step: 4,
    actor_gender: "female", target_gender: "female" },
  { id: "ARC_G5", chapter: "erotic", role: "peak", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Face {target}. Slowly remove one of your own items of clothing and hand it to her. Now you're even.",
    target: "other", chain_id: "erotic_lingerie", chain_step: 5,
    actor_gender: "female", target_gender: "female" },

  // =============================================
  // SUGGESTIVE ARC H: The First Touch Path
  // Light flirtation → physical contact → tension building
  // =============================================
  { id: "ARC_H1", chapter: "suggestive", role: "setup", type: "directed", promptType: "dare",
    intensity: 5.5, text: "Sit between {target}'s legs, lean back into them, and get comfortable. Stay there.",
    target: "other", chain_id: "suggestive_firsttouch", chain_step: 1 },
  { id: "ARC_H2", chapter: "suggestive", role: "build", type: "directed", promptType: "dare",
    intensity: 6, text: "Now shift — turn sideways to face {target}. Put your legs across their lap. Get comfortable.",
    target: "other", chain_id: "suggestive_firsttouch", chain_step: 2 },
  { id: "ARC_H3", chapter: "suggestive", role: "action", type: "directed", promptType: "dare",
    intensity: 6, text: "Rest your hand on {target}'s thigh. Look at them. Say nothing.",
    target: "other", chain_id: "suggestive_firsttouch", chain_step: 3 },
  { id: "ARC_H4", chapter: "suggestive", role: "build", type: "directed", promptType: "dare",
    intensity: 6.5, text: "Lean into {target} and whisper: 'You have no idea what's coming.' Then sit back and smile.",
    target: "other", chain_id: "suggestive_firsttouch", chain_step: 4 },
  { id: "ARC_H5", chapter: "suggestive", role: "peak", type: "directed", promptType: "dare",
    intensity: 6.5, text: "Brush {target}'s hair behind their ear. Let your fingers trace slowly down their jaw.",
    target: "other", chain_id: "suggestive_firsttouch", chain_step: 5 },

  // =============================================
  // INTIMATE ARC I: The Confession Dance
  // Vulnerability → closeness → first real kiss
  // =============================================
  { id: "ARC_I1", chapter: "intimate", role: "setup", type: "directed", promptType: "truth",
    intensity: 6.5, text: "Look at {target}. What's one thing about them that caught you off guard tonight?",
    target: "other", chain_id: "intimate_confession", chain_step: 1 },
  { id: "ARC_I2", chapter: "intimate", role: "build", type: "directed", promptType: "dare",
    intensity: 7, text: "Hold {target}'s face gently in both hands. Look into their eyes for 10 seconds without speaking.",
    target: "other", chain_id: "intimate_confession", chain_step: 2 },
  { id: "ARC_I3", chapter: "intimate", role: "action", type: "directed", promptType: "dare",
    intensity: 7, text: "Slowly pull {target} closer by the waist. Close enough to feel their breathing.",
    target: "other", chain_id: "intimate_confession", chain_step: 3 },
  { id: "ARC_I4", chapter: "intimate", role: "build", type: "directed", promptType: "truth",
    intensity: 7.5, text: "Right now — in this moment — what do you want to do with {target}? Say it out loud.",
    target: "other", chain_id: "intimate_confession", chain_step: 4 },
  { id: "ARC_I5", chapter: "intimate", role: "peak", type: "directed", promptType: "dare",
    intensity: 7.5, text: "Kiss {target}. Not a peck — a real kiss. The kind that says something.",
    target: "other", chain_id: "intimate_confession", chain_step: 5 },

  // =============================================
  // JEALOUSY TEST ARC I: "Not Jealous? Let's See."
  // Fires in suggestive stage. The seducer tests a player who claimed to be NOT jealous
  // by flirting with their partner. Chain uses special _jealousyChain flag
  // so the engine targets the right trio (jealous player, their partner, seducer).
  // {actor} = seducer, {target} = the jealous player's partner, {jealousPlayer} = the one being tested
  // =============================================
  { id: "JLY_S01", chapter: "suggestive", role: "setup", type: "directed", promptType: "dare",
    intensity: 5.5, text: "Lyra remembers someone here said they're not the jealous type. Let's test that. {actor}, sit closer to {target}. Make it obvious.",
    target: "other", chain_id: "jealousy_test_soft", chain_step: 1, _jealousyChain: true },
  { id: "JLY_S02", chapter: "suggestive", role: "build", type: "directed", promptType: "dare",
    intensity: 5.5, text: "{actor}, whisper something in {target}'s ear. Make it look like a secret. The orb is watching {jealousPlayer}'s face.",
    target: "other", chain_id: "jealousy_test_soft", chain_step: 2, _jealousyChain: true },
  { id: "JLY_S03", chapter: "suggestive", role: "action", type: "directed", promptType: "truth",
    intensity: 5.5, text: "{jealousPlayer}... the orb sees you. How did that feel? Still not jealous?",
    target: "other", chain_id: "jealousy_test_soft", chain_step: 3, _jealousyChain: true, _askJealous: true },
  { id: "JLY_S04", chapter: "suggestive", role: "peak", type: "directed", promptType: "dare",
    intensity: 6, text: "{actor}, give {target} a light kiss on the cheek — slowly. Take your time. The orb wants to see if {jealousPlayer} flinches.",
    target: "other", chain_id: "jealousy_test_soft", chain_step: 4, _jealousyChain: true },

  // =============================================
  // JEALOUSY TEST ARC II: "Deeper." (Intimate stage escalation)
  // Fires after Arc I resolves, or directly in intimate if Arc I was skipped.
  // Now the seducer escalates to actual kisses — and then the orb turns the tables.
  // =============================================
  { id: "JLY_I01", chapter: "intimate", role: "setup", type: "directed", promptType: "dare",
    intensity: 7, text: "Lyra hasn't forgotten. {actor}, take {target}'s hand. Look them in the eyes. Don't let go until Lyra says.",
    target: "other", chain_id: "jealousy_test_deep", chain_step: 1, _jealousyChain: true },
  { id: "JLY_I02", chapter: "intimate", role: "build", type: "directed", promptType: "dare",
    intensity: 7, text: "{actor}, kiss {target} on the lips. A soft kiss — innocent, but not quick. {jealousPlayer}, you will watch.",
    target: "other", chain_id: "jealousy_test_deep", chain_step: 2, _jealousyChain: true },
  { id: "JLY_I03", chapter: "intimate", role: "action", type: "directed", promptType: "truth",
    intensity: 7, text: "{jealousPlayer}... what just happened behind your eyes? Tell the room the truth. The orb already knows.",
    target: "other", chain_id: "jealousy_test_deep", chain_step: 3, _jealousyChain: true, _askJealous: true },
  { id: "JLY_I04", chapter: "intimate", role: "build", type: "directed", promptType: "dare",
    intensity: 7.5, text: "Now the orb turns. {actor}, kiss {jealousPlayer}. Not their partner — them. A real kiss. Let's see how the whole room shifts.",
    target: "other", chain_id: "jealousy_test_deep", chain_step: 4, _jealousyChain: true, _kissJealousPlayer: true },
  { id: "JLY_I05", chapter: "intimate", role: "peak", type: "directed", promptType: "dare",
    intensity: 7.5, text: "{target}, your partner just got kissed by the seducer. Your move. Kiss {jealousPlayer} like you're reclaiming what's yours.",
    target: "other", chain_id: "jealousy_test_deep", chain_step: 5, _jealousyChain: true, _reclaimKiss: true },

  // =============================================
  // JEALOUSY TEST ARC III: "No Limits." (Erotic stage — if players are still in)
  // The seducer pushes further — french kiss, lingering touch. Then the orb asks
  // both partners to confront what they're feeling.
  // =============================================
  { id: "JLY_E01", chapter: "erotic", role: "setup", type: "directed", promptType: "dare",
    intensity: 8, text: "The orb remembers everything. {actor}, pull {target} close — as close as two people can sit. Hands on their waist. Don't look at {jealousPlayer}.",
    target: "other", chain_id: "jealousy_test_fire", chain_step: 1, _jealousyChain: true },
  { id: "JLY_E02", chapter: "erotic", role: "build", type: "directed", promptType: "dare",
    intensity: 8.5, text: "{actor}, kiss {target}. Not a peck. A slow, deliberate French kiss. The orb is measuring every heartbeat in this room.",
    target: "other", chain_id: "jealousy_test_fire", chain_step: 2, _jealousyChain: true },
  { id: "JLY_E03", chapter: "erotic", role: "action", type: "directed", promptType: "truth",
    intensity: 8, text: "{jealousPlayer}. Look at the orb. You said you weren't jealous. Was that the truth... or were you performing?",
    target: "other", chain_id: "jealousy_test_fire", chain_step: 3, _jealousyChain: true, _askJealous: true },
  { id: "JLY_E04", chapter: "erotic", role: "build", type: "directed", promptType: "dare",
    intensity: 8.5, text: "{actor}, now kiss {jealousPlayer}. The same way. Take your time. The orb wants them to feel what their partner felt.",
    target: "other", chain_id: "jealousy_test_fire", chain_step: 4, _jealousyChain: true, _kissJealousPlayer: true },
  { id: "JLY_E05", chapter: "erotic", role: "peak", type: "directed", promptType: "dare",
    intensity: 9, text: "{jealousPlayer} and {target} — the orb has tested you both. Now reclaim each other. Kiss like the room doesn't exist. Make everyone else look away.",
    target: "other", chain_id: "jealousy_test_fire", chain_step: 5, _jealousyChain: true, _reclaimKiss: true }
];

// =========================
// PROFILING PROMPTS (Personal Stage)
// =========================
// These map to 6 psychological dimensions. Each prompt is tagged with its
// dimension so the engine can build a player profile. The prompts are
// designed to feel like fun party conversation — not an interrogation.
// Scoring happens via engagement (answered vs passed) and voting pressure.

var PROFILE_DIMENSIONS = ["risk", "boldness", "compete", "openness", "boundaries", "ego", "jealousy"];

var PROFILING_PROMPTS = [
  // ─── RISK TOLERANCE ───
  { id: "PRF_R01", chapter: "personal", role: "setup", type: "self", promptType: "truth",
    intensity: 3.5, text: "What's the most spontaneous thing you've ever done — and did it pay off?",
    target: "self", _profileDim: "risk", _profileWeight: 1 },
  { id: "PRF_R02", chapter: "personal", role: "action", type: "self", promptType: "truth",
    intensity: 3.5, text: "If you had to bet on yourself doing something daring tonight, what would it be?",
    target: "self", _profileDim: "risk", _profileWeight: 1 },
  { id: "PRF_R03", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 3.8, text: "Would you rather know exactly what's coming next — or have no idea?",
    target: "self", _profileDim: "risk", _profileWeight: 1 },
  { id: "PRF_R04", chapter: "personal", role: "action", type: "self", promptType: "truth",
    intensity: 3.5, text: "Have you ever said yes to something before your brain had time to say no?",
    target: "self", _profileDim: "risk", _profileWeight: 1 },
  { id: "PRF_R05", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 4, text: "Look at {target}. Would they be the type to take a dare too far — or not far enough?",
    target: "other", _profileDim: "risk", _profileWeight: 0.5 },

  // ─── SOCIAL BOLDNESS / SHAME THRESHOLD ───
  { id: "PRF_B01", chapter: "personal", role: "setup", type: "self", promptType: "truth",
    intensity: 3.8, text: "What's something you've done that you'd only admit to a close friend?",
    target: "self", _profileDim: "boldness", _profileWeight: 1 },
  { id: "PRF_B02", chapter: "personal", role: "action", type: "self", promptType: "truth",
    intensity: 3.5, text: "Have you ever done something embarrassing on purpose — just to see how people would react?",
    target: "self", _profileDim: "boldness", _profileWeight: 1 },
  { id: "PRF_B03", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 4, text: "What's the biggest social 'rule' you secretly don't care about?",
    target: "self", _profileDim: "boldness", _profileWeight: 1 },
  { id: "PRF_B04", chapter: "personal", role: "action", type: "self", promptType: "truth",
    intensity: 3.8, text: "If no one you knew could recognize you for a night, what's the first thing you'd do?",
    target: "self", _profileDim: "boldness", _profileWeight: 1.5 },
  { id: "PRF_B05", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 4, text: "What's a side of you that only comes out when you've had a few drinks?",
    target: "self", _profileDim: "boldness", _profileWeight: 1 },

  // ─── COMPETITIVENESS ───
  { id: "PRF_C01", chapter: "personal", role: "setup", type: "self", promptType: "truth",
    intensity: 3.2, text: "Do you play games to win, or to have fun — and be honest.",
    target: "self", _profileDim: "compete", _profileWeight: 1 },
  { id: "PRF_C02", chapter: "personal", role: "action", type: "self", promptType: "truth",
    intensity: 3.5, text: "Have you ever let someone win at something? Did it feel good or did it bother you?",
    target: "self", _profileDim: "compete", _profileWeight: 1 },
  { id: "PRF_C03", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 3.5, text: "If the group voted to skip a dare tonight, would you be relieved or disappointed?",
    target: "self", _profileDim: "compete", _profileWeight: 1 },
  { id: "PRF_C04", chapter: "personal", role: "action", type: "directed", promptType: "truth",
    intensity: 3.5, text: "Who in this room do you think would be the hardest to beat at their own game?",
    target: "other", _profileDim: "compete", _profileWeight: 0.5 },
  { id: "PRF_C05", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 3.8, text: "What's the pettiest thing you've ever done to win an argument?",
    target: "self", _profileDim: "compete", _profileWeight: 1 },

  // ─── OPENNESS / CURIOSITY ───
  { id: "PRF_O01", chapter: "personal", role: "setup", type: "self", promptType: "truth",
    intensity: 3, text: "What's a topic you know almost nothing about but find genuinely fascinating?",
    target: "self", _profileDim: "openness", _profileWeight: 1 },
  { id: "PRF_O02", chapter: "personal", role: "action", type: "directed", promptType: "truth",
    intensity: 3.8, text: "If you could ask {target} one question they'd have to answer honestly — what would it be?",
    target: "other", _profileDim: "openness", _profileWeight: 1 },
  { id: "PRF_O03", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 3.5, text: "What's something you recently changed your mind about?",
    target: "self", _profileDim: "openness", _profileWeight: 1 },
  { id: "PRF_O04", chapter: "personal", role: "action", type: "self", promptType: "truth",
    intensity: 3.5, text: "What's a conversation topic that will always grab your attention — no matter who's talking?",
    target: "self", _profileDim: "openness", _profileWeight: 0.5 },
  { id: "PRF_O05", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 3.8, text: "Have you ever been completely wrong about someone after your first impression? What changed?",
    target: "self", _profileDim: "openness", _profileWeight: 1 },

  // ─── BOUNDARIES / COMFORT ZONE ───
  { id: "PRF_D01", chapter: "personal", role: "setup", type: "self", promptType: "truth",
    intensity: 3.5, text: "What's one thing that would instantly make you tap out of a dare tonight?",
    target: "self", _profileDim: "boundaries", _profileWeight: 1.5 },
  { id: "PRF_D02", chapter: "personal", role: "action", type: "self", promptType: "truth",
    intensity: 3.8, text: "Is there anything you'd do in front of strangers that you wouldn't do in front of people you know?",
    target: "self", _profileDim: "boundaries", _profileWeight: 1 },
  { id: "PRF_D03", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 4, text: "Rank these from easiest to hardest for you: physical challenge, emotional honesty, or public silliness.",
    target: "self", _profileDim: "boundaries", _profileWeight: 1.5 },
  { id: "PRF_D04", chapter: "personal", role: "action", type: "self", promptType: "truth",
    intensity: 3.8, text: "What's the furthest outside your comfort zone you've ever gone willingly — and would you do it again?",
    target: "self", _profileDim: "boundaries", _profileWeight: 1 },
  { id: "PRF_D05", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 4, text: "Look at {target}. What do you think their limit is tonight — and are you willing to test it?",
    target: "other", _profileDim: "boundaries", _profileWeight: 0.5 },

  // ─── EGO / SELF-PERCEPTION ───
  { id: "PRF_E01", chapter: "personal", role: "setup", type: "self", promptType: "truth",
    intensity: 3.5, text: "What's a compliment you receive often that you secretly agree with?",
    target: "self", _profileDim: "ego", _profileWeight: 1 },
  { id: "PRF_E02", chapter: "personal", role: "action", type: "self", promptType: "truth",
    intensity: 3.5, text: "What do people usually get wrong about you when they first meet you?",
    target: "self", _profileDim: "ego", _profileWeight: 1 },
  { id: "PRF_E03", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 3.8, text: "What's your biggest flex — something you're genuinely proud of but rarely say out loud?",
    target: "self", _profileDim: "ego", _profileWeight: 1 },
  { id: "PRF_E04", chapter: "personal", role: "action", type: "directed", promptType: "truth",
    intensity: 4, text: "Describe {target} in three words — and make at least one of them uncomfortably accurate.",
    target: "other", _profileDim: "ego", _profileWeight: 0.5 },
  { id: "PRF_E05", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 4, text: "What personality trait of yours do you think the people in this room will notice by the end of tonight?",
    target: "self", _profileDim: "ego", _profileWeight: 1 },

  // ─── JEALOUSY ───
  // These map players' self-reported jealousy. Later stages TEST their answer using the seducer.
  // Targeted at players who have a partner — the orb is studying desire and possessiveness.
  { id: "PRF_J01", chapter: "personal", role: "setup", type: "self", promptType: "truth",
    intensity: 3.5, text: "Be honest — are you the jealous type? The orb wants to know.",
    target: "self", _profileDim: "jealousy", _profileWeight: 1, _jealousyProbe: true },
  { id: "PRF_J02", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 3.8, text: "If someone flirted with your partner right in front of you — what would you actually do?",
    target: "self", _profileDim: "jealousy", _profileWeight: 1.5, _jealousyProbe: true },
  { id: "PRF_J03", chapter: "playful", role: "action", type: "self", promptType: "truth",
    intensity: 3.5, text: "Has jealousy ever made you do something you regret? Tell us.",
    target: "self", _profileDim: "jealousy", _profileWeight: 1, _jealousyProbe: true },
  { id: "PRF_J04", chapter: "playful", role: "build", type: "self", promptType: "truth",
    intensity: 4, text: "Your partner locks their phone every time you walk by. Jealous — or unbothered? The orb is watching your face.",
    target: "self", _profileDim: "jealousy", _profileWeight: 1.5, _jealousyProbe: true },
  { id: "PRF_J05", chapter: "personal", role: "action", type: "self", promptType: "truth",
    intensity: 3.8, text: "On a scale of 1 to 5, how jealous are you? And does your partner agree with that number?",
    target: "self", _profileDim: "jealousy", _profileWeight: 2, _jealousyProbe: true },

  // ─── COUPLES PROFILING ───
  // Discovery prompts for two people — works for established couples, new couples, and close friends.
  // These replace the group profiling when only 2 players are present.
  { id: "CPF_D01", chapter: "personal", role: "setup", type: "directed", promptType: "truth",
    intensity: 3.5, text: "What's something about {target} that surprised you the first time you noticed it?",
    target: "other", _profileDim: "openness", _profileWeight: 1, _couplesOnly: true },
  { id: "CPF_D02", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 3.8, text: "What's one thing {target} does that you've never told them you find attractive?",
    target: "other", _profileDim: "boldness", _profileWeight: 1, _couplesOnly: true },
  { id: "CPF_D03", chapter: "personal", role: "action", type: "self", promptType: "truth",
    intensity: 3.5, text: "What's a question you've always wanted to ask {target} but never had the courage?",
    target: "other", _profileDim: "boundaries", _profileWeight: 1, _couplesOnly: true },
  { id: "CPF_D04", chapter: "personal", role: "setup", type: "directed", promptType: "truth",
    intensity: 4, text: "Describe the exact moment you first realized you were attracted to {target}. Don't skip any details.",
    target: "other", _profileDim: "openness", _profileWeight: 1.5, _couplesOnly: true },
  { id: "CPF_D05", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 3.8, text: "What's a side of yourself that {target} hasn't seen yet? Tonight might change that.",
    target: "other", _profileDim: "risk", _profileWeight: 1, _couplesOnly: true },
  { id: "CPF_D06", chapter: "personal", role: "action", type: "directed", promptType: "truth",
    intensity: 4, text: "If {target} could change one thing about how you show affection — what do you think they'd pick?",
    target: "other", _profileDim: "ego", _profileWeight: 1, _couplesOnly: true },
  { id: "CPF_D07", chapter: "personal", role: "setup", type: "self", promptType: "truth",
    intensity: 3.5, text: "What's a memory with {target} that still gives you butterflies?",
    target: "other", _profileDim: "openness", _profileWeight: 1, _couplesOnly: true },
  { id: "CPF_D08", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 4, text: "What's something {target} does without realizing it that drives you a little crazy — in a good way?",
    target: "other", _profileDim: "boldness", _profileWeight: 1, _couplesOnly: true },
  { id: "CPF_D09", chapter: "personal", role: "action", type: "self", promptType: "truth",
    intensity: 3.8, text: "What's the bravest thing you've ever done for or because of {target}?",
    target: "other", _profileDim: "risk", _profileWeight: 1, _couplesOnly: true },
  { id: "CPF_D10", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 4.2, text: "Look at {target} right now. What are you most curious about discovering tonight?",
    target: "other", _profileDim: "openness", _profileWeight: 1.5, _couplesOnly: true },
  { id: "CPF_D11", chapter: "flirty", role: "setup", type: "self", promptType: "truth",
    intensity: 4.5, text: "What's one thing you wish {target} knew about you that you've never said out loud?",
    target: "other", _profileDim: "boundaries", _profileWeight: 1.5, _couplesOnly: true },
  { id: "CPF_D12", chapter: "personal", role: "action", type: "directed", promptType: "truth",
    intensity: 4, text: "Rate how well {target} really knows you — from 1 to 5. Now explain why it's not a 5.",
    target: "other", _profileDim: "ego", _profileWeight: 1, _couplesOnly: true },
  { id: "CPF_D13", chapter: "personal", role: "build", type: "self", promptType: "truth",
    intensity: 3.8, text: "What's a small gesture from {target} that meant more to you than they probably realize?",
    target: "other", _profileDim: "openness", _profileWeight: 1, _couplesOnly: true },
  { id: "CPF_D14", chapter: "suggestive", role: "action", type: "directed", promptType: "truth",
    intensity: 5, text: "What do you think {target} is most afraid to reveal to you tonight?",
    target: "other", _profileDim: "boundaries", _profileWeight: 1, _couplesOnly: true },
  { id: "CPF_D15", chapter: "suggestive", role: "setup", type: "self", promptType: "truth",
    intensity: 5.5, text: "If tonight had no consequences, what's the first thing you'd want to try with {target}?",
    target: "other", _profileDim: "risk", _profileWeight: 1.5, _couplesOnly: true },

  // ─── COUPLES QUIZ: "How well do you know your partner?" ───
  // Actor guesses about their partner, then the partner reveals if they got it right.
  // Fun, competitive, and builds connection from turn 1.
  { id: "CQ_01", chapter: "personal", role: "setup", type: "directed", promptType: "truth",
    intensity: 2, text: "Without asking — what is {target}'s favorite food? Say it out loud. {target}, did {player_he} get it right?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_02", chapter: "personal", role: "interaction", type: "directed", promptType: "truth",
    intensity: 2, text: "What is {target}'s favorite color? Answer now. {target} — was {player_he} close?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_03", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 2.5, text: "If you had to cook {target}'s favorite meal from scratch — what would you make? {target}, would you actually eat it?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_04", chapter: "personal", role: "action", type: "directed", promptType: "truth",
    intensity: 2.5, text: "What song would {target} play on repeat when they're alone? Guess it. {target} — is that even close?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_05", chapter: "personal", role: "setup", type: "directed", promptType: "truth",
    intensity: 2.5, text: "Name one habit {target} has that secretly annoys you. {target} — did you know about this?",
    target: "other", _profileDim: "boldness", _profileWeight: 1, _couplesOnly: true },
  { id: "CQ_06", chapter: "personal", role: "interaction", type: "directed", promptType: "truth",
    intensity: 2.5, text: "What animal would {target} be — and why? Say it with confidence. {target}, do you agree — or is {player_he} way off?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_07", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 2.5, text: "What would {target} do with a completely free Saturday — no plans, no obligations? Guess. {target}, how accurate was that?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_08", chapter: "personal", role: "action", type: "directed", promptType: "truth",
    intensity: 3, text: "What's {target}'s guilty pleasure — the one they pretend they don't have? {target}, did {player_he} nail it?",
    target: "other", _profileDim: "boldness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_09", chapter: "personal", role: "setup", type: "directed", promptType: "truth",
    intensity: 3, text: "What is {target}'s dream vacation? Be specific — country, activity, everything. {target}, would you actually go there?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_10", chapter: "personal", role: "interaction", type: "directed", promptType: "truth",
    intensity: 3, text: "What's the one thing that always makes {target} laugh — no matter what? Try it right now. Did it work?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_11", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 3, text: "If {target} could have any job in the world — money doesn't matter — what would they choose? {target}, is that what you'd pick?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_12", chapter: "personal", role: "action", type: "directed", promptType: "truth",
    intensity: 3.5, text: "What's something {target} is secretly proud of but never brags about? {target} — did {player_he} get it?",
    target: "other", _profileDim: "ego", _profileWeight: 1, _couplesOnly: true },
  { id: "CQ_13", chapter: "personal", role: "setup", type: "directed", promptType: "truth",
    intensity: 3, text: "What movie could {target} watch a hundred times and never get tired of? {target}, is that the one?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_14", chapter: "personal", role: "interaction", type: "directed", promptType: "truth",
    intensity: 3.5, text: "How does {target} act when they're stressed but pretending they're fine? Describe it. {target} — is that accurate?",
    target: "other", _profileDim: "boundaries", _profileWeight: 1, _couplesOnly: true },
  { id: "CQ_15", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 3.5, text: "What's {target}'s love language — how do they most like to receive affection? {target}, did {player_he} get it right?",
    target: "other", _profileDim: "openness", _profileWeight: 1, _couplesOnly: true },

  // ─── COUPLES QUIZ ROUND 2: Light, fun, competitive ───
  { id: "CQ_16", chapter: "personal", role: "setup", type: "directed", promptType: "truth",
    intensity: 1.5, text: "What's {target}'s go-to order at a restaurant — the thing they always end up getting? {target}, is that accurate?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_17", chapter: "personal", role: "interaction", type: "directed", promptType: "truth",
    intensity: 1.5, text: "What's the last thing {target} complained about? Be specific. {target} — was it really that bad?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_18", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 2, text: "What's {target}'s most-used emoji? Show it with your face. {target}, is that the one?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_19", chapter: "personal", role: "action", type: "directed", promptType: "truth",
    intensity: 2, text: "Describe {target}'s driving in exactly three words. {target} — fair or unfair?",
    target: "other", _profileDim: "boldness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_20", chapter: "personal", role: "setup", type: "directed", promptType: "truth",
    intensity: 2, text: "What would {target} grab first if the house was on fire? People and pets don't count. {target}, is that right?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_21", chapter: "personal", role: "interaction", type: "directed", promptType: "truth",
    intensity: 2, text: "What's {target}'s worst habit in the kitchen? {target}, do you plead guilty?",
    target: "other", _profileDim: "boldness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_22", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 1.5, text: "If {target} won the lottery tomorrow, what's the FIRST ridiculous thing they'd buy? {target}, would you really?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_23", chapter: "personal", role: "action", type: "directed", promptType: "truth",
    intensity: 2.5, text: "What face does {target} make when they disagree but won't say it? Do the face. {target}, is that real?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_24", chapter: "personal", role: "setup", type: "directed", promptType: "truth",
    intensity: 2, text: "If {target} had a catchphrase, what would it be? Say it in their voice. {target} — accurate?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_25", chapter: "personal", role: "interaction", type: "directed", promptType: "truth",
    intensity: 2, text: "Rate {target}'s cooking on a scale of 1 to 5. No lying. {target}, do you accept that score?",
    target: "other", _profileDim: "boldness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_26", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 2, text: "What's {target}'s excuse when they're running late? Say it exactly how they say it. {target}, is that you?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_27", chapter: "personal", role: "action", type: "directed", promptType: "truth",
    intensity: 2.5, text: "What's the most annoying thing {target} does in the morning? Act it out. {target}, guilty or not guilty?",
    target: "other", _profileDim: "boldness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_28", chapter: "personal", role: "setup", type: "directed", promptType: "truth",
    intensity: 1.5, text: "What TV show could {target} binge-watch forever? {target}, is that your answer too?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_29", chapter: "personal", role: "interaction", type: "directed", promptType: "truth",
    intensity: 2.5, text: "What would {target} do if they found a spider in the shower? Be dramatic about it. {target}, is that how it goes?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true },
  { id: "CQ_30", chapter: "personal", role: "build", type: "directed", promptType: "truth",
    intensity: 2, text: "What's the one household chore {target} will do anything to avoid? {target}, they got you, didn't they?",
    target: "other", _profileDim: "openness", _profileWeight: 0.5, _couplesOnly: true }
];

// =========================
// REVELATION SYSTEM — Lyra remembers what you said
// =========================
// When a player answers a profiling prompt, we store a "revelation" —
// a thematic summary of what they revealed. Later stages inject CALLBACK
// prompts that reference those revelations, making the game feel like
// it's paying attention and escalating based on who you actually are.

var REVELATION_MAP = {
  // ─── RISK ───
  "PRF_R01": { theme: "spontaneity",    dim: "risk",       reveal: "told us about a spontaneous moment",           nudge: "spontaneous side" },
  "PRF_R02": { theme: "daring_tonight",  dim: "risk",       reveal: "bet on doing something daring tonight",        nudge: "daring bet" },
  "PRF_R03": { theme: "unknown_thrill",  dim: "risk",       reveal: "said they prefer the unknown",                 nudge: "love of surprises" },
  "PRF_R04": { theme: "impulse",         dim: "risk",       reveal: "admitted to acting on impulse",                nudge: "impulsive streak" },
  "PRF_R05": { theme: "read_daring",     dim: "risk",       reveal: "sized up another player's daring",             nudge: "read on someone" },
  // ─── BOLDNESS ───
  "PRF_B01": { theme: "secret_share",    dim: "boldness",   reveal: "shared something only close friends know",     nudge: "secret side" },
  "PRF_B02": { theme: "embarrass_test",  dim: "boldness",   reveal: "admitted to embarrassing themselves on purpose",nudge: "shamelessness" },
  "PRF_B03": { theme: "rule_breaker",    dim: "boldness",   reveal: "doesn't care about a social rule",             nudge: "rebellious streak" },
  "PRF_B04": { theme: "anonymous_self",  dim: "boldness",   reveal: "told us what they'd do if no one recognized them", nudge: "hidden self" },
  "PRF_B05": { theme: "drunk_persona",   dim: "boldness",   reveal: "revealed their alter ego after a few drinks",  nudge: "uninhibited side" },
  // ─── COMPETE ───
  "PRF_C01": { theme: "play_to_win",     dim: "compete",    reveal: "revealed whether they play to win",            nudge: "competitive nature" },
  "PRF_C02": { theme: "let_them_win",    dim: "compete",    reveal: "told us if they've ever let someone win",      nudge: "need to win" },
  "PRF_C03": { theme: "dare_appetite",   dim: "compete",    reveal: "told us how they feel about skipped dares",    nudge: "appetite for dares" },
  "PRF_C04": { theme: "worthy_opponent", dim: "compete",    reveal: "named their toughest opponent in the room",    nudge: "rivalry" },
  "PRF_C05": { theme: "petty_win",       dim: "compete",    reveal: "confessed to being petty to win",              nudge: "petty side" },
  // ─── OPENNESS ───
  "PRF_O01": { theme: "fascination",     dim: "openness",   reveal: "shared what fascinates them",                  nudge: "curiosity" },
  "PRF_O02": { theme: "burning_question", dim: "openness",  reveal: "picked a question they'd force someone to answer", nudge: "desire to dig deep" },
  "PRF_O03": { theme: "changed_mind",    dim: "openness",   reveal: "admitted to changing their mind recently",     nudge: "flexibility" },
  "PRF_O04": { theme: "always_hooks",    dim: "openness",   reveal: "told us what topic always grabs their attention", nudge: "soft spot" },
  "PRF_O05": { theme: "wrong_impression",dim: "openness",   reveal: "admitted to misjudging someone",               nudge: "willingness to be wrong" },
  // ─── BOUNDARIES ───
  "PRF_D01": { theme: "tap_out_line",    dim: "boundaries", reveal: "drew their line — told us what would make them tap out", nudge: "limit" },
  "PRF_D02": { theme: "stranger_bold",   dim: "boundaries", reveal: "admitted they'd do things in front of strangers they wouldn't with friends", nudge: "stranger boldness" },
  "PRF_D03": { theme: "comfort_rank",    dim: "boundaries", reveal: "ranked what's hardest for them: physical, emotional, or silly", nudge: "weak spot" },
  "PRF_D04": { theme: "furthest_gone",   dim: "boundaries", reveal: "told us the furthest they've gone outside their comfort zone", nudge: "edge" },
  "PRF_D05": { theme: "test_limits",     dim: "boundaries", reveal: "said they'd test another player's limits",     nudge: "boldness about others" },
  // ─── EGO ───
  "PRF_E01": { theme: "secret_agree",    dim: "ego",        reveal: "admitted to a compliment they secretly agree with", nudge: "ego" },
  "PRF_E02": { theme: "first_wrong",     dim: "ego",        reveal: "told us what people get wrong at first glance", nudge: "hidden layer" },
  "PRF_E03": { theme: "biggest_flex",    dim: "ego",        reveal: "dropped their biggest flex",                   nudge: "pride" },
  "PRF_E04": { theme: "three_words",     dim: "ego",        reveal: "described someone in three brutally honest words", nudge: "perception" },
  "PRF_E05": { theme: "trait_tonight",   dim: "ego",        reveal: "predicted what everyone would notice about them", nudge: "self-awareness" },
  // ─── JEALOUSY ───
  "PRF_J01": { theme: "jealousy_claim",    dim: "jealousy",   reveal: "told us whether they're the jealous type",      nudge: "jealousy" },
  "PRF_J02": { theme: "jealousy_scenario", dim: "jealousy",   reveal: "described what they'd do if someone flirted with their partner", nudge: "possessiveness" },
  "PRF_J03": { theme: "jealousy_regret",   dim: "jealousy",   reveal: "admitted jealousy made them do something they regret", nudge: "jealous streak" },
  "PRF_J04": { theme: "jealousy_phone",    dim: "jealousy",   reveal: "told us if a locked phone would bother them",   nudge: "trust issues" },
  "PRF_J05": { theme: "jealousy_scale",    dim: "jealousy",   reveal: "rated their jealousy on a scale of 1 to 5",    nudge: "jealousy score" },
  // ─── COUPLES DISCOVERY ───
  "CPF_D01": { theme: "first_surprise",    dim: "openness",   reveal: "shared what first surprised them about their partner",   nudge: "first impressions" },
  "CPF_D02": { theme: "secret_attraction", dim: "boldness",   reveal: "admitted something they find attractive but never said",  nudge: "unspoken attraction" },
  "CPF_D03": { theme: "unasked_question",  dim: "boundaries", reveal: "revealed a question they've been afraid to ask",         nudge: "burning question" },
  "CPF_D04": { theme: "attraction_moment", dim: "openness",   reveal: "described the exact moment they felt attraction",         nudge: "spark moment" },
  "CPF_D05": { theme: "hidden_side",       dim: "risk",       reveal: "said there's a side of them their partner hasn't seen",  nudge: "hidden self" },
  "CPF_D06": { theme: "affection_gap",     dim: "ego",        reveal: "guessed what their partner would change about their affection", nudge: "affection style" },
  "CPF_D07": { theme: "butterflies",       dim: "openness",   reveal: "shared a memory that still gives them butterflies",      nudge: "butterflies" },
  "CPF_D08": { theme: "drives_crazy",      dim: "boldness",   reveal: "admitted what their partner does that drives them crazy", nudge: "irresistible habit" },
  "CPF_D09": { theme: "brave_for_them",    dim: "risk",       reveal: "told us the bravest thing they did for their partner",   nudge: "bravery" },
  "CPF_D10": { theme: "curious_tonight",   dim: "openness",   reveal: "said what they're most curious to discover tonight",     nudge: "tonight's curiosity" },
  "CPF_D11": { theme: "unsaid_truth",      dim: "boundaries", reveal: "shared something they wish their partner knew",          nudge: "unsaid truth" },
  "CPF_D12": { theme: "known_score",       dim: "ego",        reveal: "rated how well their partner knows them — and why it's not a 10", nudge: "knowledge gap" },
  "CPF_D13": { theme: "small_gesture",     dim: "openness",   reveal: "named a small gesture that meant everything",            nudge: "meaningful gesture" },
  "CPF_D14": { theme: "partner_fear",      dim: "boundaries", reveal: "guessed what their partner is afraid to reveal",         nudge: "partner's fear" },
  "CPF_D15": { theme: "no_consequences",   dim: "risk",       reveal: "said what they'd try first if tonight had no consequences", nudge: "wildest wish" },
  // ─── COUPLES QUIZ — How well do you know your partner? ───
  "CQ_01":   { theme: "fav_food",          dim: "openness",    reveal: "guessed their partner's favorite food",                    nudge: "food knowledge" },
  "CQ_02":   { theme: "fav_color",         dim: "openness",    reveal: "guessed their partner's favorite color",                   nudge: "color knowledge" },
  "CQ_03":   { theme: "fav_meal",          dim: "openness",    reveal: "tried to name their partner's dream meal",                 nudge: "cooking instinct" },
  "CQ_04":   { theme: "secret_song",       dim: "openness",    reveal: "guessed their partner's repeat song",                      nudge: "music intuition" },
  "CQ_05":   { theme: "annoying_habit",    dim: "boldness",    reveal: "called out a habit that secretly annoys them",              nudge: "honesty about habits" },
  "CQ_06":   { theme: "spirit_animal",      dim: "openness",    reveal: "picked their partner's spirit animal",                     nudge: "animal instinct" },
  "CQ_07":   { theme: "free_saturday",     dim: "openness",    reveal: "guessed how their partner spends free time",               nudge: "leisure knowledge" },
  "CQ_08":   { theme: "guilty_pleasure",   dim: "boldness",    reveal: "exposed their partner's guilty pleasure",                  nudge: "guilty pleasure intel" },
  "CQ_09":   { theme: "dream_vacation",    dim: "openness",    reveal: "described their partner's dream vacation",                 nudge: "travel dreams" },
  "CQ_10":   { theme: "always_laughs",     dim: "openness",    reveal: "tried to make their partner laugh on command",             nudge: "laughter trigger" },
  "CQ_11":   { theme: "dream_job",         dim: "openness",    reveal: "guessed their partner's dream job",                        nudge: "career dreams" },
  "CQ_12":   { theme: "secret_pride",      dim: "ego",         reveal: "named something their partner is secretly proud of",       nudge: "hidden pride" },
  "CQ_13":   { theme: "fav_movie",         dim: "openness",    reveal: "guessed their partner's comfort movie",                    nudge: "movie taste" },
  "CQ_14":   { theme: "stress_mask",       dim: "boundaries",  reveal: "described how their partner hides stress",                 nudge: "stress tells" },
  "CQ_15":   { theme: "love_language",     dim: "openness",    reveal: "guessed their partner's love language",                    nudge: "love language read" },
  "CQ_16":   { theme: "go_to_order",      dim: "openness",    reveal: "guessed their partner's go-to restaurant order",           nudge: "food habits" },
  "CQ_17":   { theme: "last_complaint",   dim: "openness",    reveal: "nailed their partner's latest complaint",                  nudge: "complaint radar" },
  "CQ_18":   { theme: "fav_emoji",        dim: "openness",    reveal: "showed their partner's most-used emoji with their face",   nudge: "emoji game" },
  "CQ_19":   { theme: "driving_style",    dim: "boldness",    reveal: "described their partner's driving in three words",         nudge: "driving review" },
  "CQ_20":   { theme: "fire_grab",        dim: "openness",    reveal: "guessed what their partner would save from a fire",        nudge: "priorities" },
  "CQ_21":   { theme: "kitchen_habit",    dim: "boldness",    reveal: "exposed their partner's worst kitchen habit",              nudge: "kitchen crimes" },
  "CQ_22":   { theme: "lottery_buy",      dim: "openness",    reveal: "predicted their partner's first lottery purchase",         nudge: "money dreams" },
  "CQ_23":   { theme: "disagree_face",    dim: "openness",    reveal: "did their partner's secret disagreement face",             nudge: "poker face" },
  "CQ_24":   { theme: "catchphrase",      dim: "openness",    reveal: "nailed their partner's catchphrase",                       nudge: "catchphrase" },
  "CQ_25":   { theme: "cooking_score",    dim: "boldness",    reveal: "rated their partner's cooking — no mercy",                 nudge: "cooking verdict" },
  "CQ_26":   { theme: "late_excuse",      dim: "openness",    reveal: "mimicked their partner's go-to excuse for being late",     nudge: "lateness tell" },
  "CQ_27":   { theme: "morning_annoy",    dim: "boldness",    reveal: "acted out their partner's most annoying morning habit",    nudge: "morning crimes" },
  "CQ_28":   { theme: "binge_show",       dim: "openness",    reveal: "guessed their partner's binge-worthy show",               nudge: "TV taste" },
  "CQ_29":   { theme: "spider_react",     dim: "openness",    reveal: "dramatized their partner's spider reaction",              nudge: "spider protocol" },
  "CQ_30":   { theme: "chore_avoid",      dim: "openness",    reveal: "exposed the chore their partner always dodges",           nudge: "chore dodge" }
};

// CALLBACK_PROMPTS: injected in later stages when a player has matching revelations.
// {actor} = the player whose revelation is referenced.
// {target} = their partner for this prompt.
// {reveal} = the stored revelation string.
// {nudge} = short label of the trait.
var CALLBACK_PROMPTS = [
  // ─── FLIRTY CALLBACKS (chapters 3) ───
  { id: "CB_F01", chapter: "flirty", triggerTheme: "spontaneity", role: "action", type: "directed", promptType: "dare",
    intensity: 4.5, text: "Earlier, {actor} told us about their spontaneous side. Prove it — walk up to {target} and do the first flirty thing that comes to mind.",
    target: "other" },
  { id: "CB_F02", chapter: "flirty", triggerTheme: "anonymous_self", role: "build", type: "directed", promptType: "truth",
    intensity: 4, text: "{actor}, you said what you'd do if no one recognized you. Look at {target} — would any of those things involve them?",
    target: "other" },
  { id: "CB_F03", chapter: "flirty", triggerTheme: "drunk_persona", role: "action", type: "directed", promptType: "dare",
    intensity: 4.5, text: "{actor}, you told us about the version of you that comes out after a few drinks. Give {target} a taste — show us that energy right now.",
    target: "other" },
  { id: "CB_F04", chapter: "flirty", triggerTheme: "secret_share", role: "build", type: "directed", promptType: "truth",
    intensity: 4, text: "{actor}, earlier you shared something personal. Now tell {target} one thing about yourself you haven't told anyone here yet.",
    target: "other" },
  { id: "CB_F05", chapter: "flirty", triggerTheme: "rule_breaker", role: "action", type: "directed", promptType: "dare",
    intensity: 4.5, text: "Lyra remembers {actor} doesn't care about social rules. Break one now — do something with {target} that polite people don't do at parties.",
    target: "other" },
  { id: "CB_F06", chapter: "flirty", triggerTheme: "play_to_win", role: "action", type: "directed", promptType: "dare",
    intensity: 4, text: "{actor} told us they play to win. Prove it — lock eyes with {target} for 30 seconds. First to look away or smile loses.",
    target: "other" },
  { id: "CB_F07", chapter: "flirty", triggerTheme: "biggest_flex", role: "build", type: "directed", promptType: "truth",
    intensity: 4, text: "{actor} dropped their biggest flex earlier. {target}, your turn — what's the most attractive thing about {actor} that they probably don't even realize?",
    target: "other", _swapActorTarget: true },
  { id: "CB_F08", chapter: "flirty", triggerTheme: "fascination", role: "build", type: "directed", promptType: "truth",
    intensity: 4, text: "{actor}, you told us what fascinates you. Now look at {target} — what's one thing about them you find yourself curious about?",
    target: "other" },

  // ─── SUGGESTIVE CALLBACKS (chapter 4) ───
  { id: "CB_S01", chapter: "suggestive", triggerTheme: "impulse", role: "action", type: "directed", promptType: "dare",
    intensity: 5.5, text: "Lyra remembers that {actor} acts on impulse. Don't think — just go to {target} and do whatever your body tells you to.",
    target: "other" },
  { id: "CB_S02", chapter: "suggestive", triggerTheme: "tap_out_line", role: "build", type: "directed", promptType: "dare",
    intensity: 5.5, text: "{actor} told us exactly where their line is. {target}, take {actor} right up to that line — without crossing it. Let's see how close you can get.",
    target: "other", _swapActorTarget: true },
  { id: "CB_S03", chapter: "suggestive", triggerTheme: "stranger_bold", role: "action", type: "directed", promptType: "dare",
    intensity: 5.5, text: "{actor} said they'd do things in front of strangers they wouldn't around friends. Pretend {target} is someone you'll never see again — and act accordingly.",
    target: "other" },
  { id: "CB_S04", chapter: "suggestive", triggerTheme: "embarrass_test", role: "action", type: "directed", promptType: "dare",
    intensity: 5, text: "{actor} once embarrassed themselves on purpose. Time for round two — do something with {target} that would make your past self proud.",
    target: "other" },
  { id: "CB_S05", chapter: "suggestive", triggerTheme: "daring_tonight", role: "action", type: "directed", promptType: "dare",
    intensity: 5.5, text: "Remember that bet {actor} made about doing something daring tonight? Lyra is calling it in. {actor}, make your move on {target}.",
    target: "other" },
  { id: "CB_S06", chapter: "suggestive", triggerTheme: "comfort_rank", role: "build", type: "directed", promptType: "dare",
    intensity: 5, text: "{actor} told us what's hardest for them. {target}, give them exactly that — test the thing they said was their weak spot.",
    target: "other", _swapActorTarget: true },
  { id: "CB_S07", chapter: "suggestive", triggerTheme: "always_hooks", role: "build", type: "directed", promptType: "truth",
    intensity: 5, text: "{actor}, you said certain topics always grab your attention. If {target} wanted to grab your full attention right now, what would they need to do?",
    target: "other" },
  { id: "CB_S08", chapter: "suggestive", triggerTheme: "worthy_opponent", role: "action", type: "directed", promptType: "dare",
    intensity: 5.5, text: "{actor} named their toughest opponent in the room. Time for a different kind of battle — {actor} and {target}, hands on each other's waists. First one to pull away loses.",
    target: "other" },

  // ─── INTIMATE CALLBACKS (chapter 5) ───
  { id: "CB_I01", chapter: "intimate", triggerTheme: "anonymous_self", role: "action", type: "directed", promptType: "dare",
    intensity: 6.5, text: "Lyra remembers what {actor} said they'd do if no one recognized them. The lights are low. {target} is right there. Be that version of yourself — just for one minute.",
    target: "other" },
  { id: "CB_I02", chapter: "intimate", triggerTheme: "furthest_gone", role: "action", type: "directed", promptType: "dare",
    intensity: 6.5, text: "{actor} told us the furthest outside their comfort zone they've ever gone. Go further — with {target}. Right now.",
    target: "other" },
  { id: "CB_I03", chapter: "intimate", triggerTheme: "drunk_persona", role: "action", type: "directed", promptType: "dare",
    intensity: 6.5, text: "That uninhibited version of {actor} we heard about? Lyra wants to meet them. {actor}, give {target} 60 seconds of that energy.",
    target: "other" },
  { id: "CB_I04", chapter: "intimate", triggerTheme: "secret_agree", role: "build", type: "directed", promptType: "truth",
    intensity: 6, text: "{actor} secretly agrees with a compliment they get often. {target}, look at {actor} and tell them the most intimate compliment you can think of. {actor} — do you secretly agree with that one too?",
    target: "other" },
  { id: "CB_I05", chapter: "intimate", triggerTheme: "first_wrong", role: "build", type: "directed", promptType: "truth",
    intensity: 6, text: "{actor} said people get the wrong first impression. {target}, what was YOUR first impression of {actor} — and how has it changed tonight?",
    target: "other", _swapActorTarget: true },
  { id: "CB_I06", chapter: "intimate", triggerTheme: "test_limits", role: "action", type: "directed", promptType: "dare",
    intensity: 6.5, text: "Earlier, {actor} said they'd test another player's limits. Lyra is giving permission. {actor}, push {target}'s boundaries — gently, slowly, but deliberately.",
    target: "other" },

  // ─── EROTIC CALLBACKS (chapter 6) ───
  { id: "CB_E01", chapter: "erotic", triggerTheme: "impulse", role: "action", type: "directed", promptType: "dare",
    intensity: 7.5, text: "Lyra has been watching {actor} all night. That impulsive streak? It's time. Go to {target} and let your hands do what your brain has been stopping them from doing.",
    target: "other" },
  { id: "CB_E02", chapter: "erotic", triggerTheme: "tap_out_line", role: "action", type: "directed", promptType: "dare",
    intensity: 7.5, text: "{actor} drew a line earlier. Lyra wants to see exactly where it is. {target}, take {actor} there. Slowly. Stop when they say stop — if they say stop.",
    target: "other", _swapActorTarget: true },
  { id: "CB_E03", chapter: "erotic", triggerTheme: "spontaneity", role: "action", type: "directed", promptType: "dare",
    intensity: 7.5, text: "No thinking. No planning. {actor}, you said you're spontaneous — kiss {target} like you mean it. Right now.",
    target: "other" },
  { id: "CB_E04", chapter: "erotic", triggerTheme: "rule_breaker", role: "action", type: "directed", promptType: "dare",
    intensity: 7.5, text: "Lyra remembers {actor} doesn't care about social rules. The last rule standing — break it. With {target}.",
    target: "other" },
  { id: "CB_E05", chapter: "erotic", triggerTheme: "trait_tonight", role: "build", type: "directed", promptType: "truth",
    intensity: 7, text: "{actor} predicted what everyone would notice about them tonight. {target} — was that prediction right? And what did {actor} reveal that they didn't predict?",
    target: "other", _swapActorTarget: true },

  // ─── TABOO CALLBACKS (chapter 7) ───
  { id: "CB_T01", chapter: "taboo", triggerTheme: "anonymous_self", role: "action", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Remember when {actor} told us what they'd do if no one recognized them? Lyra has been waiting all night. Everyone close your eyes. {actor} — do it. You have 60 seconds.",
    target: "other" },
  { id: "CB_T02", chapter: "taboo", triggerTheme: "furthest_gone", role: "action", type: "directed", promptType: "dare",
    intensity: 8.5, text: "{actor} told us the furthest they'd ever gone. That was their old record. {target} — help them set a new one.",
    target: "other", _swapActorTarget: true },
  { id: "CB_T03", chapter: "taboo", triggerTheme: "daring_tonight", role: "action", type: "directed", promptType: "dare",
    intensity: 8.5, text: "At the start of the night, {actor} bet they'd do something daring. The night is almost over. {actor} — was the bet big enough? Show {target} what you've been holding back.",
    target: "other" },

  // ─── JEALOUSY CALLBACKS ───
  { id: "CB_J01", chapter: "flirty", triggerTheme: "jealousy_claim", role: "action", type: "directed", promptType: "truth",
    intensity: 4.5, text: "Lyra remembers — {actor} told us whether they're the jealous type. {target}, do you believe them? Tell the room what you really think.",
    target: "other", _swapActorTarget: true },
  { id: "CB_J02", chapter: "suggestive", triggerTheme: "jealousy_scenario", role: "action", type: "directed", promptType: "dare",
    intensity: 5.5, text: "{actor} described what they'd do if someone flirted with their partner. The orb wants proof. {target}, flirt with {actor}'s partner — right now. Let's see if the story matches reality.",
    target: "other" },
  { id: "CB_J03", chapter: "intimate", triggerTheme: "jealousy_claim", role: "build", type: "directed", promptType: "truth",
    intensity: 7, text: "Earlier, {actor} said they weren't jealous. But Lyra has been watching all night. {actor} — has anything tonight changed your answer? Look at {target} when you say it.",
    target: "other" }
];

// =========================
// MERGE PROMPT POOLS
// =========================

// =========================
// DANCE & CLOSENESS PROMPTS — tied to the music arc and shrinking physical distance
// =========================
var DANCE_AND_CLOSENESS_PROMPTS = [
  // ---- PLAYFUL / Bachata stage ----
  { id: "DNC001", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 3,
    text: "{actor}, turn up the music and pull {target} to their feet for a {dance1}. One song. No sitting down until it ends.", target: "other" },
  { id: "DNC002", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 3,
    text: "{actor}, teach {target} the basic {dance2} step — one hand on their waist, the other in their hand. Four counts. Don't rush.", target: "other" },

  // ---- FLIRTY / Bolero stage ----
  { id: "DNC010", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare", intensity: 4,
    text: "{actor}, stand up and slow-dance with {target} for the next thirty seconds. Cheek close to cheek. No words.", target: "other" },
  { id: "DNC011", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 4.5,
    text: "{actor}, move so there's no space between you and {target} — shoulders touching, knees touching. Stay there for the next three prompts.", target: "other" },
  { id: "DNC012", chapter: "flirty", role: "action", type: "directed", promptType: "dare", intensity: 4.5,
    text: "Everyone stand. {actor}, lead {target} in a slow {dance2} — one hand on the small of their back. The rest of the room watches.", target: "other" },

  // ---- SUGGESTIVE / Orchestral Soul stage ----
  { id: "DNC020", chapter: "suggestive", role: "interaction", type: "directed", promptType: "dare", intensity: 5.5,
    text: "{actor}, sit on the floor in front of {target} with your back against their legs. Stay like that for the next two prompts.", target: "other" },
  { id: "DNC021", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6,
    text: "{actor}, dance for {target}. Slow. one full song. They aren't allowed to look away.", target: "other" },
  { id: "DNC022", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 6,
    text: "{actor}, sit in {target}'s lap. That's the whole dare. Stay there until the next spin.", target: "other" },

  // ---- INTIMATE / Philadelphia Soul stage ----
  { id: "DNC030", chapter: "intimate", role: "interaction", type: "directed", promptType: "dare", intensity: 6.5,
    text: "{actor}, slow-dance with {target} — bodies pressed together, one hand in theirs, the other on their lower back. No talking. One song.", target: "other" },
  { id: "DNC031", chapter: "intimate", role: "build", type: "directed", promptType: "dare", intensity: 7,
    text: "{actor}, give {target} a slow, swaying dance while sitting in their lap. Move with the music — don't rush.", target: "other" },
  { id: "DNC032", chapter: "intimate", role: "action", type: "directed", promptType: "dare", intensity: 7,
    text: "Everyone move into a tight circle — knees touching, shoulders touching. {actor}, in the middle. Dance for thirty seconds while the others watch.", target: "other" },

  // ---- EROTIC / Quiet Storm stage ----
  { id: "DNC040", chapter: "erotic", role: "interaction", type: "directed", promptType: "dare", intensity: 7.5,
    text: "{actor}, give {target} a private slow dance — hips close, hands wherever they're welcome. Let it last.", target: "other" },
  { id: "DNC041", chapter: "erotic", role: "build", type: "directed", promptType: "dare", intensity: 8,
    text: "{actor}, straddle {target}'s lap and move slowly to the music. They keep their hands at their sides unless you invite them to move.", target: "other" },

  // ---- TABOO / Dark Neo-Soul stage ----
  { id: "DNC050", chapter: "taboo", role: "action", type: "directed", promptType: "dare", intensity: 8.5,
    text: "{actor}, dance slowly for {target} — whatever is playing dictates the pace. They may touch you with one hand only.", target: "other" },

  // ---- CLOSENESS prompts — remove physical distance ----
  { id: "CLS001", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2.5,
    text: "Everyone move one seat clockwise and scoot closer — no gaps between anyone's legs.", target: "other" },
  { id: "CLS002", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare", intensity: 4,
    text: "{actor}, move so that you're sitting thigh-to-thigh with {target}. Stay there for the rest of this stage.", target: "other" },
  { id: "CLS003", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 4.5,
    text: "Everyone move so no part of your body is more than an inch from the person next to you.", target: "other" },
  { id: "CLS004", chapter: "suggestive", role: "interaction", type: "directed", promptType: "dare", intensity: 5,
    text: "{actor}, rest your head in {target}'s lap for the next three prompts.", target: "other" },
  { id: "CLS005", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 5.5,
    text: "Everyone move into a pile — legs over legs, arms over arms. No personal bubbles from this point on.", target: "other" },
  { id: "CLS006", chapter: "intimate", role: "interaction", type: "directed", promptType: "dare", intensity: 6.5,
    text: "{actor}, sit between {target}'s legs with your back against their chest. Their arms go around you. Stay like that.", target: "other" },
  { id: "CLS007", chapter: "intimate", role: "build", type: "directed", promptType: "dare", intensity: 7,
    text: "Everyone pair up with whoever is nearest and get as close as you can — forehead to forehead, nose to nose if you dare. Hold it for twenty seconds.", target: "other" },
  { id: "CLS008", chapter: "erotic", role: "interaction", type: "directed", promptType: "dare", intensity: 7.5,
    text: "{actor}, lie down with your head in {target}'s lap. They run their fingers through your hair until the next spin.", target: "other" },
  { id: "CLS009", chapter: "erotic", role: "build", type: "directed", promptType: "dare", intensity: 8,
    text: "{actor}, curl up against {target} like you've known them for years. One of their hands rests wherever feels right to them.", target: "other" },

  // ============================================================
  // GENDER-TUNED DANCE VARIATIONS
  // The base DNC prompts above are gender-neutral. These tuned ones
  // exploit traditional lead/follow dance dynamics for stronger imagery.
  // ============================================================

  // ---- MALE leads FEMALE — Latin partner dances ----
  { id: "DNC_MF001", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 3.2,
    text: "{actor}, take {target}'s hand, spin her once, and pull her in for a {dance1}. You lead — she follows. One song.",
    target: "other", actor_gender: "male", target_gender: "female" },
  { id: "DNC_MF002", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 4.5,
    text: "{actor}, slow {dance2} with {target}. Right hand on the small of her back, left hand holding hers — she keeps her eyes on yours the whole time.",
    target: "other", actor_gender: "male", target_gender: "female" },
  { id: "DNC_MF003", chapter: "erotic", role: "action", type: "directed", promptType: "dare", intensity: 8,
    text: "{actor}, take {target} by the hips and lead her in a slow grind to whatever's playing. Forehead-to-forehead. The room watches.",
    target: "other", actor_gender: "male", target_gender: "female" },
  { id: "DNC_MF004", chapter: "erotic", role: "interaction", type: "directed", promptType: "dare", intensity: 8,
    text: "{actor}, pull {target} into your lap facing you. Move her hips slowly with your hands while the music plays.",
    target: "other", actor_gender: "male", target_gender: "female" },
  { id: "DNC_MF005", chapter: "erotic", role: "build", type: "directed", promptType: "dare", intensity: 8,
    text: "{actor}, dance with {target} pressed against you from behind. Your hands on her hips, hers wherever she wants them. One full song.",
    target: "other", actor_gender: "male", target_gender: "female" },

  // ---- FEMALE leads MALE — she takes the lead ----
  { id: "DNC_FM001", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 3.2,
    text: "{actor}, pull {target} up by the tie (or shirt) and teach him a basic {dance1}. He has to follow your hips — no excuses.",
    target: "other", actor_gender: "female", target_gender: "male" },
  { id: "DNC_FM002", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 4.8,
    text: "{actor}, dance for {target} like he paid for the privilege. He can't move from his seat. One song.",
    target: "other", actor_gender: "female", target_gender: "male" },
  { id: "DNC_FM003", chapter: "erotic", role: "action", type: "directed", promptType: "dare", intensity: 8,
    text: "{actor}, sit in {target}'s lap facing him. Move slowly to the music. He keeps his hands on his thighs unless you guide them somewhere else.",
    target: "other", actor_gender: "female", target_gender: "male" },
  { id: "DNC_FM004", chapter: "erotic", role: "build", type: "directed", promptType: "dare", intensity: 8,
    text: "{actor}, straddle {target}'s lap and dance slowly to whatever's playing. He can put his hands on you only when you take them and place them.",
    target: "other", actor_gender: "female", target_gender: "male" },
  { id: "DNC_FM005", chapter: "erotic", role: "action", type: "directed", promptType: "dare", intensity: 8.2,
    text: "{actor}, give {target} a private slow dance — back to him, hips against his lap, his hands on your waist. Full song.",
    target: "other", actor_gender: "female", target_gender: "male" },

  // ---- FEMALE / FEMALE — sensual, mirrored ----
  { id: "DNC_FF001", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare", intensity: 4.5,
    text: "{actor}, slow {dance2} with {target} — both of you with one hand on each other's hip. No leader, no follower, just mirroring.",
    target: "other", actor_gender: "female", target_gender: "female" },
  { id: "DNC_FF002", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6,
    text: "{actor}, dance face-to-face with {target} — close enough that your hair touches hers when you move. Eye contact only. One song.",
    target: "other", actor_gender: "female", target_gender: "female" },
  { id: "DNC_FF003", chapter: "intimate", role: "action", type: "directed", promptType: "dare", intensity: 7.2,
    text: "{actor}, sit behind {target} and sway her hips with your hands. Move with the music — make her feel it before she feels you.",
    target: "other", actor_gender: "female", target_gender: "female" },
  { id: "DNC_FF004", chapter: "erotic", role: "build", type: "directed", promptType: "dare", intensity: 8,
    text: "{actor}, dance for {target} — slow, in front of her. Take her hand at the end of the song and place it on the part of you you want her to remember.",
    target: "other", actor_gender: "female", target_gender: "female" },

  // ---- MALE / MALE — confident, rhythmic ----
  { id: "DNC_MM001", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare", intensity: 4.5,
    text: "{actor}, pull {target} into a {dance2}. Decide between you who leads — but commit. One full song, no laughing it off.",
    target: "other", actor_gender: "male", target_gender: "male" },
  { id: "DNC_MM002", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6,
    text: "{actor}, dance close with {target} — chest to chest, no daylight between you. Slow {dance_slow} pace. The rest of the room is silent.",
    target: "other", actor_gender: "male", target_gender: "male" },
  { id: "DNC_MM003", chapter: "intimate", role: "action", type: "directed", promptType: "dare", intensity: 7,
    text: "{actor}, slow-dance with {target} — your forehead against his, one hand at the back of his neck. Hold that for the length of one Philly Soul track.",
    target: "other", actor_gender: "male", target_gender: "male" },
  { id: "DNC_MM004", chapter: "erotic", role: "build", type: "directed", promptType: "dare", intensity: 8,
    text: "{actor}, dance behind {target} with your hands on his hips, moving him with you. The music is playing. Don't rush.",
    target: "other", actor_gender: "male", target_gender: "male" }
];

// Pointless small-talk prompts that don't fit a Truth or Dare game.
// These are filtered out at load time so they never appear.
var PRUNED_PROMPT_IDS = new Set([
  "GRP0002","GRP0005","GRP0008","GRP0014","GRP0030","GRP0032","GRP0034","GRP0035","GRP0036","GRP0037",
  "GRP0038","GRP0039","GRP0040","GRP0041","GRP0042","GRP0043","GRP0044","GRP0045","GRP0046","GRP0047",
  "GRP0048","GRP0049","GRP0050","GRP0051","GRP0052","GRP0053","GRP0054","GRP0055","GRP0056","GRP0058",
  "GRP0059","GRP0060","GRP0061","GRP0063","GRP0067","GRP0068","GRP0069","GRP0078","GRP0079","GRP0080",
  "GRP0131","GRP0142","GRP0162","GRP0215","GRP0250","GRP0251","GRP0260","GRP0273","GRP0285","GRP0337","GRP0439","GRP0441","GRP0442","GRP0445","GRP0578","GRP1263","GRP1603"
]);

// Replacement prompts to backfill the playful pool with content that actually
// belongs in a Truth or Dare game (curiosity, mild flirtation, light dares).
var REPLACEMENT_PROMPTS = [
  { id: "REP001", chapter: "playful", role: "setup", type: "self", promptType: "truth", intensity: 2.5,
    text: "What's the boldest thing you'd be willing to do tonight if no one ever told a soul?", target: "self" },
  { id: "REP002", chapter: "playful", role: "interaction", type: "self", promptType: "truth", intensity: 2.8,
    text: "Be honest: who in this room would you most want to be stuck in an elevator with — and why?", target: "self" },
  { id: "REP003", chapter: "playful", role: "action", type: "self", promptType: "truth", intensity: 3,
    text: "What's the most flirtatious thing you've done with a complete stranger?", target: "self" },
  { id: "REP004", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 3,
    text: "Look at {target}. What's the first thing you'd notice about someone like them across a crowded room?", target: "other" },
  { id: "REP005", chapter: "playful", role: "interaction", type: "self", promptType: "truth", intensity: 3,
    text: "Have you ever done something just because someone dared you to? How did it end?", target: "self" },
  { id: "REP006", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 3,
    text: "{actor}, give {target} a compliment that you'd actually be too shy to give them sober.", target: "other" },
  { id: "REP007", chapter: "playful", role: "build", type: "self", promptType: "truth", intensity: 3,
    text: "What's a side of you that only comes out when you trust the people around you?", target: "self" },
  { id: "REP008", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 3.2,
    text: "Without overthinking it: what's one thing about {target} that surprised you when you got to know them?", target: "other" },
  { id: "REP009", chapter: "playful", role: "action", type: "self", promptType: "truth", intensity: 3,
    text: "What's the longest you've ever held eye contact with someone you barely knew — and what happened next?", target: "self" },
  { id: "REP010", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 3.2,
    text: "{actor}, hold {target}'s hand for the duration of the next prompt. No commentary.", target: "other" }
];

// =========================
// HUMOR PROMPTS — Stages 1 & 2
// Designed to break the ice with laughter. Pair with Merengue/Bachata energy.
// =========================
var HUMOR_PROMPTS = [
  // ---- PERSONAL (Stage 1) — warm, goofy, get-to-know-you comedy ----
  { id: "HMR001", chapter: "personal", role: "setup", type: "self", promptType: "dare", intensity: 2,
    text: "Stand up and give us your best impression of how you look when your alarm goes off on a Monday.", target: "self" },
  { id: "HMR002", chapter: "personal", role: "interaction", type: "self", promptType: "truth", intensity: 2.5,
    text: "What's the most embarrassing song you know every single word to? Prove it — sing the chorus.", target: "self" },
  { id: "HMR003", chapter: "personal", role: "action", type: "self", promptType: "dare", intensity: 2.5,
    text: "Do your best sexy walk across the room. Commit to it. No half measures.", target: "self" },
  { id: "HMR004", chapter: "personal", role: "setup", type: "self", promptType: "truth", intensity: 2,
    text: "If your love life were a movie, what would the title be? Everyone else gets to suggest a better one.", target: "self" },
  { id: "HMR005", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 2.5,
    text: "{actor}, look {target} dead in the eye and give them the most dramatic telenovela confession of love you can manage. In any accent.", target: "other" },
  { id: "HMR006", chapter: "personal", role: "build", type: "self", promptType: "dare", intensity: 3,
    text: "Tell us about your worst date ever — but you have to act out the other person's behavior.", target: "self" },
  { id: "HMR007", chapter: "personal", role: "action", type: "self", promptType: "truth", intensity: 2.5,
    text: "What's the most ridiculous thing you've done to impress someone you liked? Did it work?", target: "self" },
  { id: "HMR008", chapter: "personal", role: "setup", type: "self", promptType: "dare", intensity: 2,
    text: "Everyone votes: who here would survive the longest on a desert island? The winner has to explain their strategy in 15 seconds.", target: "self" },
  { id: "HMR009", chapter: "personal", role: "interaction", type: "self", promptType: "truth", intensity: 3,
    text: "What's the biggest lie you've told on a date? The group decides if it was smooth or desperate.", target: "self" },
  { id: "HMR010", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 3,
    text: "{actor}, pretend {target} just proposed to you. Give us the reaction — tears, screaming, fainting, whatever you'd actually do.", target: "other" },

  // ---- PLAYFUL (Stage 2) — party energy, physical comedy, flirty humor ----
  { id: "HMR011", chapter: "playful", role: "setup", type: "self", promptType: "dare", intensity: 2.5,
    text: "Show us your signature dance move. Now everyone else has to copy it for the next 10 seconds.", target: "self" },
  { id: "HMR012", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 3,
    text: "{actor}, pick up an imaginary phone and break up with {target}. {target}, you're not taking it well. Perform the scene.", target: "other" },
  { id: "HMR013", chapter: "playful", role: "action", type: "self", promptType: "truth", intensity: 2.5,
    text: "What's the weirdest thing you find attractive in a person? The group rates how weird it actually is on a scale of 1 to 5.", target: "self" },
  { id: "HMR014", chapter: "playful", role: "build", type: "self", promptType: "dare", intensity: 3,
    text: "You're a {dance1} instructor and this group is your worst class ever. Teach us something for 30 seconds. Don't give up on us.", target: "self" },
  { id: "HMR015", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 3,
    text: "{actor}, serenade {target} with any song — but replace every noun with the word 'chicken.' Try to keep a straight face.", target: "other" },
  { id: "HMR016", chapter: "playful", role: "action", type: "self", promptType: "truth", intensity: 3,
    text: "Confess: what's your most irrational dealbreaker? The group votes on whether it's valid.", target: "self" },
  { id: "HMR017", chapter: "playful", role: "setup", type: "directed", promptType: "dare", intensity: 2.5,
    text: "{actor}, give {target} a rating out of 5 based purely on their dance potential. Then prove your own rating is higher.", target: "other" },
  { id: "HMR018", chapter: "playful", role: "build", type: "self", promptType: "dare", intensity: 3,
    text: "You're a wildlife narrator. Narrate the mating rituals of the person to your left for 20 seconds. David Attenborough voice mandatory.", target: "self" },
  { id: "HMR019", chapter: "playful", role: "interaction", type: "self", promptType: "truth", intensity: 3,
    text: "What's the most embarrassing autocorrect or text you've accidentally sent to someone you liked? Read it out loud.", target: "self" },
  { id: "HMR020", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 3.2,
    text: "{actor}, you and {target} are in a telenovela. Recreate the dramatic slow-motion 'seeing each other across the room' scene. Walk toward each other. Someone gasp.", target: "other" }
];

// =========================
// MUSIC-INTIMATE PROMPTS — Stages 3-7
// These explicitly tie the music/genre to the physical/emotional action.
// They make the playlist feel like a character in the game.
// =========================
var MUSIC_INTIMATE_PROMPTS = [
  // ---- FLIRTY / Bolero (Stage 3) ----
  { id: "MUS001", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 4.5,
    text: "{actor}, this {dance_slow} is yours. Take {target}'s hand, stand up, and sway together — nothing fancy, just feel the guitar. Don't let go until it stops feeling awkward.", target: "other" },
  { id: "MUS002", chapter: "flirty", role: "action", type: "directed", promptType: "dare", intensity: 5,
    text: "{actor}, whisper something into {target}'s ear that matches the mood of whatever song is playing right now. Mean it.", target: "other" },
  { id: "MUS003", chapter: "flirty", role: "interaction", type: "directed", promptType: "truth", intensity: 4,
    text: "Listen to whatever's playing right now. {actor}, does this song remind you of anyone in this room? Look at them while you answer.", target: "other" },

  // ---- SUGGESTIVE / Orchestral Soul (Stage 4) ----
  { id: "MUS010", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6,
    text: "{actor}, the strings are playing for you. Stand behind {target}, put your hands on their shoulders, and slowly sway them to the beat. No words.", target: "other" },
  { id: "MUS011", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 6.5,
    text: "{actor}, don't do anything halfway. Pull {target} close and dance — chest to chest, one hand on their lower back. Stay there until the chorus ends.", target: "other" },
  { id: "MUS012", chapter: "suggestive", role: "peak", type: "directed", promptType: "dare", intensity: 6.5,
    text: "{actor}, close your eyes and listen to this song for ten seconds. Now open your eyes, look at {target}, and say the first thing the music made you think about {target_him}.", target: "other" },

  // ---- INTIMATE / Philly Soul (Stage 5) ----
  { id: "MUS020", chapter: "intimate", role: "build", type: "directed", promptType: "dare", intensity: 7,
    text: "{actor}, Lyra chose this one for you and {target}. Slow dance — foreheads touching, eyes closed. One full song. Nobody interrupts.", target: "other" },
  { id: "MUS021", chapter: "intimate", role: "action", type: "directed", promptType: "dare", intensity: 7.5,
    text: "{actor}, sit facing {target}. Hold both their hands. Listen to the music together without speaking for thirty seconds. Then tell them one thing you've been wanting to say tonight.", target: "other" },
  { id: "MUS022", chapter: "intimate", role: "peak", type: "directed", promptType: "dare", intensity: 7.5,
    text: "Everyone dims their phone screens. {actor}, dance with {target} in the low light — slow, close, like nobody's watching. The music decides how long.", target: "other" },

  // ---- EROTIC / Quiet Storm (Stage 6) ----
  { id: "MUS030", chapter: "erotic", role: "build", type: "directed", promptType: "dare", intensity: 8,
    text: "{actor}, The music is in control now. Dance with {target} — your back against their chest, moving together. Their hands start on your hips. You decide where they end up.", target: "other" },
  { id: "MUS031", chapter: "erotic", role: "action", type: "directed", promptType: "dare", intensity: 8.5,
    text: "{actor}, pull {target} close enough that you can feel their heartbeat. Move with whatever's playing. When the song changes, whisper one word that describes what you're feeling.", target: "other" },
  { id: "MUS032", chapter: "erotic", role: "peak", type: "directed", promptType: "dare", intensity: 8.5,
    text: "{actor}, the music is slow enough to count every beat. Dance for {target} — their eyes don't leave you. At the end of the song, sit in their lap without breaking eye contact.", target: "other" },

  // ---- TABOO / Dark Neo-Soul (Stage 7) ----
  { id: "MUS040", chapter: "taboo", role: "build", type: "directed", promptType: "dare", intensity: 9,
    text: "{actor}, The music's pace is your pace now. Move with {target} — slow, deliberate, no rush. Let the bass tell your hips what to do. The room is silent except the music.", target: "other" },
  { id: "MUS041", chapter: "taboo", role: "action", type: "directed", promptType: "dare", intensity: 9.5,
    text: "{actor}, lie down. {target}, lie next to them. Listen to the music together — bodies touching, breathing together. When the song ends, one of you makes the first move. The other responds.", target: "other" },
  { id: "MUS042", chapter: "taboo", role: "peak", type: "directed", promptType: "dare", intensity: 9.5,
    text: "{actor}, this is your last dance with {target} tonight. Make it the one they remember. Whatever the music allows, the room allows. Take your time.", target: "other" }
];

const PROMPTS = [
  ...(typeof CSV_PROMPTS !== 'undefined' ? CSV_PROMPTS.filter(function(p){ return !PRUNED_PROMPT_IDS.has(p.id); }) : []),
  ...REPLACEMENT_PROMPTS,
  ...HUMOR_PROMPTS,
  ...MUSIC_INTIMATE_PROMPTS,
  ...CHAIN_PROMPTS,
  // Couples-only profiling prompts must not leak into the group pool —
  // they're partner-quiz questions that make no sense between strangers.
  ...PROFILING_PROMPTS.filter(function(p){ return !p._couplesOnly; }),
  ...CALLBACK_PROMPTS,
  ...DANCE_AND_CLOSENESS_PROMPTS
];

// =========================
// COUPLES PROMPT POOL
// =========================
// Built from COUPLES_PROMPTS_EARLY (personal + playful stages, coupleType-tagged,
// loaded via couples_prompts_early.js) + CSV_COUPLES_PROMPTS (flirty through taboo,
// loaded via couples_prompts_v2.js). Early stages were rewritten for humor-first
// profiling; v2's personal/playful prompts are excluded in favor of them.
// This is the prompt pool used when gameMode === "couple".
const COUPLES_PROMPTS = (function() {
  var v2 = (typeof CSV_COUPLES_PROMPTS !== 'undefined') ? CSV_COUPLES_PROMPTS : [];
  var early = (typeof COUPLES_PROMPTS_EARLY !== 'undefined') ? COUPLES_PROMPTS_EARLY : [];
  if (!early.length) return v2;
  var lateStages = v2.filter(function(p) { return p.chapter !== 'personal' && p.chapter !== 'playful'; });
  return early.concat(lateStages);
})();

