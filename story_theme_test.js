#!/usr/bin/env node
/**
 * story_theme_test.js — Secret Banquet theme: host checklist flags, guest
 * check-in, Lyra's private dress question ("Rather not say" exclusivity),
 * stockings gating (on / spare / never), chain veto, and the rule that every
 * prompt in the game can be passed.
 *
 * Usage: node story_theme_test.js   (needs jsdom: npm install --no-save jsdom)
 */
'use strict';
var fs = require('fs'), vm = require('vm'), path = require('path');
var JSDOM = require(path.join(process.cwd(), 'node_modules/jsdom')).JSDOM;

var failures = [];
function check(label, cond, extra) { console.log((cond ? 'ok   ' : 'FAIL ') + label + (cond ? '' : (extra ? '  -> ' + extra : ''))); if (!cond) failures.push(label); }

var html = fs.readFileSync(__dirname + '/index.html', 'utf8');
var dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true });
var w = dom.window, d = w.document, store = {};
Object.defineProperty(w, 'localStorage', { value: { getItem: function (k) { return k in store ? store[k] : null; }, setItem: function (k, v) { store[k] = String(v); }, removeItem: function (k) { delete store[k]; } } });
w.matchMedia = function () { return { matches: false, addListener: function () {}, removeListener: function () {} }; };
w.requestAnimationFrame = function (fn) { return setTimeout(fn, 0); };
w.scrollTo = function () {}; w.alert = function (m) { throw new Error('alert: ' + m); }; w.confirm = function () { return true; };
w.HTMLMediaElement.prototype.play = function () { return Promise.resolve(); }; w.HTMLMediaElement.prototype.pause = function () {};
w.ORB_AI_ENDPOINT = '';

var ctx = dom.getInternalVMContext();
['prompts_v2.js', 'couples_prompts_v2.js', 'couples_prompts_early.js', 'translations_es.js', 'orb-voice.js', 'orb-data.js', 'orb-templates.js',
 'orb-state.js', 'orb-memory.js', 'orb-engine.js', 'orb-story.js', 'ai_orb.js', 'orb-music.js', 'orb-ui.js'].forEach(function (f) {
  try { vm.runInContext(fs.readFileSync(__dirname + '/' + f, 'utf8'), ctx, { filename: f }); }
  catch (e) { failures.push('LOAD ERROR ' + f + ': ' + e.message); }
});
vm.runInContext('globalThis.__gs = gameState;', ctx);
function vis(id) { return !d.getElementById(id).classList.contains('is-hidden'); }
function q(sel) { return d.querySelector(sel); }
function qa(sel) { return Array.prototype.slice.call(d.querySelectorAll(sel)); }

// ── 1. Theme selectable, checklist renders grouped, flags persist ──
d.getElementById('rulesAcceptBtn').click();
check('prep ritual opens after rules', vis('storyOverlay'));
var worldBtn = q('#storyOverlay [data-world="secret_banquet"]');
check('Secret Banquet is a selectable world', !!worldBtn);
worldBtn.click();
check('world selected in narrative', ctx.__gs.narrative.storyId === 'secret_banquet');
var groups = qa('#storyOverlay .story-check-group');
check('checklist grouped by category (5 groups)', groups.length === 5, String(groups.length));
check('key items warn gently while unchecked', /Lyra would rather you had/.test(q('#storyOverlay .story-warn').textContent));
var spare = q('#storyOverlay [data-check="spare_stockings"]');
spare.checked = true; spare.dispatchEvent(new w.Event('change'));
check('spare stockings flag set', ctx.OrbStory.hasFlag('spare_stockings_available') === true);
['masks', 'blindfolds', 'soft', 'water', 'device', 'pause_word'].forEach(function (id) { var cb = q('#storyOverlay [data-check="' + id + '"]'); cb.checked = true; cb.dispatchEvent(new w.Event('change')); });
check('warning clears once key items are ticked', q('#storyOverlay .story-warn').textContent === '');
check('blindfolds tick also marks the scarf prop ready', ctx.OrbStory.propReady('scarf') === true);
var fruit = q('#storyOverlay [data-check="strawberries"]'); fruit.checked = false; fruit.dispatchEvent(new w.Event('change'));
check('unticking fruit marks the fruit prop missing (beats skip it)', ctx.OrbStory.propReady('fruit') === false);
q('#storyOverlay .story-footer .rules-enter-btn').click();
check('setup opens after the checklist', vis('setupOverlay'));

// ── 2. Players, Start → arrival ritual (check-in, then dress check per guest) ──
function add(n, g) { d.getElementById('playerNameInput').value = n; d.getElementById('playerGenderInput').value = g; d.getElementById('addPlayerBtn').click(); }
add('Hans', 'male'); add('Grecia', 'female'); add('Nella', 'female');
d.getElementById('startGameBtn').click();
check('arrival overlay shown before the opening toast', vis('arrivalOverlay') && d.getElementById('toastOverlay').classList.contains('is-hidden'));
check('check-in blurb present, mechanics not revealed', /adult, flirty/.test(q('#arrivalOverlay').textContent) && !/wardrobe|stockings thread|lingerie/.test(q('#arrivalOverlay').textContent));
var cont = qa('#arrivalOverlay .rules-enter-btn')[0];
check('continue disabled until every guest taps', cont.disabled === true);
qa('#arrivalOverlay .arrival-guest').forEach(function (b) { b.click(); });
check('continue enabled once all are in', cont.disabled === false);
cont.click();
check('guest 1 handoff screen', /Pass the device to Hans/.test(q('#arrivalOverlay').textContent));
check('18+ opt-in recorded per guest', ctx.__gs.players.every(function (p) { return p.checkedIn === true; }));

// Hans: declares top/bottom/underwear/shoes/socks
q('#arrivalOverlay [data-itsme="Hans"]').click();
check('Lyra asks the dress question in character', /I only own robes/.test(q('#arrivalOverlay').textContent) && /Hans/.test(q('#arrivalOverlay').textContent));
check('privacy note shown', /Only you see this screen/.test(q('#arrivalOverlay').textContent));
['top', 'bottom', 'underwear', 'shoes', 'socks'].forEach(function (t) { q('#arrivalOverlay [data-tag="' + t + '"]').click(); });
// Exclusivity: picking "Rather not say" clears the rest; picking a tag clears it again
q('#arrivalOverlay [data-tag="rather_not_say"]').click();
check('"Rather not say" clears every other tag', qa('#arrivalOverlay .tag-chip.active').length === 1 && q('#arrivalOverlay [data-tag="rather_not_say"]').classList.contains('active'));
q('#arrivalOverlay [data-tag="top"]').click();
check('picking a tag clears "Rather not say"', !q('#arrivalOverlay [data-tag="rather_not_say"]').classList.contains('active') && q('#arrivalOverlay [data-tag="top"]').classList.contains('active'));
['bottom', 'underwear', 'shoes', 'socks'].forEach(function (t) { q('#arrivalOverlay [data-tag="' + t + '"]').click(); });
q('#arrivalOverlay [data-dress-done="Hans"]').click();
check('Lyra never explains: "I\'ll remember that."', /I'll remember that/.test(q('#arrivalOverlay').textContent));
var hans = ctx.__gs.players[0];
check('tags stored on the guest', JSON.stringify(hans.clothingTags) === JSON.stringify(['top', 'bottom', 'underwear', 'shoes', 'socks']));
check('undeclared layers are absent from his wardrobe (no belt, no jewelry)', (ctx.__gs.memory.wardrobeAbsent.Hans || []).indexOf('belt') >= 0 && (ctx.__gs.memory.wardrobeAbsent.Hans || []).indexOf('jewelry') >= 0);
check('declared layers stay', (ctx.__gs.memory.wardrobeAbsent.Hans || []).indexOf('top') < 0);
q('#arrivalOverlay [data-next]').click();

// Grecia: lingerie + stockings
q('#arrivalOverlay [data-itsme="Grecia"]').click();
['top', 'bottom', 'lingerie', 'stockings', 'shoes'].forEach(function (t) { q('#arrivalOverlay [data-tag="' + t + '"]').click(); });
q('#arrivalOverlay [data-dress-done="Grecia"]').click();
q('#arrivalOverlay [data-next]').click();
// Nella: rather not say
q('#arrivalOverlay [data-itsme="Nella"]').click();
q('#arrivalOverlay [data-tag="rather_not_say"]').click();
q('#arrivalOverlay [data-dress-done="Nella"]').click();
check('last guest gets "Let the night begin"', /Let the night begin/.test(q('#arrivalOverlay').textContent));
q('#arrivalOverlay [data-next]').click();
check('arrival closes, opening toast shows', !vis('arrivalOverlay') && vis('toastOverlay'));
d.getElementById('toastDismissBtn').click();

var grecia = ctx.__gs.players[1], nella = ctx.__gs.players[2];
check('has_stockings derived from the stockings tag', grecia.hasStockings === true && hans.hasStockings === false && nella.hasStockings === false);
check('"Rather not say" keeps the full default wardrobe', nella.ratherNotSay === true && (ctx.__gs.memory.wardrobeAbsent.Nella || []).length === 0);
check('lingerie tag maps to bra + underwear present (not absent)', (ctx.__gs.memory.wardrobeAbsent.Grecia || []).indexOf('bra') < 0 && (ctx.__gs.memory.wardrobeAbsent.Grecia || []).indexOf('underwear') < 0);
ctx.__gs.memory.clothingRemoved = { Grecia: ['shoes'], Nella: ['shoes'] }; // stockings sit under shoes in the wardrobe order
check('stockings are a wardrobe layer for Grecia only', ctx.wardrobeFor('Grecia').some(function (x) { return x.item === 'stockings'; }) && !ctx.wardrobeFor('Nella').some(function (x) { return x.item === 'stockings'; }));

// ── 3. Stockings gating ──
var S = ctx.OrbStory;
check('stockings_on true for Grecia, false for Nella', S.needSatisfied('stockings_on', 'Grecia') && !S.needSatisfied('stockings_on', 'Nella'));
check('stockings_spare for Nella while the host has spares', S.needSatisfied('stockings_spare', 'Nella') === true);
check('stockings_spare never for Grecia (already wearing) or Hans (male)', !S.needSatisfied('stockings_spare', 'Grecia') && !S.needSatisfied('stockings_spare', 'Hans'));
var beats = S.threadPrompts;
function beat(id) { return beats.filter(function (b) { return b.id === id; })[0]; }
ctx.__gs.chapterIndex = 4; // intimate
check('"take them off slowly" allowed for Grecia (actor, wearing)', S.beatAllowed(beat('SB_ST01'), 'Grecia') === true);
check('"take them off slowly" not allowed for Nella', S.beatAllowed(beat('SB_ST01'), 'Nella') === false);
check('"roll one down" allowed for Hans (target Grecia wears them)', S.beatAllowed(beat('SB_ST02'), 'Hans') === true);
ctx.__gs.chapterIndex = 3; // suggestive
check('"put them on" allowed (spare + Nella lacks them)', S.beatAllowed(beat('SB_ST04'), 'Hans') === true);
S.setFlag('spare_stockings_available', false);
check('"put them on" never shown without spares', S.beatAllowed(beat('SB_ST04'), 'Hans') === false);
check('stockings chain vetoed when nobody qualifies except the wearer', S.chainAllowed('taboo_stockings', 'Hans', 'Nella') === 'Grecia');
ctx.__gs.memory.clothingRemoved = { Grecia: ['shoes', 'stockings'], Nella: ['shoes'] };
check('stockings chain vetoed outright once hers are off and no spares', S.chainAllowed('taboo_stockings', 'Hans', 'Grecia') === null);
ctx.__gs.memory.clothingRemoved = { Grecia: ['shoes'], Nella: ['shoes'] };
S.setFlag('spare_stockings_available', true);
check('spares restore the chain for a target without stockings', S.chainAllowed('taboo_stockings', 'Hans', 'Nella') === true);
check('other chains pass through untouched', S.chainAllowed('erotic_kiss_compare', 'Hans', 'Nella') === true);
check('put-on prompt allowed only with a qualifying subject', S.promptAllowed({ text: 'Kneel and roll a stocking up {target}\'s leg.', type: 'directed', promptType: 'dare' }, 'Hans') === true);
S.setFlag('spare_stockings_available', false); ctx.__gs.memory.clothingRemoved = { Grecia: ['shoes', 'stockings'], Nella: ['shoes'] };
check('put-on prompt vetoed when nobody can be handed stockings', S.promptAllowed({ text: 'Kneel and roll a stocking up {target}\'s leg.', type: 'directed', promptType: 'dare' }, 'Hans') === false);
S.setFlag('spare_stockings_available', true); ctx.__gs.memory.clothingRemoved = { Grecia: ['shoes'], Nella: ['shoes'] };
// handing over a pair flips the flag and adds the layer
S.grantStockings('Nella');
check('handed pair: has_stockings true and wardrobe gains stockings', nella.hasStockings === true && ctx.wardrobeFor('Nella').some(function (x) { return x.item === 'stockings'; }));
// tag beats
ctx.__gs.chapterIndex = 2; // flirty
check('lace callback only for the lingerie tag', S.beatAllowed(beat('SB_TG01'), 'Grecia') === true && S.beatAllowed(beat('SB_TG01'), 'Hans') === false);
ctx.__gs.chapterIndex = 1; // playful
nella.ratherNotSay = true; nella.clothingTags = ['rather_not_say'];
check('"rather not say" tease only for that guest', S.beatAllowed(beat('SB_TG03'), 'Nella') === true && S.beatAllowed(beat('SB_TG03'), 'Grecia') === false);
check('thread prompts obey the ladder (stocking removal never below intimate)', beats.filter(function (b) { return /stocking/i.test(b.text) && b.needs === 'stockings_on'; }).every(function (b) { return ['intimate', 'erotic', 'taboo'].indexOf(b.chapter) >= 0; }));

// ── 4. Every prompt is passable: feedback panel always offers PASS ──
function hasPass(prompt) {
  ctx.showFeedbackPanel(prompt);
  var labels = qa('#feedbackPanel .feedback-buttons button').map(function (b) { return b.textContent; });
  return labels.indexOf('PASS') >= 0;
}
vm.runInContext('globalThis.__pool = PROMPTS.concat(COUPLES_PROMPTS, STORY_BEATS);', ctx); // const bindings are not vm globals
var pool = ctx.__pool.concat(beats);
var noPass = pool.filter(function (p) { return !hasPass(p); });
check('every curated prompt, beat and thread prompt offers PASS (' + pool.length + ' checked)', noPass.length === 0, noPass.slice(0, 3).map(function (p) { return p.id; }).join(','));
var offer = { id: 'SB_OFFER_x', type: 'self', promptType: 'truth', text: 'x', _options: [{ label: 'Handed a pair' }, { label: "We'll pretend" }] };
check('the stockings offer keeps a PASS button next to its own answers', hasPass(offer) && qa('#feedbackPanel .feedback-buttons button').length === 3);

// ── 5. Pass costs a sip/swap, never a hard stop: the game continues ──
ctx.__gs.chapterIndex = 0;
ctx.hideFeedbackPanel();
d.getElementById('nextBtn').click();
var awaited = false;
setTimeout(function () {
  awaited = ctx.__gs.awaitingResolution;
  check('a prompt is on screen', awaited);
  if (awaited) { ctx.recordFeedback('pass'); }
  setTimeout(function () {
    check('after PASS the night continues (next prompt or penalty, no stop)', ctx.__gs.turnCount >= 2 || ctx.__gs.spinner || /shot|sip|drink/i.test(d.getElementById('promptText').textContent) || ctx.__gs.awaitingResolution);
    console.log(failures.length ? '\nFAIL: ' + failures.length + ' — ' + failures.join('; ') : '\nPASS: Secret Banquet theme');
    process.exit(failures.length ? 1 : 0);
  }, 1500);
}, 2500);
