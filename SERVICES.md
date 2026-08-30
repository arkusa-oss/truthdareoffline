# Lyra's Orb — Services Inventory

Every external service the game depends on, what it does, and where it's configured.

## Core hosting & code

| Service | Role | Details |
|---|---|---|
| **GitHub** | Source repo | `arkusa-oss/truthdareoffline` (origin, HTTPS). Auth via `gh` CLI credentials (`gh auth setup-git`). |
| **GitHub Actions** | CI | `.github/workflows/sim-test.yml` — runs `sim_grammar_test.js` (seeds 1–20) on every push/PR to `main`. Keep green; deploys depend on it. |
| **Cloudflare Pages** | Site hosting | Serves `site/` at **lyrasorb.com**. Auto-deploys from the GitHub repo on push (drag-and-drop is dead). Deploy flow: `./deploy-sync.sh` → commit → push. |
| **Cloudflare DNS** | Domain DNS | `lyrasorb.com` nameservers point at Cloudflare (`alex`/`luna.ns.cloudflare.com`). Setup notes in `Cloudflare_Setup_Guide.md`. |
| **Domain registrar** | Domain ownership | `lyrasorb.com` registration — only fixed annual cost (~$10–15/yr). Renewal happens at the registrar, not Cloudflare. |

## Analytics

| Service | Role | Details |
|---|---|---|
| **Cloudflare Worker** | Stats collector | `lyra-stats` worker at `https://lyra-stats.ark-usa.workers.dev/`. Receives anonymous funnel beacons (`orb-analytics.js` → `window.ORB_STATS_ENDPOINT`, set in `index.html`). Config: `worker/wrangler.toml`; deploy with `npx wrangler deploy` from `worker/`. |
| **Cloudflare D1** | Stats storage | SQLite database `lyra-stats` (id `eb8e3c2f-…`), bound as `DB`. Schema in `worker/schema.sql`. |
| **Stats dashboard** | Funnel view | `https://lyra-stats.ark-usa.workers.dev/stats?token=…` — gated by Worker secret `STATS_TOKEN` (rotate: `npx wrangler secret put STATS_TOKEN`). Token is NOT stored in this repo. |

## In-game content

| Service | Role | Details |
|---|---|---|
| **YouTube** | Background music | IFrame API (`orb-music.js`). Playlists per stage live as URLs in `orb-templates.js` `MUSIC_THEMES`; curation happens on YouTube directly, no code change needed. |
| **Voice clips** | Lyra's voice | Pre-recorded MP3s played by `orb-voice.js` (`LyraVoice`) — static assets, no runtime service. |

## Optional / local-only

| Service | Role | Details |
|---|---|---|
| **Claude API** (Anthropic) | AI Director (optional) | `ai_orb.js` → `https://api.anthropic.com/v1/messages`. Off unless configured with an API key. |
| **Ollama** (local) | AI Director alternative | `ai_orb.js` → `http://localhost:11434/api/generate` (model `llama3`). Local install, no cloud dependency. |
| **Python 3** (local) | Dev server | `start-lyra.sh` / `start-lyra.bat` serve the game at `http://localhost:8765/`. macOS gotcha: launch from Terminal, not Finder (TCC blocks Desktop reads → silent 404s). |

## Account/auth summary

- **GitHub**: `gh` CLI authed with workflow scope; git pushes use gh credentials.
- **Cloudflare**: one account covers Pages, DNS, Worker, D1. Wrangler auth: `npx wrangler login`.
- **Registrar**: separate login; only touched for domain renewal.
