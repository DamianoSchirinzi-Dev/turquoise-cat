export default {
  id: "day04",
  dayNumber: 4,
  title: "Our First Rave",
  type: "medium",

  intro:
    "Girl Kitty was helping a friend put on an event — she had lines to perform and a costume to match. Boy Kitty thought she was hella cool.",

  background: "cafe",

  script: [
    {
      card: "He met her friends first, over sushi — nervous, but determined to make a good impression. Girl Kitty was the one, and he wanted everything to be perfect.",
    },
    {
      background: "neutral",
      card: "They arrived at the venue. Girl Kitty emerged from the shadows in a cape and hood — damn, she's sexy, Boy Kitty thought. She ran her lines flawlessly, and then it was their turn together.",
    },
    {
      choice: {
        prompt: "What colour was the cape?",
        options: [
          { label: "Red", correct: false },
          { label: "Black", correct: true },
          { label: "Golden", correct: false },
        ],
      },
    },
    { speaker: "damiano", text: '"I love dancing with you!"' },
    { speaker: "iliana", text: '"Me too!"' },
    { speaker: "damiano", text: "He moves in behind her, holding her close.", thought: true },
    { speaker: "iliana", text: '"Yippee!"' },
    { speaker: "damiano", text: "The two of them dance and boogie the night away.", thought: true },
    {
      speaker: "iliana",
      text: "She boogies right back — throwing in a little twerk for good measure.",
      thought: true,
    },
  ],

  outro:
    "The event wrapped, and they'd both had the time of their lives. They piled into a cab with a few randoms, made a brief, dodgy detour to an afters, then slipped away home to devour each other. It was already becoming their routine.",
};
