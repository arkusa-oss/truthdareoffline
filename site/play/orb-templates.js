// =========================
// POST-CHAIN BRIDGE TEMPLATES
// =========================
// When a chain between two players ends, a THIRD player joins the pair
// to maintain energy before normal rotation resumes.
// Placeholders: {actor} = chain actor, {target} = chain target, {third} = joiner
// Templates are tiered by chapter intensity.

var BRIDGE_TEMPLATES = {
  // Flirty (intensity ~5)
  flirty: [
    { step: 1, promptType: "dare", intensity: 5, text: [
      "{third}, come sit between {actor} and {target}. You're part of this now.",
      "{third}, Lyra wants you closer. Go stand between {actor} and {target} — they've been having too much fun without you.",
      "{third}, the energy between {actor} and {target} needs a witness. Get in there."
    ] },
    { step: 2, promptType: "dare", intensity: 5.5, text: "{third}, look at {actor} and then at {target} — who makes you more nervous? Whisper your answer to the other one." },
    { step: 3, promptType: "dare", intensity: 6, text: "{third}, you're the new center of attention. {actor} on one shoulder, {target} on the other — both whisper a compliment in your ear at the same time. You only get to keep one." }
  ],
  // Suggestive (intensity ~6)
  suggestive: [
    { step: 1, promptType: "dare", intensity: 6, text: [
      "{third}, join {actor} and {target}. Sit close — one on each side of you.",
      "{third}, Lyra says it's your turn. Slide in between {actor} and {target}. No space between you.",
      "{third}, there's a spot between {actor} and {target} with your name on it. Go claim it."
    ] },
    { step: 2, promptType: "dare", intensity: 6.5, text: "{third}, whisper something to {actor} that would make {target} jealous." },
    { step: 3, promptType: "dare", intensity: 7, text: "{third}, take {actor}'s hand in your left and {target}'s in your right. Decide which one to bring to your lips first — and do it." }
  ],
  // Intimate (intensity ~7)
  intimate: [
    { step: 1, promptType: "dare", intensity: 7, text: [
      "{third}, come here. {actor} and {target} have been keeping you waiting. Join them — close.",
      "{third}, Lyra noticed you watching. Get closer. {actor} and {target} are expecting you.",
      "{third}, it's your turn to choose. Walk up to {actor} or {target} — whoever you've been thinking about more tonight.",
      "{third}, the energy over there is getting intense. Go see what {actor} and {target} started without you.",
      "{third}, Lyra thinks someone's feeling left out. Go remind {actor} and {target} what they've been missing."
    ] },
    { step: 2, promptType: "dare", intensity: 7.5, text: [
      "{third}, whisper a secret to {actor} — something you haven't told anyone tonight. {target} has to watch and wonder.",
      "{third}, look at {actor} and then at {target}. Tell both of them the most attractive thing about each — be specific.",
      "{actor}, take {third}'s hand and trace a word on their palm. {third}, guess what it says. {target}, you're next."
    ] },
    { step: 3, promptType: "dare", intensity: 8, text: [
      "{third}, lean back so you're resting against {actor}. {target}, come close and kiss {third} slowly on the cheek — close enough that {actor} feels it too.",
      "{third}, slow dance with {actor} while {target} picks the next song. When the chorus hits, switch partners.",
      "{actor} and {target}, each whisper one thing you want {third} to do right now. {third}, you only get to pick one."
    ] }
  ],
  // Erotic (intensity ~8)
  erotic: [
    { step: 1, promptType: "dare", intensity: 8, text: [
      "{third}, the energy between {actor} and {target} is undeniable. Walk over. Stand between them. Let them both feel you close.",
      "{third}, Lyra has been saving you for this moment. Go to {actor} and {target}. They're yours.",
      "{third}, you've been on the outside long enough. {actor} and {target} — make room."
    ] },
    { step: 2, promptType: "dare", intensity: 8.5, text: "{actor}, whisper something in {third}'s ear. {target}, watch — then whisper something better." },
    { step: 3, promptType: "dare", intensity: 9, text: "{third}, your call. Pull whichever of {actor} or {target} you wanted more into a kiss — slow, like you mean it. The other one watches up close." }
  ],
  // Taboo (intensity ~9)
  taboo: [
    { step: 1, promptType: "dare", intensity: 9, text: [
      "{third}, {actor} and {target} want you here. Step in between them. Let them both hold you.",
      "{third}, Lyra saved the best for last. {actor} and {target} have been warming up for you. Go.",
      "{third}, no more watching. Get between {actor} and {target}. Let whatever happens, happen."
    ] },
    { step: 2, promptType: "dare", intensity: 9.5, text: "{actor}, kiss {third}. Then {target}, kiss {third}. Take your time." },
    { step: 3, promptType: "dare", intensity: 9.8, text: "{third}, the room is yours. Place {actor}'s hands wherever you want them on your body. Then place {target}'s hands somewhere different. Hold the tableau until the next spin." }
  ]
};

// =========================
// TRUTH→DARE FOLLOW-THROUGH MAP
// =========================
// When a truth prompt containing a trigger phrase is completed ("done"/"answered"),
// the engine queues a follow-up dare for the NEXT turn that acts on the answer.
// The follow-up targets the same actor (they revealed something → now act on it).
// {target} in follow-up text will be replaced with the original target if present.

var FOLLOW_THROUGH_MAP = [
  // Touch-related truths → physical dare follow-up
  { trigger: "what kind of touch", followUp: "Now show {target} exactly what you mean. Put your hands on them and demonstrate.", intensityBoost: 0.5 },
  { trigger: "touch makes you melt", followUp: "Now show {target} exactly what that feels like. Don't hold back.", intensityBoost: 0.5 },
  { trigger: "touch makes you feel", followUp: "{target}, you heard them. Give them exactly what they described.", swapActorTarget: true, intensityBoost: 0.5 },
  { trigger: "touch relaxes you", followUp: "{target}, you heard them. Now give them that touch — slow and deliberate.", swapActorTarget: true, intensityBoost: 0.5 },
  { trigger: "touch gives you goosebumps", followUp: "{target}, try to give them goosebumps. Use your fingertips — start at the wrist.", swapActorTarget: true, intensityBoost: 0.5 },

  // Kiss-related truths → kiss dare follow-up
  { trigger: "best kiss you've ever had", followUp: "Now show {target} the kind of kiss you just described. Make it count.", intensityBoost: 1 },
  { trigger: "best kiss you ever had", followUp: "Now show {target} the kind of kiss you just described. Make it count.", intensityBoost: 1 },
  { trigger: "describe the best kiss", followUp: "Show {target} what that kiss felt like. Recreate it.", intensityBoost: 1 },

  // Desire-related truths → action follow-up
  { trigger: "what do you want to do", followUp: "You said it. Now do it.", intensityBoost: 1 },
  { trigger: "what would you do if", followUp: "Stop talking about it. Do it.", intensityBoost: 1 },

  // Attraction-related → physical escalation
  { trigger: "most attractive thing about", followUp: "Now show {target} exactly how much that attracts you — with your hands, not words.", intensityBoost: 0.5 },
  { trigger: "what draws you to", followUp: "Pull {target} closer. Show them, don't tell them.", intensityBoost: 0.5 },

  // Intimate confessions → dares
  { trigger: "boldest move", followUp: "Now make that move on {target}. Right here, right now.", intensityBoost: 0.5 },
  { trigger: "caught you off guard", followUp: "Surprise {target} like that — do something they won't see coming.", intensityBoost: 0.5 },
  { trigger: "most seductive thing", followUp: "Show {target} what you just described. No touching — just the energy.", intensityBoost: 0.5 },
  { trigger: "favorite way to be touched", followUp: "{target}, you heard exactly what they want. Give it to them — slowly.", swapActorTarget: true, intensityBoost: 0.5 },
  { trigger: "most intimate moment", followUp: "Create a new one. Right now. With {target}.", intensityBoost: 0.5 },
  { trigger: "what turns you on", followUp: "{target}, you just got the cheat code. Use it.", swapActorTarget: true, intensityBoost: 1 },
  { trigger: "fantasy", followUp: "Act out the first 10 seconds of that fantasy with {target}.", intensityBoost: 1 },
  { trigger: "sexiest compliment", followUp: "Give {target} a compliment that tops the one you just described.", intensityBoost: 0.5 }
];

// =========================
// CHAPTER CONFIG (7 stages)
// =========================

const CHAPTER_ORDER = ["personal", "playful", "flirty", "suggestive", "intimate", "erotic", "taboo"];

// =========================
// MUSIC THEMES — each theme contains 7 stage playlists.
// The host picks a theme from the setup screen.
// To add/edit playlists: replace the `url` value with a YouTube playlist URL.
// =========================

var MUSIC_THEMES = {
  latin: {
    id: "latin",
    name: "Latin Vibes",
    description: "Merengue \u2192 Bachata \u2192 Salsa \u2192 Soul",
    dances: { dance1: "merengue", dance2: "bachata", dance_slow: "salsa", beat: "merengue beat" },
    stages: {
      personal:   { genre: "Merengue",          label: "Stage 1 \u00B7 Merengue",          sub: "Juan Luis Guerra \u00B7 bright, warm, 160 BPM",       url: "https://www.youtube.com/playlist?list=PLTf0XtL09CeBxBYpn-lRo8FzIFLfRqwh8" },
      playful:    { genre: "Bachata",           label: "Stage 2 \u00B7 Bachata",           sub: "Aventura \u00B7 Romeo Santos \u00B7 flirty 130 BPM",    url: "https://www.youtube.com/playlist?list=PLTf0XtL09CeCDu4V3JNyX-syiN5UwZrsi" },
      flirty:     { genre: "Salsa Rom\u00E1ntica",  label: "Stage 3 \u00B7 Salsa Rom\u00E1ntica",  sub: "Salsa sensual \u00B7 tension building \u00B7 100 BPM",   url: "https://www.youtube.com/playlist?list=PLGG-Y1Hr6VAU" },
      suggestive: { genre: "Orchestral Soul",   label: "Stage 4 \u00B7 Orchestral Soul",   sub: "Lush strings \u00B7 warm 75 BPM",                      url: "https://www.youtube.com/playlist?list=PLTf0XtL09CeDg1flh6UsFoIsezDammDx7" },
      intimate:   { genre: "Philadelphia Soul", label: "Stage 5 \u00B7 Philly Soul",       sub: "Philly soul \u00B7 smooth ballads",                    url: "https://www.youtube.com/playlist?list=PLTf0XtL09CeBLit50F4VCllVMT1LssVqv" },
      erotic:     { genre: "Quiet Storm",       label: "Stage 6 \u00B7 Quiet Storm",       sub: "Hushed, sultry \u00B7 65 BPM",                          url: "https://www.youtube.com/playlist?list=PLTf0XtL09CeDqOSqCFUZLhx5AThdz8-fg" },
      taboo:      { genre: "Dark Neo-Soul",     label: "Stage 7 \u00B7 Dark Neo-Soul",     sub: "Dark neo-soul \u00B7 slow burn 58 BPM",                url: "https://www.youtube.com/playlist?list=PLTf0XtL09CeAQDDWCEVxO_xbfRgKanvXu" }
    }
  },
  rnb: {
    id: "rnb",
    name: "R&B / Soul",
    description: "Party R&B \u2192 Slow Jams \u2192 Neo-Soul",
    dances: { dance1: "two-step", dance2: "groove", dance_slow: "soul", beat: "R&B groove" },
    stages: {
      personal:   { genre: "Afrobeats",         label: "Stage 1 \u00B7 Afrobeats",         sub: "Dancehall Afrobeats \u00B7 high energy 150 BPM",    url: "https://www.youtube.com/playlist?list=PLTuKswLYHiXlw19K1xQUwOLkQXTI6fbHK" },
      playful:    { genre: "Afrobeat Dance",   label: "Stage 2 \u00B7 Afrobeat Dance",   sub: "Afrobeats dance floor \u00B7 funky 130 BPM",        url: "https://www.youtube.com/playlist?list=PLkN9IoY-hkDT53V_I7PSEsHVZaz46ioTS" },
      flirty:     { genre: "Disco Funk",       label: "Stage 3 \u00B7 Disco Funk",       sub: "Disco \u00B7 funk \u00B7 soul groove \u00B7 110 BPM",         url: "https://www.youtube.com/playlist?list=RDCLAK5uy_nhrn9P59Ud6qvVDGuKJKJlkkuLivIzahc" },
      suggestive: { genre: "Classic Soul",    label: "Stage 4 \u00B7 Classic Soul",    sub: "All-time R&B classics \u00B7 lush 80 BPM",              url: "https://www.youtube.com/playlist?list=PLi13rLFLL6Q8h6kbXHkXIKJJn9IX5Qtx5" },
      intimate:   { genre: "Quiet Storm",     label: "Stage 5 \u00B7 Quiet Storm",     sub: "Late night bedroom R&B \u00B7 75 BPM",                  url: "https://www.youtube.com/playlist?list=PLcId4x0SuhP-uoyvLLoMUTk2NEiAMOXeI" },
      erotic:     { genre: "Sensual R&B",     label: "Stage 6 \u00B7 Sensual R&B",     sub: "Intimate vibes \u00B7 hushed 65 BPM",                   url: "https://www.youtube.com/playlist?list=PLyORnIW1xT6z85aaukgLkTbzurHQ4HnC0" },
      taboo:      { genre: "Deep Soul",       label: "Stage 7 \u00B7 Deep Soul",       sub: "Classic R&B deep cuts \u00B7 slow burn 58 BPM",          url: "https://www.youtube.com/playlist?list=RDCLAK5uy_lGEZwG4gR8OEKC55Ofj-bLT0IDkr8b6BY" }
    }
  },
  pop: {
    id: "pop",
    name: "Pop / Indie",
    description: "Dance Pop \u2192 Dream Pop \u2192 Dark Ambient",
    dances: { dance1: "freestyle", dance2: "indie", dance_slow: "reverie", beat: "pop beat" },
    stages: {
      personal:   { genre: "Dance Pop",        label: "Stage 1 \u00B7 Dance Pop",        sub: "Party mix \u00B7 club & EDM pop \u00B7 130 BPM",         url: "https://www.youtube.com/playlist?list=PLwpFrtWg2EJFW2fzunujrznjqmdp8tbaf" },
      playful:    { genre: "Upbeat Pop",      label: "Stage 2 \u00B7 Upbeat Pop",       sub: "Happy upbeat pop 2026 \u00B7 120 BPM",              url: "https://www.youtube.com/playlist?list=PLvFYFNbi-IBF9Ei999OSo54l3pV7h2Yzg" },
      flirty:     { genre: "Indie Dance",     label: "Stage 3 \u00B7 Indie Dance",      sub: "Great indie pop \u00B7 danceable \u00B7 110 BPM",        url: "https://www.youtube.com/playlist?list=PLX6eT8uGQ5p7sOetuZ-FUzPDAXfogtytl" },
      suggestive: { genre: "Dream Pop",       label: "Stage 4 \u00B7 Dream Pop",       sub: "Indie dream pop \u00B7 shimmery 80 BPM",            url: "https://www.youtube.com/playlist?list=PLom-EE613JpNLHvaauNvrxmu4aUdri8WK" },
      intimate:   { genre: "Ambient Pop",     label: "Stage 5 \u00B7 Ambient Pop",     sub: "alexrainbird \u00B7 atmospheric 70 BPM",            url: "https://www.youtube.com/playlist?list=PLHRfWmB-cTz_lVMpdg-U9grUwAVUhHRIC" },
      erotic:     { genre: "Sensual Chill",   label: "Stage 6 \u00B7 Sensual Chill",   sub: "Intimate late night \u00B7 65 BPM",                 url: "https://www.youtube.com/playlist?list=PLyORnIW1xT6z85aaukgLkTbzurHQ4HnC0" },
      taboo:      { genre: "Dark Soul",       label: "Stage 7 \u00B7 Dark Soul",       sub: "Deep cuts \u00B7 slow burn 55 BPM",                 url: "https://www.youtube.com/playlist?list=RDCLAK5uy_lGEZwG4gR8OEKC55Ofj-bLT0IDkr8b6BY" }
    }
  },
  lofi: {
    id: "lofi",
    name: "Lo-fi / Chill",
    description: "Chill Beats \u2192 Jazz Hop \u2192 Dark Ambient",
    dances: { dance1: "freestyle", dance2: "lo-fi", dance_slow: "drift", beat: "chill beat" },
    stages: {
      personal:   { genre: "Lo-fi Hip Hop",    label: "Stage 1 \u00B7 Lo-fi Hip Hop",    sub: "Best lo-fi 2026 \u00B7 chill 100 BPM",              url: "https://www.youtube.com/playlist?list=PLyORnIW1xT6xL7lVBSCsEoI0NPlpcwzj2" },
      playful:    { genre: "Chill Beats",      label: "Stage 2 \u00B7 Chill Beats",      sub: "Chillhop \u00B7 mellow grooves \u00B7 90 BPM",           url: "https://www.youtube.com/playlist?list=PLOzDu-MXXLliO9fBNZOQTBDddoA3FzZUo" },
      flirty:     { genre: "Jazz Hop",         label: "Stage 3 \u00B7 Jazz Hop",         sub: "Lo-fi hip hop 2025 \u00B7 warm keys \u00B7 80 BPM",      url: "https://www.youtube.com/playlist?list=PLBTanuC8SLeZUH4mYXFvRbDfxTMKvNLHJ" },
      suggestive: { genre: "Late Night Lofi",  label: "Stage 4 \u00B7 Late Night Lofi",  sub: "Late night vibes \u00B7 75 BPM",                    url: "https://www.youtube.com/playlist?list=PLDEZ-kARItAQ7npc7zHfxZYeRLOBbshVf" },
      intimate:   { genre: "Lofi Loft",        label: "Stage 5 \u00B7 Lofi Loft",        sub: "Atmospheric downtempo \u00B7 65 BPM",               url: "https://www.youtube.com/playlist?list=RDCLAK5uy_kb7EBi6y3GrtJri4_ZH56Ms786DFEimbM" },
      erotic:     { genre: "Lofi Girl",        label: "Stage 6 \u00B7 Lofi Girl",        sub: "Deep chill compilations \u00B7 60 BPM",             url: "https://www.youtube.com/playlist?list=PL6NdkXsPL07KN01gH2vucrHCEyyNmVEx4" },
      taboo:      { genre: "Dark Ambient",     label: "Stage 7 \u00B7 Dark Ambient",     sub: "Sensual dark chill \u00B7 50 BPM",                  url: "https://www.youtube.com/playlist?list=PLyORnIW1xT6z85aaukgLkTbzurHQ4HnC0" }
    }
  }
};

// Active theme — set from the setup screen genre selector
var SELECTED_MUSIC_THEME = "latin";

// Helper: get the active playlist map (returns object keyed by chapter name)
function getActivePlaylistMap() {
  var theme = MUSIC_THEMES[SELECTED_MUSIC_THEME] || MUSIC_THEMES.latin;
  return theme.stages;
}

// Returns the dance vocabulary for the active theme (used by injectPromptText for {dance1} etc.)
function getActiveDances() {
  var theme = MUSIC_THEMES[SELECTED_MUSIC_THEME] || MUSIC_THEMES.latin;
  return theme.dances || MUSIC_THEMES.latin.dances;
}

// Legacy compatibility: MUSIC_PLAYLISTS is now a dynamic reference
var MUSIC_PLAYLISTS = getActivePlaylistMap();

var CUSTOM_PLAYLIST_URL = ""; // populated from setup overlay if the host provides one

function updateMusicBar(chapter) {
  var bar = document.getElementById("musicBar");
  var stageEl = document.getElementById("musicBarStage");
  var subEl = document.getElementById("musicBarSub");
  if (!bar || !stageEl || !subEl) return;
  var playlists = getActivePlaylistMap();
  var entry = playlists[chapter] || playlists.personal;
  if (CUSTOM_PLAYLIST_URL) {
    bar.href = CUSTOM_PLAYLIST_URL;
    stageEl.textContent = entry.label;
    subEl.textContent = "Your custom playlist \u00B7 tap to open";
  } else {
    bar.href = entry.url;
    stageEl.textContent = entry.label;
    subEl.textContent = entry.sub;
  }
}

const CHAPTER_CONFIG = {
  // Early stages: long and slow — players shouldn't realize they're being set up
  // Later stages: can be shorter since chains carry the action
  playful:    { order: ["setup", "interaction", "action", "build", "interaction", "group", "transition"], turnsToAdvance: 8,  chainChance: 0.14, spinnerChance: 0.06, dareBias: 0.15 },
  personal:   { order: ["setup", "interaction", "action", "build", "interaction", "peak", "transition"], turnsToAdvance: 7,  chainChance: 0.18, spinnerChance: 0.05, dareBias: 0.12 },
  flirty:     { order: ["setup", "interaction", "build", "action", "interaction", "peak", "transition"], turnsToAdvance: 8,  chainChance: 0.22, spinnerChance: 0.14, dareBias: 0.40 },
  suggestive: { order: ["setup", "interaction", "build", "action", "build", "peak", "transition"],       turnsToAdvance: 8,  chainChance: 0.32, spinnerChance: 0.20, dareBias: 0.55 },
  intimate:   { order: ["setup", "interaction", "build", "action", "build", "peak", "transition"],       turnsToAdvance: 9,  chainChance: 0.35, spinnerChance: 0.22, dareBias: 0.60 },
  erotic:     { order: ["setup", "build", "action", "build", "peak", "action", "transition"],            turnsToAdvance: 10, chainChance: 0.55, spinnerChance: 0.40, dareBias: 0.82 },
  taboo:      { order: ["setup", "build", "action", "peak", "action", "peak", "transition"],             turnsToAdvance: 12, chainChance: 0.85, spinnerChance: 0.45, dareBias: 0.92 }
};

// Couples mode: longer stages since only 2 players alternate (each turn = 1 player, so double the turns)
// personal: 16 turns = 8 rounds each, playful: 18 = 9 each, flirty: 16 = 8 each, etc.
const COUPLES_CHAPTER_CONFIG = {
  personal:   { turnsToAdvance: 10 },
  playful:    { turnsToAdvance: 12 },
  flirty:     { turnsToAdvance: 12 },
  suggestive: { turnsToAdvance: 12 },
  intimate:   { turnsToAdvance: 12 },
  erotic:     { turnsToAdvance: 12 },
  taboo:      { turnsToAdvance: 14 }
};

