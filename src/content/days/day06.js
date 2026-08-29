export default {
  id: "day06",
  dayNumber: 6,
  title: "The Peaks Walk",
  type: "big",

  intro:
    "A hike was planned. Girl Kitty said she had something special prepared — Boy Kitty had no idea what. They walked, and walked, and walked. Girl Kitty hates hills, but she's a powerful woman who hasn't been spoilt yet, so she powered through. Boy Kitty moved like a gazelle.",

  background: "outdoor",

  script: [
    { speaker: "damiano", text: '"Where are we going?"' },
    { speaker: "iliana", text: '"You\'ll see!"' },
    {
      speaker: "damiano",
      text: "He reaches his hand back to give it to her — then playfully pulls it away at the last second.",
      thought: true,
    },
    {
      choice: {
        prompt: "What did Girl Kitty do?",
        options: [
          { label: "Gently stroke the arm", correct: false, verdict: "Liar." },
          { label: "Lovingly kiss the arm", correct: false, verdict: "Liar." },
          {
            label: "Attack the arm with claws",
            correct: true,
            verdict: "Correct — you maniac!",
            outcome: [
              { speaker: "iliana", text: '"CLAW IT — ATTACK!"' },
              { speaker: "damiano", text: '"OUCH!"' },
            ],
          },
        ],
      },
    },
    {
      card: "Boy Kitty came away with a solid chunk missing from his arm. Somehow, he didn't make a big deal out of it.",
    },
    {
      card: "They reached a vantage point, snacked, and took in the view. Girl Kitty was ready.",
    },
    { speaker: "iliana", text: '"I have something to tell you."' },
    { speaker: "damiano", text: '"What is it?"' },
    { speaker: "iliana", text: "She stares into his eyes, holding his gaze for a long moment.", thought: true },
    { speaker: "iliana", text: '"I love you."' },
    {
      speaker: "damiano",
      text: "Boy Kitty is taken aback — but he can finally say it.",
      thought: true,
    },
    { speaker: "damiano", text: '"I love you too!"' },
  ],

  outro:
    "The rest of the day only got more magical. They hiked on, Boy Kitty got a little more action behind a rock than expected, and they very nearly got caught. By the time they made it home, it turned into a lovely night together.",
};
