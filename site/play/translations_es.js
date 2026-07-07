// Lyra's Orb — Spanish translation overlay
// =========================================
// Structure: prompts are keyed by prompt ID and carry a hash of the ENGLISH
// text they were translated from. If the English text changes later, the CI
// check (check_translations.js) flags the translation as STALE so it gets
// re-reviewed — that's how wording fixes stay in sync across languages.
//
// enHash = djb2 hash of the English prompt text at translation time.
// Generate entries with:  node check_translations.js --stub CPL0001
//
// Missing entries are fine — the game falls back to English per prompt.
//
// Style decisions (locked once translation starts):
//   - Register: TBD (tú vs ustedes for group prompts)
//   - Variant: TBD (Latin American vs peninsular)
//   - Lyra's voice: mysterious, sultry, all-knowing — never literal-translated

var TRANSLATIONS_ES = {
  _meta: {
    language: "es",
    name: "Español",
    updated: "2026-07-07"
  },

  // Prompt translations: id -> { text, enHash }
  // {actor}/{target}/{dance1}/{dance2} placeholders stay in the Spanish text.
  prompts: {
    // Example (remove when real translation starts):
    // CPL0001: { text: "…", enHash: 0 }
  },

  // Engine/UI strings: key -> Spanish text.
  // {name}/{judge} placeholders are substituted by the engine.
  ui: {
    // Vote & verdict overlays
    "vote.dare": "¿Qué tal lo hizo {name}? {judge} puntúa del 1 al 5.",
    "vote.truth": "¿{name} reveló lo suficiente? {judge} decide.",
    "verdict.question": "El momento de la verdad: ¿{name} acertó? {judge} decide.",
    "verdict.correct": "CORRECTO",
    "verdict.wrong": "FALLASTE — ¡BEBE!",
    "verdict.cheers": "¡SALUD!",

    // Feedback buttons
    "btn.done": "HECHO",
    "btn.answered": "RESPONDIDO",
    "btn.refused": "RECHAZADO",
    "btn.pass": "PASO",
    "btn.spin": "GIRA ({n})",

    // Judges
    "judge.partner": "Tu pareja",
    "judge.group": "El grupo"
  }
};
