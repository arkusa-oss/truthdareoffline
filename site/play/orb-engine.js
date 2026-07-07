// =========================
// HELPERS
// =========================

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomFrom(array) {
  if (!array.length) return null;
  return array[Math.floor(Math.random() * array.length)];
}

function capitalize(name) {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Returns the active prompt pool based on game mode
function getPromptPool() {
  return gameState.gameMode === "couple" ? COUPLES_PROMPTS : PROMPTS;
}

// Returns true if current game is couples mode
function isCouplesMode() {
  return gameState.gameMode === "couple";
}

// Profile helper: get a player's score for a dimension (0 if not profiled)
function getProfileScore(playerName, dimension) {
  var profile = gameState.playerProfiles[playerName];
  if (!profile) return 0;
  return profile[dimension] || 0;
}

// Profile helper: get overall "daring" score (risk + boldness + openness, minus boundaries)
function getDaringScore(playerName) {
  return getProfileScore(playerName, "risk") +
         getProfileScore(playerName, "boldness") +
         getProfileScore(playerName, "openness") -
         getProfileScore(playerName, "boundaries") * 0.5;
}

function getCurrentChapter() {
  return gameState.chapters[gameState.chapterIndex];
}

function getChapterConfig(chapter) {
  var base = CHAPTER_CONFIG[chapter] || CHAPTER_CONFIG.playful;
  // In couples mode, use longer stage durations so the game doesn't rush
  if (isCouplesMode() && typeof COUPLES_CHAPTER_CONFIG !== "undefined" && COUPLES_CHAPTER_CONFIG[chapter]) {
    var override = COUPLES_CHAPTER_CONFIG[chapter];
    return Object.assign({}, base, override);
  }
  return base;
}

function getCurrentRole() {
  const chapter = getCurrentChapter();
  const config = getChapterConfig(chapter);
  return config.order[gameState.turnInChapter % config.order.length];
}

function shouldAdvanceChapter() {
  const chapter = getCurrentChapter();
  const config = getChapterConfig(chapter);
  if (gameState.turnInChapter < config.turnsToAdvance) return false;
  // NEVER advance while a chain is active — let it finish
  if (getActiveChainIds().length > 0) return false;
  // Don't advance during post-chain bridge — third player is joining the pair
  if (gameState.postChainBridge) return false;
  // Momentum gate: need positive momentum to advance past flirty
  if (gameState.momentum < 2 && gameState.chapterIndex >= 2) return false;
  // Too many refusals: stay in current chapter
  if (gameState.recentRefusals >= (isCouplesMode() ? 5 : 3)) return false;
  return true;
}

function advanceChapter() {
  if (gameState.chapterIndex < gameState.chapters.length - 1) {
    gameState.chapterIndex += 1;
    gameState.turnInChapter = 0;
    var newChapter = getCurrentChapter();
    document.body.className = "stage-" + newChapter;
    // Transition the atmosphere canvas to the new stage
    if (window.LyraAtmosphere) window.LyraAtmosphere.transitionToStage(newChapter);
    // Music bar label is now managed by OrbMusic — it updates the label
    // only AFTER the new playlist starts playing, so label and audio stay in sync.
    if (typeof OrbMusic !== "undefined" && OrbMusic.isEnabled()) {
      OrbMusic.switchStage(newChapter);
    } else {
      updateMusicBar(newChapter);
    }
    // Show a toast when entering a new stage (if one exists for it)
    maybeShowStageToast();
    // Lyra's memory: snapshot progress at each stage transition
    try { if (typeof LyraMemory !== "undefined") LyraMemory.saveAll(); } catch (e) {}
  }
}

function updateStageLabel() {
  const chapter = getCurrentChapter();
  if (stageLabelEl) stageLabelEl.textContent = chapter;
  if (heatLabelEl) heatLabelEl.textContent = "" + gameState.turnCount;
}

function getPlayerNames() {
  return gameState.players.map(function(p) { return p.name; });
}

function getPlayerByName(name) {
  return gameState.players.find(function(p) { return p.name === name; }) || null;
}

function getOtherPlayerNames(actorName) {
  return getPlayerNames().filter(function(name) { return name !== actorName; });
}

// =========================
// ORB NAME UI
// =========================

function ensureOrbNameRevealEl() {
  if (orbNameRevealEl && document.body.contains(orbNameRevealEl)) return orbNameRevealEl;
  var orbStageEl = document.querySelector(".orb-stage");
  if (!orbStageEl) return null;
  orbNameRevealEl = document.getElementById("orbNameReveal");
  if (!orbNameRevealEl) {
    orbNameRevealEl = document.createElement("div");
    orbNameRevealEl.id = "orbNameReveal";
    orbNameRevealEl.className = "orb-name-reveal";
    orbStageEl.appendChild(orbNameRevealEl);
  }
  return orbNameRevealEl;
}

function buildOrbNameWheel() {
  if (orbNameWheelEl) { orbNameWheelEl.innerHTML = ""; orbNameWheelEl.style.display = "none"; }
  ensureOrbNameRevealEl();
}

function setOrbRevealName(name, mode) {
  var el = ensureOrbNameRevealEl();
  if (!el) return;
  el.classList.remove("is-idle","is-cycling","is-final","is-fading","is-hidden","is-targeting","is-dimming");
  el.textContent = name || "";
  if (!name) { el.classList.add("is-hidden"); return; }
  el.classList.add("is-" + (mode || "idle"));
}

function dimOrbRevealName() {
  var el = ensureOrbNameRevealEl();
  if (!el) return;
  setOrbRevealName(el.textContent || "", "dimming");
}

function pulseOrbSelection() {
  if (orbRingEl) { orbRingEl.classList.remove("orb-select-pulse"); void orbRingEl.offsetWidth; orbRingEl.classList.add("orb-select-pulse"); }
  if (orbInnerGlowEl) { orbInnerGlowEl.style.animation = "none"; void orbInnerGlowEl.offsetWidth; orbInnerGlowEl.style.animation = "orbFlash 1s ease-in-out 1"; }
}

function animateOrbRoulette(finalPlayer, callback) {
  var el = ensureOrbNameRevealEl();
  if (!el) { if (callback) callback(); return; }
  var players = getPlayerNames();
  if (!players.length) { setOrbRevealName(finalPlayer, "final"); if (callback) callback(); return; }
  var index = 0, spins = 0, maxSpins = 14 + Math.floor(Math.random() * 5);
  pulseOrbSelection();

  // Apply blur during cycling based on current chapter
  var chapter = getCurrentChapter();
  var blurLevel = getBlurForChapter(chapter);
  applyPromptBlur(blurLevel);

  function spin() {
    setOrbRevealName(players[index % players.length], "cycling");
    index++; spins++;
    var delay = spins < 8 ? 80 : spins < 12 ? 110 : 150;
    if (spins >= maxSpins) {
      pulseOrbSelection();
      setOrbRevealName(finalPlayer, "final");
      // Animate blur away on final reveal
      setTimeout(function() {
        animatePromptBlurReveal();
        if (callback) callback();
      }, 220);
      return;
    }
    setTimeout(spin, delay);
  }
  spin();
}

function animateTargetRoulette(actor, target, callback) {
  var candidates = getOtherPlayerNames(actor);
  if (!candidates.length) { if (callback) callback(); return; }
  var index = 0, spins = 0, maxSpins = 10 + Math.floor(Math.random() * 4);
  function spin() {
    setOrbRevealName(candidates[index % candidates.length], "targeting");
    index++; spins++;
    if (spins >= maxSpins) { setOrbRevealName(target, "final"); setTimeout(function() { if (callback) callback(); }, 200); return; }
    setTimeout(spin, spins < 6 ? 90 : 130);
  }
  spin();
}

function revealPromptText() {
  if (!promptTextEl) return;
  dimOrbRevealName();
  promptTextEl.style.animation = "none";
  void promptTextEl.offsetWidth;
  promptTextEl.style.opacity = "1";
  promptTextEl.style.animation = "promptReveal 500ms ease forwards";
}

// =========================
// COSMIC HYPNOSIS ANIMATION
// =========================

function drawCosmicSpiral(canvas, ctx, time) {
  var w = canvas.width;
  var h = canvas.height;
  var cx = w / 2;
  var cy = h / 2;
  var maxR = Math.min(w, h) * 0.35;

  // Clear with semi-transparent dark background for motion blur effect
  ctx.fillStyle = "rgba(10, 5, 20, 0.15)";
  ctx.fillRect(0, 0, w, h);

  // Draw rotating spiral arms
  var armCount = 5;
  for (var arm = 0; arm < armCount; arm++) {
    var baseAngle = (time / 2000) + (arm * (Math.PI * 2 / armCount));
    var gradient = ctx.createLinearGradient(cx - 150, cy - 150, cx + 150, cy + 150);
    gradient.addColorStop(0, "rgba(107, 33, 168, 0.6)");
    gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.8)");
    gradient.addColorStop(1, "rgba(13, 148, 136, 0.7)");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    var segments = 60;
    for (var i = 0; i < segments; i++) {
      var angle = baseAngle + (i / segments) * Math.PI * 2;
      var radius = (i / segments) * maxR;
      var x = cx + Math.cos(angle) * radius;
      var y = cy + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Draw star particles drifting outward
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  var particleCount = 40;
  for (var p = 0; p < particleCount; p++) {
    var seed = Math.sin(p * 12.9898 + time / 3000) * 43758.5453;
    var seedInt = Math.floor(seed) % 360;
    var particleTime = time / 8000 + p * 0.3;
    var angle = (seedInt * Math.PI / 180) + (particleTime * 2);
    var distanceFactor = (particleTime % 1);
    var radius = maxR * 0.4 + maxR * 0.5 * distanceFactor;
    var opacity = Math.max(0, 1 - distanceFactor);
    var size = 1.5 + Math.sin(time / 500 + p) * 0.8;
    ctx.globalAlpha = opacity * 0.8;
    ctx.fillRect(
      cx + Math.cos(angle) * radius - size / 2,
      cy + Math.sin(angle) * radius - size / 2,
      size, size
    );
  }
  ctx.globalAlpha = 1;

  // Draw pulsing center orb
  var orbRadius = 20 + Math.sin(time / 400) * 8;
  var orbGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbRadius * 1.5);
  orbGradient.addColorStop(0, "rgba(220, 20, 100, 0.95)");
  orbGradient.addColorStop(0.5, "rgba(124, 58, 237, 0.6)");
  orbGradient.addColorStop(1, "rgba(13, 148, 136, 0.2)");
  ctx.fillStyle = orbGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, orbRadius, 0, Math.PI * 2);
  ctx.fill();

  // Glow rings around center
  ctx.strokeStyle = "rgba(13, 148, 136, 0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, orbRadius * 1.3, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(124, 58, 237, 0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, orbRadius * 1.8, 0, Math.PI * 2);
  ctx.stroke();
}

function showHypnosisWheel(message) {
  // Inline stage transition effect — orb blooms and message shows in prompt area
  if (orbRingEl) orbRingEl.classList.add("orb-spinner-active");
  if (promptTextEl) {
    promptTextEl.textContent = message;
    promptTextEl.style.opacity = "0.8";
    promptTextEl.style.filter = "blur(1px)";
    promptTextEl.style.transition = "opacity 0.5s ease, filter 0.5s ease";
  }
  setOrbRevealName("LYRA", "cycling");

  setTimeout(function() {
    if (orbRingEl) orbRingEl.classList.remove("orb-spinner-active");
    if (promptTextEl) {
      promptTextEl.style.opacity = "0";
      promptTextEl.style.filter = "blur(8px)";
    }
    setTimeout(function() {
      if (promptTextEl) {
        promptTextEl.style.opacity = "1";
        promptTextEl.style.filter = "blur(0)";
      }
    }, 400);
  }, 3000);
}

function applyPromptBlur(blurLevel) {
  if (!promptTextEl) return;
  promptTextEl.classList.remove("prompt-blur-heavy", "prompt-blur-light", "prompt-blur-none");
  if (blurLevel === "heavy") promptTextEl.classList.add("prompt-blur-heavy");
  else if (blurLevel === "light") promptTextEl.classList.add("prompt-blur-light");
  else promptTextEl.classList.add("prompt-blur-none");
}

function getBlurForChapter(chapter) {
  if (chapter === "playful" || chapter === "personal") return "heavy";
  if (chapter === "flirty") return "heavy";
  if (chapter === "suggestive") return "light";
  return "none";
}

function animatePromptBlurReveal() {
  if (!promptTextEl) return;
  promptTextEl.classList.remove("prompt-blur-heavy", "prompt-blur-light");
  promptTextEl.classList.add("prompt-blur-none");
}

// =========================
// PLAYER SETUP
// =========================

function updateModeIndicator() {
  var modeValueEl = document.getElementById("setupModeValue");
  var count = gameState.players.length;
  var seducerField = null;
  try { seducerField = document.querySelector(".setup-field:has(#playerSeducerInput)"); } catch (e) {}
  if (!seducerField) {
    // Fallback: find the label wrapping the seducer checkbox
    var seducerLabel = document.querySelector('label[for="playerSeducerInput"]');
    if (seducerLabel) seducerField = seducerLabel.closest(".setup-field");
  }

  var coupleTypeEl = document.getElementById("setupCoupleType");
  if (count === 0) {
    if (modeValueEl) modeValueEl.textContent = "Add players to begin";
    if (modeValueEl) modeValueEl.className = "setup-mode-value";
    if (seducerField) seducerField.style.display = "";
    if (coupleTypeEl) coupleTypeEl.style.display = "none";
  } else if (count === 1) {
    if (modeValueEl) modeValueEl.textContent = "Add one more for Couple Mode, or more for Group Mode";
    if (modeValueEl) modeValueEl.className = "setup-mode-value";
    if (seducerField) seducerField.style.display = "";
    if (coupleTypeEl) coupleTypeEl.style.display = "none";
  } else if (count === 2) {
    if (modeValueEl) { modeValueEl.textContent = "Couple Mode"; modeValueEl.className = "setup-mode-value mode-couple"; }
    if (seducerField) seducerField.style.display = "none";
    if (coupleTypeEl) coupleTypeEl.style.display = "";
  } else {
    if (modeValueEl) { modeValueEl.textContent = "Group Mode (" + count + " players)"; modeValueEl.className = "setup-mode-value mode-group"; }
    if (seducerField) seducerField.style.display = "";
    if (coupleTypeEl) coupleTypeEl.style.display = "none";
  }

  // Also hide/show seducer checkboxes in the player list rows
  var seducerToggles = document.querySelectorAll(".setup-seducer-toggle");
  seducerToggles.forEach(function(el) { el.style.display = (count === 2) ? "none" : ""; });
  var seducerBadges = document.querySelectorAll(".setup-seducer-badge");
  seducerBadges.forEach(function(el) { el.style.display = (count === 2) ? "none" : ""; });
}

function initCoupleTypeButtons() {
  var btns = document.querySelectorAll(".couple-type-btn");
  btns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      gameState.coupleType = btn.dataset.coupleType;
      btns.forEach(function(b) { b.classList.remove("active"); });
      btn.classList.add("active");
    });
  });
}

function getNextPlayerId() {
  if (!gameState.players.length) return 1;
  return Math.max.apply(null, gameState.players.map(function(p) { return p.id || 0; })) + 1;
}

function clearSetupInputs() {
  if (playerNameInputEl) playerNameInputEl.value = "";
  if (playerGenderInputEl) playerGenderInputEl.value = "male";
  if (playerPartnerInputEl) playerPartnerInputEl.value = "";
  if (addPlayerBtn) addPlayerBtn.classList.remove("is-ready");
}

function refreshPartnerOptions() {
  if (!playerPartnerInputEl) return;
  var currentValue = playerPartnerInputEl.value;
  playerPartnerInputEl.innerHTML = '<option value="">None</option>';
  gameState.players.forEach(function(player) {
    var option = document.createElement("option");
    option.value = String(player.id);
    option.textContent = player.name;
    playerPartnerInputEl.appendChild(option);
  });
  var found = false;
  for (var i = 0; i < playerPartnerInputEl.options.length; i++) {
    if (playerPartnerInputEl.options[i].value === currentValue) { found = true; break; }
  }
  playerPartnerInputEl.value = found ? currentValue : "";
}

function renderSetupPlayerList() {
  if (!setupPlayerListEl) return;
  if (!gameState.players.length) {
    setupPlayerListEl.innerHTML = '<div class="setup-player-row"><div class="setup-player-sub">No players added yet.</div></div>';
    return;
  }
  setupPlayerListEl.innerHTML = "";
  gameState.players.forEach(function(player) {
    var partner = player.partnerId != null ? gameState.players.find(function(p) { return p.id === player.partnerId; }) : null;
    var row = document.createElement("div");
    row.className = "setup-player-row";
    var seducerIndicator = player.isSeducer ? '<span class="setup-seducer-badge">Seducer</span>' : '';
    var rememberedIndicator = player.remembered ? '<span class="setup-remembered-badge" title="Lyra has played with you before">Lyra remembers</span>' : '';
    row.innerHTML = '<div class="setup-player-meta"><div class="setup-player-name">' + player.name + rememberedIndicator + '</div><div class="setup-player-sub">' + player.gender + (partner ? ' &bull; Partner: ' + partner.name : '') + seducerIndicator + '</div></div><div class="setup-player-controls"><label class="setup-seducer-toggle"><input type="checkbox" data-player-id="' + player.id + '" class="setup-seducer-checkbox"' + (player.isSeducer ? ' checked' : '') + ' /> Seducer</label><button type="button" class="setup-remove-btn" data-player-id="' + player.id + '">Remove</button></div>';
    setupPlayerListEl.appendChild(row);
  });
  setupPlayerListEl.querySelectorAll(".setup-seducer-checkbox").forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
      var playerId = Number(checkbox.dataset.playerId);
      var isChecked = checkbox.checked;
      // Only one seducer allowed
      if (isChecked) {
        gameState.players.forEach(function(p) { p.isSeducer = false; });
      }
      var targetPlayer = gameState.players.find(function(p) { return p.id === playerId; });
      if (targetPlayer) targetPlayer.isSeducer = isChecked;
      renderSetupPlayerList();
    });
  });
  setupPlayerListEl.querySelectorAll(".setup-remove-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var playerId = Number(btn.dataset.playerId);
      gameState.players = gameState.players.filter(function(p) { return p.id !== playerId; });
      gameState.players = gameState.players.map(function(p) {
        if (p.partnerId === playerId) return Object.assign({}, p, { partnerId: null, partner: null });
        return p;
      });
      refreshPartnerOptions();
      renderSetupPlayerList();
      updateModeIndicator();
    });
  });
}

function getPronouns(gender) {
  if (gender === "male") return { subject: "he", object: "him", possessive: "his" };
  if (gender === "female") return { subject: "she", object: "her", possessive: "her" };
  return { subject: "they", object: "them", possessive: "their" };
}

function addPlayerFromSetup() {
  var name = (playerNameInputEl ? playerNameInputEl.value : "").trim();
  var gender = (playerGenderInputEl ? playerGenderInputEl.value : "other").toLowerCase();
  var partnerId = playerPartnerInputEl && playerPartnerInputEl.value ? Number(playerPartnerInputEl.value) : null;
  if (!name) return;
  var duplicate = gameState.players.some(function(p) { return (p.name || "").toLowerCase() === name.toLowerCase(); });
  if (duplicate) return;

  // Check if seducer checkbox is present and checked
  var seducerCheckbox = document.getElementById("playerSeducerInput");
  var isSeducer = seducerCheckbox && seducerCheckbox.checked;

  var pronouns = getPronouns(gender);
  var newPlayer = { id: getNextPlayerId(), name: name, gender: gender, pronouns: pronouns, partnerId: partnerId || null, partner: null, isSeducer: isSeducer || false, score: 0, streak: 0 };
  if (partnerId) {
    var partnerObj = gameState.players.find(function(p) { return p.id === partnerId; });
    if (partnerObj) newPlayer.partner = partnerObj.name;
  }

  // Only one player can be the seducer — clear from others if this one is marked
  if (isSeducer) {
    gameState.players.forEach(function(p) { p.isSeducer = false; });
  }

  gameState.players.push(newPlayer);
  if (partnerId) {
    gameState.players = gameState.players.map(function(p) {
      if (p.id === partnerId) return Object.assign({}, p, { partnerId: newPlayer.id, partner: newPlayer.name });
      return p;
    });
  }

  // Lyra's memory: rehydrate if she has seen this player before
  try {
    if (typeof LyraMemory !== "undefined" && LyraMemory.hasPlayer(name)) {
      var rec = LyraMemory.restoreInto(name);
      newPlayer.remembered = true;
      newPlayer.rememberedNights = (rec && rec.nightsPlayed) || 1;
    }
  } catch (e) { console.warn("LyraMemory restore failed", e); }

  refreshPartnerOptions();
  renderSetupPlayerList();
  updateModeIndicator();
  clearSetupInputs();
  if (playerNameInputEl) playerNameInputEl.focus();
}

function openSetupOverlay() {
  if (setupOverlayEl) { setupOverlayEl.classList.remove("is-hidden"); document.body.classList.add("setup-open"); }
  // Hide rules overlay if it's still showing
  if (rulesOverlayEl) rulesOverlayEl.classList.add("is-hidden");
  renderSetupPlayerList();
  refreshPartnerOptions();
}

function closeSetupOverlay() {
  if (setupOverlayEl) { setupOverlayEl.classList.add("is-hidden"); document.body.classList.remove("setup-open"); }
}

// =========================
// FEEDBACK PANEL
// =========================

function getFeedbackPanelButtonsWrap() {
  if (!feedbackPanelEl) return null;
  var wrap = feedbackPanelEl.querySelector(".feedback-buttons");
  if (!wrap) { wrap = document.createElement("div"); wrap.className = "feedback-buttons"; feedbackPanelEl.appendChild(wrap); }
  return wrap;
}

function clearFeedbackButtons() {
  var wrap = getFeedbackPanelButtonsWrap();
  if (wrap) wrap.innerHTML = "";
}

function setLegacyFeedbackButtonsHidden(hidden) {
  [yesBtn, noBtn, passBtn].forEach(function(btn) { if (btn) btn.style.display = hidden ? "none" : ""; });
}

function createFeedbackButton(label, value, onClick) {
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "feedback-btn feedback-" + value;
  btn.textContent = label;
  btn.addEventListener("click", onClick);
  return btn;
}

function inferResponseMode(prompt) {
  if (!prompt) return "continue";
  if (prompt.type === "group") {
    // Group dares get DONE/REFUSED/PASS; group truths get ANSWERED/PASS
    return (prompt.promptType === "dare") ? "done_refused_pass" : "answered_pass";
  }
  if (prompt.type === "self" || prompt.type === "directed") return "done_refused_pass";
  return "continue";
}

function renderResponseOptions(prompt) {
  if (!feedbackPanelEl) return;
  clearFeedbackButtons();
  var wrap = getFeedbackPanelButtonsWrap();
  if (!wrap) return;
  wrap.innerHTML = "";
  var mode = inferResponseMode(prompt);
  if (mode === "done_refused_pass") {
    wrap.appendChild(createFeedbackButton("DONE", "done", function() { recordFeedback("done"); }));
    wrap.appendChild(createFeedbackButton("REFUSED", "refused", function() { recordFeedback("refused"); }));
    wrap.appendChild(createFeedbackButton("PASS", "pass", function() { recordFeedback("pass"); }));
  } else {
    wrap.appendChild(createFeedbackButton("ANSWERED", "answered", function() { recordFeedback("answered"); }));
    wrap.appendChild(createFeedbackButton("PASS", "pass", function() { recordFeedback("pass"); }));
  }
  feedbackPanelEl.classList.remove("is-hidden");
}

function showFeedbackPanel(prompt) {
  if (!feedbackPanelEl || !prompt) return;
  setLegacyFeedbackButtonsHidden(true);
  renderResponseOptions(prompt);
}

function hideFeedbackPanel() {
  if (feedbackPanelEl) feedbackPanelEl.classList.add("is-hidden");
  clearFeedbackButtons();
  setLegacyFeedbackButtonsHidden(false);
}

// =========================
// PLAYER / TARGET ROTATION
// =========================

function chooseNextPlayer() {
  var players = gameState.players;
  if (!players.length) return null;

  // Seducer weighting system: seducer gets more turns as the game escalates
  var chapter = getCurrentChapter();
  var seducerWeightBonus = 0;

  // Seducer takes the lead — they get significantly more turns at every stage.
  // Base weight for non-seducers is 3, so a +4 bonus means seducer is ~2.3× more likely.
  if (chapter === "personal") seducerWeightBonus = 2;
  else if (chapter === "playful") seducerWeightBonus = 3;
  else if (chapter === "flirty") seducerWeightBonus = 4;
  else if (chapter === "suggestive") seducerWeightBonus = 5;
  else if (chapter === "intimate") seducerWeightBonus = 6;
  else if (chapter === "erotic") seducerWeightBonus = 7;
  else if (chapter === "taboo") seducerWeightBonus = 8;

  // Anti-repeat: max 2 consecutive turns for the same player.
  // After 2 in a row, force a different player.
  var maxConsecutive = 2;
  var mustExclude = null;
  if (gameState.lastActor && gameState.consecutiveActorCount >= maxConsecutive) {
    mustExclude = gameState.lastActor;
  }

  // Build weighted selection pool
  var weighted = [];
  players.forEach(function(player) {
    // Skip the excluded player (hit consecutive limit)
    if (mustExclude && player.name === mustExclude) return;

    var weight = 3; // base weight for fair distribution

    if (player.isSeducer && seducerWeightBonus > 0) {
      weight += seducerWeightBonus;
    }

    // Penalise the last actor to reduce back-to-back even below the hard cap
    if (gameState.lastActor === player.name) {
      weight = Math.max(1, weight - 2);
    }

    for (var i = 0; i < weight; i++) {
      weighted.push(player);
    }
  });

  // Fallback: if exclusion emptied the pool (only 1 player), allow anyone
  if (!weighted.length) {
    weighted = players.slice();
  }

  // Random selection from weighted pool
  var selectedPlayer = randomFrom(weighted);
  var selectedIndex = players.indexOf(selectedPlayer);
  gameState.currentPlayerIndex = selectedIndex;
  gameState.currentPlayer = selectedPlayer.name;

  // Update consecutive tracking
  if (selectedPlayer.name === gameState.lastActor) {
    gameState.consecutiveActorCount += 1;
  } else {
    gameState.consecutiveActorCount = 1;
  }
  gameState.lastActor = selectedPlayer.name;

  return selectedPlayer.name;
}

function chooseTarget(actorName, prompt) {
  var actorObj = getPlayerByName(actorName);
  if (!actorObj) return null;
  var others = getOtherPlayerNames(actorName);
  if (!others.length) return null;

  var text = (prompt && prompt.text ? prompt.text : "").toLowerCase();
  var isPartnerPrompt = text.indexOf("{partner}") >= 0 || text.indexOf("partner") >= 0;
  if (isPartnerPrompt && actorObj.partner && others.indexOf(actorObj.partner) >= 0) {
    return actorObj.partner;
  }

  // Gender-targeted prompts: filter candidates by target_gender if specified
  if (prompt && prompt.target_gender) {
    var genderFiltered = others.filter(function(name) {
      var p = getPlayerByName(name);
      return p && p.gender === prompt.target_gender;
    });
    if (genderFiltered.length) others = genderFiltered;
  }

  // Undress prompts aimed at the target: skip players already fully undressed
  var undressInfo = getPromptUndressInfo(prompt);
  if (undressInfo && (undressInfo.subject === "target" || undressInfo.subject === "both") && gameState.memory.fullyUndressed) {
    var dressed = others.filter(function(name) { return !gameState.memory.fullyUndressed[name]; });
    if (dressed.length) others = dressed;
  }

  // Count how many times each player has been targeted recently (last 10)
  var recentCounts = {};
  others.forEach(function(name) { recentCounts[name] = 0; });
  gameState.recentTargets.forEach(function(t) {
    if (recentCounts[t] !== undefined) recentCounts[t] += 1;
  });

  // Find who has been targeted the LEAST — favour them for variety
  var minRecent = Math.min.apply(null, others.map(function(n) { return recentCounts[n]; }));

  var weighted = [];
  others.forEach(function(name) {
    var weight = 6;

    // Penalise the last target heavily to avoid back-to-back
    if (gameState.lastResolvedTarget === name) weight -= 4;

    // Penalise recently-targeted players, but boost under-targeted ones
    var recentCount = recentCounts[name];
    weight -= recentCount * 2;
    if (recentCount === minRecent) weight += 2; // variety bonus

    // Affinity: very soft influence — cap at +1 so couples don't dominate
    var key = [actorName, name].sort().join("|");
    var affinity = gameState.pairAffinity[key] || 0;
    weight += Math.min(affinity, 1);

    // Partner penalty: this is a seduction game — couples should interact with OTHERS more
    // The game is about pushing boundaries, so cross-couple pairings are more interesting
    if (actorObj.partner === name && others.length >= 2) {
      // Strong base penalty: couples are already comfortable together — push them apart
      weight -= 3;
      // Extra penalty if they've been paired recently
      var partnerRecent = gameState.recentTargets.slice(-8).filter(function(t) { return t === name; }).length;
      if (partnerRecent >= 1) weight -= 2; // even once recently = extra penalty
      if (partnerRecent >= 2) weight -= 2; // twice = very strong penalty
    }

    // Cross-couple bonus: non-partners get a small boost to encourage mixing
    if (actorObj.partner && actorObj.partner !== name && others.length >= 2) {
      weight += 1;
    }

    // SEDUCER BIAS: Scale targeting based on who's acting and who's potential target
    var chapter = getCurrentChapter();
    var stageIndex = CHAPTER_ORDER.indexOf(chapter);
    var seducerStageMultiplier = Math.max(1, stageIndex / 3); // scales from 1 in early stages to ~2.3 in taboo

    var seducerObj = gameState.players.find(function(p) { return p.isSeducer; });
    if (seducerObj) {
      if (actorObj.isSeducer) {
        // Seducer acting: prefer non-partner targets (push boundaries)
        var targetObj = getPlayerByName(name);
        var bonus = Math.round(2 * seducerStageMultiplier);
        if (targetObj && (!actorObj.partner || actorObj.partner !== name)) {
          weight += bonus; // non-partners get big boost
        } else if (targetObj && actorObj.partner === name) {
          weight += Math.round(1 * seducerStageMultiplier); // partner still gets small boost
        }
      } else if (seducerObj.name === name) {
        // Non-seducer acting: seducer is frequent target (center of attention)
        var bonus = Math.round(2 * seducerStageMultiplier);
        weight += bonus;
      }
    }

    // VULNERABILITY BIAS: Lyra targets the most guarded players
    // Players who have revealed less get targeted more (Lyra wants to crack them open)
    var avgVuln = 0;
    gameState.players.forEach(function(p) { avgVuln += getVulnerability(p.name); });
    avgVuln = avgVuln / Math.max(1, gameState.players.length);
    var playerVuln = getVulnerability(name);
    if (playerVuln < avgVuln) weight += 2; // less open than average — target them
    if (playerVuln < avgVuln - 2) weight += 1; // significantly guarded — extra pressure

    // EXPOSURE BALANCE: if this player has removed significantly more clothing than others,
    // heavily penalize targeting them so the game spreads exposure across players.
    var myClothing = (gameState.memory.clothingRemoved[name] || []).length;
    var avgClothing = 0;
    gameState.players.forEach(function(p) { avgClothing += (gameState.memory.clothingRemoved[p.name] || []).length; });
    avgClothing = avgClothing / Math.max(1, gameState.players.length);
    if (myClothing > avgClothing)     weight -= 2;  // even slightly more exposed
    if (myClothing > avgClothing + 1) weight -= 3;  // notably more exposed
    if (myClothing > avgClothing + 2) weight -= 4;  // significantly more exposed
    if (myClothing > avgClothing + 3) weight = 0;   // hard cap — basically excluded
    // Conversely, the LEAST-exposed player gets a strong target boost
    var leastClothing = 999;
    gameState.players.forEach(function(p) {
      var c = (gameState.memory.clothingRemoved[p.name] || []).length;
      if (c < leastClothing) leastClothing = c;
    });
    if (myClothing === leastClothing && myClothing < avgClothing) weight += 3;

    // PROFILE-DRIVEN TARGETING: in later stages, players with higher daring scores
    // get targeted more (they've shown they can handle it). Players with high boundaries
    // get slightly protected.
    if (chapter !== "playful" && chapter !== "personal") {
      var daring = getDaringScore(name);
      if (daring > 2) weight += 1;   // adventurous: slightly more targeted
      if (daring > 4) weight += 1;   // very adventurous: more targeted
      if (daring < -1) weight -= 1;  // guarded: slightly protected
    }

    weight = Math.max(1, weight);
    for (var i = 0; i < weight; i++) weighted.push(name);
  });
  return randomFrom(weighted) || randomFrom(others);
}

// =========================
// CHAIN SYSTEM
// =========================

function startChain(chainId, actor, target) {
  gameState.activeChains[chainId] = { step: 1, actor: actor, target: target, passes: 0 };
  gameState.recentChains.push(chainId);
  if (gameState.recentChains.length > 8) gameState.recentChains.shift();
}

function progressChain(chainId) {
  if (!gameState.activeChains[chainId]) return;
  gameState.activeChains[chainId].step += 1;
  gameState.activeChains[chainId].passes = 0; // reset passes on successful step
}

// Skip to next chain step (on pass — gives the chain a second chance instead of killing it)
function skipChainStep(chainId) {
  if (!gameState.activeChains[chainId]) return;
  var chain = gameState.activeChains[chainId];
  chain.passes += 1;
  var chapter = getCurrentChapter();
  // In taboo/erotic: chains are the core content — never kill from passes, just skip steps
  // In other stages: allow 2 passes before killing (was 1)
  var maxPasses = (chapter === "taboo" || chapter === "erotic") ? 99 : 3;
  if (chain.passes >= maxPasses) { endChain(chainId); return; }
  chain.step += 1; // skip to next step
}

function endChain(chainId) {
  var chain = gameState.activeChains[chainId];
  if (chain) {
    // Post-chain cooldown: reduce pair affinity so the same pair doesn't keep getting picked
    var key = [chain.actor, chain.target].sort().join("|");
    gameState.pairAffinity[key] = Math.max(0, (gameState.pairAffinity[key] || 0) - 2);
    // Track when last chain ended to prevent back-to-back chains
    gameState.lastChainEndTurn = gameState.turnCount;
    // If this was a jealousy test chain, release the trio — otherwise a chain
    // killed by passes leaves jealousyTestActive set and blocks all future tests
    var jt = gameState.jealousyTestActive;
    if (jt && jt.chainId === chainId) {
      if (!gameState.jealousyTested[jt.jealousPlayer]) gameState.jealousyTested[jt.jealousPlayer] = [];
      if (gameState.jealousyTested[jt.jealousPlayer].indexOf(chainId) < 0) {
        gameState.jealousyTested[jt.jealousPlayer].push(chainId);
      }
      gameState.jealousyTestActive = null;
    }

    // Post-chain BRIDGE: a third player joins the chain pair to maintain energy.
    // Pick a third player who is NOT the actor or target.
    var chainActor = chain.actor;
    var chainTarget = chain.target;
    var chapter = getCurrentChapter();
    var otherPlayers = gameState.players.filter(function(p) {
      return p.name !== chainActor && p.name !== chainTarget;
    });

    if (otherPlayers.length > 0 && BRIDGE_TEMPLATES[chapter]) {
      var thirdPlayer = randomFrom(otherPlayers);
      var templates = BRIDGE_TEMPLATES[chapter];
      gameState.postChainBridge = {
        actor: chainActor,
        target: chainTarget,
        third: thirdPlayer.name,
        step: 0,
        maxSteps: templates.length,
        intensity: templates[0].intensity,
        chapter: chapter
      };
    }
    // Boost momentum after completing a chain (reward engagement)
    gameState.momentum = Math.min(10, gameState.momentum + 2);
  }
  delete gameState.activeChains[chainId];
}

function getActiveChainIds() {
  return Object.keys(gameState.activeChains);
}

// =========================
// PROMPT SELECTION
// =========================

function wasRecentlyUsedPrompt(promptId) {
  // In late stages, check full completed list to prevent any repeats
  var chapter = getCurrentChapter();
  if (chapter === "erotic" || chapter === "taboo" || chapter === "intimate") {
    return gameState.completedPromptIds.indexOf(promptId) >= 0;
  }
  return gameState.recentPromptIds.indexOf(promptId) >= 0;
}

function markPromptUsed(promptId) {
  gameState.completedPromptIds.push(promptId);
  gameState.recentPromptIds.push(promptId);
  // Larger memory window prevents repetition (was 20, now scales with stage)
  var chapter = getCurrentChapter();
  var maxRecent = (chapter === "erotic" || chapter === "taboo") ? 60 : 40;
  if (gameState.recentPromptIds.length > maxRecent) gameState.recentPromptIds.shift();
}

function findChainContinuation() {
  var activeChainIds = getActiveChainIds();
  if (!activeChainIds.length) return null;
  var chainId = activeChainIds[0];
  var active = gameState.activeChains[chainId];
  if (!active) return null;
  var chapter = getCurrentChapter();
  // Find the current step — skipping steps that would contradict clothing
  // state (e.g. "remove one item" aimed at someone already fully undressed).
  var prompt = null;
  var guard = 0;
  while (!prompt && guard++ < 12) {
    for (var i = 0; i < getPromptPool().length; i++) {
      var p = getPromptPool()[i];
      if (p.chapter === chapter && p.chain_id === chainId && p.chain_step === active.step) { prompt = p; break; }
    }
    if (!prompt) break;
    var uInfo = getPromptUndressInfo(prompt);
    if (uInfo && gameState.memory.fullyUndressed) {
      var uNames = uInfo.subject === "both" ? [active.actor, active.target]
        : [uInfo.subject === "actor" ? active.actor : active.target];
      var uBlocked = uNames.some(function (n) { return n && gameState.memory.fullyUndressed[n]; });
      if (uBlocked) {
        prompt = null;
        active.step += 1; // skip this step, try the next
        continue;
      }
    }
  }
  if (!prompt) { endChain(chainId); return null; }

  var actor = active.actor;
  var target = active.target;

  // JEALOUSY CHAIN: some steps swap who acts on whom
  if (prompt._jealousyChain && gameState.jealousyTestActive) {
    var jt = gameState.jealousyTestActive;
    if (prompt._askJealous) {
      // This step targets the jealous player — they answer a truth
      actor = jt.jealousPlayer;
      target = jt.seducer; // not really used, but keeps context
    } else if (prompt._kissJealousPlayer) {
      // Seducer kisses the jealous player (not their partner)
      actor = jt.seducer;
      target = jt.jealousPlayer;
    } else if (prompt._reclaimKiss) {
      // The partner reclaims — kisses the jealous player
      actor = jt.partner;
      target = jt.jealousPlayer;
    }
  }

  return { prompt: prompt, actor: actor, target: target, chainId: chainId };
}

// Gender filter: checks if current actor can use this prompt
function promptMatchesGender(prompt, actorName) {
  if (!prompt.actor_gender && !prompt.target_gender) return true; // no gender constraint
  var actorObj = getPlayerByName(actorName);
  if (!actorObj) return true;
  // Check actor gender constraint
  if (prompt.actor_gender && actorObj.gender !== prompt.actor_gender) return false;
  // Check if there's a valid target with the required gender
  if (prompt.target_gender) {
    var hasTarget = gameState.players.some(function(p) {
      return p.name !== actorName && p.gender === prompt.target_gender;
    });
    if (!hasTarget) return false;
  }
  return true;
}

// Theme keywords for anti-repetition — prompts matching recent themes get deprioritized
var THEME_KEYWORDS = {
  dance:      /\b(danc|slow danc|sway|lap danc|belly danc)\b/i,
  walk:       /\b(walk|runway|catwalk|strut|sashay)\b/i,
  compliment: /\b(compliment|flatter|say something nice|praise)\b/i,
  impression: /\b(impression|impersonat|imitat|pretend to be|act like)\b/i,
  embarrass:  /\b(embarrass|cringe|awkward|humiliat|shameful)\b/i,
  confession: /\b(confess|admit|secret|never told|guilty)\b/i,
  kiss:       /\b(kiss|lips|peck|smooch)\b/i,
  touch:      /\b(caress|stroke|massage|rub|trace.*finger|hand.*on)\b/i,
  whisper:    /\b(whisper|ear|lean.*close.*say)\b/i,
  eyecontact: /\b(eye contact|stare|gaze|look into.*eyes)\b/i,
  clothing:   /\b(remov|take off|undress|strip|lose.*item)\b/i,
  drink:      /\b(drink|shot|sip|toast|chug)\b/i,
  rank:       /\b(rank|rate|score|on a scale)\b/i,
  story:      /\b(story|tell.*about a time|describe a time|remember when)\b/i
};

function getPromptThemes(text) {
  var themes = [];
  var keys = Object.keys(THEME_KEYWORDS);
  for (var i = 0; i < keys.length; i++) {
    if (THEME_KEYWORDS[keys[i]].test(text)) themes.push(keys[i]);
  }
  return themes;
}

function getRecentThemes(count) {
  var recent = gameState.completedPromptIds.slice(-(count || 3));
  var themes = {};
  for (var i = 0; i < recent.length; i++) {
    for (var j = 0; j < getPromptPool().length; j++) {
      if (getPromptPool()[j].id === recent[i]) {
        var t = getPromptThemes(getPromptPool()[j].text);
        for (var k = 0; k < t.length; k++) themes[t[k]] = true;
        break;
      }
    }
  }
  return Object.keys(themes);
}

// Pick from pool avoiding recent themes when possible
function themeAwareRandom(pool) {
  if (pool.length <= 1) return pool[0] || null;
  var recentThemes = getRecentThemes(3);
  if (!recentThemes.length) return randomFrom(pool);

  // Split into "fresh" (no theme overlap) and "stale" (matches recent theme)
  var fresh = [];
  var stale = [];
  for (var i = 0; i < pool.length; i++) {
    var themes = getPromptThemes(pool[i].text);
    var overlaps = false;
    for (var j = 0; j < themes.length; j++) {
      if (recentThemes.indexOf(themes[j]) >= 0) { overlaps = true; break; }
    }
    if (overlaps) stale.push(pool[i]);
    else fresh.push(pool[i]);
  }

  // Prefer fresh prompts (90%), fall back to stale if no fresh options
  if (fresh.length && Math.random() < 0.9) return randomFrom(fresh);
  return randomFrom(pool);
}

// =========================
// CLOTHING-STATE CONTINUITY (strategy B)
// Prevents logical contradictions like "remove your top" after a full strip.
// Couples mode: actor = current player, target = the partner.
// =========================
function getPromptUndressInfo(prompt) {
  if (!prompt || prompt.promptType !== "dare" || !prompt.text) return null;
  var t = prompt.text.toLowerCase();
  // Must describe an act of undressing...
  if (!/\b(undress|strip|take off|takes off|peel off|slip out of|remove)\b/.test(t)) return null;
  // ...and reference a garment / nudity (so "remove the blindfold" doesn't match).
  if (!/\b(undress|strip|naked|nude|layer|clothes|clothing|shirt|top|bra|pants|trousers|dress|skirt|underwear|underthings|piece|garment|shoe|sock)\b/.test(t)) return null;
  // Who gets undressed? "{actor}, undress {target}" / "make {target} strip" -> the target.
  // "you and {target} each remove..." -> both. Otherwise the actor.
  var subject = "actor";
  if (/\b(each|both)\b[^.]{0,40}\b(remove|take off|strip|undress)|\b(remove|take off|strip|undress)\b[^.]{0,25}\beach\b/.test(t)) {
    subject = "both";
  } else if (/(undress|strip)\s+\{target\}|\{target\}[^.]{0,30}(strip|undress|take off|remove)|(make|have)\s+\{target\}[^.]{0,20}(strip|undress|take off|remove)/.test(t)) {
    subject = "target";
  }
  // Does it reach full nudity?
  var makesFull = /\b(fully|completely|all the way|naked|nude|final layer|last layer|every (last )?(piece|layer)|nothing left)\b/.test(t);
  return { isUndress: true, subject: subject, makesFull: makesFull };
}

function undressSubjectName(prompt, actorName) {
  var info = getPromptUndressInfo(prompt);
  if (!info) return null;
  if (info.subject === "actor") return actorName;
  // Target subject: at completion time the resolved target is recorded;
  // fall back to the only other player (couples).
  if (gameState.lastResolvedTarget && gameState.lastResolvedTarget !== actorName) {
    return gameState.lastResolvedTarget;
  }
  var others = getOtherPlayerNames(actorName);
  return others.length === 1 ? others[0] : null;
}

// True if showing this prompt would contradict a player's known clothing state.
// Couples-only: target is the single partner, so the subject is deterministic.
function clothingContradiction(prompt, actorName) {
  var info = getPromptUndressInfo(prompt);
  if (!info) return false;
  if (!gameState.memory.fullyUndressed) return false;
  // Actor-subject (and both-subject) prompts: check the actor. Target-subject:
  // in couples the partner is known; in group mode the target isn't chosen
  // yet, so chooseTarget filters fully-undressed candidates instead.
  if (info.subject === "actor" || info.subject === "both") {
    if (gameState.memory.fullyUndressed[actorName]) return true;
    if (info.subject === "actor") return false;
  }
  if (isCouplesMode()) {
    var others = getOtherPlayerNames(actorName);
    var partner = others.length === 1 ? others[0] : null;
    return !!(partner && gameState.memory.fullyUndressed[partner]);
  }
  return false;
}

// Record clothing state when an undress prompt is actually completed.
// Works in both modes; group mode also tracks spinner outcomes separately.
function recordClothingFromPrompt(prompt, actorName) {
  var info = getPromptUndressInfo(prompt);
  if (!info) return;
  var names = [];
  if (info.subject === "both") {
    names.push(actorName);
    // resolve the partner/last target directly
    var resolved = (gameState.lastResolvedTarget && gameState.lastResolvedTarget !== actorName)
      ? gameState.lastResolvedTarget
      : (getOtherPlayerNames(actorName).length === 1 ? getOtherPlayerNames(actorName)[0] : null);
    if (resolved) names.push(resolved);
  } else {
    var single = undressSubjectName(prompt, actorName);
    if (single) names.push(single);
  }
  names.forEach(function (name) {
    if (!gameState.memory.clothingRemoved[name]) gameState.memory.clothingRemoved[name] = [];
    gameState.memory.clothingRemoved[name].push("layer");
    // Full strip, or 3+ layers shed, marks the player fully undressed.
    if (info.makesFull || gameState.memory.clothingRemoved[name].length >= 3) {
      if (!gameState.memory.fullyUndressed) gameState.memory.fullyUndressed = {};
      gameState.memory.fullyUndressed[name] = true;
    }
  });
}

function selectPromptByRole(chapter, role) {
  var pref = gameState.typePreference;
  var actor = gameState.currentPlayer;

  // Dare bias: later stages force more dares to keep action flowing
  var config = getChapterConfig(chapter);
  var dareBias = config.dareBias || 0;

  // Seducer gets extra dare bias (+15%) when they're the active player
  var actorObj = getPlayerByName(actor);
  if (actorObj && actorObj.isSeducer) {
    dareBias = Math.min(dareBias + 0.15, 1.0); // cap at 100%
  }

  if (dareBias && Math.random() < dareBias) {
    pref = "dare";
  }

  // Anti-repetition: if last 2 prompts were same type (truth/dare), prefer the opposite
  var lastTypes = gameState.completedPromptIds.slice(-2).map(function(id) {
    for (var i = 0; i < getPromptPool().length; i++) {
      if (getPromptPool()[i].id === id) return getPromptPool()[i].promptType;
    }
    return null;
  });
  var antiRepeatType = null;
  if (lastTypes.length === 2 && lastTypes[0] === lastTypes[1] && lastTypes[0] && pref === "mixed") {
    antiRepeatType = (lastTypes[0] === "truth") ? "dare" : "truth";
  }

  // Primary pool: match chapter + role + type preference + not recently used + gender match
  // Exclude callback prompts (triggerTheme) — those are only injected via the revelation system
  // In couples mode, exclude group-type prompts ("Everyone" wording doesn't work with 2 players)
  var skipGroup = isCouplesMode();
  var coupleTypeOk = function(p) {
    if (!isCouplesMode()) return true;
    return !p.coupleType || p.coupleType === "both" || p.coupleType === gameState.coupleType;
  };
  var pool = getPromptPool().filter(function(p) {
    return p.chapter === chapter && p.role === role && !p.chain_id && !p.triggerTheme &&
      !wasRecentlyUsedPrompt(p.id) &&
      promptMatchesGender(p, actor) &&
      !clothingContradiction(p, actor) &&
      (pref === "mixed" || !p.promptType || p.promptType === pref) &&
      !(skipGroup && p.type === "group") &&
      coupleTypeOk(p);
  });

  // If we have an anti-repeat preference and enough options, filter further
  if (pool.length > 3 && antiRepeatType) {
    var diversePool = pool.filter(function(p) { return p.promptType === antiRepeatType; });
    if (diversePool.length) pool = diversePool;
  }

  if (pool.length) return themeAwareRandom(pool);

  // Relax type preference
  pool = getPromptPool().filter(function(p) {
    return p.chapter === chapter && p.role === role && !p.chain_id && !p.triggerTheme && !wasRecentlyUsedPrompt(p.id) && promptMatchesGender(p, actor) &&
      !clothingContradiction(p, actor) &&
      !(skipGroup && p.type === "group") &&
      coupleTypeOk(p);
  });
  if (pool.length) return themeAwareRandom(pool);

  // Relax role: any unused prompt in chapter
  pool = getPromptPool().filter(function(p) {
    return p.chapter === chapter && !p.chain_id && !p.triggerTheme && !wasRecentlyUsedPrompt(p.id) &&
      !clothingContradiction(p, actor) &&
      !(skipGroup && p.type === "group") &&
      coupleTypeOk(p);
  });
  if (pool.length) return themeAwareRandom(pool);

  // Last resort: pick the least-recently-used prompt in chapter (avoid repeating recent ones)
  var fallback = getPromptPool().filter(function(p) { return p.chapter === chapter && !p.chain_id && !p.triggerTheme && !clothingContradiction(p, actor) && !(skipGroup && p.type === "group") && coupleTypeOk(p); });
  if (fallback.length) {
    // Sort by how long ago they were used (least recent first)
    fallback.sort(function(a, b) {
      var aIdx = gameState.completedPromptIds.lastIndexOf(a.id);
      var bIdx = gameState.completedPromptIds.lastIndexOf(b.id);
      return aIdx - bIdx; // lower index = used longer ago = preferred
    });
    return fallback[0];
  }
  return null;
}

function maybeStartAvailableChain(chapter, role, actor, target) {
  var config = getChapterConfig(chapter);
  // Profile-boosted chain chance: daring players increase the odds
  var chainBoost = getDaringScore(actor) * 0.02; // up to ~10% boost for very daring
  if (Math.random() > config.chainChance + chainBoost) return null;
  if (gameState.momentum < 2) return null;
  // Don't start chains in the first 4 turns — let players warm up
  if (gameState.turnCount < 5) return null;
  // Post-chain cooldown: 0 in taboo (arcs ARE the content), 1 in erotic, 2 elsewhere
  var cooldown = (chapter === "taboo") ? 0 : (chapter === "erotic") ? 1 : 2;
  if (gameState.turnCount - gameState.lastChainEndTurn < cooldown) return null;

  var starters = getPromptPool().filter(function(p) {
    return p.chapter === chapter && p.chain_id && p.chain_step === 1 &&
      !p._jealousyChain && // Jealousy chains fire via their own trigger, not the regular chain picker
      !wasRecentlyUsedPrompt(p.id) && gameState.recentChains.indexOf(p.chain_id) < 0 &&
      !clothingContradiction(p, actor) &&
      promptMatchesGender(p, actor);
  });
  if (!starters.length) return null;

  // SEDUCER CHAIN PREFERENCE: In intimate+ stages, prefer chains with seducer involved
  var stageIndex = CHAPTER_ORDER.indexOf(chapter);
  var seducerObj = gameState.players.find(function(p) { return p.isSeducer; });

  var starter = null;
  if (seducerObj && stageIndex >= 4) {
    // In intimate/erotic/taboo, prefer seducer as actor or target
    var actorObj = getPlayerByName(actor);
    if (actorObj && actorObj.isSeducer) {
      // Seducer is already the actor — strongly favor this chain start
      starter = randomFrom(starters);
    } else {
      // Non-seducer is actor — prefer chains where target could be seducer
      starter = randomFrom(starters);
    }
  } else {
    starter = randomFrom(starters);
  }

  // For gender-constrained chains, pick appropriate target
  if (starter && starter.target_gender) {
    var genderTargets = getOtherPlayerNames(actor).filter(function(name) {
      var p = getPlayerByName(name);
      return p && p.gender === starter.target_gender;
    });
    if (!genderTargets.length) return null; // no valid target for this chain

    // EXPOSURE BALANCE: avoid firing intimate chains on the most-exposed player.
    // If a less-exposed gender match exists, prefer them.
    var avgClothing = 0;
    gameState.players.forEach(function(p) { avgClothing += (gameState.memory.clothingRemoved[p.name] || []).length; });
    avgClothing = avgClothing / Math.max(1, gameState.players.length);
    var lessExposed = genderTargets.filter(function(name) {
      var c = (gameState.memory.clothingRemoved[name] || []).length;
      return c <= avgClothing + 1;
    });
    if (lessExposed.length) {
      target = randomFrom(lessExposed);
    } else {
      // Every valid target is over-exposed — bail on this chain entirely
      // so the over-exposed player isn't piled on further.
      return null;
    }
  }

  if (starter) {
    startChain(starter.chain_id, actor, target);
  }
  // Return both starter and the (possibly reassigned) target so the caller
  // displays the correct person. Older callers tolerate object-with-prompt.
  return { prompt: starter, target: target };
}

// =========================
// JEALOUSY TEST CHAIN TRIGGER
// =========================
// Checks if conditions are met to launch a jealousy test arc:
// 1. A player with a partner has been profiled as "not_jealous" or "evasive"
// 2. A seducer exists in the group
// 3. The current stage has jealousy chain prompts available
// 4. This player hasn't already been tested with this arc
// Returns a chain result { prompt, target } or null.

function maybeStartJealousyChain(chapter, actorName) {
  // Only fire in suggestive, intimate, or erotic stages
  var validStages = ["suggestive", "intimate", "erotic"];
  if (validStages.indexOf(chapter) < 0) return null;

  // Don't fire if a jealousy test is already active
  if (gameState.jealousyTestActive) return null;

  // Need a seducer
  var seducerObj = gameState.players.find(function(p) { return p.isSeducer; });
  if (!seducerObj) return null;

  // Find players who claimed "not_jealous" or "evasive" and have a partner
  var testable = [];
  gameState.players.forEach(function(p) {
    var claim = gameState.memory.jealousy[p.name];
    if ((claim === "not_jealous" || claim === "evasive" || claim === "unsure") && p.partner) {
      // Check which arcs they've already been tested with
      var tested = gameState.jealousyTested[p.name] || [];
      // Map stage to chain ID
      var arcMap = {
        "suggestive": "jealousy_test_soft",
        "intimate": "jealousy_test_deep",
        "erotic": "jealousy_test_fire"
      };
      var chainId = arcMap[chapter];
      if (chainId && tested.indexOf(chainId) < 0) {
        testable.push({ player: p, chainId: chainId });
      }
    }
  });

  if (!testable.length) return null;

  // ~40% chance per eligible turn (dramatic pacing — don't fire every time)
  if (Math.random() > 0.40) return null;

  // The seducer can't test themselves, and can't "seduce" their own partner —
  // both collapse the trio into nonsense (self-kiss prompts).
  testable = testable.filter(function(t) {
    return t.player.name !== seducerObj.name && t.player.partner !== seducerObj.name;
  });
  if (!testable.length) return null;

  // Pick a random testable player
  var pick = testable[Math.floor(Math.random() * testable.length)];
  var jealousPlayer = pick.player;
  var partnerObj = getPlayerByName(jealousPlayer.partner);
  if (!partnerObj || partnerObj.name === seducerObj.name) return null;

  // Set up the jealousy test trio
  gameState.jealousyTestActive = {
    jealousPlayer: jealousPlayer.name,
    partner: partnerObj.name,
    seducer: seducerObj.name,
    chainId: pick.chainId
  };

  // Find the chain starter prompt
  var starter = getPromptPool().find(function(p) {
    return p.chain_id === pick.chainId && p.chain_step === 1 && !wasRecentlyUsedPrompt(p.id);
  });

  if (!starter) {
    gameState.jealousyTestActive = null;
    return null;
  }

  // Start the chain: actor = seducer, target = the jealous player's PARTNER
  // (seducer flirts with/kisses the partner while the jealous player watches)
  startChain(pick.chainId, seducerObj.name, partnerObj.name);

  return {
    prompt: starter,
    actor: seducerObj.name,
    target: partnerObj.name
  };
}

function maybePickSpinner(chapter) {
  var config = getChapterConfig(chapter);
  if (!config.spinnerChance) return null;
  // Don't spin in the first 5 turns of a stage
  if (gameState.turnInChapter < 5) return null;
  // Cooldown: at least 3 turns between spinners to prevent back-to-back
  if (gameState.turnCount - (gameState.lastSpinnerTurn || 0) < 3) return null;
  // Post-chain boost: right after a chain ends, favor a spinner to mix things up
  var turnsSinceChain = gameState.turnCount - (gameState.lastChainEndTurn || 0);
  var effectiveChance = config.spinnerChance;
  if (turnsSinceChain <= 2) effectiveChance = Math.min(effectiveChance + 0.20, 0.70);
  if (Math.random() > effectiveChance) return null;
  // Find unused spinner prompts for this chapter
  var spinners = SPINNER_PROMPTS.filter(function(p) {
    return p.chapter === chapter && !wasRecentlyUsedPrompt(p.id);
  });
  if (!spinners.length) return null;
  return randomFrom(spinners);
}

function selectPrompt(actorName) {
  var chapter = getCurrentChapter();
  var role = getCurrentRole();

  // 1. Continue active chain
  var continuation = findChainContinuation();
  if (continuation) {
    return { prompt: continuation.prompt, actor: continuation.actor, target: continuation.target };
  }

  // In couples mode, skip spinner and bridge templates — but DO profiling with couples-specific prompts
  if (isCouplesMode()) {
    // TRUTH→DARE FOLLOW-THROUGH: consume the queue here too, or it locks the
    // actor rotation forever (nextTurn forces actor while the queue is set).
    if (gameState.followThroughQueue) {
      var cplFt = gameState.followThroughQueue;
      gameState.followThroughQueue = null;
      return { prompt: cplFt.prompt, actor: cplFt.actor, target: cplFt.target };
    }
    // Spinner roulette works for two — the wheel picks the action, the
    // partner is always the target.
    var cplSpinner = maybePickSpinner(chapter);
    if (cplSpinner) {
      gameState.lastSpinnerTurn = gameState.turnCount;
      return { prompt: cplSpinner, actor: actorName, target: chooseTarget(actorName, cplSpinner) };
    }
    // Couples profiling: use _couplesOnly prompts in personal stage
    if (chapter === "personal" && !gameState.profilingComplete[actorName]) {
      var cpfPrompts = PROFILING_PROMPTS.filter(function(p) {
        return p._couplesOnly && p.chapter === chapter && !wasRecentlyUsedPrompt(p.id) &&
          promptMatchesGender(p, actorName) &&
          (p.role === role || p.role === "setup" || p.role === "action" || p.role === "build");
      });
      if (cpfPrompts.length > 0) {
        var cpfProfile = gameState.playerProfiles[actorName] || {};
        var cpfUnprofiled = cpfPrompts.filter(function(p) {
          return !cpfProfile[p._profileDim] || cpfProfile[p._profileDim] <= 0;
        });
        var cpfPool = cpfUnprofiled.length > 0 ? cpfUnprofiled : cpfPrompts;
        var cpfPick = cpfPool[Math.floor(Math.random() * cpfPool.length)];
        var cpfTarget = chooseTarget(actorName, cpfPick);
        // ~70% chance to pick profiling vs regular (keeps variety)
        if (Math.random() < 0.7) {
          return { prompt: cpfPick, actor: actorName, target: cpfTarget };
        }
      }
    }
    // Couples chains: maybe start an escalation arc for this chapter.
    // (Active arcs are already continued by findChainContinuation above.)
    var cplChainTarget = chooseTarget(actorName);
    var cplChain = maybeStartAvailableChain(chapter, role, actorName, cplChainTarget);
    if (cplChain && cplChain.prompt) {
      return { prompt: cplChain.prompt, actor: actorName, target: cplChain.target || cplChainTarget };
    }
    // Standard prompt selection for couples
    var prompt = selectPromptByRole(chapter, role, actorName);
    if (!prompt) return null;
    var target = chooseTarget(actorName, prompt);
    return { prompt: prompt, actor: actorName, target: target };
  }

  // 2. Maybe start a new chain
  var chainTarget = chooseTarget(actorName);
  var chainResult = maybeStartAvailableChain(chapter, role, actorName, chainTarget);
  if (chainResult && chainResult.prompt) {
    return { prompt: chainResult.prompt, actor: actorName, target: chainResult.target || chainTarget };
  }

  // 2.5. JEALOUSY TEST: maybe trigger a jealousy test chain (seducer tests a "not jealous" player)
  var jealousyResult = maybeStartJealousyChain(chapter, actorName);
  if (jealousyResult && jealousyResult.prompt) {
    return { prompt: jealousyResult.prompt, actor: jealousyResult.actor, target: jealousyResult.target };
  }

  // 3. Maybe trigger a spinner prompt
  var spinnerPrompt = maybePickSpinner(chapter);
  if (spinnerPrompt) {
    var spinTarget = chooseTarget(actorName, spinnerPrompt);
    gameState.lastSpinnerTurn = gameState.turnCount;
    return { prompt: spinnerPrompt, actor: actorName, target: spinTarget };
  }

  // 3.2 PROFILING PRIORITY: In personal stage, prioritize profiling prompts
  //     so each player gets psychological profile questions before generic ones.
  if (chapter === "personal" && !gameState.profilingComplete[actorName]) {
    // Find profiling prompts this player hasn't answered yet
    var availableProfilePrompts = PROFILING_PROMPTS.filter(function(p) {
      // Couples-only partner-quiz prompts don't belong in group play
      if (p._couplesOnly) return false;
      // Jealousy probes only target partnered players
      if (p._jealousyProbe) {
        var actObj = getPlayerByName(actorName);
        if (!actObj || !actObj.partner) return false;
      }
      return p.chapter === chapter && !wasRecentlyUsedPrompt(p.id) && promptMatchesGender(p, actorName) &&
        (p.role === role || p.role === "setup" || p.role === "action" || p.role === "build");
    });
    // Prefer dimensions this player hasn't been profiled on yet
    if (availableProfilePrompts.length > 0) {
      var profile = gameState.playerProfiles[actorName] || {};
      var unprofiled = availableProfilePrompts.filter(function(p) {
        return !profile[p._profileDim] || profile[p._profileDim] <= 0;
      });
      var pool = unprofiled.length > 0 ? unprofiled : availableProfilePrompts;
      var prompt = pool[Math.floor(Math.random() * pool.length)];
      var target = null;
      if (prompt.target === "other" || prompt.type === "directed") {
        target = chooseTarget(actorName, prompt);
      }
      // ~70% chance to pick a profiling prompt vs regular (keeps variety)
      if (Math.random() < 0.7) {
        return { prompt: prompt, actor: actorName, target: target };
      }
    }
  }

  // 3.3 JEALOUSY PROBES: In playful stage, some jealousy probes fire for partnered players
  //     who haven't been profiled on jealousy yet.
  if (chapter === "playful" && !gameState.memory.jealousy[actorName]) {
    var actorPlayerObj = getPlayerByName(actorName);
    if (actorPlayerObj && actorPlayerObj.partner) {
      var jealousyProbes = PROFILING_PROMPTS.filter(function(p) {
        return p._jealousyProbe && p.chapter === "playful" && !wasRecentlyUsedPrompt(p.id);
      });
      if (jealousyProbes.length > 0 && Math.random() < 0.5) {
        var jProbe = jealousyProbes[Math.floor(Math.random() * jealousyProbes.length)];
        return { prompt: jProbe, actor: actorName, target: null };
      }
    }
  }

  // 3.5 TRUTH→DARE FOLLOW-THROUGH: if a truth triggered a follow-up dare, play it now.
  if (gameState.followThroughQueue) {
    var ft = gameState.followThroughQueue;
    gameState.followThroughQueue = null;
    return { prompt: ft.prompt, actor: ft.actor, target: ft.target };
  }

  // 4. POST-CHAIN BRIDGE: third player joins the chain pair.
  //    Uses bridge templates to smoothly transition from a 2-player chain
  //    to a 3-player dynamic before returning to normal rotation.
  if (gameState.postChainBridge) {
    var bridge = gameState.postChainBridge;
    var templates = BRIDGE_TEMPLATES[bridge.chapter];
    if (templates && bridge.step < bridge.maxSteps) {
      var tmpl = templates[bridge.step];
      bridge.step += 1;
      // Build the bridge prompt by replacing placeholders
      // Support array of text variants to avoid repetition across multiple bridges
      var rawText = Array.isArray(tmpl.text) ? tmpl.text[Math.floor(Math.random() * tmpl.text.length)] : tmpl.text;
      var bridgeText = rawText
        .replace(/\{actor\}/g, capitalize(bridge.actor))
        .replace(/\{target\}/g, capitalize(bridge.target))
        .replace(/\{third\}/g, capitalize(bridge.third));
      var bridgePrompt = {
        id: "BRIDGE_" + bridge.chapter + "_" + bridge.step,
        chapter: bridge.chapter,
        role: "peak",
        type: "directed",
        promptType: tmpl.promptType,
        intensity: tmpl.intensity,
        text: bridgeText,
        target: "other",
        _isBridge: true
      };
      // The actor for bridge prompts rotates: step 1 = third joins,
      // step 2 = third interacts, step 3 = actor/target respond
      var bridgeActor = bridge.third;
      var bridgeTarget = (bridge.step === 3) ? bridge.actor : bridge.target;
      return { prompt: bridgePrompt, actor: bridgeActor, target: bridgeTarget };
    }
    // Bridge complete — clear it and resume normal rotation
    gameState.postChainBridge = null;
  }

  // 4.5 REVELATION CALLBACKS: if this player has stored revelations,
  //     check for matching callback prompts in the current chapter.
  //     ~40% chance to trigger (keeps them surprising, not every turn).
  if (gameState.revelations[actorName] && gameState.revelations[actorName].length > 0 && Math.random() < 0.40) {
    var playerRevs = gameState.revelations[actorName];
    var playerThemes = playerRevs.map(function(r) { return r.theme; });
    // Find unused callback prompts for this chapter that match this player's revelations
    var matchingCallbacks = CALLBACK_PROMPTS.filter(function(cb) {
      return cb.chapter === chapter &&
             playerThemes.indexOf(cb.triggerTheme) >= 0 &&
             !gameState.usedCallbacks[cb.id] &&
             !wasRecentlyUsedPrompt(cb.id);
    });
    if (matchingCallbacks.length > 0) {
      var cbPrompt = randomFrom(matchingCallbacks);
      gameState.usedCallbacks[cbPrompt.id] = true;
      // Determine actor and target — some callbacks swap (target acts on actor)
      var cbActor = actorName;
      var cbTarget = chooseTarget(actorName, cbPrompt);
      if (cbPrompt._swapActorTarget && cbTarget) {
        var tmpA = cbActor;
        cbActor = cbTarget;
        cbTarget = tmpA;
      }
      return { prompt: cbPrompt, actor: cbActor, target: cbTarget };
    }
  }

  // 5. Pick regular prompt by role
  var prompt = selectPromptByRole(chapter, role);
  if (!prompt) return null;

  var target = null;
  if (prompt.target === "other" || prompt.type === "directed") {
    target = chooseTarget(actorName, prompt);
  }
  return { prompt: prompt, actor: actorName, target: target };
}

// =========================
// RENDERING
// =========================

function injectPromptText(text, player, target) {
  var out = (text || "").trim();
  var actorObj = player ? getPlayerByName(player) : null;
  var partnerName = (actorObj && actorObj.partner) ? actorObj.partner : "your partner";

  // Track whether original text references {target} — if not, pronouns are generic
  var hadTargetPlaceholder = out.indexOf("{target}") >= 0;

  if (player) {
    var capPlayer = capitalize(player);
    // Fix possessive for names ending in 's': "Hans's" → "Hans'"
    out = out.replace(/\{player\}'s\b/g, capPlayer.match(/s$/i) ? capPlayer + "'" : capPlayer + "'s");
    out = out.replace(/\{actor\}'s\b/g, capPlayer.match(/s$/i) ? capPlayer + "'" : capPlayer + "'s");
    out = out.replace(/\{player\}/g, capPlayer);
    out = out.replace(/\{actor\}/g, capPlayer);
  }
  if (target) {
    var capTarget = capitalize(target);
    // Fix possessive for names ending in 's': "Hans's" → "Hans'"
    out = out.replace(/\{target\}'s\b/g, capTarget.match(/s$/i) ? capTarget + "'" : capTarget + "'s");
    out = out.replace(/\{target\}/g, capTarget);
  } else {
    out = out.replace(/\{target\}'s\b/g, "someone's");
    out = out.replace(/\{target\}/g, "someone");
  }
  out = out.replace(/\{partner\}/g, partnerName);

  // Music-theme dance vocabulary — resolves {dance1}, {dance2}, {dance_slow}, {dance_beat}
  // Each theme defines its own equivalent dances so prompts stay relevant regardless of music choice.
  var dances = getActiveDances();
  out = out.replace(/\{dance1\}/g, dances.dance1);
  out = out.replace(/\{dance2\}/g, dances.dance2);
  out = out.replace(/\{dance_slow\}/g, dances.dance_slow);
  out = out.replace(/\{dance_beat\}/g, dances.beat);

  // Couples mode: replace group-audience language with partner name
  if (isCouplesMode() && target) {
    var partnerForUs = capitalize(target);
    out = out.replace(/\bShow us\b/g, "Show " + partnerForUs);
    out = out.replace(/\bshow us\b/g, "show " + partnerForUs);
    out = out.replace(/\bTell us\b/g, "Tell " + partnerForUs);
    out = out.replace(/\btell us\b/g, "tell " + partnerForUs);
    out = out.replace(/\bGive us\b/g, "Give " + partnerForUs);
    out = out.replace(/\bgive us\b/g, "give " + partnerForUs);
  }

  // Jealousy chain: inject the jealous player's name
  if (gameState.jealousyTestActive) {
    out = out.replace(/\{jealousPlayer\}/g, capitalize(gameState.jealousyTestActive.jealousPlayer));
  } else {
    out = out.replace(/\{jealousPlayer\}/g, "someone");
  }

  // Memory injection
  if (gameState.memory.firstImpression && player) {
    var remembered = gameState.memory.firstImpression[player];
    if (remembered && out.indexOf("look at") >= 0) {
      out = "Earlier you mentioned " + capitalize(remembered) + "...\n\n" + out;
    }
  }

  // Pronoun injection — placeholders
  // Actor (player) pronouns: {player_he}, {player_him}, {player_his}
  if (actorObj && actorObj.pronouns) {
    out = out.replace(/\{player_he\}/g, actorObj.pronouns.subject);
    out = out.replace(/\{player_him\}/g, actorObj.pronouns.object);
    out = out.replace(/\{player_his\}/g, actorObj.pronouns.possessive);
    out = out.replace(/\{actor_he\}/g, actorObj.pronouns.subject);
    out = out.replace(/\{actor_him\}/g, actorObj.pronouns.object);
    out = out.replace(/\{actor_his\}/g, actorObj.pronouns.possessive);
  }
  // Target pronouns: {target_he}/{target_she}, {target_him}/{target_her}, {target_his}/{target_hers}
  // she/her variants resolve to the SAME target pronouns — prompt authors use
  // whichever reads naturally; the actual gender comes from the target player.
  var targetObj = target ? getPlayerByName(target) : null;
  if (targetObj && targetObj.pronouns) {
    out = out.replace(/\{target_(?:He|She)\}/g, capitalize(targetObj.pronouns.subject));
    out = out.replace(/\{target_(?:him|her)\}/g, targetObj.pronouns.object);
    out = out.replace(/\{target_(?:his|hers)\}/g, targetObj.pronouns.possessive);
    out = out.replace(/\{target_(?:he|she)\}/g, targetObj.pronouns.subject);

    // Smart pronoun replacement: only when the original text had {target},
    // meaning the pronouns (them/they/their) refer to that specific person.
    // Skip for group prompts or prompts where "them" is generic.
    if (hadTargetPlaceholder) {
      var g = targetObj.gender; // "male" or "female"
      if (g === "male" || g === "female") {
        var obj  = g === "male" ? "him" : "her";
        var subj = g === "male" ? "he"  : "she";
        var poss = g === "male" ? "his" : "her";

        out = out.replace(/\bthem\b/gi, function(m) { return m[0] === "T" ? capitalize(obj) : obj; });
        // "they + verb" → "he/she + verb+s" (third person singular conjugation)
        // Use a wider regex to capture the word before "they" (to detect auxiliaries like "did")
        out = out.replace(/(\w+\s)?\b([Tt]hey) (\w+(?:'\w+)?)\b/g, function(fullMatch, preceding, theyWord, verb) {
          var wasCapital = theyWord[0] === "T";
          var s = wasCapital ? capitalize(subj) : subj;
          // If preceded by auxiliary verb (did/does/do/will/would/can/could/etc.), don't conjugate
          var pre = (preceding || "").trim().toLowerCase();
          var auxiliaries = { "did":1,"does":1,"do":1,"will":1,"would":1,"can":1,"could":1,"should":1,"shall":1,"may":1,"might":1,"must":1,"didn't":1,"doesn't":1 };
          if (auxiliaries[pre]) {
            // "do they" → "does she/he" (aux "do" must also conjugate)
            var precOut = preceding || "";
            if (pre === "do") {
              var wasCapPre = preceding && preceding[0] >= "A" && preceding[0] <= "Z";
              precOut = wasCapPre ? "Does " : "does ";
            }
            return precOut + s + " " + verb;
          }
          // Common irregular verbs
          var irregulars = { "are": "is", "were": "was", "have": "has", "do": "does", "don't": "doesn't", "aren't": "isn't" };
          if (irregulars[verb]) return (preceding || "") + s + " " + irregulars[verb];
          // Modal verbs: no conjugation (he can, she will, etc.)
          var modals = { "can": 1, "could": 1, "will": 1, "would": 1, "should": 1, "shall": 1, "may": 1, "might": 1, "must": 1, "can't": 1, "won't": 1, "wouldn't": 1, "shouldn't": 1, "couldn't": 1 };
          var p = preceding || "";
          if (modals[verb]) return p + s + " " + verb;
          // Past tense: don't conjugate (already inflected)
          if (verb.match(/ed$/)) return p + s + " " + verb;
          var pastForms = { "found":1,"said":1,"told":1,"went":1,"gave":1,"did":1,"made":1,"got":1,
            "took":1,"felt":1,"knew":1,"saw":1,"came":1,"thought":1,"left":1,"heard":1,"ran":1,
            "wrote":1,"broke":1,"chose":1,"spoke":1,"wore":1,"drove":1,"ate":1,"fell":1,"held":1,
            "kept":1,"led":1,"met":1,"paid":1,"sat":1,"stood":1,"lost":1,"brought":1,"caught":1,
            "taught":1,"bought":1,"fought":1,"hung":1,"slept":1,"spent":1,"won":1,"built":1,
            "sent":1,"lent":1,"bent":1,"dealt":1,"meant":1,"woke":1,"shook":1,"bit":1,"blew":1,
            "drew":1,"flew":1,"grew":1,"hid":1,"hit":1,"hurt":1,"let":1,"put":1,"rid":1,"set":1,
            "shed":1,"shut":1,"split":1,"spread":1,"struck":1,"swore":1,"tore":1,"threw":1,
            "wept":1,"began":1,"sang":1,"drank":1,"swam":1,"rang":1,"sank":1,"stank":1 };
          if (pastForms[verb]) return p + s + " " + verb;
          // Regular verbs: add -s/-es for he/she
          if (verb.match(/(s|sh|ch|x|z)$/)) return p + s + " " + verb + "es";
          if (verb.match(/[^aeiou]y$/)) return p + s + " " + verb.slice(0,-1) + "ies";
          return p + s + " " + verb + "s";
        });
        // Contractions: they're → he's/she's, they've → he's/she's,
        // they'll → he'll/she'll, they'd → he'd/she'd. Must run before the
        // standalone replace below — the apostrophe is a word boundary, so
        // \bthey\b matches inside "they're" and would produce "she're".
        out = out.replace(/\b([Tt])hey're\b/g, function(m, t) { return (t === "T" ? capitalize(subj) : subj) + "'s"; });
        out = out.replace(/\b([Tt])hey've\b/g, function(m, t) { return (t === "T" ? capitalize(subj) : subj) + "'s"; });
        out = out.replace(/\b([Tt])hey'll\b/g, function(m, t) { return (t === "T" ? capitalize(subj) : subj) + "'ll"; });
        out = out.replace(/\b([Tt])hey'd\b/g, function(m, t) { return (t === "T" ? capitalize(subj) : subj) + "'d"; });
        // Standalone "they" (not followed by a verb, e.g. end of sentence)
        out = out.replace(/\b[Tt]hey\b/g, function(m) { return m[0] === "T" ? capitalize(subj) : subj; });
        out = out.replace(/\b[Tt]heir\b/g, function(m) { return m[0] === "T" ? capitalize(poss) : poss; });
        var reflexive = g === "male" ? "himself" : "herself";
        out = out.replace(/\b[Tt]hemselves\b/g, function(m) { return m[0] === "T" ? capitalize(reflexive) : reflexive; });
      }
    }
  }
  return out;
}

function renderPrompt(prompt, player, target) {
  var text = injectPromptText(prompt.text, player, target);
  if (promptTextEl) promptTextEl.textContent = text;

  if (metaTextEl) {
    var parts = [
      "Turn: " + gameState.turnCount,
      "Chapter: " + getCurrentChapter(),
      "Role: " + prompt.role
    ];
    if (prompt.promptType) parts.push(prompt.promptType.toUpperCase());
    if (prompt.chain_id) parts.push("Chain: " + prompt.chain_id + " [" + prompt.chain_step + "]");
    parts.push("Momentum: " + gameState.momentum);
    metaTextEl.textContent = parts.join(" | ");
  }

  if (playerLabelEl && playerLabelEl.style.display !== "none") {
    playerLabelEl.textContent = prompt.type === "group" ? "EVERYONE" : (player || "");
  }
}

// =========================
// SPINNER SYSTEM
// =========================

// Outcome pools — each pool is an array of { text, category }
// category is used for memory tracking (e.g. "clothing" tracks items removed)
const SPINNER_POOLS = {
  clothing_mild: [
    { text: "Remove your shoes", category: "clothing", item: "shoes" },
    { text: "Remove your socks", category: "clothing", item: "socks", requires: "shoes" },
    { text: "Remove your belt", category: "clothing", item: "belt" },
    { text: "Unbutton your top button — slowly", category: "clothing", item: "button" },
    { text: "Remove your watch, jewelry or bracelet", category: "clothing", item: "jewelry" },
  ],
  clothing_hot: [
    { text: "Remove your top (shirt, blouse or whatever's on top)", category: "clothing", item: "top" },
    { text: "Remove your pants, skirt or shorts", category: "clothing", item: "pants" },
    { text: "Remove your bra (if wearing one)", category: "clothing", item: "bra", gender: "female" },
    { text: "Swap an item of clothing with {target}", category: "clothing", item: "swapped item" },
  ],
  dares_flirty: [
    { text: "Blow a kiss to {target}", category: "action" },
    { text: "Wink at {target} and bite your lip", category: "action" },
    { text: "Do your sexiest walk across the room", category: "action" },
    { text: "Hold {target}'s hand for 30 seconds", category: "action" },
    { text: "Whisper a secret to {target}", category: "action" },
    { text: "Give {target} a compliment in a foreign accent", category: "action" },
    { text: "Do a model pose and hold it for 10 seconds", category: "action" },
    { text: "Let {target} take a selfie with you", category: "action" },
  ],
  dares_suggestive: [
    { text: "Kiss {target} on the neck — slowly", category: "action" },
    { text: "Unbutton a few buttons on your shirt while looking at {target}", category: "clothing", item: "buttons" },
    { text: "Sit on {target}'s lap and whisper something in their ear", category: "action" },
    { text: "Let {target} run their fingers through your hair for 15 seconds", category: "action" },
    { text: "Trace your finger along {target}'s jawline", category: "action" },
    { text: "Give {target} a slow shoulder massage — make it sensual", category: "action" },
    { text: "Hold {target}'s face and look into their eyes for 10 seconds — no speaking", category: "action" },
    { text: "Kiss {target} on the lips — a real one", category: "action" },
  ],
  dares_hot: [
    { text: "Kiss {target} on the cheek", category: "action" },
    { text: "Give {target} a 10-second neck massage", category: "action" },
    { text: "Sit on {target}'s lap for 30 seconds", category: "action" },
    { text: "Let {target} draw something on your skin", category: "action" },
    { text: "Do your best lap dance move", category: "action" },
    { text: "Whisper something naughty to {target}", category: "action" },
    { text: "Let {target} feed you something", category: "action" },
    { text: "Lick your lips while staring at {target}", category: "action" },
  ],
  dares_extreme: [
    { text: "French kiss {target}", category: "action" },
    { text: "Let {target} remove one item of your clothing", category: "clothing", item: "item (removed by other)" },
    { text: "Give {target} a body shot", category: "action" },
    { text: "Kiss {target}'s neck slowly", category: "action" },
    { text: "Do a slow strip of one item", category: "clothing", item: "stripped item" },
    { text: "Straddle {target} for 15 seconds", category: "action" },
    { text: "Trace your finger from {target}'s chin to chest", category: "action" },
    { text: "Bite {target}'s ear gently", category: "action" },
  ]
};

// Spinner prompt definitions — these get added to the prompt pool
// spinner_pool: which pool(s) to draw from, spinner_spins: how many spins
const SPINNER_PROMPTS = [
  // FLIRTY: lightest spins — playful and teasing
  { id: "SPN0009", chapter: "flirty", role: "action", type: "directed", promptType: "dare",
    intensity: 4.5, text: "Spin the Bottle! 1 spin — let's see what Lyra wants.",
    target: "other", spinner_spins: 1, spinner_pools: ["clothing_mild", "dares_flirty"] },
  { id: "SPN0010", chapter: "flirty", role: "peak", type: "directed", promptType: "dare",
    intensity: 5, text: "Roulette time! 2 spins — Lyra is getting curious.",
    target: "other", spinner_spins: 2, spinner_pools: ["clothing_mild", "dares_flirty"] },

  // SUGGESTIVE: warmer spins — mixing clothing with physical dares
  { id: "SPN0001", chapter: "suggestive", role: "action", type: "directed", promptType: "dare",
    intensity: 6, text: "Spin the Bottle! You get 2 spins — whatever it lands on, you do it.",
    target: "other", spinner_spins: 2, spinner_pools: ["clothing_mild", "dares_suggestive"] },
  { id: "SPN0002", chapter: "suggestive", role: "peak", type: "directed", promptType: "dare",
    intensity: 6.5, text: "Roulette time! 3 spins — Lyra decides your fate.",
    target: "other", spinner_spins: 3, spinner_pools: ["clothing_mild", "dares_suggestive"] },

  // INTIMATE: medium spins
  { id: "SPN0003", chapter: "intimate", role: "action", type: "directed", promptType: "dare",
    intensity: 7, text: "Spin the Bottle! 2 spins — things are heating up.",
    target: "other", spinner_spins: 2, spinner_pools: ["clothing_mild", "clothing_hot", "dares_hot"] },
  { id: "SPN0004", chapter: "intimate", role: "peak", type: "directed", promptType: "dare",
    intensity: 7.5, text: "Lyra demands 3 spins. Let's see what happens.",
    target: "other", spinner_spins: 3, spinner_pools: ["clothing_mild", "clothing_hot", "dares_hot"] },

  // EROTIC: hot spins
  { id: "SPN0005", chapter: "erotic", role: "action", type: "directed", promptType: "dare",
    intensity: 8, text: "Roulette! 3 spins — no backing out now.",
    target: "other", spinner_spins: 3, spinner_pools: ["clothing_hot", "dares_hot", "dares_extreme"] },
  { id: "SPN0006", chapter: "erotic", role: "peak", type: "directed", promptType: "dare",
    intensity: 8.5, text: "Spin the Bottle! 4 spins — Lyra is feeling generous.",
    target: "other", spinner_spins: 4, spinner_pools: ["clothing_hot", "dares_hot", "dares_extreme"] },

  // TABOO: extreme spins
  { id: "SPN0007", chapter: "taboo", role: "action", type: "directed", promptType: "dare",
    intensity: 9, text: "Lyra demands a Roulette! 3 spins — no mercy.",
    target: "other", spinner_spins: 3, spinner_pools: ["clothing_hot", "dares_extreme"] },
  { id: "SPN0008", chapter: "taboo", role: "peak", type: "directed", promptType: "dare",
    intensity: 9.5, text: "Final Roulette! 5 spins — Lyra decides everything.",
    target: "other", spinner_spins: 5, spinner_pools: ["clothing_hot", "dares_extreme"] },
];

// Add spinner prompts to the main pool
SPINNER_PROMPTS.forEach(function(sp) { PROMPTS.push(sp); });

// Penalty system: triggered when a player passes/refuses
// Two types: shot (drink) or spinner (physical penalty)
const PENALTY_SPINNER = {
  flirty:     { spins: 1, pools: ["clothing_mild"] },
  suggestive: { spins: 1, pools: ["clothing_mild", "dares_flirty"] },
  intimate:   { spins: 2, pools: ["clothing_mild", "dares_flirty"] },
  erotic:     { spins: 2, pools: ["clothing_mild", "clothing_hot", "dares_hot"] },
  taboo:      { spins: 2, pools: ["clothing_hot", "dares_hot"] }
};

// Shot messages that escalate with the stage
const SHOT_MESSAGES = {
  flirty:     ["Lyra demands a drink! Take a shot.", "Refused? That'll cost you a shot."],
  suggestive: ["No backing out! Take a shot as penalty.", "Lyra punishes cowardice — drink up!"],
  intimate:   ["You think you can refuse Lyra? Take a shot!", "Lyra sees your hesitation... take a shot and reconsider."],
  erotic:     ["Lyra doesn't accept 'no' — take a shot!", "Refused? Lyra demands you drink — and think about what you're missing."],
  taboo:      ["Lyra is disappointed. Take a shot — you'll need the courage.", "You'll regret refusing. Take a shot and prepare yourself."]
};

function maybeTriggerPenalty(player) {
  var chapter = getCurrentChapter();
  if (!PENALTY_SPINNER[chapter]) return false; // no penalties in playful/personal

  // 55% chance to trigger any penalty on pass/refuse
  if (Math.random() > 0.55) return false;

  // Decide: shot (60%) or spinner (40%)
  if (Math.random() < 0.60) {
    // Shot penalty — show a shot message, then auto-advance
    var msgs = SHOT_MESSAGES[chapter] || SHOT_MESSAGES.flirty;
    var msg = msgs[Math.floor(Math.random() * msgs.length)];

    if (promptTextEl) {
      promptTextEl.textContent = msg;
      promptTextEl.style.opacity = "1";
    }
    // Replace lastPrompt with a dummy so CHEERS finalizes the penalty itself —
    // the original prompt was already settled by the caller with the real
    // response (otherwise a passed chain step would be recorded as "done").
    gameState.lastPrompt = { id: "PENALTY_SHOT", chapter: chapter, promptType: "dare", type: "self", target: "self", text: msg };
    // Show a simple OK button to continue
    clearFeedbackButtons();
    var wrap = getFeedbackPanelButtonsWrap();
    if (wrap) {
      wrap.appendChild(createFeedbackButton("CHEERS!", "done", function() {
        finalizePromptAfterFeedback("done");
      }));
      feedbackPanelEl.classList.remove("is-hidden");
    }
    return true;
  }

  // Spinner penalty
  var penalty = PENALTY_SPINNER[chapter];
  var target = chooseTarget(player);
  var penaltyPrompt = {
    id: "PENALTY_SPIN",
    chapter: chapter,
    promptType: "dare",
    type: "directed",
    target: "other",
    text: "You refused? Lyra doesn't forgive easily... " + (penalty.spins === 1 ? "1 spin" : penalty.spins + " spins") + " as punishment!",
    spinner_spins: penalty.spins,
    spinner_pools: penalty.pools
  };

  gameState.lastPrompt = penaltyPrompt;
  gameState.lastResolvedTarget = target;
  startSpinner(penaltyPrompt, player, target);
  setLegacyFeedbackButtonsHidden(true);
  if (promptTextEl) {
    promptTextEl.textContent = injectPromptText(penaltyPrompt.text, player, target);
    promptTextEl.style.opacity = "1";
  }
  renderSpinnerUI(penaltyPrompt, player, target);
  return true;
}

function getSpinnerPool(poolNames) {
  var pool = [];
  poolNames.forEach(function(name) {
    if (SPINNER_POOLS[name]) pool = pool.concat(SPINNER_POOLS[name]);
  });
  return pool;
}

function getMostClothedPlayer() {
  // Returns the player with the fewest clothing items removed (most clothed)
  var players = gameState.players;
  if (players.length < 2) return null;
  var least = null, leastCount = 999;
  players.forEach(function(p) {
    var count = (gameState.memory.clothingRemoved[p.name] || []).length;
    if (count < leastCount) { leastCount = count; least = p.name; }
  });
  return least;
}

function startSpinner(prompt, player, target) {
  // SAFETY: target must never equal the spinner player. If it does (or is missing),
  // pick a fresh other player so we never get prompts like "French kiss yourself".
  if (!target || target === player) {
    var safeOthers = getOtherPlayerNames(player);
    if (safeOthers.length) target = randomFrom(safeOthers);
  }

  // CLOTHING BALANCE: In erotic/taboo, if this player has 2+ more items removed than the
  // most-clothed player, redirect the spinner to the most-clothed player instead (70% chance)
  var chapter = getCurrentChapter();
  if (chapter === "erotic" || chapter === "taboo" || chapter === "intimate") {
    var myRemoved = (gameState.memory.clothingRemoved[player] || []).length;
    var mostClothed = getMostClothedPlayer();
    if (mostClothed && mostClothed !== player) {
      var theirRemoved = (gameState.memory.clothingRemoved[mostClothed] || []).length;
      if (myRemoved - theirRemoved >= 2 && Math.random() < 0.7) {
        // Redirect: the most-clothed player gets the spinner instead
        player = mostClothed;
        // Pick a new target that isn't the spinner player
        var others = getOtherPlayerNames(player);
        target = others.length ? randomFrom(others) : target;
      }
    }
  }

  // SAFETY (post-redirect): re-check after potential redirect
  if (target === player) {
    var safeOthers2 = getOtherPlayerNames(player);
    if (safeOthers2.length) target = randomFrom(safeOthers2);
  }

  var pools = prompt.spinner_pools || ["dares_flirty"];
  var fullPool = getSpinnerPool(pools);
  // Filter out clothing items the player has already removed
  var removed = gameState.memory.clothingRemoved[player] || [];
  var playerObj = gameState.players.find(function(p) { return p.name === player; });
  var playerGender = playerObj ? playerObj.gender : "other";
  fullPool = fullPool.filter(function(o) {
    if (o.category === "clothing" && o.item && removed.indexOf(o.item) >= 0) return false;
    // Conditional items: only include if the required item was already removed
    if (o.requires && removed.indexOf(o.requires) < 0) return false;
    // Gender-restricted items: skip if player gender doesn't match
    if (o.gender && o.gender !== playerGender) return false;
    return true;
  });

  // If too few items left (player is mostly stripped), replace clothing with action dares
  var clothingLeft = fullPool.filter(function(o) { return o.category === "clothing"; }).length;
  if (clothingLeft < 2) {
    // Remove remaining clothing items and add action replacements
    fullPool = fullPool.filter(function(o) { return o.category !== "clothing"; });
    // Add replacement action dares based on current stage
    var chapter = getCurrentChapter();
    var replacements = [];
    if (chapter === "taboo" || chapter === "erotic") {
      replacements = [
        { text: "Give {target} a 20-second lap dance", category: "action" },
        { text: "Let {target} pour a drink on you and lick it off", category: "action" },
        { text: "Blindfold yourself — {target} decides for 15 seconds", category: "action" },
        { text: "Press your body against {target} for 10 seconds", category: "action" },
        { text: "Let {target} trace their lips across your shoulder", category: "action" }
      ];
    } else {
      replacements = [
        { text: "Strike your most seductive pose for {target}", category: "action" },
        { text: "Slow dance with {target} for 20 seconds", category: "action" },
        { text: "Give {target} a shoulder massage", category: "action" }
      ];
    }
    fullPool = fullPool.concat(replacements);
  }

  gameState.spinner = {
    spinsLeft: prompt.spinner_spins || 2,
    pool: fullPool,
    currentResults: [],
    player: player,
    target: target
  };
}

function doOneSpin(callback) {
  var spinner = gameState.spinner;
  if (!spinner || spinner.spinsLeft <= 0 || !spinner.pool.length) {
    if (callback) callback(null);
    return;
  }

  // Pick a random outcome
  var outcome = randomFrom(spinner.pool);
  spinner.spinsLeft -= 1;
  spinner.currentResults.push(outcome);

  // Track clothing removal in memory
  if (outcome.category === "clothing" && outcome.item) {
    var player = spinner.player;
    if (!gameState.memory.clothingRemoved[player]) gameState.memory.clothingRemoved[player] = [];
    gameState.memory.clothingRemoved[player].push(outcome.item);
  }

  // Remove this exact outcome from pool to avoid duplicates in same spin session
  spinner.pool = spinner.pool.filter(function(o) { return o !== outcome; });

  // Inject target name into outcome text
  var text = outcome.text;
  if (spinner.target) {
    text = text.replace(/\{target\}/g, capitalize(spinner.target));
  }

  // Animate the orb with outcome text cycling
  animateSpinnerRoulette(text, spinner.pool, spinner.target, callback);
}

function createBottleSVG() {
  // Minimal wine-bottle outline — works at any color via currentColor
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 64 64");
  svg.setAttribute("class", "bottle-spin-svg");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  // Bottle shape: neck → shoulder → body → base
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d",
    "M28 4 L28 16 Q28 20 24 24 L20 28 Q16 32 16 38 L16 54 Q16 58 20 60 L44 60 Q48 58 48 54 L48 38 Q48 32 44 28 L40 24 Q36 20 36 16 L36 4 Z"
  );
  path.setAttribute("stroke", "rgba(255,255,255,0.85)");
  path.setAttribute("fill", "rgba(255,255,255,0.06)");
  svg.appendChild(path);
  // Neck ring
  var ring = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  ring.setAttribute("cx", "32"); ring.setAttribute("cy", "4");
  ring.setAttribute("rx", "5"); ring.setAttribute("ry", "2");
  ring.setAttribute("stroke", "rgba(255,255,255,0.6)");
  svg.appendChild(ring);
  return svg;
}

function animateSpinnerRoulette(finalText, pool, target, callback) {
  var el = ensureOrbNameRevealEl();
  if (!el) { if (callback) callback(finalText); return; }

  // === BOTTLE SPIN: visual spinning bottle, then result reveal ===
  if (orbRingEl) orbRingEl.classList.add("orb-spinner-active");
  setOrbRevealName("SPINNING", "cycling");
  pulseOrbSelection();

  // Hide the prompt text during the spin
  if (promptTextEl) {
    promptTextEl.textContent = "";
    promptTextEl.style.opacity = "0";
    promptTextEl.style.filter = "blur(8px)";
  }

  // Create and inject the spinning bottle into the prompt panel area
  var promptPanel = promptTextEl ? promptTextEl.parentElement : null;
  var bottleWrap = document.createElement("div");
  bottleWrap.className = "bottle-spin-wrap";
  var bottleSvg = createBottleSVG();
  bottleWrap.appendChild(bottleSvg);
  if (promptPanel) promptPanel.appendChild(bottleWrap);

  // Spin duration matches the CSS animation (3s)
  var spinDuration = 3000;

  setTimeout(function() {
    // Spin complete — remove the bottle
    if (bottleWrap.parentNode) bottleWrap.parentNode.removeChild(bottleWrap);
    if (orbRingEl) orbRingEl.classList.remove("orb-spinner-active");

    // Restore player name
    var spinPlayer = gameState.spinner ? gameState.spinner.player : "";
    if (spinPlayer) {
      setOrbRevealName(capitalize(spinPlayer), "final");
    } else {
      setOrbRevealName("", "hidden");
    }

    // Reveal the result with a dramatic fade-in
    if (promptTextEl) {
      promptTextEl.textContent = finalText;
      promptTextEl.style.transition = "none";
      promptTextEl.style.opacity = "0";
      promptTextEl.style.filter = "blur(8px)";
      promptTextEl.style.transform = "scale(0.92)";
      promptTextEl.style.letterSpacing = "";

      // Force reflow then animate in
      void promptTextEl.offsetWidth;
      promptTextEl.style.transition = "opacity 0.6s ease-out, filter 0.6s ease-out, transform 0.6s ease-out";
      promptTextEl.style.opacity = "1";
      promptTextEl.style.filter = "blur(0)";
      promptTextEl.style.transform = "scale(1)";
    }

    pulseOrbSelection();
    if (callback) setTimeout(function() { callback(finalText); }, 700);
  }, spinDuration);
}

function renderSpinnerUI(prompt, player, target) {
  var spinner = gameState.spinner;
  if (!spinner) return;

  // Show player name in the orb label
  if (playerLabelEl) {
    playerLabelEl.textContent = capitalize(player);
    playerLabelEl.style.display = "";
  }

  // Show only the most recent spin result (the bottle animation already revealed it).
  // If no spins yet, show the prompt title inviting the player to spin.
  if (promptTextEl) {
    var resultCount = spinner.currentResults.length;
    if (resultCount > 0) {
      var lastResult = spinner.currentResults[resultCount - 1];
      var lastText = lastResult.text;
      if (target) lastText = lastText.replace(/\{target\}/g, capitalize(target));
      promptTextEl.textContent = lastText;
      promptTextEl.style.fontSize = "";
    } else {
      var titleText = injectPromptText(prompt.text, player, target);
      promptTextEl.textContent = titleText;
      promptTextEl.style.fontSize = "";
    }
    promptTextEl.style.opacity = "1";
    promptTextEl.style.filter = "blur(0)";
    promptTextEl.style.transform = "scale(1)";
  }

  // Show SPIN button if spins remain, or DONE/PASS if finished
  clearFeedbackButtons();
  var wrap = getFeedbackPanelButtonsWrap();
  if (!wrap) return;

  if (spinner.spinsLeft > 0) {
    var spinBtn = createFeedbackButton(
      "SPIN (" + spinner.spinsLeft + " left)",
      "spin",
      function() {
        doOneSpin(function(resultText) {
          renderSpinnerUI(prompt, player, target);
        });
      }
    );
    spinBtn.classList.add("spin-action-btn");
    spinBtn.style.fontSize = "1.1em";
    spinBtn.style.padding = "12px 32px";
    wrap.appendChild(spinBtn);
    wrap.appendChild(createFeedbackButton("REFUSE ALL", "refused", function() {
      gameState.spinner = null;
      if (promptTextEl) { promptTextEl.style.fontSize = ""; promptTextEl.style.transform = ""; }
      recordFeedback("refused");
    }));
  } else {
    // All spins done — show results and DONE/PASS
    wrap.appendChild(createFeedbackButton("DONE", "done", function() {
      // Track in spinner history
      if (!gameState.memory.spinnerHistory[player]) gameState.memory.spinnerHistory[player] = [];
      gameState.memory.spinnerHistory[player].push({
        turn: gameState.turnCount,
        outcomes: spinner.currentResults.map(function(r) {
          var t = r.text;
          if (target) t = t.replace(/\{target\}/g, capitalize(target));
          return t;
        })
      });
      gameState.spinner = null;
      if (promptTextEl) { promptTextEl.style.fontSize = ""; promptTextEl.style.transform = ""; }
      recordFeedback("done");
    }));
    wrap.appendChild(createFeedbackButton("PASS", "pass", function() {
      gameState.spinner = null;
      if (promptTextEl) { promptTextEl.style.fontSize = ""; promptTextEl.style.transform = ""; }
      recordFeedback("pass");
    }));
  }
  feedbackPanelEl.classList.remove("is-hidden");
}

function isSpinnerPrompt(prompt) {
  return !!(prompt && prompt.spinner_spins && prompt.spinner_pools);
}

// =========================
// TURN FLOW
// =========================

function resolvePromptFlow(prompt, player, target) {
  // (Legacy hook — Director mode doesn't need per-prompt tracking)

  function finalize() {
    renderPrompt(prompt, player, target);
    revealPromptText();
    // Store in history for back/forward navigation
    var displayText = injectPromptText(prompt.text, player, target);
    gameState.promptHistory.push({
      text: displayText,
      player: (prompt.type === "group") ? "EVERYONE" : (player || ""),
      target: target || null,
      chapter: getCurrentChapter(),
      role: prompt.role,
      promptType: prompt.promptType,
      turn: gameState.turnCount,
      meta: "Turn: " + gameState.turnCount + " | Chapter: " + getCurrentChapter() + " | Role: " + prompt.role + (prompt.promptType ? " | " + prompt.promptType.toUpperCase() : "")
    });
    gameState.historyIndex = -1; // reset to "current"
    updateHistoryButtons();
    // Check if this is a spinner prompt
    if (isSpinnerPrompt(prompt)) {
      startSpinner(prompt, player, target);
      setLegacyFeedbackButtonsHidden(true);
      renderSpinnerUI(prompt, player, target);
    } else {
      requestAnimationFrame(function() { showFeedbackPanel(prompt); });
    }
    if (playerLabelEl && playerLabelEl.style.display !== "none") {
      playerLabelEl.textContent = (prompt.type === "group") ? "EVERYONE" : player;
    }
    setOrbRevealName((prompt.type === "group") ? "EVERYONE" : player, "final");
  }

  gameState.lastResolvedTarget = target || null;

  if (target) {
    gameState.pairHistory.push({ turn: gameState.turnCount, actor: player, target: target });
    if (gameState.pairHistory.length > 100) gameState.pairHistory.shift();
    gameState.recentTargets.push(target);
    if (gameState.recentTargets.length > 10) gameState.recentTargets.shift();
    animateTargetRoulette(player, target, finalize);
    return;
  }
  finalize();
}

function recordPromptCompletion(prompt, response) {
  if (!prompt) return;
  markPromptUsed(prompt.id);

  // Strategy B: track clothing-state continuity so later prompts can't contradict it.
  if ((response === "done" || response === "answered") && typeof recordClothingFromPrompt === "function") {
    recordClothingFromPrompt(prompt, gameState.currentPlayer);
  }

  // PROFILING: score the player's profile dimension when they answer a profiling prompt
  if (prompt._profileDim) {
    var player = gameState.currentPlayer;
    if (player) {
      if (!gameState.playerProfiles[player]) {
        gameState.playerProfiles[player] = { risk: 0, boldness: 0, compete: 0, openness: 0, boundaries: 0, ego: 0 };
      }
      var dim = prompt._profileDim;
      var weight = prompt._profileWeight || 1;
      if (response === "done" || response === "answered") {
        // Engaged: positive signal for this dimension
        gameState.playerProfiles[player][dim] = (gameState.playerProfiles[player][dim] || 0) + weight;
      } else if (response === "pass" || response === "refused") {
        // Avoided: the dimension is a soft spot — still informative
        // For boundaries, refusing indicates TIGHT boundaries (higher score)
        if (dim === "boundaries") {
          gameState.playerProfiles[player][dim] = (gameState.playerProfiles[player][dim] || 0) + weight;
        } else {
          gameState.playerProfiles[player][dim] = (gameState.playerProfiles[player][dim] || 0) - 0.5;
        }
      }
      // Check if enough profiling has been done for this player
      var profile = gameState.playerProfiles[player];
      var answered = 0;
      PROFILE_DIMENSIONS.forEach(function(d) { if (profile[d] > 0) answered++; });
      if (answered >= 3) gameState.profilingComplete[player] = true;

      // REVELATION CAPTURE: store what this player revealed (only on engaged answers)
      if ((response === "done" || response === "answered") && REVELATION_MAP[prompt.id]) {
        var rev = REVELATION_MAP[prompt.id];
        if (!gameState.revelations[player]) gameState.revelations[player] = [];
        // Don't store duplicate themes for the same player
        var alreadyHas = gameState.revelations[player].some(function(r) { return r.theme === rev.theme; });
        if (!alreadyHas) {
          gameState.revelations[player].push({
            theme: rev.theme,
            dim: rev.dim,
            reveal: rev.reveal,
            nudge: rev.nudge,
            promptId: prompt.id,
            turn: gameState.turnCount || 0
          });
        }
      }
    }
  }

  // JEALOUSY MEMORY: when a player answers a jealousy probe, record their claim.
  // The Yes/No buttons map to "done"/"answered" for Yes (they admit jealousy) and "no" for No.
  // We also check the profiling dimension score: low = "not_jealous", high = "jealous".
  if (prompt._jealousyProbe && gameState.currentPlayer) {
    var jPlayer = gameState.currentPlayer;
    var jProfile = gameState.playerProfiles[jPlayer] || {};
    var jScore = jProfile.jealousy || 0;
    // Heuristic: if they engaged with jealousy questions positively (high score), they're jealous.
    // If they passed or scored low, they claim "not jealous" — which is what the orb wants to test.
    if (response === "pass" || response === "refused") {
      // Refused to answer = suspicious. Orb notes them as "evasive" (treated as not_jealous for testing)
      if (!gameState.memory.jealousy[jPlayer]) gameState.memory.jealousy[jPlayer] = "evasive";
    } else {
      // Engaged: score determines classification
      // After answering, check their cumulative jealousy dimension score
      var updatedScore = (gameState.playerProfiles[jPlayer] || {}).jealousy || 0;
      if (updatedScore >= 2) {
        gameState.memory.jealousy[jPlayer] = "jealous";
      } else if (updatedScore <= 0) {
        gameState.memory.jealousy[jPlayer] = "not_jealous";
      } else {
        gameState.memory.jealousy[jPlayer] = "unsure";
      }
    }
  }

  // JEALOUSY CHAIN PROGRESSION: update active test on _askJealous steps
  if (prompt._askJealous && gameState.jealousyTestActive) {
    // The jealous player just answered "are you jealous?" — update their memory based on response
    var jp = gameState.jealousyTestActive.jealousPlayer;
    if (response === "done" || response === "answered") {
      // They engaged with the confrontation — Lyra notes the shift
      gameState.memory.jealousy[jp] = "tested_engaged";
    } else if (response === "pass" || response === "refused") {
      gameState.memory.jealousy[jp] = "tested_deflected";
    }
  }

  // Memory: first impression chain
  if (prompt.chain_id === "first_impression" && prompt.chain_step === 1 && gameState.currentPlayer && gameState.lastResolvedTarget) {
    gameState.memory.firstImpression[gameState.currentPlayer] = gameState.lastResolvedTarget;
  }

  // Chain progression — more forgiving: skip step on pass instead of killing chain
  if (prompt.chain_id) {
    var active = gameState.activeChains[prompt.chain_id];
    if (active) {
      var hasNext = getPromptPool().some(function(p) {
        return p.chapter === getCurrentChapter() && p.chain_id === prompt.chain_id && p.chain_step === active.step + 1;
      });
      if (response === "done" || response === "answered") {
        if (hasNext) {
          progressChain(prompt.chain_id);
        } else {
          endChain(prompt.chain_id); // chain completed naturally
          // Jealousy chain cleanup: record completion and clear active test
          if (prompt._jealousyChain && gameState.jealousyTestActive) {
            var jTestPlayer = gameState.jealousyTestActive.jealousPlayer;
            if (!gameState.jealousyTested[jTestPlayer]) gameState.jealousyTested[jTestPlayer] = [];
            gameState.jealousyTested[jTestPlayer].push(prompt.chain_id);
            gameState.jealousyTestActive = null;
          }
        }
      } else if (response === "pass" || response === "refused") {
        if (hasNext) {
          skipChainStep(prompt.chain_id); // skip to next step, don't kill the arc
        } else {
          endChain(prompt.chain_id);
          // Also cleanup jealousy state on chain end from pass/refuse
          if (prompt._jealousyChain && gameState.jealousyTestActive) {
            gameState.jealousyTestActive = null;
          }
        }
      }
    }
  }

  // Truth→Dare follow-through: if a truth was completed, check if it triggers a follow-up dare
  if ((response === "done" || response === "answered") && prompt.promptType === "truth" && !prompt.chain_id) {
    var promptText = (prompt.text || "").toLowerCase();
    for (var ft = 0; ft < FOLLOW_THROUGH_MAP.length; ft++) {
      if (promptText.indexOf(FOLLOW_THROUGH_MAP[ft].trigger) >= 0) {
        var ftEntry = FOLLOW_THROUGH_MAP[ft];
        var ftActor = gameState.currentPlayer;
        var ftTarget = gameState.lastResolvedTarget || null;
        // Some follow-throughs swap: the TARGET does something TO the actor
        if (ftEntry.swapActorTarget && ftTarget) {
          var tmp = ftActor;
          ftActor = ftTarget;
          ftTarget = tmp;
        }
        var ftText = ftEntry.followUp;
        if (ftTarget) ftText = ftText.replace(/\{target\}/g, capitalize(ftTarget));
        else ftText = ftText.replace(/\{target\}/g, "them");

        gameState.followThroughQueue = {
          actor: ftActor,
          target: ftTarget,
          prompt: {
            id: "FT_" + prompt.id,
            chapter: getCurrentChapter(),
            role: "action",
            type: ftTarget ? "directed" : "self",
            promptType: "dare",
            intensity: prompt.intensity + (ftEntry.intensityBoost || 0),
            text: ftText,
            target: ftTarget ? "other" : "self",
            _isFollowThrough: true
          }
        };
        break;
      }
    }
  }

  // Note: Clothing removal is already tracked by the spinner system via
  // gameState.memory.clothingRemoved in doOneSpin()
}

function finalizePromptAfterFeedback(response) {
  var prompt = gameState.lastPrompt;
  var player = gameState.currentPlayer;
  if (!prompt || !player) return;
  recordPromptCompletion(prompt, response);
  gameState.awaitingResolution = false;
  if (nextBtn) nextBtn.disabled = false;
  if (skipBtn) skipBtn.disabled = false;
  gameState.turnInChapter += 1;
  if (shouldAdvanceChapter()) advanceChapter();
  updateStageLabel();
  setTimeout(function() { nextTurn(); }, 350);
}

function recordFeedback(response) {
  // Don't hide panel yet — voting or penalty may need to reuse it.
  // Just clear the current buttons so they can't be double-clicked.
  clearFeedbackButtons();
  if (feedbackPanelEl) feedbackPanelEl.classList.add("is-hidden");

  // Momentum
  if (response === "done" || response === "answered") {
    gameState.momentum += 1;
    gameState.recentRefusals = 0;
  }
  if (response === "pass" || response === "refused") {
    gameState.momentum -= 2;
    gameState.recentRefusals += 1;
  }
  gameState.momentum = clamp(gameState.momentum, 0, 10);

  // Sportsmanship reminder — Lyra calls back to the opening vow after 3 consecutive passes/refusals.
  // Fires once per streak, then resets so it can re-trigger on a fresh streak.
  if (gameState.recentRefusals >= 3) {
    gameState.recentRefusals = 0;
    setTimeout(function() {
      if (typeof LyraVoice !== "undefined" && LyraVoice.isEnabled && LyraVoice.isEnabled()) {
        LyraVoice.play("L55");
      }
      showToast(
        "Lyra remembers.",
        "Tonight you promised to be honest, to be brave... and to be good sports."
      );
    }, 400);
  }

  // Pair affinity
  var actor = gameState.currentPlayer;
  var target = gameState.lastResolvedTarget;
  if (actor && target && (response === "done" || response === "answered")) {
    var key = [actor, target].sort().join("|");
    gameState.pairAffinity[key] = (gameState.pairAffinity[key] || 0) + 1;
  }

  if (metaTextEl) metaTextEl.textContent += " | " + response.toUpperCase();

  // Penalty spinner: if player passed/refused, maybe trigger a punishment spin
  if ((response === "pass" || response === "refused") && !isSpinnerPrompt(gameState.lastPrompt)) {
    var originalPrompt = gameState.lastPrompt;
    var penaltyTriggered = maybeTriggerPenalty(actor);
    if (penaltyTriggered) {
      // Settle the ORIGINAL prompt's bookkeeping (chain skip, profiling) with
      // the real response now — the penalty flow replaces lastPrompt, so its
      // own finalize would otherwise never resolve this prompt and chains
      // would re-serve the same step forever.
      recordPromptCompletion(originalPrompt, response);
      // Don't finalize yet — the penalty UI will finalize when done
      return;
    }
  }

  // === VOTING TRIGGER: after truth prompts (random), or ALWAYS when the
  // prompt itself asks for a rating ("rates it 1-5", "did she get it right") —
  // the 1-5 vote overlay IS the rating, with real stakes: points = sum x 10,
  // and a low average triggers Lyra's deeper follow-up.
  if ((response === "done" || response === "answered") &&
      (shouldTriggerVoting() || isRatingPrompt(gameState.lastPrompt))) {
    startVoting();
    return; // Don't finalize yet — voting will call finalizePromptAfterFeedback
  }

  // No voting or penalty — fully hide and restore legacy buttons
  setLegacyFeedbackButtonsHidden(false);
  finalizePromptAfterFeedback(response);
}

// =========================
// VOTING & VULNERABILITY
// =========================

// Follow-up prompts — Lyra digs deeper when players vote "Reveal More"
var FOLLOWUP_TEMPLATES = [
  "That's interesting... but Lyra wants more. Tell the group — what were you really feeling in that moment?",
  "Lyra senses you're holding back. Give the group one detail you left out.",
  "The group wants to know more. Who was involved? What happened next?",
  "Lyra doesn't believe that's the full story. Give us the version you'd tell your best friend at 2am.",
  "Close your eyes. Take a breath. Now tell the group what you really wanted to say.",
  "The energy shifted when you answered. Lyra noticed. What aren't you telling us?",
  "That answer was safe. Lyra respects safety... but rewards bravery. Try again — deeper this time.",
  "One word answers feed Lyra nothing. Give us the real story — the messier, the better.",
  "Lyra can feel you thinking. Say the thing you almost said but stopped yourself.",
  "The group is listening. This is a safe space. Now — what's the part you skipped?"
];

// Minigame prompts injected into the pool
var MINIGAME_PROMPTS = [
  { id: "MINI_01", chapter: "playful", role: "interaction", type: "group", promptType: "dare",
    intensity: 2, text: "Speed round! Everyone has 5 seconds to answer: what is your guilty pleasure food? Slowest player takes a shot.", target: "group", minigame: "speed" },
  { id: "MINI_02", chapter: "playful", role: "interaction", type: "group", promptType: "dare",
    intensity: 2, text: "Two truths and a lie! {player} — tell the group three things about yourself. Everyone votes on which one is the lie.", target: "group", minigame: "vote" },
  { id: "MINI_03", chapter: "playful", role: "build", type: "group", promptType: "dare",
    intensity: 2.5, text: "Everyone vote: who in this room is the worst liar? Point at them on the count of three!", target: "group", minigame: "point" },
  { id: "MINI_04", chapter: "playful", role: "build", type: "group", promptType: "dare",
    intensity: 2.5, text: "Trivia challenge: {player} picks a category. Everyone else has 10 seconds to answer. Worst answer takes a sip.", target: "group", minigame: "trivia" },
  { id: "MINI_05", chapter: "playful", role: "interaction", type: "group", promptType: "dare",
    intensity: 2, text: "Rock paper scissors tournament! Everyone plays the person to their left. Loser picks a partner and dances the rest of this song together.", target: "group", minigame: "rps" },
  { id: "MINI_06", chapter: "personal", role: "interaction", type: "group", promptType: "dare",
    intensity: 3.5, text: "Everyone write down who they think has the most interesting secret in this room. Reveal on three!", target: "group", minigame: "point" },
  { id: "MINI_07", chapter: "personal", role: "build", type: "group", promptType: "dare",
    intensity: 4, text: "Hot seat! {player} sits in the center. Everyone asks one personal question. You must answer all of them.", target: "group", minigame: "hotseat" },
  { id: "MINI_08", chapter: "playful", role: "setup", type: "group", promptType: "dare",
    intensity: 2, text: "Staring contest! {player} picks an opponent. First to laugh or look away takes a drink.", target: "group", minigame: "challenge" },
  { id: "MINI_09", chapter: "personal", role: "interaction", type: "group", promptType: "truth",
    intensity: 4, text: "Everyone answers: what's the one thing you want to know about someone in this room but have never asked? Say it now.", target: "group", minigame: "reveal" },
  { id: "MINI_10", chapter: "playful", role: "build", type: "group", promptType: "dare",
    intensity: 2.5, text: "Impression game! {player} — do your best impression of someone in this room. Everyone guesses who it is.", target: "group", minigame: "impression" },
  { id: "MINI_11", chapter: "personal", role: "build", type: "group", promptType: "dare",
    intensity: 3.5, text: "Everyone close your eyes. Point at the person you think is most likely to cry at a movie. Open your eyes!", target: "group", minigame: "point" },
  { id: "MINI_12", chapter: "flirty", role: "interaction", type: "group", promptType: "dare",
    intensity: 5, text: "Vote! Who in this room gives off the most seductive energy? Point on three. That person picks the next dare.", target: "group", minigame: "point" },
  { id: "MINI_13", chapter: "suggestive", role: "interaction", type: "group", promptType: "dare",
    intensity: 6, text: "Trust fall! {player} — fall backwards into the arms of whoever you trust most in this room. Choose wisely.", target: "group", minigame: "challenge" },
  { id: "MINI_14", chapter: "flirty", role: "build", type: "group", promptType: "truth",
    intensity: 5, text: "Anonymous confession! Everyone writes something they've never told the group on their phone. Shuffle and read them aloud.", target: "group", minigame: "reveal" }
];

// Couples minigames — 2-player versions: partner quizzes, challenges, duels.
// Same stage gate as group minigames (personal through suggestive).
var COUPLES_MINIGAME_PROMPTS = [
  { id: "CMINI_01", chapter: "personal", role: "interaction", type: "directed", promptType: "dare",
    intensity: 2, text: "Partner quiz! {actor}, you have 5 seconds: what is {target}'s guilty pleasure food? {target} judges. Wrong answer costs a sip.", target: "other", minigame: "speed" },
  { id: "CMINI_02", chapter: "personal", role: "interaction", type: "directed", promptType: "dare",
    intensity: 2, text: "Two truths and a lie! {actor} — three things from your life before you two met. {target} has one guess to find the lie. If they nail it, you take a sip.", target: "other", minigame: "vote" },
  { id: "CMINI_03", chapter: "personal", role: "build", type: "directed", promptType: "dare",
    intensity: 2, text: "Staring contest! First to laugh or look away answers one question from the winner — total honesty, no passing.", target: "other", minigame: "challenge" },
  { id: "CMINI_04", chapter: "personal", role: "build", type: "directed", promptType: "dare",
    intensity: 2.5, text: "Impression time! {actor}, do your best impression of {target} in a specific situation of your choosing. {target} rates it out of 5 — below 3 means you try again.", target: "other", minigame: "impression" },
  { id: "CMINI_05", chapter: "personal", role: "interaction", type: "directed", promptType: "dare",
    intensity: 2, text: "Rock paper scissors, best of three! Loser owes the winner one favor tonight — winner declares it now, Lyra remembers.", target: "other", minigame: "rps" },
  { id: "CMINI_06", chapter: "playful", role: "interaction", type: "directed", promptType: "dare",
    intensity: 3, text: "Thumb war! Winner assigns the loser a 10-second dare, right now. Make it count.", target: "other", minigame: "challenge" },
  { id: "CMINI_07", chapter: "playful", role: "build", type: "directed", promptType: "dare",
    intensity: 3, text: "Mirror dance! {actor} leads for 15 seconds, {target} mirrors every move. Then swap. Worst mirror — you both vote — takes a sip.", target: "other", minigame: "challenge" },
  { id: "CMINI_08", chapter: "playful", role: "interaction", type: "directed", promptType: "dare",
    intensity: 3, text: "Guess my answer! {actor}, ask {target}: 'What would I say is my most attractive quality?' {target} answers for you. Then reveal your real answer.", target: "other", minigame: "vote" },
  { id: "CMINI_09", chapter: "playful", role: "build", type: "directed", promptType: "dare",
    intensity: 3, text: "Finish my sentence! {actor} starts a sentence about {target} three times — '{target} always...', '{target} secretly...', '{target} never...'. {target} confirms or corrects each one.", target: "other", minigame: "reveal" },
  { id: "CMINI_10", chapter: "playful", role: "setup", type: "directed", promptType: "dare",
    intensity: 3, text: "Speed round! 5 seconds each, back and forth: name things you love about each other. First to stall, repeat, or laugh takes a sip.", target: "other", minigame: "speed" },
  { id: "CMINI_11", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare",
    intensity: 5, text: "Eye contact duel! One full minute, faces close, no talking, no laughing. Whoever breaks first — the winner whispers one instruction in their ear, to be done before the next stage.", target: "other", minigame: "challenge" },
  { id: "CMINI_12", chapter: "flirty", role: "build", type: "directed", promptType: "dare",
    intensity: 5, text: "Rock paper scissors — for stakes. Winner chooses exactly where the loser kisses them. Take your time deciding.", target: "other", minigame: "rps" },
  { id: "CMINI_13", chapter: "suggestive", role: "interaction", type: "directed", promptType: "dare",
    intensity: 6, text: "Blind trust walk! {target} closes their eyes. {actor} guides them around the room with only fingertips and whispers, then delivers them somewhere unexpected. No peeking.", target: "other", minigame: "challenge" },
  { id: "CMINI_14", chapter: "suggestive", role: "build", type: "directed", promptType: "dare",
    intensity: 6, text: "Freeze dance — slow version. Dance close. When either of you says 'freeze', hold completely still, exactly where you are, for ten breaths. Then keep dancing. Three freezes each.", target: "other", minigame: "challenge" }
];

// Inject minigame prompts into the main pool on load
(function() {
  MINIGAME_PROMPTS.forEach(function(m) {
    if (!PROMPTS.some(function(p) { return p.id === m.id; })) {
      PROMPTS.push(m);
    }
  });
  COUPLES_MINIGAME_PROMPTS.forEach(function(m) {
    if (!COUPLES_PROMPTS.some(function(p) { return p.id === m.id; })) {
      COUPLES_PROMPTS.push(m);
    }
  });
})();

// =========================
// DANCE BREAKS — music-driven partner mixing (group mode, 3+ players)
// Lyra cuts the rhythm and pulls everyone to their feet. The music IS the
// mechanic: dance to the beat, and on her cue — switch partners. Escalates
// from social sway to slow, close, charged. This is the seduction engine.
// =========================
var DANCE_BREAK_PROMPTS = [
  { id: "DANCE_01", chapter: "personal", role: "interaction", type: "group", promptType: "dare", intensity: 2,
    text: "Dance break. Everyone on your feet — no sitting this one out. Find the beat Lyra is playing and move, even badly. When the rhythm changes, swap places with someone across the room.", target: "group", minigame: "dance" },
  { id: "DANCE_02", chapter: "playful", role: "interaction", type: "group", promptType: "dare", intensity: 3,
    text: "Lyra wants you moving. Grab a partner who is NOT your closest friend here and dance one verse together. When she claps the beat — switch. New partner, no hesitation.", target: "group", minigame: "dance" },
  { id: "DANCE_03", chapter: "playful", role: "build", type: "group", promptType: "dare", intensity: 3.5,
    text: "Circle up and dance. Every time the song hits the chorus, everyone shifts one partner to the left. Keep going until Lyra says stop. Whoever stops moving first owes the group a shot.", target: "group", minigame: "dance" },
  { id: "DANCE_04", chapter: "flirty", role: "interaction", type: "group", promptType: "dare", intensity: 5,
    text: "The rhythm slows. Pick a partner and dance closer than feels comfortable. Hold their eyes, not their conversation. At the drop — leave them for someone new.", target: "group", minigame: "dance" },
  { id: "DANCE_05", chapter: "flirty", role: "build", type: "group", promptType: "dare", intensity: 5.5,
    text: "Lights low. Choose someone you haven't touched tonight and dance one slow song hand-in-hand. When it fades, don't sit — find the next person and begin again.", target: "group", minigame: "dance" },
  { id: "DANCE_06", chapter: "suggestive", role: "interaction", type: "group", promptType: "dare", intensity: 6.5,
    text: "Deep, slow rhythm. Find a partner, hands on waists, move together for one full verse — no talking. On Lyra's cue, switch partners and pick up exactly where you left off.", target: "group", minigame: "dance" },
  { id: "DANCE_07", chapter: "intimate", role: "build", type: "group", promptType: "dare", intensity: 7.5,
    text: "Bodies close now. Dance with one partner, chest to chest, until the song breaks. Then pass them on and let someone new pull you in. Let the music decide how far you lean.", target: "group", minigame: "dance" },
  { id: "DANCE_08", chapter: "erotic", role: "action", type: "group", promptType: "dare", intensity: 8.5,
    text: "Slow it all the way down. One partner, no gap between you, hands wherever the rhythm takes them. When Lyra shifts the beat — switch, and don't lose the heat.", target: "group", minigame: "dance" }
];

(function() {
  DANCE_BREAK_PROMPTS.forEach(function(m) {
    if (!PROMPTS.some(function(p) { return p.id === m.id; })) {
      PROMPTS.push(m);
    }
  });
})();

// Dance break chance — music-aware interlude, rarer than minigames, group only.
function maybePickDanceBreak(chapter) {
  if (isCouplesMode()) return null;
  if (gameState.players.length < 3) return null;
  // Music is the whole point — skip if the player turned it off.
  var mt = document.getElementById("musicToggle");
  if (mt && !mt.checked) return null;
  // Long cooldown so it stays an event, not a chore.
  if (gameState.lastDanceTurn && gameState.turnCount - gameState.lastDanceTurn < 8) return null;
  // Need a little warm-up before the first one.
  if (gameState.turnCount < 4) return null;

  var chance = 0;
  if (chapter === "personal")        chance = 0.10;
  else if (chapter === "playful")    chance = 0.16;
  else if (chapter === "flirty")     chance = 0.18;
  else if (chapter === "suggestive") chance = 0.16;
  else if (chapter === "intimate")   chance = 0.14;
  else if (chapter === "erotic")     chance = 0.12;
  else return null; // no dance breaks in taboo — chains carry it

  if (Math.random() > chance) return null;

  var available = DANCE_BREAK_PROMPTS.filter(function(m) {
    return m.chapter === chapter && !wasRecentlyUsedPrompt(m.id);
  });
  // Fall back to the nearest-stage dance break so the mechanic still fires.
  if (!available.length) {
    available = DANCE_BREAK_PROMPTS.filter(function(m) { return !wasRecentlyUsedPrompt(m.id); });
  }
  if (!available.length) return null;

  gameState.lastDanceTurn = gameState.turnCount;
  return randomFrom(available);
}

// Keywords that indicate a truth prompt is PERSONAL (worth voting on).
// Trivial opinion questions like "best band" or "favourite movie" don't qualify.
var PERSONAL_TRUTH_KEYWORDS = [
  "you feel", "you felt", "you ever", "your heart", "your relationship",
  "in love", "in bed", "attracted", "crush", "ex ", "breakup", "broke up",
  "secret", "ashamed", "embarrass", "regret", "afraid", "scared", "fear",
  "insecure", "vulnerable", "intimate", "jealous", "cheat", "betray",
  "fantasy", "fantasize", "desire", "turn you on", "turned on", "aroused",
  "kiss", "touch", "body", "naked", "sex", "hookup", "one night",
  "love language", "first impression", "first time", "virginity",
  "cry", "cried", "heartbreak", "heartbroken", "lonely",
  "three words", "rank everyone", "most attractive", "what draws you",
  "who here", "someone in this room", "player in this room"
];

function isPersonalTruth(prompt) {
  if (!prompt || !prompt.text) return false;
  var text = prompt.text.toLowerCase();
  for (var i = 0; i < PERSONAL_TRUTH_KEYWORDS.length; i++) {
    if (text.indexOf(PERSONAL_TRUTH_KEYWORDS[i]) >= 0) return true;
  }
  return false;
}

// Prompts whose text explicitly asks for a rating or a right/wrong verdict.
// These always get the 1-5 vote overlay after completion.
function isRatingPrompt(prompt) {
  if (!prompt || !prompt.text) return false;
  if (isSpinnerPrompt(prompt)) return false;
  var t = prompt.text;
  return /\brat(e|es|ing)s?\b[^.]{0,60}\b(1-5|1 to 5|out of 5|scale of 1 to 5)/i.test(t) ||
         /\b(1-5|1 to 5|out of 5|scale of 1 to 5)\b[^.]{0,40}\brat(e|es|ing)/i.test(t) ||
         /did .{0,40}get it right/i.test(t);
}

function shouldTriggerVoting() {
  var prompt = gameState.lastPrompt;
  if (!prompt) return false;
  // Only on truth prompts that are directed at a specific player
  if (prompt.promptType !== "truth") return false;
  if (prompt.type !== "directed" && prompt.type !== "self") return false;
  // Not spinner or minigame prompts
  if (isSpinnerPrompt(prompt)) return false;
  if (prompt.id && prompt.id.indexOf("MINI_") === 0) return false;
  // Not during chains (breaks flow)
  if (prompt.chain_id) return false;
  // Not follow-through prompts
  if (prompt._isFollowThrough || prompt._isBridge) return false;
  // CRITICAL: Only vote on PERSONAL truths — not trivial opinion questions
  if (!isPersonalTruth(prompt)) return false;
  // Cooldown: at least 4 turns between votes
  if (gameState.turnCount - gameState.lastVotedTurn < 4) return false;
  // Only in early-mid stages (playful through suggestive)
  var chapter = getCurrentChapter();
  if (chapter === "intimate" || chapter === "erotic" || chapter === "taboo") return false;

  // Probability: higher in early stages
  var chance = 0;
  if (chapter === "playful") chance = 0.35;
  else if (chapter === "personal") chance = 0.45;
  else if (chapter === "flirty") chance = 0.30;
  else if (chapter === "suggestive") chance = 0.20;

  return Math.random() < chance;
}

function startVoting() {
  gameState.votingActive = true;
  gameState.lastVotedTurn = gameState.turnCount;

  var actor = gameState.currentPlayer;
  var otherPlayers = gameState.players.filter(function(p) { return p.name !== actor; });

  // Show voting UI — hide legacy buttons and clear dynamic ones
  clearFeedbackButtons();
  setLegacyFeedbackButtonsHidden(true);
  var wrap = getFeedbackPanelButtonsWrap();
  if (!wrap) { finalizePromptAfterFeedback("done"); return; }

  // Change prompt text to voting instruction
  if (promptTextEl) {
    var originalText = promptTextEl.textContent;
    var isDareRating = gameState.lastPrompt && gameState.lastPrompt.promptType === "dare";
    var judge = isCouplesMode()
      ? (otherPlayers.length ? capitalize(otherPlayers[0].name) : "Your partner")
      : "The group";
    if (isDareRating) {
      promptTextEl.textContent = "How did " + capitalize(actor) + " do? " + judge + " rates it 1-5.";
    } else {
      promptTextEl.textContent = "Did " + capitalize(actor) + " reveal enough? " + judge + " decides.";
    }
    promptTextEl.style.opacity = "0.8";
  }

  // Numeric 1-5 rating per other player ("Say your scores!")
  var votes = { sum: 0, count: 0, total: otherPlayers.length };

  function finishVoting() {
    gameState.votingActive = false;
    var avg = votes.count ? votes.sum / votes.count : 5;
    // Bonus points to the actor from the crowd's ratings
    var ap = gameState.players.filter(function(pp) { return pp.name === actor; })[0];
    if (ap) ap.score = (ap.score || 0) + votes.sum * 10;
    if (typeof window !== "undefined" && window.OrbDynamicUI) window.OrbDynamicUI.renderPlayerCards();
    if (avg < 3) {
      // Crowd wants more — trigger follow-up
      triggerFollowUp(actor);
    } else {
      // Well received — reward vulnerability
      addVulnerability(actor, 1);
      finalizePromptAfterFeedback("done");
    }
  }

  if (!otherPlayers.length) { finishVoting(); return; }

  // Create a 1-5 rating row for each other player
  otherPlayers.forEach(function(p) {
    var playerVoteWrap = document.createElement("div");
    playerVoteWrap.style.display = "flex";
    playerVoteWrap.style.flexDirection = "column";
    playerVoteWrap.style.alignItems = "center";
    playerVoteWrap.style.gap = "4px";

    var nameLabel = document.createElement("span");
    nameLabel.textContent = p.name;
    nameLabel.style.fontSize = "0.7em";
    nameLabel.style.opacity = "0.6";
    nameLabel.style.fontFamily = "'Rajdhani', sans-serif";
    playerVoteWrap.appendChild(nameLabel);

    var btnWrap = document.createElement("div");
    btnWrap.style.display = "flex";
    btnWrap.style.gap = "5px";

    [1, 2, 3, 4, 5].forEach(function(r) {
      var rateBtn = createFeedbackButton(String(r), r >= 4 ? "done" : (r <= 2 ? "refused" : "pass"), function() {
        votes.sum += r;
        votes.count++;
        playerVoteWrap.style.opacity = "0.3";
        playerVoteWrap.style.pointerEvents = "none";
        if (typeof window !== "undefined" && window.OrbVoteBubble) window.OrbVoteBubble(p.name, r);
        if (votes.count >= votes.total) finishVoting();
      });
      rateBtn.style.minWidth = "40px";
      rateBtn.style.fontSize = "14px";
      rateBtn.style.padding = "6px 8px";
      btnWrap.appendChild(rateBtn);
    });

    playerVoteWrap.appendChild(btnWrap);
    wrap.appendChild(playerVoteWrap);
  });

  feedbackPanelEl.classList.remove("is-hidden");
}

function triggerFollowUp(playerName) {
  // Pick a random follow-up template
  var template = FOLLOWUP_TEMPLATES[Math.floor(Math.random() * FOLLOWUP_TEMPLATES.length)];

  // In couples mode, replace "the group" / "us" with partner-appropriate language
  if (isCouplesMode()) {
    var others = gameState.players.filter(function(p) { return p.name !== playerName; });
    var partner = others.length ? capitalize(others[0].name) : "your partner";
    template = template.replace(/\bthe group\b/gi, partner)
                       .replace(/\bTell us\b/g, "Tell " + partner)
                       .replace(/\bGive us\b/g, "Give " + partner);
  }

  // Show the follow-up as a new prompt
  if (promptTextEl) {
    promptTextEl.textContent = template;
    promptTextEl.style.opacity = "1";
    promptTextEl.style.animation = "promptReveal 500ms ease";
  }
  setLegacyFeedbackButtonsHidden(true);
  setOrbRevealName(capitalize(playerName), "final");

  // Add extra vulnerability for being pressed
  addVulnerability(playerName, 2);

  // Show simple Done/Pass for the follow-up
  clearFeedbackButtons();
  var wrap = getFeedbackPanelButtonsWrap();
  if (!wrap) return;

  wrap.appendChild(createFeedbackButton("DONE", "done", function() {
    addVulnerability(playerName, 1); // Extra point for completing the follow-up
    finalizePromptAfterFeedback("done");
  }));
  wrap.appendChild(createFeedbackButton("PASS", "pass", function() {
    finalizePromptAfterFeedback("pass");
  }));
  feedbackPanelEl.classList.remove("is-hidden");
}

function addVulnerability(playerName, amount) {
  if (!gameState.vulnerability[playerName]) gameState.vulnerability[playerName] = 0;
  gameState.vulnerability[playerName] += amount;
}

function getVulnerability(playerName) {
  return gameState.vulnerability[playerName] || 0;
}

// Minigame chance — inject minigames into the selection flow
function maybePickMinigame(chapter) {
  // Only in playful through flirty
  if (chapter !== "playful" && chapter !== "personal" && chapter !== "flirty" && chapter !== "suggestive") return null;
  // Cooldown: not back to back
  if (gameState.lastMinigameTurn && gameState.turnCount - gameState.lastMinigameTurn < 5) return null;
  // Probability based on stage
  var chance = 0;
  if (chapter === "playful") chance = 0.18;
  else if (chapter === "personal") chance = 0.15;
  else if (chapter === "flirty") chance = 0.10;
  else if (chapter === "suggestive") chance = 0.08;

  if (Math.random() > chance) return null;

  var minigamePool = isCouplesMode() ? COUPLES_MINIGAME_PROMPTS : MINIGAME_PROMPTS;
  var available = minigamePool.filter(function(m) {
    return m.chapter === chapter && !wasRecentlyUsedPrompt(m.id);
  });
  if (!available.length) return null;

  gameState.lastMinigameTurn = gameState.turnCount;
  return randomFrom(available);
}

function nextTurn() {
  // If browsing history, snap back to current first
  if (gameState.historyIndex >= 0) { returnToCurrent(); return; }
  if (gameState.awaitingResolution) return;

  if (!getPromptPool().length) {
    if (promptTextEl) promptTextEl.textContent = "No prompts loaded. Check that " + (isCouplesMode() ? "couples_prompts_v2.js" : "prompts_v2.js") + " is present.";
    return;
  }
  if (!gameState.players.length) {
    openSetupOverlay();
    buildOrbNameWheel();
    return;
  }

  hideFeedbackPanel();
  if (promptTextEl) { promptTextEl.textContent = ""; promptTextEl.style.opacity = "0"; promptTextEl.style.animation = "none"; }
  if (metaTextEl) metaTextEl.textContent = "";

  // Maybe show a random toast (small chance, spaced out)
  maybeShowRandomToast();

  gameState.turnCount += 1;

  // Override player selection for special modes (follow-through, bridge)
  var player;
  if (gameState.followThroughQueue) {
    // Follow-through: the actor from the queued dare takes the turn
    player = gameState.followThroughQueue.actor;
    gameState.currentPlayer = player;
    if (player === gameState.lastActor) {
      gameState.consecutiveActorCount += 1;
    } else {
      gameState.consecutiveActorCount = 1;
    }
    gameState.lastActor = player;
  } else if (gameState.postChainBridge) {
    // Bridge: the third player is the actor
    player = gameState.postChainBridge.third;
    gameState.currentPlayer = player;
    if (player === gameState.lastActor) {
      gameState.consecutiveActorCount += 1;
    } else {
      gameState.consecutiveActorCount = 1;
    }
    gameState.lastActor = player;
  } else {
    player = chooseNextPlayer();
  }

  // Try AI generation first (if enabled), then fall back to offline
  function proceedWithSelected(selected) {
    if (!selected || !selected.prompt) {
      if (promptTextEl) { promptTextEl.textContent = "No matching prompt found."; promptTextEl.style.opacity = "1"; }
      return;
    }

    gameState.currentPlayer = selected.actor || player;
    gameState.lastPrompt = selected.prompt;
    gameState.awaitingResolution = true;
    if (nextBtn) nextBtn.disabled = true;
    if (skipBtn) skipBtn.disabled = true;

    // Show Orb voice commentary before the prompt (AI-generated only)
    var orbVoice = (selected.prompt.orb_voice && typeof selected.prompt.orb_voice === "string") ? selected.prompt.orb_voice : null;

    animateOrbRoulette(gameState.currentPlayer, function() {
      try {
        if (orbVoice && typeof window.OrbAI !== "undefined" && window.OrbAI.showOrbVoice) {
          window.OrbAI.showOrbVoice(orbVoice, function() {
            resolvePromptFlow(selected.prompt, selected.actor || player, selected.target || null);
          });
        } else {
          resolvePromptFlow(selected.prompt, selected.actor || player, selected.target || null);
        }
      } catch (e) {
        console.error("[Orb] Error in prompt flow:", e);
        resolvePromptFlow(selected.prompt, selected.actor || player, selected.target || null);
      }
    });
  }

  // Check for active chains first — these always use offline prompts
  var continuation = findChainContinuation();
  if (continuation) {
    proceedWithSelected({ prompt: continuation.prompt, actor: continuation.actor, target: continuation.target });
    return;
  }

  // =========================
  // AI DIRECTOR: ask the AI what should happen, then execute with curated prompts
  // =========================

  function executeDirective(directive, player) {
    var chapter = getCurrentChapter();
    var role = getCurrentRole();
    var action = (directive && directive.action) || "normal";

    // Handle Orb voice — show it before the prompt
    var orbVoiceText = (directive && directive.orbVoice) ? directive.orbVoice : null;

    // --- SPINNER directive ---
    if (action === "spinner" && chapter !== "playful" && chapter !== "personal") {
      var spinnerPrompt = maybePickSpinner(chapter);
      if (spinnerPrompt) {
        var spinTarget = chooseTarget(player, spinnerPrompt);
        gameState.lastSpinnerTurn = gameState.turnCount;
        if (orbVoiceText) spinnerPrompt.orb_voice = orbVoiceText;
        return { prompt: spinnerPrompt, actor: player, target: spinTarget };
      }
    }

    // --- START CHAIN directive ---
    if (action === "start_chain" && directive.chainId) {
      // Validate chain is for current stage
      var chainStarters = getPromptPool().filter(function(p) {
        return p.chain_id === directive.chainId && p.chain_step === 1 &&
          !wasRecentlyUsedPrompt(p.id) && gameState.recentChains.indexOf(p.chain_id) < 0;
      });
      if (chainStarters.length) {
        var starter = chainStarters[0];
        if (starter.chapter === chapter) {
          var cTarget = chooseTarget(player, starter);
          // Gender check for chains like erotic_lingerie
          if (starter.target_gender) {
            var genderTargets = getOtherPlayerNames(player).filter(function(name) {
              var p = getPlayerByName(name);
              return p && p.gender === starter.target_gender;
            });
            if (genderTargets.length) cTarget = randomFrom(genderTargets);
            else cTarget = null;
          }
          if (cTarget) {
            startChain(starter.chain_id, player, cTarget);
            if (orbVoiceText) starter.orb_voice = orbVoiceText;
            return { prompt: starter, actor: player, target: cTarget };
          }
        }
      }
    }

    // --- TARGET PAIR directive ---
    if (action === "target_pair" && directive.pair) {
      var pairNames = directive.pair.split("+");
      if (pairNames.length === 2) {
        // Use the pair — first name is actor, second is target (or swap if first isn't current player)
        var pActor = pairNames[0].trim();
        var pTarget = pairNames[1].trim();
        if (pActor !== player) { pTarget = pActor; pActor = player; }
        // Validate target exists
        var validTarget = getPlayerByName(pTarget);
        if (validTarget && pTarget !== player) {
          var sel = selectPrompt(player);
          if (sel) {
            sel.target = pTarget;
            if (orbVoiceText) sel.prompt.orb_voice = orbVoiceText;
            return sel;
          }
        }
      }
    }

    // --- BOOST directive: pick a prompt with higher intensity ---
    if (action === "boost") {
      var skipGrp = isCouplesMode();
      var pool = getPromptPool().filter(function(p) {
        return p.chapter === chapter && !p.chain_id && !wasRecentlyUsedPrompt(p.id) &&
          promptMatchesGender(p, player) && p.intensity >= 6 &&
          !(skipGrp && p.type === "group");
      });
      if (pool.length) {
        var boosted = themeAwareRandom(pool);
        var bTarget = chooseTarget(player, boosted);
        if (orbVoiceText) boosted.orb_voice = orbVoiceText;
        return { prompt: boosted, actor: player, target: bTarget };
      }
    }

    // --- COOLDOWN directive: pick a lighter prompt ---
    if (action === "cooldown") {
      var skipGrp2 = isCouplesMode();
      var coolPool = getPromptPool().filter(function(p) {
        return p.chapter === chapter && !p.chain_id && !wasRecentlyUsedPrompt(p.id) &&
          p.promptType === "truth" && p.intensity <= 5 &&
          !(skipGrp2 && p.type === "group");
      });
      if (coolPool.length) {
        var cooled = themeAwareRandom(coolPool);
        var cdTarget = chooseTarget(player, cooled);
        if (orbVoiceText) cooled.orb_voice = orbVoiceText;
        return { prompt: cooled, actor: player, target: cdTarget };
      }
    }

    // --- FORCE TYPE directive ---
    if (action === "normal" && directive && directive.forceType) {
      var skipGrp3 = isCouplesMode();
      var ftPool = getPromptPool().filter(function(p) {
        return p.chapter === chapter && p.role === role && !p.chain_id &&
          !wasRecentlyUsedPrompt(p.id) && promptMatchesGender(p, player) &&
          p.promptType === directive.forceType &&
          !(skipGrp3 && p.type === "group");
      });
      if (ftPool.length) {
        var forced = themeAwareRandom(ftPool);
        var ftTarget = chooseTarget(player, forced);
        if (orbVoiceText) forced.orb_voice = orbVoiceText;
        return { prompt: forced, actor: player, target: ftTarget };
      }
    }

    // --- NORMAL (default): standard prompt selection, but attach orbVoice if present ---
    var normalSel = selectPrompt(player);
    if (normalSel && orbVoiceText) {
      normalSel.prompt.orb_voice = orbVoiceText;
    }
    return normalSel;
  }

  // AI Director enabled: get directive then execute
  if (typeof window.OrbAI !== "undefined" && window.OrbAI.isEnabled()) {
    // Chains first — always handled by offline engine
    var chapter = getCurrentChapter();
    var role = getCurrentRole();
    var chainTarget = chooseTarget(player);
    var chainResult2 = maybeStartAvailableChain(chapter, role, player, chainTarget);
    if (chainResult2 && chainResult2.prompt) {
      proceedWithSelected({ prompt: chainResult2.prompt, actor: player, target: chainResult2.target || chainTarget });
      // Prefetch next directive while chain prompt plays
      if (window.OrbAI.prefetch) window.OrbAI.prefetch();
      return;
    }

    // Check for prefetched directive (instant, no delay)
    if (window.OrbAI.hasPrefetched && window.OrbAI.hasPrefetched()) {
      var directive = window.OrbAI.consumePrefetched();
      var result = executeDirective(directive, player);
      proceedWithSelected(result);
      if (window.OrbAI.prefetch) window.OrbAI.prefetch();
      return;
    }

    // No prefetch — ask the AI Director (may add slight delay on some turns)
    gameState.currentPlayer = player;
    window.OrbAI.getDirective(function(directive) {
      try {
        var result = executeDirective(directive, player);
        proceedWithSelected(result);
        if (window.OrbAI.prefetch) window.OrbAI.prefetch();
      } catch (e) {
        console.error("[Orb Director] Error executing directive:", e);
        var fallback = selectPrompt(player);
        proceedWithSelected(fallback);
      }
    });
    return;
  }

  // Offline mode (no AI): dance break first (music-driven partner mixing),
  // then minigame, then standard prompt — all group only.
  var chapter = getCurrentChapter();
  var dance = isCouplesMode() ? null : maybePickDanceBreak(chapter);
  if (dance) {
    var dxText = dance.text.replace(/\{player\}/g, capitalize(player));
    dance = Object.assign({}, dance, { text: dxText });
    proceedWithSelected({ prompt: dance, actor: player, target: null });
    return;
  }
  var minigame = maybePickMinigame(chapter);
  if (minigame) {
    var mgText = minigame.text.replace(/\{player\}/g, capitalize(player));
    minigame = Object.assign({}, minigame, { text: mgText });
    // Couples minigames are directed at the partner; group ones address everyone
    var mgTarget = isCouplesMode() ? chooseTarget(player, minigame) : null;
    proceedWithSelected({ prompt: minigame, actor: player, target: mgTarget });
    return;
  }
  var selected = selectPrompt(player);
  proceedWithSelected(selected);
}

function skipTurn() {
  if (gameState.historyIndex >= 0) { returnToCurrent(); return; }
  if (gameState.awaitingResolution) return;
  hideFeedbackPanel();
  nextTurn();
}

// =========================
// RESET
// =========================

function resetGame() {
  // Lyra's memory: before wiping session state, persist what she learned
  try {
    if (typeof LyraMemory !== "undefined" && gameState.players && gameState.players.length) {
      LyraMemory.saveAll();
      showLyraRecap();
    }
  } catch (e) { console.warn("LyraMemory save-on-reset failed", e); }

  gameState.playerHistory = [];
  gameState.currentPlayer = null;
  gameState.currentPlayerIndex = -1;
  gameState.chapterIndex = 0;
  gameState.turnCount = 0;
  gameState.turnInChapter = 0;
  gameState.activeChains = {};
  gameState.completedPromptIds = [];
  gameState.recentPromptIds = [];
  gameState.recentTargets = [];
  gameState.pairHistory = [];
  gameState.recentChains = [];
  gameState.momentum = 0;
  gameState.recentRefusals = 0;
  gameState.pairAffinity = {};
  gameState.memory = { attraction: {}, preferredKiss: {}, massageTarget: {}, lastSelectedByPlayer: {}, firstImpression: {}, clothingRemoved: {}, spinnerHistory: {} };
  gameState.spinner = null;
  gameState.lastPrompt = null;
  gameState.promptHistory = [];
  gameState.historyIndex = -1;
  if (histPrevBtn) histPrevBtn.style.display = "none";
  if (histNextBtn) histNextBtn.style.display = "none";
  gameState.lastResolvedTarget = null;
  gameState.awaitingResolution = false;
  gameState.typePreference = (typePreferenceEl ? typePreferenceEl.value : "mixed");
  gameState.vulnerability = {};
  gameState.votingActive = false;
  gameState.lastVotedTurn = -99;
  gameState.lastMinigameTurn = -99;
  gameState.lastDanceTurn = -99;
  gameState.lastActor = null;
  gameState.consecutiveActorCount = 0;
  gameState.postChainBridge = null;
  gameState.followThroughQueue = null;
  gameState.playerProfiles = {};
  gameState.profilingComplete = {};
  gameState.revelations = {};       // { "PlayerName": [ { theme, dim, reveal, nudge, promptId, turn } ] }
  gameState.usedCallbacks = {};     // { "CB_F01": true } — prevent repeating callback prompts
  gameState.memory.jealousy = {};
  gameState.jealousyTested = {};
  gameState.jealousyTestActive = null;
  // clothingRemoved lives in gameState.memory (already reset above)
  // Turn markers must reset with turnCount or their cooldown math goes
  // negative and blocks chains/spinners/toasts for the whole next game
  gameState.lastChainEndTurn = -99;
  gameState.lastSpinnerTurn = -99;
  lastToastTurn = -99;
  // Lyra's memory: re-restore remembered players (setup restored them once,
  // but the wipes above just erased that)
  try {
    if (typeof LyraMemory !== "undefined") {
      gameState.players.forEach(function(p) { LyraMemory.restoreInto(p.name); });
    }
  } catch (e) {}

  // Initialize seducer name from player setup
  var seducerPlayer = gameState.players.find(function(p) { return p.isSeducer; });
  gameState.seducerName = seducerPlayer ? seducerPlayer.name : null;

  // Re-enable buttons
  if (nextBtn) nextBtn.disabled = false;
  if (skipBtn) skipBtn.disabled = false;

  document.body.className = "stage-personal";
  if (window.LyraAtmosphere) window.LyraAtmosphere.transitionToStage("personal");
  updateMusicBar("personal");
  // Fade out and stop music on reset (new game will re-init)
  if (typeof OrbMusic !== "undefined") OrbMusic.destroy();
  safewordToastShown = false;
  updateStageLabel();
  buildOrbNameWheel();
  setOrbRevealName("", "hidden");

  if (playerLabelEl && playerLabelEl.style.display !== "none") playerLabelEl.textContent = "";
  if (promptTextEl) {
    promptTextEl.textContent = "Lyra awaits...";
    promptTextEl.style.opacity = "1";
    promptTextEl.style.color = "rgba(230, 210, 255, 0.95)";
    promptTextEl.style.textShadow = "0 0 24px rgba(200, 160, 255, 0.45), 0 0 60px rgba(140, 100, 220, 0.35)";
    promptTextEl.style.cursor = "pointer";
    promptTextEl.style.animation = "none";
    promptTextEl.setAttribute("role", "button");
    promptTextEl.setAttribute("title", "Click to begin");
    if (!promptTextEl._lyraAwaitsClick) {
      promptTextEl._lyraAwaitsClick = function() {
        if (promptTextEl.textContent !== "Lyra awaits...") return;
        var btn = document.getElementById("nextBtn");
        if (btn && !btn.disabled) btn.click();
      };
      promptTextEl.addEventListener("click", promptTextEl._lyraAwaitsClick);
    }
  }
  if (metaTextEl) {
    metaTextEl.textContent = "Prompts: " + PROMPTS.length + " | Players: " + (gameState.players.map(function(p) { return p.name; }).join(", ") || "none") + " | Chapter: " + getCurrentChapter();
  }
  hideFeedbackPanel();
  if (!gameState.players.length) openSetupOverlay();
}

// =========================
// RULES & TOAST SYSTEM
// =========================

function closeRulesOverlay() {
  if (rulesOverlayEl) { rulesOverlayEl.classList.add("is-hidden"); }
  // Show setup overlay
  openSetupOverlay();
}

// Toast messages for different game moments
var TOAST_OPENING = {
  title: "Raise your glasses.",
  message: "Before we begin — a toast. Look at the people around you. Tonight, you promise to be honest, to be brave, and to be good sports. Whatever happens... stays between us."
};

var TOAST_STAGE_MESSAGES = {
  flirty: { title: "A toast to chemistry.", message: "Things are about to get interesting. Raise your glass — to the spark between strangers... and the fire between friends." },
  suggestive: { title: "To temptation.", message: "You've been brave so far. But Lyra is just getting started. Raise your glass — to the things you haven't said out loud... yet." },
  intimate: { title: "To vulnerability.", message: "The masks are coming off. Raise your glass — to the courage it takes to let someone see the real you." },
  erotic: { title: "To desire.", message: "No more hiding. Lyra sees what you want. Raise your glass — to the heat in this room... and what comes next." },
  taboo: { title: "To surrender.", message: "You've come this far. There's no turning back. Raise your glass — to the edge... and the thrill of going over it." }
};

// Safeword toast — fires once, BEFORE the regular "To temptation" toast at suggestive.
// This is the moment Lyra reaffirms consent before things start to get real.
var TOAST_SAFEWORD = {
  title: "One word, before we go further.",
  message: "From here on, the prompts get bolder. Pick a safeword right now — together. Something silly that nobody would ever say by accident: pineapple, jellyfish, paprika. If anyone says that word at any moment for the rest of the night, EVERYTHING stops, no questions, no judgment, no explanations owed. Skipping a single dare is also always free — no one has to justify a pass. The bravest thing you can do tonight is name your limit out loud. Now... pick your word, then keep playing."
};
var safewordToastShown = false;

var TOAST_RANDOM = [
  { title: "Lyra is pleased.", message: "You're playing well. Raise your glasses — Lyra rewards courage with another round." },
  { title: "A moment of connection.", message: "Look at each other. Really look. Now raise your glass — to this night, and the memories you're making." },
  { title: "To the brave ones.", message: "Not everyone would still be here. Raise your glass — to the ones who didn't back down." }
];

var lastToastTurn = -99;

var _toastDismissHandler = null;
function showToast(title, message, onDismiss) {
  if (!toastOverlayEl) { if (onDismiss) onDismiss(); return; }
  if (toastTitleEl) toastTitleEl.textContent = title;
  if (toastMessageEl) toastMessageEl.textContent = message;
  toastOverlayEl.classList.remove("is-hidden");
  // Lyra speaks the toast title aloud
  if (typeof LyraVoice !== "undefined" && LyraVoice.isEnabled()) {
    LyraVoice.speak(title);
  }
  // Hide prompt text behind toast so it doesn't bleed through
  if (promptTextEl) promptTextEl.style.visibility = "hidden";
  if (feedbackPanelEl) feedbackPanelEl.style.visibility = "hidden";
  // Remove old listener, add new one
  if (_toastDismissHandler && toastDismissBtn) {
    toastDismissBtn.removeEventListener("click", _toastDismissHandler);
  }
  _toastDismissHandler = function() {
    toastOverlayEl.classList.add("is-hidden");
    if (promptTextEl) promptTextEl.style.visibility = "";
    if (feedbackPanelEl) feedbackPanelEl.style.visibility = "";
    if (onDismiss) onDismiss();
  };
  if (toastDismissBtn) toastDismissBtn.addEventListener("click", _toastDismissHandler);
}

function maybeShowStageToast() {
  var chapter = getCurrentChapter();
  var toastData = TOAST_STAGE_MESSAGES[chapter];
  if (!toastData) return false;
  // Only show once per stage transition
  if (gameState.turnInChapter !== 0) return false;
  if (gameState.turnCount - lastToastTurn < 8) return false;
  lastToastTurn = gameState.turnCount;

  // Trigger cosmic hypnosis wheel on suggestive and erotic stages
  if (chapter === "suggestive") {
    showHypnosisWheel("Lyra is awakening...");
  } else if (chapter === "erotic") {
    showHypnosisWheel("Lyra sees your desire...");
  }

  // Suggestive stage: show the safeword toast FIRST, then chain into the stage toast
  if (chapter === "suggestive" && !safewordToastShown) {
    safewordToastShown = true;
    showToast(TOAST_SAFEWORD.title, TOAST_SAFEWORD.message, function() {
      showToast(toastData.title, toastData.message);
    });
    return true;
  }

  showToast(toastData.title, toastData.message);
  return true;
}

function maybeShowRandomToast() {
  // Only show random toasts from flirty stage onwards — too early breaks the mood
  var chapter = getCurrentChapter();
  if (chapter === "playful" || chapter === "personal") return false;
  // Small chance (~8%) every 15+ turns since last toast
  if (gameState.turnCount - lastToastTurn < 15) return false;
  if (Math.random() > 0.08) return false;
  var toast = randomFrom(TOAST_RANDOM);
  lastToastTurn = gameState.turnCount;
  showToast(toast.title, toast.message);
  return true;
}

// =========================
// PROMPT HISTORY NAVIGATION
// =========================

// =========================
// LYRA'S RECAP — "What Lyra learned tonight"
// =========================
function showLyraRecap() {
  if (typeof LyraMemory === "undefined") return;
  var recap = LyraMemory.buildRecap();
  if (!recap || !recap.length) return;

  // Remove any previous recap
  var existing = document.getElementById("lyraRecapOverlay");
  if (existing) existing.remove();

  var overlay = document.createElement("div");
  overlay.id = "lyraRecapOverlay";
  overlay.className = "lyra-recap-overlay";

  var html = '<div class="lyra-recap-card">';
  html += '<div class="lyra-recap-title">What Lyra learned tonight</div>';
  html += '<div class="lyra-recap-sub">She will remember you.</div>';
  recap.forEach(function(r) {
    html += '<div class="lyra-recap-player"><div class="lyra-recap-name">' + escapeHTML(r.player) + '</div>';
    r.lines.forEach(function(line) {
      html += '<div class="lyra-recap-line">' + escapeHTML(line) + '</div>';
    });
    html += '<button type="button" class="lyra-recap-btn secondary" data-forget="' + escapeHTML(r.player) + '" style="margin-top:6px;font-size:0.78rem;padding:4px 10px;">Forget me</button>';
    html += '</div>';
  });
  html += '<div class="lyra-recap-actions">';
  html += '<button type="button" class="lyra-recap-btn secondary" id="lyraForgetAllBtn">Forget everyone</button>';
  html += '<button type="button" class="lyra-recap-btn" id="lyraRecapCloseBtn">Close</button>';
  html += '</div></div>';
  overlay.innerHTML = html;
  document.body.appendChild(overlay);

  // Play Lyra's "Until next time" voice (L52)
  try {
    if (typeof LyraVoice !== "undefined" && LyraVoice.isEnabled && LyraVoice.isEnabled()) {
      LyraVoice.play("L52");
    }
  } catch (e) {}

  overlay.querySelector("#lyraRecapCloseBtn").addEventListener("click", function() {
    overlay.remove();
  });
  overlay.querySelector("#lyraForgetAllBtn").addEventListener("click", function() {
    if (confirm("Lyra will forget every player, every night. Are you sure?")) {
      LyraMemory.forgetAll();
      overlay.remove();
    }
  });
  overlay.querySelectorAll("[data-forget]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var name = btn.getAttribute("data-forget");
      if (confirm("Lyra will forget " + name + " completely. Are you sure?")) {
        LyraMemory.forgetPlayer(name);
        btn.textContent = "Forgotten.";
        btn.disabled = true;
      }
    });
  });
}

function escapeHTML(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function(c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
