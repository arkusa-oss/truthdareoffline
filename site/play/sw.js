// Lyra's Orb — service worker (installable PWA + offline shell)
// Strategy, chosen to avoid the stale-cache problems we fought earlier:
//   - HTML navigations: NETWORK-FIRST (always fresh online; cached fallback offline)
//   - same-origin static (css/js/img/audio): STALE-WHILE-REVALIDATE (instant + self-heals)
//   - cross-origin (Google Fonts, YouTube): PASSTHROUGH (never intercepted/cached)
// Bump CACHE to force a clean re-cache on a breaking change.
var CACHE = "lyra-shell-v1";

var CORE = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.webmanifest",
  "./orb-cover.jpg",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./prompts_v2.js",
  "./couples_prompts_v2.js",
  "./couples_prompts_early.js",
  "./translations_es.js",
  "./atmosphere.js",
  "./orb-voice.js",
  "./ai_orb.js",
  "./orb-data.js",
  "./orb-templates.js",
  "./orb-state.js",
  "./orb-memory.js",
  "./orb-engine.js",
  "./orb-analytics.js",
  "./orb-music.js",
  "./orb-ui.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      // best-effort: don't fail the whole install if one asset 404s
      return Promise.allSettled(CORE.map(function (u) { return cache.add(u); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;

  var url;
  try { url = new URL(req.url); } catch (e) { return; }

  // Never touch cross-origin (fonts, YouTube iframe/media, etc.)
  if (url.origin !== self.location.origin) return;

  // HTML navigations: network-first so new deploys always win online.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (m) { return m || caches.match("./index.html"); });
      })
    );
    return;
  }

  // Same-origin static: stale-while-revalidate.
  event.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(req).then(function (cached) {
        var network = fetch(req).then(function (res) {
          if (res && res.status === 200 && res.type === "basic") cache.put(req, res.clone());
          return res;
        }).catch(function () { return cached; });
        return cached || network;
      });
    })
  );
});
