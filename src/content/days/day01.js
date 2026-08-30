// Day config schema (this is the only file content-authoring should ever need to touch
// for a given day): a background + a linear script of beats. story.js reads this
// generically — nothing here is Day-1-specific in the engine, only in the data.
//
// Script entry types:
//   { speaker, text, thought? }               — a dialogue line, tap to advance.
//       Include literal quote marks in `text` for anything said/typed aloud; omit them
//       and set `thought: true` for internal monologue (shown in italics, no quotes).
//   { choice: { prompt, options: [{ label, flag?, correct?, verdict?, outcome: [...lines] }] } }
//       If any option carries `correct` (true/false), it's a quiz-style question: picking
//       flashes the screen green/"Correct!" or red/"Incorrect!"; a wrong pick just re-shows
//       the same question, a right one continues into that option's `outcome` as normal.
//       `verdict` overrides the flash's default text per-option (e.g. "Liar.", "You maniac!").
//   { background: "key" }                     — fades to a different backdrop mid-scene
//   { card: "text", background?: "key" }      — a mid-scene time-skip/narration card,
//       same black-screen treatment as intro/outro (e.g. "the next few days passed...").
//       Give it `background` too when the card should also change the backdrop — the
//       swap happens while the screen is black, so the reveal after the card lands
//       straight on the new scene instead of flashing it first, then cutting to the card.
//
// `background` keys (outdoor, home, cafe, fireside, neutral) are defined in
// src/ui/backgrounds.js — layered SVG scenes for now, swappable for real illustrated
// backgrounds later without touching story.js.
//
// `intro` / `outro` (both optional): scene-setter cards shown on a black screen before
// the scene starts / after it ends — same title (from `title` below), tap to skip the hold.
//
// `voiceNote` (optional): path to a real recorded audio file (e.g.
// "assets/recordings/day_1.m4a", relative to /public, same convention as character
// portrait images), played once as the outro card fades in. Mark the day in
// content/days/index.js with `hasVoiceNote: true` too, so its calendar tile shows the
// mic icon — that's read from the lightweight registry, not this lazy-loaded file.
export default {
  id: "day01",
  dayNumber: 1,
  title: "The First Message",
  type: "big",

  intro: "An ordinary day — until Boy Kitty gets a message from a girl he's never met.",

  background: "outdoor",

  script: [
    { speaker: "iliana", text: '"Hey good looking, what are you looking for in that beautiful view?"' },
    {
      speaker: "damiano",
      text: "Whoa. She might be the most beautiful girl I've ever seen — I need to say something charming.",
      thought: true,
    },
    {
      choice: {
        prompt: "What does he say?",
        options: [
          {
            label: '"I was looking for you… but I couldn\'t see you."',
            correct: true,
            flag: "day01_smooth",
            outcome: [
              { speaker: "damiano", text: '"I was looking for you… but I couldn\'t see you."' },
              { speaker: "iliana", text: '"Smooth."' },
            ],
          },
          {
            label: '"Damn, shawty — where\'d you come from?"',
            correct: false,
          },
        ],
      },
    },
    { speaker: "iliana", text: "I like that — he's handsome AND funny.", thought: true },
    { speaker: "damiano", text: "I need to get to know this girl… she could be the one!", thought: true },
    {
      card: "They spent the next few days getting to know each other — life, interests, dreams, where they'd each come from. The more he learned, the more he wanted to know. Boy Kitty had to meet her.",
    },
    {
      speaker: "damiano",
      text: '"So… I\'d love to take you out on a date. Maybe a climb, then some food?"',
    },
    { speaker: "iliana", text: '"Sounds like a plan, sexy man."' },
    { speaker: "damiano", text: "I want to devour her.", thought: true },
    { speaker: "iliana", text: "He better devour me.", thought: true },
  ],

  outro:
    "The date was set. It was all Boy Kitty could think about, somehow, he just knew: he really wanted this girl.",
};
