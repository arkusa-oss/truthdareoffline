
function updateHistoryButtons() {
  var hasHistory = gameState.promptHistory.length > 1;
  var isBrowsing = gameState.historyIndex >= 0;
  // Back button: visible when there's history to browse
  if (histPrevBtn) {
    histPrevBtn.style.display = hasHistory ? "inline-block" : "none";
    // Disable if we're at the oldest prompt
    if (isBrowsing) {
      histPrevBtn.disabled = gameState.historyIndex <= 0;
    } else {
      histPrevBtn.disabled = false; // can always go back from current
    }
  }
  // Forward button: only visible when browsing history
  if (histNextBtn) {
    histNextBtn.style.display = (hasHistory && isBrowsing) ? "inline-block" : "none";
  }
}

function browseHistory(direction) {
  if (!gameState.promptHistory.length) return;
  var wasAtCurrent = gameState.historyIndex < 0;

  if (direction === "back") {
    if (wasAtCurrent) {
      // First back press: go to the previous prompt (second-to-last in history)
      gameState.historyIndex = gameState.promptHistory.length - 2;
    } else {
      gameState.historyIndex = Math.max(0, gameState.historyIndex - 1);
    }
  } else if (direction === "forward") {
    if (gameState.historyIndex < 0) return; // already at current
    gameState.historyIndex += 1;
    // If we've reached or passed the end, return to current prompt
    if (gameState.historyIndex >= gameState.promptHistory.length - 1) {
      returnToCurrent();
      return;
    }
  }

  // Show the historical prompt
  var entry = gameState.promptHistory[gameState.historyIndex];
  if (!entry) { returnToCurrent(); return; }

  if (promptTextEl) {
    promptTextEl.textContent = entry.text;
    promptTextEl.style.opacity = "0.6"; // dimmed to signal it's historical
  }
  if (playerLabelEl) playerLabelEl.textContent = entry.player;
  // Update the orb name reveal so the player viewer sees who the prompt was for
  setOrbRevealName(entry.player || "", "final");
  if (metaTextEl) metaTextEl.textContent = entry.meta + " | HISTORY";

  // Hide feedback buttons and disable play/skip while browsing
  if (feedbackPanelEl) feedbackPanelEl.classList.add("is-hidden");
  setLegacyFeedbackButtonsHidden(true);
  if (window.OrbPromptCard) window.OrbPromptCard.hide();
  if (nextBtn) nextBtn.disabled = true;
  if (skipBtn) skipBtn.disabled = true;

  updateHistoryButtons();
}

function returnToCurrent() {
  gameState.historyIndex = -1;
  // Restore the current prompt display
  var last = gameState.promptHistory[gameState.promptHistory.length - 1];
  if (last) {
    if (promptTextEl) {
      promptTextEl.textContent = last.text;
      promptTextEl.style.opacity = "1";
    }
    if (playerLabelEl) playerLabelEl.textContent = last.player;
    // Restore orb name to the current prompt's player
    setOrbRevealName(last.player || "", "final");
    if (metaTextEl) metaTextEl.textContent = last.meta;
  }
  if (window.OrbPromptCard && gameState.lastPrompt) window.OrbPromptCard.update(gameState.lastPrompt);
  // Restore game controls
  if (gameState.awaitingResolution) {
    // Prompt is still waiting for feedback — show feedback buttons
    if (gameState.lastPrompt) showFeedbackPanel(gameState.lastPrompt);
  } else {
    if (nextBtn) nextBtn.disabled = false;
    if (skipBtn) skipBtn.disabled = false;
  }
  updateHistoryButtons();
}

// =========================
// STARTUP
// =========================

if (histPrevBtn) histPrevBtn.addEventListener("click", function() { browseHistory("back"); });
if (histNextBtn) histNextBtn.addEventListener("click", function() { browseHistory("forward"); });
if (nextBtn) nextBtn.addEventListener("click", nextTurn);
if (skipBtn) skipBtn.addEventListener("click", skipTurn);
// Wrap in a closure so the click resolves the CURRENT global resetGame —
// later code wraps/reassigns it (score reset, card re-render) and a direct
// reference would keep calling the unwrapped original.
if (resetBtn) resetBtn.addEventListener("click", function() { resetGame(); });
if (typePreferenceEl) typePreferenceEl.addEventListener("change", function(e) { gameState.typePreference = e.target.value; });
document.addEventListener("keydown", function(e) {
  if (e.code !== "Space") return;
  // Don't hijack Space while typing (player names can have spaces)
  var tag = (e.target && e.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return;
  // Don't advance turns before the game has started (setup/rules/intro open)
  if (document.body.classList.contains("setup-open")) return;
  if (rulesOverlayEl && !rulesOverlayEl.classList.contains("is-hidden")) return;
  if (setupOverlayEl && !setupOverlayEl.classList.contains("is-hidden")) return;
  if (!gameState.players.length) return;
  e.preventDefault();
  nextTurn();
});
if (addPlayerBtn) addPlayerBtn.addEventListener("click", addPlayerFromSetup);
if (rulesAcceptBtn) rulesAcceptBtn.addEventListener("click", closeRulesOverlay);
initCoupleTypeButtons();

// Language switcher — lives on the cover page AND the setup screen; both
// groups stay in sync. Persists across sessions via localStorage.
(function () {
  function syncActive(lang) {
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  }
  syncActive(GAME_LANG);
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setGameLanguage(btn.dataset.lang);
      syncActive(btn.dataset.lang);
      applyStaticTranslations();  // swap intro/rules text when those are translated
      // Dynamic setup strings are built in JS (T()), not tagged — re-render them.
      if (typeof updateModeIndicator === "function") updateModeIndicator();
      if (typeof renderSetupPlayerList === "function") renderSetupPlayerList();
    });
  });
  applyStaticTranslations();
})();

var introSplashEl = document.getElementById("introSplash");
var splashEnterBtn = document.getElementById("splashEnterBtn");
var introOverlayEl = document.getElementById("introOverlay");
var introOverlay2El = document.getElementById("introOverlay2");
var introContinueBtn = document.getElementById("introContinueBtn");
var introContinueBtn2 = document.getElementById("introContinueBtn2");

// Splash → Intro. The nebula+orb materialize via CSS; the first user gesture
// (this tap) unlocks audio, so Lyra's welcome line plays here. Autoplay policy
// blocks sound before a gesture, which is why the voice is tied to Enter.
if (splashEnterBtn) {
  splashEnterBtn.addEventListener("click", function() {
    if (typeof LyraVoice !== "undefined" && LyraVoice.play) LyraVoice.play("L56");
    if (introSplashEl) introSplashEl.classList.add("is-hidden");
    if (introOverlayEl) introOverlayEl.classList.remove("is-hidden");
  });
}

// Age gate: Continue stays disabled until the 18+ box is checked
var ageConfirmInput = document.getElementById("ageConfirmInput");
if (ageConfirmInput && introContinueBtn) {
  ageConfirmInput.addEventListener("change", function() {
    introContinueBtn.disabled = !ageConfirmInput.checked;
  });
}

// Page 1 → Page 2
if (introContinueBtn) {
  introContinueBtn.addEventListener("click", function() {
    if (ageConfirmInput && !ageConfirmInput.checked) return;
    if (introOverlayEl) introOverlayEl.classList.add("is-hidden");
    if (introOverlay2El) introOverlay2El.classList.remove("is-hidden");
  });
}
// Page 2 → Rules
if (introContinueBtn2) {
  introContinueBtn2.addEventListener("click", function() {
    if (introOverlay2El) introOverlay2El.classList.add("is-hidden");
    if (rulesOverlayEl) rulesOverlayEl.classList.remove("is-hidden");
  });
}

// Music bar starts hidden; OrbMusic.init() will show it if enabled
if (startGameBtn) {
  startGameBtn.addEventListener("click", function() {
    // If a name is sitting in the input un-added, add it now — people type
    // the last player and hit Start without pressing "Add Player"
    if (playerNameInputEl && playerNameInputEl.value.trim()) {
      addPlayerFromSetup();
    }
    if (gameState.players.length < 2) { alert("Lyra needs at least 2 players — add one more."); return; }

    // Auto-detect game mode based on player count
    if (gameState.players.length === 2) {
      gameState.gameMode = "couple";
      // Auto-pair the two players as each other's partner
      var p1 = gameState.players[0];
      var p2 = gameState.players[1];
      p1.partnerId = p2.id; p1.partner = p2.name;
      p2.partnerId = p1.id; p2.partner = p1.name;
      // Clear seducer role in couples mode
      p1.isSeducer = false; p2.isSeducer = false;
      gameState.seducerName = null;
    } else {
      gameState.gameMode = "group";
    }

    CUSTOM_PLAYLIST_URL = "";
    closeSetupOverlay();
    resetGame();
    // Initialize background music (reads the toggle state internally)
    OrbMusic.init("personal");
    // Start prefetching the first AI prompt while the opening toast shows
    if (typeof window.OrbAI !== "undefined" && window.OrbAI.prefetch) {
      window.OrbAI.prefetch();
    }
    // Show opening toast
    showToast(TOAST_OPENING.title, TOAST_OPENING.message);
  });
}

// Wire the mute/unmute button on the music bar
var musicMuteBtn = document.getElementById("musicMuteBtn");
if (musicMuteBtn) {
  musicMuteBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    OrbMusic.toggleMute();
  });
}
if (playerNameInputEl) playerNameInputEl.addEventListener("keydown", function(e) { if (e.key === "Enter") addPlayerFromSetup(); });

// Light up the Add Player button as soon as a name is entered
if (playerNameInputEl && addPlayerBtn) {
  playerNameInputEl.addEventListener("input", function() {
    addPlayerBtn.classList.toggle("is-ready", !!playerNameInputEl.value.trim());
  });
}

// Genre chip selector
var genreOptionsEl = document.getElementById("musicGenreOptions");
if (genreOptionsEl) {
  genreOptionsEl.addEventListener("click", function(e) {
    var chip = e.target.closest(".genre-chip");
    if (!chip) return;
    var theme = chip.dataset.theme;
    if (!theme || !MUSIC_THEMES[theme]) return;

    // Update active state
    genreOptionsEl.querySelectorAll(".genre-chip").forEach(function(c) { c.classList.remove("active"); });
    chip.classList.add("active");

    // Set the selected theme
    SELECTED_MUSIC_THEME = theme;
    MUSIC_PLAYLISTS = getActivePlaylistMap();
    console.log("Music theme set to:", theme, MUSIC_THEMES[theme].name);
  });
}

// Show/hide genre selector based on music toggle
var musicToggleEl = document.getElementById("musicToggle");
var musicGenreWrapEl = document.getElementById("musicGenreWrap");
if (musicToggleEl && musicGenreWrapEl) {
  function updateGenreVisibility() {
    musicGenreWrapEl.style.display = musicToggleEl.checked ? "" : "none";
  }
  updateGenreVisibility();
  musicToggleEl.addEventListener("change", updateGenreVisibility);
}

console.log("Orb Engine v3 loaded | " + PROMPTS.length + " group prompts | " + COUPLES_PROMPTS.length + " couples prompts | " + CHAPTER_ORDER.length + " stages");
buildOrbNameWheel();

// =========================
// DYNAMIC UI — player cards, orb progress ring, active highlight
// =========================
(function() {
  var playerCardsEl = document.getElementById("playerCards");
  var orbProgressEl = document.getElementById("orbProgress");
  var orbProgressPctEl = document.getElementById("orbProgressPct");

  function escHtml(s) {
    return String(s).replace(/[&<>"]/g, function(c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function hashHue(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) { h = str.charCodeAt(i) + ((h << 5) - h); }
    return Math.abs(h) % 360;
  }
  function initials(name) {
    if (!name) return "?";
    var parts = name.trim().split(/\s+/);
    return (parts[0].charAt(0) + (parts[1] ? parts[1].charAt(0) : "")).toUpperCase();
  }

  function repeatChar(ch, n) { var s = ""; for (var i = 0; i < n; i++) s += ch; return s; }

  function cardHtml(p) {
    var hue = hashHue(p.name || "");
    var grad = "linear-gradient(135deg, hsl(" + hue + ",70%,56%), hsl(" + ((hue + 40) % 360) + ",72%,40%))";
    var score = p.score || 0;
    var streak = p.streak || 0;
    var starN = Math.min(5, Math.floor(score / 300));
    var roleHtml = p.isSeducer ? '<span class="pc-role">Seducer</span>' : "";
    var streakHtml = streak >= 2 ? ' <span class="pc-streak">🔥×' + streak + '</span>' : "";
    var starsHtml = starN ? '<div class="pc-stars">' + repeatChar("★", starN) + '</div>' : "";
    return '<div class="player-card" data-name="' + escHtml(p.name) + '">'
      + '<div class="pc-avatar" style="background:' + grad + ';">' + escHtml(initials(p.name)) + '</div>'
      + '<div class="pc-info">'
      + '<div class="pc-name">' + escHtml(p.name) + roleHtml + '</div>'
      + '<div class="pc-score">Score: ' + score + streakHtml + '</div>'
      + starsHtml
      + '</div></div>';
  }

  function renderPlayerCards() {
    if (!playerCardsEl) return;
    var players = gameState.players || [];
    if (!players.length) { playerCardsEl.innerHTML = ""; return; }
    var left = [], right = [];
    players.forEach(function(p, i) { (i % 2 === 0 ? left : right).push(p); });
    function col(arr, side) {
      var inner = arr.map(cardHtml).join("");
      return '<div class="pc-col pc-col-' + side + '">' + inner + '</div>';
    }
    playerCardsEl.innerHTML = col(left, "left") + col(right, "right");
    // Re-apply active highlight (lost on innerHTML rebuild)
    if (gameState.currentPlayer) setActivePlayerCard(gameState.currentPlayer);
  }

  function setActivePlayerCard(name) {
    if (!playerCardsEl) return;
    var cards = playerCardsEl.querySelectorAll(".player-card");
    cards.forEach(function(c) {
      c.classList.toggle("is-active", c.getAttribute("data-name") === name);
    });
  }

  function updateOrbProgress() {
    if (!orbProgressEl) return;
    var total = (gameState.chapters || []).length;
    if (total < 1) return;
    var idx = gameState.chapterIndex || 0;
    var within = Math.min(gameState.turnInChapter || 0, 6) / 6;
    var frac = Math.max(0, Math.min(1, (idx + within) / total));
    orbProgressEl.style.setProperty("--orb-progress", frac);
    if (orbProgressPctEl) orbProgressPctEl.textContent = Math.round(frac * 100) + "%";
  }

  // Expose for debugging / external calls
  window.OrbDynamicUI = { renderPlayerCards: renderPlayerCards, updateOrbProgress: updateOrbProgress, setActivePlayerCard: setActivePlayerCard };

  // --- Wrap existing globals so cards/progress stay in sync without touching engine logic ---
  if (typeof setOrbRevealName === "function") {
    var _setOrbRevealName = setOrbRevealName;
    setOrbRevealName = function(name, mode) {
      _setOrbRevealName(name, mode);
      if (mode === "final" && name) setActivePlayerCard(name);
      updateOrbProgress();
    };
  }
  if (typeof resetGame === "function") {
    var _resetGame = resetGame;
    resetGame = function() {
      var rv = _resetGame.apply(this, arguments);
      renderPlayerCards();
      updateOrbProgress();
      return rv;
    };
  }
  if (typeof advanceChapter === "function") {
    var _advanceChapter = advanceChapter;
    advanceChapter = function() {
      var rv = _advanceChapter.apply(this, arguments);
      updateOrbProgress();
      return rv;
    };
  }

  renderPlayerCards();
})();

// =========================
// TIER 2 — Dare/Truth card + countdown timer
// =========================
(function() {
  var cardEl = document.getElementById("promptCard");
  var tagEl = document.getElementById("promptCardTag");
  var ptsEl = document.getElementById("promptCardPts");
  var timerEl = document.getElementById("promptCardTimer");
  var timeEl = document.getElementById("promptCardTime");
  var timerInt = null;

  function stopTimer() {
    if (timerInt) { clearInterval(timerInt); timerInt = null; }
    if (timerEl) timerEl.classList.remove("is-low");
  }
  function paint(remain) {
    if (!timeEl) return;
    var m = Math.floor(remain / 60), s = remain % 60;
    timeEl.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    if (timerEl) timerEl.classList.toggle("is-low", remain <= 10);
  }
  function startTimer(sec) {
    stopTimer();
    if (!timerEl) return;
    var remain = sec;
    timerEl.classList.remove("is-hidden");
    paint(remain);
    timerInt = setInterval(function() {
      remain -= 1;
      if (remain <= 0) { paint(0); stopTimer(); return; }
      paint(remain);
    }, 1000);
  }

  function updatePromptCard(prompt) {
    if (!cardEl) return;
    if (!prompt) { cardEl.classList.add("is-hidden"); stopTimer(); return; }

    var isGroup = prompt.type === "group";
    var pt = prompt.promptType;
    var label = "Lyra", cls = "";
    if (isGroup) { label = "Group"; cls = "is-group"; }
    else if (pt === "dare") { label = "Dare"; cls = "is-dare"; }
    else if (pt === "truth") { label = "Truth"; cls = "is-truth"; }
    if (tagEl) { tagEl.textContent = label; tagEl.className = "pcard-tag" + (cls ? " " + cls : ""); }

    var intensity = prompt.intensity || 4;
    var pts = Math.round((100 + intensity * 40) / 25) * 25;
    if (ptsEl) ptsEl.textContent = "+" + pts + " pts";

    cardEl.classList.remove("is-hidden");

    if (!isGroup && pt === "dare") {
      startTimer(30);
    } else {
      stopTimer();
      if (timerEl) timerEl.classList.add("is-hidden");
    }
  }
  function hidePromptCard() { if (cardEl) cardEl.classList.add("is-hidden"); stopTimer(); }

  window.OrbPromptCard = { update: updatePromptCard, hide: hidePromptCard };

  if (typeof renderPrompt === "function") {
    var _renderPrompt = renderPrompt;
    renderPrompt = function(prompt, player, target) {
      var rv = _renderPrompt.apply(this, arguments);
      updatePromptCard(prompt);
      return rv;
    };
  }
})();

// =========================
// TIER 3 — tap-to-react emojis
// =========================
(function() {
  var playerCardsEl = document.getElementById("playerCards");
  if (!playerCardsEl) return;
  var EMOJIS = ["😍", "🔥", "👏", "😂", "😮", "💋"];
  var picker = null;

  function closePicker() {
    if (picker) { picker.remove(); picker = null; }
    document.removeEventListener("click", onDocClick, true);
  }
  function onDocClick(e) {
    if (picker && !picker.contains(e.target) && !e.target.closest(".player-card")) closePicker();
  }

  function floatEmoji(emoji, x, y) {
    var el = document.createElement("div");
    el.className = "reaction-float";
    el.textContent = emoji;
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    setTimeout(function() { el.remove(); }, 1250);
  }

  function badgeCard(card, emoji) {
    var old = card.querySelector(".pc-react-badge");
    if (old) old.remove();
    var b = document.createElement("span");
    b.className = "pc-react-badge";
    b.textContent = emoji;
    card.appendChild(b);
    setTimeout(function() { if (b.parentNode === card) b.remove(); }, 3500);
  }

  function openPicker(card) {
    closePicker();
    var rect = card.getBoundingClientRect();
    picker = document.createElement("div");
    picker.className = "reaction-picker";
    EMOJIS.forEach(function(em) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = em;
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        floatEmoji(em, rect.left + rect.width / 2, rect.top);
        badgeCard(card, em);
        closePicker();
      });
      picker.appendChild(btn);
    });
    document.body.appendChild(picker);
    // position: centered above the card, clamped to viewport
    var pr = picker.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    cx = Math.max(pr.width / 2 + 6, Math.min(window.innerWidth - pr.width / 2 - 6, cx));
    var top = rect.top - pr.height - 8;
    if (top < 6) top = rect.bottom + 8; // flip below if no room above
    picker.style.left = cx + "px";
    picker.style.top = top + "px";
    setTimeout(function() { document.addEventListener("click", onDocClick, true); }, 0);
  }

  playerCardsEl.addEventListener("click", function(e) {
    var card = e.target.closest(".player-card");
    if (!card) return;
    e.stopPropagation();
    openPicker(card);
  });
})();

// =========================
// SCORE SYSTEM — points, streaks, stars
// =========================
(function() {
  function pointsFor(prompt) {
    var i = (prompt && prompt.intensity) || 4;
    return Math.round((100 + i * 40) / 25) * 25;
  }
  function findPlayer(name) {
    return (gameState.players || []).filter(function(p) { return p.name === name; })[0];
  }

  // Award points / update streaks when a prompt resolves
  if (typeof recordFeedback === "function") {
    var _recordFeedback = recordFeedback;
    recordFeedback = function(response) {
      var p = findPlayer(gameState.currentPlayer);
      if (p) {
        if (response === "done" || response === "answered") {
          var base = pointsFor(gameState.lastPrompt);
          p.streak = (p.streak || 0) + 1;
          var bonus = p.streak >= 2 ? (p.streak - 1) * 50 : 0; // streak bonus
          p.score = (p.score || 0) + base + bonus;
        } else if (response === "pass" || response === "refused") {
          p.streak = 0;
        }
      }
      var rv = _recordFeedback.apply(this, arguments);
      if (window.OrbDynamicUI) window.OrbDynamicUI.renderPlayerCards();
      return rv;
    };
  }

  // Zero scores when a new game starts (wraps the already-wrapped resetGame)
  if (typeof resetGame === "function") {
    var _resetGameScore = resetGame;
    resetGame = function() {
      (gameState.players || []).forEach(function(p) { p.score = 0; p.streak = 0; });
      return _resetGameScore.apply(this, arguments);
    };
  }
})();

// =========================
// VOTE BUBBLES — floating 1-5 score-calls over voter cards
// =========================
(function() {
  var playerCardsEl = document.getElementById("playerCards");
  function bubble(name, rating) {
    var card = playerCardsEl && playerCardsEl.querySelector('.player-card[data-name="' + (window.CSS && CSS.escape ? CSS.escape(name) : name) + '"]');
    var x, y;
    if (card) {
      var r = card.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    } else {
      x = window.innerWidth / 2;
      y = window.innerHeight / 2;
    }
    var el = document.createElement("div");
    el.className = "vote-bubble";
    if (rating >= 4) el.classList.add("is-high");
    else if (rating <= 2) el.classList.add("is-low");
    el.innerHTML = '<span class="vb-num">' + rating + '!</span><span class="vb-name">' + String(name) + '</span>';
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    setTimeout(function() { el.remove(); }, 1700);
  }
  window.OrbVoteBubble = bubble;
})();
