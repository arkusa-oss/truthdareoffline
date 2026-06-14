// Lyra's Orb — Couple Edition
// 630 curated couples prompts across 7 stages
// Philosophy: self-discovery, guided intimacy, concrete physical experiences

const CSV_COUPLES_PROMPTS = [
  {
    "id": "CPL0001",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "{actor} — not the version {target} sees. The one who exists in the silence before {target} walks in. Describe that person. Lyra is listening.",
    "target": "other"
  },
  {
    "id": "CPL0002",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "There is a fear that followed you into this love — born long before {target}, yet it sleeps in the same bed. Name it.",
    "target": "other"
  },
  {
    "id": "CPL0003",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "Something about loving {target} has lived only in your chest, never on your tongue. It has weight. It has shape. Say it now.",
    "target": "other"
  },
  {
    "id": "CPL0004",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, narrate {target}'s morning routine as if Sir David Attenborough is crouched in the corner, breathless with scientific awe. Every groggy shuffle. Every confused stare at the coffee maker. Go.",
    "target": "other"
  },
  {
    "id": "CPL0005",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, you are {target} at a restaurant — scanning the menu with unnecessary gravity, ordering something predictable, then changing it. Now give me the 'I'm not mad' voice. Lyra knows you have it down cold.",
    "target": "other"
  },
  {
    "id": "CPL0006",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "Something was yours before {target} — a habit, a plan, a quiet version of yourself. You set it down willingly. What was it?",
    "target": "other"
  },
  {
    "id": "CPL0007",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, walk like {target} does when the room is empty and no one is watching. That private, unguarded stride. Hold it for twenty seconds. {target} will tell you how close you got.",
    "target": "other"
  },
  {
    "id": "CPL0008",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "Last week, one hour passed through your mind that you would lock from {target} forever if you could. Which hour? Lyra already suspects.",
    "target": "other"
  },
  {
    "id": "CPL0009",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, dance merengue as though you have been personally wronged by the entire concept of merengue. Deeply unimpressed. Barely participating. Make {target} break first.",
    "target": "other"
  },
  {
    "id": "CPL0010",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "{target} said something about you — something kind, something they meant — and you smiled and nodded and privately thought: no. Which compliment was it?",
    "target": "other"
  },
  {
    "id": "CPL0011",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, three laughs. First: {target} genuinely delighted. Second: {target} plotting something. Third: {target} trying very hard not to cry. Perform all three. {target} scores the accuracy.",
    "target": "other"
  },
  {
    "id": "CPL0012",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "{target} thinks {actor} knows you. But there is a room inside you {target} has never been shown the door to. What lives there?",
    "target": "other"
  },
  {
    "id": "CPL0013",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "There is something you believe — something you would defend in an argument — and something you do that makes a liar of it. Name both. Out loud. To {target}.",
    "target": "other"
  },
  {
    "id": "CPL0014",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "Alone, you do something {target} has never witnessed. Not shameful, perhaps — just yours. Something that would make {target} pause. What is it?",
    "target": "other"
  },
  {
    "id": "CPL0015",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, recreate {target}'s most embarrassing dance move. Every inch of it. {target} watches, judges, and scores you on a scale of ruthless accuracy.",
    "target": "other"
  },
  {
    "id": "CPL0016",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "There is an insecurity you have kept folded small enough that {target} has never seen its full shape. Name it. Then tell Lyra why you hid it.",
    "target": "other"
  },
  {
    "id": "CPL0017",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, you are {target}. Thirty seconds. You are gossiping — about yourself — in {target}'s exact voice, with {target}'s exact opinions. Go. {target} may not interrupt.",
    "target": "other"
  },
  {
    "id": "CPL0018",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "There is something you have wanted to try — a place, an experience, a version of your life — and you have never said it clearly to {target}. You weren't sure how {target} would receive it. Say it now.",
    "target": "other"
  },
  {
    "id": "CPL0019",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, roll your hips — real merengue weight, commit to it — and pull {target} in to match you. When {target} fails, which {target} will, laugh without mercy. Then try again.",
    "target": "other"
  },
  {
    "id": "CPL0020",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "There is a fantasy — specific, textured, probably not the first thing you'd admit — that would stop {target} mid-sentence if you described it. Describe it.",
    "target": "other"
  },
  {
    "id": "CPL0021",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, do your worst impression of {target}. Fully commit. {target} corrects you — posture, voice, expression — and you do it again. This time, get it right.",
    "target": "other"
  },
  {
    "id": "CPL0022",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "There is something you keep from the world — a softness, a wound, a strangeness — that {target} has glimpsed, if only once. What is it? Say it like {target} already knows.",
    "target": "other"
  },
  {
    "id": "CPL0023",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, compose a verse — sung, not spoken — about {target}'s worst habit. Merengue rhythm if you dare. {target} may not defend themselves until the song is done.",
    "target": "other"
  },
  {
    "id": "CPL0024",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "There is a dream you carry — a real one, not the polished version — that you have never fully spoken to {target}. It still has rough edges. Tell it that way.",
    "target": "other"
  },
  {
    "id": "CPL0025",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, you have five seconds to teach {target} one dance move. Do not be kind. Correct every mistake with the pitiless authority of someone who has suffered through {target}'s dancing long enough.",
    "target": "other"
  },
  {
    "id": "CPL0026",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "The night you met {target}, there was a question forming in your throat that you swallowed. What was it? What were you afraid the answer might be?",
    "target": "other"
  },
  {
    "id": "CPL0027",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, perform {target} disappointed. Not angry — disappointed. That specific face, that specific quiet. Add the hands. {target} confirms whether you've captured the full devastation.",
    "target": "other"
  },
  {
    "id": "CPL0028",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "You arrived at this love holding a belief about what love was supposed to be. Some part of that belief has cracked. Which part?",
    "target": "other"
  },
  {
    "id": "CPL0029",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, take {target}'s hand. Dance slowly. You are both eighty years old, your bones remember what your feet have forgotten, and you are still here. Ten seconds. Mean it.",
    "target": "other"
  },
  {
    "id": "CPL0030",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "{target} holds a picture of you that is not quite accurate. A version {actor} let {target} keep. What does that picture get wrong?",
    "target": "other"
  },
  {
    "id": "CPL0031",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "There is something {actor} has done — built, survived, become — that you are genuinely proud of, and you never say so. You are afraid of what it sounds like. Say it to {target} now.",
    "target": "other"
  },
  {
    "id": "CPL0032",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, you are an overenthusiastic merengue instructor and {target} is your most challenging student. Place their hands, correct their hips, get slightly too invested in the quality of this lesson. {target} endures.",
    "target": "other"
  },
  {
    "id": "CPL0033",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "There was a moment — recent enough to sting — when you were performing. Smiling at the right times, saying the right things, and feeling nothing behind it. Where were you? Who were you with?",
    "target": "other"
  },
  {
    "id": "CPL0034",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, you are {target}'s most prized possession — pet, car, or cherished object — and you have opinions. Twenty seconds. Speak as something that knows {target} better than {target} thinks.",
    "target": "other"
  },
  {
    "id": "CPL0035",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "{target} does something small — a gesture, a sound, a habit they are probably unaware of — and every time, something in {actor} quietly lights up. {actor} has never mentioned it. Mention it now.",
    "target": "other"
  },
  {
    "id": "CPL0036",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, inhabit {target} arguing — with full conviction, full body — that merengue is the undisputed pinnacle of human dance culture. Thirty seconds. {target} listens to their own argument.",
    "target": "other"
  },
  {
    "id": "CPL0037",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "If {target}'s love were unconditional — not contingent on a single thing you do or say — what would {actor} change? About yourself. About the way you move through this life.",
    "target": "other"
  },
  {
    "id": "CPL0038",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, three ages: {target} at eight, all elbows and confidence. At eighteen, all want and no map. At eighty, moving carefully, having outlasted something. Walk each one. Make {target} recognize themselves.",
    "target": "other"
  },
  {
    "id": "CPL0039",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "There is something {actor} finds magnetic about {target} — a specific thing {target} carries like a flaw. {target} flinches when it's noticed. {actor} is drawn straight to it. Name it.",
    "target": "other"
  },
  {
    "id": "CPL0040",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, the floor is yours. Your signature move. Commit fully. Worse execution is not a problem — Lyra rewards commitment, not grace. {target} scores it one to ten with no obligation to be generous.",
    "target": "other"
  },
  {
    "id": "CPL0041",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "Somewhere behind {target}'s eyes lives a quiet verdict about you — something {actor} suspects {target} has clocked and never said. What is it? Say what you think {target} thinks.",
    "target": "other"
  },
  {
    "id": "CPL0042",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, deliver tonight's weather report on {target}'s emotional climate. Current conditions, pressure systems, the chance of a sudden cold front. Keep it professional. Keep a straight face.",
    "target": "other"
  },
  {
    "id": "CPL0043",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "Before {target}, there was a version of {actor} — wilder, sadder, more reckless, more free. {target} never got to meet that person. Describe them. Do you miss them?",
    "target": "other"
  },
  {
    "id": "CPL0044",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, your grocery list is a ballad. Sing it — merengue tempo, full chest, every item infused with longing. Milk. Eggs. Whatever is on that list. Give it everything you have.",
    "target": "other"
  },
  {
    "id": "CPL0045",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "{target} has never asked {actor} the right question — the one that would open something real. What is it? Ask {target} to ask it now, and then answer it.",
    "target": "other"
  },
  {
    "id": "CPL0046",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, wear {target}'s thinking face. Every micro-expression: the slight frown, the lip press, the moment just before the conclusion lands. Hold it fifteen seconds. {target} watches.",
    "target": "other"
  },
  {
    "id": "CPL0047",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "There is something about being younger that {actor} carries like a quiet ache — a lightness, a particular kind of recklessness, a feeling of open time. You don't say it often. Say it to {target}.",
    "target": "other"
  },
  {
    "id": "CPL0048",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, two scenes: {target} arriving at a crowded party — scanning the room, deciding to be magnetic. Then {target} fifteen minutes later, having fully reconsidered, locating the exit. Show both.",
    "target": "other"
  },
  {
    "id": "CPL0049",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "At some point, {target} did something — small or enormous — and something in {actor} shifted. The wall came down a fraction. That was the moment. Tell {target} which one it was.",
    "target": "other"
  },
  {
    "id": "CPL0050",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, {target} is in crisis. The cause is completely trivial — a parking spot, a wrong order, a missing sock. Play it at full scale. Collapse, despair, the works. Make {target} laugh at themselves.",
    "target": "other"
  },
  {
    "id": "CPL0051",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "{actor} — there is a feeling you bury the moment it surfaces. Name it. The one that makes you feel exposed, small, too human. Lyra already sees it in your face.",
    "target": "other"
  },
  {
    "id": "CPL0052",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, take {target}'s hands and teach {target} a dance move. Do not be humble about it. Announce your genius. Narrate your own brilliance mid-step. The world deserves to know.",
    "target": "other"
  },
  {
    "id": "CPL0053",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor} — {target} is talking. You're nodding. But your mind is somewhere else entirely. Where does it go? Be specific. Lyra has noticed the drift in your eyes.",
    "target": "other"
  },
  {
    "id": "CPL0054",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, you are {target} — sitting across from a merengue dancer who is handing out life advice with complete confidence. Receive it. React. Let the absurdity hit your body.",
    "target": "other"
  },
  {
    "id": "CPL0055",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "{actor} — you have something. A skill, a gift, a strange little talent you don't perform when {target} is watching. Name it. And confess why you keep it hidden.",
    "target": "other"
  },
  {
    "id": "CPL0056",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, pick up an invisible phone. You are {target}. Their voice, their cadence, their specific brand of awkward. Now call {target}'s mom. Nail the silence. Nail the over-explaining.",
    "target": "other"
  },
  {
    "id": "CPL0057",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "{actor} — there is a fear about the future that has nothing to do with {target}. It's yours alone. Lyra can feel it. Say it out loud, here, now, where it can't be unsaid.",
    "target": "other"
  },
  {
    "id": "CPL0058",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, roll your hips. Slow, deliberate merengue — and don't look away from {target}. Hold their gaze for fifteen full seconds. Lyra is counting. So is {target}.",
    "target": "other"
  },
  {
    "id": "CPL0059",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "{actor} — you do something for {target} that costs you more than {target} knows. The effort behind it is invisible. Make it visible now. Describe it without making it small.",
    "target": "other"
  },
  {
    "id": "CPL0060",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, {target} is suddenly single tomorrow. Five seconds — give {target} a number. One to ten. Dating market odds. No softening it. {target} can react after.",
    "target": "other"
  },
  {
    "id": "CPL0061",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor} — not about the relationship. Not about {target}. About you, alone. What would you change about yourself if no one else's comfort were a factor?",
    "target": "other"
  },
  {
    "id": "CPL0062",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, stand up. Walk into this room the way {target} walks into a room. The posture, the expression, the energy they carry in with them. Make {target} recognize themselves.",
    "target": "other"
  },
  {
    "id": "CPL0063",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "{actor} — there is a question you've meant to ask {target} for weeks. Maybe months. It keeps slipping away. Surface it now. Ask it out loud for the first time.",
    "target": "other"
  },
  {
    "id": "CPL0064",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, {target} is your student. Merengue. You are the expert. Narrate {target}'s talent — but get it completely wrong. Call every stumble a breakthrough. Praise the worst moments.",
    "target": "other"
  },
  {
    "id": "CPL0065",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor} — name the last moment you felt fully, undeniably confident. Not comfortable. Confident. What was in the room? What was in your body? What would it take to feel it again?",
    "target": "other"
  },
  {
    "id": "CPL0066",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, you are {target} — in a job interview, crisp and professional, except something absurd keeps pulling your attention away. Twenty seconds. Don't explain the distraction. Just let it wreck you.",
    "target": "other"
  },
  {
    "id": "CPL0067",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "{actor} — your younger self had no idea {target} was coming. What would you tell them? Not about love in general. About {target}, specifically. Who {target} is. What {target} does to you.",
    "target": "other"
  },
  {
    "id": "CPL0068",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, you are {target} — in five places. A funeral. A party. A grocery store. A doctor's office. A gym. Move like {target} moves. Let each one be its own small portrait.",
    "target": "other"
  },
  {
    "id": "CPL0069",
    "chapter": "personal",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor} — there is something you tell yourself about who you are. Lyra suspects you don't entirely believe it. Name that belief. Then say whether it's true.",
    "target": "other"
  },
  {
    "id": "CPL0070",
    "chapter": "personal",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, take {target}'s hands and dance. Full merengue. But let every step carry {target}'s personality — {target}'s rhythm, {target}'s impulses, {target}'s particular way of moving through the world. Make it unmistakably them.",
    "target": "other"
  },
  {
    "id": "CPL0071",
    "chapter": "flirty",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor} — you are still becoming someone. A version of yourself that isn't finished yet. Describe who that person is. Then sit with the question Lyra is already asking: does it scare you that {target} might not love them?",
    "target": "other"
  },
  {
    "id": "CPL0072",
    "chapter": "personal",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, forty-five seconds. You are {target} — walk, voice, humor, gesture, the specific way {target} laughs or goes quiet. Give {target} back to themselves. Hold nothing back.",
    "target": "other"
  },
  {
    "id": "CPL0073",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor} — there is something honest inside you that you have never said to {target}. Not because it isn't true. Because you doubted {target} could hold it. Lyra doesn't believe that's the only reason. What is it?",
    "target": "other"
  },
  {
    "id": "CPL0074",
    "chapter": "personal",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, five minutes. You are {target}'s coach. Merengue. You see exactly what {target} is doing wrong, and you will not let it slide. Tough. Fair. Specific. Make {target} better.",
    "target": "other"
  },
  {
    "id": "CPL0075",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor} — something lives in you that {target} hasn't seen. Not a secret exactly. A truth you've circled around, kept just out of reach. Say it now, here, where Lyra can hear it too.",
    "target": "other"
  },
  {
    "id": "CPL0076",
    "chapter": "personal",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, start a slow merengue with {target}. Slow enough to feel every shift of weight. Let the rhythm do what it does. Let it become something else. Lyra isn't going to stop you.",
    "target": "other"
  },
  {
    "id": "CPL0077",
    "chapter": "personal",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor} — being with {target} has taught you something about yourself you didn't know before. Not about love. About you. What did {target} show you that you couldn't have seen alone?",
    "target": "other"
  },
  {
    "id": "CPL0078",
    "chapter": "personal",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, invent a move right now. Give it a ridiculous name. Announce it. Then pull {target} in and perform it together like you've been practicing for years.",
    "target": "other"
  },
  {
    "id": "CPL0079",
    "chapter": "personal",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor} — not what you want to achieve. What you want to discover. About yourself, this year. Something still unknown. Lyra listens for the answer you haven't shaped into words yet.",
    "target": "other"
  },
  {
    "id": "CPL0536",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "Lyra wants the truth, and she wants it fast. Who snores? Both of you — point at each other on three. One. Two. Three. Go.",
    "target": "other"
  },
  {
    "id": "CPL0537",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "One of you makes the other wait. Every time. Who is it? Both point on three. No hesitation, no mercy. One. Two. Three.",
    "target": "other"
  },
  {
    "id": "CPL0538",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor} — show Lyra how {target} eats when no one is supposed to be watching. The posture, the sounds, the complete absence of self-consciousness. Be honest. {target} is right there.",
    "target": "other"
  },
  {
    "id": "CPL0539",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor} — {target}'s phone holds things. Notes app drafts, voice memos, screenshots taken for no clear reason. Name the weirdest thing hiding in there. Lyra already suspects she knows.",
    "target": "other"
  },
  {
    "id": "CPL0540",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1,
    "text": "Someone said it first, and that moment lives in both of you. Who said \"I love you\" first? Point at each other on three. See if the memory matches. One. Two. Three.",
    "target": "other"
  },
  {
    "id": "CPL0541",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor} — {target} has a phrase. A word, a sound, something {target} says constantly without knowing it. Do it now, in {target}'s voice. {target}: confirm or deny.",
    "target": "other"
  },
  {
    "id": "CPL0542",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor} — {target} is a pizza topping. Not a compliment, not an insult — the truest possible answer. Name the topping. Then defend it like you mean it, because Lyra suspects you do.",
    "target": "other"
  },
  {
    "id": "CPL0543",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "One of you leaves chaos. The other pretends not to notice. Who is the messy one? Eyes closed. Point. Open on three. One. Two. Three.",
    "target": "other"
  },
  {
    "id": "CPL0544",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, {target} is asleep. The alarm is going off. Perform the whole ritual — the groan, the denial, the failed negotiation with consciousness. Give Lyra the full {target} morning.",
    "target": "other"
  },
  {
    "id": "CPL0545",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1.5,
    "text": "{actor}, look at {target} and say it — \"we need to talk.\" Now hold the face that appears on {target}'s face. Every detail. Hold it for ten seconds. {target}: how accurate is that?",
    "target": "other"
  },
  {
    "id": "CPL0546",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor} — zombies. Fifteen seconds. Show Lyra exactly how {target} survives. The strategy, the panic, the very specific choices only {target} would make. Go.",
    "target": "other"
  },
  {
    "id": "CPL0547",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, {target} is getting a movie trailer. Full narrator voice — the low rumble, the dramatic pause, the rising swell. Make {target} legendary. Make the room believe it.",
    "target": "other"
  },
  {
    "id": "CPL0548",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1.5,
    "text": "{actor} — perform it in sequence. First: {target}'s face when {target} says \"I'm not hungry.\" Then: {target}'s face, five minutes later, reaching across for your food. Both faces. Full commitment.",
    "target": "other"
  },
  {
    "id": "CPL0549",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor} — there is a spider. Right there. Show Lyra how {target} reacts. The discovery, the escalation, the very particular way {target}'s body responds to eight legs. Don't hold back.",
    "target": "other"
  },
  {
    "id": "CPL0550",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, twenty seconds. {target}'s music taste. Roast it — specific, brutal, funny. Then {target} gets ten seconds to defend themselves. Lyra will enjoy both sides equally.",
    "target": "other"
  },
  {
    "id": "CPL0551",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1.5,
    "text": "{actor} — {target} is not jealous. {target} is fine. {target} just has a face. Hold that face for ten full seconds. Don't break. {target}: rate the accuracy out of ten.",
    "target": "other"
  },
  {
    "id": "CPL0552",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor} — one to ten. How well does {target} keep a secret? Give the number. Then give the reason. Be specific. {target}: is that fair, or is {actor} wrong about you?",
    "target": "other"
  },
  {
    "id": "CPL0553",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor} — forget what {target} claims. You've watched {target}. You know what {target} actually does well, the quiet competence {target} doesn't announce. Name {target}'s real superpower.",
    "target": "other"
  },
  {
    "id": "CPL0554",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor} — there was a mix-up. Something got lost in translation between you two. Tell it. The confusion, the moment it unraveled, the part that was actually funny. {target}: is that how it happened?",
    "target": "other"
  },
  {
    "id": "CPL0555",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor} — {target} is writing an honest dating profile. Not flattering. Honest. What's the headline? The one sentence that captures {target} exactly as they are, unfiltered.",
    "target": "other"
  },
  {
    "id": "CPL0556",
    "chapter": "personal",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "The movie is at the sad part. Someone's eyes are wet. Who cries more? Both of you — point, no shame, on three. One. Two. Three.",
    "target": "other"
  },
  {
    "id": "CPL0557",
    "chapter": "personal",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, name the dumbest thing you two have ever actually fought about. One breath. Go.",
    "target": "other"
  },
  {
    "id": "CPL0558",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, you are a home-shopping host and {target} is the product. Twenty seconds. Make us believe they're worth every penny. Sell like your life depends on it.",
    "target": "other"
  },
  {
    "id": "CPL0559",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor}, you just told {target} your ex is coming to dinner tonight. Walk me through their reaction — beat by beat, face by face. What does {target_her} body do before {target_she} even speaks?",
    "target": "other"
  },
  {
    "id": "CPL0080",
    "chapter": "playful",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, bachata is playing. You are doing a dramatic tango anyway. Rose-in-mouth energy. Full commitment. {target} has to match you step for step — and neither of you is allowed to admit this is ridiculous.",
    "target": "other"
  },
  {
    "id": "CPL0081",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, something has been simmering. Something you've wanted from {target} and swallowed back down every time. Name it. The craving you've been too careful to ask for.",
    "target": "other"
  },
  {
    "id": "CPL0082",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, there's a part of you — your body, your wanting — that {target} still hasn't quite understood. What is it? Say it plainly. Stop protecting them from knowing.",
    "target": "other"
  },
  {
    "id": "CPL0083",
    "chapter": "playful",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, take {target}'s hand. Trace one letter on their palm — slow, deliberate. They feel it. They guess. No hints, no peeking.",
    "target": "other"
  },
  {
    "id": "CPL0084",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, there's a scene you've rehearsed in your head — you and {target}, a specific moment, a specific version of them. You've never confessed it. Confess it now.",
    "target": "other"
  },
  {
    "id": "CPL0085",
    "chapter": "playful",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, lean in close and whisper something into {target}'s ear — something that makes the color rise in their face. Make it count.",
    "target": "other"
  },
  {
    "id": "CPL0086",
    "chapter": "playful",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor}, which part of {target} catches you off guard, even now? Something you didn't expect to love as much as you do. Say it to their face.",
    "target": "other"
  },
  {
    "id": "CPL0087",
    "chapter": "playful",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, feed {target} something. Slowly. Eyes locked. If either of you looks away, start over.",
    "target": "other"
  },
  {
    "id": "CPL0088",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, there's a fantasy — {target} is in it, and you've never let it leave the inside of your head. Tonight it does. Tell them exactly what happens in it.",
    "target": "other"
  },
  {
    "id": "CPL0089",
    "chapter": "playful",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, pull {target} in and dance a slow bachata. Bodies close. Fully connected. You're allowed to laugh — just don't let go.",
    "target": "other"
  },
  {
    "id": "CPL0090",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, when did you last feel genuinely, undeniably sexy in front of {target}? Not performed. Not dressed for it. Just — felt it in your skin. Tell them.",
    "target": "other"
  },
  {
    "id": "CPL0091",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, find something — a message, a line from something, a sentence you write right now — and read it to {target} in the voice that undoes them. Slow. No rushing the good parts.",
    "target": "other"
  },
  {
    "id": "CPL0092",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, what is the least sexy thing {target} does — and yet it still gets to you? Something they'd be surprised to know lands that way. Tell them.",
    "target": "other"
  },
  {
    "id": "CPL0093",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, something specific. In bed, with {target} — something you've wanted them to do, or say, or be. You've bitten it back. Say it out loud right now.",
    "target": "other"
  },
  {
    "id": "CPL0094",
    "chapter": "playful",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, drag your fingers — slowly — down {target}'s arm. From shoulder to wrist. Watch what it does to them. Don't rush it.",
    "target": "other"
  },
  {
    "id": "CPL0095",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, you have a theory about what {target} secretly wants from you. Something they haven't said. Something you feel around the edges of. What is it?",
    "target": "other"
  },
  {
    "id": "CPL0096",
    "chapter": "playful",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, invent a dance move right now. Give it a ridiculous name. Then make {target} perform it with complete, unwavering seriousness. No breaking.",
    "target": "other"
  },
  {
    "id": "CPL0097",
    "chapter": "playful",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor}, name the one touch from {target} that lights you up most. Not the obvious answer. The real one.",
    "target": "other"
  },
  {
    "id": "CPL0098",
    "chapter": "playful",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, let {target} hold your jaw in their hands. Ten full seconds. Feel the weight of it. No laughing. No flinching. Just stay.",
    "target": "other"
  },
  {
    "id": "CPL0099",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, describe a way {target} could seduce you that they've never actually tried. Be specific. Give them something to work with.",
    "target": "other"
  },
  {
    "id": "CPL0100",
    "chapter": "playful",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, hold {target}'s gaze. One thought in your head. Make them feel it through your eyes alone. Don't look away until they get it.",
    "target": "other"
  },
  {
    "id": "CPL0101",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "{actor}, the filthiest thought you've had about {target} in the last thirty days. Lyra already knows. Now {target} gets to know too.",
    "target": "other"
  },
  {
    "id": "CPL0102",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, put your lips to {target}'s ear. Name your favorite part of their body — slowly, like you're tasting the words. Don't pull back until you're finished.",
    "target": "other"
  },
  {
    "id": "CPL0103",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, where do you wish {target} were bolder in the bedroom? Not a complaint. A confession. Tell them what you'd meet them in, if they showed up that way.",
    "target": "other"
  },
  {
    "id": "CPL0104",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, both hands on {target}'s neck. Slow. Like it means something. Every second is charged — treat it that way.",
    "target": "other"
  },
  {
    "id": "CPL0105",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "{actor}, there's a dynamic — a way you've imagined power or surrender shifting between you and {target}. You've never tried it. You've never said it. Say it now.",
    "target": "other"
  },
  {
    "id": "CPL0106",
    "chapter": "playful",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, feed {target} something. Make every gesture deliberate. Make them feel the full weight of your attention. This is not a game — make it feel like desire.",
    "target": "other"
  },
  {
    "id": "CPL0107",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, what about {target}'s sexuality still catches you? Something that surprises you, or intrigues you, even now. Name it to their face.",
    "target": "other"
  },
  {
    "id": "CPL0108",
    "chapter": "playful",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, hold {target}'s gaze. Fifteen seconds. No looking away, no nervous smiles to break the tension. First one to blink loses something.",
    "target": "other"
  },
  {
    "id": "CPL0109",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, when did {target} last truly see the wanting in you? Not the surface of you. The hunger. Name the moment — or admit it hasn't happened yet.",
    "target": "other"
  },
  {
    "id": "CPL0110",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, pull {target} close and move with them. Keep whispering things that make the color rise in their face — and don't stop moving your feet while you do it.",
    "target": "other"
  },
  {
    "id": "CPL0111",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, there's a compliment about {target}'s body you've held in your mouth and never released. Say it. Right now, to their face. Don't soften it.",
    "target": "other"
  },
  {
    "id": "CPL0112",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, one finger, slow along {target}'s jawline. Start at the ear. Don't rush. Hold their gaze the entire time.",
    "target": "other"
  },
  {
    "id": "CPL0113",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "{actor}, there is something you've wanted to ask {target} in bed — and swallowed back because you feared their reaction. What is it? Ask it here. Let them answer.",
    "target": "other"
  },
  {
    "id": "CPL0114",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, take {target}'s hand and read their palm — but forget the future. Read their desire. Tell them what their skin says about the heat between you.",
    "target": "other"
  },
  {
    "id": "CPL0115",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, what does {target} do — completely unconsciously — that turns you on? Something they have no idea about. Name it. Watch their face when they find out.",
    "target": "other"
  },
  {
    "id": "CPL0116",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, a slow bachata with {target}. This time, let your hands move somewhere new. Keep the rhythm. Less playful, more present.",
    "target": "other"
  },
  {
    "id": "CPL0117",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "{actor}, there's a position, a setting, a specific version of the two of you together — you've pictured it more than once. You've never suggested it. Suggest it now.",
    "target": "other"
  },
  {
    "id": "CPL0118",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, press your thumb to {target}'s lips — slowly, tracing the edge. Don't rush. Don't look away. Make it something they'll feel long after your thumb lifts.",
    "target": "other"
  },
  {
    "id": "CPL0119",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "{actor}, where do you want to put your hands on {target} more than you let yourself? The place you reach toward and pull back from. Name it.",
    "target": "other"
  },
  {
    "id": "CPL0120",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, cup {target}'s face in your hands. Look at them. Then tell them — specifically — what you love about the way they look at you.",
    "target": "other"
  },
  {
    "id": "CPL0121",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "{actor}, a roleplay scenario has crossed your mind — a version of you and {target} in different roles, different heat. It tempts you. Describe it. Let {target} hear it.",
    "target": "other"
  },
  {
    "id": "CPL0122",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, pull {target} in and move with them — close, slow, intentional. No distance. No jokes to cut the tension. Just intent.",
    "target": "other"
  },
  {
    "id": "CPL0123",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor}, there's something you do when you're alone — a habit, a ritual, a small secret life — that {target} knows nothing about. Tell them one.",
    "target": "other"
  },
  {
    "id": "CPL0124",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, put your lips to {target}'s neck. Whisper something you've been sitting on — something you haven't had the nerve to say out loud. Say it there, where only they can hear it.",
    "target": "other"
  },
  {
    "id": "CPL0125",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, the boldest thing you want {target} to do to you. Not the safe answer. The real one — the one that makes your pulse lift just saying it. Say it.",
    "target": "other"
  },
  {
    "id": "CPL0126",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, take your time. Start at the top and move down — every part of {target} you find beautiful, every detail you notice, every place your eyes go when they're not looking. Tell them all of it.",
    "target": "other"
  },
  {
    "id": "CPL0127",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor}. You've watched {target} hold back — again and again. Name the one place you wish they'd finally let go.",
    "target": "other"
  },
  {
    "id": "CPL0128",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, close your eyes. For 20 seconds, {target} maps your face and hair with both hands. Your only task: receive it. No tensing. No deflecting. Just let them.",
    "target": "other"
  },
  {
    "id": "CPL0129",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "There is a fantasy about {target} you've never let fully form in daylight. Name it now. The one that would color your face if they ever found out.",
    "target": "other"
  },
  {
    "id": "CPL0130",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, pull {target} to the floor and let your hips carry every word you haven't said. No hands. Just heat and rhythm and the truth your body refuses to hide.",
    "target": "other"
  },
  {
    "id": "CPL0131",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "Once, {target} asked something of you — intimate, specific, maybe surprising. And secretly, you loved it. Confess what it was. Lyra already suspects.",
    "target": "other"
  },
  {
    "id": "CPL0132",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, begin at {target}'s shoulders. Move downward — slowly, with intention, to wherever feels right. Slow hands. Warm. Like you have all night, because you do.",
    "target": "other"
  },
  {
    "id": "CPL0133",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor}, something {target} does dismantles your composure completely. You know exactly what it is. Say it out loud.",
    "target": "other"
  },
  {
    "id": "CPL0134",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, take {target} into a slow bachata. Close enough to share breath. Eyes locked. Let them feel every inch of what you're not yet saying.",
    "target": "other"
  },
  {
    "id": "CPL0135",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "Something lives in you — a craving, specific and restless — that you have never spoken in bed. {target} is listening now. So is Lyra. Say it.",
    "target": "other"
  },
  {
    "id": "CPL0136",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, let {target} blindfold you. Before they touch you — before a single finger lands — speak aloud exactly what you expect to feel. Your anticipation is the dare.",
    "target": "other"
  },
  {
    "id": "CPL0137",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "There was a moment — one specific moment — when {target} made you feel utterly, completely wanted. Describe it. Where were you? What did they do?",
    "target": "other"
  },
  {
    "id": "CPL0138",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, press your lips to {target} — their mouth, their collarbone, wherever they allow. Go slow. Each point of contact deliberate. This is not rushing. This is arrival.",
    "target": "other"
  },
  {
    "id": "CPL0139",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "You have kept something under lock and key — a desire that belongs entirely to you, that {target} has never touched. Lyra is opening the door. What's inside?",
    "target": "other"
  },
  {
    "id": "CPL0140",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, lead {target} through a bachata where there is no question who is in control. Your grip says it. Your posture says it. Let your body make it undeniable.",
    "target": "other"
  },
  {
    "id": "CPL0141",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "There is something you want — specific, maybe dark, maybe just big — that you fear might be too much for {target}. Lyra gives you permission to say it anyway.",
    "target": "other"
  },
  {
    "id": "CPL0142",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, lean into {target}'s ear and whisper the filthiest flirtation your imagination holds. Take your time. Make them want to pull back — and not be able to.",
    "target": "other"
  },
  {
    "id": "CPL0143",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "You have imagined doing something with {target} that you quietly assumed would never happen. That quiet assumption ends here. What was it?",
    "target": "other"
  },
  {
    "id": "CPL0144",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, give {target} two uninterrupted minutes — music on, hands moving, voice low. Touch and whisper and let the heat build. Whatever you've been holding back, release it now.",
    "target": "other"
  },
  {
    "id": "CPL0145",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "Bold. Something bold that you want {target} to do to you — not ask about, not hint at. Do. Tell them what it is. Be specific. Lyra rewards specificity.",
    "target": "other"
  },
  {
    "id": "CPL0146",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, dance with {target} and stop managing how much you want them. Let it show in your hips, your hands, the way you look at them. Hide nothing. Nothing.",
    "target": "other"
  },
  {
    "id": "CPL0147",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "There is something about the way {target} inhabits their own desire — unself-conscious, utterly theirs — that you find impossible to look away from. Name it precisely.",
    "target": "other"
  },
  {
    "id": "CPL0148",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, five minutes. Your hands on {target} — every limit respected, every nerve lit. Move like you know exactly what you're doing to them. Because you do.",
    "target": "other"
  },
  {
    "id": "CPL0149",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "Beneath everything you've shown {target}, there is a truth about your desire — naked, specific, unpolished. {target} has never heard it. The silence ends now.",
    "target": "other"
  },
  {
    "id": "CPL0150",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, five minutes. Music. Hands. Breath. Words whispered where they land hardest. Pour out everything you have been withholding. {target} is ready. You are ready. Begin.",
    "target": "other"
  },
  {
    "id": "CPL0151",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "There is something you want {target} to do to you — and the wanting of it makes you almost too nervous to ask. Lyra is asking for you. What is it?",
    "target": "other"
  },
  {
    "id": "CPL0152",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, dance with {target} and drop every defense. No nervous laugh. No looking away. Pure presence, pure want, pure connection — the kind that makes the room disappear.",
    "target": "other"
  },
  {
    "id": "CPL0153",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "Beneath the surface of everything you and {target} share, there is a desire you have never spoken. Not aloud. Not like this. Lyra is listening. So is {target}. Speak it.",
    "target": "other"
  },
  {
    "id": "CPL0154",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, the side of your desire you keep carefully hidden — {target} gets to see it now. Drop the curtain. Let them see you wanting, unguarded, exactly as you are.",
    "target": "other"
  },
  {
    "id": "CPL0155",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "There is something {target} does not yet understand about what you need — something essential, something you have carried alone. Tonight, they learn it. From your own lips.",
    "target": "other"
  },
  {
    "id": "CPL0156",
    "chapter": "playful",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, pull {target} close and slow-dance. No performance. No audience. Let your body say: you. It has always been you. Make them feel the weight of that.",
    "target": "other"
  },
  {
    "id": "CPL0157",
    "chapter": "playful",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "Something shifted in you tonight — a door opened that wasn't open before. Tell {target} exactly what you now want to explore with them that you didn't know to want before.",
    "target": "other"
  },
  {
    "id": "CPL0158",
    "chapter": "suggestive",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, put your lips to {target}'s ear. Tell them one thing you will do to them later. Make it specific. Make it a promise with edges. Let them carry it.",
    "target": "other"
  },
  {
    "id": "CPL0159",
    "chapter": "playful",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{target} surprised you tonight. Something small or enormous — a word, a look, a moment. {actor}, name it. What did you see in them you hadn't seen before?",
    "target": "other"
  },
  {
    "id": "CPL0160",
    "chapter": "playful",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, kiss {target} — playful enough to make them smile, loaded enough to make them stop. The kind of kiss that marks a before and after. Make tonight the after.",
    "target": "other"
  },
  {
    "id": "CPL0161",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "When you are alone with your reflection, there is a part of your body that you find genuinely, privately beautiful. Name it. Own it. No hedging.",
    "target": "self"
  },
  {
    "id": "CPL0162",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "When {target} moves without an audience — unselfconscious, fully in their body — something in you stops. What is it that catches your breath? Be exact.",
    "target": "self"
  },
  {
    "id": "CPL0163",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, sit across from {target}. No touching. For 60 full seconds, look at them — really look — and let them feel the full weight of your attention. Don't soften it.",
    "target": "other"
  },
  {
    "id": "CPL0164",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, take one fingertip and trace the outline of {target}'s hand from wrist to fingertip. Slowly. Like you're memorizing topography. No interlocking. Just learning them.",
    "target": "other"
  },
  {
    "id": "CPL0165",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "There is a way you long to be touched — a pressure, a pace, a place — that you have never quite found the words to ask for. Find them now. {target} is listening.",
    "target": "self"
  },
  {
    "id": "CPL0166",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "Both of you, close your eyes. {actor}, rest your palm on {target}'s arm. Feel the music move through them. Hold that stillness for one full phrase. Don't move. Just feel.",
    "target": "other"
  },
  {
    "id": "CPL0167",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "Silk. Skin. Warmth. Cold. Pressure. One texture wakes something in you that the others cannot. Tell {target} which one and what it stirs in your body when it arrives.",
    "target": "self"
  },
  {
    "id": "CPL0168",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, stand behind {target}. Close. Your breath warming the back of their neck — but no contact. Stay exactly there, through one full phrase of the song. Let proximity do its work.",
    "target": "other"
  },
  {
    "id": "CPL0169",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "When {target} is near — close enough that you can feel the air between you — where on your body do you feel that gap most? Be honest. Be specific.",
    "target": "self"
  },
  {
    "id": "CPL0170",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, reach out and sweep a strand of hair from {target}'s face. Slow. Let your fingers rest a moment on their cheek. Then draw back. Say nothing. Let the gesture speak.",
    "target": "other"
  },
  {
    "id": "CPL0171",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "There is a particular kind of attention from {target} — a look, a touch, a tone of voice — that makes you forget you were breathing. Tell them which one it is.",
    "target": "self"
  },
  {
    "id": "CPL0172",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, take {target}'s hand and press it flat against your chest, over your heart. Hold it there for 30 seconds. Then tell them what they just felt. Be honest.",
    "target": "other"
  },
  {
    "id": "CPL0173",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "{target} has a look — you know the one. The look that lands on your skin like heat. Tell them exactly what it does to you when they aim it your way.",
    "target": "self"
  },
  {
    "id": "CPL0174",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, bring {target}'s wrist to your lips. Press a slow, deliberate kiss there. Then ask them: what did they feel traveling up their arm? Wait for the answer.",
    "target": "other"
  },
  {
    "id": "CPL0175",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "When {target} looks at you with hunger — unmasked, unhurried — something in you responds before your mind catches up. Where? What answers first?",
    "target": "self"
  },
  {
    "id": "CPL0176",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, reach out and undo {target}'s top button. One button. Slowly. No rush. Let them feel every second of the anticipation you are both already inside.",
    "target": "other"
  },
  {
    "id": "CPL0177",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "{actor}, you know the shift — the way {target}'s voice drops a half-register, goes quieter, slower. Describe it. What happens in your chest when you hear it?",
    "target": "self"
  },
  {
    "id": "CPL0178",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, turn to face {target}. Press the back of your hand to their shoulder and draw it down — slow — all the way to their wrist. Keep your eyes on theirs. Every inch. Don't look away.",
    "target": "other"
  },
  {
    "id": "CPL0179",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "{actor}, when {target} pictures you alone — really pictures you — their breath changes. You've seen it. Tell the room exactly what that looks like.",
    "target": "self"
  },
  {
    "id": "CPL0180",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, one fingertip. Start at the hollow of {target}'s throat and follow the collarbone to its edge. When you reach the end, lean in and whisper one thing about them that is simply, undeniably true.",
    "target": "other"
  },
  {
    "id": "CPL0181",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "{actor}, think of the moment with {target} when you felt most bare — not frightened, not performing. Just completely without cover. When was it? What stripped you down?",
    "target": "self"
  },
  {
    "id": "CPL0182",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, take {target}'s face in both hands. Touch your forehead to theirs. Close your eyes and breathe — not in sync, just close. Hold it there for a full minute. Nothing else.",
    "target": "other"
  },
  {
    "id": "CPL0183",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "{actor}, recall the first time {target} touched you and your pulse answered without permission. Tell them exactly where their hand was and what your body did.",
    "target": "self"
  },
  {
    "id": "CPL0184",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, offer your hand. Let {target} take it and place it exactly where they need to feel you right now. You follow. No guiding, no rushing, no questions.",
    "target": "other"
  },
  {
    "id": "CPL0185",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "{actor}, there's a version of {target} walking toward you that undoes you completely. Describe the approach — the pace, the look, the intention. How do they move when they want you?",
    "target": "self"
  },
  {
    "id": "CPL0186",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, pull {target} in close enough that you share the same warm air. Move to whatever is playing — slowly, no destination. Let the music become background noise.",
    "target": "other"
  },
  {
    "id": "CPL0187",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, there is a touch you have imagined and never once asked for. Not an act — a feeling. Name it. Put it into words and let {target} hear it for the first time.",
    "target": "self"
  },
  {
    "id": "CPL0188",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, press your palm flat to the small of {target}'s back. Guide them across the room. Don't explain. Don't speak. Let your hand say where you want them to go.",
    "target": "other"
  },
  {
    "id": "CPL0189",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, when {target}'s hands are on you, your body goes still — but your mind goes somewhere else entirely. Tell them where. Be specific.",
    "target": "self"
  },
  {
    "id": "CPL0190",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, one fingertip on {target}'s wrist. Draw it up — slow, steady — toward the shoulder. {target}, say nothing. Wait. Tell {actor} only when something changes.",
    "target": "other"
  },
  {
    "id": "CPL0191",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, {target}'s touch feels different when they reach for you versus when you asked them to. You know the difference in your skin. Describe it — the texture, the weight, the intention.",
    "target": "self"
  },
  {
    "id": "CPL0192",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, stand behind {target}. Hands on their shoulders. Now move them — the way they move when no one is watching, when only the music matters. Don't perform it. Find it.",
    "target": "other"
  },
  {
    "id": "CPL0193",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, {target}'s hands have taught your skin something about wanting that no one else has. What is it? What does your body know now that it didn't before them?",
    "target": "self"
  },
  {
    "id": "CPL0194",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, three kisses. All above the collar. None where {target} expects. After each one, let them wonder where the next will land. Make them wait for it.",
    "target": "other"
  },
  {
    "id": "CPL0195",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, {target} knows your body — but not all of it. There is something left undiscovered. Tell them: the place, the pressure, the way you want to be found there.",
    "target": "self"
  },
  {
    "id": "CPL0196",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, remove one layer. Give it to the air. Then let {target} trace the new edge — the line where your skin begins. Let them follow it wherever it goes.",
    "target": "other"
  },
  {
    "id": "CPL0197",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, when {target} crosses the room toward you with purpose — full intent in their eyes — your body does something before your mind catches up. What is it? What moves first?",
    "target": "self"
  },
  {
    "id": "CPL0198",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, put your lips close enough to {target}'s ear that they feel the heat of what you're about to say. Then name the one thing they do that stops you completely — the move, the look, the word.",
    "target": "other"
  },
  {
    "id": "CPL0199",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, there's a rhythm you want to fall into with {target} — breath, pulse, the way bodies find each other's tempo. Describe it. What does it feel like when you get there?",
    "target": "self"
  },
  {
    "id": "CPL0200",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, close your eyes. Raise both hands. For thirty seconds, learn {target}'s face by touch alone — the ridge of the brow, the line of the jaw, the weight of it all. No rushing through.",
    "target": "other"
  },
  {
    "id": "CPL0201",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, recall a moment when {target} gave your body their complete, unhurried attention. Not a glance — a full reckoning. What did it feel like to be the only thing they were looking at?",
    "target": "self"
  },
  {
    "id": "CPL0202",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, lift {target}'s wrist. Press your mouth to the inside of it and hold there. Feel the pulse under your lips. When you feel it steady, whisper one true thing against their skin.",
    "target": "other"
  },
  {
    "id": "CPL0203",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, {target} has a small, almost invisible way of touching you that makes you feel entirely known. Not the obvious ones. The small one. Name it.",
    "target": "self"
  },
  {
    "id": "CPL0204",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, slide one hand beneath {target}'s clothing. Go slowly. Let {target} take your hand and place it where they want to be felt. Stay there. Don't move until they tell you to.",
    "target": "other"
  },
  {
    "id": "CPL0205",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, alone, thinking of {target} — something in you stirs before you even choose to. Which part of you wakes up first? Where does the wanting start?",
    "target": "self"
  },
  {
    "id": "CPL0206",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, get close to {target} — chest to back, or face to face, whichever pulls harder right now. Close enough that they feel your breath change. Let it deepen. Let them notice.",
    "target": "other"
  },
  {
    "id": "CPL0207",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, there is a way you have longed to be held that no one has ever quite gotten right. Describe it to {target} — the pressure, the position, the feeling it would give you.",
    "target": "self"
  },
  {
    "id": "CPL0208",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, go still. Let {target} wrap themselves around you however they choose — arms, legs, weight, warmth. Do not help them. Do not arrange yourself. Let them find you.",
    "target": "other"
  },
  {
    "id": "CPL0209",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, imagine {target}'s hands never leaving you — all evening, all night, unbroken. What happens to you? What does that much attention do to a person?",
    "target": "self"
  },
  {
    "id": "CPL0210",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, undress {target}. One piece at a time. After each one, press your mouth to the skin you've just uncovered. No skipping. No rushing. Watch their breath. Follow it.",
    "target": "other"
  },
  {
    "id": "CPL0211",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, your body wants something from {target} that you haven't found the words for yet — a sensation, a closeness, a kind of contact that doesn't have a name. Reach for the words. Get as close as you can.",
    "target": "self"
  },
  {
    "id": "CPL0212",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, position {target} in the best light in the room. Then touch them like you're reading them — shoulders, collarbone, chest, the curve of the ribs. Ask after each place: better here, or here?",
    "target": "other"
  },
  {
    "id": "CPL0213",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, when {target} looks at your body, you imagine what they want — what they'd do if nothing stopped them. Tell them. Out loud. What do you imagine behind their eyes?",
    "target": "self"
  },
  {
    "id": "CPL0214",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, work your thumbs into {target}'s shoulders. Take your time. {target}, say nothing until {actor} finds a knot. Then tell them. And {actor} — stay there longer than feels necessary.",
    "target": "other"
  },
  {
    "id": "CPL0215",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, {target} has never crossed a line you didn't draw aloud — they read something in you and simply knew. Name the boundary they've always honored without being told.",
    "target": "self"
  },
  {
    "id": "CPL0216",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, take your time with {target}'s skin. Fingertips only. Move without any destination in mind. You're not going anywhere. You're just looking for the place that makes them inhale.",
    "target": "other"
  },
  {
    "id": "CPL0217",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, right now — this exact moment — what do you want {target}'s hands doing? Don't soften it. Say it plainly.",
    "target": "self"
  },
  {
    "id": "CPL0218",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, lie beside {target}. One hand. Start at the nape of the neck and go — spine, ribs, the dip of the waist, the curve of the hip, the length of the leg. Slow. All the way.",
    "target": "other"
  },
  {
    "id": "CPL0219",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, when {target} takes obvious pleasure in your body — not performing, truly enjoying — something in you shifts. Describe the shift. What opens? What lets go?",
    "target": "self"
  },
  {
    "id": "CPL0220",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, move with {target} to whatever is playing. Not dancing to impress — just moving, together, close. No rhythm to chase. No finish line. Let your bodies find each other's language.",
    "target": "other"
  },
  {
    "id": "CPL0221",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, pinpoint the moment you began wanting {target} the way you want them right now — not curiosity, not affection. This specific wanting. When did it start?",
    "target": "self"
  },
  {
    "id": "CPL0222",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, take {target}'s hands. Place them on your body — exactly where the ache is. Don't explain. Don't apologize. Just guide them there and let them feel what you've been carrying.",
    "target": "other"
  },
  {
    "id": "CPL0223",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, {target} has made you feel something that has no clean category — not just pleasure, not just love. What was the most of it? The peak of what they've made you feel?",
    "target": "self"
  },
  {
    "id": "CPL0224",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, kiss {target} now — not soft, not urgent. Somewhere in between. The kind of kiss that carries weight, that says: I know exactly what I want and it is you. Let your mouth mean it.",
    "target": "other"
  },
  {
    "id": "CPL0225",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, when you want {target}, you have a tell — something your body does without deciding to. What is it? How do you want them to recognize it?",
    "target": "self"
  },
  {
    "id": "CPL0226",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, take everything off. Then be still. Ask {target} to touch you where they have been imagining — the place they've thought about but held back from. Give them permission. Watch their hands choose.",
    "target": "other"
  },
  {
    "id": "CPL0227",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor} — name the craving you've swallowed. The one that sat in your chest while {target} was right there. Say it now, out loud, where it can't be taken back.",
    "target": "self"
  },
  {
    "id": "CPL0228",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, lie back. Still your hands. {target} gets all of you tonight — wherever their mouth wanders, wherever their hands press — and your only task is to receive it. Let them.",
    "target": "other"
  },
  {
    "id": "CPL0229",
    "chapter": "flirty",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, your body already knows the answer. What does it want from {target} that your voice has never been brave enough to name?",
    "target": "self"
  },
  {
    "id": "CPL0230",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, use your hands and your mouth to bring {target} right to the edge — then stop. Hold them there. Feel them tremble. Don't move until they beg.",
    "target": "other"
  },
  {
    "id": "CPL0231",
    "chapter": "flirty",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, when {target} has you completely helpless — body pinned, breath shallow, nowhere to go — what moves through you in that moment? Name the feeling precisely.",
    "target": "self"
  },
  {
    "id": "CPL0232",
    "chapter": "flirty",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, give {target} your body. Every decision — how you're positioned, where you're touched, how fast or slow — is theirs. You simply follow. Trust the surrender.",
    "target": "other"
  },
  {
    "id": "CPL0233",
    "chapter": "flirty",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, there's one specific move {target} could make that would collapse you completely. You know exactly what it is. Say it.",
    "target": "self"
  },
  {
    "id": "CPL0234",
    "chapter": "flirty",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, bring {target} as close to the edge as you're able. Read their breathing, their skin, the shift in their weight — not their words. The body tells the truth first.",
    "target": "other"
  },
  {
    "id": "CPL0235",
    "chapter": "flirty",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, when you let go and surrender fully to {target} — not partly, fully — what does it feel like from the inside? Describe the exact sensation, not the idea of it.",
    "target": "self"
  },
  {
    "id": "CPL0236",
    "chapter": "flirty",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, slow everything down. Pull {target} close and breathe with them — really breathe, chest to chest — until your rhythms match. Don't speak. Just find each other's pace.",
    "target": "other"
  },
  {
    "id": "CPL0237",
    "chapter": "flirty",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, something about {target} surprised you tonight. Not what you expected, not what you assumed. What did you just discover?",
    "target": "self"
  },
  {
    "id": "CPL0238",
    "chapter": "flirty",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, give {target} a single, soft kiss — the kind that means thank you. Then stay close. Foreheads touching, eyes shut. No words needed for what that says.",
    "target": "other"
  },
  {
    "id": "CPL0239",
    "chapter": "flirty",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, set aside what you think you should be feeling. What is your body actually doing right now — the breath, the heartbeat, the skin? Report honestly.",
    "target": "self"
  },
  {
    "id": "CPL0240",
    "chapter": "flirty",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, pull {target} into your arms and hold them in complete silence. Let the quiet settle. Let it be enough. Nothing else is required of either of you.",
    "target": "other"
  },
  {
    "id": "CPL0241",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, one specific part of {target} strips your control away when you look at it — or touch it — or think about it. Which part? And what does losing control there feel like?",
    "target": "self"
  },
  {
    "id": "CPL0242",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, picture {target} alone. Unhurried. No one watching. Where are their hands, and what are they thinking about?",
    "target": "self"
  },
  {
    "id": "CPL0243",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, cover {target}'s eyes with something soft. Then use only your voice — no hands yet — to guide them across the room. Watch how much they trust the sound of you.",
    "target": "other"
  },
  {
    "id": "CPL0244",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, there's a position that leaves you most exposed — not because of skin, but because of what it opens in you emotionally. Name it. Describe why.",
    "target": "self"
  },
  {
    "id": "CPL0245",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, undress in front of {target}. Slowly. Don't perform — no performance, no distance. Just let them look at you, all of you, without anything between them and the truth of your body.",
    "target": "other"
  },
  {
    "id": "CPL0246",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, you hold something over {target} — a piece of knowledge, a power, a way you could undo them — that you've never once deployed. What is it, and why have you held it back?",
    "target": "self"
  },
  {
    "id": "CPL0247",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, stand still. Let {target} undress you — one piece at a time, at whatever pace they choose. Your only instruction: don't help.",
    "target": "other"
  },
  {
    "id": "CPL0248",
    "chapter": "suggestive",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, when {target} looks at your body, what do you imagine they see? Paint the picture honestly — not how you wish they saw you, but what you believe is actually in their eyes.",
    "target": "self"
  },
  {
    "id": "CPL0249",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, on {target}'s body there is one place where you most want to leave a mark of your wanting. Name it. Tell them why that particular place.",
    "target": "self"
  },
  {
    "id": "CPL0250",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, press your mouth to {target}'s skin and begin. No goal, no destination — just move. Collarbone to hip, inner wrist to shoulder. Take your time. Map what you find.",
    "target": "other"
  },
  {
    "id": "CPL0251",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, recall the moment {target} wanted you the most. Not a guess — a specific time you could feel it radiating off them. What told you? Their breath, their hands, their eyes?",
    "target": "self"
  },
  {
    "id": "CPL0252",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, use only your fingertips to write a word on {target}'s skin — somewhere slow and deliberate. Give them a moment to feel it. Then ask them to name the word.",
    "target": "other"
  },
  {
    "id": "CPL0253",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, if you could change one thing about the way {target} touches you — not replace it, just shift it — what would you ask for? Be specific. Be honest. They're listening.",
    "target": "self"
  },
  {
    "id": "CPL0254",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, put your hands on {target} with full intention. Chest. Stomach. Thighs. Move slowly, deliberately, like someone who knows exactly what they want and is in no hurry to get there.",
    "target": "other"
  },
  {
    "id": "CPL0255",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, there's a fantasy about {target} that used to feel safely out of reach. Tonight it doesn't. Name it — the one that feels dangerously, suddenly possible.",
    "target": "self"
  },
  {
    "id": "CPL0256",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, breathe hot air onto {target}'s skin — slow, close, deliberate — then press your lips cool against the same spot. Feel them react. Move somewhere new and do it again.",
    "target": "other"
  },
  {
    "id": "CPL0257",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, when {target} is touching you and the tension is almost unbearable — what permission are you secretly waiting for? Who do you need to give it to you?",
    "target": "self"
  },
  {
    "id": "CPL0258",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, hold {target}. Not rough — certain. Both hands, full grip, the kind of hold that communicates possession without needing a word. Let them feel what they belong to.",
    "target": "other"
  },
  {
    "id": "CPL0259",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, if {target} believed there were zero consequences — no memory of it tomorrow, no judgment — what do you think they would do to you? Describe what you imagine.",
    "target": "self"
  },
  {
    "id": "CPL0260",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, position {target} beneath you. Hold their gaze. Touch them slowly, deliberately — and don't look away. Every reaction is yours to witness. Take it all in.",
    "target": "other"
  },
  {
    "id": "CPL0261",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, how much of {target} do you need before the hunger finally quiets? Is it a moment, a night, a surrendering — or does it never fully close? Answer without softening it.",
    "target": "self"
  },
  {
    "id": "CPL0262",
    "chapter": "suggestive",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, offer your hand to {target}. Let them take it and guide it — slower, further, somewhere you haven't gone yet. They lead. You obey without hesitation.",
    "target": "other"
  },
  {
    "id": "CPL0263",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "{actor}, there are limits you carry that {target} has never fully heard. Not because you hid them — because you never found the words. Find them now. Speak one out loud.",
    "target": "self"
  },
  {
    "id": "CPL0264",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, cover {target}'s eyes. Take a piece of ice and drag it — unhurried, unpredictable — across their skin from throat to hip. When they gasp, ask: where did it burn the hottest?",
    "target": "other"
  },
  {
    "id": "CPL0265",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "{actor}, tell the truth: how rough could {target} get with you — how much pressure, how much edge — before you stopped wanting more? Or does that line not exist?",
    "target": "self"
  },
  {
    "id": "CPL0266",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, lay {target} on their back. Use your hands. Then your mouth. Then your body. Build a slow rhythm they can almost predict — then break it completely. Watch what that does.",
    "target": "other"
  },
  {
    "id": "CPL0267",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "{actor}, settle the question right now: do you want {target} gentle — patient, attentive, careful — or do you want them to stop asking and simply take what they want from you?",
    "target": "self"
  },
  {
    "id": "CPL0268",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, {target} is blindfolded. Now undress — slowly, close. Let them hear the shift of fabric. Let them feel the air change as you move nearer. Make the anticipation physical.",
    "target": "other"
  },
  {
    "id": "CPL0269",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "{actor}, between you and {target} there are different configurations of power — and one of them makes you feel most alive. Name the dynamic. Describe what it unlocks in you.",
    "target": "self"
  },
  {
    "id": "CPL0270",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, move above {target}. Press down. Grind slowly, with full control — show them exactly what you want without saying a single word. Let the weight of your body speak.",
    "target": "other"
  },
  {
    "id": "CPL0271",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "{actor}, when {target} looks at you with open hunger — eyes moving over you like you're something they intend to consume — what do you imagine is running through their mind?",
    "target": "self"
  },
  {
    "id": "CPL0272",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, while {target} touches you, narrate it. Tell them what they're doing to you — not in performance, but in real time. Let your voice crack where it wants to. Let them hear all of it.",
    "target": "other"
  },
  {
    "id": "CPL0273",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "{actor}, describe exactly how {target} would need to dominate you to make you stop thinking and simply surrender. What would they have to do, say, take?",
    "target": "self"
  },
  {
    "id": "CPL0274",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, pin {target} still — gently but firmly. Touch them everywhere, building heat layer by layer. When they reach for you, stop. Not yet. They get to touch when you decide.",
    "target": "other"
  },
  {
    "id": "CPL0275",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "{actor}, describe in precise detail how you want {target} to want you. Not just that they do — how. The look, the pressure, the timing. What does being truly wanted by them actually feel like?",
    "target": "self"
  },
  {
    "id": "CPL0276",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, kiss {target} deep — the kind that takes, not asks — and let your hands move south at the same pace. Slow. Purposeful. Every inch of the way intentional.",
    "target": "other"
  },
  {
    "id": "CPL0277",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "{actor}, name the thing {target} keeps almost seeing. The part of you that goes quiet when they get close. Tell them what's actually there.",
    "target": "self"
  },
  {
    "id": "CPL0278",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, go still. Let {target}'s hands find you, move you, place you. Your only job is to follow. No words. No steering. Just yield.",
    "target": "other"
  },
  {
    "id": "CPL0279",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "Describe exactly what {target}'s hands do — the specific pressure, the specific place — that makes your body believe it is wanted.",
    "target": "self"
  },
  {
    "id": "CPL0280",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, slow everything down to the pace of a held breath. Move against {target} like the moment before a wave breaks. Let it build. Don't rush the swell.",
    "target": "other"
  },
  {
    "id": "CPL0281",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "Alone in the dark with {target} — no performance, no pretense. Speak aloud what you want them to do to you. Every word.",
    "target": "self"
  },
  {
    "id": "CPL0282",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, close the distance. Press into {target} from behind, chest to their back, arms encircling. Move like you own this. Because right now, you do.",
    "target": "other"
  },
  {
    "id": "CPL0283",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "There is a kind of surrender to {target} that makes you feel more powerful, not less. Name it. Describe the exact shape of that feeling.",
    "target": "self"
  },
  {
    "id": "CPL0284",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, take your time with {target}. Touch them slowly, attentively, reading every shift in their breath. Bring them close — and hold them there.",
    "target": "other"
  },
  {
    "id": "CPL0285",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "If {target} could ask your body for one thing — something that would require complete trust — what would it be? Name it.",
    "target": "self"
  },
  {
    "id": "CPL0286",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, pull {target} in until there is no space left between you. Chest to chest. Hip to hip. Breathe until you can't tell whose exhale belongs to whom.",
    "target": "other"
  },
  {
    "id": "CPL0287",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "Pick one part of {target}'s body. The part you return to. The part your mouth already knows. Tell them — and tell them why you could spend hours there.",
    "target": "self"
  },
  {
    "id": "CPL0288",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, blindfold {target}. Now take away every certainty except your touch. Change speed. Change pressure. Change location. Make them ache for what comes next. Don't give it — not yet.",
    "target": "other"
  },
  {
    "id": "CPL0289",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "There is something {target} could ask for in bed that would stop your breath — not from refusal, but from want. What is it?",
    "target": "self"
  },
  {
    "id": "CPL0290",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, use everything you have. Hands moving. Mouth finding. Chest pressing. Give {target} the full weight of your attention. Show them what it means when you mean it.",
    "target": "other"
  },
  {
    "id": "CPL0291",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "If there were no memory of this moment — no morning after, no history — what would you let {target} do to you tonight? Say it plainly.",
    "target": "self"
  },
  {
    "id": "CPL0292",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, bring {target} right to the edge. Feel the tension gathering in their body. Then stop. Hold them there, trembling and unfinished. Not yet.",
    "target": "other"
  },
  {
    "id": "CPL0293",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "When {target} gives in completely — goes soft, goes quiet, goes entirely yours — what does that do to your body? Describe the sensation, not the thought.",
    "target": "self"
  },
  {
    "id": "CPL0294",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, make {target}'s pleasure the only thing that exists. Mouth, hands, weight — all of it directed at them. Let hunger be your only guide.",
    "target": "other"
  },
  {
    "id": "CPL0295",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "Somewhere in your mind is an image of {target} — something you've imagined doing that you've never said out loud. Say it out loud now.",
    "target": "self"
  },
  {
    "id": "CPL0296",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, lay {target} back, or bring them to their knees — your call. Find a rhythm. Let it build, let it break, let it build again. Keep going.",
    "target": "other"
  },
  {
    "id": "CPL0297",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "When {target} takes control of you, there is something specific you need them to know — a particular hunger, a particular fear. Tell them now, while the wanting is fresh.",
    "target": "self"
  },
  {
    "id": "CPL0298",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, bring {target} to the edge more than once. Each time, a different touch. Each time, proof that you've been paying attention. Let their body be the test you pass.",
    "target": "other"
  },
  {
    "id": "CPL0299",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "Describe what happens inside you when {target} falls apart — when the composure breaks and you are the reason. What does that do to you?",
    "target": "self"
  },
  {
    "id": "CPL0300",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, move into {target} with everything — no reservation, no half-measure. Let them feel the full weight of how much you need this. Need them.",
    "target": "other"
  },
  {
    "id": "CPL0301",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "In those moments when you are tangled together and there is no distance left — what do you imagine {target} is feeling? What do you hope they're feeling?",
    "target": "self"
  },
  {
    "id": "CPL0302",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, open yourself fully to {target}. Move with them. Let them take what they came for. Give them permission to take all of it.",
    "target": "other"
  },
  {
    "id": "CPL0303",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "When {target} claims you — when they are certain and you are theirs — how do you want to be held? Where do you want their hands? Describe it exactly.",
    "target": "self"
  },
  {
    "id": "CPL0304",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, let the pace between you find itself. Don't decide. Don't lead. Move with {target} and let need do the steering.",
    "target": "other"
  },
  {
    "id": "CPL0305",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "Tell me the moment with {target} when you felt the most exposed — not naked, but seen. When the armor fell away and they were looking right at you.",
    "target": "self"
  },
  {
    "id": "CPL0306",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, bring {target} all the way. Feel every tremor pass through their body into yours. Watch them surrender. Let it happen in your hands.",
    "target": "other"
  },
  {
    "id": "CPL0307",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "There is something about the depth of your wanting that {target} doesn't fully grasp. Name it. Say the part you've been keeping quiet.",
    "target": "self"
  },
  {
    "id": "CPL0308",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, move with {target} until the boundary between you dissolves — until where you end and they begin is a question neither of you can answer.",
    "target": "other"
  },
  {
    "id": "CPL0309",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "Name the thing your body craves from {target} — the specific act, the specific sensation — that you suspect might genuinely undo you.",
    "target": "self"
  },
  {
    "id": "CPL0310",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, take {target} all the way to the edge — both of you moving as one thing, nothing withheld, nothing left in reserve.",
    "target": "other"
  },
  {
    "id": "CPL0311",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "Paint the picture: what does total surrender to {target} look like? Your body, their hands, the room. What is actually happening?",
    "target": "self"
  },
  {
    "id": "CPL0312",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, let {target} take everything you have left. Follow them through the rise, through the breaking, through the quiet that comes after.",
    "target": "other"
  },
  {
    "id": "CPL0313",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "Describe the sensation of being completely claimed by {target}. Not the emotion — the physical fact of it. What does your body feel?",
    "target": "self"
  },
  {
    "id": "CPL0314",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, stay with {target}. Fully present, fully joined. Don't rush the arrival. Let the peak come when it comes — and meet it together.",
    "target": "other"
  },
  {
    "id": "CPL0315",
    "chapter": "suggestive",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "Something just shifted between you and {target}. I saw it. Now tell me — in your own words — what exactly just happened.",
    "target": "self"
  },
  {
    "id": "CPL0316",
    "chapter": "suggestive",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, {target} is still surfacing. Slow your hands. Deepen your breath. Let your body become the steady thing they return to.",
    "target": "other"
  },
  {
    "id": "CPL0317",
    "chapter": "suggestive",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "Something about {target} revealed itself just now — something you didn't know before. Name it. Say what you'll carry forward.",
    "target": "self"
  },
  {
    "id": "CPL0318",
    "chapter": "suggestive",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, lie down with {target} as they come back to themselves. Skin touching skin. Your heartbeat against theirs. Stay in the quiet.",
    "target": "other"
  },
  {
    "id": "CPL0319",
    "chapter": "suggestive",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "Right now, in this moment, with {target} beside you — what do you feel? Not what you think. What your chest actually holds.",
    "target": "self"
  },
  {
    "id": "CPL0320",
    "chapter": "suggestive",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, hold {target} close and say one true thing. One thing you mean entirely. Then let the silence say the rest.",
    "target": "other"
  },
  {
    "id": "CPL0321",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "{actor}, ask {target} this question and wait for the honest answer: where on your body do you secretly wish I would touch you — but you've never asked me to?",
    "target": "other"
  },
  {
    "id": "CPL0322",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, sit behind {target}. Both hands on their shoulders. Lean close and ask: where should this lead? Then let their answer move your hands.",
    "target": "other"
  },
  {
    "id": "CPL0323",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "{actor}, ask {target} directly: what was the first thing you noticed about my body? And tell me — is that still how you see it now?",
    "target": "other"
  },
  {
    "id": "CPL0324",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, take {target}'s hand and press it flat against your chest. Hold it there. Let them feel what's happening underneath. Then say: this is what you do to me.",
    "target": "other"
  },
  {
    "id": "CPL0325",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{target}, look at {actor} and answer this: which part of your own body makes you feel powerful — not self-conscious, powerful? Tell them why.",
    "target": "other"
  },
  {
    "id": "CPL0326",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, undress {target} as if time is not a factor. One piece at a time. As each one falls, say something true about what you see. Don't skip a single one.",
    "target": "other"
  },
  {
    "id": "CPL0327",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "{actor}, lean close to {target} and ask: \"If your body could whisper one secret to me right now — something your voice never dares say — what would it confess?\"",
    "target": "other"
  },
  {
    "id": "CPL0328",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, stand facing {target}. Find their breath. Match it — every inhale, every exhale — for 30 slow seconds. Then press your forehead to theirs. Hold. Don't speak. Don't move. Just stay.",
    "target": "other"
  },
  {
    "id": "CPL0329",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, lay your fingertips on {target}'s shoulder. Now trace — slow as a secret — down the full length of their arm to the wrist. You have one full minute. Chase every goosebump you raise.",
    "target": "other"
  },
  {
    "id": "CPL0330",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{target}, feeling lives somewhere in your body — not just in your mind. Take {actor}'s hand. Press it to where joy sits in you. Then move it to where fear hides. No words. Just placement.",
    "target": "other"
  },
  {
    "id": "CPL0331",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, lie behind {target}. Curve your body into theirs until every gap closes. Breathe into the back of their neck — warm, slow, deliberate. Stay exactly like this for two full minutes.",
    "target": "other"
  },
  {
    "id": "CPL0332",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, place a piece of ice between your lips. Glide it down {target}'s collarbone — unhurried, precise. When it melts, follow the cold trail with warm breath. Let them feel the contrast.",
    "target": "other"
  },
  {
    "id": "CPL0333",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{actor}, look at {target} and ask: \"What have you wanted me to do to you that you've never said out loud? Don't soften it. I want the real answer.\"",
    "target": "other"
  },
  {
    "id": "CPL0334",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, blindfold {target}. Now touch them — fingertips, the back of your hand, the brush of your hair. Each time, they name what they feel. No talking from you. Let your touch speak.",
    "target": "other"
  },
  {
    "id": "CPL0335",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, cup {target}'s face in your hands. Now use just your thumb — slow, unhurried — across their forehead, down the ridge of their cheekbone, along the line of their jaw. Watch their eyes fall shut.",
    "target": "other"
  },
  {
    "id": "CPL0336",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{target}, look at {actor} and tell them: the fantasy you carry that you've never mentioned. Not the safe version. The one that crosses your mind and makes you feel something you can't name.",
    "target": "other"
  },
  {
    "id": "CPL0337",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, take {target}'s hands in yours. Work them slowly — palm, each finger, every knuckle — for three full minutes. People forget hands hold tension too. You won't forget.",
    "target": "other"
  },
  {
    "id": "CPL0338",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, undress {target} — teeth and one hand. The other stays flat on their chest. Feel their heartbeat. Notice when it quickens. Let that tell you how you're doing.",
    "target": "other"
  },
  {
    "id": "CPL0339",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "{actor}, ask {target}: \"What's the lightest touch that still makes your body respond? Show me exactly where. Place my hand there yourself.\"",
    "target": "other"
  },
  {
    "id": "CPL0340",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "Face each other. {actor}, rest both hands at the base of {target}'s spine. Now move — vertebra by vertebra — all the way up. Three slow passes. No words. Just the language of pressure.",
    "target": "other"
  },
  {
    "id": "CPL0341",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, take {target}'s face in both hands. Hold their gaze — no looking away, no laughter — for 60 full seconds. When the silence breaks, whisper what you see in them right now.",
    "target": "other"
  },
  {
    "id": "CPL0342",
    "chapter": "intimate",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{target}, look at {actor} and ask: \"When do you feel most wanted by me? Not loved — wanted. Which moment do you still replay?\"",
    "target": "other"
  },
  {
    "id": "CPL0343",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, lay {target} face down. Find the top of their spine. Kiss down it — one vertebra at a time, lips pressing in. Move only when you're ready. Stop when they make a sound.",
    "target": "other"
  },
  {
    "id": "CPL0344",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, warm oil between your palms and set them on {target}'s shoulders. Find where they hold their weight. Work it loose. Breathe with them. Make them feel someone is paying attention.",
    "target": "other"
  },
  {
    "id": "CPL0345",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{actor}, ask {target}: \"What do I do — not in bed, just in life — that makes you feel genuinely loved? I don't mean turned on. I mean safe. Seen. Name it.\"",
    "target": "other"
  },
  {
    "id": "CPL0346",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, kneel beside {target}. One hand anchors — flat, still, grounding. The other roams: shoulder, ribs, hip, thigh. Slow. The stationary hand is the promise. The moving one is the question.",
    "target": "other"
  },
  {
    "id": "CPL0347",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, bring your lips close to {target}'s neck — not touching, just close enough that your breath lands on skin. Move along their shoulder. No hands. Only heat and breath. Count to 30.",
    "target": "other"
  },
  {
    "id": "CPL0348",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{target}, tell {actor}: when you picture their hands on you — not now, alone somewhere, eyes closed — where do your thoughts go first? Tell them exactly.",
    "target": "other"
  },
  {
    "id": "CPL0349",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, stay still. {target} has 90 seconds to explore — hands, arms, shoulders — and you receive it without moving. Then switch. The rule: whoever is being touched cannot touch back. Only feel.",
    "target": "other"
  },
  {
    "id": "CPL0350",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, sit behind {target}. Wrap your arms fully around them. Let them lean back into you — all of their weight, all of yours. Feel their chest rise. Feel it fall. Two minutes of just this.",
    "target": "other"
  },
  {
    "id": "CPL0351",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{actor}, ask {target}: \"What runs through your mind when you realize I've been watching you — not for a second, but actually watching? What do you tell yourself?\"",
    "target": "other"
  },
  {
    "id": "CPL0352",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, draw something on {target}'s inner arm with one fingertip. Slow, deliberate strokes. When you're done, let them guess what you traced. They only get one answer.",
    "target": "other"
  },
  {
    "id": "CPL0353",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, take {target}'s wrist. Press your lips to the inside of it — slow enough to feel their pulse. Then the other. When you lift your mouth, whisper something you've been holding back.",
    "target": "other"
  },
  {
    "id": "CPL0354",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{target}, ask {actor}: \"Which part of me do you find yourself craving when I'm not there? Be specific. Don't be polite about it.\"",
    "target": "other"
  },
  {
    "id": "CPL0355",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, set your hands on {target}'s waist. Glide them up both sides of their body — slow, even pressure. Watch. Note where they react. Then do it again, slower, and linger exactly there.",
    "target": "other"
  },
  {
    "id": "CPL0356",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, rest your hand on {target}'s lower back. Move in slow circles — light enough to feel like a question. Tell them: \"Say something when it feels good.\" Then follow their voice.",
    "target": "other"
  },
  {
    "id": "CPL0357",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{actor}, ask {target}: \"When I wasn't with you — have you pictured my hands on you? When? Tell me what you were imagining. Don't leave anything out.\"",
    "target": "other"
  },
  {
    "id": "CPL0358",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, blindfold {target}. Kiss their forehead. Their cheek. The line of their jaw. Their throat. Everywhere your lips can reach — except their mouth. Make that absence loud.",
    "target": "other"
  },
  {
    "id": "CPL0359",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, take {target}'s feet in your hands. Five full minutes — the arch, the heel, the space between each toe. Press slowly. Most people never offer this. You will. Watch what it does to them.",
    "target": "other"
  },
  {
    "id": "CPL0360",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{target}, look at {actor} and tell them: the exact way you love being touched. Not the polite version — the real one. Pressure, pace, placement. Spare nothing.",
    "target": "other"
  },
  {
    "id": "CPL0361",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, lie on top of {target}. No movement. Just your weight settling into them. Let them breathe you in. Feel their chest rise beneath you. Two minutes. Still.",
    "target": "other"
  },
  {
    "id": "CPL0362",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, set both hands on {target}'s shoulders and neck. Work them — full grip, deliberate pressure — and ask quietly: \"Does this feel good?\" Change what you're doing based on their answer. Follow them.",
    "target": "other"
  },
  {
    "id": "CPL0363",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{actor}, ask {target}: \"What scares you about letting go completely with me? Not what stops you — what would need to be true for you to feel safe enough?\"",
    "target": "other"
  },
  {
    "id": "CPL0364",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, take {target}'s hands between yours. Hold them there, warming them, for a full minute. Then guide their hands — slowly — to their own face. Let them feel what you feel when you touch them.",
    "target": "other"
  },
  {
    "id": "CPL0365",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, kneel in front of {target}. Take their hands and press them flat against your chest, over your heart. Don't speak. Don't move. Let them feel what they do to you.",
    "target": "other"
  },
  {
    "id": "CPL0366",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, place your hands at {target}'s collarbone and move them slowly down the body. Stop at three places. At each one, say why you linger there. What you notice. What it means to you.",
    "target": "other"
  },
  {
    "id": "CPL0367",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{target}, ask {actor}: \"What part of my body turns you on that I would never guess? The thing you notice when you think I'm not looking.\"",
    "target": "other"
  },
  {
    "id": "CPL0368",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, undress {target} — one piece at a time. Before each item comes off, press your lips to the skin about to be revealed. Then say what you're thinking. Out loud. Every time.",
    "target": "other"
  },
  {
    "id": "CPL0369",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, place one fingertip at {target}'s collarbone. Draw a single unbroken line — down the center of their body — to their hip. You have two full minutes. Make the slowness unbearable.",
    "target": "other"
  },
  {
    "id": "CPL0370",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{actor}, ask {target}: \"What about your desire would you tell no one else — but want me to know? The part that feels too much to say. Say it anyway.\"",
    "target": "other"
  },
  {
    "id": "CPL0371",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, {target} lies still. Start at their neck with your lips. Move down — slow, deliberate — across their chest. Each kiss lands like a question you already know the answer to.",
    "target": "other"
  },
  {
    "id": "CPL0372",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, place both hands somewhere on {target}'s body. Before you move, ask quietly: \"Can you feel me here?\" Wait for their answer — really wait — then move on. Do this until they stop wanting you to.",
    "target": "other"
  },
  {
    "id": "CPL0373",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{target}, face {actor} and tell them: what they've never done to you that you've been waiting for. Not a hint. A clear answer. They've been waiting to be told.",
    "target": "other"
  },
  {
    "id": "CPL0374",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, set warm hands on {target}'s thighs. Work them in slow, deliberate strokes — from knee toward hip. Take your time. Feel where their breath catches. Go slower there.",
    "target": "other"
  },
  {
    "id": "CPL0375",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, blindfold {target}. Touch them — with your hand, your lips, something soft from the room. Each time, they guess what they feel. You tell them only if they're right. Make them concentrate.",
    "target": "other"
  },
  {
    "id": "CPL0376",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{actor}, ask {target}: \"When do you feel most alive in your body — not happy, not safe, alive — and I'm there with you? What are we doing? Where are we?\"",
    "target": "other"
  },
  {
    "id": "CPL0377",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, lie against {target}. Every curve of you finds every curve of them. Adjust. Shift. Press. Your body is the question. Theirs is the answer. Not a word.",
    "target": "other"
  },
  {
    "id": "CPL0378",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, your lips find the inside of {target}'s arm — soft skin, blue vein, barely there. While your mouth works, your hand circles their back. Two sensations at once. Watch what {target}'s breath does. Watch it carefully.",
    "target": "other"
  },
  {
    "id": "CPL0379",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{target}, look at {actor} and ask them this: which moment with me do you replay when you're alone and no one is watching?",
    "target": "other"
  },
  {
    "id": "CPL0380",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, your breath is warm. Let it fall on {target}'s shoulders, across their upper back — then trade it for your fingertips. Breath. Then touch. Back and forth. Slow. Watch which one makes them still.",
    "target": "other"
  },
  {
    "id": "CPL0381",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, undress {target} one piece at a time. Between each — stop. Name what their body does to you. What it makes you feel. What it makes you want. Speak it out loud. Then remove the next.",
    "target": "other"
  },
  {
    "id": "CPL0382",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{actor}, hold {target}'s gaze and ask: if I touched you somewhere no one has ever reached — where would that be?",
    "target": "other"
  },
  {
    "id": "CPL0383",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, {target}'s back belongs to you now. Start with your palms. Then your forearms. Then breath — close, hot, deliberate. Build the pressure one layer at a time. Then release it all at once.",
    "target": "other"
  },
  {
    "id": "CPL0384",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, press your mouth to {target}'s and stay there. Your hands move down their back — slow, steady, setting the pace. The kiss doesn't break. Your hands decide the rhythm. Let them.",
    "target": "other"
  },
  {
    "id": "CPL0385",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{target}, tell {actor} the one thing they need to do — or not do — for you to feel completely safe in their hands. Not what you think they want to hear. The true thing.",
    "target": "other"
  },
  {
    "id": "CPL0386",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, {target} goes still. You explore them with fingertips only — five full minutes. No words. No rush. Pure curiosity. Learn what you haven't paid attention to. Learn what makes them hold their breath.",
    "target": "other"
  },
  {
    "id": "CPL0387",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, begin at {target}'s lower back. Both hands, slow glide upward. Then back down. Again — and this time, press your lips to their skin on the way. Add a kiss every pass. Let it build.",
    "target": "other"
  },
  {
    "id": "CPL0388",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, ask {target} the question they've been waiting for: what does your body want from me that you've been too afraid to say out loud?",
    "target": "other"
  },
  {
    "id": "CPL0389",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, circle {target} where they stand. Slow. They feel your movement before your touch. Find the places no one remembers — inner wrist, the ridge of a collarbone, the soft space between two ribs. Each one deserves your full attention.",
    "target": "other"
  },
  {
    "id": "CPL0390",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, pull {target} into a deep kiss and guide their hands over your body. Show them. No guessing, no hinting — show them exactly where you want to be touched. Breathe together. Let that be the answer.",
    "target": "other"
  },
  {
    "id": "CPL0391",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{target}, tell {actor}: when do you feel most exposed with them — and what is the thing you fear they might judge?",
    "target": "other"
  },
  {
    "id": "CPL0392",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, undress {target} completely. Never look away. Every new inch of skin — you acknowledge it. Your hands, your eyes, your presence. Make it known that you see them.",
    "target": "other"
  },
  {
    "id": "CPL0393",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, press skin to skin with {target}. Every point of contact is information. Move slow enough to feel all of it — the heat, the weight, the shift in your own breath. Stay there.",
    "target": "other"
  },
  {
    "id": "CPL0394",
    "chapter": "intimate",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, ask {target} what they've wondered but never dared to ask: what runs through my mind when I'm fully inside this moment with you?",
    "target": "other"
  },
  {
    "id": "CPL0395",
    "chapter": "intimate",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, pull {target} close and stop moving. No talking. Breathe. Feel their chest rise against yours. Stay until the rhythm between you settles into something shared.",
    "target": "other"
  },
  {
    "id": "CPL0396",
    "chapter": "intimate",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{target}, look at {actor} and ask them this: what just happened inside you that caught you off guard?",
    "target": "other"
  },
  {
    "id": "CPL0397",
    "chapter": "intimate",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, rest your forehead against {target}'s. Stay. Feel the warmth of them this close. Let the silence do what words can't. Don't move until it settles.",
    "target": "other"
  },
  {
    "id": "CPL0398",
    "chapter": "intimate",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{actor}, ask {target}: what do you want me to carry with me from tonight — the one thing you need me to remember?",
    "target": "other"
  },
  {
    "id": "CPL0399",
    "chapter": "intimate",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, find {target}'s chest and trace slow circles there — warm, unhurried. Match your breath to theirs. Let everything wind down together, just the two of you, at the same pace.",
    "target": "other"
  },
  {
    "id": "CPL0400",
    "chapter": "erotic",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{actor}, ask {target} the question that lives under everything: have you fantasized about control — taking it, or surrendering it? Tell me what it feels like in your body when you imagine it.",
    "target": "other"
  },
  {
    "id": "CPL0401",
    "chapter": "erotic",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, place {target} exactly where you want them. Lean in close — close enough that they feel your breath — and say it: \"I'm going to touch you exactly how I decide.\" Then wait. Don't move. Let that land.",
    "target": "other"
  },
  {
    "id": "CPL0402",
    "chapter": "erotic",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{target}, look at {actor} and tell them: what thrills you about giving up control — and what is the thing that makes it feel safe enough to let go?",
    "target": "other"
  },
  {
    "id": "CPL0403",
    "chapter": "erotic",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, lay {target} face-up. Blindfold them — darkness first. Lean close to their ear and say: \"you won't see what's coming.\" Then place one fingertip on their collarbone. Hold it there. Don't move yet.",
    "target": "other"
  },
  {
    "id": "CPL0404",
    "chapter": "erotic",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, ask {target} what they've been afraid to admit: what is one thing you want to try that scares you a little — and what would make it feel safe enough to try with me?",
    "target": "other"
  },
  {
    "id": "CPL0405",
    "chapter": "erotic",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, undress slowly. {target} watches — that's the dare. Take your time with every piece. Your body builds the ache before your hands ever reach theirs. Make them wait for it.",
    "target": "other"
  },
  {
    "id": "CPL0406",
    "chapter": "erotic",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, an ice cube between your teeth. Trail it across {target}'s neck, along their collarbone, deliberate and slow. Then chase every cold line with the heat of your breath. Watch them react to both.",
    "target": "other"
  },
  {
    "id": "CPL0407",
    "chapter": "erotic",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{target}, look at {actor} and ask them this: which part of me do you want to claim as yours?",
    "target": "other"
  },
  {
    "id": "CPL0408",
    "chapter": "erotic",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, bind {target}'s wrists with a soft scarf — loose enough to slip free, tight enough to mean something. Then kiss them. They cannot touch you back. One full minute of that. Then release.",
    "target": "other"
  },
  {
    "id": "CPL0409",
    "chapter": "erotic",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, your mouth at {target}'s ear. Speak low, direct: \"don't move.\" Then wait. \"Eyes closed.\" Then wait. \"Breathe when I tell you.\" Every word is a command. Every touch that follows keeps the promise.",
    "target": "other"
  },
  {
    "id": "CPL0410",
    "chapter": "erotic",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, ask {target} the question that has no safe answer: what would you let me do to you that you've never let anyone else?",
    "target": "other"
  },
  {
    "id": "CPL0411",
    "chapter": "erotic",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, seat {target} with their back to you. They can't see your hands. That's the point. Map them slowly — where you choose, when you choose. Every touch is a surprise. Let the not-knowing build.",
    "target": "other"
  },
  {
    "id": "CPL0412",
    "chapter": "erotic",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, drag your nails down {target}'s back. Slow. Firm enough to feel it, firm enough to leave a trace. Then lean close and ask, quiet: \"do you like that?\" Wait for their answer. All of it.",
    "target": "other"
  },
  {
    "id": "CPL0413",
    "chapter": "erotic",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{target}, tell {actor}: when you picture them taking charge — the moment it begins — what is the very first thing they do?",
    "target": "other"
  },
  {
    "id": "CPL0414",
    "chapter": "erotic",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, one fingertip on {target}'s skin — their back, their thigh. Write a word there, slow enough to be felt. Make them guess. Watch their face while they try.",
    "target": "other"
  },
  {
    "id": "CPL0415",
    "chapter": "erotic",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, pull {target} into a kiss and press them back against the wall. Your body pins theirs. Let them feel the full weight of your intention. Hold it.",
    "target": "other"
  },
  {
    "id": "CPL0416",
    "chapter": "erotic",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, look at {target} and ask without softening it: how much power do you want me to have over your pleasure?",
    "target": "other"
  },
  {
    "id": "CPL0417",
    "chapter": "erotic",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, kneel between {target}'s legs. Your hands and mouth work slow — no rushing, no destination. Return to each place twice. Make what they expected feel new the second time.",
    "target": "other"
  },
  {
    "id": "CPL0418",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, {target}'s neck and collarbone, and nothing else. Mouth only — teeth, lips, tongue, in whatever order you choose. All of your attention, right there. Let them feel what it's like to be the only thing you're thinking about.",
    "target": "other"
  },
  {
    "id": "CPL0419",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{target}, ask {actor} what they've swallowed back until now: what have you wanted to do to me — and never asked?",
    "target": "other"
  },
  {
    "id": "CPL0420",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, straddle {target} and don't touch them yet. Your hands move over their body — you decide where, you decide how long. They watch. They wait. Make them feel every inch of the delay.",
    "target": "other"
  },
  {
    "id": "CPL0421",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, {target} is blindfolded — darkness makes everything louder. Hot breath on their skin. Then the shock of ice. Then warm fingertips trailing after. Rotate without warning. Keep them from knowing what comes next.",
    "target": "other"
  },
  {
    "id": "CPL0422",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, ask {target} what they haven't said yet: what does your body crave that I haven't given you?",
    "target": "other"
  },
  {
    "id": "CPL0423",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, take {target}'s wrists and press them above their head — your hands, or a scarf, your call. Hold them there. Kiss them while they're pinned. They don't touch back. That's the whole point.",
    "target": "other"
  },
  {
    "id": "CPL0424",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, your mouth on {target}'s and your hands sliding down their sides at the same time. Both sensations running together — don't let one stop when the other starts. Make them feel you everywhere at once.",
    "target": "other"
  },
  {
    "id": "CPL0425",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{target}, tell {actor} what they don't know they've given you: which moment between you lives in your head when you're alone?",
    "target": "other"
  },
  {
    "id": "CPL0426",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, lie over {target} and anchor them with your hips. Move slow — weight, pressure, intention. You're in control. If they shift, you hold. Stay until they stop trying.",
    "target": "other"
  },
  {
    "id": "CPL0427",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, put your mouth against {target}'s ear and let filth fall from your lips — slow, deliberate, chosen. Your hands stay soft the whole time. Tender palms. Cruel words. Watch the shiver where those two things collide.",
    "target": "other"
  },
  {
    "id": "CPL0428",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, lean in and ask {target} this: rougher or slower? Make them answer out loud. Not a guess — your body's been asking all night, and Lyra wants to hear the answer in words.",
    "target": "other"
  },
  {
    "id": "CPL0429",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, lay {target} face-down. Climb over them. Let your weight settle onto their back — every pound of you pressing them into the surface. Pin their wrists flat. Lower your mouth to the back of their neck and stay there.",
    "target": "other"
  },
  {
    "id": "CPL0430",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, drag one hand across {target}'s chest like you have all the time left in the world. Slower than slow. Let them feel the ridge of every knuckle, the heat of your palm, the unbearable pause before you move again.",
    "target": "other"
  },
  {
    "id": "CPL0431",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{target}, look at {actor} and tell them: what would it take to make you lose yourself completely right now? Not someday. Tonight. Name it.",
    "target": "other"
  },
  {
    "id": "CPL0432",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, lay {target} flat and lower yourself onto them — chest on chest, hip on hip, full contact. Now move. Shift your weight until they understand, without a single word, exactly who holds the tempo here.",
    "target": "other"
  },
  {
    "id": "CPL0433",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, trail your nails down {target}'s body first — sharp enough to mark the skin. Then the same path with fingertips. Then flat palms. Three textures, one body, zero warning. Keep them guessing every time.",
    "target": "other"
  },
  {
    "id": "CPL0434",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, ask {target} this — and hold their gaze while they answer: where's your edge? What's too far, and what hasn't gone nearly far enough?",
    "target": "other"
  },
  {
    "id": "CPL0435",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, put your lips to {target}'s ear and start issuing orders. Arch your back. Close your eyes. Not yet. Your voice is the command, your hands are the enforcement. Make them obey both.",
    "target": "other"
  },
  {
    "id": "CPL0436",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, {target} keeps every stitch of clothing on. That's the game. Kiss them through the fabric — neck, chest, wherever the hunger takes you. Let them feel exactly how much you want what's underneath without uncovering a single inch.",
    "target": "other"
  },
  {
    "id": "CPL0437",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{target}, tell {actor} the truth: what would shatter their self-control right now? Lyra already suspects you know. Say it anyway.",
    "target": "other"
  },
  {
    "id": "CPL0438",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, start at {target}'s inner thigh. Kiss them there — soft, unhurried, maddening. Work upward one centimeter at a time. Don't go higher until they say the word. Make them earn it.",
    "target": "other"
  },
  {
    "id": "CPL0439",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, press something cold against {target}'s ribs — hold it there long enough that they gasp. Then replace it immediately with your warm breath on their neck. Cold skin, hot air. Do it again. Make them anticipate the switch before it comes.",
    "target": "other"
  },
  {
    "id": "CPL0440",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, ask {target} this while you're still this close: what's the one thing Lyra could make you do right now that would make you lose every last thread of control? Say it out loud.",
    "target": "other"
  },
  {
    "id": "CPL0441",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, take {target}'s hand and guide it — place it exactly where you want it, at the pressure you want it. Watch their face. Then take that same touch and return it to them, exactly. A confession in motion.",
    "target": "other"
  },
  {
    "id": "CPL0442",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, pull {target} into a deep kiss and guide their legs around you while your mouths are still locked. Mouth and body moving as one system. When both are wrapped around you, you'll know.",
    "target": "other"
  },
  {
    "id": "CPL0443",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{target}, ask {actor} the thing they've been sitting on all night: what's the most intense thing you've been dying to do to me? Lyra wants the answer, not the edited version.",
    "target": "other"
  },
  {
    "id": "CPL0444",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, push into {target}. Slowly — every inch deliberate. Let them feel the arrival of each one. Then find a rhythm: steady, building, relentless as a tide. Don't rush what this moment deserves.",
    "target": "other"
  },
  {
    "id": "CPL0445",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, ask {target} while you're inside them: do you feel me? All of me? Don't let them nod. Make them say it — exactly what they feel, in their own words, right now.",
    "target": "other"
  },
  {
    "id": "CPL0446",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, roll {target} face-down. Pin their wrists above their head — one hand is enough. Move into them with slow, unrelenting pressure. When they squirm, hold tighter. They don't move until you say.",
    "target": "other"
  },
  {
    "id": "CPL0447",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, bury yourself deep inside {target} and stop. Don't move. Feel their pulse against yours — two heartbeats racing in the same stillness. Whisper something true. Then begin again, slower than before.",
    "target": "other"
  },
  {
    "id": "CPL0448",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{target}, tell {actor} — not with softness, with precision: right now, what is your body screaming for them to do? Lyra is listening. So is {actor}.",
    "target": "other"
  },
  {
    "id": "CPL0449",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, lay {target} on their back and watch their face as you move inside them. That face is your instrument. Speed up when it tightens, slow when it opens. Give them exactly what their expression is asking for.",
    "target": "other"
  },
  {
    "id": "CPL0450",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, flip {target} mid-motion — new angle, sudden weight shift, same depth. Don't warn them. Let the change crash through them like a wave breaking. Read the sound they make when it hits.",
    "target": "other"
  },
  {
    "id": "CPL0451",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, mouth against {target}'s ear: am I where you want me? Deep enough? Hard enough? Don't guess — let them tell you what this body needs, right now, with the lights on.",
    "target": "other"
  },
  {
    "id": "CPL0452",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, climb on top of {target} and take the pace. Set the depth, set the rhythm, own it completely. Use their body like it was made for yours. Let them watch you take exactly what you want.",
    "target": "other"
  },
  {
    "id": "CPL0453",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, link your body's rhythm to your breath. Push on the inhale. Draw back on the exhale. Find the pattern and hold it. Pull {target}'s breathing into yours until you can't tell whose lungs are whose.",
    "target": "other"
  },
  {
    "id": "CPL0454",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{target}, ask {actor} what runs through their head when they're buried inside you. Lyra suspects it's not nothing. Make them say it while they're still there.",
    "target": "other"
  },
  {
    "id": "CPL0455",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, pull out of {target} and bring your mouth to theirs — let them taste themselves on your lips. Don't end the kiss. Slide back in without breaking it. Two sensations, one unbroken moment.",
    "target": "other"
  },
  {
    "id": "CPL0456",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, take your pleasure from {target}'s body and let them watch every second of it. Don't perform it — let it be real. Show them what they do to you. Don't let their eyes leave your face.",
    "target": "other"
  },
  {
    "id": "CPL0457",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, lean down and ask {target} the obvious question — the one their body already answered: can you feel how badly I want you right now? Make them say yes out loud.",
    "target": "other"
  },
  {
    "id": "CPL0458",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, move through {target} at a pace so slow it almost becomes unbearable. No speed. Only control. Let the heat build through patience, not urgency. Hold that pace until they're trembling to get more.",
    "target": "other"
  },
  {
    "id": "CPL0459",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, wrap both arms around {target} — full embrace, skin pressed to skin everywhere it can be. Move without pulling apart. Hold them so close there's no space left between you. Stay there.",
    "target": "other"
  },
  {
    "id": "CPL0460",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{target}, tell {actor} what would make you completely surrender — not eventually, right now. What's the one thing they could do in this moment that would dissolve every last wall you're holding up?",
    "target": "other"
  },
  {
    "id": "CPL0461",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, give {target} the control. When they move, follow. When they go still, stop. When they hold their breath, hold yours. Let them be the only thing setting the rhythm. Follow completely.",
    "target": "other"
  },
  {
    "id": "CPL0462",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, begin slowly and track {target}'s breath like a map. When it sharpens — when it catches in their throat — shift the angle, change the tempo. Read every breath like a command and push them past the point of holding back.",
    "target": "other"
  },
  {
    "id": "CPL0463",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, ask {target} how close they are. Then tell them: don't answer with words. Show you.",
    "target": "other"
  },
  {
    "id": "CPL0464",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, hold {target} perfectly still — hands on their hips, weight against them, no movement allowed. Then move yourself. They feel everything and give nothing back. Full surrender. Just sensation.",
    "target": "other"
  },
  {
    "id": "CPL0465",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, find {target}'s neck and shoulders as you move and use your mouth — lips first, then teeth. Don't be careful. Leave evidence. Make them feel the marks for days.",
    "target": "other"
  },
  {
    "id": "CPL0466",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{target}, ask {actor} what they see when they look at you right now. Not the answer they'd give sober at dinner. The one they're thinking with their hands on your skin.",
    "target": "other"
  },
  {
    "id": "CPL0467",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, reduce yourself to a tease — barely moving, barely giving. Make {target} feel the absence of what they want. Wait. When they ask for more, make them say exactly what more means. Then, and only then.",
    "target": "other"
  },
  {
    "id": "CPL0468",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, let the control go. All of it. Move into {target} with the full weight of your hunger — nothing held back, nothing managed. Let them feel what you've been containing all night.",
    "target": "other"
  },
  {
    "id": "CPL0469",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, tell {target} they can come — but first they have to say out loud that they want to. Lyra needs to hear the words. So do you.",
    "target": "other"
  },
  {
    "id": "CPL0470",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, push {target} toward the edge — read them until they're right at the threshold — then pull back. When they steady, build again. Hold them there, trembling between ruin and release, until Lyra says otherwise.",
    "target": "other"
  },
  {
    "id": "CPL0471",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{target}, put your hand on {actor}'s chest and say it plainly: I want to feel all of you. Don't hold anything back. Lyra wants them to hear it from your mouth.",
    "target": "other"
  },
  {
    "id": "CPL0472",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, drop every last restraint. Match {target} sound for sound, motion for motion, and then exceed them. Crash into them like you've been waiting all night to stop being careful.",
    "target": "other"
  },
  {
    "id": "CPL0473",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, hold {target} while they come apart. Both arms, full body, close enough to feel every tremor. Don't let them turn away. Make them feel seen at exactly the moment they can't control what's showing.",
    "target": "other"
  },
  {
    "id": "CPL0474",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, press your forehead to {target}'s and ask the question you already know the answer to: can you feel how much I need this — with you? Make them answer while they're still breathing hard.",
    "target": "other"
  },
  {
    "id": "CPL0475",
    "chapter": "erotic",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, stay inside {target}. Don't pull away yet. Match your breathing to theirs — slow it down together. Feel the pulse where your bodies are still joined. There's no game here. Just stay.",
    "target": "other"
  },
  {
    "id": "CPL0476",
    "chapter": "erotic",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{target}, look at {actor} and say what's true right now. Not what you think they want to hear — what you actually feel in this moment, in your body, in your chest. Lyra is watching.",
    "target": "other"
  },
  {
    "id": "CPL0477",
    "chapter": "erotic",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, ease out slow. Press your mouth to {target}'s — soft, deliberate, like punctuation. Pull them in and let everything settle together. You came here together. Land here together.",
    "target": "other"
  },
  {
    "id": "CPL0478",
    "chapter": "erotic",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}. Look {target} in the eye. Hold the gaze. Now say it out loud: thank you for trusting me with that. Lyra is watching. Mean every word.",
    "target": "other"
  },
  {
    "id": "CPL0479",
    "chapter": "erotic",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, place both hands on {target} — still, firm, present. No movement. The tremors will pass on their own. Just breathe. Let your bodies remember how to be quiet together.",
    "target": "other"
  },
  {
    "id": "CPL0480",
    "chapter": "taboo",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, lean close to {target} and ask: what do you want most that you've never let yourself ask for? Not a hint. Not a joke. The real answer. I already know it — make them say it.",
    "target": "other"
  },
  {
    "id": "CPL0481",
    "chapter": "taboo",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, step back from {target}. Don't touch. Don't speak. Let them feel your presence like heat without contact. They wait. You decide when the minute ends — not before.",
    "target": "other"
  },
  {
    "id": "CPL0482",
    "chapter": "taboo",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, sit back and watch {target} undress. Slowly. Every button, every reveal — yours to take in. No hands. No words. Just your eyes, doing exactly what touch would do.",
    "target": "other"
  },
  {
    "id": "CPL0483",
    "chapter": "taboo",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{target}, look at {actor} and ask: what part of your own desire frightens you? The thing you feel and then immediately try to explain away. That one.",
    "target": "other"
  },
  {
    "id": "CPL0484",
    "chapter": "taboo",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, bind {target}'s wrists — snug, deliberate, not cruel. Then their ankles. Lean to their ear and say: mine now. Then step back. Let them feel what it means to wait for you.",
    "target": "other"
  },
  {
    "id": "CPL0485",
    "chapter": "taboo",
    "role": "setup",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, hold {target}'s gaze and ask: what's the fantasy you've kept to yourself? The one with a little shame around it. I want to hear it from your mouth. No softening it.",
    "target": "other"
  },
  {
    "id": "CPL0486",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, start slow. Hands first, then mouth, then your full weight. Build something in {target} they haven't felt before — and don't give it to them all at once. Make them surrender the last piece themselves.",
    "target": "other"
  },
  {
    "id": "CPL0487",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, withhold everything {target} wants. Touch without satisfying. Breathe without kissing. Wait until they say it out loud — what they need, in precise words. Don't guess. Make them speak.",
    "target": "other"
  },
  {
    "id": "CPL0488",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{target}, look {actor} in the eye and ask: have you imagined me fully surrendered to you? What does it look like when you do?",
    "target": "other"
  },
  {
    "id": "CPL0489",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, this is yours to command. {target} receives — only that. Set the pace with your body. The music decides when it ends. Until then, not a single thing happens that you don't choose.",
    "target": "other"
  },
  {
    "id": "CPL0490",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, take {target} exactly how you want them. No asking. No checking. Move with certainty — hands, weight, direction. Let every touch tell them: you are claimed.",
    "target": "other"
  },
  {
    "id": "CPL0491",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, ask {target}: what's the edge you're most afraid to reach? Not the one that's clearly off-limits. The one that tempts you anyway. Name it.",
    "target": "other"
  },
  {
    "id": "CPL0492",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, pull {target} in by the hair — a fistful, firm at the root. Kiss them like you're taking something. Then find their neck. Leave a mark they'll feel tomorrow. Brand them.",
    "target": "other"
  },
  {
    "id": "CPL0493",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, bring {target} to their knees. Guide them by touch, not words. Use their mouth the way your body demands. Let them taste exactly how much you want this.",
    "target": "other"
  },
  {
    "id": "CPL0494",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{target}, say it to {actor}'s face: I want you to own me. Completely. Show me what that means to you — don't hold the answer back.",
    "target": "other"
  },
  {
    "id": "CPL0495",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, position {target} facing the mirror — you behind them. Keep them there. Make them watch what happens to their own face. Don't let them look away.",
    "target": "other"
  },
  {
    "id": "CPL0496",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, move inside {target} without hurry. Then lean to their ear — soft voice, slow breath — and say what you want to do to them. Keep your voice low. Let your body contradict it.",
    "target": "other"
  },
  {
    "id": "CPL0497",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, ask {target}: when you picture me in your mind — the private version, the one you keep — what am I doing that you feel you shouldn't want?",
    "target": "other"
  },
  {
    "id": "CPL0498",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, lay {target} face-down. Lower your weight onto them — slow, deliberate. Pin them with your presence. Both hands free to roam wherever you decide. They only feel.",
    "target": "other"
  },
  {
    "id": "CPL0499",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, push into {target} and hold their eyes the entire time. No looking away — not yours, not theirs. Let them watch your face as you feel them. Make it witnessed.",
    "target": "other"
  },
  {
    "id": "CPL0500",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, stop imagining it. Take {target} exactly the way the fantasy goes — the one you've replayed. Need over caution. Appetite over performance. Make the real thing outrun the memory.",
    "target": "other"
  },
  {
    "id": "CPL0501",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{target}, tell {actor} — out loud, direct — what the filthiest thing is you want them to do to you. No euphemisms. Lyra is listening. So is {actor}.",
    "target": "other"
  },
  {
    "id": "CPL0502",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, flip {target} onto their back and settle your weight over them. Let them feel you — chest, hips, thighs — before anything else happens. Presence first. Power second.",
    "target": "other"
  },
  {
    "id": "CPL0503",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, push {target} to the edge with rhythm, with pressure, with your voice — and then command them to let go. Keep everything going. Don't relent until they obey.",
    "target": "other"
  },
  {
    "id": "CPL0504",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, ask {target}: do you want more of my control? Be specific. What does that look like — in your body, in your mind — when you imagine it going further?",
    "target": "other"
  },
  {
    "id": "CPL0505",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, take {target} from behind. One hand tangled in their hair. The other — let them guide it to where they need it most. Whisper something low in their ear. Don't stop until the music does.",
    "target": "other"
  },
  {
    "id": "CPL0506",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, use {target}'s body without pause, without apology. No softening the edges. Let your want build to its full volume — and don't turn it down for anyone.",
    "target": "other"
  },
  {
    "id": "CPL0507",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{target}, ask {actor}: what turns you on most about having total control over me? Not in general — right now, this moment. What does it feel like in your body when you take it?",
    "target": "other"
  },
  {
    "id": "CPL0508",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, find the pace {target} is craving — then drop it just below. Hold them at the threshold. Let the wanting build until they say the words. Then, and only then, give them more.",
    "target": "other"
  },
  {
    "id": "CPL0509",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, pin {target} — wrists, hips, whatever it takes — so they cannot move. Hold them there. Use them exactly how you want. This is what full control feels like.",
    "target": "other"
  },
  {
    "id": "CPL0510",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, finish inside {target} — hard, deep, nothing held back. Let them feel every pulse, every wave. Give them all of it. This is what it looks like when you don't protect them from your need.",
    "target": "other"
  },
  {
    "id": "CPL0511",
    "chapter": "taboo",
    "role": "interaction",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, ask {target}: was that what you wanted? Be honest. Did it reach the part of you that needed reaching — or is there more still waiting?",
    "target": "other"
  },
  {
    "id": "CPL0512",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, lay back and bring {target} on top of you. Watch their face as they move — every shift, every tell. Steer the pace with your hands on their hips. You're still in charge. They just don't have to know it yet.",
    "target": "other"
  },
  {
    "id": "CPL0513",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, mid-scene — take the power back. Use your weight, your hands, your will. Keep moving through the shift. Keep {target} off-balance, re-orienting, unable to settle into anything but you.",
    "target": "other"
  },
  {
    "id": "CPL0514",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{target}, look at {actor} and say it: that's exactly what I needed. You knew without being told. Thank you for knowing.",
    "target": "other"
  },
  {
    "id": "CPL0515",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, don't let {target} rest. The first peak is done — now build the next one. Immediately. Hands, mouth, weight, rhythm. Show them this has no natural end except the one you choose.",
    "target": "other"
  },
  {
    "id": "CPL0516",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, keep moving through {target}'s climax — don't pause, don't soften, don't give them room to come down. Let one wave roll straight into the next. Hold them in it.",
    "target": "other"
  },
  {
    "id": "CPL0517",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, slow just enough to look at {target} — really look — and ask: can you feel how much you mean to me right now? This isn't rhetorical. Wait for the answer.",
    "target": "other"
  },
  {
    "id": "CPL0518",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, take the scene back. Whatever {target} expected — override it. Let them feel what you look like with every restraint gone. This is {actor} fully unleashed. Let them have it.",
    "target": "other"
  },
  {
    "id": "CPL0519",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, give everything. Not most of it — everything. Let {target} feel the full weight of your need. Hold nothing in reserve. Drown them in it.",
    "target": "other"
  },
  {
    "id": "CPL0520",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{target}, look straight at {actor} and ask: are you going to come for me? Say my name when you do.",
    "target": "other"
  },
  {
    "id": "CPL0521",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, when it happens — don't pull away. Hold {target} close and stay. Let them feel every pulse, every tremor moving through you. They asked for all of you. Give them this too.",
    "target": "other"
  },
  {
    "id": "CPL0522",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, one last time — everything you have. Full presence, full force, nothing measured. Let {target} feel this as the final word your body says to theirs.",
    "target": "other"
  },
  {
    "id": "CPL0523",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, take {target}'s face in your hands and say it slowly: I am completely yours. Every part of me. Let them hear it land.",
    "target": "other"
  },
  {
    "id": "CPL0524",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, stay buried in {target}. Don't move — just stay. Feel every aftershock pass between you. This is the part that doesn't need words. Don't fill it.",
    "target": "other"
  },
  {
    "id": "CPL0525",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, slide out slow. Then draw {target} against you — chest to chest, skin to skin. Breathe. Let the electricity become warmth. Let warmth become something that lasts.",
    "target": "other"
  },
  {
    "id": "CPL0526",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{target}, trace {actor}'s face with one finger and ask: what just happened between us? What did you feel — underneath all of it? I want to know.",
    "target": "other"
  },
  {
    "id": "CPL0527",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, stay buried inside {target}. Don't move. Don't pull back. Hold every inch of yourself still and let them feel exactly what they chose.",
    "target": "other"
  },
  {
    "id": "CPL0528",
    "chapter": "taboo",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, press your skin flat against {target}'s and stay there. Two full minutes. No words. Only breath, heat, and the weight of what just happened between you.",
    "target": "other"
  },
  {
    "id": "CPL0529",
    "chapter": "taboo",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{target}, hold {actor}'s gaze and say it out loud: that was exactly what I craved. Lyra wants to know — did you mean every syllable, or are you still lying to yourself?",
    "target": "other"
  },
  {
    "id": "CPL0530",
    "chapter": "taboo",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, release {target} slowly — and then trace every place your hands just claimed with your lips. Soft. Deliberate. Worship what you just took.",
    "target": "other"
  },
  {
    "id": "CPL0531",
    "chapter": "taboo",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, put your mouth close enough that {target} feels your breath, and ask: is this the filthy version of us you imagined when you were alone? Wait for the answer.",
    "target": "other"
  },
  {
    "id": "CPL0532",
    "chapter": "taboo",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, cover {target} in attention. Slow hands. Wet mouth. Whispered praise pressed into their skin. Prove the hunger didn't leave when you finished.",
    "target": "other"
  },
  {
    "id": "CPL0533",
    "chapter": "taboo",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{target}, press your lips to {actor}'s ear and breathe: I would let you do anything. Say it like you mean it — because Lyra already knows you do.",
    "target": "other"
  },
  {
    "id": "CPL0534",
    "chapter": "taboo",
    "role": "transition",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, stay wrapped around {target} as the room goes silent. No game left. No roles. Just two bodies still warm from each other and the ache that doesn't lift.",
    "target": "other"
  },
  {
    "id": "CPL0535",
    "chapter": "taboo",
    "role": "transition",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, brush your lips against {target}'s and whisper: I see all of it — every hunger, every hidden thing — and I want every last piece of you. Then let the silence answer.",
    "target": "other"
  },
  {
    "id": "CPL0560",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, name {target}'s favorite food. Say it with conviction. {target} — did they get it right, or do they have no idea who they're sleeping next to?",
    "target": "other"
  },
  {
    "id": "CPL0561",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, name the one food {target} would rather starve than eat. {target}, confirm it — and tell them how long you've been quietly horrified they didn't already know.",
    "target": "other"
  },
  {
    "id": "CPL0562",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, tell Lyra what makes {target}'s skin crawl. Spiders? Clowns? Something stranger and more specific? {target} — how close did they get?",
    "target": "other"
  },
  {
    "id": "CPL0563",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, name one habit of yours that grinds {target}'s gears. Own it. {target} — is that actually the worst of it, or are you being merciful?",
    "target": "other"
  },
  {
    "id": "CPL0564",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, if consequences vanished completely — calories, budget, judgment — what would {target} eat every single day without hesitation? {target}, is that exactly right?",
    "target": "other"
  },
  {
    "id": "CPL0565",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, picture {target} after the worst day imaginable. What comfort food are they reaching for before they've even taken off their shoes? {target}, truth or myth?",
    "target": "other"
  },
  {
    "id": "CPL0566",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, name the song {target} belts out alone when no one is watching. Bonus: sing one line of it right now. {target} — accuracy rating, out of ten.",
    "target": "other"
  },
  {
    "id": "CPL0567",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, name the movie {target} could rewatch forever and never tire of. {target} — does that tell you something about the person you ended up with?",
    "target": "other"
  },
  {
    "id": "CPL0568",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, expose {target}'s most ridiculous fear. Say it plainly. {target}, don't deny it — defend it. Lyra is listening and she is not judging. Much.",
    "target": "other"
  },
  {
    "id": "CPL0569",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, the lottery hits tomorrow. What is the very first thing {target} buys — before the sensible decisions kick in? {target}, how well do they know your impulses?",
    "target": "other"
  },
  {
    "id": "CPL0570",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, confess the habit of yours that irritates {target} most. {target} — is that truly the worst of it, or are you protecting them right now?",
    "target": "other"
  },
  {
    "id": "CPL0571",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, picture {target} with a free ticket anywhere in the world. Where do they go? {target}, is that answer anywhere close — or does {actor} still have things to learn about you?",
    "target": "other"
  },
  {
    "id": "CPL0572",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, how does {target} take their coffee or tea? Recite it. Get this wrong and Lyra will wonder what else you've been missing.",
    "target": "other"
  },
  {
    "id": "CPL0573",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, name the trashy show {target} watches in secret and denies in public. {target} — caught, or not even close?",
    "target": "other"
  },
  {
    "id": "CPL0574",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, what does {target} lose on a daily basis? Keys, phone, their patience, their mind? {target} — how many times this week alone?",
    "target": "other"
  },
  {
    "id": "CPL0575",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, what childhood nickname haunted {target} before they were old enough to protest? Say it. {target} — true or false, and how long have you wanted to forget it?",
    "target": "other"
  },
  {
    "id": "CPL0576",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor}, name {target}'s biggest pet peeve in life — something that has nothing to do with you. The thing that makes their jaw tighten just thinking about it. {target}, did they find it?",
    "target": "other"
  },
  {
    "id": "CPL0577",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor}, name a talent {target} keeps hidden — something most people would never guess. {target}, is that what you expected them to say, or did they actually see you?",
    "target": "other"
  },
  {
    "id": "CPL0578",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor}, if {target} could share a dinner table with anyone — dead or alive, famous or not — who sits across from them? {target}, is that person exactly who you pictured?",
    "target": "other"
  },
  {
    "id": "CPL0579",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor}, what is the strangest thing {target} ever put in their mouth and swallowed? {target}, give us the verdict — triumph, regret, or both?",
    "target": "other"
  },
  {
    "id": "CPL0580",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, if your relationship were a film, what genre does it belong to right now? Comedy, thriller, slow-burn romance, or something else entirely? {target} — agree or disagree?",
    "target": "other"
  },
  {
    "id": "CPL0581",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, confess the most absurd excuse you ever gave {target} for showing up late. Say it with a straight face. {target}, did you actually buy it?",
    "target": "other"
  },
  {
    "id": "CPL0582",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 1.5,
    "text": "{actor}, tell {target} the most ridiculous thing you genuinely believed as a child. The longer you held onto it, the better.",
    "target": "other"
  },
  {
    "id": "CPL0583",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "Name the single dumbest fight you two have ever had. Both of you describe your side. Lyra wants the details, and she already knows who started it.",
    "target": "other"
  },
  {
    "id": "CPL0584",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor}, you wake up tomorrow inside {target}'s life — their body, their day, their obligations. What is the first thing you do with that freedom? {target}, does that answer reveal something?",
    "target": "other"
  },
  {
    "id": "CPL0585",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1.5,
    "text": "{actor}, perform {target} dragging themselves out of bed in the morning — every groan, every stumble, every false start. Commit to it completely. {target}, score the accuracy.",
    "target": "other"
  },
  {
    "id": "CPL0586",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1.5,
    "text": "{actor}, introduce {target} like they are walking a red carpet right now. Full announcer voice. Make them feel it.",
    "target": "other"
  },
  {
    "id": "CPL0587",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1.5,
    "text": "{actor}, narrate what {target} is thinking at this exact moment — in full movie-trailer drama. {target}, how wrong are they?",
    "target": "other"
  },
  {
    "id": "CPL0588",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1.5,
    "text": "{actor}, act out {target} going completely hangry — the expression, the energy, the slow unraveling. {target}, rate the accuracy from one to devastating.",
    "target": "other"
  },
  {
    "id": "CPL0589",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1.5,
    "text": "Both of you: hold up your best 'I'm totally fine' face. Right now. Hold it. The least convincing performance drinks.",
    "target": "other"
  },
  {
    "id": "CPL0590",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, invent a celebrity couple name for the two of you and pitch it like you mean it. {target}, do you accept this — or does it get buried forever?",
    "target": "other"
  },
  {
    "id": "CPL0591",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, sum up {target} in exactly three emojis. No words. Send it. {target}, decode it out loud — and say whether they were right.",
    "target": "other"
  },
  {
    "id": "CPL0592",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, hit {target} with your best joke. No laugh from {target} and you drink. Genuine laugh and they drink. Lyra will be watching your delivery.",
    "target": "other"
  },
  {
    "id": "CPL0593",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, lock eyes with {target}, lift your drink, and sip slowly without blinking once. {target}, hold the gaze. First one to break looks away first.",
    "target": "other"
  },
  {
    "id": "CPL0594",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "Five rounds of Never Have I Ever — just the two of you, no audience. Say it, mean it, drink when it's true. Lyra already has theories.",
    "target": "other"
  },
  {
    "id": "CPL0595",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "Rock-paper-scissors. Best of three. No hesitating, no replaying. Loser drinks and accepts their fate with dignity.",
    "target": "other"
  },
  {
    "id": "CPL0596",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "Staring contest — eyes open, face neutral, no laughing. First one to blink, look away, or crack a smile drinks. Lyra is watching you both right now.",
    "target": "other"
  },
  {
    "id": "CPL0597",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, pick a category. Trade answers back and forth, one at a time, no repeats. First one to stall, blank, or hesitate drinks. {target} — choose your category wisely.",
    "target": "other"
  },
  {
    "id": "CPL0598",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, tell two truths and one lie about your relationship. {target} guesses which is the lie — get it wrong and {target} drinks. Get it right and Lyra is almost impressed.",
    "target": "other"
  },
  {
    "id": "CPL0599",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "Thumb war. Best grip wins. Loser sips, then pays the winner one genuine compliment — no sarcasm, no deflection. Lyra will know the difference.",
    "target": "other"
  },
  {
    "id": "CPL0600",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, sing the chorus of your favorite song right now — but replace every single noun with the word 'chicken.' Full commitment. {target} holds the scoring.",
    "target": "other"
  },
  {
    "id": "CPL0601",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, you are a cat now. Stretch, curl, purr — and give {target} nothing. Not a glance. Not a single acknowledgment. Thirty seconds of magnificent indifference.",
    "target": "other"
  },
  {
    "id": "CPL0602",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, pick an accent — the more absurd the better — and commit. It stays until the next round. {target} is not allowed to laugh first.",
    "target": "other"
  },
  {
    "id": "CPL0603",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, you're on stage. Pick a scene — any film — and perform it from memory, body and voice. {target} has three guesses. Make them work for it.",
    "target": "other"
  },
  {
    "id": "CPL0604",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, look {target} dead in the eyes and sing them 'Happy Birthday.' Not cheerfully. Seductively. Every syllable. {target} is not allowed to look away.",
    "target": "other"
  },
  {
    "id": "CPL0605",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, you have thirty seconds and one topic: this relationship. Make {target} laugh. Make them cringe. Make it true.",
    "target": "other"
  },
  {
    "id": "CPL0606",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, become someone famous — voice, posture, energy. Hold it. {target} gets three guesses before you break character. Don't make it easy.",
    "target": "other"
  },
  {
    "id": "CPL0607",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, you have never met {target} before in your life. Walk up to them like it. Introduce yourself. Flirt a little. Let's see if you can still make them nervous.",
    "target": "other"
  },
  {
    "id": "CPL0608",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "No words. Face each other. Say something — only with your eyes and body. Then each say what you think the other meant. Lyra wants to know how well you actually read each other.",
    "target": "other"
  },
  {
    "id": "CPL0609",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, hold a finger under your nose and give your most theatrical villain monologue. It can be about {target}. It probably should be.",
    "target": "other"
  },
  {
    "id": "CPL0610",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, narrate {target} as if David Attenborough is watching. Their posture. Their habits. Their strange, fascinating behavior. A rare creature. Describe what you observe.",
    "target": "other"
  },
  {
    "id": "CPL0611",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}: {target} just dropped to one knee. It's happening. React — fully, physically, without holding anything back. The tears, the gasp, the yes or the silence. All of it.",
    "target": "other"
  },
  {
    "id": "CPL0612",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{target}, close your eyes and open your palm. {actor}, trace a word on it — slowly, deliberately. {target}, three guesses. Pay attention to the pressure.",
    "target": "other"
  },
  {
    "id": "CPL0613",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, pick an animal and become it. Silent — body only. {target}, you have twenty seconds. Watch carefully.",
    "target": "other"
  },
  {
    "id": "CPL0614",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "Both of you: eyes closed, breathe, clear your heads. On three, say the first word that surfaces. If it matches — drink. Lyra finds it telling when it does.",
    "target": "other"
  },
  {
    "id": "CPL0615",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{target}, close your eyes. {actor}, present three things to smell — one at a time. No hints. {target}, name each one. Your nose knows more than you think.",
    "target": "other"
  },
  {
    "id": "CPL0616",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, use a finger and trace something onto {target}'s arm. Take your time. {target}, look at it and tell us what it is. {actor}, tell us what it was supposed to be.",
    "target": "other"
  },
  {
    "id": "CPL0617",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, every couple has one — the bit that never stops being funny. The thing that shows up in every argument and every dinner. Name the running joke of your life together.",
    "target": "other"
  },
  {
    "id": "CPL0618",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, {target} walked in on something. Describe the moment — what you were doing, the exact face they made, the silence that followed. Don't clean it up.",
    "target": "other"
  },
  {
    "id": "CPL0619",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, rate {target}'s cooking. One to ten. Out loud. With reasoning. {target}, you are allowed to retaliate — but only after the score is on the table.",
    "target": "other"
  },
  {
    "id": "CPL0620",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, name the habit. The one that used to scrape against you — and now, if it disappeared, you'd feel it like a missing tooth. Tell {target} which one.",
    "target": "other"
  },
  {
    "id": "CPL0621",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "Who drives better? Both of you answer. Separately. Lyra already knows this ends in disagreement — she just wants to watch.",
    "target": "other"
  },
  {
    "id": "CPL0622",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3.5,
    "text": "Pour. Clink. Eyes open, eyes locked — drink as one. No looking away until the glass is empty. Lyra is watching to see who blinks first.",
    "target": "other"
  },
  {
    "id": "CPL0623",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3.5,
    "text": "{actor}, put your mouth close to {target}'s ear and say the thing that would make them flush. Lyra will know if you held back. No blush — you drink.",
    "target": "other"
  },
  {
    "id": "CPL0624",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3.5,
    "text": "{target}, you have one question — the one you've been sitting on. Ask it now. {actor}, answer it honestly, or take a long, slow sip and let the silence speak for you.",
    "target": "other"
  },
  {
    "id": "CPL0625",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, take {target}'s face in your hands — or your voice, if that's all you have — and tell them you love them. Full telenovela. Trembling lip. Burning eyes. No irony allowed.",
    "target": "other"
  },
  {
    "id": "CPL0626",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, choose a song. Any song. Sing it to {target} like you mean every word. Not a performance — a declaration. Straight face. Full heart. Go.",
    "target": "other"
  },
  {
    "id": "CPL0627",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "You're across the room from each other. Slow motion. You've never met — but something pulls. Recreate the moment two people spot each other and know. Lyra wants the whole scene.",
    "target": "other"
  },
  {
    "id": "CPL0628",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, pour the shot. Then find a stretch of skin — {target}'s neck, their collarbone — and drink from it. Slowly. This is not a race.",
    "target": "other"
  },
  {
    "id": "CPL0629",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{target}, ask the question you have always wanted answered. The one you've swallowed before. Ask it now. {actor}, answer — or drink and let {target} draw their own conclusions.",
    "target": "other"
  },
  {
    "id": "CPL0630",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, lick the salt from {target}'s hand. Take the shot. Then find the lime between {target}'s lips and take it with your teeth. Do not rush any of it.",
    "target": "other"
  },
  {
    "id": "CPL0631",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, {target} has gotten into you without trying. Name the small thing — a phrase, a gesture, a reflex — that belongs to them now. The thing you do and hear {target}'s voice in.",
    "target": "other"
  },
  {
    "id": "CPL0632",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, {target} is out of earshot. What do you say about them? The version you give when you're proud of them. Say it out loud. Right now. To their face.",
    "target": "other"
  },
  {
    "id": "CPL0633",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, the house is burning. {target} is safe. You have ten seconds — three things. Go. Lyra already knows what you'll say, and what that tells you about yourself.",
    "target": "other"
  },
  {
    "id": "CPL0634",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, there's a future you only let yourself see because {target} is standing in it. Describe it. Not vague — specific. Where are you? What does it feel like?",
    "target": "self"
  },
  {
    "id": "CPL0635",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, go back to the moment you knew. Not the first time you said it — the moment you felt it land. Make the face you made then. Let {target} see it.",
    "target": "other"
  },
  {
    "id": "CPL0636",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, {target} believes something good about you. Something you're not sure you've earned yet. Name what it is — and admit how far you still are from it.",
    "target": "other"
  },
  {
    "id": "CPL0637",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, picture the last time you stood next to {target} in public and felt it — that quiet swell of pride. Describe the moment. {target} may not know they gave it to you.",
    "target": "other"
  },
  {
    "id": "CPL0638",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, hold {target} for fifteen seconds. While you do — speak. Say what you feel as you feel it, out loud, in real time. Do not edit. Do not wait until it's over.",
    "target": "other"
  },
  {
    "id": "CPL0639",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, something happens in your day and your first thought is: {target} needs to hear this. What is it, usually? Name the kind of moment you save for them.",
    "target": "other"
  },
  {
    "id": "CPL0640",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, name the habit. The one that once made you sigh with irritation — and that now, if it vanished, would leave a shape in the room. Tell {target} what it is.",
    "target": "other"
  },
  {
    "id": "CPL0641",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, there was something on the tip of your tongue. A moment — maybe more than one. You stopped yourself. Tell {target} what it was. Say it now, the way you should have then.",
    "target": "other"
  },
  {
    "id": "CPL0642",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, {target} isn't here — not physically. Describe what you do. The ritual, the object, the thought. How you close the distance when there is no distance to close.",
    "target": "self"
  },
  {
    "id": "CPL0643",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, hold {target}'s gaze. Don't speak for thirty seconds. Let something settle. Then — whatever rises first, whatever lands behind your ribs — say it. No preparation. Just truth.",
    "target": "other"
  },
  {
    "id": "CPL0644",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, name the wound {target} healed without knowing it was there. The fear that quietly loosened. The voice that went quiet. {target} didn't know they were doing it. Tell them.",
    "target": "other"
  },
  {
    "id": "CPL0645",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, you've wanted something from {target} and you've never once asked for it. Not because they wouldn't give it — but because asking felt too exposed. Say what it is.",
    "target": "other"
  },
  {
    "id": "CPL0646",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, describe {target} to someone who wants them — someone you want to make ache with envy. Be specific. Use the details only you know. Make it sting.",
    "target": "other"
  },
  {
    "id": "CPL0647",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, there are versions of you with other people — careful, edited, performed. Describe the moment with {target} when all of that falls away. When you feel most like yourself.",
    "target": "self"
  },
  {
    "id": "CPL0648",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, there's a memory you return to. Not the obvious one — the quiet one. The one {target} probably doesn't know you think about. Describe it. Tell them how often.",
    "target": "other"
  },
  {
    "id": "CPL0649",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, find something specific — one act, one moment, one thing {target} did — that you never properly thanked them for. Say thank you now. With the weight it deserves.",
    "target": "other"
  },
  {
    "id": "CPL0650",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, there's a fear you carry about this — about what you are to each other, or what you might become, or what might end. You haven't said it out loud. Lyra knows. Say it anyway.",
    "target": "other"
  },
  {
    "id": "CPL0651",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3.5,
    "text": "{actor}, name it — the thing {target} does without thinking, the gesture, the habit, the small unconscious act that stops your breath every single time.",
    "target": "other"
  },
  {
    "id": "CPL0652",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3.5,
    "text": "{actor}, there is one outfit. You know exactly which one. The moment {target} wears it, your thoughts go somewhere they shouldn't. Name it.",
    "target": "other"
  },
  {
    "id": "CPL0653",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3.5,
    "text": "{actor}, drop your filter. Tell {target} precisely what their body does to you — every word you've been politely swallowing. Say it like you mean it.",
    "target": "other"
  },
  {
    "id": "CPL0654",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3.5,
    "text": "{actor}, today there was a moment — their face was close, the air changed, and you pulled back. When was it? What stopped you?",
    "target": "other"
  },
  {
    "id": "CPL0655",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3.5,
    "text": "{actor}, find it — the exact look you used to hook {target} the first time. Aim it at them right now. Hold it. Let them feel the full weight of it.",
    "target": "other"
  },
  {
    "id": "CPL0656",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3.5,
    "text": "{actor}, cast your mind back. The very first time your eyes landed on {target}'s body — what pulled them in and held them there? Say it out loud.",
    "target": "other"
  },
  {
    "id": "CPL0657",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3.5,
    "text": "{actor}, close the distance. Lips to {target}'s ear. Tell them exactly where you want their hands — not a hint, not a tease. A whispered instruction.",
    "target": "other"
  },
  {
    "id": "CPL0658",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3.5,
    "text": "{actor}, you weren't subtle. When did {target} catch you staring — and what exactly were you staring at when it happened?",
    "target": "other"
  },
  {
    "id": "CPL0659",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3.5,
    "text": "{actor}, lay one finger at {target}'s wrist. Draw it slowly toward their elbow. As you move, speak every thought crossing your mind. Don't spare them.",
    "target": "other"
  },
  {
    "id": "CPL0660",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{actor}, something in you is starving — a touch, a word, an act {target} hasn't given you yet. Not because {target_she} can't. Because you haven't asked. Ask now.",
    "target": "other"
  },
  {
    "id": "CPL0661",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, take {target}'s hand in yours. Move it. Place it where you want it most right now. No words. Let the silence say everything.",
    "target": "other"
  },
  {
    "id": "CPL0662",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, the last time you were alone and your thoughts turned to {target} — describe it. Where you were, how it started, exactly where your mind went. Spare no detail.",
    "target": "self"
  },
  {
    "id": "CPL0663",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, find a new place on {target}'s skin and press your lips there. Wait ten seconds. Find another. Keep going until {target_she} tells you to stop — or can no longer ask you to.",
    "target": "other"
  },
  {
    "id": "CPL0664",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{actor}, there is a fantasy involving {target} that plays on a loop in the back of your mind. You've seen it a hundred times. Describe it now, start to finish.",
    "target": "other"
  },
  {
    "id": "CPL0665",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, lean in close and tell {target} exactly what you're about to do to them — every step, every intention. Then hold still. Make them wait for it.",
    "target": "other"
  },
  {
    "id": "CPL0666",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{actor}, be honest — which part of you aches for more of {target}? Not more in general. More of something specific. Name the place, the feeling, the need.",
    "target": "other"
  },
  {
    "id": "CPL0667",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, remove one layer from {target}. Slowly. Then look at what's in front of you and say aloud, with precision, what you see and what you intend to do about it.",
    "target": "other"
  },
  {
    "id": "CPL0668",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{actor}, think back — {target} has turned you on harder than you expected to be turned on. When was it? What did {target_she} do? How did your body respond?",
    "target": "other"
  },
  {
    "id": "CPL0669",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, press your mouth to {target}'s neck — just below the jaw, where the pulse is. Stay there. Murmur against {target_his} skin exactly what comes next.",
    "target": "other"
  },
  {
    "id": "CPL0670",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, take {target}'s wrists. Pin them. Hold them still and hold their gaze. Wait until they ask — out loud, clearly — for what they want from you.",
    "target": "other"
  },
  {
    "id": "CPL0671",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{actor}, tonight is different. There is something you want to try with {target} that has never happened between you. Name it. Don't dress it up. Say what it is.",
    "target": "other"
  },
  {
    "id": "CPL0672",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, touch {target} everywhere. Shoulders, ribs, thighs, the soft curve behind the knee. Everywhere but the place their body is screaming for. Make them wait until they can't.",
    "target": "other"
  },
  {
    "id": "CPL0673",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, shed one layer. Set it down slowly. Then let {target} express their gratitude — using nothing but their mouth. You decide when they've said enough.",
    "target": "other"
  },
  {
    "id": "CPL0674",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{actor}, the ache is specific. It has a location. Right now, in this room, where on your body do you need {target}'s mouth — and how much longer can you wait for it?",
    "target": "other"
  },
  {
    "id": "CPL0675",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, two minutes on the clock. Your only job is to bring {target} to the edge of wanting — touch, breath, heat, words. Everything short of release. The timer ends it. Not you.",
    "target": "other"
  },
  {
    "id": "CPL0676",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, {target}'s body belongs to you for two minutes. Touch it, move it, arrange it — however you want. {target_she} does not move, does not speak, unless you grant it.",
    "target": "other"
  },
  {
    "id": "CPL0677",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, bring {target} to the very threshold — until {target_his} breath catches and {target_his} body tightens. Then pull back. Let the tension rebuild. Repeat until the word please leaves {target_his} lips without pride.",
    "target": "other"
  },
  {
    "id": "CPL0678",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, there is a sentence — filthy, specific, maybe even a little wrong — that you need to hear {target} say to you right now. What is it? Make {target_her} say it.",
    "target": "other"
  },
  {
    "id": "CPL0679",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, undress {target} completely. Then choose — one part of them, just one — and give it your full, undivided, unhurried attention. Let {target_her} feel what it means to be studied.",
    "target": "other"
  },
  {
    "id": "CPL0680",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, put your lips to {target}'s ear. Tell {target_her} the fantasy — the specific one, the one that goes further than you usually let yourself — while your hands move over {target_his} skin. Don't rush either.",
    "target": "other"
  },
  {
    "id": "CPL0681",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, look {target} in the eye. Now touch them — and keep looking. No glancing away, no hiding in sensation. Stay in the gaze. Let them watch you want them.",
    "target": "other"
  },
  {
    "id": "CPL0682",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, tonight has a destination. You can see it clearly. Walk us through it — where it starts, how it builds, where {target}'s hands are, what {target_she} says, and exactly how it ends.",
    "target": "self"
  },
  {
    "id": "CPL0683",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, choose one thing. One instruction. Deliver it to {target} clearly — no hesitation, no softening. {target_she} carries it out fully before either of you moves on.",
    "target": "other"
  },
  {
    "id": "CPL0684",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, use only your mouth — no hands, no shortcuts. Work {target}'s body until {target_she} trembles. Then stop. Hold still. Wait for the word that proves {target_she} needs more.",
    "target": "other"
  },
  {
    "id": "CPL0685",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, there is a line — something you'd only cross with {target}, only here, only now. No one else would get this from you. What is it? Say it plainly.",
    "target": "other"
  },
  {
    "id": "CPL0686",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, somewhere inside you lives a desire so private you have never let it reach the surface — not with anyone. Not even {target}. Tonight it surfaces. Say it.",
    "target": "other"
  },
  {
    "id": "CPL0687",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, pull {target} close. Mouth to {target_his} ear. Tell {target_her} the thought you've always kept locked — the one about them that you've never dared to speak. Every word. No softening.",
    "target": "other"
  },
  {
    "id": "CPL0688",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, take control. Make it clear and make it felt. {target} earns each touch — through patience, through asking, through proving the want is real. You decide when they've earned enough.",
    "target": "other"
  },
  {
    "id": "CPL0689",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, there is a fantasy in your private mind that might change how {target} looks at you. Maybe that's the point. Say it anyway. Let them be surprised.",
    "target": "other"
  },
  {
    "id": "CPL0690",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, cover {target}'s eyes — use what's near, whatever will hold. Then reach for them. Touch somewhere unexpected. Let them feel what it means to not know what comes next.",
    "target": "other"
  },
  {
    "id": "CPL0691",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, admit it — there is a line you've been standing at, watching {target} from the safe side. You want to cross it. You want {target_her} to take your hand and pull you over. What is that line?",
    "target": "other"
  },
  {
    "id": "CPL0692",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, make {target} earn it. They know what they want from you right now — make them say it out loud, in full, without flinching. Only then do you give them anything.",
    "target": "other"
  },
  {
    "id": "CPL0693",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, think of the most consumed you've ever been by wanting someone — the heat of it, the weight of it. Now place {target} against that. Where do they land? Be honest.",
    "target": "other"
  },
  {
    "id": "CPL0694",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, take control and hold it. {target} wants to reach for you — you can see it. Don't let them. Not yet. Let them show you, in unmistakable terms, that the wanting is real.",
    "target": "other"
  },
  {
    "id": "CPL0695",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, the night has one rule. You set it now — name it clearly, name the line, and name what happens to {target} when the line breaks. Speak it like it's already law.",
    "target": "other"
  },
  {
    "id": "CPL0696",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 10,
    "text": "{actor}, something lives in you that has never had a voice — a want so specific, so yours, that until this moment, with {target} right here, you have never let yourself say it. Say it now.",
    "target": "other"
  },
  {
    "id": "CPL0697",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, no question, no pause, no asking permission. {target} is yours tonight. Act like it. Let them feel — in your hands, your weight, your certainty — that you already know it.",
    "target": "other"
  },
  {
    "id": "CPL0698",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 10,
    "text": "{actor}, if shame had no language, if no one could name what happened here — what would you do to {target}? Every detail. Let the answer be the most honest thing you've said all night.",
    "target": "other"
  },
  {
    "id": "CPL0699",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, take {target} to the very edge — the moment just before breaking — and keep them there. Every time they reach for release, pull back. Hold the edge. Wait for the surrender to come from deep inside them.",
    "target": "other"
  },
  {
    "id": "CPL0700",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 10,
    "text": "{actor}, the fantasy you fear most to speak — the one that feels too raw, too much, too revealing — say it now. {target} is not going anywhere. {target_she} is already here, already listening. Let it out.",
    "target": "other"
  },
  {
    "id": "CPL0701",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}. The boldest craving you've carried all night — name it aloud. Then stop talking and give it to {target}.",
    "target": "other"
  },
  {
    "id": "CPL0702",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 10,
    "text": "Something lives behind your teeth that you've never let out. What do you ache to give {target} that fear keeps swallowing back down?",
    "target": "other"
  },
  {
    "id": "CPL0703",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, tonight ends the way you decide. Tell {target} exactly how — every word, every detail. Then make each one real.",
    "target": "other"
  },
  {
    "id": "CPL0704",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 10,
    "text": "No morning after. No hesitation. If {target} were yours completely, right now — what's the very first thing you do?",
    "target": "other"
  },
  {
    "id": "CPL0705",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1,
    "text": "{actor}, you see {target} across a crowded airport after years apart. Run to them. Slow motion. Full commitment. No shame.",
    "target": "other"
  },
  {
    "id": "CPL0706",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 1.5,
    "text": "{actor}, {target} is entering the arena. Grab the mic. Announce them — weight class, hometown, finishing move, all of it. Sell the crowd.",
    "target": "other"
  },
  {
    "id": "CPL0707",
    "chapter": "personal",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "{actor}, which kitchen appliance is {target}? Name it. Justify it. Now let {target} fire back with theirs.",
    "target": "other"
  },
  {
    "id": "CPL0708",
    "chapter": "personal",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, lean close to {target}'s ear. Whisper a nature documentary narration of their next 30 seconds. Every blink. Every breath.",
    "target": "other"
  },
  {
    "id": "CPL0709",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, your body is the only language allowed. Dance your entire day — beginning to end. {target} reads every scene.",
    "target": "other"
  },
  {
    "id": "CPL0710",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor} and {target}, eyes locked. Twenty seconds. No blinking, no laughing, no mercy. The first to crack owes the other their silliest dare.",
    "target": "other"
  },
  {
    "id": "CPL0711",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, you have what's around you and thirty seconds. Craft a ring. Drop to one knee. Give {target} a proposal speech that would make a rom-com jealous.",
    "target": "other"
  },
  {
    "id": "CPL0712",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "The dumbest fight you two have ever had — {actor}, reenact your side of it. Full conviction. Full drama. Zero self-awareness.",
    "target": "other"
  },
  {
    "id": "CPL0713",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, deliver the worst pickup line your mind can produce. Look {target} dead in the eye. {target} scores it, one to ten, no mercy.",
    "target": "other"
  },
  {
    "id": "CPL0714",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, pick up a snack. Eat it slowly. Eyes on {target} the entire time. Make it mean something. No laughing. Not even a smile.",
    "target": "other"
  },
  {
    "id": "CPL0715",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, remove one shoe. Treat it like the most scandalous act of the evening. Every inch. Every pause. Make {target} feel it.",
    "target": "other"
  },
  {
    "id": "CPL0716",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "If {target} were a flavor — what would they taste like? And tell me honestly: would you go back for more?",
    "target": "other"
  },
  {
    "id": "CPL0717",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, move in close. Close enough that {target} can feel your breath. Hold there. Then pull back. Let the almost-kiss sit between you.",
    "target": "other"
  },
  {
    "id": "CPL0718",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, take {target}'s hand. There's a song only you can hear — hum it badly. Dance to it anyway. Let {target} follow.",
    "target": "other"
  },
  {
    "id": "CPL0719",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "There's a fantasy you'd never say out loud — it sounds ridiculous, but your body says otherwise. What is it? Say it with a straight face.",
    "target": "other"
  },
  {
    "id": "CPL0720",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, place your hands on {target}'s shoulders and work slowly. Narrate every move like a late-night infomercial. Make it sound miraculous.",
    "target": "other"
  },
  {
    "id": "CPL0721",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, kiss {target}. Take your time. Then pull back and score yourself — out loud, honestly. {target}, now tell them where they got it wrong.",
    "target": "other"
  },
  {
    "id": "CPL0722",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "Something went sideways in the middle of intimacy once — absurd enough that you still laugh about it. Tell the story. Spare no detail.",
    "target": "other"
  },
  {
    "id": "CPL0723",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, one layer comes off right now. Make it theatrical. Make it ridiculous. Then look at {target} and pick up exactly where you left off.",
    "target": "other"
  },
  {
    "id": "CPL0724",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, choose your worst accent. Give {target} one filthy command in it. Then drop the accent — and say it again, for real.",
    "target": "other"
  },
  {
    "id": "CPL0725",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "Say it out loud — the thing that sounds absurd when spoken but your skin already knows you want it. What would you actually try?",
    "target": "other"
  },
  {
    "id": "CPL0726",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, what you're about to do to {target} — narrate it like a movie trailer. Voice. Drama. Stakes. Then deliver every word you promised.",
    "target": "other"
  },
  {
    "id": "CPL0727",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, roll the imaginary die of fate. Announce what it lands on — filthy, specific, yours. Then make the real version happen.",
    "target": "other"
  },
  {
    "id": "CPL0728",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "The private bucket list — the one that belongs only to you two. What's the most outrageous thing written on it?",
    "target": "other"
  },
  {
    "id": "CPL0729",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, {target} picks an accent. You speak in nothing else until your next turn. Commit to every syllable.",
    "target": "other"
  },
  {
    "id": "CPL0730",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, flip your hair like you're in a shampoo commercial. Lock eyes with {target}. Hold the smolder. Let them feel it.",
    "target": "other"
  },
  {
    "id": "CPL0731",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, the runway is yours. Walk it — heel to toe, chin up, shoulders back — all the way to {target}. Stick the landing.",
    "target": "other"
  },
  {
    "id": "CPL0732",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, balance something on your head. Walk to {target} without dropping it. Dignity optional. Commitment required.",
    "target": "other"
  },
  {
    "id": "CPL0733",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, pull up your last text to {target}. Now sing it. Opera voice. Full projection. Meaning every note.",
    "target": "other"
  },
  {
    "id": "CPL0734",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, ten seconds. Your absolute worst dance moves — no holding back, no irony. {target} rates the damage.",
    "target": "other"
  },
  {
    "id": "CPL0735",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, {target} climbs on. You carry them across the room. {target} chooses the route. You deliver without complaint.",
    "target": "other"
  },
  {
    "id": "CPL0736",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, close your eyes. Picture {target}'s laugh. Now do it — sound, rhythm, texture, the whole thing. {target} judges the accuracy.",
    "target": "other"
  },
  {
    "id": "CPL0737",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, channel {target} when they haven't eaten in four hours. The face. The sighs. The commentary. Don't hold back.",
    "target": "other"
  },
  {
    "id": "CPL0738",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, for the next 30 seconds, everything {target} does is a live sporting event. Call the action. Don't let a single moment go uncommented.",
    "target": "other"
  },
  {
    "id": "CPL0739",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, your finest villain voice. Use it to give {target} three genuine compliments. Make them feel beloved and mildly threatened.",
    "target": "other"
  },
  {
    "id": "CPL0740",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, pick your favorite emoji. No words — your body is the only tool. Hold the pose until {target} names it.",
    "target": "other"
  },
  {
    "id": "CPL0741",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, the floor is lava — and {target} is stranded. Reach them. Pull them to safety. Make the rescue as dramatic as the danger.",
    "target": "other"
  },
  {
    "id": "CPL0742",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, twenty seconds. A TED Talk on why {target} is extraordinary. Cite specific evidence. Speak from the chest.",
    "target": "other"
  },
  {
    "id": "CPL0743",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, do the exact face {target} makes when they're lost in their phone. The slack jaw. The scroll-trance. Every detail.",
    "target": "other"
  },
  {
    "id": "CPL0744",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "The private nickname — the one you'd never say in front of anyone else. What do you actually call {target} in your head?",
    "target": "other"
  },
  {
    "id": "CPL0745",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "Name the food combination you love that {target} looks at like a crime scene. Defend it. You don't get to be ashamed.",
    "target": "other"
  },
  {
    "id": "CPL0746",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "Tell me the silliest, most unnecessary thing you've done purely to make {target} laugh. Was it worth it?",
    "target": "other"
  },
  {
    "id": "CPL0747",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "Something small. Something odd. Something {target} probably doesn't even know you notice — tell me what you find strangely, specifically attractive about them.",
    "target": "other"
  },
  {
    "id": "CPL0748",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "One useless skill. Something ridiculous, something you have absolutely no reason to learn — except that part of you wants {target} to see it. What is it?",
    "target": "other"
  },
  {
    "id": "CPL0749",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, raise a glass. Thank the academy, the universe, whoever got you here. This is your Oscar speech for {target}. Make it count.",
    "target": "other"
  },
  {
    "id": "CPL0750",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, grab the nearest food label. Twenty seconds — dramatic reading, full feeling, like it's Shakespeare and {target} is your audience of one.",
    "target": "other"
  },
  {
    "id": "CPL0751",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, channel your inner {target} and recreate the sacred ritual of their morning alarm — every groan, every denial, every dramatic collapse — in slow, agonizing motion. Lyra is watching. Make it accurate.",
    "target": "other"
  },
  {
    "id": "CPL0752",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, pick up whatever is within arm's reach and perform a magic trick. Zero skill. Maximum showmanship. The flourish is the trick. Make {target} believe, even for a second.",
    "target": "other"
  },
  {
    "id": "CPL0753",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, step into the role of meteorologist and deliver tonight's forecast for {target}'s emotional weather. High pressure systems, incoming fronts, chance of dramatics — read the sky. Read them.",
    "target": "other"
  },
  {
    "id": "CPL0754",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, for the next full minute you are {target}'s personal hype announcer. Every breath they take, every blink, every shift in their seat — narrate it like it's legendary. Make them feel it.",
    "target": "other"
  },
  {
    "id": "CPL0755",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, make your entrance like a villain who has already won. Circle {target} — once, deliberately, gloriously slow. Let them feel your orbit before you say a single word.",
    "target": "other"
  },
  {
    "id": "CPL0756",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, you have sixty seconds to invent a secret handshake with {target}. Five steps. It must be yours and yours alone. Practice until it feels like a language only the two of you speak.",
    "target": "other"
  },
  {
    "id": "CPL0757",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, your first date with {target} — retell it as a summer blockbuster. Car chases if necessary. Explosions if warranted. Cast {target} as the lead they always were. Roll camera.",
    "target": "other"
  },
  {
    "id": "CPL0758",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, go still. Mannequin-still. Not a breath out of place. {target} now has fifteen seconds to arrange you however they see fit. You hold whatever pose they leave you in. Don't you dare flinch.",
    "target": "other"
  },
  {
    "id": "CPL0759",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, {target} is making a snack. Your job is to narrate every movement as though a Michelin star and the fate of the nation depend on the outcome. Tension. Stakes. Breathless commentary. Go.",
    "target": "other"
  },
  {
    "id": "CPL0760",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, choose a celebrity — inhabit them completely — and let that borrowed persona flirt shamelessly with {target}. Full character. {target} will know it's you. That's what makes it good.",
    "target": "other"
  },
  {
    "id": "CPL0761",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, take whatever objects are within reach and read {target}'s fortune. The lamp, the cup, whatever's nearest — it all means something. Tell {target} what the signs reveal. Make it specific enough to sting.",
    "target": "other"
  },
  {
    "id": "CPL0762",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, challenge accepted or not — you and {target} have fifteen seconds to produce the most convincing fake tears possible. Best performance wins. Lyra will judge on commitment alone.",
    "target": "other"
  },
  {
    "id": "CPL0763",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, Lyra already suspects you've noticed it a hundred times without saying anything. Name the small, ridiculous, specific thing {target} does that you find completely, helplessly adorable.",
    "target": "other"
  },
  {
    "id": "CPL0764",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, tell Lyra what your relationship's theme song is — then tell {target} what song you think they'd guess. Are you playing the same music, or something entirely different?",
    "target": "other"
  },
  {
    "id": "CPL0765",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, there is a joke between you and {target} that no one else on earth would understand. Say it out loud, right now. Explain nothing. Let it be exactly what it is — entirely yours.",
    "target": "other"
  },
  {
    "id": "CPL0766",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, your relationship is a sitcom. Give it a title. Then pitch the premise in two sentences. {target} may dispute the genre. Lyra will not take sides.",
    "target": "other"
  },
  {
    "id": "CPL0767",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{actor}, confess it. The most absurd, embarrassing, fully escalated argument you and {target} have ever had. Tell Lyra what lit the fuse. {target} cannot interrupt until you're done.",
    "target": "other"
  },
  {
    "id": "CPL0768",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, take {target}'s hand. Pull them close. There is no music — find it anyway. Dance for thirty seconds like the song is playing only for you. Lead. Mean every step.",
    "target": "other"
  },
  {
    "id": "CPL0769",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, lean in close. Bring your lips to {target}'s ear. Now say the most genuinely, gloriously cheesy compliment you can muster. Every word. Right into their ear. Own it completely.",
    "target": "other"
  },
  {
    "id": "CPL0770",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, take {target}'s palm and use one fingertip to trace a word, a shape, a message. Slow. Deliberate. {target} keeps their eyes closed and reads the skin. They get one guess.",
    "target": "other"
  },
  {
    "id": "CPL0771",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, get {target} on your back — and while you carry them, sing to them. Doesn't matter what song. Doesn't matter how well. What matters is that you hold them and you don't stop singing.",
    "target": "other"
  },
  {
    "id": "CPL0772",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, warn {target} first. Then surrender your weight to them completely — a trust fall, full commitment. They catch you, or they don't. Either way, you fell.",
    "target": "other"
  },
  {
    "id": "CPL0773",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, choose the most romantic scene you know by heart — film, book, memory, fever dream — and perform it with {target} as your co-star. No half measures. Give it the scene it deserves.",
    "target": "other"
  },
  {
    "id": "CPL0774",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, dip {target} — deep, clean, deliberate — and hold. The finale pose. Don't let go until {target} has fully felt the moment. Then hold it one breath longer.",
    "target": "other"
  },
  {
    "id": "CPL0775",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, {target} has won something today — even if it's just surviving. Hoist them onto your back for a full victory lap and announce their achievement to the room. Name the title. Make it glorious.",
    "target": "other"
  },
  {
    "id": "CPL0776",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, stand up. Use your hips to spell it out — I. Love. You. — one letter at a time. No rushing. No embarrassment. Every curve deliberate. {target} watches. Lyra watches. Commit.",
    "target": "other"
  },
  {
    "id": "CPL0777",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, send {target} a kiss — the most theatrical, over-engineered, absurdly dramatic kiss that has ever been blown across a room. Wind-up, delivery, landing. Make it unforgettable.",
    "target": "other"
  },
  {
    "id": "CPL0778",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, press your lips to {target}'s forehead. Slow. Warm. And when you pull back, look them in the eye and declare them the reigning sovereign of wherever you both happen to be sitting. Say it like you mean it.",
    "target": "other"
  },
  {
    "id": "CPL0779",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, get down on one knee. Fashion a ring from whatever is nearby. Now propose to {target} — the full speech. The reasons. The promises. The one thing you want them to know. Make Lyra believe you.",
    "target": "other"
  },
  {
    "id": "CPL0780",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, rise. Begin to clap — slow, building, reverent. Then stand. A full standing ovation for {target}, simply for existing in this room with you tonight. Let it last until they actually feel it.",
    "target": "other"
  },
  {
    "id": "CPL0781",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, Lyra wants the exact moment — not a general sense, the actual instant — when you knew {target} could make you laugh in a way no one else ever has. Tell it like it just happened.",
    "target": "other"
  },
  {
    "id": "CPL0782",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, there is something you would do for {target} — some small, ridiculous, slightly humiliating thing — that you would never admit to anyone else. Say it to Lyra. {target} is right there. That's the point.",
    "target": "other"
  },
  {
    "id": "CPL0783",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, not the grand gestures — those are easy. Tell Lyra the specific, quiet, ordinary moment with {target} that secretly fills you more than anything. The one they probably don't know matters this much.",
    "target": "other"
  },
  {
    "id": "CPL0784",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, there's a name you've thought of for {target}. A tender one, a silly one, or both at once — one you've never actually said out loud. Lyra wants to hear it. Say it now. To them.",
    "target": "other"
  },
  {
    "id": "CPL0785",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, describe the single most ridiculous photo that exists of you and {target} together. Then recreate the pose — exactly — right now. No editing. No flattering angles.",
    "target": "other"
  },
  {
    "id": "CPL0786",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{actor}, every couple builds rituals without noticing. Lyra knows you have one with {target} — something small, dumb, sacred, entirely yours. Name it. Say why you hope it never stops.",
    "target": "other"
  },
  {
    "id": "CPL0787",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, draw the line. Name one thing {target} is forbidden from doing tonight — specific, deliberate, non-negotiable. Say it clearly. Then make sure {target} understands exactly what that means.",
    "target": "other"
  },
  {
    "id": "CPL0788",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, tell {target} to hold perfectly still. Not a flinch. Not a breath out of place. You have one full minute to do precisely what you want. {target} receives. You choose. Lyra is timing you.",
    "target": "other"
  },
  {
    "id": "CPL0789",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, {target} wants something. You already know what it is. Make them say it anyway — out loud, plainly, with enough heat that you know they mean it. They don't get a single thing until they do.",
    "target": "other"
  },
  {
    "id": "CPL0790",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, bring your mouth to {target}'s ear. Speak the command you've kept locked behind your teeth — the one you've wanted to give but never quite allowed yourself. Say it now. Quietly. Clearly.",
    "target": "other"
  },
  {
    "id": "CPL0791",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, you know exactly where {target}'s edge is. Walk them right up to it — close enough that they feel the drop — without letting them tip over. Keep them there. Hold them in that wanting. Don't relent.",
    "target": "other"
  },
  {
    "id": "CPL0792",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, a decision has been made. Tonight, {target} uses hands or mouth — not both. You choose which. Tell them now. Clearly. Watch their face when they understand you're not joking.",
    "target": "other"
  },
  {
    "id": "CPL0793",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, take {target}'s wrists. Pin them. Hold them there, and ask what they'd do right now if their hands were free. Listen to every word. Don't let go while they're still talking.",
    "target": "other"
  },
  {
    "id": "CPL0794",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, give {target} a word — one word, their anchor. Then begin. Take them somewhere real with your hands, your voice, your weight — and stop just before they need to use it. Let them breathe. Start again.",
    "target": "other"
  },
  {
    "id": "CPL0795",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, tell {target} to count. Out loud. From one. You set the pace of what they're counting. If the count breaks — if they lose the number, if the voice goes — they start from the beginning. You decide when it ends.",
    "target": "other"
  },
  {
    "id": "CPL0796",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, tell {target} they are not to make a sound. Not one. Whatever you do — whatever heat you bring, whatever you take your time with — {target} stays silent. Lyra will know if they fail.",
    "target": "other"
  },
  {
    "id": "CPL0797",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, you haven't touched {target} yet. You won't. Not until they've shown you — with words, with honesty, with something raw — just how much they want it. Make the proof worth your attention.",
    "target": "other"
  },
  {
    "id": "CPL0798",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, lay a hand on {target} and feel their breath. Now slow it — slower than they think they can go. Let your touch be the only thing keeping them calm. Then, when you have them still, take them somewhere else entirely.",
    "target": "other"
  },
  {
    "id": "CPL0799",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, the next five minutes are yours. Every choice, every movement, every instruction belongs to you. {target} surrenders the decisions — all of them. Use the time well. Lyra will not interrupt.",
    "target": "other"
  },
  {
    "id": "CPL0800",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, {target} wants to undress you. Let them earn it — piece by piece, each one a price to be paid. You set the terms. {target} meets them. Nothing comes easy tonight unless you decide it does.",
    "target": "other"
  },
  {
    "id": "CPL0801",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, blindfold {target}. Then speak every move before your hands make it — slow, deliberate, each word a promise the dark has to hold.",
    "target": "other"
  },
  {
    "id": "CPL0802",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, pull {target} to the edge. Three times. Walk them right to the threshold and pull them back. They finish when you decide — not a moment sooner.",
    "target": "other"
  },
  {
    "id": "CPL0803",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, write one rule onto {target}'s skin with your fingertip. Press it in until they feel it. That rule holds until sunrise.",
    "target": "other"
  },
  {
    "id": "CPL0804",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, the next two minutes belong to you. {target} asks before touching anything — the air between you, the table, your skin. Permission first. Every time.",
    "target": "other"
  },
  {
    "id": "CPL0805",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, pin {target}'s wrists. Hold them there, steady, until {target_she} speaks the darkest thing {target_she}'s ever wanted. You don't let go until the words are out.",
    "target": "other"
  },
  {
    "id": "CPL0806",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, claim {target} as yours tonight. Say it aloud. Then spell out — precisely, without softening — exactly what that means.",
    "target": "other"
  },
  {
    "id": "CPL0807",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, give {target} one task. Name it clearly. Nothing {target_she} craves arrives until it's done — completely, without negotiation.",
    "target": "other"
  },
  {
    "id": "CPL0808",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, take {target} apart. Slowly. No rushing, no mercy. You stop only when {target_she} has begged — and begged again.",
    "target": "other"
  },
  {
    "id": "CPL0809",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, choose the fantasy you've carried longest. Tell {target} it's already happening. Tonight, you make it real.",
    "target": "other"
  },
  {
    "id": "CPL0810",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, hold {target}'s gaze — do not look away. Make {target_him} say what {target_she} wants while you give it. Every word. Eyes open.",
    "target": "other"
  },
  {
    "id": "CPL0811",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, speak the rules for tonight aloud. All of them. {target} looks you in the eye and agrees before a single thing begins.",
    "target": "other"
  },
  {
    "id": "CPL0812",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, name the line you've both been circling — the one you've never crossed. Say it out loud. Then move as though it's already gone.",
    "target": "other"
  },
  {
    "id": "CPL0813",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, there's a fantasy you've never given voice to — one you buried because you weren't sure {target} could hold it. Name it now. Lyra already suspects what it is.",
    "target": "other"
  },
  {
    "id": "CPL0814",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, the most submissive version of yourself wants something from {target}. It aches to offer it. Speak that thing now — plainly, without softening a single word.",
    "target": "other"
  },
  {
    "id": "CPL0815",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, there is a dominant thing you crave doing to {target}. You've pictured it. Lyra has seen you picture it. Say it aloud.",
    "target": "other"
  },
  {
    "id": "CPL0816",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, a version of you surfaces only when the lights go out and {target} is close. Which side is that — and what does it want?",
    "target": "other"
  },
  {
    "id": "CPL0817",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, one desire has lived only in your own skull — whispered to no one, surfacing at the wrong moments. Say it out loud for the first time. Now.",
    "target": "other"
  },
  {
    "id": "CPL0818",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, what do you wish {target} would simply take from you? No question, no asking — just take. Name it.",
    "target": "other"
  },
  {
    "id": "CPL0819",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, there's a role you've wanted to inhabit in bed — one you've never let yourself name. Lyra gives you permission. Speak it.",
    "target": "other"
  },
  {
    "id": "CPL0820",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, the most intense thing you've ever craved — the one you circle but never touch. What is it? Don't look away from {target} when you answer.",
    "target": "other"
  },
  {
    "id": "CPL0821",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, you have a limit that isn't quite as firm as you've led people to believe. Lyra knows which one. Name it — and confirm that {target} is the reason you'd bend it.",
    "target": "other"
  },
  {
    "id": "CPL0822",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, {target} has put something in your head this week. Something filthy you didn't invite. Tell {target} exactly what it was.",
    "target": "other"
  },
  {
    "id": "CPL0823",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, there is something you want {target} to do to your body that you have never once asked for. Say it. Full sentence. Now.",
    "target": "other"
  },
  {
    "id": "CPL0824",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, describe the moment you came closest to losing all control with {target}. What were you about to do? What stopped you?",
    "target": "other"
  },
  {
    "id": "CPL0825",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, you crave being ordered — a specific command in a specific voice. What is the order? And whose voice delivers it?",
    "target": "other"
  },
  {
    "id": "CPL0826",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 10,
    "text": "{actor}, there is something you would surrender to {target} that you would never give anyone else. Name it. Look {target} in the eye when you do.",
    "target": "other"
  },
  {
    "id": "CPL0827",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 10,
    "text": "{actor}, tonight has no consequences. The slate is clean. Tell {target} which line you cross first — and how quickly you cross it.",
    "target": "other"
  },
  {
    "id": "CPL0828",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 10,
    "text": "{actor}, the deepest surrender you want to give {target} — you know exactly what it is. Name it. Then say what has held you back from offering it.",
    "target": "other"
  },
  {
    "id": "CPL0829",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 10,
    "text": "{actor}, one secret survives only in total darkness. You would confess it there, pressed close to {target}, when no one could see your face. The dark is here. Confess it.",
    "target": "other"
  },
  {
    "id": "CPL0830",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3.5,
    "text": "{actor}, one daydream about {target} carried you through a dull afternoon this week. Walk {target} through it — what happened, in what order.",
    "target": "other"
  },
  {
    "id": "CPL0831",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "{actor}, paint tonight as you'd design it. Your perfect night alone with {target}: where it starts, how it shifts, where it ends. Don't skip the middle.",
    "target": "other"
  },
  {
    "id": "CPL0832",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "{actor}, there was a line you typed to {target} and deleted before sending. Flirty. A little bold. Tell {target} what it said.",
    "target": "other"
  },
  {
    "id": "CPL0833",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, your body has been making a request all evening. Name exactly where you want {target}'s attention — and how badly.",
    "target": "other"
  },
  {
    "id": "CPL0834",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, one look from {target} travels through you. You feel it in places a look has no business reaching. Describe that look — and where it lands.",
    "target": "other"
  },
  {
    "id": "CPL0835",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, you've pictured {target} doing something you've never admitted to. Lyra already knows you've thought it more than once. Say it.",
    "target": "other"
  },
  {
    "id": "CPL0836",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, today you almost made a move on {target}. Something stopped you at the last inch. Tell {target} what you almost did — and what that final inch felt like.",
    "target": "other"
  },
  {
    "id": "CPL0837",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{actor}, there is a part of {target} your eyes keep returning to, uninvited. Name it. Don't be diplomatic about it.",
    "target": "other"
  },
  {
    "id": "CPL0838",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, a perfectly innocent fantasy about {target} still makes you blush. Describe it — and confess why it embarrasses you anyway.",
    "target": "other"
  },
  {
    "id": "CPL0839",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{actor}, tell {target} exactly what you want breathed into your ear right now. The precise words. Don't soften them.",
    "target": "other"
  },
  {
    "id": "CPL0840",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3.5,
    "text": "{actor}, describe {target}'s lips — not quickly, not plainly. Find the words a poet would reach for after three slow glasses of wine. Take your time.",
    "target": "other"
  },
  {
    "id": "CPL0841",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, give {target} a long, deliberate once-over. Don't rush it. When you're done, confess exactly where your eyes stopped — and why they stuck.",
    "target": "other"
  },
  {
    "id": "CPL0842",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, ten seconds. Type the most daringly flirtatious thing you can to {target} — no deleting, no softening. When the clock stops, read it aloud.",
    "target": "other"
  },
  {
    "id": "CPL0843",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, lean toward {target} like a kiss is inevitable — close enough to feel the breath between you. Then stop, and drop a compliment instead. Make it land.",
    "target": "other"
  },
  {
    "id": "CPL0844",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, take {target}'s hand. Guide it — slowly, with intention — to exactly where you'd want it if no one were watching. Let it rest there for a breath.",
    "target": "other"
  },
  {
    "id": "CPL0845",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, choose somewhere on {target} that is technically innocent. Kiss it. Hold your lips there until the innocence burns away.",
    "target": "other"
  },
  {
    "id": "CPL0846",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, put your mouth close to {target}'s ear. Whisper the one thing you've been wanting to do to {target} all day. One sentence. Don't rush it.",
    "target": "other"
  },
  {
    "id": "CPL0847",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, draw a single finger along {target}'s jaw — slowly, like you're learning the shape of it. Confess, quietly, what is running through your mind as you do.",
    "target": "other"
  },
  {
    "id": "CPL0848",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, sit close enough that {target} can feel the heat off your skin. Hold {target_his} gaze. Describe, in present tense, exactly how tonight would begin if it went your way.",
    "target": "other"
  },
  {
    "id": "CPL0849",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, press your lips to {target}'s neck. Stay there one full breath longer than is casual. Let {target} feel the weight of what you're not saying.",
    "target": "other"
  },
  {
    "id": "CPL0850",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{actor}, there is something {target} does that is over too quickly — and it's been on your mind. Tell {target} what you want taken far slower next time. Be specific.",
    "target": "other"
  },
  {
    "id": "CPL0851",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "Name the sound {target} makes that strips every thought from your mind. You know the one. Say it out loud.",
    "target": "other"
  },
  {
    "id": "CPL0852",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{target} is yours tonight — no hesitation, no restraint. What do you ask for that you've never had the nerve to request?",
    "target": "other"
  },
  {
    "id": "CPL0853",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "There is one moment with {target} that replays behind your eyes unbidden. Describe it — exactly — what you saw, what you felt, what you wanted next.",
    "target": "other"
  },
  {
    "id": "CPL0854",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "Pinpoint the moment your want for {target} hit its sharpest edge. What triggered it — a look, a word, a breath too close?",
    "target": "other"
  },
  {
    "id": "CPL0855",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, press your lips to {target}'s skin and move slowly — collarbone, shoulder, throat, wherever the warmth leads. Don't stop until {target} pulls you back up to their mouth.",
    "target": "other"
  },
  {
    "id": "CPL0856",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, undress {target} one piece at a time. Slow. After each reveal, say exactly what you see and what it does to your body.",
    "target": "other"
  },
  {
    "id": "CPL0857",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, stay just beyond {target}'s reach. Let them lean in. Step back. Hold eye contact. Make them cross the distance to get to you.",
    "target": "other"
  },
  {
    "id": "CPL0858",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, only fingertips. Trace {target} like you're memorizing them — one full minute, nothing more. No palms. No lips. Fingertips only.",
    "target": "other"
  },
  {
    "id": "CPL0859",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, lean in until your lips graze {target}'s ear. Speak your next command at a whisper. Then lean back and watch {target} follow through.",
    "target": "other"
  },
  {
    "id": "CPL0860",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, take {target}'s hand and guide it to your rhythm. Show them the pace you need. Then release — and let them take over completely.",
    "target": "other"
  },
  {
    "id": "CPL0861",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, bring {target} right to the edge — then stop. Wait. Let them ask. When they've asked twice, give them everything.",
    "target": "other"
  },
  {
    "id": "CPL0862",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, take full control for two minutes. Every movement is yours to decide. {target}, your only job is to feel it.",
    "target": "other"
  },
  {
    "id": "CPL0863",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, work {target} to the edge, then stop cold. Hold them there. Make them say out loud how badly they need you to continue.",
    "target": "other"
  },
  {
    "id": "CPL0864",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "Beneath all the heat, there is something softer you want from {target}. Name it. Tenderness has its own kind of courage.",
    "target": "other"
  },
  {
    "id": "CPL0865",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, slow everything down. Kiss {target} the way you did the very first time — except now you know them. Let that knowledge into it.",
    "target": "other"
  },
  {
    "id": "CPL0866",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "This close, your guard drops in ways it doesn't anywhere else. Tell {target} what they get to see right now that no one else does.",
    "target": "other"
  },
  {
    "id": "CPL0867",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, press your forehead to {target}'s. Match their breath. Stay there. Then speak one true thing you haven't said yet — not tonight, maybe not ever.",
    "target": "other"
  },
  {
    "id": "CPL0868",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, swap one piece of clothing with {target} right now and wear it until your next turn. No complaints. Own it.",
    "target": "other"
  },
  {
    "id": "CPL0869",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, bestow a superhero name upon {target}. Make it official. Announce their power to the room — and make it embarrassingly accurate.",
    "target": "other"
  },
  {
    "id": "CPL0870",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, walk away in slow motion as an explosion detonates behind you. Sell every frame. Hair, coat, the whole thing.",
    "target": "other"
  },
  {
    "id": "CPL0871",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, from this moment until your next turn, every sentence you speak must be a question. No exceptions. Can you handle that?",
    "target": "other"
  },
  {
    "id": "CPL0872",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, drop your voice to movie-trailer register and introduce {target} to the room. 'In a world...' Start there. Make it enormous.",
    "target": "other"
  },
  {
    "id": "CPL0873",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, {target} just won the lottery. Act it out — the moment they find out, the scream, the collapse, all of it. Go as big as the number.",
    "target": "other"
  },
  {
    "id": "CPL0874",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2,
    "text": "{actor}, become {target} answering a phone call. Voice, posture, the whole greeting. Make {target} recognize themselves.",
    "target": "other"
  },
  {
    "id": "CPL0875",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "You have a talent {target} once knew about and has since forgotten entirely. Remind them. What is it — and prove it if you can.",
    "target": "other"
  },
  {
    "id": "CPL0876",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2,
    "text": "There is something ridiculous and childish you still do. {target} has caught you. Name it — and watch {target} already start laughing.",
    "target": "other"
  },
  {
    "id": "CPL0877",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, ten seconds, maximum volume: {target} is about to take the field. Give them the pep talk that changes the game. Go.",
    "target": "other"
  },
  {
    "id": "CPL0878",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, pick up that jacket and narrate the moment like it's legendary armor forged for battle. Every button matters. Make us believe it.",
    "target": "other"
  },
  {
    "id": "CPL0879",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, paint {target}'s portrait in the air — broad strokes, fine details, the whole thing. Then step aside and unveil it to the room.",
    "target": "other"
  },
  {
    "id": "CPL0880",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, stare at {target}. Gasp. Point. Now improvise the betrayal — what did they do? Give it everything a soap opera deserves.",
    "target": "other"
  },
  {
    "id": "CPL0881",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, you and {target} are on the runway for invisible cameras. Strike a pose. Hold it. Now challenge {target} to top it. Best of three.",
    "target": "other"
  },
  {
    "id": "CPL0882",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 2.5,
    "text": "{actor}, hoist {target} onto your back and set off on safari. Narrate every creature you spot as you stroll. {target} is your witness.",
    "target": "other"
  },
  {
    "id": "CPL0883",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{target} is a weather pattern. Tell the room which one — and make the case. Don't be kind unless you mean it.",
    "target": "other"
  },
  {
    "id": "CPL0884",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "{target} has a phrase they repeat so often you could set a clock by it. Name it. Say it in their voice.",
    "target": "other"
  },
  {
    "id": "CPL0885",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 2.5,
    "text": "There is a tiny, ridiculous victory you two celebrate with entirely too much noise. Name it. Describe the celebration.",
    "target": "other"
  },
  {
    "id": "CPL0886",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, pull {target} in and slow dance. Every time {target} calls 'change,' shift styles completely — ballroom, grinding, interpretive, whatever comes next.",
    "target": "other"
  },
  {
    "id": "CPL0887",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, spin {target} out, pull them back, and dip them low. Hold them there. Offer the rose — real or imagined. Make the moment ridiculous and sincere at once.",
    "target": "other"
  },
  {
    "id": "CPL0888",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, compose a love song for {target} on the spot. Ten seconds, terrible melody, entirely heartfelt. Sing it directly to them.",
    "target": "other"
  },
  {
    "id": "CPL0889",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, you are the interviewer, {target} is the star. Red carpet, flashing lights. Ask them about your romance like it's the love story of the century — because it is.",
    "target": "other"
  },
  {
    "id": "CPL0890",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, recreate your first kiss with {target} right now — but slow it to a freeze-frame at the exact moment. Hold it. Let everyone see.",
    "target": "other"
  },
  {
    "id": "CPL0891",
    "chapter": "playful",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3,
    "text": "{actor}, scoop {target} up bridal-style and carry them for ten full seconds. Vow eternal devotion while you do it. Mean every ridiculous word.",
    "target": "other"
  },
  {
    "id": "CPL0892",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "One of your grand romantic gestures landed completely wrong. Tell {target} the story — all of it — including your face when it went sideways.",
    "target": "other"
  },
  {
    "id": "CPL0893",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "{target} does one small, unremarkable thing that quietly melts you every time. Name it. Admit how long it's been working on you.",
    "target": "other"
  },
  {
    "id": "CPL0894",
    "chapter": "playful",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3,
    "text": "Name the movie couple you two actually are. Then cast it: who plays whom, and why is the answer obvious to everyone but you?",
    "target": "other"
  },
  {
    "id": "CPL0895",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3.5,
    "text": "Spot {target} right now as if you've just noticed them across a crowded room. What lands first — eyes, mouth, the way they hold themselves? Name it without softening.",
    "target": "other"
  },
  {
    "id": "CPL0896",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 3.5,
    "text": "There is an outfit {target} owns that you think about more than you've admitted. Describe it. Tell them why you want to see it again.",
    "target": "other"
  },
  {
    "id": "CPL0897",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "You have a dream date you've never spoken aloud to {target} — too specific, too telling, too much. Say it now. All of it.",
    "target": "other"
  },
  {
    "id": "CPL0898",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "Something {target} did this week was unexpectedly, undeniably sexy. Name the moment. Tell them exactly what it did to your attention.",
    "target": "other"
  },
  {
    "id": "CPL0899",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "There is a compliment you've been holding back from {target} — turning it over, never quite saying it. Say it now. Directly. No softening the edges.",
    "target": "other"
  },
  {
    "id": "CPL0900",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4,
    "text": "{target} gave you butterflies recently — that specific flutter that has no business showing up this far into knowing someone. When was it? What caused it?",
    "target": "other"
  },
  {
    "id": "CPL0901",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "{actor}, tell {target} — not in general, not someday. Right now. Which part of {target_his} body do you crave pressed against yours most?",
    "target": "other"
  },
  {
    "id": "CPL0902",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 4.5,
    "text": "Lyra already suspects. Something {target} does — perfectly innocent, completely mundane — and it undoes you. Name it.",
    "target": "other"
  },
  {
    "id": "CPL0903",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "The next time you're alone with {target}, you've already planned something. Lyra wants to hear it. What exactly have you pictured doing?",
    "target": "other"
  },
  {
    "id": "CPL0904",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "There's a move you haven't made yet. Something you've been saving. Tell {target} what it is before you lose your nerve.",
    "target": "other"
  },
  {
    "id": "CPL0905",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "Somewhere in a dull, ordinary moment — a waiting room, a grocery line, a long drive — you wanted {target} badly. When was it, and what set it off?",
    "target": "other"
  },
  {
    "id": "CPL0906",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{target} has a quality that distracts you in rooms full of other people. Dangerously so. Name it. Don't soften it.",
    "target": "other"
  },
  {
    "id": "CPL0907",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "If the room emptied and only {target} remained — what would you lean in and whisper? Say it now. The room hasn't emptied, but Lyra commands it anyway.",
    "target": "other"
  },
  {
    "id": "CPL0908",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "Your mind returns to one particular scene with {target}. Replays it. Lingers. Which scenario is it, and why won't it leave you?",
    "target": "other"
  },
  {
    "id": "CPL0909",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3.5,
    "text": "{actor}, find {target}'s eyes. Hold them. Give {target_him} a slow, deliberate wink — then don't look away for five full seconds. Let it land.",
    "target": "other"
  },
  {
    "id": "CPL0910",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3.5,
    "text": "{actor}, {target} is smiling right now or {target_she} will be soon. Describe that smile as if it's the finest thing you've witnessed all day. Mean every word.",
    "target": "other"
  },
  {
    "id": "CPL0911",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, somewhere today, {target} looked irresistible to you. Name the exact moment — the light, the posture, the expression. Make {target_him} see it.",
    "target": "other"
  },
  {
    "id": "CPL0912",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, reach over and brush {target}'s hair back from {target_his} face. Slowly. Then say what you were actually thinking just now.",
    "target": "other"
  },
  {
    "id": "CPL0913",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "text": "{actor}, there's a look you give {target} when words would only ruin it. Give {target_him} that look. Hold it. Don't explain.",
    "target": "other"
  },
  {
    "id": "CPL0914",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, take {target}'s hand. Bring it to your mouth. Press your lips to the back of it — then trail upward, slow, to the wrist. Don't rush.",
    "target": "other"
  },
  {
    "id": "CPL0915",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "text": "{actor}, close the distance until you can feel {target}'s warmth on your skin. Breathe {target_him} in. Stay there. Ten full seconds. No touching. Just presence.",
    "target": "other"
  },
  {
    "id": "CPL0916",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, lean close to {target} and whisper something so specific, so wicked, that {target_she} has no choice but to look away. Make it true.",
    "target": "other"
  },
  {
    "id": "CPL0917",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, drag one fingertip slowly along {target}'s collarbone. Then tell {target_him} exactly where your mind just went.",
    "target": "other"
  },
  {
    "id": "CPL0918",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, lean in. Slow. Stop with your mouth a breath from {target}'s. Stay there. Don't move. Let {target_him} close the gap — or not.",
    "target": "other"
  },
  {
    "id": "CPL0919",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, press your lips just below {target}'s ear. Linger there. Let {target_him} feel you smile against {target_his} skin.",
    "target": "other"
  },
  {
    "id": "CPL0920",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, take {target}'s hand and press it flat against your chest — over your heart. Hold it there. Then tell {target_him} why it's beating like that.",
    "target": "other"
  },
  {
    "id": "CPL0921",
    "chapter": "flirty",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, step behind {target} and pull {target_him} in slowly — arms all the way around, chin near {target_his} shoulder. Stay there. Then name one thing you want later tonight.",
    "target": "other"
  },
  {
    "id": "CPL0922",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "There's something you've wanted to try with {target} — something specific, something you've circled in your mind but never said out loud. Lyra is listening. Say it now.",
    "target": "other"
  },
  {
    "id": "CPL0923",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5,
    "text": "{target} doesn't know this about you. A turn-on, particular and quiet, that you've kept to yourself. What is it?",
    "target": "other"
  },
  {
    "id": "CPL0924",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "Location matters. You've imagined {target} on you somewhere specific — somewhere that stays with you. Where? Don't sanitize it.",
    "target": "other"
  },
  {
    "id": "CPL0925",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "{target} does something — a gesture, a sound, a small movement — and suddenly keeping your hands off {target_him} becomes impossible. Name what it is.",
    "target": "other"
  },
  {
    "id": "CPL0926",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 5.5,
    "text": "There's a fantasy that lives just past the edge of what you'd usually admit. One step outside your comfort zone. Lyra already knows the shape of it. Describe it.",
    "target": "other"
  },
  {
    "id": "CPL0927",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "This week. Something bold — with {target}, not someday, not in theory. What's the one thing you'd do if you stopped hesitating?",
    "target": "other"
  },
  {
    "id": "CPL0928",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "Foreplay with {target} has a part that ends too soon. You've felt it — the moment where you wish time would stop. Which part do you want to stretch out?",
    "target": "other"
  },
  {
    "id": "CPL0929",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "There's something you want {target} to take control of. Fully. Without asking. Tell {target_him} what it is — and tell {target_him} you want it.",
    "target": "other"
  },
  {
    "id": "CPL0930",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6,
    "text": "Public. Other people around. And {target} still managed to turn you on without trying — or maybe while trying. When was it? What did {target_she} do?",
    "target": "other"
  },
  {
    "id": "CPL0931",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "This one you've kept. A turn-on you haven't named to {target} — not once, not even as a hint. Lyra says the keeping is over. Confess it.",
    "target": "other"
  },
  {
    "id": "CPL0932",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "You drafted it. Maybe you almost sent it. A message to {target} that would have changed the temperature of the room. What did it say?",
    "target": "other"
  },
  {
    "id": "CPL0933",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "There's a part of your body that deserves {target}'s full, unhurried attention — and hasn't gotten it. Which part? Tell {target_him} directly.",
    "target": "other"
  },
  {
    "id": "CPL0934",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "Lately, your mind has gone somewhere specific when it comes to {target}. Not vague. Specific. What have you fantasized about doing to {target_him}?",
    "target": "other"
  },
  {
    "id": "CPL0935",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "One hour. {target} has total freedom over your body — no rules, no limits, no asking. What do you want {target_him} to do with it?",
    "target": "other"
  },
  {
    "id": "CPL0936",
    "chapter": "suggestive",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "You've hinted at it. Circled it. Implied it without ever quite saying it. {target} may have caught the signal or missed it entirely. Say it plainly now.",
    "target": "other"
  },
  {
    "id": "CPL0937",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "text": "{actor}, kiss {target}. Slowly. Not a greeting — a statement. Don't break it until {target_she} does.",
    "target": "other"
  },
  {
    "id": "CPL0938",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, one finger. Draw it across {target}'s skin and trace exactly where you want your mouth. Take your time. Let {target_him} watch.",
    "target": "other"
  },
  {
    "id": "CPL0939",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5.5,
    "text": "{actor}, lean close to {target}'s ear and say one thing you want to do to {target_him} later. Just one. Then pull back and change the subject like nothing happened.",
    "target": "other"
  },
  {
    "id": "CPL0940",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, place your hands on {target} and begin. Thirty seconds. A massage — but your hands are allowed to forget the rules. Let them wander.",
    "target": "other"
  },
  {
    "id": "CPL0941",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, find one button, one clasp, one fold on {target}. Undo it slowly. Leave it open. Say nothing.",
    "target": "other"
  },
  {
    "id": "CPL0942",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6,
    "text": "{actor}, look at {target} from across the room. Hold {target_his} gaze. Give {target_him} the look that carries the full weight of what's coming later. Make it unmistakable.",
    "target": "other"
  },
  {
    "id": "CPL0943",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, press your lips to {target}'s neck. Move downward. Slowly. Stop right at the point where it starts to mean something more — and stay there.",
    "target": "other"
  },
  {
    "id": "CPL0944",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, step behind {target} and press close — chest to back. Bring your mouth to {target_his} ear and murmur, in exact detail, what you're imagining right now.",
    "target": "other"
  },
  {
    "id": "CPL0945",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, take {target}'s hands. Move them. Place them exactly where you want them on your body — and hold them there.",
    "target": "other"
  },
  {
    "id": "CPL0946",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, bring your mouth close to {target}'s — close enough to feel {target_his} breath — and don't close it. Move away. Come back. Almost. Again. Hold out until {target_she} takes it.",
    "target": "other"
  },
  {
    "id": "CPL0947",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, find the outermost layer on {target}. Remove it. Slowly. Then look at what's revealed like it's something worth looking at.",
    "target": "other"
  },
  {
    "id": "CPL0948",
    "chapter": "suggestive",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, you have {target} all to yourself right now. If this were yours to begin — no interruptions, no hesitation — tell {target_him} exactly how you'd start. Every detail.",
    "target": "other"
  },
  {
    "id": "CPL0949",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "There's something you haven't explored yet — a curiosity that lives in the quieter part of your desire. Something you'd want to try with {target}, if you let yourself want it. Name it.",
    "target": "other"
  },
  {
    "id": "CPL0950",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 6.5,
    "text": "Between you and {target}, there's something about intimacy that goes unspoken — something you wish had room to breathe. What is it you wish the two of you talked about more?",
    "target": "other"
  },
  {
    "id": "CPL0951",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{actor}, tell {target} exactly how you need to be touched — the pressure, the place, the pace. Not what you've hinted at. What you've never quite said out loud.",
    "target": "other"
  },
  {
    "id": "CPL0952",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{actor}, there was a moment in {target}'s hands when you came undone — not just physically, but completely. Name it. When did {target} see all of you and you let them?",
    "target": "other"
  },
  {
    "id": "CPL0953",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{actor}, one fantasy lives in you that was made for {target} alone — not borrowed, not shared, not admitted until now. What is it?",
    "target": "other"
  },
  {
    "id": "CPL0954",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{actor}, something is missing. Not painfully — but it aches, the way a held breath aches. What do you want more of from {target}, in bed, in the dark, when words are easiest?",
    "target": "other"
  },
  {
    "id": "CPL0955",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, you are mid-moment, skin to skin, heat everywhere. What do you breathe into {target}'s ear? Say it now as if they're already there.",
    "target": "other"
  },
  {
    "id": "CPL0956",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, close your eyes. Picture {target}'s hands on you. They move. Where do they go first — and where do they linger? Open your eyes and tell {target} what you saw.",
    "target": "other"
  },
  {
    "id": "CPL0957",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, there is one thing {target} does to you that you would grieve losing. One touch, one rhythm, one specific thing. Name it. Let {target} know they should never stop.",
    "target": "other"
  },
  {
    "id": "CPL0958",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7,
    "text": "{actor}, you carry a desire that belongs to this room alone — to {target} alone. Something you'd confess to no one else. Lyra already knows it's there. Say it.",
    "target": "other"
  },
  {
    "id": "CPL0959",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, find the topmost layer on {target} and peel it away. Lips follow every inch of skin you bare. Slow. Deliberate. There is nowhere to be but here.",
    "target": "other"
  },
  {
    "id": "CPL0960",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 6.5,
    "text": "{actor}, take {target}'s face, kiss {target_him} deep and long, and let your hands say everything your mouth can't while it's occupied.",
    "target": "other"
  },
  {
    "id": "CPL0961",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, lay {target} back. Your lips find {target_his} collarbone first. Then you descend — inch by inch, no rushing — until {target} forgets to breathe.",
    "target": "other"
  },
  {
    "id": "CPL0962",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, tell {target} where you want {target_his} hands. Say it clearly. Then reach out and place them there yourself.",
    "target": "other"
  },
  {
    "id": "CPL0963",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, one fingertip only. Trace every place on {target} you plan to put your mouth tonight. A map. A promise. Let {target} feel what's coming.",
    "target": "other"
  },
  {
    "id": "CPL0964",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "text": "{actor}, dim the lights. Pull {target} close. Tonight you set the pace — the pressure, the tempo, all of it. {target} follows your lead.",
    "target": "other"
  },
  {
    "id": "CPL0965",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, press your chest to {target_his}. Find {target}'s breath and match it. When your rhythms align, say — low and clear — exactly what you want next.",
    "target": "other"
  },
  {
    "id": "CPL0966",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, kiss {target} deep and don't stop — but let your hands move slowly, finding each button, each clasp, each edge of fabric, until one layer is gone.",
    "target": "other"
  },
  {
    "id": "CPL0967",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, look at {target}. Hold {target_his} gaze. Now tell {target} what {target_she} does to you — the weight of it, the heat of it. All of it. Don't flinch.",
    "target": "other"
  },
  {
    "id": "CPL0968",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, take {target}'s wrist. Turn it over. Start at the inside of the wrist with your mouth and kiss — slowly, continuously — up the arm to the shoulder.",
    "target": "other"
  },
  {
    "id": "CPL0969",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, run both hands over {target}'s body — slowly, completely — and wherever {target} shudders or stills, stop. Stay. Your hands are paying attention.",
    "target": "other"
  },
  {
    "id": "CPL0970",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, touch {target} as if your fingertips weigh nothing. Barely there. Maddening. Keep going until {target} says the words — until {target} asks for more.",
    "target": "other"
  },
  {
    "id": "CPL0971",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, find a place on {target}'s body {target_she} isn't expecting. Put your mouth there. Watch {target}'s face when you do.",
    "target": "other"
  },
  {
    "id": "CPL0972",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, undress {target} completely. Take your time. When {target} is bare in front of you, tell {target} — specifically, honestly — what you see.",
    "target": "other"
  },
  {
    "id": "CPL0973",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, lay {target} down and hold {target_him} there, gently, your weight a presence not a force. Don't rush. Make {target} feel wanted before a single thing else happens.",
    "target": "other"
  },
  {
    "id": "CPL0974",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, choose one spot on {target}'s body. Work it — lips, breath, hands — until {target} is shifting, restless, reaching for more. Only then do you move.",
    "target": "other"
  },
  {
    "id": "CPL0975",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, put your lips to {target}'s ear. Breathe out your most unguarded want. Every word. Then — without pause — begin.",
    "target": "other"
  },
  {
    "id": "CPL0976",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 7.5,
    "text": "{actor}, something {target} does lands softer than you want it to. What does {target} need to do harder — and where?",
    "target": "other"
  },
  {
    "id": "CPL0977",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, the fantasy has lived in your body long enough. Name the one you're finally ready to play out with {target} — tonight, in this room.",
    "target": "other"
  },
  {
    "id": "CPL0978",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8,
    "text": "{actor}, your mind went somewhere filthy today. {target} was in it. Describe exactly what happened in your head.",
    "target": "other"
  },
  {
    "id": "CPL0979",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, somewhere in you is a command you want {target} to give you — something you haven't asked for, something that makes your pulse jump just thinking it. What is it?",
    "target": "other"
  },
  {
    "id": "CPL0980",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, right now, in your body — not in theory, not eventually. Right now. Where do you want {target}'s hands? Be exact.",
    "target": "other"
  },
  {
    "id": "CPL0981",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, if tonight had no ceiling — no holding back, no softening — how do you want {target}? At your most honest. At your most intense.",
    "target": "other"
  },
  {
    "id": "CPL0982",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, there is something you want from {target} that lives just past the reach of what you normally ask for. If you let yourself beg — really beg — what would it be?",
    "target": "other"
  },
  {
    "id": "CPL0983",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, {target}'s voice can be a weapon. What do you want to hear {target_him} say — the filthiest version, the one that undoes you? Tell {target} what to say.",
    "target": "other"
  },
  {
    "id": "CPL0984",
    "chapter": "erotic",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, there is an edge in you that only {target} gets to see. A limit you'd push for no one else. Name it. Tonight, with {target}, what would you cross?",
    "target": "other"
  },
  {
    "id": "CPL0985",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, kiss {target} hard — deep, claiming — then pull back. Not far. Just far enough. Let {target} come to you.",
    "target": "other"
  },
  {
    "id": "CPL0986",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "text": "{actor}, start at {target}'s mouth. Work downward — neck, chest, ribs — slowly enough that every place feels what's coming. Let your body say what you want.",
    "target": "other"
  },
  {
    "id": "CPL0987",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, take {target}'s body. Not roughly — decisively. Adjust {target_him} where you want {target_him}. Set the rhythm. This is yours to control.",
    "target": "other"
  },
  {
    "id": "CPL0988",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, undress {target} slowly. Every layer. When {target} is bare, look {target_him} in the eye and tell {target} exactly what you're about to do — before you do it.",
    "target": "other"
  },
  {
    "id": "CPL0989",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, pin {target} down. Hold {target_him} there with your weight, your hands, your gaze. Make {target} earn it. Don't move until {target} says please.",
    "target": "other"
  },
  {
    "id": "CPL0990",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, grip {target} where {target_she} feels it most. Hold. Then tell {target} — low and unhurried — exactly what comes next.",
    "target": "other"
  },
  {
    "id": "CPL0991",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "text": "{actor}, undress yourself. Slowly. Every piece deliberate. {target} watches — hands at {target_his} sides, not touching — until you're done.",
    "target": "other"
  },
  {
    "id": "CPL0992",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, mouth only. Hands behind your back if you need the reminder. Give {target} sixty full seconds of nothing but lips and breath and intention.",
    "target": "other"
  },
  {
    "id": "CPL0993",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, bring {target} to the edge — slowly, precisely, until {target}'s breath breaks — then stop. Hold there. Let {target} ask for more before you give it.",
    "target": "other"
  },
  {
    "id": "CPL0994",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, put your lips to {target}'s ear and speak — slowly, explicitly, every filthy detail of what you plan to do. Your hands move the whole time. Barely. Maddening.",
    "target": "other"
  },
  {
    "id": "CPL0995",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, keep {target}'s gaze. Don't look away. Now do exactly what you described — all of it — while {target} watches your eyes.",
    "target": "other"
  },
  {
    "id": "CPL0996",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, take {target}'s wrists. Pin them above {target_his} head. Your weight settles. Your pace is yours. {target} stays where you put {target_him}.",
    "target": "other"
  },
  {
    "id": "CPL0997",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, bring {target} right to the edge — deliberate, thorough — then stop cold. Make {target} tell you, in words, how badly {target_she} wants it. Then decide if {target} has earned it.",
    "target": "other"
  },
  {
    "id": "CPL0998",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, one order. Give it to {target} clearly. Then wait — completely still, completely patient — until {target} obeys.",
    "target": "other"
  },
  {
    "id": "CPL0999",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, take {target} apart slowly. Touch, tease, withhold — until {target} is shaking and the word please has left {target_his} mouth more than once. Then give {target} everything.",
    "target": "other"
  },
  {
    "id": "CPL1000",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, two minutes. Everything belongs to you. {target}'s body, {target_his} breath, the pace, the pressure. {target} does not move without your say. Begin.",
    "target": "other"
  },
  {
    "id": "CPL1001",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, strip {target} down — layer by slow layer — and know this: they don't get to finish until you give them permission.",
    "target": "other"
  },
  {
    "id": "CPL1002",
    "chapter": "erotic",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, set the rule now and make it absolute: {target} doesn't get to break open until your name is the last thing on their lips.",
    "target": "other"
  },
  {
    "id": "CPL1003",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor} — the thing you've pictured doing to {target} that you've never said aloud. Not a fantasy. A plan. Name it.",
    "target": "other"
  },
  {
    "id": "CPL1004",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 8.5,
    "text": "{actor}, one night. No limits. What power would you hand {target} over your body — and how deep would you let them take it?",
    "target": "other"
  },
  {
    "id": "CPL1005",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "The heat in this room has loosened something in you, {actor}. What truth have you been holding so tightly it's left marks? Say it out loud.",
    "target": "other"
  },
  {
    "id": "CPL1006",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "{actor}, there's something you ache for and still feel guilty about wanting. Lyra already knows what it is. Say it anyway.",
    "target": "other"
  },
  {
    "id": "CPL1007",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9,
    "text": "If this moment vanished the moment it was over — no memory, no consequences — what scene would you play out with {target} right now?",
    "target": "other"
  },
  {
    "id": "CPL1008",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, one rule. Just one that {target} would hold you to tonight — firm, without mercy. What is it, and why does it make your breath catch?",
    "target": "other"
  },
  {
    "id": "CPL1009",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, the fantasy that unsettles you a little — the one that still surfaces no matter how many times you push it back. What is it?",
    "target": "other"
  },
  {
    "id": "CPL1010",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 9.5,
    "text": "{actor}, something in you wants to be pushed past choosing. Name it. What do you want {target} to take out of your hands tonight?",
    "target": "other"
  },
  {
    "id": "CPL1011",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 10,
    "text": "{actor} — with {target} and no walls left standing, how far would you actually go? Not what you'd admit in daylight. Right now. How far?",
    "target": "other"
  },
  {
    "id": "CPL1012",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "truth",
    "intensity": 10,
    "text": "{actor}, the craving you've buried deepest — the one {target} doesn't know the full shape of. Surrender it. Right now. Out loud.",
    "target": "other"
  },
  {
    "id": "CPL1013",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, give {target} one order and name exactly what happens if they break it. Speak slowly. Mean every syllable.",
    "target": "other"
  },
  {
    "id": "CPL1014",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, place {target} exactly where you want them. Tell them what position to hold — and make clear they don't move until you say so.",
    "target": "other"
  },
  {
    "id": "CPL1015",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, take something {target} wants — their touch, their freedom, your attention — and don't give it back until they've earned it in front of you.",
    "target": "other"
  },
  {
    "id": "CPL1016",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "text": "{actor}, before a single hand lands — make {target} confess their darkest want out loud. You don't move until they do.",
    "target": "other"
  },
  {
    "id": "CPL1017",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, three commands. Back to back. {target} completes all three before they receive a single thing in return. Begin.",
    "target": "other"
  },
  {
    "id": "CPL1018",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, pin {target} down and take them right to the edge — then pull back. Cold. Complete. Watch what that does to them.",
    "target": "other"
  },
  {
    "id": "CPL1019",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, decide what {target} may do tonight — and what they may not. Then read it to them, slowly, looking them in the eye.",
    "target": "other"
  },
  {
    "id": "CPL1020",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, make {target} beg. When they do — pause, smile, and tell them to say it prettier. Then decide if it's enough.",
    "target": "other"
  },
  {
    "id": "CPL1021",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "text": "{actor}, for the next three minutes every breath {target} takes, every shift of their body, belongs to you. Take ownership of all of it.",
    "target": "other"
  },
  {
    "id": "CPL1022",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, {target}'s pleasure is yours tonight — entirely. They make no choices. They ask for nothing. You decide everything.",
    "target": "other"
  },
  {
    "id": "CPL1023",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, cover {target}'s eyes. Now their skin is your canvas. Every touch arrives without warning. Let the uncertainty be the point.",
    "target": "other"
  },
  {
    "id": "CPL1024",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, bring {target} to the edge and hold them there until they're desperate with wanting. Then name one more thing they must do before you give them relief.",
    "target": "other"
  },
  {
    "id": "CPL1025",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "text": "{actor}, trace tonight's rules onto {target}'s skin with your fingertips as you speak them. Make sure they feel every boundary you set.",
    "target": "other"
  },
  {
    "id": "CPL1026",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, take {target} — all of them — and don't loosen your grip until their surrender is total and completely without question.",
    "target": "other"
  },
  {
    "id": "CPL1027",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, nothing {target} craves tonight comes freely. Make them earn each thing — one demand, one proof of obedience at a time.",
    "target": "other"
  },
  {
    "id": "CPL1028",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, take {target} to the very edge of what they can hold — and keep them there. Trembling. Present. Right on the brink.",
    "target": "other"
  },
  {
    "id": "CPL1029",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "text": "{actor}, you know one of {target}'s fantasies. Choose it — right now — and make it real. No hesitation. No softening. Real.",
    "target": "other"
  },
  {
    "id": "CPL1030",
    "chapter": "intimate",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7,
    "chain_id": "cpl_undress_intimate",
    "chain_step": 1,
    "text": "{actor}, shoes off. Everything that keeps you upright and defended — set it down. Settle your weight against {target} and stay there.",
    "target": "other"
  },
  {
    "id": "CPL1031",
    "chapter": "intimate",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 7.5,
    "chain_id": "cpl_undress_intimate",
    "chain_step": 2,
    "text": "{actor}, peel off one layer while {target} watches. Don't rush it. Let them look. Let the looking mean something.",
    "target": "other"
  },
  {
    "id": "CPL1032",
    "chapter": "intimate",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8,
    "chain_id": "cpl_undress_intimate",
    "chain_step": 3,
    "text": "{actor}, one more piece gone. You're close to the skin now. {target} is still watching — let them.",
    "target": "other"
  },
  {
    "id": "CPL1033",
    "chapter": "erotic",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "chain_id": "cpl_undress_intimate",
    "chain_step": 4,
    "text": "{actor}, the last layer drops now. Stand in it. Let {target}'s eyes move over all of you — and don't look away.",
    "target": "other"
  },
  {
    "id": "CPL1034",
    "chapter": "flirty",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 3.5,
    "chain_id": "cpl_flirty_closein",
    "chain_step": 1,
    "text": "{actor}, move knee-to-knee with {target}. Hold their gaze — unblinking, unguarded — for twenty full seconds. Lyra is counting.",
    "target": "other"
  },
  {
    "id": "CPL1035",
    "chapter": "flirty",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4,
    "chain_id": "cpl_flirty_closein",
    "chain_step": 2,
    "text": "{actor}, one slow line — fingertip from {target}'s wrist up to their shoulder. Then say out loud the one thing you're craving right now.",
    "target": "other"
  },
  {
    "id": "CPL1036",
    "chapter": "flirty",
    "role": "interaction",
    "type": "directed",
    "promptType": "dare",
    "intensity": 4.5,
    "chain_id": "cpl_flirty_closein",
    "chain_step": 3,
    "text": "{actor}, bring your lips a breath from {target}'s — close enough to feel the warmth of them — then pull back. Grin. Let them sit with that.",
    "target": "other"
  },
  {
    "id": "CPL1037",
    "chapter": "flirty",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 5,
    "chain_id": "cpl_flirty_closein",
    "chain_step": 4,
    "text": "{actor}, kiss {target} once. Slow, full, deliberate. Then put your lips to their ear and say exactly what's moving through your mind right now.",
    "target": "other"
  },
  {
    "id": "CPL1038",
    "chapter": "taboo",
    "role": "setup",
    "type": "directed",
    "promptType": "dare",
    "intensity": 8.5,
    "chain_id": "cpl_taboo_control",
    "chain_step": 1,
    "text": "{actor}, take {target}'s wrists. Hold them. Make clear with your grip and your silence that they stay exactly where you've put them.",
    "target": "other"
  },
  {
    "id": "CPL1039",
    "chapter": "taboo",
    "role": "build",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9,
    "chain_id": "cpl_taboo_control",
    "chain_step": 2,
    "text": "{actor}, one command. Speak it to {target} clearly — no softening, no asking. Nothing else happens until they've obeyed it.",
    "target": "other"
  },
  {
    "id": "CPL1040",
    "chapter": "taboo",
    "role": "action",
    "type": "directed",
    "promptType": "dare",
    "intensity": 9.5,
    "chain_id": "cpl_taboo_control",
    "chain_step": 3,
    "text": "{actor}, take {target} to the edge — slow, deliberate, certain — then stop. Completely. Make them use their voice to ask for what comes next.",
    "target": "other"
  },
  {
    "id": "CPL1041",
    "chapter": "taboo",
    "role": "peak",
    "type": "directed",
    "promptType": "dare",
    "intensity": 10,
    "chain_id": "cpl_taboo_control",
    "chain_step": 4,
    "text": "{actor}, decide right now how tonight ends. Tell {target} exactly what you've decided. Then make every word of it come true.",
    "target": "other"
  }
];
