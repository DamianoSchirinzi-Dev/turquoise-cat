export default {
  id: "day11",
  dayNumber: 11,
  title: "A Night In — Stardew",
  type: "medium",

  intro:
    "They'd both picked up a new game — Stardew Valley. Little did Boy Kitty know, he'd just introduced his girlfriend to something dangerously close to heroin: he was dating a serial gamer now.",

  background: "home",

  script: [
    { speaker: "damiano", text: "He suggests naming the farm 'Meow Manor.' She vetoes it in under a second.", thought: true },
    { speaker: "iliana", text: '"We are NOT calling it Meow Manor."' },
    { speaker: "damiano", text: '"…The Promised Land?"' },
    { speaker: "iliana", text: '"…Fine. The Promised Land."' },
    { speaker: "iliana", text: '"STOP SELLING MY THINGS!"' },
    { speaker: "damiano", text: '"But you really don\'t need 910 tulips."' },
    { speaker: "iliana", text: '"I DOOOOOO!"' },
    { speaker: "damiano", text: '"Omg, we have a chicken!"' },
    { speaker: "iliana", text: '"So cute! Stop selling my things though, for real!"' },
    {
      choice: {
        prompt: "Did Boy Kitty stop selling the things?",
        options: [
          { label: "Yes", correct: false, verdict: "What an ass." },
          { label: "No", correct: true, verdict: "I'll get you!" },
        ],
      },
    },
    { speaker: "iliana", text: '"We have so many jobs to do!"' },
    { speaker: "damiano", text: '"This is giving me anxiety."' },
    {
      card: "Hours passed. Crops were planted, fish were (mostly) caught, and 'just one more day' quietly turned into several. Neither of them noticed the sun coming up outside.",
    },
    {
      speaker: "iliana",
      text: "She's already three tabs deep into the community centre bundle wiki.",
      thought: true,
    },
    { speaker: "damiano", text: '"Are you even present right now?"' },
    { speaker: "iliana", text: '"Shhh. Research."' },
    {
      speaker: "damiano",
      text: "He nearly dies to a slime in the mines because he was too busy watching her scroll.",
      thought: true,
    },
    { speaker: "damiano", text: "Somehow, three hours vanish without either of them noticing.", thought: true },
  ],

  outro:
    "There was back and forth, a few genuine arguments over crop rotation and shipping-bin casualties, but in the end, what they built together said more than either of them could. Grandpa would be proud.",
};
