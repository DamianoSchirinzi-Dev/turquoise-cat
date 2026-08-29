export default {
  id: "day07",
  dayNumber: 7,
  title: "A Cinema Date",
  type: "medium",

  intro:
    "The couple were headed out for a cute cinema night. They stocked up on drinks and chocolate — smuggled in, obviously — and set off, ready for the adverts.",

  background: "outdoor",

  script: [
    {
      speaker: "damiano",
      text: "He stuffs one too many chocolate bars into his jacket, doing his best impression of someone who is definitely not smuggling snacks.",
      thought: true,
    },
    { speaker: "iliana", text: '"Walk normal. WALK. NORMAL."' },
    { speaker: "damiano", text: '"I am walking normal!"' },
    { speaker: "damiano", text: "He is not walking normal.", thought: true },
    {
      background: "neutral",
      card: "They made it into the cinema — snacks smuggled, consciences clear — and settled in just as the pre-show ads started.",
    },
    {
      choice: {
        prompt: "What were they watching?",
        options: [
          { label: "Obsession", correct: false },
          {
            label: "Deadpool & Wolverine",
            correct: true,
            outcome: [
              {
                card: "Deadpool & Wolverine it was. They got in their seats, shoes off, feet up, ready for the adverts.",
              },
            ],
          },
          { label: "Wonka", correct: false },
        ],
      },
    },
    { speaker: "iliana", text: '"Oooh, we should go see this, and this! And that!"' },
    { speaker: "damiano", text: '"And also that one! Let\'s see them all — together."' },
    { speaker: "damiano", text: "He blinks at her cutely, very pleased with himself.", thought: true },
    {
      speaker: "iliana",
      text: "A horror trailer rolls, and she instinctively grabs his arm like it personally offended her.",
      thought: true,
    },
    { speaker: "damiano", text: '"…Are you okay?"' },
    { speaker: "iliana", text: '"I\'m fine. That trailer is not fine."' },
    {
      speaker: "damiano",
      text: "He reaches for the popcorn at the exact same moment she does — their hands collide in the bucket like a rom-com cliché.",
      thought: true,
    },
    { speaker: "iliana", text: '"Mine."' },
    { speaker: "damiano", text: '"…Fine. Yours."' },
    {
      speaker: "iliana",
      text: "She wiggles happily, rests her head on his shoulder, links his arm, and gets comfy.",
      thought: true,
    },
    { speaker: "damiano", text: "He fist-pumps the air internally.", thought: true },
  ],

  outro:
    "By the time the credits rolled, they'd added six more movies to the list, finished every last snack, and Boy Kitty's arm had gone completely numb — he wasn't about to say a word.",
};
