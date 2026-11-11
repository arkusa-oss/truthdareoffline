// =========================
// LYRA'S STORY — story worlds, prop ritual, narrative memory, finale
// =========================
// A story world is a FRAMEWORK, not a script. The chapter engine keeps its
// structure (stages, chains, escalation ladder); the story layers on top:
//   - a prep ritual before player setup (props Lyra asks for, no-go limits)
//   - a narrative title + Lyra line at every chapter transition
//   - "beats": curated prompts that use the props, gated by prop availability,
//     the host's limits, and the escalation ladder (every beat has a chapter)
//   - mystery objects: each player may bring one; Lyra remembers who brought
//     what and brings objects back as recurring characters later in the night
//   - narrative memory (gameState.narrative): tonight only, wiped on reset —
//     separate from LyraMemory (who the players ARE, persisted across nights)
//   - a finale ("The Revelation") built from the narrative memory
//
// Loaded after orb-engine.js — wraps selectPrompt / recordFeedback / resetGame.
// Placeholders in beats: {actor} {target} (engine), {object} {objectOwner} (story).

var STORY_WORLDS = {
  banquet: {
    id: "banquet",
    name: "The Forbidden Banquet",
    tagline: "Temptation · Sensory discovery · Surrender",
    intro: "Before we begin, I need a few things. Fruit. Something sweet. Something sour. A scarf. Ice. A glass for each of you. And one object nobody here has ever seen before. Don't ask why. You'll discover their purpose when the time comes.",
    allReady: "Everything is in place. The table is set. Tonight, every taste will cost you a truth — and every truth will cost you more.",
    someMissing: "Gather what you can. Missing something? Don't worry. I have other ways to surprise you.",
    props: [
      { id: "fruit",   label: "Fresh fruit",             hint: "Grapes, strawberries or citrus — bite-sized", food: true },
      { id: "sweet",   label: "Something sweet",         hint: "Chocolate, honey or candy", food: true },
      { id: "sour",    label: "Something sour",          hint: "Lemon, lime or a pickle", food: true },
      { id: "scarf",   label: "A scarf or soft blindfold", hint: "Two is better than one", blindfold: true },
      { id: "ice",     label: "Ice cubes",               hint: "A small bowl, within reach" },
      { id: "glass",   label: "A glass for each player", hint: "Water counts. Alcohol is never required" },
      { id: "napkins", label: "Napkins",                 hint: "Things will get messy" }
    ],
    chapters: {
      personal:   { title: "The Invitation",   line: "Welcome to my table. Tonight I feed you nothing you don't earn. Tell me who you are — the rest follows." },
      playful:    { title: "The First Taste",  line: "Sweet, sour, cold. I'm learning what makes each of you flinch. Keep tasting." },
      flirty:     { title: "The Unmasking",    line: "The masks are slipping. I've noticed who you keep looking at. So has everyone else." },
      suggestive: { title: "The Temptation",   line: "The banquet is served. From here, you taste with more than your mouth." },
      intimate:   { title: "The Feast",        line: "No more plates. Tonight, skin is the table." },
      erotic:     { title: "The Offering",     line: "You have fed each other all night. Now offer yourselves." },
      taboo:      { title: "The Surrender",    line: "The last course. Blindfolded, bound, and hungry. Let someone else decide what you taste." }
    },
    finale: { title: "The Revelation", sub: "What the banquet revealed." }
  }
};

// Beats: curated story prompts. `prop` gates on prop readiness; `limits`
// lists host limits that disable the beat (food / blindfold / alcohol).
// `object: true` beats need at least one mystery object on the table.
// Intensity + chapter obey the escalation ladder in CLAUDE.md.
var STORY_BEATS = [
  // ─── PERSONAL (1): no physical contact. Humor + profiling. ───
  { id: "BQ_P01", story: "banquet", chapter: "personal", prop: "sour", limits: ["food"], role: "interaction", type: "directed", promptType: "dare", intensity: 2,
    text: "{actor}, take a bite of the sour thing on the table and keep a perfectly straight face while you describe {target} in three words. Any flinch and the group picks your next drink." },
  { id: "BQ_P02", story: "banquet", chapter: "personal", prop: "fruit", limits: ["food"], role: "build", type: "directed", promptType: "truth", intensity: 2.5,
    text: "{actor}, pick the piece of fruit that best describes {target}'s personality. Hold it up and explain. {target} decides if you were right." },
  { id: "BQ_P03", story: "banquet", chapter: "personal", prop: "glass", role: "setup", type: "group", promptType: "truth", intensity: 2,
    text: "Everyone raise your glass. {actor} proposes a toast to the person in this room they understand the least. Say the name. Say why." },
  { id: "BQ_P04", story: "banquet", chapter: "personal", object: true, role: "interaction", type: "self", promptType: "truth", intensity: 2.5,
    text: "{actor}, hold up the {object} you brought. In one sentence, tell the table why you chose it — then one sentence you've never said out loud about yourself. Lyra will remember both." },
  { id: "BQ_P05", story: "banquet", chapter: "personal", prop: "sweet", limits: ["food"], role: "peak", type: "group", promptType: "truth", intensity: 3,
    text: "The sweet thing goes to whoever confesses the most embarrassing thing they did for someone they had a crush on. Everyone confesses. {actor} judges and hands it over." },

  // ─── PLAYFUL (2): brief light touch, hug, whisper. ───
  { id: "BQ_L01", story: "banquet", chapter: "playful", prop: "fruit", limits: ["food"], role: "interaction", type: "directed", promptType: "dare", intensity: 3,
    text: "{target}, close your eyes. {actor} places one piece of fruit in your hand. Guess what it is by touch alone — no peeking. Wrong guess and you eat it while {actor} watches." },
  { id: "BQ_L02", story: "banquet", chapter: "playful", prop: "sweet", limits: ["food"], role: "build", type: "directed", promptType: "dare", intensity: 3,
    text: "{actor}, put something sweet in your mouth and, without swallowing, say the nicest thing you've ever thought about {target}. If anyone laughs, you both drink." },
  { id: "BQ_L03", story: "banquet", chapter: "playful", prop: "ice", role: "action", type: "directed", promptType: "dare", intensity: 3,
    text: "{actor}, hold an ice cube in your bare hand and keep it there while you tell {target} your honest first impression of them. Drop it before you finish and you owe {target} a compliment per second you lasted." },
  { id: "BQ_L04", story: "banquet", chapter: "playful", prop: "sour", limits: ["food"], role: "interaction", type: "group", promptType: "dare", intensity: 3,
    text: "Sour roulette. Everyone takes a bite of the sour thing at the same time. Last person to make a face wins — and gets to ask {actor} any question they want. No passing." },
  { id: "BQ_L05", story: "banquet", chapter: "playful", object: true, role: "build", type: "directed", promptType: "truth", intensity: 3,
    text: "{actor}, pick up {objectOwner}'s {object}. Invent its secret history in thirty seconds — who it belonged to, what it witnessed. {objectOwner} tells you how close you got." },

  // ─── FLIRTY (3): sustained non-intimate touch, kiss on hand/cheek. No lips. ───
  { id: "BQ_F01", story: "banquet", chapter: "flirty", prop: "fruit", limits: ["food"], role: "action", type: "directed", promptType: "dare", intensity: 4.5,
    text: "{actor}, feed {target} one grape or berry — slowly, with your fingers. Hold eye contact the entire time. {target}, you don't get to look away either." },
  { id: "BQ_F02", story: "banquet", chapter: "flirty", prop: "scarf", limits: ["blindfold"], role: "build", type: "directed", promptType: "dare", intensity: 4.5,
    text: "{actor}, blindfold {target} with the scarf. Guide their hand to three things on the table. They name each one by touch. Every wrong answer, {target} owes you a whispered secret." },
  { id: "BQ_F03", story: "banquet", chapter: "flirty", prop: "ice", role: "action", type: "directed", promptType: "dare", intensity: 5,
    text: "{actor}, trace an ice cube slowly from {target}'s wrist to the inside of their elbow. {target}, describe what it feels like — out loud, honestly." },
  { id: "BQ_F04", story: "banquet", chapter: "flirty", prop: "sweet", limits: ["food"], role: "interaction", type: "directed", promptType: "dare", intensity: 4.5,
    text: "{actor}, dab something sweet on the back of {target}'s hand. Then kiss it off. Take your time — Lyra is counting." },
  { id: "BQ_F05", story: "banquet", chapter: "flirty", object: true, role: "build", type: "directed", promptType: "dare", intensity: 4.5,
    text: "Lyra hasn't forgotten {objectOwner}'s {object}. {actor}, hand it to {target} and tell them what you'd trade for it — the honest answer, not the polite one. Then hold their hand for ten seconds to seal the deal." },
  { id: "BQ_F06", story: "banquet", chapter: "flirty", prop: "glass", role: "peak", type: "directed", promptType: "dare", intensity: 5,
    text: "{actor}, link arms with {target} and drink from each other's glass, eyes locked. Whoever breaks eye contact first answers one question from the other — any question." },

  // ─── SUGGESTIVE (4): sensual but clothed. Neck/collarbone kiss, brief closed-lip kiss ceiling. ───
  { id: "BQ_S01", story: "banquet", chapter: "suggestive", prop: "scarf", limits: ["blindfold", "food"], role: "action", type: "directed", promptType: "dare", intensity: 6,
    text: "{actor}, blindfold {target}. Feed them three things — something sweet, something sour, a piece of fruit — in any order. {target} names each one. Every miss, {actor} chooses a forfeit for the next stage. Lyra will hold you to it." },
  { id: "BQ_S02", story: "banquet", chapter: "suggestive", prop: "sweet", limits: ["food"], role: "peak", type: "directed", promptType: "dare", intensity: 6.5,
    text: "{actor}, hold a piece of chocolate (or anything sweet) between your lips. {target}, take it. No hands." },
  { id: "BQ_S03", story: "banquet", chapter: "suggestive", prop: "ice", role: "action", type: "directed", promptType: "dare", intensity: 6,
    text: "{actor}, run an ice cube slowly along {target}'s collarbone, then follow the same path with your fingertips. {target}, no flinching. Lyra is watching for the shiver." },
  { id: "BQ_S04", story: "banquet", chapter: "suggestive", prop: "fruit", limits: ["food"], role: "build", type: "directed", promptType: "dare", intensity: 6,
    text: "{actor}, sit {target} on your lap. Feed them fruit, one piece at a time, and whisper something you've noticed about them between bites. Three pieces. Three whispers." },
  { id: "BQ_S05", story: "banquet", chapter: "suggestive", object: true, role: "build", type: "directed", promptType: "dare", intensity: 6,
    text: "The {object} returns. {actor}, use {objectOwner}'s {object} to touch {target} somewhere — over their clothes. {objectOwner} decides where. {target} says nothing until it's over." },
  { id: "BQ_S06", story: "banquet", chapter: "suggestive", prop: "glass", role: "interaction", type: "directed", promptType: "dare", intensity: 6,
    text: "{actor}, take a sip and, without swallowing, kiss {target} on the neck. Then swallow. {target}, rate the temperature out loud." },

  // ─── INTIMATE (5): French kissing, partial undressing, body kisses, skin contact. ───
  { id: "BQ_I01", story: "banquet", chapter: "intimate", prop: "scarf", limits: ["blindfold"], role: "action", type: "directed", promptType: "dare", intensity: 7.5,
    text: "{actor}, blindfold {target}. Trace an ice cube from their neck down to their collarbone, then follow it with your lips. {target}, tell the room when you can't tell the ice from the mouth anymore." },
  { id: "BQ_I02", story: "banquet", chapter: "intimate", prop: "fruit", limits: ["food"], role: "peak", type: "directed", promptType: "dare", intensity: 7.5,
    text: "{target}, bare one shoulder. {actor}, place a piece of fruit on it and eat it without using your hands. Slowly. Then kiss the spot it was resting on." },
  { id: "BQ_I03", story: "banquet", chapter: "intimate", prop: "sweet", limits: ["food"], role: "action", type: "directed", promptType: "dare", intensity: 7.5,
    text: "{actor}, trace something sweet along {target}'s neck. Then kiss it off — all of it. {target}, keep your hands exactly where they are." },
  { id: "BQ_I04", story: "banquet", chapter: "intimate", prop: "ice", role: "build", type: "directed", promptType: "dare", intensity: 7,
    text: "{actor}, hold an ice cube in your mouth and kiss {target} — a real kiss — until it's gone. {target}, you may not pull away first." },
  { id: "BQ_I05", story: "banquet", chapter: "intimate", object: true, role: "build", type: "directed", promptType: "dare", intensity: 7,
    text: "{actor}, remember {objectOwner}'s {object}? Tonight it's a key. Whisper to {target} what it unlocks about you — something you'd never say with the lights on. Then kiss them like you meant it." },

  // ─── EROTIC (6): full undressing, body contact, explicit. ───
  { id: "BQ_E01", story: "banquet", chapter: "erotic", prop: "fruit", limits: ["food"], role: "peak", type: "directed", promptType: "dare", intensity: 8.5,
    text: "{target}, lie back, top off. {actor}, build a trail of fruit from their collarbone to their navel and eat your way down. No hands. No hurry." },
  { id: "BQ_E02", story: "banquet", chapter: "erotic", prop: "scarf", limits: ["blindfold"], role: "action", type: "directed", promptType: "dare", intensity: 8.5,
    text: "{actor}, blindfold {target} and undress one layer from them — without saying what. {target} has to guess what you took by touch. Wrong guess, you take another." },
  { id: "BQ_E03", story: "banquet", chapter: "erotic", prop: "ice", role: "action", type: "directed", promptType: "dare", intensity: 8.5,
    text: "{actor}, ice in one hand, your mouth right behind it. Start at {target}'s neck and go wherever the shiver leads. {target}, bare whatever you want touched." },
  { id: "BQ_E04", story: "banquet", chapter: "erotic", prop: "sweet", limits: ["food"], role: "build", type: "directed", promptType: "dare", intensity: 8,
    text: "{actor}, drizzle something sweet somewhere on {target}'s bare skin — their choice of where. Clean it off with your tongue. Don't rush the last part." },
  { id: "BQ_E05", story: "banquet", chapter: "erotic", object: true, role: "peak", type: "directed", promptType: "dare", intensity: 8,
    text: "{actor}, take {objectOwner}'s {object}. Use it to point to the exact spot on {target}'s body you've been thinking about all night. Then put the object down and use your mouth instead." },

  // ─── TABOO (7): control / edge tier. ───
  { id: "BQ_T01", story: "banquet", chapter: "taboo", prop: "scarf", limits: ["blindfold"], role: "action", type: "directed", promptType: "dare", intensity: 9,
    text: "{actor}, blindfold {target} with one scarf and tie their wrists loosely with the second. For the next two minutes you decide what they taste, where they're touched, and when it stops. {target}, your only word is the safeword." },
  { id: "BQ_T02", story: "banquet", chapter: "taboo", prop: "ice", role: "peak", type: "directed", promptType: "dare", intensity: 9.5,
    text: "{target}, lie still. {actor}, ice and mouth, alternating, anywhere you choose. Every time {target} moves, you start over from the top. Lyra decides when it's over — not you." },
  { id: "BQ_T03", story: "banquet", chapter: "taboo", prop: "sweet", limits: ["food"], role: "action", type: "directed", promptType: "dare", intensity: 9,
    text: "{actor}, mark a path on {target}'s body with something sweet — from their neck to the lowest place they'll allow. Then follow it with your mouth. Stop one inch before the end. Make them ask." },
  { id: "BQ_T04", story: "banquet", chapter: "taboo", object: true, role: "peak", type: "directed", promptType: "dare", intensity: 9,
    text: "{objectOwner}'s {object} has one last purpose. {actor}, hand it to {target}: whoever holds it gives the orders for the next three minutes. {target}, be specific. {actor}, obey." }
];

// Object beat templates for players who brought something; English fallbacks
// used when the mystery-object input is left empty are handled by skipping.

var OrbStory = (function() {
  "use strict";

  var storyOverlayEl = null;
  var BEAT_MIN_GAP = 3;       // turns between story beats
  var BEAT_CHANCE = 0.45;     // chance a beat fires when one is available
  var MAX_MOMENTS = 60;

  // ---------- narrative memory ----------

  function emptyNarrative() {
    return {
      storyId: null,
      props: {},          // propId -> true (ready) / false (missing)
      limits: {},         // { food: true, blindfold: true, alcohol: true }
      objects: [],        // [{ owner, name, usedIn: [turn, ...] }]
      beatsFired: {},     // beatId -> turn
      lastBeatTurn: -99,
      chapterReached: "personal",
      moments: []         // [{ turn, chapter, kind, actor, target, text }]
    };
  }

  function narrative() {
    if (typeof gameState === "undefined") return emptyNarrative();
    if (!gameState.narrative) gameState.narrative = emptyNarrative();
    return gameState.narrative;
  }

  function activeStory() {
    var n = narrative();
    return n.storyId ? STORY_WORLDS[n.storyId] || null : null;
  }

  function isActive() { return !!activeStory(); }

  function selectStory(id) {
    var n = narrative();
    n.storyId = (id && STORY_WORLDS[id]) ? id : null;
    n.props = {};
    if (n.storyId) {
      STORY_WORLDS[id].props.forEach(function(p) { n.props[p.id] = true; });
    }
  }

  function setProp(propId, ready) { narrative().props[propId] = !!ready; }
  function setLimit(limitId, on) { narrative().limits[limitId] = !!on; }

  function propReady(propId) {
    var n = narrative();
    return n.props[propId] !== false;
  }

  function readyCount() {
    var story = activeStory();
    if (!story) return { ready: 0, total: 0 };
    var ready = 0;
    story.props.forEach(function(p) { if (propReady(p.id)) ready++; });
    return { ready: ready, total: story.props.length };
  }

  // Called from resetGame (every new night). Keeps the story choice + props +
  // limits (set on the prep screen moments earlier), wipes everything tonight.
  function beginNight() {
    var old = narrative();
    var fresh = emptyNarrative();
    fresh.storyId = old.storyId;
    fresh.props = old.props || {};
    fresh.limits = old.limits || {};
    gameState.narrative = fresh;
    // Mystery objects come from the setup screen (player.object)
    (gameState.players || []).forEach(function(p) {
      var name = (p.object || "").trim();
      if (name) fresh.objects.push({ owner: p.name, name: name, usedIn: [] });
    });
  }

  function recordMoment(kind, actor, target, text) {
    var n = narrative();
    n.moments.push({
      turn: gameState.turnCount || 0,
      chapter: (typeof getCurrentChapter === "function") ? getCurrentChapter() : "personal",
      kind: kind, actor: actor || null, target: target || null, text: text || ""
    });
    if (n.moments.length > MAX_MOMENTS) n.moments.shift();
  }

  // ---------- beat selection ----------

  function beatAllowed(beat, actorName) {
    var n = narrative();
    if (beat.story !== n.storyId) return false;
    if (n.beatsFired[beat.id] != null) return false;
    if (beat.prop && !propReady(beat.prop)) return false;
    if (beat.limits) {
      for (var i = 0; i < beat.limits.length; i++) {
        if (n.limits[beat.limits[i]]) return false;
      }
    }
    if (beat.object && !n.objects.length) return false;
    if (beat.type === "group" && (typeof isCouplesMode === "function") && isCouplesMode()) return false;
    if (typeof promptMatchesGender === "function" && !promptMatchesGender(beat, actorName)) return false;
    if (typeof clothingContradiction === "function" && clothingContradiction(beat, actorName)) return false;
    return true;
  }

  // Pick the object with the fewest uses; prefer one NOT owned by the actor
  // (someone else's object is more interesting to handle) unless the beat is
  // a self-truth about your own object (type "self").
  function pickObject(beat, actorName) {
    var n = narrative();
    if (!n.objects.length) return null;
    var pool = n.objects.slice();
    if (beat.type === "self") {
      pool = pool.filter(function(o) { return o.owner === actorName; });
      if (!pool.length) return null;
    } else {
      var others = pool.filter(function(o) { return o.owner !== actorName; });
      if (others.length) pool = others;
    }
    pool.sort(function(a, b) { return a.usedIn.length - b.usedIn.length; });
    var least = pool[0].usedIn.length;
    var tied = pool.filter(function(o) { return o.usedIn.length === least; });
    return tied[Math.floor(Math.random() * tied.length)];
  }

  function possessive(name) {
    var cap = (typeof capitalize === "function") ? capitalize(name) : name;
    return /s$/i.test(cap) ? cap + "'" : cap + "'s";
  }

  // Build a renderable copy: language resolved here (story placeholders must
  // be filled before the engine renders), so getPromptText must not re-resolve.
  function materialize(beat, actorName, obj) {
    var text = (typeof getPromptText === "function") ? getPromptText(beat) : beat.text;
    if (obj) {
      text = text.replace(/\{objectOwner\}'s\b/g, possessive(obj.owner));
      text = text.replace(/\{objectOwner\}/g, (typeof capitalize === "function") ? capitalize(obj.owner) : obj.owner);
      text = text.replace(/\{object\}/g, obj.name);
    }
    var copy = {};
    Object.keys(beat).forEach(function(k) { copy[k] = beat[k]; });
    copy.text = text;
    copy._textResolved = true;
    copy._storyBeat = true;
    copy._object = obj ? obj.name : null;
    copy.target = beat.type === "directed" ? "other" : (beat.type === "group" ? "group" : "self");
    return copy;
  }

  function maybePickBeat(actorName) {
    var n = narrative();
    if (!n.storyId) return null;
    if (gameState.turnCount - n.lastBeatTurn < BEAT_MIN_GAP) return null;
    var chapter = getCurrentChapter();
    var candidates = STORY_BEATS.filter(function(b) {
      return b.chapter === chapter && beatAllowed(b, actorName);
    });
    if (!candidates.length) return null;
    // Object beats get priority late in a chapter so every object pays off
    var objectBeats = candidates.filter(function(b) { return b.object; });
    var unusedObjects = n.objects.some(function(o) { return !o.usedIn.length; });
    var pool = (objectBeats.length && unusedObjects && Math.random() < 0.6) ? objectBeats : candidates;
    if (Math.random() > BEAT_CHANCE) return null;

    var beat = pool[Math.floor(Math.random() * pool.length)];
    var obj = null;
    if (beat.object) {
      obj = pickObject(beat, actorName);
      if (!obj) return null;
    }
    var prompt = materialize(beat, actorName, obj);
    var target = null;
    if (beat.type === "directed") {
      target = chooseTarget(actorName, prompt);
      if (!target) return null;
      // Object beats read best when the owner is a third voice: avoid
      // target === owner when another target exists.
      if (obj && target === obj.owner) {
        var others = getOtherPlayerNames(actorName).filter(function(nm) { return nm !== obj.owner; });
        if (others.length) target = others[Math.floor(Math.random() * others.length)];
      }
    }
    n.beatsFired[beat.id] = gameState.turnCount;
    n.lastBeatTurn = gameState.turnCount;
    if (obj) obj.usedIn.push(gameState.turnCount);
    return { prompt: prompt, actor: actorName, target: target };
  }

  // ---------- chapter toasts ----------

  function chapterToast(chapter) {
    var story = activeStory();
    if (!story || !story.chapters[chapter]) return null;
    var ch = story.chapters[chapter];
    var key = "story." + story.id + "." + chapter;
    return {
      title: T(key + ".title", ch.title),
      message: T(key + ".line", ch.line)
    };
  }

  // ---------- prep ritual screen ----------

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function(c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderPrep() {
    storyOverlayEl = document.getElementById("storyOverlay");
    if (!storyOverlayEl) return;
    var card = storyOverlayEl.querySelector(".story-card");
    if (!card) return;
    card.innerHTML = "";
    var n = narrative();
    if (!n.storyId) selectStory("banquet");
    var story = activeStory();

    card.appendChild(el("div", "rules-kicker", esc(T("story.kicker", "Tonight's story"))));

    // Story choice: flagship vs classic night
    var choice = el("div", "story-choice");
    var worldBtn = el("button", "story-world-btn" + (n.storyId ? " active" : ""),
      '<span class="story-world-name">' + esc(T("story.banquet.name", story.name)) + '</span>' +
      '<span class="story-world-tag">' + esc(T("story.banquet.tagline", story.tagline)) + '</span>');
    worldBtn.type = "button";
    var classicBtn = el("button", "story-world-btn" + (n.storyId ? "" : " active"),
      '<span class="story-world-name">' + esc(T("story.classic.name", "Classic Night")) + '</span>' +
      '<span class="story-world-tag">' + esc(T("story.classic.tagline", "Pure Truth or Dare · no props, no story")) + '</span>');
    classicBtn.type = "button";
    choice.appendChild(worldBtn);
    choice.appendChild(classicBtn);
    card.appendChild(choice);

    var body = el("div", "story-body");
    card.appendChild(body);

    function paintBody() {
      body.innerHTML = "";
      var n2 = narrative();
      if (!n2.storyId) {
        body.appendChild(el("p", "rules-intro story-intro", esc(T("story.classic.intro", "No ritual tonight. Lyra plays it straight — seven stages, nothing to prepare. You can still bring a mystery object; she may find a use for it."))));
        return;
      }
      var st = activeStory();
      body.appendChild(el("p", "rules-intro story-intro", "“" + esc(T("story.banquet.intro", st.intro)) + "”"));

      var listTitle = el("div", "intro-section-title story-list-title");
      body.appendChild(listTitle);
      var list = el("div", "story-prop-list");
      body.appendChild(list);

      function paintCount() {
        var c = readyCount();
        listTitle.textContent = T("story.prep_title", "Lyra's preparation list") + " · " + c.ready + "/" + c.total + " " + T("story.ready", "ready");
      }

      st.props.forEach(function(p) {
        var row = el("div", "story-prop" + (propReady(p.id) ? " is-ready" : " is-missing"));
        var btn = el("button", "story-prop-toggle", "");
        btn.type = "button";
        function paintBtn() {
          var ready = propReady(p.id);
          btn.textContent = ready ? T("story.have", "Ready") : T("story.missing", "Missing");
          row.className = "story-prop" + (ready ? " is-ready" : " is-missing");
        }
        btn.addEventListener("click", function() {
          setProp(p.id, !propReady(p.id));
          paintBtn(); paintCount(); paintResponse();
        });
        var pkey = "story.banquet.prop." + p.id;
        row.appendChild(el("div", "story-prop-meta",
          '<div class="story-prop-label">' + esc(T(pkey + ".label", p.label)) + '</div>' +
          '<div class="story-prop-hint">' + esc(T(pkey + ".hint", p.hint)) + '</div>'));
        row.appendChild(btn);
        paintBtn();
        list.appendChild(row);
      });
      paintCount();

      // Host limits — game data, respected by beat selection
      body.appendChild(el("div", "intro-section-title story-list-title", esc(T("story.limits_title", "Before the first course"))));
      var limits = el("div", "story-limits");
      [
        { id: "food", label: T("story.limit_food", "No food challenges tonight (allergies, preference)") },
        { id: "blindfold", label: T("story.limit_blindfold", "No blindfolds or tying tonight") },
        { id: "alcohol", label: T("story.limit_alcohol", "No alcohol — every toast is a sip of whatever's in the glass") }
      ].forEach(function(l) {
        var lab = el("label", "checkbox-label story-limit");
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = !!narrative().limits[l.id];
        cb.addEventListener("change", function() { setLimit(l.id, cb.checked); paintResponse(); });
        lab.appendChild(cb);
        lab.appendChild(el("span", "", esc(l.label)));
        limits.appendChild(lab);
      });
      body.appendChild(limits);

      var resp = el("div", "story-response");
      body.appendChild(resp);
      function paintResponse() {
        var c = readyCount();
        var txt = (c.ready === c.total)
          ? T("story.banquet.all_ready", st.allReady)
          : T("story.banquet.some_missing", st.someMissing);
        resp.innerHTML = '<div class="story-response-kicker">' + esc(T("story.response_kicker", "Lyra's response")) + '</div><div class="story-response-text">“' + esc(txt) + '”</div>';
      }
      paintResponse();
    }

    worldBtn.addEventListener("click", function() {
      selectStory("banquet");
      worldBtn.classList.add("active"); classicBtn.classList.remove("active");
      paintBody();
    });
    classicBtn.addEventListener("click", function() {
      selectStory(null);
      classicBtn.classList.add("active"); worldBtn.classList.remove("active");
      paintBody();
    });
    paintBody();

    var footer = el("div", "story-footer");
    var cont = el("button", "rules-enter-btn", esc(T("story.continue", "The table is set")));
    cont.type = "button";
    cont.addEventListener("click", function() {
      closePrep();
      if (typeof openSetupOverlay === "function") openSetupOverlay();
    });
    footer.appendChild(cont);
    card.appendChild(footer);
  }

  function openPrep() {
    renderPrep();
    if (storyOverlayEl) storyOverlayEl.classList.remove("is-hidden");
    if (typeof rulesOverlayEl !== "undefined" && rulesOverlayEl) rulesOverlayEl.classList.add("is-hidden");
  }

  function closePrep() {
    if (storyOverlayEl) storyOverlayEl.classList.add("is-hidden");
  }

  // ---------- finale: The Revelation ----------

  // `snap` = { narrative, pairAffinity } captured BEFORE resetGame wipes the night
  function buildFinaleLines(snap) {
    var n = snap.narrative;
    var story = n.storyId ? STORY_WORLDS[n.storyId] : null;
    var lines = [];
    if (!story) return lines;
    var chapterKey = "story." + story.id + "." + n.chapterReached + ".title";
    var chapterTitle = T(chapterKey, (story.chapters[n.chapterReached] || {}).title || n.chapterReached);
    lines.push(T("finale.reached", "Tonight you reached {chapter}.", { chapter: chapterTitle }));

    // Objects: paid off or kept their secret
    n.objects.forEach(function(o) {
      if (o.usedIn.length) {
        lines.push(T("finale.object_used", "{owner}'s {object} appeared {n} time(s). It was never just an object.", { owner: capitalize(o.owner), object: o.name, n: o.usedIn.length }));
      } else {
        lines.push(T("finale.object_unused", "{owner}'s {object} kept its secret. Bring it back.", { owner: capitalize(o.owner), object: o.name }));
      }
    });

    // The pair Lyra couldn't stop watching
    var best = null, bestV = 0;
    var aff = snap.pairAffinity || {};
    Object.keys(aff).forEach(function(k) {
      if (aff[k] > bestV) { bestV = aff[k]; best = k; }
    });
    if (best && bestV >= 3) {
      var names = best.split("|").map(capitalize);
      lines.push(T("finale.pair", "The pair Lyra couldn't stop watching: {a} and {b}.", { a: names[0], b: names[1] }));
    }

    // Bravest moment and the line someone wouldn't cross
    var braves = n.moments.filter(function(m) { return m.kind === "brave"; });
    if (braves.length) {
      braves.sort(function(a, b) { return b.turn - a.turn; });
      var top = braves[0];
      lines.push(T("finale.brave", "Bravest moment: {actor}, in {chapter}.", { actor: capitalize(top.actor || "someone"), chapter: T("story." + story.id + "." + top.chapter + ".title", (story.chapters[top.chapter] || {}).title || top.chapter) }));
    }
    var lines_ = n.moments.filter(function(m) { return m.kind === "line"; });
    if (lines_.length) {
      var last = lines_[lines_.length - 1];
      lines.push(T("finale.line", "The line {actor} wouldn't cross — Lyra noted it. Next time, she'll ask again.", { actor: capitalize(last.actor || "someone") }));
    }
    var fired = Object.keys(n.beatsFired).length;
    if (fired) lines.push(T("finale.beats", "{n} courses were served from the banquet.", { n: fired }));
    return lines;
  }

  function snapshotNight() {
    var aff = {};
    Object.keys(gameState.pairAffinity || {}).forEach(function(k) { aff[k] = gameState.pairAffinity[k]; });
    return { narrative: narrative(), pairAffinity: aff, turnCount: gameState.turnCount || 0 };
  }

  // Pass a snapshot taken before reset; with no argument, snapshots now.
  function showFinale(snap) {
    snap = snap || snapshotNight();
    var story = snap.narrative.storyId ? STORY_WORLDS[snap.narrative.storyId] : null;
    if (!story || !snap.turnCount) return;
    var lines = buildFinaleLines(snap);
    if (!lines.length) return;
    var existing = document.getElementById("lyraFinaleOverlay");
    if (existing) existing.remove();
    var overlay = el("div", "lyra-recap-overlay lyra-finale-overlay");
    overlay.id = "lyraFinaleOverlay";
    var html = '<div class="lyra-recap-card">';
    html += '<div class="lyra-recap-title">' + esc(T("story." + story.id + ".finale.title", story.finale.title)) + '</div>';
    html += '<div class="lyra-recap-sub">' + esc(T("story." + story.id + ".finale.sub", story.finale.sub)) + '</div>';
    lines.forEach(function(line) { html += '<div class="lyra-recap-line">' + esc(line) + '</div>'; });
    html += '<div class="lyra-recap-sub" style="margin-top:18px">' + esc(T("finale.wiped", "Tonight's story is over. Lyra keeps none of it — only what she learned about you, if you let her.")) + '</div>';
    html += '<div class="lyra-recap-actions"><button type="button" class="lyra-recap-btn" id="lyraFinaleCloseBtn">' + esc(T("finale.close", "Close")) + '</button></div>';
    html += '</div>';
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
    var closeBtn = overlay.querySelector("#lyraFinaleCloseBtn");
    if (closeBtn) closeBtn.addEventListener("click", function() { overlay.remove(); });
  }

  // ---------- engine hooks ----------

  if (typeof selectPrompt === "function") {
    var _selectPrompt = selectPrompt;
    selectPrompt = function(actorName) {
      try {
        // Chains, follow-throughs and bridges keep priority over story beats
        var busy = (gameState.followThroughQueue || gameState.postChainBridge ||
          (typeof getActiveChainIds === "function" && getActiveChainIds().length > 0));
        if (!busy && isActive()) {
          var beat = maybePickBeat(actorName);
          if (beat) return beat;
        }
      } catch (e) { console.warn("[OrbStory] beat selection failed", e); }
      return _selectPrompt.apply(this, arguments);
    };
  }

  if (typeof recordFeedback === "function") {
    var _recordFeedback = recordFeedback;
    recordFeedback = function(response) {
      try {
        if (isActive() && gameState.lastPrompt) {
          var p = gameState.lastPrompt;
          var actor = gameState.currentPlayer;
          var target = gameState.lastResolvedTarget;
          if ((response === "done" || response === "answered") && (p._storyBeat || (p.intensity || 0) >= 7)) {
            recordMoment("brave", actor, target, p.text);
          } else if ((response === "pass" || response === "refused") && (p.intensity || 0) >= 5) {
            recordMoment("line", actor, target, p.text);
          }
          narrative().chapterReached = getCurrentChapter();
        }
      } catch (e) {}
      return _recordFeedback.apply(this, arguments);
    };
  }

  if (typeof resetGame === "function") {
    var _resetGame = resetGame;
    resetGame = function() {
      // Snapshot before the engine wipes turnCount/pairAffinity/narrative
      var snap = (gameState.turnCount && isActive()) ? snapshotNight() : null;
      var rv = _resetGame.apply(this, arguments);
      // Finale sits on top of the recap (appended later = higher in stack)
      if (snap) { try { showFinale(snap); } catch (e) { console.warn("[OrbStory] finale failed", e); } }
      beginNight();
      return rv;
    };
  }

  return {
    worlds: STORY_WORLDS,
    beats: STORY_BEATS,
    isActive: isActive,
    activeStory: activeStory,
    selectStory: selectStory,
    setProp: setProp,
    setLimit: setLimit,
    propReady: propReady,
    beginNight: beginNight,
    narrative: narrative,
    maybePickBeat: maybePickBeat,
    chapterToast: chapterToast,
    openPrep: openPrep,
    closePrep: closePrep,
    showFinale: showFinale,
    recordMoment: recordMoment
  };
})();
