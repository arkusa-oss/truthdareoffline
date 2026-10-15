#!/usr/bin/env node
/**
 * es_ui_test.js — Headless play-test of the Spanish UI.
 *
 * Loads the REAL index.html + game files in jsdom, forces GAME_LANG=es, and
 * asserts the setup screen renders in Spanish — both the static (data-i18n)
 * elements and the JS-built dynamic strings (mode indicator, player-list rows,
 * routed through T()). Also verifies switching back to English is lossless.
 *
 * This is the guard for translation regressions in the pre-game UI: the prompt
 * pool is covered by sim_grammar_test.js + check_translations.js, but the
 * intro/rules/setup chrome only shows up when the page is actually rendered.
 *
 * Requires jsdom (devDependency). Run: npm test  (or: node es_ui_test.js)
 * Exits non-zero on any failed assertion.
 */
'use strict';
var fs = require('fs');
var vm = require('vm');
var JSDOM = require('jsdom').JSDOM;

var failures = [];
function assert(label, actual, expected) {
  if (actual !== expected) failures.push(label + '\n    expected: ' + JSON.stringify(expected) + '\n    actual:   ' + JSON.stringify(actual));
}
function assertHas(label, actual, needle) {
  if (typeof actual !== 'string' || actual.indexOf(needle) < 0) failures.push(label + '\n    expected to contain: ' + JSON.stringify(needle) + '\n    actual:              ' + JSON.stringify(actual));
}

// ── Boot jsdom with the real page ──
var html = fs.readFileSync(__dirname + '/index.html', 'utf8');
var dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true });
var window = dom.window;
var store = { orb_lang: 'es' };
Object.defineProperty(window, 'localStorage', { configurable: true, value: {
  getItem: function (k) { return (k in store) ? store[k] : null; },
  setItem: function (k, v) { store[k] = String(v); },
  removeItem: function (k) { delete store[k]; }
}});
window.matchMedia = function () { return { matches: false, addListener: function () {}, removeListener: function () {} }; };
window.requestAnimationFrame = function (fn) { return setTimeout(fn, 0); };
window.scrollTo = function () {};

var ctx = dom.getInternalVMContext();
var FILES = ['prompts_v2.js', 'couples_prompts_v2.js', 'couples_prompts_early.js',
  'translations_es.js', 'orb-data.js', 'orb-templates.js', 'orb-state.js', 'orb-memory.js', 'orb-engine.js'];
FILES.forEach(function (f) {
  try { vm.runInContext(fs.readFileSync(__dirname + '/' + f, 'utf8'), ctx, { filename: f }); }
  catch (e) { failures.push('LOAD ERROR ' + f + ': ' + e.message); }
});
// const-declared bindings are not context globals — expose the two we drive.
vm.runInContext('globalThis.__gs = gameState; globalThis.__setLang = setGameLanguage;', ctx);

var doc = window.document;
function q(sel, attr) { var el = doc.querySelector(sel); return el ? (attr ? el.getAttribute(attr) : el.textContent.trim()) : null; }
function byId(id) { var el = doc.getElementById(id); return el ? el.textContent.trim() : null; }

// ── Spanish ──
ctx.__setLang('es');
ctx.applyStaticTranslations();
assert('GAME_LANG is es', ctx.GAME_LANG, 'es');

// Welcome splash: shown first, intro page 1 starts hidden, copy is Spanish.
var splash = doc.getElementById('introSplash');
var intro1 = doc.getElementById('introOverlay');
assert('splash present', !!splash, true);
assert('splash visible on load', splash && splash.classList.contains('is-hidden'), false);
assert('intro page 1 hidden on load', intro1 && intro1.classList.contains('is-hidden'), true);
assert('splash tagline (es)', q('.splash-tagline'), '¿Otra galaxia? ¿Otra dimensión? Ni ella lo dice.');
assert('splash enter (es)', byId('splashEnterBtn'), 'Entrar');
assert('splash visual present', !!(splash && splash.querySelector('.splash-visual .splash-video')), true);
assert('splash poster is the cover art', splash && splash.querySelector('.splash-video').getAttribute('poster'), 'orb-cover.jpg');

// Static screen
assert('setup kicker', q('.setup-kicker'), 'LYRA despierta');
assert('setup title', q('.setup-title'), '¿Quién juega esta noche?');
assert('name label', q('label[for="playerNameInput"]'), 'Nombre');
assert('name placeholder', q('#playerNameInput', 'placeholder'), 'Ingresa el nombre del jugador');
assert('gender label', q('label[for="playerGenderInput"]'), 'Género');
assert('gender option male', q('#playerGenderInput option[value="male"]'), 'Hombre');
assert('gender option female', q('#playerGenderInput option[value="female"]'), 'Mujer');
assert('gender option other', q('#playerGenderInput option[value="other"]'), 'Otro');
assert('partner label', q('label[for="playerPartnerInput"]'), 'Pareja (opcional)');
assert('partner none', q('#playerPartnerInput option[value=""]'), 'Ninguno');
assert('add button', q('#addPlayerBtn'), '+ Agregar Jugador');
assert('we are', q('#setupCoupleType .setup-mode-label'), 'Somos:');
assert('couple established', q('[data-couple-type="established"]'), 'Nos conocemos');
assert('language label', q('#setupLanguage .setup-mode-label'), 'Idioma:');
assert('music toggle', q('.music-toggle-label span'), 'Activar música por etapa');
assert('vibe label', q('.setup-genre-label'), 'Ambiente musical');
assert('genre latin', q('[data-theme="latin"] .genre-chip-name'), 'Ritmos Latinos');
assertHas('genre latin sub keeps arrows', q('[data-theme="latin"] .genre-chip-sub'), '→');
assert('start button', q('#startGameBtn'), 'Comenzar Juego');
// intro page 1 sample (inline <em>/<strong> preserved)
assertHas('intro lead keeps <em>', doc.querySelector('[data-i18n="intro.lead"]').innerHTML, '<em>');
assertHas('intro s1 keeps <strong>', doc.querySelector('[data-i18n="intro.s1_body"]').innerHTML, '<strong>');
assertHas('rules r2 keeps <strong>', doc.querySelector('[data-i18n="rules.r2"]').innerHTML, '<strong>');

// Dynamic — mode indicator + player list
ctx.__gs.players = [];
ctx.renderSetupPlayerList(); ctx.updateModeIndicator();
assert('empty list', q('#setupPlayerList .setup-player-sub'), 'Aún no hay jugadores.');
assert('mode empty', byId('setupModeValue'), 'Agrega jugadores para comenzar');

ctx.__gs.players = [
  { id: 1, name: 'Ana',  gender: 'female', partnerId: null, isSeducer: true,  remembered: false },
  { id: 2, name: 'Beto', gender: 'male',   partnerId: null, isSeducer: false, remembered: true },
  { id: 3, name: 'Cami', gender: 'other',  partnerId: 1,    isSeducer: false, remembered: false }
];
ctx.renderSetupPlayerList(); ctx.updateModeIndicator();
assert('mode group with {n}', byId('setupModeValue'), 'Modo Grupal (3 jugadores)');
var rows = Array.prototype.slice.call(doc.querySelectorAll('#setupPlayerList .setup-player-row'));
assert('three player rows', rows.length, 3);
assertHas('row1 gender localized', rows[0].querySelector('.setup-player-sub').textContent, 'Mujer');
assertHas('row1 seducer badge', rows[0].querySelector('.setup-seducer-badge').textContent, 'Seductor');
assertHas('row2 remembers badge', rows[1].querySelector('.setup-remembered-badge').textContent, 'Lyra te recuerda');
assertHas('row3 partner prefix', rows[2].querySelector('.setup-player-sub').textContent, 'Pareja: Ana');
assert('remove button', rows[0].querySelector('.setup-remove-btn').textContent.trim(), 'Quitar');

ctx.__gs.players = ctx.__gs.players.slice(0, 2);
ctx.updateModeIndicator();
assert('mode couple', byId('setupModeValue'), 'Modo Pareja');

// Toasts use the selected language while keeping their dismissal callbacks.
assert('toast kicker (es)', q('.toast-kicker'), 'Lyra habla');
assert('toast dismiss (es)', byId('toastDismissBtn'), '¡Salud!');
assert('player heading (es)', q('.setup-list-title'), 'Jugadores');
var voiceTitle = null;
ctx.LyraVoice = { isEnabled: function () { return true; }, speak: function (title) { voiceTitle = title; } };
var dismissed = false;
ctx.showToast(ctx.TOAST_OPENING.title, ctx.TOAST_OPENING.message, function () { dismissed = true; }, 'toast.opening');
assert('opening toast title (es)', byId('toastTitle'), 'Levanten sus copas.');
assertHas('opening toast message (es)', byId('toastMessage'), 'Antes de empezar');
assert('voice retains clip lookup text', voiceTitle, ctx.TOAST_OPENING.title);
doc.getElementById('toastDismissBtn').click();
assert('toast dismissal callback', dismissed, true);
assert('toast hidden after dismissal', doc.getElementById('toastOverlay').classList.contains('is-hidden'), true);
Object.keys(ctx.TOAST_STAGE_MESSAGES).forEach(function (stage) {
  var toast = ctx.TOAST_STAGE_MESSAGES[stage];
  ctx.showToast(toast.title, toast.message, null, 'toast.' + stage);
  assert('stage toast title ' + stage, byId('toastTitle'), ctx.TRANSLATIONS_ES.ui['toast.' + stage + '.title']);
  assert('stage toast message ' + stage, byId('toastMessage'), ctx.TRANSLATIONS_ES.ui['toast.' + stage + '.message']);
});
ctx.showToast(ctx.TOAST_SAFEWORD.title, ctx.TOAST_SAFEWORD.message, null, 'toast.safeword');
assertHas('safeword reminder (es)', byId('toastMessage'), 'TODO se detiene');
ctx.TOAST_RANDOM.forEach(function (toast, i) {
  ctx.showToast(toast.title, toast.message, null, 'toast.random' + i);
  assert('random toast title ' + i, byId('toastTitle'), ctx.TRANSLATIONS_ES.ui['toast.random' + i + '.title']);
});

var restaurantPrompt = vm.runInContext('PROFILING_PROMPTS.find(function (p) { return p.id === "CQ_16"; })', ctx);
var restaurantText = ctx.injectPromptText(restaurantPrompt, 'Ana', 'Hans');
assertHas('restaurant quiz renders in Spanish', restaurantText, 'restaurante');
assertHas('restaurant quiz retains partner name', restaurantText, 'Hans');
assert('restaurant quiz does not fall back to English', restaurantText.indexOf('go-to order'), -1);

// ── English switch-back is lossless ──
store.orb_lang = 'en';
ctx.__setLang('en');
ctx.applyStaticTranslations();
ctx.updateModeIndicator(); ctx.renderSetupPlayerList();
assert('en title restored', q('.setup-title'), 'Who is playing tonight?');
assert('en placeholder restored', q('#playerNameInput', 'placeholder'), 'Enter player name');
assert('en mode restored', byId('setupModeValue'), 'Couple Mode');
assert('en start restored', byId('startGameBtn'), 'Start Game');

ctx.showToast(ctx.TOAST_OPENING.title, ctx.TOAST_OPENING.message, null, 'toast.opening');
assert('opening toast title restored (en)', byId('toastTitle'), ctx.TOAST_OPENING.title);
assert('opening toast message restored (en)', byId('toastMessage'), ctx.TOAST_OPENING.message);
assert('toast dismiss restored (en)', byId('toastDismissBtn'), 'Cheers!');

// ── Report ──
if (failures.length) {
  console.log('FAIL: ' + failures.length + ' assertion(s)\n');
  failures.forEach(function (f) { console.log('  ✗ ' + f + '\n'); });
  process.exit(1);
}
console.log('PASS: Spanish UI renders correctly (static + dynamic), English switch-back lossless.');

