// =========================
// LYRA'S MEMORY — Cross-session persistence
// =========================
// Lyra actually remembers players between sessions.
// Stored in localStorage under key "lyra_memory_v1".
// Keyed by normalized player name (lowercase, trimmed).
//
// Persisted per player:
//   - profile: { risk, boldness, compete, openness, boundaries, ego }
//   - jealousy: "jealous" | "not_jealous" | "unsure"
//   - vulnerability: number
//   - firstImpression: string (who they noticed first, if recorded)
//   - preferredKiss: string (who they chose to kiss)
//   - attraction: { otherName: score }
//   - nightsPlayed: number
//   - lastPlayed: ISO timestamp
//
// Persisted globally:
//   - pairAffinity: { "A|B": score } — pairs Lyra has seen chemistry from
//
// Public API:
//   LyraMemory.load()                         → full store
//   LyraMemory.hasPlayer(name)                → bool
//   LyraMemory.loadPlayer(name)               → player record or null
//   LyraMemory.savePlayer(name, data)         → merge & persist
//   LyraMemory.saveAll()                      → snapshot current gameState
//   LyraMemory.restoreInto(name)              → rehydrate gameState for one player
//   LyraMemory.buildRecap()                   → [{ player, lines:[...] }] for end-of-night screen
//   LyraMemory.forgetPlayer(name)             → remove one player
//   LyraMemory.forgetAll()                    → wipe store
//   LyraMemory.exportJSON() / importJSON(str) → cross-device transfer

var LyraMemory = (function() {
  "use strict";

  var STORAGE_KEY = "lyra_memory_v1";
  var cache = null;

  function normalize(name) {
    if (!name) return "";
    return String(name).trim().toLowerCase();
  }

  function emptyStore() {
    return { players: {}, pairAffinity: {}, meta: { version: 1, createdAt: new Date().toISOString() } };
  }

  function load() {
    if (cache) return cache;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) { cache = emptyStore(); return cache; }
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") { cache = emptyStore(); return cache; }
      if (!parsed.players) parsed.players = {};
      if (!parsed.pairAffinity) parsed.pairAffinity = {};
      if (!parsed.meta) parsed.meta = { version: 1 };
      cache = parsed;
      return cache;
    } catch (e) {
      console.warn("LyraMemory: load failed", e);
      cache = emptyStore();
      return cache;
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    } catch (e) {
      console.warn("LyraMemory: persist failed", e);
    }
  }

  function hasPlayer(name) {
    var store = load();
    return !!store.players[normalize(name)];
  }

  function loadPlayer(name) {
    var store = load();
    var rec = store.players[normalize(name)];
    return rec ? JSON.parse(JSON.stringify(rec)) : null;
  }

  function savePlayer(name, data) {
    if (!name) return;
    var store = load();
    var key = normalize(name);
    var existing = store.players[key] || {
      displayName: name,
      profile: { risk: 0, boldness: 0, compete: 0, openness: 0, boundaries: 0, ego: 0 },
      jealousy: null,
      vulnerability: 0,
      firstImpression: null,
      preferredKiss: null,
      attraction: {},
      nightsPlayed: 0,
      lastPlayed: null,
      firstSeen: new Date().toISOString()
    };

    // Merge incoming data
    if (data.displayName) existing.displayName = data.displayName;
    if (data.profile) {
      Object.keys(data.profile).forEach(function(k) {
        existing.profile[k] = (existing.profile[k] || 0);
        // Replace rather than accumulate — caller passes current session state
        existing.profile[k] = data.profile[k];
      });
    }
    if (typeof data.jealousy !== "undefined" && data.jealousy !== null) existing.jealousy = data.jealousy;
    if (typeof data.vulnerability === "number") existing.vulnerability = data.vulnerability;
    if (data.firstImpression) existing.firstImpression = data.firstImpression;
    if (data.preferredKiss) existing.preferredKiss = data.preferredKiss;
    if (data.attraction) {
      Object.keys(data.attraction).forEach(function(other) {
        existing.attraction[other] = data.attraction[other];
      });
    }
    if (typeof data.incrementNights !== "undefined" && data.incrementNights) {
      existing.nightsPlayed = (existing.nightsPlayed || 0) + 1;
    }
    existing.lastPlayed = new Date().toISOString();

    store.players[key] = existing;
    persist();
  }

  // Rehydrate gameState memory fields for a player joining the game
  function restoreInto(name) {
    if (typeof gameState === "undefined") return null;
    var rec = loadPlayer(name);
    if (!rec) return null;

    // Restore profile dimensions
    if (rec.profile) {
      gameState.playerProfiles[name] = gameState.playerProfiles[name] || {
        risk: 0, boldness: 0, compete: 0, openness: 0, boundaries: 0, ego: 0
      };
      Object.keys(rec.profile).forEach(function(k) {
        // Seed with remembered score, half weight so fresh session still matters
        gameState.playerProfiles[name][k] = Math.round(rec.profile[k] * 0.5);
      });
    }

    // Restore jealousy tag
    if (rec.jealousy) {
      gameState.memory.jealousy = gameState.memory.jealousy || {};
      gameState.memory.jealousy[name] = rec.jealousy;
    }

    // Restore vulnerability (half-weight)
    if (typeof rec.vulnerability === "number") {
      gameState.vulnerability[name] = Math.round(rec.vulnerability * 0.5);
    }

    // Restore preferred kiss / first impression as hints
    if (rec.firstImpression) {
      gameState.memory.firstImpression = gameState.memory.firstImpression || {};
      gameState.memory.firstImpression[name] = rec.firstImpression;
    }
    if (rec.preferredKiss) {
      gameState.memory.preferredKiss = gameState.memory.preferredKiss || {};
      gameState.memory.preferredKiss[name] = rec.preferredKiss;
    }
    if (rec.attraction) {
      gameState.memory.attraction = gameState.memory.attraction || {};
      gameState.memory.attraction[name] = gameState.memory.attraction[name] || {};
      Object.keys(rec.attraction).forEach(function(other) {
        gameState.memory.attraction[name][other] = rec.attraction[other];
      });
    }

    return rec;
  }

  // Snapshot current gameState → persist for all players
  function saveAll() {
    if (typeof gameState === "undefined" || !gameState.players) return;
    var store = load();

    gameState.players.forEach(function(p) {
      var name = p.name || p;
      if (!name) return;
      var data = {
        displayName: name,
        profile: gameState.playerProfiles[name] || null,
        jealousy: (gameState.memory && gameState.memory.jealousy) ? gameState.memory.jealousy[name] : null,
        vulnerability: gameState.vulnerability[name] || 0,
        firstImpression: (gameState.memory && gameState.memory.firstImpression) ? gameState.memory.firstImpression[name] : null,
        preferredKiss: (gameState.memory && gameState.memory.preferredKiss) ? gameState.memory.preferredKiss[name] : null,
        attraction: (gameState.memory && gameState.memory.attraction) ? gameState.memory.attraction[name] : null,
        incrementNights: true
      };
      savePlayer(name, data);
    });

    // Persist pair affinity
    if (gameState.pairAffinity) {
      Object.keys(gameState.pairAffinity).forEach(function(key) {
        store.pairAffinity[key] = gameState.pairAffinity[key];
      });
      persist();
    }
  }

  // Build a recap — "what Lyra learned tonight" — comparing session diff
  function buildRecap() {
    if (typeof gameState === "undefined") return [];
    var out = [];
    (gameState.players || []).forEach(function(p) {
      var name = p.name || p;
      if (!name) return;
      var lines = [];
      var prof = gameState.playerProfiles[name];
      if (prof) {
        // Highlight the dominant trait
        var traits = Object.keys(prof).map(function(k) { return { k: k, v: prof[k] }; });
        traits.sort(function(a, b) { return b.v - a.v; });
        var top = traits[0];
        if (top && top.v > 0) {
          var label = {
            risk: "a risk-taker", boldness: "bold", compete: "competitive",
            openness: "open", boundaries: "strong in boundaries", ego: "confident"
          }[top.k] || top.k;
          lines.push("Lyra saw you are " + label + ".");
        }
      }
      var jeal = gameState.memory && gameState.memory.jealousy && gameState.memory.jealousy[name];
      if (jeal === "jealous") lines.push("Jealousy lives in you.");
      else if (jeal === "not_jealous") lines.push("You are not easily jealous.");
      var kiss = gameState.memory && gameState.memory.preferredKiss && gameState.memory.preferredKiss[name];
      if (kiss) lines.push("You chose " + kiss + ".");
      if (!lines.length) lines.push("Lyra is still learning about you.");
      out.push({ player: name, lines: lines });
    });
    return out;
  }

  function forgetPlayer(name) {
    var store = load();
    delete store.players[normalize(name)];
    persist();
  }

  function forgetAll() {
    cache = emptyStore();
    persist();
  }

  function exportJSON() {
    return JSON.stringify(load(), null, 2);
  }

  function importJSON(str) {
    try {
      var parsed = JSON.parse(str);
      if (!parsed || !parsed.players) return false;
      cache = parsed;
      persist();
      return true;
    } catch (e) {
      return false;
    }
  }

  function listPlayers() {
    var store = load();
    return Object.keys(store.players).map(function(key) {
      var p = store.players[key];
      return { key: key, name: p.displayName, nightsPlayed: p.nightsPlayed || 0, lastPlayed: p.lastPlayed };
    });
  }

  return {
    load: load,
    hasPlayer: hasPlayer,
    loadPlayer: loadPlayer,
    savePlayer: savePlayer,
    saveAll: saveAll,
    restoreInto: restoreInto,
    buildRecap: buildRecap,
    forgetPlayer: forgetPlayer,
    forgetAll: forgetAll,
    exportJSON: exportJSON,
    importJSON: importJSON,
    listPlayers: listPlayers
  };
})();
