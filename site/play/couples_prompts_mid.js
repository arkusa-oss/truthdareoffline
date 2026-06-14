// Lyra's Orb — Couple Edition
// Couples prompts: flirty + suggestive stages
// Philosophy: guided intimacy, body discovery, new physical vocabulary
// Each prompt is a structured experience that teaches something new

var COUPLES_PROMPTS_MID = [
  // ============================================================================
  // STAGE 3: FLIRTY (80 prompts) — Bolero, slow guitar, candlelight 70 BPM
  // Tension building, body awareness awakening, the slow guitar sets the pace
  // 25 truths, 55 dares
  // ============================================================================

  // SETUP ROLE (10 prompts)
  { id: "CPL0161", chapter: "flirty", role: "setup", type: "directed", promptType: "truth", intensity: 4, text: "What part of your own body do you find most magnetic when you're alone? Not for pleasure — just aesthetically.", target: "self" },
  { id: "CPL0162", chapter: "flirty", role: "setup", type: "directed", promptType: "truth", intensity: 4, text: "When you catch {target} moving without thinking they're being watched, what movement arrests you?", target: "self" },
  { id: "CPL0163", chapter: "flirty", role: "setup", type: "directed", promptType: "dare", intensity: 4, text: "{actor}, sit across from {target} with only the candlelight between you. Don't touch. Watch them for 60 seconds without breaking eye contact. Let them see you noticing.", target: "other" },
  { id: "CPL0164", chapter: "flirty", role: "setup", type: "directed", promptType: "dare", intensity: 4, text: "{actor}, trace the outline of {target}'s hand with your fingertip—slowly enough that each line takes 3 seconds. Don't interlock. Just map.", target: "other" },
  { id: "CPL0165", chapter: "flirty", role: "setup", type: "directed", promptType: "truth", intensity: 4, text: "What's a way you'd like to be touched that feels too tender to ask for?", target: "self" },
  { id: "CPL0166", chapter: "flirty", role: "setup", type: "directed", promptType: "dare", intensity: 4, text: "Both close your eyes. {actor}, place your hand on {target}'s arm. Hold it there while the guitar plays one full phrase. Feel the warmth. Don't move.", target: "other" },
  { id: "CPL0167", chapter: "flirty", role: "setup", type: "directed", promptType: "truth", intensity: 4, text: "What texture makes you feel most alive—silk, skin, warmth, cold? Why that one?", target: "self" },
  { id: "CPL0168", chapter: "flirty", role: "setup", type: "directed", promptType: "dare", intensity: 4, text: "{actor}, stand behind {target}. Breathe slowly so {target} can feel your breath on their neck, 6 inches away. Don't touch. Stay there for the length of one song phrase.", target: "other" },
  { id: "CPL0169", chapter: "flirty", role: "setup", type: "directed", promptType: "truth", intensity: 4, text: "When {target} is close to you, where on your body do you become most aware of space between you?", target: "self" },
  { id: "CPL0170", chapter: "flirty", role: "setup", type: "directed", promptType: "dare", intensity: 4, text: "{actor}, brush a strand of hair from {target}'s face—slowly. Let your fingers linger for a moment on their cheek. Step back. Say nothing.", target: "other" },

  // INTERACTION ROLE (16 prompts)
  { id: "CPL0171", chapter: "flirty", role: "interaction", type: "directed", promptType: "truth", intensity: 4, text: "What kind of attention from {target} makes you forget to breathe?", target: "self" },
  { id: "CPL0172", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, take {target}'s hand. Place it flat on your chest—over your heart. Let them feel you for 30 seconds. Tell them what you're feeling right now.", target: "other" },
  { id: "CPL0173", chapter: "flirty", role: "interaction", type: "directed", promptType: "truth", intensity: 4, text: "What's a look from {target} that makes your skin want to be touched?", target: "self" },
  { id: "CPL0174", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, kiss {target}'s wrist—slowly, deliberately. Ask them to tell you what they feel traveling up their arm.", target: "other" },
  { id: "CPL0175", chapter: "flirty", role: "interaction", type: "directed", promptType: "truth", intensity: 4, text: "When {target} looks at you like they want you, what part of you responds first?", target: "self" },
  { id: "CPL0176", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, let {target} unbutton one thing on you—slowly. Don't help. Let them do it entirely at their pace. Notice what they do after.", target: "other" },
  { id: "CPL0177", chapter: "flirty", role: "interaction", type: "directed", promptType: "truth", intensity: 4, text: "What does {target}'s voice sound like right before they want to touch you?", target: "self" },
  { id: "CPL0178", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, stand facing {target}. Run the back of your hand down their arm from shoulder to wrist—one slow stroke. Make eye contact the whole time.", target: "other" },
  { id: "CPL0179", chapter: "flirty", role: "interaction", type: "directed", promptType: "truth", intensity: 4, text: "How does {target}'s breathing change when they're thinking about you?", target: "self" },
  { id: "CPL0180", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, trace {target}'s collarbone with your index finger. Whisper one true thing about how you see them.", target: "other" },
  { id: "CPL0181", chapter: "flirty", role: "interaction", type: "directed", promptType: "truth", intensity: 4, text: "What's the most vulnerable you've ever felt with {target}? Not afraid—exposed.", target: "self" },
  { id: "CPL0182", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, hold {target}'s face in your hands. Press your forehead to theirs. Breathe together for one full minute.", target: "other" },
  { id: "CPL0183", chapter: "flirty", role: "interaction", type: "directed", promptType: "truth", intensity: 4, text: "When did you first realize {target}'s touch could change your heartbeat?", target: "self" },
  { id: "CPL0184", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, let {target} guide your hand to the place on their body they most want to feel you touch. Don't rush. Let them place you exactly.", target: "other" },
  { id: "CPL0185", chapter: "flirty", role: "interaction", type: "directed", promptType: "truth", intensity: 4, text: "What's a way you'd like {target} to move toward you that you haven't named?", target: "self" },
  { id: "CPL0186", chapter: "flirty", role: "interaction", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, dance with {target} close enough that you're sharing breath. Move so slowly the music almost disappears. Notice where your bodies find balance.", target: "other" },

  // BUILD ROLE (22 prompts)
  { id: "CPL0187", chapter: "flirty", role: "build", type: "directed", promptType: "truth", intensity: 4.5, text: "What kind of touch do you crave that you've never known how to ask for? Describe the sensation, not the act.", target: "self" },
  { id: "CPL0188", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, place your hand at the small of {target}'s back and guide them slowly across the room. Don't speak. Let your hand be the only conversation.", target: "other" },
  { id: "CPL0189", chapter: "flirty", role: "build", type: "directed", promptType: "truth", intensity: 4.5, text: "When {target} touches you, where does your mind go? Not the obvious answer—the real one.", target: "self" },
  { id: "CPL0190", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, trace a slow line from {target}'s wrist to their shoulder with one fingertip. Ask them to tell you when the sensation changes.", target: "other" },
  { id: "CPL0191", chapter: "flirty", role: "build", type: "directed", promptType: "truth", intensity: 4.5, text: "What's the difference between how it feels when {target} touches you because they want to versus because you asked?", target: "self" },
  { id: "CPL0192", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, stand behind {target}. Put your hands on their shoulders. Move them exactly the way they'd move themselves if they were alone and the music was this good.", target: "other" },
  { id: "CPL0193", chapter: "flirty", role: "build", type: "directed", promptType: "truth", intensity: 4.5, text: "What does {target}'s touch teach your skin about desire?", target: "self" },
  { id: "CPL0194", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, kiss {target} in three places you've never kissed them before—all above the collar. Let them guess where you'll go next.", target: "other" },
  { id: "CPL0195", chapter: "flirty", role: "build", type: "directed", promptType: "truth", intensity: 4.5, text: "What would you like {target} to learn about your body that they don't know yet?", target: "self" },
  { id: "CPL0196", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, undress one layer. Ask {target} to trace the line where your skin meets air. Feel their fingers memorizing you.", target: "other" },
  { id: "CPL0197", chapter: "flirty", role: "build", type: "directed", promptType: "truth", intensity: 4.5, text: "When {target} moves with intention toward you, what does your body do without permission from your mind?", target: "self" },
  { id: "CPL0198", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, whisper against {target}'s ear—close enough that they feel the words as texture, not sound. Tell them one way they move that arrests you.", target: "other" },
  { id: "CPL0199", chapter: "flirty", role: "build", type: "directed", promptType: "truth", intensity: 4.5, text: "What's a rhythm—breath, heartbeat, movement—that you want to fall into with {target}?", target: "self" },
  { id: "CPL0200", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, with your eyes closed, touch {target}'s face like you're trying to memorize it by feel alone. Take 30 seconds. Don't rush.", target: "other" },
  { id: "CPL0201", chapter: "flirty", role: "build", type: "directed", promptType: "truth", intensity: 4.5, text: "How does it feel when {target} fully commits their attention to your body?", target: "self" },
  { id: "CPL0202", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, kiss the inside of {target}'s wrist. Hold your lips there. Feel their pulse. Whisper something true against their skin.", target: "other" },
  { id: "CPL0203", chapter: "flirty", role: "build", type: "directed", promptType: "truth", intensity: 4.5, text: "What's the smallest touch from {target} that makes you feel most seen?", target: "self" },
  { id: "CPL0204", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, slowly move your hand under {target}'s clothing—just your hand, just your presence. Ask them to guide you to where they want to be felt.", target: "other" },
  { id: "CPL0205", chapter: "flirty", role: "build", type: "directed", promptType: "truth", intensity: 4.5, text: "When you're alone and you think about {target}, what part of you responds first?", target: "self" },
  { id: "CPL0206", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, press your body close to {target}'s—chest to back, or face to face. Let them feel your breath deepen. Don't move. Just be present.", target: "other" },
  { id: "CPL0207", chapter: "flirty", role: "build", type: "directed", promptType: "truth", intensity: 4.5, text: "What's a way you'd like to be held that nobody's ever gotten right?", target: "self" },
  { id: "CPL0208", chapter: "flirty", role: "build", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, position yourself so {target} can wrap around you. Let them hold you the way they want to. Don't help. Let them learn you.", target: "other" },

  // ACTION ROLE (20 prompts)
  { id: "CPL0209", chapter: "flirty", role: "action", type: "directed", promptType: "truth", intensity: 5, text: "What would happen to you if {target} never stopped touching you?", target: "self" },
  { id: "CPL0210", chapter: "flirty", role: "action", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, undress {target} slowly—one piece at a time. After each layer, kiss the revealed skin. Slow. Reverent. Notice their breathing.", target: "other" },
  { id: "CPL0211", chapter: "flirty", role: "action", type: "directed", promptType: "truth", intensity: 5, text: "What does your body need from {target} that your mind hasn't found words for?", target: "self" },
  { id: "CPL0212", chapter: "flirty", role: "action", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, position {target} so you can see them fully in the candlelight. Touch them slowly—shoulders, collarbone, chest, ribs. Ask them where it feels best to be touched.", target: "other" },
  { id: "CPL0213", chapter: "flirty", role: "action", type: "directed", promptType: "truth", intensity: 5, text: "When {target} looks at your body, what do you imagine they're thinking?", target: "self" },
  { id: "CPL0214", chapter: "flirty", role: "action", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, massage {target}'s shoulders with intention. Ask them to whisper when you find a place that holds tension. Work that spot slowly.", target: "other" },
  { id: "CPL0215", chapter: "flirty", role: "action", type: "directed", promptType: "truth", intensity: 5, text: "What's a boundary you have that {target} respects without you saying anything?", target: "self" },
  { id: "CPL0216", chapter: "flirty", role: "action", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, trace {target}'s skin with your fingertips—not rushing, not tickling. Find the geometry of their body. See what they feel as pleasure.", target: "other" },
  { id: "CPL0217", chapter: "flirty", role: "action", type: "directed", promptType: "truth", intensity: 5, text: "What would you like to feel {target}'s hands doing to your body right now?", target: "self" },
  { id: "CPL0218", chapter: "flirty", role: "action", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, lie beside {target}. Trace the length of their body with one hand—spine, ribs, hip, leg. Slowly enough that you feel the landscape of them.", target: "other" },
  { id: "CPL0219", chapter: "flirty", role: "action", type: "directed", promptType: "truth", intensity: 5, text: "How does it change things when {target} takes pleasure in your body?", target: "self" },
  { id: "CPL0220", chapter: "flirty", role: "action", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, move against {target} with the rhythm of the music—no rush, no destination. Let your bodies find a conversation.", target: "other" },
  { id: "CPL0221", chapter: "flirty", role: "action", type: "directed", promptType: "truth", intensity: 5, text: "When did you first want {target} in the way you want them now?", target: "self" },
  { id: "CPL0222", chapter: "flirty", role: "action", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, take {target}'s hands and place them on your body where you most want to feel them. Guide them. Let them feel your desire.", target: "other" },
  { id: "CPL0223", chapter: "flirty", role: "action", type: "directed", promptType: "truth", intensity: 5, text: "What's the most {target} has ever made you feel?", target: "self" },
  { id: "CPL0224", chapter: "flirty", role: "action", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, kiss {target} with intention—not gentle, not frantic. Show them exactly how much you want them with your mouth.", target: "other" },
  { id: "CPL0225", chapter: "flirty", role: "action", type: "directed", promptType: "truth", intensity: 5, text: "How do you want {target} to know you want them?", target: "self" },
  { id: "CPL0226", chapter: "flirty", role: "action", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, undress fully. Ask {target} to touch you where they've been thinking about touching you. Slow. Attentive. Responsive.", target: "other" },
  { id: "CPL0227", chapter: "flirty", role: "action", type: "directed", promptType: "truth", intensity: 5, text: "What's the biggest thing you've never told {target} about wanting them?", target: "self" },
  { id: "CPL0228", chapter: "flirty", role: "action", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, position yourself so {target} can worship your body the way they want to. Give them permission to move, touch, explore. Receive.", target: "other" },

  // PEAK ROLE (7 prompts)
  { id: "CPL0229", chapter: "flirty", role: "peak", type: "directed", promptType: "truth", intensity: 5.5, text: "What does your body crave from {target} that you're almost afraid to want?", target: "self" },
  { id: "CPL0230", chapter: "flirty", role: "peak", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, bring {target} to the edge of what they can handle—touching, kissing, moving—right at the threshold. Hold them there. Feel their need.", target: "other" },
  { id: "CPL0231", chapter: "flirty", role: "peak", type: "directed", promptType: "truth", intensity: 5.5, text: "When {target} has you at their mercy, what do you feel?", target: "self" },
  { id: "CPL0232", chapter: "flirty", role: "peak", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, let {target} take control—your hands, your body, your movement. Show them that you trust them completely.", target: "other" },
  { id: "CPL0233", chapter: "flirty", role: "peak", type: "directed", promptType: "truth", intensity: 5.5, text: "What's the one thing {target} could do that would undo you completely?", target: "self" },
  { id: "CPL0234", chapter: "flirty", role: "peak", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, bring {target} as close as you can to release without crossing a boundary you've set. Feel their body speaking what their mouth won't.", target: "other" },
  { id: "CPL0235", chapter: "flirty", role: "peak", type: "directed", promptType: "truth", intensity: 5.5, text: "How does it feel to surrender to {target}?", target: "self" },

  // TRANSITION ROLE (5 prompts)
  { id: "CPL0236", chapter: "flirty", role: "transition", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, slow everything down. Hold {target} like you're remembering how. Breathe together until your hearts sync.", target: "other" },
  { id: "CPL0237", chapter: "flirty", role: "transition", type: "directed", promptType: "truth", intensity: 4.5, text: "What did you just learn about {target} that you didn't know before?", target: "self" },
  { id: "CPL0238", chapter: "flirty", role: "transition", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, kiss {target} gently—the kind of kiss that says thank you. Stay close. Say nothing for a moment.", target: "other" },
  { id: "CPL0239", chapter: "flirty", role: "transition", type: "directed", promptType: "truth", intensity: 4.5, text: "How does your body feel right now? Not arousal—just sensation.", target: "self" },
  { id: "CPL0240", chapter: "flirty", role: "transition", type: "directed", promptType: "dare", intensity: 4.5, text: "{actor}, hold {target} close without words. Let the candlelight be enough. Let the slow guitar be enough. Let {target} be enough.", target: "other" },

  // ============================================================================
  // STAGE 4: SUGGESTIVE (80 prompts) — Orchestral Soul, Barry White, lush strings 75 BPM
  // Desire acknowledged, bodies learning each other in new ways. The strings give permission.
  // 18 truths, 62 dares
  // ============================================================================

  // SETUP ROLE (8 prompts)
  { id: "CPL0241", chapter: "suggestive", role: "setup", type: "directed", promptType: "truth", intensity: 5.5, text: "What part of {target}'s body makes you feel most like you're losing control?", target: "self" },
  { id: "CPL0242", chapter: "suggestive", role: "setup", type: "directed", promptType: "truth", intensity: 5.5, text: "When you imagine {target} alone, what are they doing with their hands?", target: "self" },
  { id: "CPL0243", chapter: "suggestive", role: "setup", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, blindfold {target} with something soft. Let them sit with not knowing. Slow everything down.", target: "other" },
  { id: "CPL0244", chapter: "suggestive", role: "setup", type: "directed", promptType: "truth", intensity: 5.5, text: "What's the most vulnerable position your body can be in? Not physically—emotionally.", target: "self" },
  { id: "CPL0245", chapter: "suggestive", role: "setup", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, undress slowly while {target} watches. Don't perform—just let them see you. Let them understand your landscape.", target: "other" },
  { id: "CPL0246", chapter: "suggestive", role: "setup", type: "directed", promptType: "truth", intensity: 5.5, text: "What power do you have over {target} that you've never fully used?", target: "self" },
  { id: "CPL0247", chapter: "suggestive", role: "setup", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, have {target} remove your clothes piece by piece. They choose the pace. They choose the reverence.", target: "other" },
  { id: "CPL0248", chapter: "suggestive", role: "setup", type: "directed", promptType: "truth", intensity: 5.5, text: "What does your body look like to {target} in your mind?", target: "self" },

  // INTERACTION ROLE (14 prompts)
  { id: "CPL0249", chapter: "suggestive", role: "interaction", type: "directed", promptType: "truth", intensity: 5.5, text: "Where on {target}'s body do you want to leave marks of your wanting?", target: "self" },
  { id: "CPL0250", chapter: "suggestive", role: "interaction", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, trace {target}'s skin with your mouth—no rushing, no destination yet. Map them like you're learning braille.", target: "other" },
  { id: "CPL0251", chapter: "suggestive", role: "interaction", type: "directed", promptType: "truth", intensity: 5.5, text: "What's the most {target} has ever wanted you, and how did you know?", target: "self" },
  { id: "CPL0252", chapter: "suggestive", role: "interaction", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, use your hands to write on {target}'s body with your touch—sentences of desire. Ask them to tell you when they understand.", target: "other" },
  { id: "CPL0253", chapter: "suggestive", role: "interaction", type: "directed", promptType: "truth", intensity: 5.5, text: "If you could change one thing about how {target} touches you, what would it be?", target: "self" },
  { id: "CPL0254", chapter: "suggestive", role: "interaction", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, massage {target} with intention—chest, abdomen, thighs. Feel the muscle memory of their want. Go slowly.", target: "other" },
  { id: "CPL0255", chapter: "suggestive", role: "interaction", type: "directed", promptType: "truth", intensity: 5.5, text: "What's a thing you've fantasized about {target} that feels too real now?", target: "self" },
  { id: "CPL0256", chapter: "suggestive", role: "interaction", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, use temperature—breathe warm, then kiss cold areas of {target}'s skin. Watch their body respond to the contrast.", target: "other" },
  { id: "CPL0257", chapter: "suggestive", role: "interaction", type: "directed", promptType: "truth", intensity: 5.5, text: "When {target} is touching you, what permission are you waiting for?", target: "self" },
  { id: "CPL0258", chapter: "suggestive", role: "interaction", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, hold {target} in a way that shows you own them—not possessive, but certain. Let them feel your claim.", target: "other" },
  { id: "CPL0259", chapter: "suggestive", role: "interaction", type: "directed", promptType: "truth", intensity: 5.5, text: "What would {target} do to your body if they thought they could get away with anything?", target: "self" },
  { id: "CPL0260", chapter: "suggestive", role: "interaction", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, position {target} so you're looking down at them. Keep eye contact while you touch them. Make it clear you see every response.", target: "other" },
  { id: "CPL0261", chapter: "suggestive", role: "interaction", type: "directed", promptType: "truth", intensity: 5.5, text: "How much of {target} do you need to feel like you have them?", target: "self" },
  { id: "CPL0262", chapter: "suggestive", role: "interaction", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, have {target} guide your hand to places you haven't touched—slower, further, more intimate. Ask them to direct you exactly.", target: "other" },

  // BUILD ROLE (24 prompts)
  { id: "CPL0263", chapter: "suggestive", role: "build", type: "directed", promptType: "truth", intensity: 6, text: "What boundary do you have that you've never fully explained to {target}?", target: "self" },
  { id: "CPL0264", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6, text: "{actor}, blindfold {target} and trace their entire body with ice—slow, unpredictable. Ask them where they feel it most intensely.", target: "other" },
  { id: "CPL0265", chapter: "suggestive", role: "build", type: "directed", promptType: "truth", intensity: 6, text: "What's the roughest {target} could be with you and you'd still want more?", target: "self" },
  { id: "CPL0266", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6, text: "{actor}, have {target} on their back. Move between touching them with your hands, your mouth, your body. Create rhythm and break it.", target: "other" },
  { id: "CPL0267", chapter: "suggestive", role: "build", type: "directed", promptType: "truth", intensity: 6, text: "Do you want {target} to be gentle or to take what they want from you?", target: "self" },
  { id: "CPL0268", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6, text: "{actor}, undress slowly while {target} is blindfolded. Let them hear you, anticipate you, feel the air shift as you move closer.", target: "other" },
  { id: "CPL0269", chapter: "suggestive", role: "build", type: "directed", promptType: "truth", intensity: 6, text: "What power dynamic with {target} makes you feel most alive?", target: "self" },
  { id: "CPL0270", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6, text: "{actor}, position yourself above {target}. Move against them slowly—show them what you want without asking.", target: "other" },
  { id: "CPL0271", chapter: "suggestive", role: "build", type: "directed", promptType: "truth", intensity: 6, text: "When {target} is looking at your body with want, what do you imagine they're thinking?", target: "self" },
  { id: "CPL0272", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6, text: "{actor}, use your voice—whisper, let your breath catch, let your voice break—to tell {target} what they're doing to you. Let them hear your desire.", target: "other" },
  { id: "CPL0273", chapter: "suggestive", role: "build", type: "directed", promptType: "truth", intensity: 6, text: "What's a way {target} could dominate you that would make you surrender completely?", target: "self" },
  { id: "CPL0274", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6, text: "{actor}, have {target} lie still. Touch them everywhere they want—slowly building—but don't let them touch you back yet.", target: "other" },
  { id: "CPL0275", chapter: "suggestive", role: "build", type: "directed", promptType: "truth", intensity: 6, text: "How do you want {target} to want you?", target: "self" },
  { id: "CPL0276", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6, text: "{actor}, kiss {target} deeply while your hands move down their body. Make them feel the progression of your want.", target: "other" },
  { id: "CPL0277", chapter: "suggestive", role: "build", type: "directed", promptType: "truth", intensity: 6, text: "What would {target} discover about you if they really looked?", target: "self" },
  { id: "CPL0278", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6, text: "{actor}, have {target} guide your movement—not with words, just with their body and hands. Follow their silent instruction.", target: "other" },
  { id: "CPL0279", chapter: "suggestive", role: "build", type: "directed", promptType: "truth", intensity: 6, text: "What does {target} do with their hands that makes you feel most wanted?", target: "self" },
  { id: "CPL0280", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6, text: "{actor}, slow everything down. Move against {target} with the orchestral swell—matching pace, building with the strings.", target: "other" },
  { id: "CPL0281", chapter: "suggestive", role: "build", type: "directed", promptType: "truth", intensity: 6, text: "When {target} has you alone, what do you want them to do with you?", target: "self" },
  { id: "CPL0282", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6, text: "{actor}, position {target} so they feel claimed—held, surrounded, owned. Move to show them they're yours.", target: "other" },
  { id: "CPL0283", chapter: "suggestive", role: "build", type: "directed", promptType: "truth", intensity: 6, text: "What vulnerability with {target} makes you feel most powerful?", target: "self" },
  { id: "CPL0284", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6.5, text: "{actor}, bring {target} to the edge of completion—slowly, with full attention. Feel them responding to everything you do.", target: "other" },
  { id: "CPL0285", chapter: "suggestive", role: "build", type: "directed", promptType: "truth", intensity: 6, text: "What's the most intimate thing {target} could ask of your body?", target: "self" },
  { id: "CPL0286", chapter: "suggestive", role: "build", type: "directed", promptType: "dare", intensity: 6.5, text: "{actor}, move with {target} as if you're trying to breathe together—chest to chest, hip to hip. Create rhythm. Become one pulse.", target: "other" },

  // ACTION ROLE (22 prompts)
  { id: "CPL0287", chapter: "suggestive", role: "action", type: "directed", promptType: "truth", intensity: 6.5, text: "What part of {target} could you spend hours learning with your mouth?", target: "self" },
  { id: "CPL0288", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 6.5, text: "{actor}, have {target} blindfolded. Bring them closer and closer to release—varying touch, speed, pressure. Make them anticipate.", target: "other" },
  { id: "CPL0289", chapter: "suggestive", role: "action", type: "directed", promptType: "truth", intensity: 6.5, text: "If {target} asked you to do something that scared you sexually, what would that be?", target: "self" },
  { id: "CPL0290", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 6.5, text: "{actor}, use your entire body to pleasure {target}—hands, mouth, chest, movement. Show them what you're capable of.", target: "other" },
  { id: "CPL0291", chapter: "suggestive", role: "action", type: "directed", promptType: "truth", intensity: 6.5, text: "What would you let {target} do to your body if you knew nobody would ever know?", target: "self" },
  { id: "CPL0292", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 6.5, text: "{actor}, position {target} and take them to the edge—hold them there, feeling them shake with need. Don't give them release yet.", target: "other" },
  { id: "CPL0293", chapter: "suggestive", role: "action", type: "directed", promptType: "truth", intensity: 6.5, text: "How does it feel when {target} completely surrenders to you?", target: "self" },
  { id: "CPL0294", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 6.5, text: "{actor}, use your mouth and hands to worship {target}'s body—focus entirely on their pleasure. Move with intention and hunger.", target: "other" },
  { id: "CPL0295", chapter: "suggestive", role: "action", type: "directed", promptType: "truth", intensity: 6.5, text: "What's the dirtiest thing you've thought about doing with {target}?", target: "self" },
  { id: "CPL0296", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 6.5, text: "{actor}, have {target} on their back or knees. Move with them—create a rhythm that builds, breaks, builds again.", target: "other" },
  { id: "CPL0297", chapter: "suggestive", role: "action", type: "directed", promptType: "truth", intensity: 6.5, text: "When {target} takes control, what do you need them to know about what you want?", target: "self" },
  { id: "CPL0298", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 6.5, text: "{actor}, bring {target} to the edge repeatedly—different ways, different touches. Show them you understand their body.", target: "other" },
  { id: "CPL0299", chapter: "suggestive", role: "action", type: "directed", promptType: "truth", intensity: 6.5, text: "What does {target}'s pleasure do to you?", target: "self" },
  { id: "CPL0300", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 7, text: "{actor}, move into {target} with full intensity—show them exactly how much you want them, how completely you need them.", target: "other" },
  { id: "CPL0301", chapter: "suggestive", role: "action", type: "directed", promptType: "truth", intensity: 6.5, text: "What do you imagine {target} feels when they're deep inside you or you're deep inside them?", target: "self" },
  { id: "CPL0302", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 7, text: "{actor}, let {target} take what they need from your body—move with them, give them permission, show them they can have all of you.", target: "other" },
  { id: "CPL0303", chapter: "suggestive", role: "action", type: "directed", promptType: "truth", intensity: 6.5, text: "How do you want to be held while {target} claims you?", target: "self" },
  { id: "CPL0304", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 7, text: "{actor}, move with {target} at the pace that's happening between you—not thinking, just following the music and the need.", target: "other" },
  { id: "CPL0305", chapter: "suggestive", role: "action", type: "directed", promptType: "truth", intensity: 6.5, text: "What's the most vulnerable you've ever felt with {target}?", target: "self" },
  { id: "CPL0306", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 7, text: "{actor}, bring {target} to completion—feel them break apart in your hands, see what they look like when they surrender completely to you.", target: "other" },
  { id: "CPL0307", chapter: "suggestive", role: "action", type: "directed", promptType: "truth", intensity: 6.5, text: "What do you want {target} to understand about how deeply you want them?", target: "self" },
  { id: "CPL0308", chapter: "suggestive", role: "action", type: "directed", promptType: "dare", intensity: 7, text: "{actor}, move together until there's no separation—until you can't tell where you end and {target} begins.", target: "other" },

  // PEAK ROLE (7 prompts)
  { id: "CPL0309", chapter: "suggestive", role: "peak", type: "directed", promptType: "truth", intensity: 7, text: "What does your body want from {target} that feels like it might break you?", target: "self" },
  { id: "CPL0310", chapter: "suggestive", role: "peak", type: "directed", promptType: "dare", intensity: 7, text: "{actor}, bring {target} to the absolute edge—everything inside you moving together, nothing held back, nothing reserved.", target: "other" },
  { id: "CPL0311", chapter: "suggestive", role: "peak", type: "directed", promptType: "truth", intensity: 7, text: "What would complete surrender to {target} look like?", target: "self" },
  { id: "CPL0312", chapter: "suggestive", role: "peak", type: "directed", promptType: "dare", intensity: 7, text: "{actor}, let {target} take everything they need—move with them through the crescendo, through the breaking, through the release.", target: "other" },
  { id: "CPL0313", chapter: "suggestive", role: "peak", type: "directed", promptType: "truth", intensity: 7, text: "How does it feel to be completely claimed by {target}?", target: "self" },
  { id: "CPL0314", chapter: "suggestive", role: "peak", type: "directed", promptType: "dare", intensity: 7, text: "{actor}, stay in this moment with {target}—fully present, fully connected—until the orchestral swell peaks and breaks.", target: "other" },
  { id: "CPL0315", chapter: "suggestive", role: "peak", type: "directed", promptType: "truth", intensity: 7, text: "What just happened between you and {target}?", target: "self" },

  // TRANSITION ROLE (5 prompts)
  { id: "CPL0316", chapter: "suggestive", role: "transition", type: "directed", promptType: "dare", intensity: 6, text: "{actor}, hold {target} as they return to themselves—slow your movement, deepen your breath, become their anchor.", target: "other" },
  { id: "CPL0317", chapter: "suggestive", role: "transition", type: "directed", promptType: "truth", intensity: 6, text: "What did you just learn about {target} that you'll never forget?", target: "self" },
  { id: "CPL0318", chapter: "suggestive", role: "transition", type: "directed", promptType: "dare", intensity: 5.5, text: "{actor}, lie with {target} while they recover—skin to skin, heartbeat to heartbeat, present in the silence.", target: "other" },
  { id: "CPL0319", chapter: "suggestive", role: "transition", type: "directed", promptType: "truth", intensity: 5.5, text: "How do you feel toward {target} right now?", target: "self" },
  { id: "CPL0320", chapter: "suggestive", role: "transition", type: "directed", promptType: "dare", intensity: 5, text: "{actor}, whisper something true to {target} while you hold them—let the strings and silence say the rest.", target: "other" }
];
