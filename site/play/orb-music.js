// =========================
// MUSIC CONTROLLER
// =========================
// Handles YouTube IFrame API integration for background audio playback.
// Provides: OrbMusic.init(), OrbMusic.switchStage(), OrbMusic.toggleMute(),
//           OrbMusic.fadeOut(), OrbMusic.destroy()
// Depends on: MUSIC_PLAYLISTS (from orb-templates.js)
//
// Architecture: Each stage switch creates a FRESH player element with a unique
// ID inside #ytPlayerWrap, avoiding the YouTube IFrame API's buggy behaviour
// when reusing or re-creating elements with the same ID.

var OrbMusic = (function() {
  "use strict";

  var player = null;         // YT.Player instance
  var apiReady = false;      // YouTube IFrame API loaded
  var enabled = false;       // user opted in
  var muted = false;
  var currentChapter = null;
  var targetVolume = 45;     // default playback volume (0-100)
  var fadeInterval = null;
  var pendingChapter = null;  // chapter to load after API ready
  var initCalled = false;
  var playerCounter = 0;     // increments each time we create a player
  var switching = false;     // guard against overlapping switchStage calls

  // Extract playlist ID from a YouTube URL
  function getPlaylistId(url) {
    if (!url) return null;
    var m = url.match(/[?&]list=([^&]+)/);
    return m ? m[1] : null;
  }

  // Load the YouTube IFrame API script (once)
  function loadYTApi() {
    if (document.getElementById("ytApiScript")) return;
    var tag = document.createElement("script");
    tag.id = "ytApiScript";
    tag.src = "https://www.youtube.com/iframe_api";
    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(tag, first);
  }

  // Called by YouTube when API is ready (global callback)
  window.onYouTubeIframeAPIReady = function() {
    apiReady = true;
    console.log("OrbMusic: YouTube API ready");
    if (pendingChapter) {
      buildPlayer(pendingChapter, targetVolume);
      pendingChapter = null;
    }
  };

  // Kill the current player and remove its DOM element
  function killPlayer() {
    if (fadeInterval) { clearInterval(fadeInterval); fadeInterval = null; }
    if (player) {
      try { player.pauseVideo(); } catch(e) {}
      try { player.destroy(); } catch(e) {}
      player = null;
    }
    // Clean out any leftover iframes/divs inside the wrapper
    var wrap = document.getElementById("ytPlayerWrap");
    if (wrap) wrap.innerHTML = "";
  }

  // Build a brand-new player for `chapter`, starting at `startVol` volume.
  // If `fadeIn` is true, starts at 0 and fades to targetVolume over 2s.
  // If `useLatinFallback` is true, forces the Latin theme playlist for this chapter.
  function buildPlayer(chapter, startVol, fadeIn, useLatinFallback) {
    var entry;
    if (useLatinFallback && MUSIC_THEMES && MUSIC_THEMES.latin) {
      entry = MUSIC_THEMES.latin.stages[chapter] || MUSIC_THEMES.latin.stages.personal;
      console.log("OrbMusic: using Latin fallback playlist for", chapter);
    } else {
      entry = getActivePlaylistMap()[chapter] || getActivePlaylistMap().personal;
    }
    var listId = getPlaylistId(entry.url);
    if (!listId) {
      console.warn("OrbMusic: no playlist ID for chapter", chapter);
      switching = false;
      return;
    }

    // Create a fresh container element with a unique ID
    var wrap = document.getElementById("ytPlayerWrap");
    if (!wrap) {
      console.warn("OrbMusic: #ytPlayerWrap not found in DOM");
      switching = false;
      return;
    }
    wrap.innerHTML = ""; // clear any previous remnants
    playerCounter++;
    var elId = "ytPlayer_" + playerCounter;
    var div = document.createElement("div");
    div.id = elId;
    wrap.appendChild(div);

    // Don't set currentChapter until onReady fires — prevents dedup from blocking retries
    var targetChapter = chapter;
    var vol = fadeIn ? 0 : (muted ? 0 : startVol);

    console.log("OrbMusic: building player #" + playerCounter + " for", chapter, "(playlist:", listId + ")");

    // Safety: if onReady doesn't fire within 10s, retry once from scratch
    var buildTimeout = setTimeout(function() {
      console.warn("OrbMusic: onReady timeout for", targetChapter, "— retrying");
      switching = false;
      killPlayer();
      // Force rebuild by NOT setting currentChapter (so dedup won't block)
      setTimeout(function() { buildPlayer(targetChapter, startVol, fadeIn); }, 500);
    }, 10000);

    var retryCount = 0;
    var playbackStarted = false;
    var embedErrCount = 0;

    player = new YT.Player(elId, {
      height: "1",
      width: "1",
      playerVars: {
        listType: "playlist",
        list: listId,
        autoplay: 1,
        loop: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        playsinline: 1
      },
      events: {
        onReady: function(event) {
          clearTimeout(buildTimeout);
          currentChapter = targetChapter;
          console.log("OrbMusic: player #" + playerCounter + " ready for", targetChapter);
          event.target.setVolume(vol);
          event.target.setShuffle(true);
          event.target.playVideo();
          showMusicBar(targetChapter);
          if (fadeIn && !muted) {
            fadeVolume(0, targetVolume, 2000);
          }
          switching = false;

          // Autoplay policy workaround: retry playback if it hasn't started after 2s
          setTimeout(function() {
            if (!playbackStarted && player && typeof player.getPlayerState === "function") {
              var state = player.getPlayerState();
              console.log("OrbMusic: post-ready state check =", state);
              if (state !== 1) { // not playing
                console.log("OrbMusic: playback didn't start — retrying");
                try { player.playVideo(); } catch(e) {}
              }
            }
          }, 2000);
        },
        onStateChange: function(event) {
          var state = event.data;
          console.log("OrbMusic: state change =", state, "(1=playing,2=paused,3=buffering,5=cued)");

          if (state === 1) {
            playbackStarted = true;
          }

          // Auto-recover from unexpected pauses/cues
          if (enabled && !muted && (state === 5 || state === -1 || state === 2)) {
            if (retryCount < 3) {
              retryCount++;
              console.log("OrbMusic: auto-recovering, retry #" + retryCount);
              setTimeout(function() {
                try { event.target.playVideo(); } catch(e) {}
              }, 500);
            }
          }
          // End of single track in playlist → next
          if (state === 0) {
            try { event.target.nextVideo(); } catch(e) {}
          }
        },
        onError: function(event) {
          var code = event.data;
          console.warn("OrbMusic: YT error code", code, "— skipping track");
          clearTimeout(buildTimeout);
          currentChapter = targetChapter;
          switching = false;
          if ((code === 150 || code === 101) && !useLatinFallback) {
            embedErrCount++;
            console.warn("OrbMusic: embed error #" + embedErrCount + " for", targetChapter);
            if (embedErrCount >= 3) {
              console.warn("OrbMusic: playlist embedding blocked — falling back to Latin for", targetChapter);
              killPlayer();
              setTimeout(function() { buildPlayer(targetChapter, targetVolume, false, true); }, 300);
              return;
            }
          }
          try { event.target.nextVideo(); } catch(e) {}
        }
      }
    });
  }

  // Smoothly fade volume from current level to target over durationMs
  function fadeVolume(from, to, durationMs, callback) {
    if (fadeInterval) clearInterval(fadeInterval);
    if (!player || typeof player.setVolume !== "function") {
      if (callback) callback();
      return;
    }

    var steps = 20;
    var stepMs = durationMs / steps;
    var delta = (to - from) / steps;
    var current = from;
    var step = 0;

    fadeInterval = setInterval(function() {
      step++;
      current += delta;
      try { player.setVolume(Math.max(0, Math.min(100, Math.round(current)))); } catch(e) {}
      if (step >= steps) {
        clearInterval(fadeInterval);
        fadeInterval = null;
        try { player.setVolume(to); } catch(e) {}
        if (callback) callback();
      }
    }, stepMs);
  }

  function showMusicBar(chapter) {
    var bar = document.getElementById("musicBar");
    var stageEl = document.getElementById("musicBarStage");
    var subEl = document.getElementById("musicBarSub");
    if (!bar || !stageEl || !subEl) return;

    var entry = getActivePlaylistMap()[chapter] || getActivePlaylistMap().personal;
    stageEl.textContent = entry.label;
    subEl.textContent = muted ? "Music paused" : entry.sub;
    bar.classList.remove("is-hidden");

    updateMuteButton();

    // Add a one-time click handler on the bar itself as autoplay fallback
    if (!bar._orbClickWired) {
      bar._orbClickWired = true;
      bar.addEventListener("click", function(e) {
        // Don't interfere with the mute button
        if (e.target.id === "musicMuteBtn") return;
        if (player && typeof player.playVideo === "function") {
          console.log("OrbMusic: music bar tapped — forcing playVideo()");
          try {
            player.playVideo();
            player.setVolume(muted ? 0 : targetVolume);
          } catch(err) {}
        }
      });
    }
  }

  function updateMuteButton() {
    var btn = document.getElementById("musicMuteBtn");
    if (!btn) return;
    btn.textContent = muted ? "\u25B6" : "\u23F8"; // ▶ or ⏸
    btn.title = muted ? "Resume music" : "Pause music";
  }

  // Public API
  return {
    // Call from Start Game button. Loads the API and starts Stage 1.
    init: function(chapter) {
      var toggle = document.getElementById("musicToggle");
      enabled = toggle ? toggle.checked : false;
      console.log("OrbMusic.init() called | chapter:", chapter, "| toggle checked:", enabled);
      if (!enabled) { console.log("OrbMusic: music toggle is OFF — skipping"); return; }
      if (initCalled) {
        // Re-init for a new game (reset was called)
        this.switchStage(chapter || "personal");
        return;
      }
      initCalled = true;
      muted = false;

      if (apiReady) {
        buildPlayer(chapter || "personal", targetVolume, false);
      } else {
        pendingChapter = chapter || "personal";
        loadYTApi();
      }
    },

    // Crossfade to a new stage's playlist.
    // Fades out over 2s → kills old player → builds fresh player → fades in 2s.
    switchStage: function(chapter) {
      if (!enabled) {
        showMusicBar(chapter);
        return;
      }
      if (!apiReady) {
        pendingChapter = chapter;
        showMusicBar(chapter);
        return;
      }
      if (chapter === currentChapter) return;
      if (switching) {
        // Already switching — queue this one
        console.log("OrbMusic: already switching, queuing", chapter);
        pendingChapter = chapter;
        return;
      }

      console.log("OrbMusic: switching from", currentChapter, "to", chapter);

      // If no player exists, just build one directly
      if (!player || typeof player.setVolume !== "function") {
        buildPlayer(chapter, targetVolume, true);
        return;
      }

      switching = true;
      var currentVol = muted ? 0 : targetVolume;

      // Safety timeout: if switching is still true after 12s, force-reset it
      // This prevents the music system from permanently stalling
      var switchTimeout = setTimeout(function() {
        if (switching) {
          console.warn("OrbMusic: switching timed out — force-resetting");
          switching = false;
          // Try to play the queued chapter if any
          if (pendingChapter) {
            var queued = pendingChapter;
            pendingChapter = null;
            OrbMusic.switchStage(queued);
          }
        }
      }, 12000);

      // Fade out current audio over 2s, then swap
      fadeVolume(currentVol, 0, 2000, function() {
        // Kill old player completely (removes DOM element too)
        killPlayer();

        // Short delay for DOM cleanup, then build fresh player
        setTimeout(function() {
          buildPlayer(chapter, targetVolume, true);

          // Check for queued chapter (if another switch came in during transition)
          if (pendingChapter && pendingChapter !== chapter) {
            var queued = pendingChapter;
            pendingChapter = null;
            // Let current player finish building, then switch again
            setTimeout(function() {
              clearTimeout(switchTimeout);
              switching = false;
              OrbMusic.switchStage(queued);
            }, 4500);
          } else {
            clearTimeout(switchTimeout);
          }
        }, 300);
      });
    },

    // Instant fade out (for game reset or end)
    fadeOut: function(callback) {
      if (!enabled || !player || typeof player.setVolume !== "function") {
        if (callback) callback();
        return;
      }
      fadeVolume(targetVolume, 0, 1500, function() {
        try { player.pauseVideo(); } catch(e) {}
        if (callback) callback();
      });
    },

    // Toggle mute/unmute
    toggleMute: function() {
      if (!enabled || !player) return;
      muted = !muted;
      if (muted) {
        fadeVolume(targetVolume, 0, 500, function() {
          try { player.pauseVideo(); } catch(e) {}
        });
      } else {
        try { player.playVideo(); } catch(e) {}
        fadeVolume(0, targetVolume, 500);
      }
      updateMuteButton();
      var subEl = document.getElementById("musicBarSub");
      if (subEl) {
        var entry = getActivePlaylistMap()[currentChapter] || getActivePlaylistMap().personal;
        subEl.textContent = muted ? "Music paused" : entry.sub;
      }
    },

    isEnabled: function() { return enabled; },
    isMuted: function() { return muted; },

    // Clean shutdown
    destroy: function() {
      killPlayer();
      enabled = false;
      initCalled = false;
      switching = false;
      currentChapter = null;
      pendingChapter = null;
      var bar = document.getElementById("musicBar");
      if (bar) bar.classList.add("is-hidden");
    }
  };
})();
