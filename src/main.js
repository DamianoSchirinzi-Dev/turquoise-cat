import "./style.css";
import { renderCalendar } from "./calendar.js";
import { playStory } from "./story.js";

const root = document.getElementById("game-root");

function showCalendar() {
  renderCalendar(root, (config) => {
    playStory(root, config, showCalendar);
  });
}

showCalendar();
