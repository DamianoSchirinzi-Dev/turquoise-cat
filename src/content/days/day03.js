export default {
  id: "day03",
  dayNumber: 3,
  title: "The First Jar",
  type: "medium",

  intro:
    "They went for another climb. Girl Kitty wanted to show off her cooking — schnitzel, her specialty — but Boy Kitty offered to pay for delivery instead.",

  background: "outdoor",

  script: [
    {
      choice: {
        prompt: "What did they order?",
        options: [
          {
            label: "Souvlaki",
            correct: true,
            outcome: [
              {
                background: "home",
                card: "After souvlaki, it was time for dessert — and Nutella was on the menu.",
              },
            ],
          },
          { label: "Pizza", correct: false },
        ],
      },
    },
    {
      speaker: "damiano",
      text: '"Whoa — never in my life did I think I\'d meet someone who loves Nutella as much as I do."',
    },
    { speaker: "iliana", text: '"Same! It seems we\'re made for each other."' },
    {
      speaker: "damiano",
      text: '"Right? I used to have this genuine fear they\'d stop making it — that\'s how much I—"',
    },
    { speaker: "iliana", text: "She lets rip — loud, and unmistakably stinky.", thought: true },
    { speaker: "iliana", text: '"Oops— I\'m so sor—"' },
    {
      speaker: "damiano",
      text: "He answers with one even louder, somehow less lethal, and shoots her a wink.",
      thought: true,
    },
  ],

  outro:
    "Between a souvlaki each and a full jar of Nutella, they went and did exactly what any hopelessly infatuated couple would do — and the neighbours didn't get much sleep.",
};
