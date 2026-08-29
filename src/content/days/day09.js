export default {
  id: "day09",
  dayNumber: 9,
  title: "Lost Village",
  type: "medium",

  intro:
    "The time had finally come — their first festival together, and right before they moved in together too. Exciting doesn't begin to cover it.",

  background: "outdoor",

  script: [
    {
      speaker: "iliana",
      text: "She packs enough gear for a family of five and somehow still finds room to add 'just one more thing.'",
      thought: true,
    },
    { speaker: "damiano", text: '"Can you even see out the back window?"' },
    { speaker: "iliana", text: '"I can see fine. Mostly."' },
    { speaker: "damiano", text: "He spends the whole drive with a tent bag wedged against his face.", thought: true },
    {
      card: "They made it to Lost Village and got the tent up — eventually, after several enthusiastic arguments about which pole went where — and were ready for a great weekend.",
    },
    {
      card: "Lots of boogying and laughter followed. Now, dressed as cats — which, all things considered, felt a little on the nose — they stood in front of the stage, watching Nimino.",
    },
    { speaker: "damiano", text: '"Woo! Go Nimino, we love you — meow!"' },
    { speaker: "iliana", text: '"Yeah, go Nimino! Meow meow! I am a cat!"' },
    { speaker: "iliana", text: "She shimmies in front of him.", thought: true },
    { speaker: "damiano", text: "He grabs her and pulls her close.", thought: true },
    {
      choice: {
        prompt: "Which ear does he kiss?",
        options: [
          { label: "Left", correct: false, verdict: "NO, WRONG EAR!" },
          { label: "Right", correct: true, verdict: "I love this, OMG." },
        ],
      },
    },
    { speaker: "iliana", text: '"Yay, I\'m gonna dance all day!"' },
    { speaker: "iliana", text: "She keeps boogying, bringing her hips back against him.", thought: true },
    { speaker: "damiano", text: '"I love this, but my poor lil flat feeties are giving way."' },
    { speaker: "damiano", text: "He cries, but keeps dancing anyway.", thought: true },
    {
      card: "They had a great night partying, and an even better one back in the tent. Dark, sweaty, and smelly, with strangers just feet away. Surely no one would hear? ;)",
    },
    {
      card: "They woke up to tuna out of a can and carried on partying like nothing had happened.",
    },
    {
      speaker: "damiano",
      text: "Cold tuna, straight from the can, has never tasted so good — or maybe he's just delirious from partying.",
      thought: true,
    },
    { speaker: "damiano", text: '"This may be my only ever festival, but I\'m glad to be doing it with you."' },
    { speaker: "iliana", text: '"Yay."' },
  ],

  outro:
    "They partied until their legs gave out and they were coughing up black dust. Then they went home and slept for what felt like a week.",
};
