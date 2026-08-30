export default {
  id: "day13",
  dayNumber: 13,
  title: "The Meeting of the Mothers",
  type: "medium",

  intro:
    "A big day had arrived — the day the Greek, German, and Italian forces would finally meet, for wine and food. A lot was riding on it, but the foundations had already been laid. Nerves ran high — though when it came down to it, everything turned out perfectly.",

  background: "home",

  script: [
    { speaker: "damiano", text: "He rehearses his opening line in the mirror four separate times.", thought: true },
    { speaker: "damiano", text: '"Okay. Cool. Casual. I got this."' },
    { speaker: "iliana", text: '"You look like you\'re about to give a TED talk."' },
    { speaker: "damiano", text: '"I might be."' },
    {
      background: "cafe",
      card: "Three languages, three sets of opinions, one small restaurant table — and somehow, within minutes, everyone was talking over each other in the best possible way.",
    },
    {
      speaker: "iliana",
      text: "During coffee, someone catches Boy Kitty's eye.",
      thought: true,
    },
    {
      choice: {
        prompt: "Who did the gang see?",
        options: [
          { label: "Leonardo DiCaprio", correct: false },
          { label: "Gymskin, Wahey!", correct: true },
          { label: "Elena Ferrante", correct: false },
        ],
      },
    },
    {
      card: "They walked and talked, and everyone got along — Eva and Christiane hit it off like a house on fire, already trading recipes before the mains arrived.",
    },
    {
      card: "Food was had, wine was drunk, and memories were made — including one toast that went on slightly too long, in slightly too many languages.",
    },
    { speaker: "damiano", text: '"Woah! That went really well!"' },
    { speaker: "iliana", text: '"Of course it did — they love us!"' },
    { speaker: "damiano", text: '"Yeah, my mum loves your mom!"' },
    { speaker: "iliana", text: '"My mum loves your mom!"' },
  ],

  outro:
    "And with that, it was settled — if it wasn't already. Approval from both sides of the family could only mean one thing: a bright future ahead.",
};
