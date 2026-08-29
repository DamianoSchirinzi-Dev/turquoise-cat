export default {
  id: "day08",
  dayNumber: 8,
  title: "My Birthday",
  type: "medium",

  intro:
    "It was Boy Kitty's 29th birthday, and Girl Kitty had planned something super special. He was buzzing with excitement — a full long weekend of uninterrupted time together. They were headed to Windermere, where she'd lined up a stack of activities and booked the loveliest Airbnb.",

  background: "fireside",

  script: [
    {
      choice: {
        prompt: "Did the Airbnb have a hot tub?",
        options: [
          { label: "Yes", correct: false },
          { label: "No", correct: true },
        ],
      },
    },
    {
      speaker: "iliana",
      text: "She compares the photo on the listing to the window and realizes the hot tub is actually a window railing. She laughs, and Boy Kitty laughs too.",
      thought: true,
    },
    { speaker: "damiano", text: '"It was a window railing, are you crazy?!"' },
    { speaker: "iliana", text: '"Hehehe, oopsie — look at me, I\'m so purty."' },
    { speaker: "damiano", text: "Goddamn it, she's right.", thought: true },
    {
      card: "No matter what, she did everything she could to make sure Boy Kitty had the best time away. She kept him relaxed and happy — he appreciated her more than she knew, and felt so lucky to have her.",
    },
    {
      background: "outdoor",
      card: "Then they got on their rental boat — where more than just sailing happened.",
    },
    { speaker: "damiano", text: '"Babe, we can\'t — not here! We\'ll get caught!"' },
    { speaker: "iliana", text: '"It\'s fine — whip it out!"' },
    { speaker: "damiano", text: '"Argh!"' },
  ],

  outro:
    "They hit a rock, right as the captain was, ah, otherwise occupied — with a loud, un-ignorable boom. Luckily, the boat didn't sink, but it was scary for a second there. Scare aside, it was still one of the best birthdays Boy Kitty had ever had.",
};
