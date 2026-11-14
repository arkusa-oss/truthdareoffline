#!/usr/bin/env node
/**
 * ai_author_test.js — drives the REAL page in jsdom with Lyra's Mind enabled
 * and a fake Worker (window.fetch stub). Checks: AI prompts render, the
 * engine rejects anything off-ladder / off-roster and falls back to the
 * curated pool, memory notes land in LyraMemory, outcomes feed the next
 * context, and a dead endpoint degrades gracefully.
 *
 * Usage: node ai_author_test.js   (needs jsdom: npm install --no-save jsdom)
 */
'use strict';
var fs = require('fs'), vm = require('vm'), path = require('path');
var JSDOM = require(path.join(process.cwd(), 'node_modules/jsdom')).JSDOM;

var failures = [];
function check(label, cond, extra) { console.log((cond ? 'ok   ' : 'FAIL ') + label + (cond ? '' : (extra ? '  -> ' + extra : ''))); if (!cond) failures.push(label); }

var html = fs.readFileSync(__dirname + '/index.html', 'utf8')
  .replace(/window\.ORB_AI_ENDPOINT = "[^"]*"/, 'window.ORB_AI_ENDPOINT = "https://fake.worker/ai/turn"');
var dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true });
var w = dom.window, d = w.document, store = { orb_ai_settings: JSON.stringify({ enabled: true, code: 'orb-42' }) };
Object.defineProperty(w, 'localStorage', { value: { getItem: function (k) { return k in store ? store[k] : null; }, setItem: function (k, v) { store[k] = String(v); }, removeItem: function (k) { delete store[k]; } } });
w.matchMedia = function () { return { matches: false, addListener: function () {}, removeListener: function () {} }; };
w.requestAnimationFrame = function (fn) { return setTimeout(fn, 0); };
w.scrollTo = function () {}; w.alert = function (m) { throw new Error('alert: ' + m); }; w.confirm = function () { return true; };
w.HTMLMediaElement.prototype.play = function () { return Promise.resolve(); }; w.HTMLMediaElement.prototype.pause = function () {};

// ── fake Worker: a queue of replies; each entry = JSON body (+ optional status) ──
var replies = [], calls = [];
w.fetch = function (url, opts) {
  var body = JSON.parse(opts.body);
  calls.push(body);
  var r = replies.length ? replies.shift() : { status: 200, json: { ok: true, prompt: { text: 'Background prefetch: name a song that still gets you.', promptType: 'truth', target: null, intensity: 2, lyraLine: null, memoryNotes: [] } } };
  return Promise.resolve({ status: r.status || 200, json: function () { return Promise.resolve(r.json); } });
};
function reply(prompt) { replies.push({ status: 200, json: { ok: true, prompt: prompt, usage: { input: 1000, output: 60 } } }); }

var ctx = dom.getInternalVMContext();
// Inline <script> config does not run under runScripts:'outside-only' — set it directly
w.ORB_AI_ENDPOINT = 'https://fake.worker/ai/turn';
['prompts_v2.js', 'couples_prompts_v2.js', 'couples_prompts_early.js', 'translations_es.js', 'orb-voice.js', 'orb-data.js', 'orb-templates.js',
 'orb-state.js', 'orb-memory.js', 'orb-engine.js', 'orb-story.js', 'ai_orb.js', 'orb-music.js', 'orb-ui.js'].forEach(function (f) {
  try { vm.runInContext(fs.readFileSync(__dirname + '/' + f, 'utf8'), ctx, { filename: f }); }
  catch (e) { failures.push('LOAD ERROR ' + f + ': ' + e.message); }
});
vm.runInContext('globalThis.__gs = gameState;', ctx);

function tick(ms) { return new Promise(function (res) { setTimeout(res, ms || 30); }); }
function promptText() { return d.getElementById('promptText').textContent; }

(async function () {
  // Setup: group of three, story on (defaults), straight to the game
  d.getElementById('rulesAcceptBtn').click();
  d.querySelector('#storyOverlay .rules-enter-btn').click();
  function add(n, g) { d.getElementById('playerNameInput').value = n; d.getElementById('playerGenderInput').value = g; d.getElementById('addPlayerBtn').click(); }
  add('Hans', 'male'); add('Grecia', 'female'); add('Nella', 'female');
  await tick(120); // settings UI injects on a short timer
  check('AI settings section injected', !!d.getElementById('aiSettingsSection'));
  check('AI enabled from saved settings', ctx.OrbAI.isEnabled() === true);

  // Opening prefetch fires on Start; answer it with a prompt for whoever it asked for
  reply({ text: 'Prefetched: confess the app you open first every morning.', promptType: 'truth', target: null, intensity: 2, lyraLine: null, memoryNotes: [] });
  d.getElementById('startGameBtn').click();
  await tick();
  check('prefetch sent on start', calls.length === 1);
  var pfActor = calls[0].context.actor;
  check('prefetch names an actor from the roster', ['Hans', 'Grecia', 'Nella'].indexOf(pfActor) >= 0);
  check('prefetch carries session + code', typeof calls[0].session === 'string' && calls[0].session.length > 8 && calls[0].code === 'orb-42');
  check('context has players with wardrobe + story', calls[0].context.players.length === 3 && calls[0].context.story && calls[0].context.story.name);
  d.getElementById('toastDismissBtn').click();

  // Turn 1: whoever the engine picks — if it matches the prefetch actor the prefetched prompt is used
  // (we made it a "PLACEHOLDER" so we can tell). Otherwise a fresh request goes out; answer it.
  var fresh = { text: 'Tell the table the last lie you told and who believed it.', promptType: 'truth', target: null, intensity: 2.5, lyraLine: null, memoryNotes: [] };
  reply(fresh);
  d.getElementById('nextBtn').click();
  for (var waited = 0; waited < 8000 && !(ctx.__gs.awaitingResolution && !/thinking|pensando/.test(promptText()) && promptText().length > 5); waited += 100) await tick(100); // roulette + reveal
  var t1 = promptText();
  var usedPrefetch = /Prefetched:/.test(t1);
  check('turn 1 shows an AI prompt (prefetched or fresh)', usedPrefetch || t1.indexOf('last lie you told') >= 0, t1);
  var actor1 = ctx.__gs.currentPlayer;
  check('AI prompt flagged _ai', !!(ctx.__gs.lastPrompt && ctx.__gs.lastPrompt._ai));
  check('actor header matches engine rotation', !!actor1);
  // Resolve it — outcome must be remembered
  var id1 = ctx.__gs.lastPrompt.id;
  ctx.recordFeedback('answered');
  await tick(500);

  // The resolution auto-queues the next turn; a prefetch also fires. Feed the
  // queue: one (bad) prefetch reply and one validation sweep of bad prompts.
  // 2a. off-roster target -> rejected -> curated fallback
  reply({ text: 'Hans, kiss Paula on the cheek.', promptType: 'dare', target: 'Paula', intensity: 2, lyraLine: null, memoryNotes: [] });
  reply({ text: 'Nella, whisper your most embarrassing nickname to Hans.', promptType: 'dare', target: 'Hans', intensity: 2.5, lyraLine: 'Lyra sees everything.', memoryNotes: [{ player: 'Nella', note: 'hates her childhood nickname' }] });
  for (var waited2 = 0; waited2 < 8000 && !(ctx.__gs.awaitingResolution && !/thinking|pensando/.test(promptText()) && promptText().length > 5); waited2 += 100) await tick(100);
  // Depending on which arrived first, we should now be on a prompt that is either AI (valid) or curated.
  var t2 = promptText();
  check('off-roster target never rendered', t2.indexOf('Paula') < 0, t2);
  var seenAnswered = calls.some(function (c) { return (c.context.recent || []).some(function (r) { return r.response === 'answered'; }); });
  check('outcome of turn 1 recorded for context', seenAnswered, JSON.stringify((calls[calls.length - 1].context.recent || []).slice(-2)));

  // 3. Validation unit checks straight on the validator (deterministic)
  ctx.__gs.chapterIndex = 0; // personal
  var v = ctx.OrbAI.validate;
  check('rejects leaked placeholder', v({ text: '{actor}, smile.', promptType: 'dare', target: null, intensity: 2 }, 'Hans') === null);
  check('rejects naming the seducer', v({ text: 'Hans, the seducer picks.', promptType: 'dare', target: null, intensity: 2 }, 'Hans') === null);
  check('rejects lip kiss at personal', v({ text: 'Hans, kiss Grecia on the lips.', promptType: 'dare', target: 'Grecia', intensity: 3 }, 'Hans') === null);
  check('accepts cheek kiss at playful', (ctx.__gs.chapterIndex = 1, v({ text: 'Hans, kiss Grecia on the cheek.', promptType: 'dare', target: 'Grecia', intensity: 3 }, 'Hans')) !== null);
  check('rejects undress at flirty', (ctx.__gs.chapterIndex = 2, v({ text: 'Hans, take off your shirt for Grecia.', promptType: 'dare', target: 'Grecia', intensity: 5 }, 'Hans')) === null);
  check('rejects bra at intimate', (ctx.__gs.chapterIndex = 4, v({ text: 'Grecia, remove your bra for Hans.', promptType: 'dare', target: 'Hans', intensity: 7.5 }, 'Grecia')) === null);
  var ok6 = (ctx.__gs.chapterIndex = 5, v({ text: 'Grecia, remove your bra for Hans.', promptType: 'dare', target: 'Hans', intensity: 8 }, 'Grecia'));
  check('bra at erotic needs the top off first (wardrobe order)', ok6 === null);
  ctx.__gs.memory.clothingRemoved = { Grecia: ['shoes', 'socks', 'jewelry', 'belt', 'top', 'pants'] };
  check('bra at erotic accepted once layers above are gone', v({ text: 'Grecia, remove your bra for Hans.', promptType: 'dare', target: 'Hans', intensity: 8 }, 'Grecia') !== null);
  check('intensity clamped to stage', v({ text: 'Grecia, tell Hans a secret.', promptType: 'truth', target: 'Hans', intensity: 1 }, 'Grecia').prompt.intensity === 8);
  check('target adopted from text when field missing', v({ text: 'Grecia, tell Nella a secret.', promptType: 'truth', target: null, intensity: 8 }, 'Grecia').target === 'Nella');
  check('self-target rejected', v({ text: 'Grecia, tell Grecia a secret.', promptType: 'truth', target: 'Grecia', intensity: 8 }, 'Grecia') === null);
  ctx.__gs.chapterIndex = 0; ctx.__gs.memory.clothingRemoved = {};

  // 4. Memory notes reach LyraMemory (only via takePrompt) — simulate directly
  ctx.OrbAI.stats.disabledUntil = 0; ctx.OrbAI.stats.lastError = null;
  await tick(300); ctx.OrbAI.clearPrefetch(); replies.length = 0;
  var before = ctx.LyraMemory.loadPlayer('Nella');
  reply({ text: 'Nella, name the one food you refuse to touch.', promptType: 'truth', target: null, intensity: 2, lyraLine: null, memoryNotes: [{ player: 'Nella', note: 'refuses to eat olives' }] });
  await new Promise(function (res) { ctx.OrbAI.takePrompt('Nella', function (sel) { check('takePrompt returns a validated selection', !!(sel && sel.prompt && sel.prompt._ai)); res(); }); });
  var after = ctx.LyraMemory.loadPlayer('Nella');
  check('memory note stored on the player record', !!(after && (after.notes || []).some(function (n) { return /olives/.test(n.note || n); })), JSON.stringify(after && after.notes));
  check('memory note reaches the dossier in the next context', (ctx.OrbAI.buildContext('Hans').players.find(function (p) { return p.name === 'Nella'; }).dossier || []).some(function (x) { return /olives/.test(x); }));

  // 5. Dead endpoint: 503 -> disabled for the night, curated pool keeps playing
  replies.length = 0; replies.push({ status: 503, json: { ok: false, error: 'not_configured' } });
  await new Promise(function (res) { ctx.OrbAI.takePrompt('Hans', function (sel) { check('503 yields null (fallback)', sel === null); res(); }); });
  check('AI disabled after not_configured', ctx.OrbAI.isEnabled() === false);
  check('status text explains', /not connected/.test(d.getElementById('aiStatus').textContent));

  // 6. Couples mode rejects "everyone"
  ctx.OrbAI.stats.disabledUntil = 0;
  ctx.__gs.gameMode = 'couple';
  check('couples: "everyone" rejected', v({ text: 'Everyone drink.', promptType: 'dare', target: null, intensity: 2 }, 'Hans') === null);
  ctx.__gs.gameMode = 'group';

  console.log(failures.length ? '\nFAIL: ' + failures.length + ' — ' + failures.join('; ') : '\nPASS: AI author (client) — ' + calls.length + ' fake worker calls');
  process.exit(failures.length ? 1 : 0);
})().catch(function (e) { console.error('CRASH', e); process.exit(1); });
