export default {
  id: "day10",
  dayNumber: 10,
  title: "Our First Flat",
  type: "medium",

  intro:
    "They were both absolutely shattered from four days of festival dancing — the last thing either of them needed was more physical strain. Lucky for them, moving day had arrived. Even exhausted, the thought of finally living together was enough to power them through. The rental car was booked, and the heavy lifting began.",

  background: "home",

  script: [
    { speaker: "damiano", text: "Still wheezing black festival dust, he hauls another box up the stairs.", thought: true },
    { speaker: "damiano", text: '"You gonna help me with this?"' },
    { speaker: "iliana", text: '"BABE! I am just organising my 27th box of random stuff!"' },
    {
      speaker: "damiano",
      text: "He wouldn't have let her help anyway — but she definitely failed the test.",
      thought: true,
    },
    {
      speaker: "iliana",
      text: "Box twenty-seven contains, as far as anyone can tell, forty candles and one single sock.",
      thought: true,
    },
    {
      card: "Boxes and boxes. Back-and-forth trips. Kilo after kilo. Parking ticket stacked on parking ticket — including one slapped on the windscreen mid-sofa-carry. Eventually, they got just enough in to call the place livable.",
    },
    {
      speaker: "damiano",
      text: "They collapse onto the sofa — the one piece of furniture that made it in fully assembled — and just breathe for a second.",
      thought: true,
    },
    { speaker: "damiano", text: '"Yay, we\'re here."' },
    { speaker: "iliana", text: '"Yay."' },
    { speaker: "damiano", text: "Both of them exhausted, and feeling a little bit sick.", thought: true },
    { speaker: "damiano", text: '"Cuddle me!"' },
    {
      card: "More moving still had to happen, but they were making great progress.",
    },
    {
      choice: {
        prompt: "Time for a break — what did they eat?",
        options: [
          { label: "Pizza", correct: false },
          { label: "Souvlaki", correct: false },
          { label: "Listo Burrito", correct: true },
        ],
      },
    },
    { speaker: "iliana", text: '"Yum yum yum, free food is the best food."' },
    { speaker: "damiano", text: '"Huh, is it? Wouldn\'t know…"' },
    { speaker: "damiano", text: "He paid for it. But sure. Free.", thought: true },
  ],

  outro:
    "After a lot more work, they were finally moved in — together. Like everything else, they'd learned: they could do anything, as long as they did it together.",
};
