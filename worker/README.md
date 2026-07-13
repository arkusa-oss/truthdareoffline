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
