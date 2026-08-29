export default {
  id: "day05",
  dayNumber: 5,
  title: "The Window",
  type: "medium",

  intro:
    "They'd been dating a few weeks now. Boy Kitty already knew exactly how he felt, and had to bite his tongue nearly every time he looked at her, waiting for the right moment to say it. Tonight, they stood by an open window, sharing a joint, watching the stars.",

  background: "home",

  script: [
    { speaker: "iliana", text: "She takes a hit and immediately coughs half a lung up.", thought: true },
    { speaker: "iliana", text: '"I\'m fine! Totally didn\'t just cough up a lung."' },
    { speaker: "damiano", text: '"Sure you didn\'t."' },
    { speaker: "damiano", text: "He grins, delighted — she's cute even mid-coughing-fit.", thought: true },
    { speaker: "iliana", text: '"The night is beautiful — look at the stars."' },
    { speaker: "damiano", text: "He stares at her without her noticing.", thought: true },
    { speaker: "damiano", text: '"Sure is beautiful."' },
    { speaker: "iliana", text: '"Tell me about your dreams! We should go travelling!"' },
    { speaker: "damiano", text: '"Where would you want to go?"' },
    { speaker: "iliana", text: '"Italy? Greece?"' },
    { speaker: "damiano", text: '"We can and will go everywhere you want — together."' },
    {
      choice: {
        prompt: "Pop quiz — which country did Girl Kitty NOT mention?",
        options: [
          { label: "Italy", correct: false },
          { label: "Greece", correct: false },
          { label: "Japan", correct: true },
        ],
      },
    },
    {
      speaker: "damiano",
      text: "The words sit right on the tip of his tongue again. Not yet, he tells himself. Not yet.",
      thought: true,
    },
  ],

  outro:
    "They stayed at the window a while longer, heads poking out into the night, talking about everything and nothing — dreams, wishes, all of it. Any bird watching would've sworn they were up to something. Boy Kitty still thinks about nights like this.",
};
