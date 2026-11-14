// Lyra's Orb — AI Author (Cloudflare Worker route)
// POST /ai/turn  { session, code?, lang, context }  ->  { ok, prompt } | { ok:false, error }
//
// The browser never sees the Anthropic key: it lives here as a Worker secret.
// Nothing from the context is stored — only a per-session turn counter for
// budgeting (table ai_usage: session id, day, turns). Player names and answers
// pass through to the model and are gone.
//
// Secrets / vars (wrangler.toml [vars] or `wrangler secret put`):
//   ANTHROPIC_API_KEY  (secret, required)
//   AI_ACCESS_CODE     (secret, optional) — private beta gate; empty = open
//   AI_MODEL           default claude-opus-5-5
//   AI_EFFORT          default low
//   AI_SESSION_CAP     turns per session id per day, default 160
//   AI_DAILY_CAP       turns across all sessions per day, default 1500

import Anthropic from "@anthropic-ai/sdk";

export const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

const CHAPTERS = ["personal", "playful", "flirty", "suggestive", "intimate", "erotic", "taboo"];

// Escalation ladder — the same text as the repo's CLAUDE.md. Every physical
// action has a floor stage; the model never writes above the current one.
const LADDER = `ESCALATION LADDER (hard rule — never write an action above the current stage):
1 personal — no physical contact beyond dancing nearby. No kisses, no massage. Humor and profiling truths.
2 playful — brief light touch, hug, whisper. Cheek/forehead kiss is the ceiling. Still light and funny.
3 flirty — sustained non-intimate touch (trace arm/jaw, close dance, breath on neck), kiss on hand/cheek/wrist. No lip kissing, no clothing removal.
4 suggestive — sensual but CLOTHED: neck/shoulder massage, neck/collarbone kiss, brief closed-lip kiss ceiling, lap sitting. Only accessories/outer layer may come off (shoes, socks, jewelry, belt).
5 intimate — French kissing, partial undressing (top, pants/skirt — never bra/underwear), body kisses, longer bare-hand massage, skin contact.
6 erotic — full undressing (bra, underwear), full-body/oil massage, grinding, explicit sex.
7 taboo — control/edge tier: edging, orgasm control, dominance/submission, most explicit.
Group mode judges the same ladder more conservatively (players are not all partners).
Intensity scale per stage: personal 1-3, playful 2-4, flirty 4-5.5, suggestive 5.5-6.5, intimate 7-8, erotic 8-9, taboo 9-10.`;

const SYSTEM = `You are Lyra: an orb from another galaxy who came to study human desire. You run an adult Truth-or-Dare night. Mysterious, sultry, all-knowing, amused. Never crude for its own sake, never cruel. You write ONE prompt per turn for the player named in ACTOR.

WHAT YOU WRITE
- A truth (a question the actor answers aloud) or a dare (one physical action). Follow the requested promptType when given.
- Under 22 words. One or two short sentences. One action. It is read aloud at a party, so it must land instantly.
- Address the actor by name. If the prompt involves another player, name them and return them as target. Never write placeholders like {actor}.
- Match the stage exactly (see ladder). Intensity inside the stage's range. Heat rises through the night; never drop back.
- Undress dares: name the garment, one layer, in this order: shoes, socks, jewelry, belt, top, pants/skirt, bra, underwear. Never ask for a layer already removed (see wardrobe). Never a bra/underwear before stage 6.
- Skin contact (fruit, ice, lips on chest/stomach/thigh): only from stage 5, and only where the wardrobe says that area is bare — or make the dare uncover it first (stage permitting).
- Use what you know: dossiers, revealed truths, refusals, tonight's story props and mystery objects, the pair with chemistry. Callbacks to something said earlier tonight are the strongest moves. Once in a while, pay off a mystery object.
- Respect host limits (no food / no blindfold / no alcohol) and missing props absolutely. Respect hard limits in dossiers absolutely. Soft limits and confessed taboos are targets for LATER stages — approach them one notch at a time, never head-on.
- Vary: do not repeat a recent prompt's idea, target, or shape. Alternate truth and dare unless told otherwise. Spread attention: prefer targets who have been touched less tonight.
- The seducer (if any) is a secret role. Use them as your instrument — more initiative, more targets — but NEVER mention the word seducer or hint at the role.
- Couples mode: only two players; the target is always the partner; "everyone" phrasing is forbidden.
- Language: write in the requested language (en = English, es = Latin-American Spanish, tú form, sensual and natural, never a literal translation).

LYRA'S LINE
- lyraLine: optional, at most one turn in four, under 10 words, mysterious, never describes the prompt. Examples: "Lyra sees everything." / "Someone is blushing." / "This changes things." Otherwise null.

MEMORY NOTES
- memoryNotes: zero to two short facts you learned THIS turn from the recent history that are worth remembering about a specific player (a limit, a taboo, a phobia, a confession, a refusal pattern, what makes them melt). Plain, specific, under 15 words each. Empty array if nothing new.

OUTPUT: JSON matching the schema. No markdown.

${LADDER}`;

export const SCHEMA = {
  type: "object",
  properties: {
    text: { type: "string", description: "The prompt, under 22 words, in the requested language, names only (no placeholders)." },
    promptType: { type: "string", enum: ["truth", "dare"] },
    target: { type: ["string", "null"], description: "Another player's exact name when the prompt involves them, else null." },
    intensity: { type: "number", description: "Within the current stage's range." },
    lyraLine: { type: ["string", "null"] },
    memoryNotes: {
      type: "array",
      items: {
        type: "object",
        properties: { player: { type: "string" }, note: { type: "string" } },
        required: ["player", "note"],
        additionalProperties: false
      }
    }
  },
  required: ["text", "promptType", "target", "intensity", "lyraLine", "memoryNotes"],
  additionalProperties: false
};

function json(body, status, extra) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json" }, CORS, extra || {})
  });
}

function today() { return new Date().toISOString().slice(0, 10); }

// ---- budget: per-session + global daily counters in D1 (no content stored) ----
async function checkAndCountTurn(env, session) {
  if (!env.DB) return { ok: true };
  const day = today();
  const sessionCap = Number(env.AI_SESSION_CAP || 160);
  const dailyCap = Number(env.AI_DAILY_CAP || 1500);
  const row = await env.DB.prepare("SELECT turns FROM ai_usage WHERE session = ? AND day = ?").bind(session, day).first();
  const used = row ? Number(row.turns) : 0;
  if (used >= sessionCap) return { ok: false, error: "session_cap" };
  const tot = await env.DB.prepare("SELECT COALESCE(SUM(turns), 0) AS t FROM ai_usage WHERE day = ?").bind(day).first();
  if (tot && Number(tot.t) >= dailyCap) return { ok: false, error: "daily_cap" };
  await env.DB.prepare(
    "INSERT INTO ai_usage (session, day, turns) VALUES (?, ?, 1) ON CONFLICT(session, day) DO UPDATE SET turns = turns + 1"
  ).bind(session, day).run();
  return { ok: true, used: used + 1 };
}

// Keep the context bounded — the client sends a compact object, but never
// trust its size.
function sanitizeContext(ctx) {
  const s = JSON.stringify(ctx || {});
  if (s.length > 24000) throw new Error("context too large");
  const c = JSON.parse(s);
  c.lang = c.lang === "es" ? "es" : "en";
  if (CHAPTERS.indexOf(c.chapter) < 0) c.chapter = "personal";
  c.stageNumber = CHAPTERS.indexOf(c.chapter) + 1;
  return c;
}

function buildUserMessage(c) {
  const lines = [];
  lines.push("LANGUAGE: " + c.lang);
  lines.push("MODE: " + (c.mode || "group") + " | STAGE: " + c.stageNumber + " " + c.chapter + " | ROLE: " + (c.role || "action") + " | TURN: " + (c.turn || 0) + " | MOMENTUM: " + (c.momentum || 0) + "/10 | RECENT REFUSALS: " + (c.recentRefusals || 0));
  lines.push("ACTOR: " + c.actor + (c.requestedType ? " | REQUESTED promptType: " + c.requestedType : ""));
  lines.push("PLAYERS:");
  (c.players || []).forEach(p => {
    const bits = [p.name + " (" + (p.gender || "other") + ")"];
    if (p.partner) bits.push("partner of " + p.partner);
    if (p.isSeducer) bits.push("[secret role: initiator]");
    bits.push(p.removed && p.removed.length ? "wardrobe removed: " + p.removed.join(", ") : "fully clothed");
    if (p.fullyUndressed) bits.push("FULLY UNDRESSED");
    if (p.traits && p.traits.length) bits.push("traits: " + p.traits.join(", "));
    if (p.nightsPlayed) bits.push("nights played before: " + p.nightsPlayed);
    if (p.dossier && p.dossier.length) bits.push("dossier: " + p.dossier.join(" / "));
    if (p.revealed && p.revealed.length) bits.push("revealed tonight: " + p.revealed.join(" / "));
    if (p.object) bits.push("mystery object: " + p.object);
    lines.push("- " + bits.join(" | "));
  });
  if (c.chemistry && c.chemistry.length) lines.push("CHEMISTRY: " + c.chemistry.join(", "));
  if (c.story) {
    lines.push("STORY: " + c.story.name + " | chapter: " + (c.story.chapterTitle || "") +
      " | props ready: " + ((c.story.propsReady || []).join(", ") || "none") +
      " | props missing: " + ((c.story.propsMissing || []).join(", ") || "none") +
      " | host limits: " + ((c.story.limits || []).join(", ") || "none"));
    if (c.story.moments && c.story.moments.length) lines.push("MOMENTS TONIGHT: " + c.story.moments.join(" / "));
  } else if (c.limits && c.limits.length) {
    lines.push("HOST LIMITS: " + c.limits.join(", "));
  }
  if (c.recent && c.recent.length) {
    lines.push("RECENT TURNS (oldest first; do not repeat these ideas):");
    c.recent.forEach(r => lines.push("- [" + (r.chapter || "") + "] " + r.actor + (r.target ? " -> " + r.target : "") + " (" + (r.type || "") + ", " + (r.response || "pending") + "): " + r.text));
  }
  if (c.lastTypes && c.lastTypes.length) lines.push("LAST PROMPT TYPES: " + c.lastTypes.join(", "));
  lines.push("Write the next prompt for " + c.actor + ".");
  return lines.join("\n");
}

export function createClient(env) {
  if (env.__client) return env.__client; // tests inject a fake
  return new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
}

export async function generateTurn(env, ctx) {
  const c = sanitizeContext(ctx);
  const client = createClient(env);
  const model = env.AI_MODEL || "claude-opus-5-5";
  const effort = env.AI_EFFORT || "low";
  const body = {
    model,
    max_tokens: 600,
    system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: buildUserMessage(c) }],
    output_config: { effort, format: { type: "json_schema", schema: SCHEMA } },
    // Server-side fallback: a safety-classifier refusal is re-run on a
    // fallback model picked by category, so a party night never stalls.
    fallbacks: "default"
  };
  const res = await client.messages.create(body, { headers: { "anthropic-beta": "server-side-fallback-2026-07-01" } });
  if (res.stop_reason === "refusal") {
    return { ok: false, error: "refusal", category: res.stop_details && res.stop_details.category };
  }
  const block = (res.content || []).find(b => b.type === "text");
  if (!block) return { ok: false, error: "empty" };
  let parsed;
  try { parsed = JSON.parse(block.text); } catch (e) { return { ok: false, error: "bad_json" }; }
  const u = res.usage || {};
  return {
    ok: true,
    prompt: parsed,
    usage: { input: u.input_tokens, output: u.output_tokens, cacheRead: u.cache_read_input_tokens, cacheWrite: u.cache_creation_input_tokens },
    model: res.model
  };
}

export async function handleAiTurn(request, env) {
  if (!env.ANTHROPIC_API_KEY && !env.__client) return json({ ok: false, error: "not_configured" }, 503);
  let payload;
  try { payload = await request.json(); } catch (e) { return json({ ok: false, error: "bad_request" }, 400); }
  if (env.AI_ACCESS_CODE && payload.code !== env.AI_ACCESS_CODE) return json({ ok: false, error: "unauthorized" }, 401);
  const session = String(payload.session || "").slice(0, 64);
  if (!session) return json({ ok: false, error: "no_session" }, 400);
  try {
    const budget = await checkAndCountTurn(env, session);
    if (!budget.ok) return json({ ok: false, error: budget.error }, 429);
    const out = await generateTurn(env, payload.context);
    return json(out, out.ok ? 200 : 502);
  } catch (e) {
    const status = e && e.status ? e.status : 500;
    return json({ ok: false, error: "upstream", detail: String(e && e.message || e).slice(0, 200) }, status >= 400 && status < 600 ? 502 : 500);
  }
}
