// Calendar screen: one tile per day. Locked days show their unlock date; unlocked
// days without a config yet (not authored during the content sprint) say so; the
// rest launch into the story player.
import { DAY_REGISTRY, loadDayConfig } from "./content/days/index.js";
import { isDayUnlocked, formatUnlockDate, formatUnlockDateTime, hasCustomUnlockTime } from "./systems/schedule.js";
import { isDayComplete } from "./systems/gameState.js";
import { getCharacter } from "./ui/characters.js";
import { playSelect, playLocked, startMusic, stopMusic } from "./systems/sound.js";

const TYPE_BADGE = { big: "★", medium: "", filler: "◦", finale: "♥" };

const SHAKE_KEYFRAMES = [
  { transform: "translateX(0)" },
  { transform: "translateX(-8px)" },
  { transform: "translateX(8px)" },
  { transform: "translateX(-6px)" },
  { transform: "translateX(6px)" },
  { transform: "translateX(0)" },
];

export function renderCalendar(root, onSelectDay) {
  root.innerHTML = `
    <div class="calendar-view">
      <div class="calendar-glow">
        <div class="glow-blob glow-blob--gold"></div>
        <div class="glow-blob glow-blob--purple"></div>
      </div>
      <h1 class="calendar-title">Glimpses of our Life</h1>
      <p class="calendar-next-unlock"></p>
      <div class="calendar-grid"></div>
      <p class="calendar-status"></p>
      <div class="calendar-kittens">
        <div class="footer-kitten footer-kitten--damiano"><div class="footer-kitten-art"></div></div>
        <div class="footer-kitten footer-kitten--iliana"><div class="footer-kitten-art"></div></div>
      </div>
    </div>
  `;

  const grid = root.querySelector(".calendar-grid");
  const status = root.querySelector(".calendar-status");
  const nextUnlockEl = root.querySelector(".calendar-next-unlock");

  const nextLocked = DAY_REGISTRY.find((meta) => !isDayUnlocked(meta.dayNumber));
  nextUnlockEl.textContent = nextLocked
    ? `Next unlock: Day ${nextLocked.dayNumber} — ${formatUnlockDateTime(nextLocked.dayNumber)}`
    : "";

  DAY_REGISTRY.forEach((meta, index) => {
    grid.appendChild(createDayTile(meta, status, onSelectDay, index));
  });

  root.querySelector(".footer-kitten--damiano .footer-kitten-art").style.backgroundImage =
    `url(${getCharacter("damiano").image})`;
  root.querySelector(".footer-kitten--iliana .footer-kitten-art").style.backgroundImage =
    `url(${getCharacter("iliana").image})`;

  startMusic();
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
  if (!unlocked) {
    subtitle = hasCustomUnlockTime(meta.dayNumber)
      ? formatUnlockDateTime(meta.dayNumber)
      : formatUnlockDate(meta.dayNumber);
  } else if (complete) subtitle = "✓ done";
  else if (!meta.load) subtitle = "soon";
  else subtitle = "play";

  const badge = TYPE_BADGE[meta.type] ?? "";

  tile.innerHTML = `
    <span class="day-tile-number">Day ${meta.dayNumber}</span>
    <span class="day-tile-subtitle">${subtitle}</span>
    <span class="day-tile-badges">
      ${badge ? `<span class="day-tile-badge">${badge}</span>` : ""}
      ${meta.hasVoiceNote ? `<span class="day-tile-voice" title="Has a voice recording">🎙️</span>` : ""}
    </span>
  `;

  tile.addEventListener("click", async () => {
    if (!unlocked) {
      playLocked();
      tile.animate(SHAKE_KEYFRAMES, { duration: 400, easing: "ease" });
      statusEl.textContent = `This day isn't unlocked yet, it opens ${formatUnlockDateTime(meta.dayNumber)}.`;
      return;
    }
    if (!available) {
      statusEl.textContent = `Day ${meta.dayNumber} isn't built yet.`;
      return;
    }
    playSelect();
    stopMusic();
    statusEl.textContent = "";
    const config = await loadDayConfig(meta.dayNumber);
    onSelectDay(config);
  });

  return tile;
}
