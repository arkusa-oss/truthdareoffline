# Lyra's Orb — stats collector (Cloudflare Worker + D1)

Receives anonymous funnel beacons from the game and serves an aggregate
drop-off dashboard. Stores only: event type, stage, mode, language, turn count,
timestamp. No prompt text, player names, or answers.

## One-time deploy

From this `worker/` directory:

```bash
# 1. Authenticate (opens a browser). In the Claude session, run it with a
#    leading "!" so it runs in your terminal:  ! npx wrangler login
npx wrangler login

# 2. Create the D1 database — copy the printed database_id
npx wrangler d1 create lyra-stats

# 3. Paste that id into wrangler.toml (replace REPLACE_AFTER_CREATE)

# 4. Create the table (remote)
npx wrangler d1 execute lyra-stats --remote --file=schema.sql

# 5. Deploy the Worker — note the printed URL (https://lyra-stats.<sub>.workers.dev)
npx wrangler deploy

# 6. (optional) Gate the dashboard behind a token
npx wrangler secret put STATS_TOKEN
```

## Point the game at it

Set the Worker URL in the game so it beacons events there. In `index.html`:

```html
<script>window.ORB_STATS_ENDPOINT = "https://lyra-stats.<sub>.workers.dev/";</script>
```

Then `./deploy-sync.sh`, commit, push.

## View the funnel

- Dashboard: `https://lyra-stats.<sub>.workers.dev/stats`
- Raw JSON: `https://lyra-stats.<sub>.workers.dev/stats?format=json`
- With token gate: append `?token=<your-token>`

Every real player's game now rolls up here — live stage drop-off across everyone.

## AI Author (Lyra writes her own prompts)

Route `POST /ai/turn` in `src/ai.js`. The game sends the night's context
(stage, players, wardrobe, dossiers, story props, recent turns) and gets one
prompt back as JSON. The Anthropic key never leaves the Worker. Nothing from
the context is stored — only a per-session turn counter (`ai_usage`) for
budgeting.

```bash
cd worker
npm install                                   # @anthropic-ai/sdk + wrangler
npx wrangler login                             # once (run with a leading "!" in Claude)
npx wrangler d1 execute lyra-stats --remote --file=schema_ai.sql
npx wrangler secret put ANTHROPIC_API_KEY      # paste sk-ant-...
npx wrangler secret put AI_ACCESS_CODE         # optional: private-beta code players type in
npx wrangler deploy
npm test                                       # offline route test (fake model)
```

Caps live in `wrangler.toml` `[vars]`: `AI_SESSION_CAP` turns per game night,
`AI_DAILY_CAP` across everyone. Model/effort: `AI_MODEL`, `AI_EFFORT`.

Then in the game's `index.html`:

```html
<script>window.ORB_AI_ENDPOINT = "https://lyra-stats.<sub>.workers.dev/ai/turn";</script>
```

Players turn it on from the setup screen ("Lyra writes her own prompts") and,
if `AI_ACCESS_CODE` is set, enter the code once. With the endpoint empty or
unreachable the game plays the curated pool exactly as before.
