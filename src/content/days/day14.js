export default {
  id: "day14",
  dayNumber: 14,
  title: "Italy",
  type: "finale",

  intro:
    "They'd talked about going abroad together for their entire relationship, and now, finally, they were setting off. Boy Kitty had a million things on his mind and was quietly panicking. Girl Kitty was thinking about vibes — and exactly how much more she could stuff into the suitcase Boy Kitty would be the one carrying. As usual, she talked him down.",

  background: "outdoor",

  script: [
    {
      card: "Somewhere at check-in, that suitcase came in four kilos over the limit. Boy Kitty did not ask what was inside. He didn't want to know.",
    },
    {
      card: "They caught their flights, landed, and drove to their first accommodation — getting thoroughly scammed by a very charming Italian along the way. That night, they stargazed. Then the holiday really began.",
    },
    { speaker: "damiano", text: '"Bloody hell, it\'s hot — enough sunbathing, let\'s get in the water?"' },
    { speaker: "iliana", text: "She looks unfairly good in that bikini.", thought: true },
    { speaker: "iliana", text: '"Let\'s swim!"' },
    { speaker: "damiano", text: '"Sure! Let\'s go!"' },
    { background: "water", card: "They both jumped straight into the crystal-clear water." },
    { speaker: "damiano", text: '"Woah! Look at that! It\'s a crab!"' },
    { speaker: "iliana", text: '"Leave the crab alone!"' },
    { speaker: "damiano", text: '"But it wants to be my friend!"' },
    { speaker: "iliana", text: '"I SAID LEAVE THE CRAB ALONE… omg, there\'s something in my hair!!!"' },
    { speaker: "damiano", text: "He dives underwater to help.", thought: true },
    { speaker: "damiano", text: '"I don\'t see no fishes?!"' },
    { speaker: "iliana", text: "Furious.", thought: true },
    { speaker: "damiano", text: "It was, in fact, a bee. She still hasn't gotten over this.", thought: true },
    {
      background: "outdoor",
      card: "They spent their days eating the best food, sunbathing, and simply being together. They drove everywhere and anywhere — Boy Kitty white-knuckling his way through the chaos of Italian roads, Girl Kitty DJing and bringing the vibes from the passenger seat. On his birthday, they went for pizza.",
    },
    {
      choice: {
        prompt: "What was their favourite thing to do?",
        options: [
          { label: "Snorkelling", correct: true, verdict: "We luvs fish!" },
          { label: "Adventuring", correct: true, verdict: "Can we just keep driving?" },
          { label: "Eating pizza", correct: true, verdict: "Nom nom nom." },
        ],
      },
    },
    { speaker: "damiano", text: "Salivating.", thought: true },
    { speaker: "damiano", text: '"This is the best goddamn pizza ever."' },
    { speaker: "iliana", text: '"Omg, it\'s so good, I could cry."' },
    { speaker: "damiano", text: '"We should eat pizza every day we\'re here."' },
    { speaker: "iliana", text: '"…Urrr… sure…"' },
    { speaker: "damiano", text: "Happy dance. Boy Kitty was paying, so he was allowed all the pizza he wanted.", thought: true },
  ],

  outro:
    "Their days carried on like this — adventuring by day, stargazing by night. This was no simple resort-holiday couple; they were a team who wanted to see and do absolutely everything. Boy Kitty already couldn't wait for the next one.",
};
