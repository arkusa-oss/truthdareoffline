#!/bin/bash
# Sync the game files from repo root into site/play/ for Cloudflare Pages deploy.
# The site/ folder is what gets drag-and-dropped into Cloudflare — run this
# before every deploy or the live game falls behind the code.
set -e
cd "$(dirname "$0")"

GAME_FILES=(
  index.html
  style.css
  prompts_v2.js
  couples_prompts_v2.js
  couples_prompts_early.js
  translations_es.js
  atmosphere.js
  orb-voice.js
  ai_orb.js
  orb-data.js
  orb-templates.js
  orb-state.js
  orb-memory.js
  orb-engine.js
  orb-analytics.js
  orb-music.js
  orb-ui.js
)

for f in "${GAME_FILES[@]}"; do
  cp "$f" "site/play/$f"
done

# Cover media — the splash poster + optional video loop (copy whatever exists)
for m in orb-cover.jpg orb-cover.webm orb-cover.mp4; do
  [ -f "$m" ] && cp "$m" "site/play/$m"
done

# PWA assets — manifest, service worker, icons
for p in manifest.webmanifest sw.js icon-192.png icon-512.png apple-touch-icon.png; do
  [ -f "$p" ] && cp "$p" "site/play/$p"
done

# Audio files (only copies new/changed)
rsync -a --delete audiofiles/ site/play/audiofiles/

# Remove legacy prompt files no longer loaded by index.html
rm -f site/play/couples_prompts_mid.js site/play/couples_prompts_late.js

echo "Synced $(( ${#GAME_FILES[@]} )) game files + audiofiles into site/play/"
echo "Now drag the site/ folder into Cloudflare Pages to deploy."
