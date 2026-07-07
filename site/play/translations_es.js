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
  // Style: tú, Latin-American Spanish, Lyra sensual y misteriosa — nunca literal.
  prompts: {
    // ── PILOT BATCH: one slice through all seven stages ──
    CPE0004: { text: "{actor}, narra la rutina matutina de {target} como si fuera un documental de David Attenborough. Compromiso total.", enHash: 1371766382 },
    CPE0009: { text: "{actor}, baila como si estuvieras en un club de {dance1} pero fingiendo un aburrimiento profundo. Haz reír a {target}.", enHash: 3647164697 },
    CPE0051: { text: "Si {target} tuviera una etiqueta de advertencia, ¿qué diría? Léela en voz alta como un comercial de farmacia.", enHash: 2433982572 },
    CPLN008: { text: "¿Qué buscaste en Google sobre {target} antes de esta noche? Sé específico.", enHash: 2729070083 },
    CPE0085: { text: "{actor}, susúrrale al oído a {target} algo que haga que se sonroje. Hazlo despacio.", enHash: 625296705 },
    CPE0090: { text: "¿Cuál es la jugada de coqueteo más vergonzosa que {target} usó contigo? Cuéntanos todos los detalles.", enHash: 2519912926 },
    CPL0163: { text: "{actor}, siéntate frente a {target}. Sin tocarse. Durante 60 segundos completos, mira — mira de verdad — y deja que sienta todo el peso de tu atención. No lo suavices.", enHash: 3372432095 },
    CPL0170: { text: "{actor}, acércate y aparta un mechón de pelo de la cara de {target}. Despacio. Deja que tus dedos descansen un instante en su mejilla. Luego retírate. No digas nada. Deja que el gesto hable.", enHash: 3374940452 },
    CPL0182: { text: "{actor}, toma la cara de {target} entre tus manos. Junta tu frente con la suya. Cierra los ojos y respira — sin buscar el mismo ritmo, solo cerca. Quédense así un minuto entero. Nada más.", enHash: 3326041212 },
    CPL0224: { text: "{actor}, besa a {target} ahora — ni suave, ni urgente. Algo intermedio. El tipo de beso que pesa, que dice: sé exactamente lo que quiero, y eres tú. Que tu boca lo diga en serio.", enHash: 1648897946 },
    CPL0338: { text: "{actor}, desviste a {target} — con los dientes y una mano. La otra queda plana sobre su pecho. Siente su corazón. Nota cuándo se acelera. Deja que eso te diga cómo vas.", enHash: 3167266481 },
    CPL0368: { text: "{actor}, desviste a {target} — una prenda a la vez. Antes de quitar cada una, apoya tus labios en la piel que está a punto de revelarse. Después di lo que estás pensando. En voz alta. Cada vez.", enHash: 744531300 },
    CPL0405: { text: "{actor}, desvístete despacio. {target} mira — ese es el reto. Tómate tu tiempo con cada prenda. Tu cuerpo construye el deseo antes de que tus manos lleguen a las suyas. Haz que la espera duela.", enHash: 58523739 },
    CPL0444: { text: "{actor}, entra en {target}. Despacio — cada centímetro deliberado. Deja que sienta la llegada de cada uno. Luego encuentra un ritmo: constante, creciente, implacable como la marea. No apures lo que este momento merece.", enHash: 3822154644 },
    CPL0470: { text: "{actor}, lleva a {target} hasta el borde — lee cada señal hasta que esté justo en el umbral — y retrocede. Cuando recupere el aliento, construye de nuevo. Que se quede ahí, temblando entre la ruina y el alivio, hasta que Lyra diga basta.", enHash: 3254017915 },
    CPL0481: { text: "{actor}, da un paso atrás, lejos de {target}. Sin tocar. Sin hablar. Deja que sienta tu presencia como calor sin contacto. {target} espera. Tú decides cuándo termina el minuto — no antes.", enHash: 3665082000 }
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
