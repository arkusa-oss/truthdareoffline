#!/usr/bin/env node
/**
 * check_translations.js — keeps translations honest.
 *
 * For every translated prompt, compares the stored enHash against the hash of
 * the CURRENT English text. If English changed after translation, the entry
 * is STALE and needs re-review — the build fails so wording fixes can't
 * silently diverge between languages.
 *
 * Missing translations are reported but never fail the build (English
 * fallback covers them while translation is in progress).
 *
 * Usage:
 *   node check_translations.js              # check (CI mode)
 *   node check_translations.js --stub CPL0001   # print a translation stub
 */
'use strict';
var fs = require('fs');
var vm = require('vm');

// djb2 — same tiny hash everywhere
function hash(s) {
  var h = 5381;
  for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

// Load prompt pools + translations in a bare sandbox
var sandbox = { localStorage: { getItem: function () { return null; }, setItem: function () {} } };
vm.createContext(sandbox);
// orb-data.js/templates define PROFILING_PROMPTS, HUMOR_PROMPTS, etc. and
// build PROMPTS/COUPLES_PROMPTS; load the full runtime pool so every
// translatable id is known (not just the CSV-imported ones).
['prompts_v2.js', 'couples_prompts_v2.js', 'couples_prompts_early.js',
 'orb-data.js', 'orb-templates.js', 'translations_es.js'].forEach(function (f) {
  vm.runInContext(fs.readFileSync(__dirname + '/' + f, 'utf8').replace(/^const /gm, 'var '), sandbox, { filename: f });
});

// English text by id (v2 personal/playful replaced by the early file at runtime)
var english = {};
sandbox.PROMPTS.forEach(function (p) { english[p.id] = p.text; });
sandbox.CSV_COUPLES_PROMPTS.forEach(function (p) {
  if (p.chapter !== 'personal' && p.chapter !== 'playful') english[p.id] = p.text;
});
sandbox.COUPLES_PROMPTS_EARLY.forEach(function (p) { english[p.id] = p.text; });
// Engine-defined minigames (both modes) live in orb-engine.js source
var engSrc = fs.readFileSync(__dirname + '/orb-engine.js', 'utf8');
var reMini = /\{ id: "((?:C?MINI)_\d+)"[\s\S]*?text: "((?:[^"\\]|\\.)*)"/g, mMini;
while ((mMini = reMini.exec(engSrc))) { english[mMini[1]] = JSON.parse('"' + mMini[2] + '"'); }

// --stub: print a ready-to-paste translation entry
var stubIdx = process.argv.indexOf('--stub');
if (stubIdx >= 0) {
  var id = process.argv[stubIdx + 1];
  if (!id || !english[id]) { console.error('Unknown prompt id: ' + id); process.exit(1); }
  console.log('    ' + id + ': { text: "TODO: traducir — ' + english[id].replace(/"/g, '\\"') + '", enHash: ' + hash(english[id]) + ' },');
  process.exit(0);
}

// Check mode
var t = sandbox.TRANSLATIONS_ES;
var ids = Object.keys(t.prompts || {});
var stale = [], orphaned = [];
ids.forEach(function (id) {
  if (!english[id]) { orphaned.push(id); return; }
  if (t.prompts[id].enHash !== hash(english[id])) stale.push(id);
});
var total = Object.keys(english).length;
var missing = total - (ids.length - orphaned.length);

console.log('Translations (es): ' + ids.length + ' entries · ' + missing + ' of ' + total + ' prompts untranslated (English fallback)');
if (orphaned.length) {
  console.log('ORPHANED (translation exists but prompt id is gone): ' + orphaned.join(', '));
}
if (stale.length) {
  console.log('STALE (English changed after translation — re-review needed):');
  stale.forEach(function (id) { console.log('  ' + id + ': ' + english[id].slice(0, 80)); });
  process.exitCode = 1;
} else {
  console.log('No stale translations.');
}
