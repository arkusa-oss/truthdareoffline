
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
if (resetBtn) resetBtn.addEventListener("click", resetGame);
if (typePreferenceEl) typePreferenceEl.addEventListener("change", function(e) { gameState.typePreference = e.target.value; });
document.addEventListener("keydown", function(e) { if (e.code === "Space") { e.preventDefault(); nextTurn(); } });
if (addPlayerBtn) addPlayerBtn.addEventListener("click", addPlayerFromSetup);
if (rulesAcceptBtn) rulesAcceptBtn.addEventListener("click", closeRulesOverlay);

var introOverlayEl = document.getElementById("introOverlay");
var introOverlay2El = document.getElementById("introOverlay2");
var introContinueBtn = document.getElementById("introContinueBtn");
var introContinueBtn2 = document.getElementById("introContinueBtn2");

// Page 1 → Page 2
if (introContinueBtn) {
  introContinueBtn.addEventListener("click", function() {
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
    if (!gameState.players.length) { alert("Add at least one player"); return; }

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
