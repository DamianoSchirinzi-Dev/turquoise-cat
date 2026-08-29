import "./style.css";
import { renderCalendar } from "./calendar.js";
import { playStory } from "./story.js";
import { renderGate } from "./gate.js";
import { isUnlocked } from "./systems/auth.js";

const root = document.getElementById("game-root");

function showCalendar() {
  renderCalendar(root, (config) => {
    playStory(root, config, showCalendar);
  });
}

if (isUnlocked()) {
  showCalendar();
} else {
  renderGate(root, showCalendar);
}
