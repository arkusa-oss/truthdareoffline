// =========================
// LYRA'S VOICE — Pre-recorded Audio Playback
// =========================
// Plays Bella/Lyra voice clips from the voice/ folder.
// Each clip is named L01.mp3 through L52.mp3.
// Usage: LyraVoice.play("L24")  or  LyraVoice.speak("I see everything.")
// The speak() method matches text to clip IDs automatically.

var LyraVoice = (function() {
  "use strict";

  var enabled = true;
  var volume = 1.0;
  var currentAudio = null;
  var basePath = "./audiofiles/";

  // Voice clips are recorded per language. English lives in audiofiles/,
  // Spanish in audiofiles/es/ (same clip IDs: L01.mp3 …). Add more langs by
  // dropping audiofiles/<lang>/ and extending VOICE_LANGS.
  var VOICE_LANGS = { en: "./audiofiles/", es: "./audiofiles/es/" };
  function voiceBasePath() {
    var lang = (typeof GAME_LANG !== "undefined") ? GAME_LANG : "en";
    return VOICE_LANGS[lang] || basePath;
  }
  function voiceAvailable() {
    var lang = (typeof GAME_LANG !== "undefined") ? GAME_LANG : "en";
    return !!VOICE_LANGS[lang];
  }

  // =========================
  // TEXT → CLIP MAPPING
  // =========================
  // Maps exact spoken text to clip IDs. Used by speak() for automatic matching.

  var TEXT_TO_CLIP = {
    // 1. Game Opening (ESSENTIAL) — L01–L04
    "Raise your glasses.": "L01",
    "Before we begin... a toast.": "L02",
    "Before we begin, a toast.": "L02",
    "Tonight, you promise to be honest, to be brave, and to be good sports.": "L03",
    "Tonight you promise to be honest, to be brave, and to be good sports.": "L03",
    "Whatever happens... stays between us.": "L04",
    "Whatever happens, stays between us.": "L04",

    // 2. Stage Toasts (ESSENTIAL) — L05–L14
    "A toast... to chemistry.": "L05",
    "A toast to chemistry.": "L05",
    "Things are about to get interesting.": "L06",
    "To temptation.": "L07",
    "You've been brave so far. But I'm just getting started.": "L08",
    "To vulnerability.": "L09",
    "The masks are coming off.": "L10",
    "To desire.": "L11",
    "No more hiding. I see what you want.": "L12",
    "To surrender.": "L13",
    "If you come this far...": "L14",
    "If you come this far": "L14",
    "You've come this far. There's no turning back.": "L14",
    "You have come this far. There is no turning back.": "L14",

    // 3. Safeword Moment (ESSENTIAL) — L15–L17
    "One word... before we go further.": "L15",
    "One word, before we go further.": "L15",
    "Pick a safeword. Together. Right now.": "L16",
    "The bravest thing you can do tonight... is name your limit out loud.": "L17",
    "The bravest thing you can do tonight is name your limit out loud.": "L17",

    // 4. Roulette of Destiny (HIGH PRIORITY) — L18–L23
    "The orb is choosing.": "L18",
    "Who will it be?": "L19",
    "Fate has decided.": "L20",
    "You. Come closer.": "L21",
    "The orb has spoken.": "L22",
    "Don't look away.": "L23",

    // 5. Orb Whispers (HIGH PRIORITY) — L24–L35
    "I see everything.": "L24",
    "Someone is blushing.": "L25",
    "This changes things.": "L26",
    "Interesting.": "L27",
    "I knew you would.": "L28",
    "Get closer.": "L29",
    "Closer.": "L29",
    "The room just shifted.": "L30",
    "That was brave.": "L31",
    "I remember that.": "L32",
    "Give me more.": "L33",
    "More.": "L33",
    "You're not done yet.": "L34",
    "Look at each other.": "L35",

    // 6. Random Toasts (NICE TO HAVE) — L36–L41
    "I am pleased.": "L36",
    "Lyra is pleased.": "L36",
    "You're playing well. Raise your glasses.": "L37",
    "Look at each other. Really look.": "L38",
    "To this night and the memories you are making.": "L39",
    "To this night... and the memories you're making.": "L39",
    "To the brave ones.": "L40",
    "Not everyone would still be here.": "L41",

    // 7. Couples Mode (NICE TO HAVE) — L42–L48
    "Just the two of you, perfect.": "L42",
    "Just the two of you. Perfect.": "L42",
    "Tonight is yours.": "L43",
    "Show each other something new.": "L44",
    "You think you know each other. Let's find out.": "L45",
    "Closer. There's no one else watching.": "L46",
    "Take your time. The night is long.": "L47",
    "That was beautiful.": "L48",

    // 8. System (NICE TO HAVE) — L49–L52
    "I am Lyra.": "L49",
    "Are you ready?": "L50",
    "Let's begin.": "L51",
    "Until next time.": "L52",

    // 9. Sportsmanship reminder (callback — fires after 3+ consecutive passes/refusals)
    "Tonight you promised to be honest, to be brave, and to be good sports!": "L55",
    "Tonight you promised to be honest, to be brave and to be good sports!": "L55",

    // 10. Welcome splash (plays on the first tap of the cover)
    "Welcome, humans... prepare to be initiated.": "L56",
    "Welcome humans... prepare to be initiated!": "L56"
  };

  // Reverse map: clip ID → text (for preview/debug)
  var CLIP_TO_TEXT = {};
  Object.keys(TEXT_TO_CLIP).forEach(function(text) {
    CLIP_TO_TEXT[TEXT_TO_CLIP[text]] = text;
  });

  // Category groupings for random selection
  var WHISPER_CLIPS = ["L24", "L25", "L26", "L27", "L28", "L29", "L30", "L31", "L32", "L33", "L34", "L35"];
  var ROULETTE_CLIPS = ["L18", "L19", "L20", "L21", "L22", "L23"];
  var COUPLES_CLIPS = ["L42", "L43", "L44", "L45", "L46", "L47", "L48"];

  // Track which clips have been played to avoid repeats
  var recentlyPlayed = [];
  var MAX_RECENT = 8;

  // =========================
  // AUDIO PLAYBACK
  // =========================

  function play(clipId, callback) {
    if (!enabled) {
      if (callback) callback();
      return;
    }

    // Only play in languages we have recorded clips for (see VOICE_LANGS).
    // In an unsupported language, stay silent rather than clash with the
    // translated on-screen text.
    if (!voiceAvailable()) {
      if (callback) callback();
      return;
    }

    // Stop any currently playing clip
    stop();

    var src = voiceBasePath() + clipId + ".mp3";
    var audio = new Audio(src);
    audio.volume = volume;
    currentAudio = audio;

    audio.onended = function() {
      currentAudio = null;
      if (callback) callback();
    };

    audio.onerror = function(e) {
      console.warn("LyraVoice: failed to play " + clipId + " (" + src + ")", e);
      currentAudio = null;
      if (callback) callback();
    };

    // Small delay for dramatic timing
    setTimeout(function() {
      audio.play().catch(function(err) {
        console.warn("LyraVoice: playback blocked for " + clipId, err.message);
        currentAudio = null;
        if (callback) callback();
      });
    }, 300);

    // Track recently played to avoid repeats
    recentlyPlayed.push(clipId);
    if (recentlyPlayed.length > MAX_RECENT) recentlyPlayed.shift();

    console.log("LyraVoice: playing " + clipId + " — \"" + (CLIP_TO_TEXT[clipId] || "?") + "\"");
  }

  // Match text to a clip and play it
  function speak(text, callback) {
    if (!enabled || !text) {
      if (callback) callback();
      return;
    }

    // Direct match
    var clipId = TEXT_TO_CLIP[text];

    // Fuzzy match: try lowercase, trimmed, or partial
    if (!clipId) {
      var normalized = text.trim().replace(/[\u2018\u2019]/g, "'").replace(/[\u2014]/g, "--");
      clipId = TEXT_TO_CLIP[normalized];
    }

    // Partial match: check if the text starts with a known line
    if (!clipId) {
      var keys = Object.keys(TEXT_TO_CLIP);
      for (var i = 0; i < keys.length; i++) {
        if (text.indexOf(keys[i]) >= 0 || keys[i].indexOf(text) >= 0) {
          clipId = TEXT_TO_CLIP[keys[i]];
          break;
        }
      }
    }

    if (clipId) {
      play(clipId, callback);
    } else {
      console.log("LyraVoice: no clip found for \"" + text.substring(0, 40) + "...\"");
      if (callback) callback();
    }
  }

  // Pick a random clip from a category, avoiding recent repeats
  function playRandom(category, callback) {
    var pool;
    if (category === "whisper") pool = WHISPER_CLIPS;
    else if (category === "roulette") pool = ROULETTE_CLIPS;
    else if (category === "couples") pool = COUPLES_CLIPS;
    else { if (callback) callback(); return; }

    // Filter out recently played
    var available = pool.filter(function(id) { return recentlyPlayed.indexOf(id) < 0; });
    if (!available.length) available = pool; // reset if all played

    var pick = available[Math.floor(Math.random() * available.length)];
    play(pick, callback);
  }

  function stop() {
    if (currentAudio) {
      try { currentAudio.pause(); currentAudio.currentTime = 0; } catch (e) {}
      currentAudio = null;
    }
  }

  // =========================
  // VOLUME DUCK (lower music while Lyra speaks)
  // =========================

  function duckMusic() {
    if (typeof OrbMusic !== "undefined" && OrbMusic.isEnabled && OrbMusic.isEnabled() && !OrbMusic.isMuted()) {
      // Store original state and lower music volume
      try {
        if (typeof OrbMusic._player === "undefined") return;
      } catch (e) {}
    }
  }

  // =========================
  // PUBLIC API
  // =========================

  return {
    // Play a specific clip by ID
    play: play,

    // Match text to a clip and play it (drop-in replacement for old TTS speak)
    speak: speak,

    // Play a random clip from a category: "whisper", "roulette", "couples"
    playRandom: playRandom,

    // Stop current playback
    stop: stop,

    // Enable/disable
    setEnabled: function(on) { enabled = on; },
    isEnabled: function() { return enabled; },

    // Volume control (0.0 to 1.0)
    setVolume: function(v) { volume = Math.max(0, Math.min(1, v)); },
    getVolume: function() { return volume; },

    // Preview — plays the iconic "I see everything" line
    preview: function() {
      var wasEnabled = enabled;
      enabled = true;
      play("L24", function() { enabled = wasEnabled; });
    },

    // Get all clip IDs and their text (for debug/settings)
    getAllClips: function() { return CLIP_TO_TEXT; },
    getTextToClip: function() { return TEXT_TO_CLIP; },

    // Check if a specific clip file exists (async)
    checkClip: function(clipId, callback) {
      var audio = new Audio(voiceBasePath() + clipId + ".mp3");
      audio.oncanplaythrough = function() { callback(true); };
      audio.onerror = function() { callback(false); };
    }
  };
})();
