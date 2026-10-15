'use strict';
var assert = require('node:assert/strict');
var vm = require('node:vm');
var fs = require('node:fs');
var timers = new Map(), next = 0, clips = [];
var ctx = { GAME_LANG: 'en', console: { log: function () {}, warn: function () {} },
  setTimeout: function (fn) { timers.set(++next, fn); return next; },
  clearTimeout: function (id) { timers.delete(id); },
  Audio: function (src) { this.src = src; this.starts = 0; this.pauses = 0; this.play = function () { this.starts++; return Promise.resolve(); }; this.pause = function () { this.pauses++; }; clips.push(this); }
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('orb-voice.js', 'utf8'), ctx);
function flush() { var pending = Array.from(timers.values()); timers.clear(); pending.forEach(function (fn) { fn(); }); }
ctx.LyraVoice.play('L01');
ctx.LyraVoice.play('L01');
assert.equal(clips.length, 1, 'duplicate pending request uses one audio instance');
var staleEnd = clips[0].onended;
ctx.LyraVoice.stop(); ctx.GAME_LANG = 'es'; ctx.LyraVoice.play('L01');
staleEnd(); flush();
assert.equal(clips[0].starts, 0, 'cancelled English audio never starts');
assert.equal(clips[1].starts, 1);
ctx.LyraVoice.play('L01'); flush();
assert.equal(clips.length, 2, 'duplicate active request must not replay');
assert.equal(clips[1].starts, 1);
assert.equal(clips[1].src, './audiofiles/es/L01.mp3');
ctx.LyraVoice.stop();
assert.equal(clips[1].pauses, 1, 'stale event must not lose the active audio reference');
ctx.LyraVoice.play('L02'); ctx.LyraVoice.play('L03'); flush();
assert.equal(clips[2].starts, 0); assert.equal(clips[3].starts, 1);
ctx.LyraVoice.play('L04'); ctx.LyraVoice.setEnabled(false); flush();
assert.equal(clips[4].starts, 0, 'muting cancels pending narration');
console.log('PASS: narration cancellation, language switch, stale events, replacement and mute.');
