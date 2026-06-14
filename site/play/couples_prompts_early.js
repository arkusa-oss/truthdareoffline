// Lyra's Orb — Couple Edition
// Couples prompts: personal + playful stages
// Philosophy: self-discovery, humor, new ways to connect

var COUPLES_PROMPTS_EARLY = [
  // ============================================================================
  // STAGE 1: PERSONAL (Merengue energy)
  // Warm, funny, surprising. The best conversation after two drinks.
  // ============================================================================

  // SETUP ROLE (Personal stage) — 12 prompts
  { id: "CPL0001", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, text: "What version of yourself exists only when {target} isn't around? Describe that person.", target: "other" },
  { id: "CPL0002", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, text: "What's a fear you carry that has nothing to do with {target} but quietly shapes how you show up in this relationship?", target: "other" },
  { id: "CPL0003", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 2, text: "What part of how you love {target} have you never said out loud — not because it's bad, but because you don't have the words yet?", target: "other" },
  { id: "CPL0004", chapter: "personal", role: "setup", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, narrate {target}'s morning routine like a David Attenborough nature documentary. Full commitment.", target: "other" },
  { id: "CPL0005", chapter: "personal", role: "setup", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, do your best impression of {target} ordering food at a restaurant. Now do their 'I'm pretending I'm not mad' voice.", target: "other" },
  { id: "CPL0006", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, text: "What's something you've stopped doing since being with {target} — not because they asked, but because you chose to?", target: "other" },
  { id: "CPL0007", chapter: "personal", role: "setup", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, show {target} exactly how they walk when they think no one is watching. Stay in character for 20 seconds.", target: "other" },
  { id: "CPL0008", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 2, text: "If {target} could read your mind for one hour of any day last week, which hour would make you the most nervous?", target: "other" },
  { id: "CPL0009", chapter: "personal", role: "setup", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, dance like you're at a merengue club but you're pretending to be deeply unimpressed. Make {target} laugh.", target: "other" },
  { id: "CPL0010", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, text: "What's a compliment {target} has given you that you secretly didn't believe?", target: "other" },
  { id: "CPL0011", chapter: "personal", role: "setup", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, mimic {target}'s laugh perfectly. Do it three times in a row, each with a different emotion.", target: "other" },
  { id: "CPL0012", chapter: "personal", role: "setup", type: "directed", promptType: "truth", intensity: 1, text: "What's a side of yourself you think {target} hasn't fully seen yet?", target: "other" },

  // INTERACTION ROLE (Personal stage) — 18 prompts
  { id: "CPL0013", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 2, text: "What contradicts itself inside you? A belief you have and a way you act that don't match.", target: "other" },
  { id: "CPL0014", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, text: "What do you do when you think no one is watching that would surprise {target}?", target: "other" },
  { id: "CPL0015", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, recreate {target}'s most embarrassing dance move from their memory. They have to narrate how close you got.", target: "other" },
  { id: "CPL0016", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 2, text: "What insecurity about yourself have you never told {target} — and why?", target: "other" },
  { id: "CPL0017", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, talk like {target} for 30 seconds, but you're gossiping about {target} to someone else. Go.", target: "other" },
  { id: "CPL0018", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, text: "What's something you want to try that you've never mentioned because you weren't sure how {target} would react?", target: "other" },
  { id: "CPL0019", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, move your hips like a merengue dancer and make {target} try to match your rhythm. Laugh at how wrong they get it.", target: "other" },
  { id: "CPL0020", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, text: "What would {target} be shocked to learn you fantasize about?", target: "other" },
  { id: "CPL0021", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, do your worst {target} impression. They tell you what you got wrong. Do it again — better this time.", target: "other" },
  { id: "CPL0022", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 2, text: "What part of yourself do you hide from most people, but {target} occasionally sees?", target: "other" },
  { id: "CPL0023", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, sing the first verse of any song, but make it about {target}'s worst habit. Merengue style if you can.", target: "other" },
  { id: "CPL0024", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, text: "What's a dream you have that you've never fully explained to {target}?", target: "other" },
  { id: "CPL0025", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, give {target} a five-second coaching session on how to dance better. Be brutally honest.", target: "other" },
  { id: "CPL0026", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, text: "What's something you regret not asking {target} when you first met?", target: "other" },
  { id: "CPL0027", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, do your impression of {target} being disappointed. Add hand gestures.", target: "other" },
  { id: "CPL0028", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 2, text: "What's a belief about love or relationships that you've secretly questioned?", target: "other" },
  { id: "CPL0029", chapter: "personal", role: "interaction", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, dance with {target} for 10 seconds but move like you're both 80 years old. Hold the energy.", target: "other" },
  { id: "CPL0030", chapter: "personal", role: "interaction", type: "directed", promptType: "truth", intensity: 1, text: "What does {target} think about you that actually isn't true?", target: "other" },

  // BUILD ROLE (Personal stage) — 20 prompts
  { id: "CPL0031", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What's something you're genuinely proud of that you don't talk about because you don't want to seem arrogant?", target: "other" },
  { id: "CPL0032", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, pretend you're a merengue instructor teaching {target} how to move. Be overly enthusiastic and slightly inappropriate with your feedback.", target: "other" },
  { id: "CPL0033", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What's a moment when you felt like you were faking it — in your relationship, your life, or your sense of self?", target: "other" },
  { id: "CPL0034", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, do a monologue as {target} from the perspective of {target}'s pet, car, or favorite object. Go for 20 seconds.", target: "other" },
  { id: "CPL0035", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, text: "What small thing about {target} makes you happy but you've never pointed out?", target: "other" },
  { id: "CPL0036", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, speak like {target} for 30 seconds but you're explaining why merengue is better than every other dance.", target: "other" },
  { id: "CPL0037", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What would change about you if you knew {target} would love you exactly the same no matter what?", target: "other" },
  { id: "CPL0038", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, do {target}'s walk from three different eras: age 8, age 18, age 80. Make it comedic.", target: "other" },
  { id: "CPL0039", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, text: "What's something you find attractive about {target} that they're insecure about?", target: "other" },
  { id: "CPL0040", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, show {target} your signature dance move. It can be terrible — in fact, the worse the better. {target} rates it 1-10.", target: "other" },
  { id: "CPL0041", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What do you think {target} secretly thinks is wrong with you?", target: "other" },
  { id: "CPL0042", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, give a fake weather report but it's all about {target}'s mood patterns. Be meteorologist serious.", target: "other" },
  { id: "CPL0043", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What's a version of yourself from your past that {target} has never met that you miss sometimes?", target: "other" },
  { id: "CPL0044", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, do a dramatic reading of your grocery list like you're performing at a merengue concert. Full emotion.", target: "other" },
  { id: "CPL0045", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, text: "What's something you wish {target} would ask you?", target: "other" },
  { id: "CPL0046", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, do {target}'s thinking face for 15 seconds. Get all the micro-expressions.", target: "other" },
  { id: "CPL0047", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What's a part of growing up that you miss more than you let on?", target: "other" },
  { id: "CPL0048", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, dance like you're {target} trying to impress someone at a club. Then dance like {target} trying to escape from a club.", target: "other" },
  { id: "CPL0049", chapter: "personal", role: "build", type: "directed", promptType: "truth", intensity: 1, text: "What moment made you realize you could actually trust {target}?", target: "other" },
  { id: "CPL0050", chapter: "personal", role: "build", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, impersonate {target} having a breakdown about something completely trivial. Make it hilarious.", target: "other" },

  // ACTION ROLE (Personal stage) — 18 prompts
  { id: "CPL0051", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 2, text: "What's a feeling you have that you think makes you look weak?", target: "other" },
  { id: "CPL0052", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, teach {target} a dance move but do it like you're overly impressed with your own skills. Be arrogant.", target: "other" },
  { id: "CPL0053", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 2, text: "What do you think about when {target} thinks you're paying attention but you're not?", target: "other" },
  { id: "CPL0054", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, be {target} receiving terrible life advice from a merengue dancer. React to everything.", target: "other" },
  { id: "CPL0055", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, text: "What's a talent or skill you have that you downplay around {target}?", target: "other" },
  { id: "CPL0056", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, do a phone call as {target} talking to your mom. Hit all the good awkward moments.", target: "other" },
  { id: "CPL0057", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 2, text: "What scares you about the future that has nothing to do with {target}?", target: "other" },
  { id: "CPL0058", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, move your hips in a perfect merengue rhythm while making direct eye contact with {target}. Hold it for 15 seconds.", target: "other" },
  { id: "CPL0059", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, text: "What's something you do for {target} that you wish they understood how much effort it takes?", target: "other" },
  { id: "CPL0060", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, do a five-second commentary on {target}'s dating potential if {target} was single tomorrow. Be hilariously mean.", target: "other" },
  { id: "CPL0061", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 2, text: "What's something you want to change about yourself that's completely separate from being with {target}?", target: "other" },
  { id: "CPL0062", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, recreate {target}'s entrance to a room. Really commit to the walk, the face, the energy.", target: "other" },
  { id: "CPL0063", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, text: "What's a conversation you wish you'd had with {target} that you're worried it's too late for?", target: "other" },
  { id: "CPL0064", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, give {target} a merengue rhythm lesson while narrating their natural talent incorrectly.", target: "other" },
  { id: "CPL0065", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 2, text: "What's the last time you felt genuinely confident, and what would it take to feel like that again?", target: "other" },
  { id: "CPL0066", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, be {target} at a job interview but they keep getting distracted by something ridiculous. Go for 20 seconds.", target: "other" },
  { id: "CPL0067", chapter: "personal", role: "action", type: "directed", promptType: "truth", intensity: 1, text: "What would you want to tell your younger self about who {target} is?", target: "other" },
  { id: "CPL0068", chapter: "personal", role: "action", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, move like {target} in five different scenarios: at a funeral, at a party, at the grocery store, at a doctor's appointment, at the gym.", target: "other" },

  // PEAK ROLE (Personal stage) — 7 prompts
  { id: "CPL0069", chapter: "personal", role: "peak", type: "directed", promptType: "truth", intensity: 3, text: "What's something you believe about yourself that you're pretty sure isn't actually true?", target: "other" },
  { id: "CPL0070", chapter: "personal", role: "peak", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, dance a full merengue routine but with {target}'s personality encoded into every move. Make it unmistakably them.", target: "other" },
  { id: "CPL0071", chapter: "personal", role: "peak", type: "directed", promptType: "truth", intensity: 3, text: "What part of you are you still becoming, and are you scared {target} won't like who you become?", target: "other" },
  { id: "CPL0072", chapter: "personal", role: "peak", type: "directed", promptType: "dare", intensity: 3, text: "{actor}, do {target}'s full-body impression: the walk, the talk, the mannerisms, the sense of humor. Go for 45 seconds. Everything.", target: "other" },
  { id: "CPL0073", chapter: "personal", role: "peak", type: "directed", promptType: "truth", intensity: 3, text: "What's the most honest thing you haven't said to {target} because you're not sure they can handle it?", target: "other" },
  { id: "CPL0074", chapter: "personal", role: "peak", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, give {target} a five-minute coaching session on a merengue dance move. Be a tough but fair instructor.", target: "other" },
  { id: "CPL0075", chapter: "personal", role: "peak", type: "directed", promptType: "truth", intensity: 3, text: "What would you want {target} to know about you that you're too scared to tell them?", target: "other" },

  // TRANSITION ROLE (Personal stage) — 5 prompts
  { id: "CPL0076", chapter: "personal", role: "transition", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, do a slow-motion merengue dance with {target}. Make it funny, make it smooth, make it transition into something else.", target: "other" },
  { id: "CPL0077", chapter: "personal", role: "transition", type: "directed", promptType: "truth", intensity: 2, text: "What's something you've learned about yourself through being with {target}?", target: "other" },
  { id: "CPL0078", chapter: "personal", role: "transition", type: "directed", promptType: "dare", intensity: 1, text: "{actor}, teach {target} a completely made-up dance move and give it a ridiculous name. Both of you have to perform it together.", target: "other" },
  { id: "CPL0079", chapter: "personal", role: "transition", type: "directed", promptType: "truth", intensity: 2, text: "What do you want to discover about yourself in the next year?", target: "other" },
  { id: "CPL0080", chapter: "personal", role: "transition", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, dance with {target} in a way you've never danced together. Anything but merengue. Show them something new.", target: "other" },

  // ============================================================================
  // STAGE 2: PLAYFUL (Bachata energy)
  // Flirty curiosity. The humor gets edgier, the physicality starts.
  // ============================================================================

  // SETUP ROLE (Playful stage) — 12 prompts
  { id: "CPL0081", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, text: "What have you wanted to try with {target} but never asked because you weren't sure how to bring it up?", target: "other" },
  { id: "CPL0082", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, text: "What's something about your body or sexuality that you wish {target} understood better?", target: "other" },
  { id: "CPL0083", chapter: "playful", role: "setup", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, hold {target}'s hand and trace a letter on their palm very slowly. They have to guess what it is.", target: "other" },
  { id: "CPL0084", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, text: "What's a scenario you've privately imagined with {target} that you've never mentioned?", target: "other" },
  { id: "CPL0085", chapter: "playful", role: "setup", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, whisper something into {target}'s ear that makes them blush. Do it slowly.", target: "other" },
  { id: "CPL0086", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, text: "What part of {target} do you find unexpectedly attractive?", target: "other" },
  { id: "CPL0087", chapter: "playful", role: "setup", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, feed {target} something slowly and make eye contact. Don't break it.", target: "other" },
  { id: "CPL0088", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 3, text: "What's a fantasy you have that involves {target} but you've kept completely to yourself?", target: "other" },
  { id: "CPL0089", chapter: "playful", role: "setup", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, dance a slow bachata with {target}. Keep it close, keep it connected, even if you're laughing.", target: "other" },
  { id: "CPL0090", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, text: "When was the last time you felt genuinely sexually confident around {target}?", target: "other" },
  { id: "CPL0091", chapter: "playful", role: "setup", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, read something seductive to {target}. Use a voice that makes them uncomfortable in the best way.", target: "other" },
  { id: "CPL0092", chapter: "playful", role: "setup", type: "directed", promptType: "truth", intensity: 2, text: "What's something {target} does that's completely unsexy but somehow turns you on?", target: "other" },

  // INTERACTION ROLE (Playful stage) — 18 prompts
  { id: "CPL0093", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, text: "What's something you've wanted {target} to do or say in an intimate moment that you haven't asked for?", target: "other" },
  { id: "CPL0094", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, run your fingers down {target}'s arm very slowly. Focus on their reaction.", target: "other" },
  { id: "CPL0095", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, text: "What do you think {target} secretly wants you to do that you haven't figured out yet?", target: "other" },
  { id: "CPL0096", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 3, text: "{actor}, slow-dance to the music with {target} but narrate it like a documentary about desire. Keep dancing.", target: "other" },
  { id: "CPL0097", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, text: "What physical touch from {target} makes you feel most alive?", target: "other" },
  { id: "CPL0098", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, let {target} touch your neck and jaw for 10 seconds. Just feel it. No laughing (good luck).", target: "other" },
  { id: "CPL0099", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, text: "What's a way {target} could seduce you that they've never tried?", target: "other" },
  { id: "CPL0100", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, make {target} guess what you're thinking about while looking at them. Use only your eyes.", target: "other" },
  { id: "CPL0101", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 3, text: "What's the dirtiest thing you've thought about related to {target} in the past month?", target: "other" },
  { id: "CPL0102", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, whisper your favorite thing about {target}'s body into their ear. Slow. Intentional.", target: "other" },
  { id: "CPL0103", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, text: "What's something you wish {target} would be more confident about sexually?", target: "other" },
  { id: "CPL0104", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 3, text: "{actor}, give {target} a neck massage but do it like you're doing something forbidden. Make it charged.", target: "other" },
  { id: "CPL0105", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, text: "What's a sexual dynamic you've never explored but kind of want to?", target: "other" },
  { id: "CPL0106", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, feed {target} and make it purposely sensual. Make them feel seen.", target: "other" },
  { id: "CPL0107", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, text: "What's something about {target}'s sexuality that surprises you or intrigues you?", target: "other" },
  { id: "CPL0108", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, stare at {target} with intention for 15 seconds. Don't look away first.", target: "other" },
  { id: "CPL0109", chapter: "playful", role: "interaction", type: "directed", promptType: "truth", intensity: 2, text: "When was the last time you felt {target} really see you sexually?", target: "other" },
  { id: "CPL0110", chapter: "playful", role: "interaction", type: "directed", promptType: "dare", intensity: 3, text: "{actor}, dance to the music with {target} while whispering things that make them blush. Don't stop dancing.", target: "other" },

  // BUILD ROLE (Playful stage) — 20 prompts
  { id: "CPL0111", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What's a compliment about {target}'s body that you've thought but never said?", target: "other" },
  { id: "CPL0112", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, trace {target}'s jawline with your finger very slowly. Hold their gaze.", target: "other" },
  { id: "CPL0113", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 3, text: "What's something you want to ask {target} sexually but you're worried they'll judge you for?", target: "other" },
  { id: "CPL0114", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, palm-read {target}'s hand but describe your sexual chemistry instead of their future.", target: "other" },
  { id: "CPL0115", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What's the sexiest thing {target} does without realizing it?", target: "other" },
  { id: "CPL0116", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 3, text: "{actor}, dance a slow bachata with {target} while touching them in ways you've never touched them before. Keep it playful.", target: "other" },
  { id: "CPL0117", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What's a position or scenario you've imagined but never suggested?", target: "other" },
  { id: "CPL0118", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, paint {target}'s lips with your thumb very slowly. Make it intimate.", target: "other" },
  { id: "CPL0119", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What part of {target} do you want to touch more but feel shy about?", target: "other" },
  { id: "CPL0120", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, hold {target}'s face in your hands and describe one thing you love about how they look at you.", target: "other" },
  { id: "CPL0121", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 3, text: "What's a roleplay scenario that secretly appeals to you?", target: "other" },
  { id: "CPL0122", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, do a slow bachata grind with {target}. Make it less funny, more intentional.", target: "other" },
  { id: "CPL0123", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What's something you do alone that you've never shared with {target}?", target: "other" },
  { id: "CPL0124", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, whisper a confession into {target}'s neck. Something you've wanted to say but felt shy about.", target: "other" },
  { id: "CPL0125", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What's the most daring thing you'd want {target} to do to you?", target: "other" },
  { id: "CPL0126", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 3, text: "{actor}, give {target} a full-body description of what you find attractive about them. Take your time.", target: "other" },
  { id: "CPL0127", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 2, text: "What's something you wish {target} would be bolder about?", target: "other" },
  { id: "CPL0128", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, let {target} touch your hair and face however they want for 20 seconds. Just receive it.", target: "other" },
  { id: "CPL0129", chapter: "playful", role: "build", type: "directed", promptType: "truth", intensity: 3, text: "What's a fantasy that involves {target} that would make you blush if they knew?", target: "other" },
  { id: "CPL0130", chapter: "playful", role: "build", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, dance to the music with {target} and let your hips do the talking. No hands if you're confident.", target: "other" },

  // ACTION ROLE (Playful stage) — 18 prompts
  { id: "CPL0131", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, text: "What's the most intimate thing {target} has asked of you that you actually loved?", target: "other" },
  { id: "CPL0132", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 3, text: "{actor}, give {target} a sensual massage that goes from their shoulders to wherever feels right. Keep it playful.", target: "other" },
  { id: "CPL0133", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, text: "What's something {target} does that makes you lose your composure?", target: "other" },
  { id: "CPL0134", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, lock eyes with {target} while dancing a bachata close enough to feel the heat between you.", target: "other" },
  { id: "CPL0135", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 3, text: "What's something sexually that you've been afraid to admit you want?", target: "other" },
  { id: "CPL0136", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, let {target} put a blindfold on you and describe what you're about to feel before they touch you.", target: "other" },
  { id: "CPL0137", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, text: "What's the moment with {target} when you felt most wanted?", target: "other" },
  { id: "CPL0138", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 3, text: "{actor}, taste {target} (lips, collarbone, whatever they allow). Slow. Intentional.", target: "other" },
  { id: "CPL0139", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, text: "What's something you've kept secret about your sexual preferences?", target: "other" },
  { id: "CPL0140", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, lead {target} in a bachata where you're the one taking control. Let your body language show intention.", target: "other" },
  { id: "CPL0141", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, text: "What's a desire you have that you worry might be too much for {target}?", target: "other" },
  { id: "CPL0142", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, whisper the most flirtatious thing you can think of into {target}'s ear. Make them feel wanted.", target: "other" },
  { id: "CPL0143", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 3, text: "What's something you've thought about doing with {target} but thought you'd never actually do it?", target: "other" },
  { id: "CPL0144", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 3, text: "{actor}, give {target} a full sensual experience: music, touch, words. Two minutes. Go.", target: "other" },
  { id: "CPL0145", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, text: "What's the boldest thing you wish {target} would do to you?", target: "other" },
  { id: "CPL0146", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, dance to the music with {target} and let them feel how attracted you are. Don't hide it.", target: "other" },
  { id: "CPL0147", chapter: "playful", role: "action", type: "directed", promptType: "truth", intensity: 2, text: "What's something about {target}'s sexuality that you find irresistible?", target: "other" },
  { id: "CPL0148", chapter: "playful", role: "action", type: "directed", promptType: "dare", intensity: 3, text: "{actor}, give {target} a five-minute experience where you touch them in ways that respect boundaries but express desire.", target: "other" },

  // PEAK ROLE (Playful stage) — 7 prompts
  { id: "CPL0149", chapter: "playful", role: "peak", type: "directed", promptType: "truth", intensity: 4, text: "What's the most vulnerable sexual truth about yourself that you've never told {target}?", target: "other" },
  { id: "CPL0150", chapter: "playful", role: "peak", type: "directed", promptType: "dare", intensity: 4, text: "{actor}, give {target} a full experience: music, touch, words, intensity. Five minutes. Everything you've been holding back.", target: "other" },
  { id: "CPL0151", chapter: "playful", role: "peak", type: "directed", promptType: "truth", intensity: 3, text: "What's something you want {target} to do to you that you're almost too scared to ask for?", target: "other" },
  { id: "CPL0152", chapter: "playful", role: "peak", type: "directed", promptType: "dare", intensity: 4, text: "{actor}, dance to the music with {target} where you're completely uninhibited. No holding back. No laughing it off. Real connection.", target: "other" },
  { id: "CPL0153", chapter: "playful", role: "peak", type: "directed", promptType: "truth", intensity: 4, text: "What's the deepest desire you have related to {target} that you've never voiced?", target: "other" },
  { id: "CPL0154", chapter: "playful", role: "peak", type: "directed", promptType: "dare", intensity: 4, text: "{actor}, show {target} a side of yourself sexually that you normally hide. Let them see the real version of your desire.", target: "other" },
  { id: "CPL0155", chapter: "playful", role: "peak", type: "directed", promptType: "truth", intensity: 4, text: "What's the thing you want {target} to understand about you sexually that you've never had the courage to say?", target: "other" },

  // TRANSITION ROLE (Playful stage) — 5 prompts
  { id: "CPL0156", chapter: "playful", role: "transition", type: "directed", promptType: "dare", intensity: 3, text: "{actor}, hold {target} close and slow-dance to the music. Let it be tender. Let it be about connection.", target: "other" },
  { id: "CPL0157", chapter: "playful", role: "transition", type: "directed", promptType: "truth", intensity: 2, text: "What's something you want to explore together that you didn't know you wanted before this game?", target: "other" },
  { id: "CPL0158", chapter: "playful", role: "transition", type: "directed", promptType: "dare", intensity: 2, text: "{actor}, whisper something you want to do with {target} later. Make it a promise.", target: "other" },
  { id: "CPL0159", chapter: "playful", role: "transition", type: "directed", promptType: "truth", intensity: 2, text: "What did you learn about {target} in this game that surprised you?", target: "other" },
  { id: "CPL0160", chapter: "playful", role: "transition", type: "directed", promptType: "dare", intensity: 3, text: "{actor}, kiss {target} in a way that's both playful and means something. A transition kiss.", target: "other" }
];
