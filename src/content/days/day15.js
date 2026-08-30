export default {
  id: "day15",
  dayNumber: 15,
  title: "Coming Home",
  type: "finale",

  intro: "So — it's finally time! Boy Kitty is coming home.",

  background: "home",

  script: [
    {
      choice: {
        prompt: "So… have you missed me?",
        options: [
          { label: "Yes", correct: true, verdict: "Yes." },
          { label: "Yes!", correct: true, verdict: "Yes!" },
          { label: "OMFG YES!", correct: true, verdict: "OMFG YES!" },
        ],
      },
    },
    { speaker: "damiano", text: '"Iliana. When we first met, I knew you were special."' },
    {
      speaker: "damiano",
      text: '"You\'re smart, funny, beautiful, sexy, empathetic, emotional, a little bit crazy — and the best human I\'ve ever met."',
    },
    {
      speaker: "damiano",
      text: '"I never thought loving someone could be this easy. But I wake up next to you and think about how lucky I am to have a woman like you by my side."',
    },
    {
      speaker: "damiano",
      text: '"I will love you forever and always. You complete me. You and I are a team, and I\'ll do whatever it takes to make sure you always know that I\'m yours — and that I\'ll be here to support you."',
    },
    {
      speaker: "damiano",
      text: '"I love you without knowing how, or why, or since when. I love you simply, without complications or pride: I love you this way because I don\'t know any other way to love."',
    },
    { speaker: "iliana", text: "She's crying.", thought: true },
    { speaker: "iliana", text: '"Meoooooowwwwww~"' },
  ],

  outro: "And that's it. I'll be waiting for you at home, my soulmate. x",

  voiceNote: "assets/recordings/day_15.m4a",
};
