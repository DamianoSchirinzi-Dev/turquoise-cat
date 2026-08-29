// Calendar screen: one tile per day. Locked days show their unlock date; unlocked
// days without a config yet (not authored during the content sprint) say so; the
// rest launch into the story player.
import { DAY_REGISTRY, loadDayConfig } from "./content/days/index.js";
import { isDayUnlocked, formatUnlockDate } from "./systems/schedule.js";
import { isDayComplete } from "./systems/gameState.js";
import { getCharacter } from "./ui/characters.js";
import { playSelect } from "./systems/sound.js";

const TYPE_BADGE = { big: "★", medium: "", filler: "◦", finale: "♥" };

export function renderCalendar(root, onSelectDay) {
  root.innerHTML = `
    <div class="calendar-view">
      <div class="calendar-glow">
        <div class="glow-blob glow-blob--gold"></div>
        <div class="glow-blob glow-blob--purple"></div>
      </div>
      <h1 class="calendar-title">Our Life</h1>
      <div class="calendar-grid"></div>
      <p class="calendar-status"></p>
    </div>
  `;

  const grid = root.querySelector(".calendar-grid");
  const status = root.querySelector(".calendar-status");

  DAY_REGISTRY.forEach((meta, index) => {
    grid.appendChild(createDayTile(meta, status, onSelectDay, index));
  });

  // A non-interactive "extra tile" dropped into the grid's next open slot (after the
  // last day) so the two kittens sit exactly where "Day 15" would be.
  grid.appendChild(createKittenTile(DAY_REGISTRY.length));
}

function createKittenTile(index) {
  const tile = document.createElement("div");
  tile.className = "calendar-kittens";
  tile.style.animationDelay = `${Math.min(index * 40, 480)}ms`;
  tile.innerHTML = `
    <div class="footer-kitten footer-kitten--damiano"><div class="footer-kitten-art"></div></div>
    <div class="footer-kitten footer-kitten--iliana"><div class="footer-kitten-art"></div></div>
  `;
  tile.querySelector(".footer-kitten--damiano .footer-kitten-art").style.backgroundImage =
    `url(${getCharacter("damiano").image})`;
  tile.querySelector(".footer-kitten--iliana .footer-kitten-art").style.backgroundImage =
    `url(${getCharacter("iliana").image})`;
  return tile;
}

function createDayTile(meta, statusEl, onSelectDay, index) {
  const unlocked = isDayUnlocked(meta.dayNumber);
  const complete = isDayComplete(meta.dayNumber);
  const available = unlocked && !!meta.load;

  const tile = document.createElement("button");
  tile.type = "button";
  tile.className = "day-tile" + (unlocked ? " is-unlocked" : "");
  // Staggered pop-in on load, capped so the last few tiles don't lag noticeably behind.
  tile.style.animationDelay = `${Math.min(index * 40, 480)}ms`;

  let subtitle = "";
  if (!unlocked) subtitle = formatUnlockDate(meta.dayNumber);
  else if (complete) subtitle = "✓ done";
  else if (!meta.load) subtitle = "soon";
  else subtitle = "play";

  const badge = TYPE_BADGE[meta.type] ?? "";

  tile.innerHTML = `
    <span class="day-tile-number">Day ${meta.dayNumber}</span>
    <span class="day-tile-subtitle">${subtitle}</span>
    ${badge ? `<span class="day-tile-badge">${badge}</span>` : ""}
  `;

  tile.addEventListener("click", async () => {
    if (!unlocked) {
      statusEl.textContent = `Day ${meta.dayNumber} unlocks ${formatUnlockDate(meta.dayNumber)}`;
      return;
    }
    if (!available) {
      statusEl.textContent = `Day ${meta.dayNumber} isn't built yet.`;
      return;
    }
    playSelect();
    statusEl.textContent = "";
    const config = await loadDayConfig(meta.dayNumber);
    onSelectDay(config);
  });

  return tile;
}
