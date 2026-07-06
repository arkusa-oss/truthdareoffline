// Lyra's Orb — Couple Edition
// Couples prompts: personal + playful stages
// Philosophy: profile through humor, connect through play, heat builds gradually
//
// coupleType field:
//   "established" — for couples who know each other (rediscovery, shared history)
//   "new"         — for new couples / first dates (discovery, getting to know)
//   "both"        — works either way (all dares, universal truths)

var COUPLES_PROMPTS_EARLY = [
  // ============================================================================
  // STAGE 1: PERSONAL (Merengue energy)
  // Warm, funny, surprising. Best conversation after two drinks.
  // ============================================================================

  // SETUP ROLE (Personal stage) — 12 prompts
  { id: "CPL0001", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something {target} does at home that they think is completely private — but you've seen it many times and said nothing?", target: "other" },
  { id: "CPL0002", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's {target}'s most annoying habit that you've been silently tolerating since the start — and how long have you been sitting on it?", target: "other" },
  { id: "CPL0003", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something {target} owns that you have wanted to throw away for years but haven't said a word about?", target: "other" },
  { id: "CPL0004", chapter: "personal", role: "setup", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, narrate {target}'s morning routine like a David Attenborough nature documentary. Full commitment.", target: "other" },
  { id: "CPL0005", chapter: "personal", role: "setup", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, do your best impression of {target} ordering food at a restaurant. Now do their 'I'm pretending I'm not mad' voice.", target: "other" },
  { id: "CPL0006", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something {target} says they hate that you've quietly observed them actually enjoying?", target: "other" },
  { id: "CPL0007", chapter: "personal", role: "setup", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, show {target} exactly how they walk when they think no one is watching. Stay in character for 20 seconds.", target: "other" },
  { id: "CPL0008", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's {target}'s most predictable move — so predictable you could set a clock to it? Describe the full pattern.", target: "other" },
  { id: "CPL0009", chapter: "personal", role: "setup", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, dance like you're at a merengue club but you're pretending to be deeply unimpressed. Make {target} laugh.", target: "other" },
  { id: "CPL0010", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something {target} thinks they're great at that you privately know they are... not?", target: "other" },
  { id: "CPL0011", chapter: "personal", role: "setup", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, mimic {target}'s laugh perfectly. Do it three times in a row, each with a different emotion.", target: "other" },
  { id: "CPL0012", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's the dumbest argument you two have ever had? Summarize it in one gloriously embarrassing sentence.", target: "other" },

  // INTERACTION ROLE (Personal stage) — 18 prompts
  { id: "CPL0013", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something {target} does that you used to find hilarious but have completely stopped noticing?", target: "other" },
  { id: "CPL0014", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's the most embarrassing thing {target} does that they think no one notices?", target: "other" },
  { id: "CPL0015", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, recreate {target}'s most embarrassing dance move from their memory. They have to narrate how close you got.", target: "other" },
  { id: "CPL0016", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's a weird thing you two do together that would take at least ten minutes to explain to anyone outside this relationship?", target: "other" },
  { id: "CPL0017", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, talk like {target} for 30 seconds, but you're gossiping about {target} to someone else. Go.", target: "other" },
  { id: "CPL0018", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something you've quietly started doing differently because of {target} — that you'd be slightly embarrassed to admit to?", target: "other" },
  { id: "CPL0019", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, move your hips like a merengue dancer and make {target} try to match your rhythm. Laugh at how wrong they get it.", target: "other" },
  { id: "CPL0020", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's {target}'s most reliable tell — the thing they do when they're nervous, lying, or pretending everything's fine?", target: "other" },
  { id: "CPL0021", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, do your worst {target} impression. They tell you what you got wrong. Do it again — better this time.", target: "other" },
  { id: "CPL0022", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something you've been letting {target} believe about themselves that isn't entirely accurate?", target: "other" },
  { id: "CPL0023", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, sing the first verse of any song but make it about {target}'s worst habit. Merengue style if you can.", target: "other" },
  { id: "CPL0024", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's the most random, specific thing you know about {target} that surprises everyone else but feels completely normal to you?", target: "other" },
  { id: "CPL0025", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, give {target} a five-second coaching session on how to dance better. Be brutally honest.", target: "other" },
  { id: "CPL0026", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's {target}'s worst habit that you've silently accepted is simply never going to change?", target: "other" },
  { id: "CPL0027", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, do your impression of {target} being disappointed. Add hand gestures.", target: "other" },
  { id: "CPL0028", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's a fight you two had that you now find funny — what was it actually about?", target: "other" },
  { id: "CPL0029", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, dance with {target} for 10 seconds but move like you're both 80 years old. Hold the energy.", target: "other" },
  { id: "CPL0030", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something {target} thinks is a secret they keep perfectly — but you've known about for a while?", target: "other" },

  // BUILD ROLE (Personal stage) — 20 prompts
  { id: "CPL0031", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something {target} is genuinely bad at that you've been quietly supporting the delusion about?", target: "other" },
  { id: "CPL0032", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, pretend you're a merengue instructor teaching {target} how to move. Be overly enthusiastic and slightly inappropriate with your feedback.", target: "other" },
  { id: "CPL0033", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something {target} does when they think you're not watching that would mortify them right now?", target: "other" },
  { id: "CPL0034", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, do a monologue as {target} from the perspective of {target}'s pet, car, or favorite object. Go for 20 seconds.", target: "other" },
  { id: "CPL0035", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's a tiny, weird thing {target} does that still makes you irrationally happy even after all this time?", target: "other" },
  { id: "CPL0036", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, speak like {target} for 30 seconds but you're explaining why merengue is better than every other dance.", target: "other" },
  { id: "CPL0037", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's a habit you've developed specifically because of {target} — and be honest about whether it's a good one?", target: "other" },
  { id: "CPL0038", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, do {target}'s walk from three different eras: age 8, age 18, age 80. Make it comedic.", target: "other" },
  { id: "CPL0039", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something about {target} that you still find attractive even though they're completely self-conscious about it?", target: "other" },
  { id: "CPL0040", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, show {target} your signature dance move. It can be terrible — in fact, the worse the better. {target} rates it 1-10.", target: "other" },
  { id: "CPL0041", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's {target}'s most embarrassing quirk that has become so familiar you've both stopped seeing it?", target: "other" },
  { id: "CPL0042", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, give a fake weather report but it's all about {target}'s mood patterns. Be meteorologist serious.", target: "other" },
  { id: "CPL0043", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's the most ridiculous phase {target} went through that you witnessed firsthand?", target: "other" },
  { id: "CPL0044", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, do a dramatic reading of your grocery list like you're performing at a merengue concert. Full emotion.", target: "other" },
  { id: "CPL0045", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's the most chaotic thing {target} has done that you witnessed but pretended you didn't see?", target: "other" },
  { id: "CPL0046", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, do {target}'s thinking face for 15 seconds. Get all the micro-expressions.", target: "other" },
  { id: "CPL0047", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something {target} does when stressed that is their absolute most predictable move — the one you could time?", target: "other" },
  { id: "CPL0048", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, dance like you're {target} trying to impress someone at a club. Then dance like {target} trying to escape from a club.", target: "other" },
  { id: "CPL0049", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What was the exact moment you knew you were completely, unavoidably in this — what happened?", target: "other" },
  { id: "CPL0050", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, impersonate {target} having a breakdown about something completely trivial. Make it hilarious.", target: "other" },

  // ACTION ROLE (Personal stage) — 18 prompts
  { id: "CPL0051", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "both", text: "If {target} had a warning label, what would it say? Read it out loud like a pharmaceutical ad.", target: "other" },
  { id: "CPL0052", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, teach {target} a dance move but do it like you're overly impressed with your own skills. Be arrogant.", target: "other" },
  { id: "CPL0053", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What do you actually think about when {target} thinks you're listening — and you're not?", target: "other" },
  { id: "CPL0054", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, be {target} receiving terrible life advice from a merengue dancer. React to everything.", target: "other" },
  { id: "CPL0055", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's {target}'s best 'I messed up but I'm playing it cool' performance? Describe the last one you witnessed.", target: "other" },
  { id: "CPL0056", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, do a phone call as {target} talking to your mom. Hit all the good awkward moments.", target: "other" },
  { id: "CPL0057", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "both", text: "What's your most embarrassing Google search from the past month? Say it out loud. All of it.", target: "other" },
  { id: "CPL0058", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, move your hips in a perfect merengue rhythm while making direct eye contact with {target}. Hold it for 15 seconds.", target: "other" },
  { id: "CPL0059", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's the most dramatic thing {target} has ever done over something completely trivial?", target: "other" },
  { id: "CPL0060", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, do a five-second commentary on {target}'s dating potential if {target} was single tomorrow. Be hilariously mean.", target: "other" },
  { id: "CPL0061", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's a small lie you told {target} early on that was so insignificant you never corrected it — and technically it's still active?", target: "other" },
  { id: "CPL0062", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, recreate {target}'s entrance to a room. Really commit to the walk, the face, the energy.", target: "other" },
  { id: "CPL0063", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What are three things {target} does in the morning that are genuinely terrible and they need to know?", target: "other" },
  { id: "CPL0064", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, give {target} a merengue rhythm lesson while narrating their natural talent incorrectly.", target: "other" },
  { id: "CPL0065", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's {target}'s most reliable 'I'm upset but pretending I'm not' signal — describe it exactly?", target: "other" },
  { id: "CPL0066", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, be {target} at a job interview but they keep getting distracted by something ridiculous. Go for 20 seconds.", target: "other" },
  { id: "CPL0067", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something about {target} that still catches you off guard — something small that hasn't lost its novelty?", target: "other" },
  { id: "CPL0068", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, move like {target} in five different scenarios: at a funeral, at a party, at the grocery store, at a doctor's appointment, at the gym.", target: "other" },

  // PEAK ROLE (Personal stage) — 7 prompts
  { id: "CPL0069", chapter: "personal", role: "peak", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's something {target} believes about themselves that you know isn't quite accurate — but you've never said anything?", target: "other" },
  { id: "CPL0070", chapter: "personal", role: "peak", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, dance a full merengue routine but with {target}'s personality encoded into every move. Make it unmistakably them.", target: "other" },
  { id: "CPL0071", chapter: "personal", role: "peak", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's a version of {target} you've seen — a mood, a moment — that they probably think you haven't noticed?", target: "other" },
  { id: "CPL0072", chapter: "personal", role: "peak", type: "directed", promptType: "dare", intensity: 3, coupleType: "both", text: "{actor}, do {target}'s full-body impression: the walk, the talk, the mannerisms, the sense of humor. Go for 45 seconds. Everything.", target: "other" },
  { id: "CPL0073", chapter: "personal", role: "peak", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's a completely unhinged opinion {target} holds that you've never challenged — why do you let them keep it?", target: "other" },
  { id: "CPL0074", chapter: "personal", role: "peak", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, give {target} a five-minute coaching session on a merengue dance move. Be a tough but fair instructor.", target: "other" },
  { id: "CPL0075", chapter: "personal", role: "peak", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "If your relationship was a TV show, what genre is it, what season are you on, and what's the current ridiculous arc?", target: "other" },

  // TRANSITION ROLE (Personal stage) — 5 prompts
  { id: "CPL0076", chapter: "personal", role: "transition", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, do a slow-motion merengue dance with {target}. Make it funny, make it smooth, make it transition into something else.", target: "other" },
  { id: "CPL0077", chapter: "personal", role: "transition", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something small about {target} that still catches you off guard — a detail that hasn't lost its novelty?", target: "other" },
  { id: "CPL0078", chapter: "personal", role: "transition", type: "directed", promptType: "dare", intensity: 1, coupleType: "both", text: "{actor}, teach {target} a completely made-up dance move and give it a ridiculous name. Both of you have to perform it together.", target: "other" },
  { id: "CPL0079", chapter: "personal", role: "transition", type: "directed", promptType: "truth", intensity: 1, coupleType: "established", text: "What's something {target} does that you've secretly started copying — and do they know?", target: "other" },
  { id: "CPL0080", chapter: "personal", role: "transition", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, dance with {target} in a way you've never danced together. Anything but merengue. Show them something new.", target: "other" },

  // ============================================================================
  // STAGE 2: PLAYFUL (Bachata energy)
  // Flirty curiosity. Humor gets edgier, chemistry starts showing.
  // ============================================================================

  // SETUP ROLE (Playful stage) — 12 prompts
  { id: "CPL0081", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "Rate {target}'s flirting technique from when you first met to right now. Give a score. Give feedback.", target: "other" },
  { id: "CPL0082", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's the most embarrassingly bad romantic move {target} pulled on you that you still find endearing?", target: "other" },
  { id: "CPL0083", chapter: "playful", role: "setup", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, hold {target}'s hand and trace a letter on their palm very slowly. They have to guess what it is.", target: "other" },
  { id: "CPL0084", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's the most ridiculous thing {target} did when you first got together that you found unexpectedly attractive?", target: "other" },
  { id: "CPL0085", chapter: "playful", role: "setup", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, whisper something into {target}'s ear that makes them blush. Do it slowly.", target: "other" },
  { id: "CPL0086", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's something about {target}'s appearance that they probably underestimate how attractive it is?", target: "other" },
  { id: "CPL0087", chapter: "playful", role: "setup", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, feed {target} something slowly and make eye contact. Don't break it.", target: "other" },
  { id: "CPL0088", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's something {target} does now that you find just as attractive as when it first got your attention?", target: "other" },
  { id: "CPL0089", chapter: "playful", role: "setup", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, dance a slow bachata with {target}. Keep it close, keep it connected, even if you're laughing.", target: "other" },
  { id: "CPL0090", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's the most embarrassing flirting move or line {target} used on you? Give us all the details.", target: "other" },
  { id: "CPL0091", chapter: "playful", role: "setup", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, read something seductive to {target}. Use a voice that makes them uncomfortable in the best way.", target: "other" },
  { id: "CPL0092", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's something {target} does that's objectively not sexy but somehow still works on you every single time?", target: "other" },

  // INTERACTION ROLE (Playful stage) — 18 prompts
  { id: "CPL0093", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's {target}'s best flirting move and their absolute worst — name both with no mercy?", target: "other" },
  { id: "CPL0094", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, run your fingers down {target}'s arm very slowly. Focus on their reaction.", target: "other" },
  { id: "CPL0095", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's the funniest 'trying to set a romantic mood' fail between you two? The full story.", target: "other" },
  { id: "CPL0096", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 3, coupleType: "both", text: "{actor}, slow-dance to the music with {target} but narrate it like a documentary about desire. Keep dancing.", target: "other" },
  { id: "CPL0097", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's the most unromantic thing that's happened during a romantic moment — the one you've told no one?", target: "other" },
  { id: "CPL0098", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, let {target} touch your neck and jaw for 10 seconds. Just feel it. No laughing (good luck).", target: "other" },
  { id: "CPL0099", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's a way {target} used to try to seduce you that they've completely stopped — do they know they stopped?", target: "other" },
  { id: "CPL0100", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, make {target} guess what you're thinking about while looking at them. Use only your eyes.", target: "other" },
  { id: "CPL0101", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's something {target} said or did early on that you still think about — and haven't brought up since?", target: "other" },
  { id: "CPL0102", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, whisper your favorite thing about {target}'s body into their ear. Slow. Intentional.", target: "other" },
  { id: "CPL0103", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's {target}'s most famous 'trying to be sexy' face? Describe it in detail — or demonstrate it for us.", target: "other" },
  { id: "CPL0104", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 3, coupleType: "both", text: "{actor}, give {target} a neck massage but do it like you're doing something forbidden. Make it charged.", target: "other" },
  { id: "CPL0105", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's the most ridiculous thing you've done to get {target}'s attention when they weren't giving you enough?", target: "other" },
  { id: "CPL0106", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, feed {target} and make it purposely sensual. Make them feel seen.", target: "other" },
  { id: "CPL0107", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's something {target} does to try to impress you that doesn't land the way they intend — but you find sweet?", target: "other" },
  { id: "CPL0108", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, stare at {target} with intention for 15 seconds. Don't look away first.", target: "other" },
  { id: "CPL0109", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's {target}'s signature 'I want your attention right now' move — demonstrate it exactly as they do it.", target: "other" },
  { id: "CPL0110", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 3, coupleType: "both", text: "{actor}, dance to the music with {target} while whispering things that make them blush. Don't stop dancing.", target: "other" },

  // BUILD ROLE (Playful stage) — 20 prompts
  { id: "CPL0111", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "Describe the moment you first realized you were attracted to {target} as a weather forecast. Precision matters.", target: "other" },
  { id: "CPL0112", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, trace {target}'s jawline with your finger very slowly. Hold their gaze.", target: "other" },
  { id: "CPL0113", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's the most obvious sign that {target} is attracted to someone — and do they know they do it?", target: "other" },
  { id: "CPL0114", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, palm-read {target}'s hand but describe your sexual chemistry instead of their future.", target: "other" },
  { id: "CPL0115", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's something {target} does without realizing it that makes you find them more attractive?", target: "other" },
  { id: "CPL0116", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 3, coupleType: "both", text: "{actor}, dance a slow bachata with {target} while touching them in ways you've never touched them before. Keep it playful.", target: "other" },
  { id: "CPL0117", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's a compliment you gave {target} at the beginning that you still mean — but haven't repeated since?", target: "other" },
  { id: "CPL0118", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, paint {target}'s lips with your thumb very slowly. Make it intimate.", target: "other" },
  { id: "CPL0119", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's a compliment you've thought about giving {target} multiple times but always chickened out of saying?", target: "other" },
  { id: "CPL0120", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, hold {target}'s face in your hands and describe one thing you love about how they look at you.", target: "other" },
  { id: "CPL0121", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's the most embarrassing romantic gesture you've made for {target} that completely missed — but you went all in?", target: "other" },
  { id: "CPL0122", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, do a slow bachata grind with {target}. Make it less funny, more intentional.", target: "other" },
  { id: "CPL0123", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's something you do when you think {target} is asleep or distracted that you've never mentioned?", target: "other" },
  { id: "CPL0124", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, whisper a confession into {target}'s neck. Something you've wanted to say but felt shy about.", target: "other" },
  { id: "CPL0125", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "If {target} described their ideal version of you in three words, what do you think they'd say — and what would you want them to say?", target: "other" },
  { id: "CPL0126", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 3, coupleType: "both", text: "{actor}, give {target} a full-body description of what you find attractive about them. Take your time.", target: "other" },
  { id: "CPL0127", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's the most ridiculous romantic fail between you two that has become a story you tell?", target: "other" },
  { id: "CPL0128", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, let {target} touch your hair and face however they want for 20 seconds. Just receive it.", target: "other" },
  { id: "CPL0129", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's a song that makes you think of {target} in a way that would embarrass you both if they knew why?", target: "other" },
  { id: "CPL0130", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, dance to the music with {target} and let your hips do the talking. No hands if you're confident.", target: "other" },

  // ACTION ROLE (Playful stage) — 18 prompts
  { id: "CPL0131", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's something {target} used to do to get your attention in the early days that they've since completely stopped?", target: "other" },
  { id: "CPL0132", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 3, coupleType: "both", text: "{actor}, give {target} a sensual massage that goes from their shoulders to wherever feels right. Keep it playful.", target: "other" },
  { id: "CPL0133", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's something {target} does that still makes you completely lose your composure — and they have no idea?", target: "other" },
  { id: "CPL0134", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, lock eyes with {target} while dancing a bachata close enough to feel the heat between you.", target: "other" },
  { id: "CPL0135", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's something {target} does that's irrational and mildly annoying — but also makes you more attracted to them?", target: "other" },
  { id: "CPL0136", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, let {target} put a blindfold on you and describe what you're about to feel before they touch you.", target: "other" },
  { id: "CPL0137", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's a specific moment when {target} made you feel genuinely wanted — that you've never mentioned to them?", target: "other" },
  { id: "CPL0138", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 3, coupleType: "both", text: "{actor}, taste {target} (lips, collarbone, whatever they allow). Slow. Intentional.", target: "other" },
  { id: "CPL0139", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What's {target}'s worst attempt at being romantic that you've witnessed? Rate it 1-10 right to their face.", target: "other" },
  { id: "CPL0140", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, lead {target} in a bachata where you're the one taking control. Let your body language show intention.", target: "other" },
  { id: "CPL0141", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "What would {target}'s LinkedIn profile say if it was brutally honest about who they are as a romantic partner?", target: "other" },
  { id: "CPL0142", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, whisper the most flirtatious thing you can think of into {target}'s ear. Make them feel wanted.", target: "other" },
  { id: "CPL0143", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "established", text: "If your relationship was a cocktail, what are the ingredients, the ratios, and what is it called?", target: "other" },
  { id: "CPL0144", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 3, coupleType: "both", text: "{actor}, give {target} a full sensual experience: music, touch, words. Two minutes. Go.", target: "other" },
  { id: "CPL0145", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's something {target} doesn't know they do that makes you more attracted to them — every single time without fail?", target: "other" },
  { id: "CPL0146", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, dance to the music with {target} and let them feel how attracted you are. Don't hide it.", target: "other" },
  { id: "CPL0147", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's something specific {target} does or says that immediately gets your full attention — in the best way?", target: "other" },
  { id: "CPL0148", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 3, coupleType: "both", text: "{actor}, give {target} a five-minute experience where you touch them in ways that respect boundaries but express desire.", target: "other" },

  // PEAK ROLE (Playful stage) — 7 prompts
  { id: "CPL0149", chapter: "playful", role: "peak", type: "directed", promptType: "truth", intensity: 3, coupleType: "established", text: "What's something you've always wanted to tell {target} about what specifically attracts you to them — but never had quite the right moment?", target: "other" },
  { id: "CPL0150", chapter: "playful", role: "peak", type: "directed", promptType: "dare", intensity: 4, coupleType: "both", text: "{actor}, give {target} a full experience: music, touch, words, intensity. Five minutes. Everything you've been holding back.", target: "other" },
  { id: "CPL0151", chapter: "playful", role: "peak", type: "directed", promptType: "truth", intensity: 3, coupleType: "established", text: "What's the most charged moment you two have had that neither of you has ever fully acknowledged out loud?", target: "other" },
  { id: "CPL0152", chapter: "playful", role: "peak", type: "directed", promptType: "dare", intensity: 4, coupleType: "both", text: "{actor}, dance to the music with {target} where you're completely uninhibited. No holding back. No laughing it off. Real connection.", target: "other" },
  { id: "CPL0153", chapter: "playful", role: "peak", type: "directed", promptType: "truth", intensity: 3, coupleType: "established", text: "What's something {target} did or said once that you still think about — and why haven't you brought it up since?", target: "other" },
  { id: "CPL0154", chapter: "playful", role: "peak", type: "directed", promptType: "dare", intensity: 4, coupleType: "both", text: "{actor}, show {target} a side of yourself sexually that you normally hide. Let them see the real version of your desire.", target: "other" },
  { id: "CPL0155", chapter: "playful", role: "peak", type: "directed", promptType: "truth", intensity: 3, coupleType: "established", text: "What's something you've been hinting at wanting to explore with {target} for a while — but never quite said directly?", target: "other" },

  // TRANSITION ROLE (Playful stage) — 5 prompts
  { id: "CPL0156", chapter: "playful", role: "transition", type: "directed", promptType: "dare", intensity: 3, coupleType: "both", text: "{actor}, hold {target} close and slow-dance to the music. Let it be tender. Let it be about connection.", target: "other" },
  { id: "CPL0157", chapter: "playful", role: "transition", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What's something you want to explore with {target} that you didn't know you wanted until right now?", target: "other" },
  { id: "CPL0158", chapter: "playful", role: "transition", type: "directed", promptType: "dare", intensity: 2, coupleType: "both", text: "{actor}, whisper something you want to do with {target} later. Make it a promise.", target: "other" },
  { id: "CPL0159", chapter: "playful", role: "transition", type: "directed", promptType: "truth", intensity: 2, coupleType: "both", text: "What did you figure out about {target} during this game that genuinely surprised you?", target: "other" },
  { id: "CPL0160", chapter: "playful", role: "transition", type: "directed", promptType: "dare", intensity: 3, coupleType: "both", text: "{actor}, kiss {target} in a way that's both playful and means something. A transition kiss.", target: "other" },

  // ============================================================================
  // NEW COUPLE PROMPTS — coupleType: "new"
  // For couples early in the relationship or first dates.
  // Discovery mode: getting to know each other through humor and honesty.
  // ============================================================================

  // STAGE 1: PERSONAL — new couple truths

  // Setup role
  { id: "CPLN001", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What did you actually think of {target} the first time you saw them? Not the polite answer — the real one.", target: "other" },
  { id: "CPLN002", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's your most embarrassing teenage phase? The years, the look, and the specific moment it finally ended.", target: "other" },
  { id: "CPLN003", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's something you're weirdly, specifically good at that {target} doesn't know about yet?", target: "other" },
  { id: "CPLN004", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's a movie or show everyone else loves that you privately think is really not that good?", target: "other" },
  { id: "CPLN005", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's the most ridiculous thing you've ever bought that you have zero regret about?", target: "other" },

  // Interaction role
  { id: "CPLN006", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's your most irrational food rule — the one with no logical basis but you enforce absolutely?", target: "other" },
  { id: "CPLN007", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's a fear you have that most people would find absurd or funny?", target: "other" },
  { id: "CPLN008", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What did you Google or look up about {target} before tonight? Be specific.", target: "other" },
  { id: "CPLN009", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's the most embarrassing thing that's ever happened to you on a date — not this one?", target: "other" },
  { id: "CPLN010", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's a habit you have that you know is slightly unhinged but genuinely cannot stop?", target: "other" },
  { id: "CPLN011", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's something you believed as a kid that turned out to be completely, embarrassingly wrong?", target: "other" },

  // Build role
  { id: "CPLN012", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's the worst job you've ever had — and what's the most embarrassing thing that happened there?", target: "other" },
  { id: "CPLN013", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's your most embarrassing guilty pleasure that lives in complete plain sight?", target: "other" },
  { id: "CPLN014", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's the most ridiculous first impression you've ever made on someone you were trying to impress?", target: "other" },
  { id: "CPLN015", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's something about {target} you've noticed since you met that you weren't expecting?", target: "other" },
  { id: "CPLN016", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's your most chaotic story from the past year that {target} doesn't know yet?", target: "other" },
  { id: "CPLN017", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's a completely wrong first impression someone has had of you that you secretly enjoyed having?", target: "other" },

  // Action role
  { id: "CPLN018", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's something you want to know about {target} that you haven't found the right moment to ask?", target: "other" },
  { id: "CPLN019", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "If you had to describe yourself using only your three most embarrassing qualities, what are they?", target: "other" },
  { id: "CPLN020", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's the specific thing about {target} you remember noticing first — the actual first impression?", target: "other" },
  { id: "CPLN021", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's a completely absurd, niche opinion you hold that would surprise most people?", target: "other" },

  // Peak role
  { id: "CPLN022", chapter: "personal", role: "peak", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's one genuinely unexpected thing you've discovered about {target} tonight that you weren't expecting?", target: "other" },
  { id: "CPLN023", chapter: "personal", role: "peak", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What made you actually want to be here tonight — not the generic answer?", target: "other" },

  // Transition role
  { id: "CPLN024", chapter: "personal", role: "transition", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What's something {target} has said or done tonight that you want to remember?", target: "other" },
  { id: "CPLN025", chapter: "personal", role: "transition", type: "directed", promptType: "truth", intensity: 1, coupleType: "new", text: "What would you want to know about {target} after tonight that hasn't come up yet?", target: "other" },

  // ============================================================================
  // STAGE 2: PLAYFUL — new couple truths
  // Early chemistry: attraction discovery with humor, not vulnerability
  // ============================================================================

  // Setup role
  { id: "CPLN026", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What was your first impression of {target}'s flirting style? Be honest: smooth, chaotic, or 'what was that exactly'?", target: "other" },
  { id: "CPLN027", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's the first physical thing you noticed about {target} that you weren't prepared for?", target: "other" },
  { id: "CPLN028", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's something {target} has done or said tonight that has genuinely gotten your attention?", target: "other" },
  { id: "CPLN029", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's the most embarrassing thing you've ever done to try to attract someone — any story qualifies?", target: "other" },
  { id: "CPLN030", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's something about {target} that surprised you in a good way since you met?", target: "other" },

  // Interaction role
  { id: "CPLN031", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What would {target}'s Tinder profile say if you wrote it right now based on what you know so far? Be honest, be a little mean.", target: "other" },
  { id: "CPLN032", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "If {target} had to seduce someone using only movie quotes, which movie would they grab and how badly would it go?", target: "other" },
  { id: "CPLN033", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's the most embarrassing attempt at being flirtatious you've made that completely bombed?", target: "other" },
  { id: "CPLN034", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's something {target} does tonight that gets your attention without them realizing it?", target: "other" },
  { id: "CPLN035", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's your worst first date story — not this one — and what specifically made it that bad?", target: "other" },

  // Build role
  { id: "CPLN036", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What moment tonight made you think 'okay, I wasn't expecting that'?", target: "other" },
  { id: "CPLN037", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's a question you've been wanting to ask {target} since you met but haven't found the moment for?", target: "other" },
  { id: "CPLN038", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "If {target} was a cocktail based on what you know so far, what would be in it and what's it called?", target: "other" },
  { id: "CPLN039", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's a completely irrational thing about {target} that you find oddly interesting?", target: "other" },
  { id: "CPLN040", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's your most embarrassing romantic fail — the specific one you still cringe about?", target: "other" },
  { id: "CPLN041", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's the most ridiculous thing someone has done to get your attention that you've never admitted actually worked?", target: "other" },

  // Action role
  { id: "CPLN042", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's something {target} has said or done tonight that you'll remember?", target: "other" },
  { id: "CPLN043", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's the most honest thing you've said tonight — and is there something more honest you're still holding back?", target: "other" },
  { id: "CPLN044", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's something about tonight you didn't expect to enjoy but did?", target: "other" },
  { id: "CPLN045", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What's a specific thing about {target} that has gotten your attention — that you haven't mentioned yet?", target: "other" },

  // Peak role
  { id: "CPLN046", chapter: "playful", role: "peak", type: "directed", promptType: "truth", intensity: 3, coupleType: "new", text: "What's something you want {target} to know about you that hasn't come up yet?", target: "other" },
  { id: "CPLN047", chapter: "playful", role: "peak", type: "directed", promptType: "truth", intensity: 3, coupleType: "new", text: "What's one thing about tonight that surprised you — about {target}, about yourself, or both?", target: "other" },

  // Transition role
  { id: "CPLN048", chapter: "playful", role: "transition", type: "directed", promptType: "truth", intensity: 2, coupleType: "new", text: "What do you want to explore with {target} that you didn't know you wanted until this game?", target: "other" }
];
