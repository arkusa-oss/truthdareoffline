// Lyra's Orb — stats collector (Cloudflare Worker + D1)
// Receives anonymous funnel beacons from the game and serves an aggregate
// dashboard. Stores ONLY: event type, stage name, mode, language, turn count,
// timestamp. No prompt text, no player names, no answers.
//
// Endpoints:
//   POST  /            append an event  (game's sendBeacon target)
//   GET   /stats       HTML funnel dashboard  (?format=json for raw)
//   GET   /            same as /stats
// Optional gate: set secret STATS_TOKEN, then /stats requires ?token=<value>.

const STAGES = ["personal", "playful", "flirty", "suggestive", "intimate", "erotic", "taboo"];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

    if (request.method === "POST") {
      try {
        const evt = JSON.parse(await request.text());
        const p = evt.p || {};
        await env.DB.prepare(
          "INSERT INTO events (ts, type, stage, mode, lang, turns) VALUES (?,?,?,?,?,?)"
        ).bind(
          Number(evt.t) || Date.now(),
          String(evt.e || ""),
          p.stage || p.maxStage || null,
          p.mode || null,
          p.lang || null,
          (typeof p.turns === "number" ? p.turns : null)
        ).run();
        return new Response("ok", { headers: CORS });
      } catch (e) {
        return new Response("bad request", { status: 400, headers: CORS });
      }
    }

    if (url.pathname === "/stats" || url.pathname === "/") {
      if (env.STATS_TOKEN && url.searchParams.get("token") !== env.STATS_TOKEN) {
        return new Response("unauthorized", { status: 401, headers: CORS });
      }
      const data = await computeFunnel(env);
      if (url.searchParams.get("format") === "json") {
        return new Response(JSON.stringify(data, null, 2), {
          headers: { ...CORS, "Content-Type": "application/json" }
        });
      }
      return new Response(renderHTML(data), {
        headers: { ...CORS, "Content-Type": "text/html; charset=utf-8" }
      });
    }

    return new Response("not found", { status: 404, headers: CORS });
  }
};

async function computeFunnel(env) {
  const res = await env.DB.prepare(
    "SELECT stage, mode, lang, turns FROM events WHERE type = 'game_committed'"
  ).all();
  const rows = res.results || [];

  const byStage = {}; STAGES.forEach(s => byStage[s] = 0);
  const byMode = { couple: 0, group: 0 };
  const byLang = { en: 0, es: 0 };
  let games = 0, completions = 0, turnsTotal = 0;

  for (const r of rows) {
    let idx = STAGES.indexOf(r.stage);
    if (idx < 0) idx = 0;
    games++;
    for (let i = 0; i <= idx; i++) byStage[STAGES[i]]++;
    if (idx === STAGES.length - 1) completions++;
    if (r.mode === "couple" || r.mode === "group") byMode[r.mode]++;
    if (r.lang === "es") byLang.es++; else byLang.en++;
    turnsTotal += Number(r.turns) || 0;
  }

  return {
    started: games,
    completions,
    completionPct: games ? Math.round((completions / games) * 100) : 0,
    avgTurns: games ? Math.round(turnsTotal / games) : 0,
    byMode, byLang,
    funnel: STAGES.map(s => ({
      stage: s,
      reached: byStage[s],
      pct: games ? Math.round((byStage[s] / games) * 100) : 0
    }))
  };
}

function renderHTML(d) {
  const max = d.funnel.length ? d.funnel[0].reached : 0;
  const bars = d.funnel.map(f => {
    const w = max ? Math.round((f.reached / max) * 100) : 0;
    return `<div class="row"><div class="lbl">${f.stage}</div>
      <div class="bar"><div class="fill" style="width:${w}%"></div></div>
      <div class="num">${f.reached} · ${f.pct}%</div></div>`;
  }).join("");
  return `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lyra Stats</title>
<style>
  body{margin:0;background:#0b0918;color:#e8e6ff;font-family:Inter,system-ui,sans-serif;padding:26px}
  .card{max-width:620px;margin:0 auto;background:linear-gradient(180deg,#141126,#0b0918);
    border:1px solid rgba(150,120,255,.25);border-radius:16px;padding:24px}
  h1{font-size:19px;margin:0 0 4px} .sub{opacity:.7;font-size:13px;margin-bottom:18px}
  .row{display:flex;align-items:center;gap:10px;margin:5px 0}
  .lbl{width:96px;text-transform:capitalize;font-size:13px;opacity:.85}
  .bar{flex:1;background:rgba(255,255,255,.06);border-radius:6px;height:22px;overflow:hidden}
  .fill{height:100%;background:linear-gradient(90deg,#6f7bff,#c86bff)}
  .num{width:120px;text-align:right;font-size:13px}
  .splits{display:flex;gap:20px;margin-top:16px;font-size:13px;opacity:.85;flex-wrap:wrap}
  .foot{margin-top:16px;font-size:12px;opacity:.5}
</style></head><body><div class="card">
  <h1>Lyra's Orb — stage drop-off</h1>
  <div class="sub">${d.started} games · ${d.completions} reached taboo (${d.completionPct}%) · avg ${d.avgTurns} turns</div>
  ${bars}
  <div class="splits">
    <div>Couple: <b>${d.byMode.couple}</b> · Group: <b>${d.byMode.group}</b></div>
    <div>EN: <b>${d.byLang.en}</b> · ES: <b>${d.byLang.es}</b></div>
  </div>
  <div class="foot">Anonymous aggregate. Reach = games that got to that stage or further.</div>
</div></body></html>`;
}
