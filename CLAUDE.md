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

## Key Architecture
- orb-engine.js: prompt selection, chain system, profiling, memory
- orb-data.js: all prompt data, chains, profiling prompts, callbacks, revelations
- orb-state.js: gameState object and DOM references
- orb-voice.js: pre-recorded MP3 voice system (LyraVoice)
- orb-music.js: YouTube IFrame API background music with 4 genre themes
- ai_orb.js: optional AI Director (Claude API / Ollama)
- prompts_v2.js / couples_prompts_v2.js: CSV-imported prompt pools
