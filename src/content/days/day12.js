export default {
  id: "day12",
  dayNumber: 12,
  title: "Wales",
  type: "big",

  intro:
    "It was time for the princess's birthday. Boy Kitty had planned a getaway just for her — somewhere stitched through with her own memories, because he wanted to know her even more than he already did.",

  background: "outdoor",

  script: [
    { speaker: "iliana", text: "Self-appointed passenger princess, she takes full command of the bluetooth.", thought: true },
    { speaker: "damiano", text: '"Not this song again."' },
    { speaker: "iliana", text: '"This song is a CLASSIC."' },
    { speaker: "damiano", text: "It is not a classic. He sings along anyway.", thought: true },
    {
      background: "home",
      card: "Another car rented, another long drive underway — passenger princess DJing the whole way, exactly as she does so well. Eventually, they pulled up at the Airbnb: charming, a little rustic, and, as it turned out, thoroughly cobwebbed.",
    },
    { speaker: "iliana", text: '"Woah, it\'s so cool! Wait, is that a spiderweb? Hella cobwebs!"' },
    { speaker: "damiano", text: "He pretends this doesn't concern him even slightly.", thought: true },
    { speaker: "damiano", text: '"Urrr… yeah. Wait till you see outside, though."' },
    {
      choice: {
        prompt: "What was outside?",
        options: [
          { label: "A hot tub", correct: true, verdict: "Hehe ;)" },
          { label: "A palace cat", correct: false, verdict: "You wish." },
        ],
      },
    },
    {
      background: "fireside",
      card: "They spent their days driving to every corner of Wales she loved — castles, beaches, more sheep than either of them could count — Boy Kitty asking question after question, filing away every story. Nights were for stargazing in the hot tub, or cuddling by the fire — she'd always dreamed of being taken by a fire.",
    },
    { speaker: "damiano", text: '"Lie on the floor."' },
    { speaker: "iliana", text: '"Take me!"' },
  ],

  outro:
    "We legally can't show you this next part, but you already know exactly what happened. ;) The next day, they drove out to Girl Kitty's old university stomping ground, and Boy Kitty finally got to see beautiful Bangor for himself. They even found time for what she swore was some of the most authentic pizza he'd ever have (it was not). By the time they packed up, the trip had added a whole new stack of happy memories — and Boy Kitty had learned more about her than any getaway had any right to teach him.",
};
