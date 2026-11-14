// Offline test for the AI Author route: fake Anthropic client + fake D1.
// Run: node test_ai.mjs   (from worker/, after npm install)
import { handleAiTurn, SCHEMA } from "./src/ai.js";

let failures = 0;
function check(label, cond) { console.log((cond ? "ok   " : "FAIL ") + label); if (!cond) failures++; }

function fakeDB() {
  const rows = {};
  return {
    prepare(sql) {
      return {
        bind(...args) {
          return {
            async first() {
              if (sql.startsWith("SELECT turns")) { const r = rows[args[0] + "|" + args[1]]; return r ? { turns: r } : null; }
              if (sql.startsWith("SELECT COALESCE")) { let t = 0; Object.keys(rows).forEach(k => { if (k.endsWith("|" + args[0])) t += rows[k]; }); return { t }; }
              return null;
            },
            async run() { const k = args[0] + "|" + args[1]; rows[k] = (rows[k] || 0) + 1; return {}; }
          };
        }
      };
    }
  };
}

let lastBody = null, lastOpts = null;
const fakeClient = (reply) => ({
  messages: {
    async create(body, opts) {
      lastBody = body; lastOpts = opts;
      return reply(body);
    }
  }
});

const good = {
  text: "Grecia, feed Hans one grape with your fingers. Hold his eyes the whole time.",
  promptType: "dare", target: "Hans", intensity: 4.5, lyraLine: null,
  memoryNotes: [{ player: "Hans", note: "refused a kiss dare once tonight" }]
};

const ctx = {
  lang: "en", mode: "group", chapter: "flirty", role: "action", turn: 12, actor: "Grecia",
  players: [{ name: "Hans", gender: "male", removed: ["shoes"] }, { name: "Grecia", gender: "female" }],
  recent: [{ chapter: "flirty", actor: "Hans", target: "Grecia", type: "truth", response: "answered", text: "..." }]
};

function req(body) { return new Request("https://x/ai/turn", { method: "POST", body: JSON.stringify(body) }); }

// 1. happy path
let env = { __client: fakeClient(() => ({ stop_reason: "end_turn", content: [{ type: "text", text: JSON.stringify(good) }], usage: { input_tokens: 900, output_tokens: 80 }, model: "claude-opus-5-5" })), DB: fakeDB(), AI_SESSION_CAP: 3, AI_DAILY_CAP: 5 };
let r = await handleAiTurn(req({ session: "s1", context: ctx }), env);
let j = await r.json();
check("200 with prompt", r.status === 200 && j.ok && j.prompt.text === good.text);
check("request uses structured output schema", lastBody.output_config && lastBody.output_config.format.type === "json_schema" && lastBody.output_config.format.schema === SCHEMA);
check("effort low by default", lastBody.output_config.effort === "low");
check("system prompt cached", Array.isArray(lastBody.system) && lastBody.system[0].cache_control.type === "ephemeral");
check("fallbacks default + beta header", lastBody.fallbacks === "default" && lastOpts.headers["anthropic-beta"] === "server-side-fallback-2026-07-01");
check("no temperature sent", !("temperature" in lastBody));
const user = lastBody.messages[0].content;
check("context rendered", /ACTOR: Grecia/.test(user) && /wardrobe removed: shoes/.test(user) && /STAGE: 3 flirty/.test(user));
check("model default", lastBody.model === "claude-opus-5-5");

// 2. access code gate
env.AI_ACCESS_CODE = "orb-42";
r = await handleAiTurn(req({ session: "s1", context: ctx }), env); check("401 without code", r.status === 401);
r = await handleAiTurn(req({ session: "s1", code: "orb-42", context: ctx }), env); check("200 with code", r.status === 200);
delete env.AI_ACCESS_CODE;

// 3. session cap (3): s1 has used 2 (the 401 never counted) — third passes, fourth is capped
r = await handleAiTurn(req({ session: "s1", context: ctx }), env); check("third turn allowed", r.status === 200);
r = await handleAiTurn(req({ session: "s1", context: ctx }), env); j = await r.json();
check("429 session_cap", r.status === 429 && j.error === "session_cap");
// 4. daily cap (5): s2 gets 2 more then blocked
await handleAiTurn(req({ session: "s2", context: ctx }), env); await handleAiTurn(req({ session: "s2", context: ctx }), env);
r = await handleAiTurn(req({ session: "s3", context: ctx }), env); j = await r.json();
check("429 daily_cap", r.status === 429 && j.error === "daily_cap");

// 5. refusal
env = { __client: fakeClient(() => ({ stop_reason: "refusal", stop_details: { type: "refusal", category: "general_harms" }, content: [] })), DB: fakeDB() };
r = await handleAiTurn(req({ session: "s9", context: ctx }), env); j = await r.json();
check("refusal surfaces as 502 error", r.status === 502 && j.error === "refusal");

// 6. bad json from model
env = { __client: fakeClient(() => ({ stop_reason: "end_turn", content: [{ type: "text", text: "not json" }] })), DB: fakeDB() };
r = await handleAiTurn(req({ session: "s9", context: ctx }), env); j = await r.json();
check("bad_json surfaces", j.error === "bad_json");

// 7. not configured
r = await handleAiTurn(req({ session: "s9", context: ctx }), { DB: fakeDB() });
check("503 when no key", r.status === 503);

// 8. oversized context
env = { __client: fakeClient(() => ({})), DB: fakeDB() };
r = await handleAiTurn(req({ session: "s9", context: { big: "x".repeat(30000) } }), env);
check("oversized context rejected", r.status !== 200);

console.log(failures ? "\nFAIL " + failures : "\nPASS worker ai route");
process.exit(failures ? 1 : 0);
