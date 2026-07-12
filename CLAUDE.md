# Lyra's Orb — Project Instructions

## What This Is
An adult Truth or Dare party game with 7 escalating stages: personal → playful → flirty → suggestive → intimate → erotic → taboo. Two modes: Couples (2 players, auto-detected) and Group (3+, with seducer role).

## Code Style
- Use `var` and `function` declarations (no `let`/`const`/arrow functions in game files — browser compatibility)
- Game files are vanilla JS, no build tools or bundlers
- All game state lives in `gameState` (orb-state.js)
- Prompt pools: `PROMPTS` (group), `COUPLES_PROMPTS` (couples), `CHAIN_PROMPTS`, `PROFILING_PROMPTS`

## Content Guidelines
- This is an adult game — don't tone down or sanitize prompts
- Prompts should escalate naturally through stages (intensity 1-10)
- The orb (Lyra) speaks in a mysterious, sultry, all-knowing tone
- Jealousy, desire, vulnerability are features, not bugs

## Escalation Ladder (enforced — every prompt's physical action has a floor stage)
Stages 1-2 are LIGHT: humor and profiling, temperature rises monotonically after.
1. personal — no physical contact beyond dancing nearby. No kisses, no massage.
2. playful — brief light touch, hug, whisper. Cheek/forehead kiss is the ceiling.
3. flirty — sustained non-intimate touch (trace arm/jaw, close dance, breath on
   neck), kiss on hand/cheek/wrist. No lip kissing, no clothing removal.
4. suggestive — sensual but CLOTHED: neck/shoulder massage, neck/collarbone kiss,
   brief closed-lip kiss ceiling, lap sitting, accessories/outer layer off only.
5. intimate — French kissing, partial undressing (garments, never to full nudity),
   body kisses, longer bare-hand massage, skin contact.
6. erotic — full undressing, full-body/oil massage, grinding, explicit sex.
7. taboo — control/edge tier: edging, orgasm control, D/s, most explicit.
Note: erotic = explicit, taboo = power/control/edge — that split is deliberate.
Group mode judges the same ladder more conservatively (players aren't all partners).
Clothing continuity is tracked (both modes): fully-undressed players must never be
asked to remove more clothing; chains skip contradicting steps.

## Testing & Deploy
- `node sim_grammar_test.js` mock-plays the real engine (grammar, escalation,
  undress continuity, chain integrity). Runs in CI on every push — keep it green.
  RNG is seeded (`--seed N`, default 1337) so runs are deterministic; CI sweeps
  seeds 1-20. A failure prints the exact seed to replay locally.
- `node es_ui_test.js` headless-renders index.html in jsdom, forces GAME_LANG=es,
  and asserts the setup screen (static data-i18n + dynamic T() strings) is Spanish
  and English switch-back is lossless. Needs jsdom (`npm install --no-save jsdom`).
- `npm test` runs sim + translation drift-check + Spanish UI test together.
- Deploy: `./deploy-sync.sh` copies game files into site/play/, then commit+push.
  GitHub Actions tests, Cloudflare Pages auto-deploys from the repo (serves site/).
- Music playlists are YouTube URLs in orb-templates.js MUSIC_THEMES; track curation
  happens on YouTube directly, no code change needed.

## Key Architecture
- orb-engine.js: prompt selection, chain system, profiling, memory
- orb-data.js: all prompt data, chains, profiling prompts, callbacks, revelations
- orb-state.js: gameState object and DOM references
- orb-voice.js: pre-recorded MP3 voice system (LyraVoice)
- orb-music.js: YouTube IFrame API background music with 4 genre themes
- ai_orb.js: optional AI Director (Claude API / Ollama)
- prompts_v2.js / couples_prompts_v2.js: CSV-imported prompt pools
