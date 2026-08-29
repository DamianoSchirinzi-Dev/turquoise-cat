export default {
  id: "day02",
  dayNumber: 2,
  title: "The First Date",
  type: "big",

  intro:
    "The day had come. Boy Kitty was equal parts nervous and excited — today, they'd finally meet in person, to climb and to eat.",

  background: "outdoor",

  script: [
    {
      speaker: "damiano",
      text: "I'd better practice my small talk before she gets here — anything to calm these nerves.",
      thought: true,
    },
    { speaker: "iliana", text: "La la la la la…", thought: true },
    { speaker: "iliana", text: "Wait… is that short guy my date? Oh lawd.", thought: true },
    {
      card: "Boy Kitty sees her — sunlight catching the window of Next as she walks toward him. Is this an angel? he wonders.",
    },
    {
      speaker: "damiano",
      text: "Whoa, she's so beautiful — I love her flowy pants. Okay… be cool.",
      thought: true,
    },
    { speaker: "damiano", text: '"H-he-hello… you look amazing."' },
    { speaker: "iliana", text: '"Hehe, thank you."' },
    { speaker: "iliana", text: "Damn, he's hot.", thought: true },
    { speaker: "damiano", text: '"So… fancy some coffee?"' },
    { speaker: "iliana", text: '"Sure, hehe."' },
    {
      background: "cafe",
      card: "Reluctantly — Boy Kitty hates Starbucks, for the record — Boy Kitty took her in anyway. Compliments were exchanged, eyeliner was offered, and the vibe began to build.",
    },
    {
      card: "They went for a long climb together. In the quiet moments between routes, something sparked between them — and by the end of a long, sweaty session, they both wanted to sweat some more.",
    },
    {
      choice: {
        prompt: "Where did they go to eat?",
        options: [
          {
            label: "Pizza",
            correct: true,
            outcome: [
              {
                card: "Pizza it was. Walking over, they stood waiting for the crossing light to change, stealing glances that kept dropping from eyes to lips and back again. Neither of them wanted to wait much longer.",
              },
            ],
          },
          { label: "Souvlaki", correct: false },
          {
            label: "…each other?",
            correct: true,
            outcome: [
              {
                card: "Tempting — but pizza first. Walking over, they stood waiting for the crossing light to change, stealing glances that kept dropping from eyes to lips and back again. Neither of them wanted to wait much longer.",
              },
            ],
          },
        ],
      },
    },
    { card: "Now at dinner — dodging flying mozzarella and trading stories about each other's lives." },
    { speaker: "iliana", text: '"What\'s your star sign?"' },
    { speaker: "damiano", text: '"Cancer."' },
    { speaker: "iliana", text: "That's a good sign, she thought, smiling to herself.", thought: true },
    { speaker: "iliana", text: '"Ooh, interesting… I\'ll need your date of birth too."' },
    { speaker: "damiano", text: "Boy Kitty was a little taken aback — but he liked her vibe.", thought: true },
  ],

  outro:
    "The pizza was devoured, a first kiss followed — and the rest of the night was all cardio, scratches, and the bedroom floor.",
};
