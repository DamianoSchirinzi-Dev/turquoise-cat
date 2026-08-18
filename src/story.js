// The visual-novel player: renders a background, two character portraits, and a
// dialogue box, then walks through a day's script sequentially. Tap the dialogue box
// to advance; choices branch into their outcome lines before continuing the main
// script; `{ background }` entries cross-fade to a new backdrop mid-scene. This file
// is the only "engine" — everything day-specific lives in src/content/days/dayNN.js.
import { getCharacter } from "./ui/characters.js";
import { getBackground } from "./ui/backgrounds.js";
import { markDayComplete, setFlag } from "./systems/gameState.js";
import { playBlip } from "./systems/sound.js";

const FADE_MS = 450;
const INTRO_FADE_MS = 600;
const TYPE_MS_PER_CHAR = 24;
// Each character gets a distinct blip pitch, like a "voice".
const PITCH_BY_SPEAKER = { damiano: 1.5, iliana: 0.85 };

export function playStory(root, config, onFinish) {
  root.innerHTML = `
    <div class="story">
      <div class="story-bg"></div>
      <div class="portrait-stage">
        <div class="portrait portrait--damiano">
          <div class="portrait-art"></div>
        </div>
        <div class="portrait portrait--iliana">
          <div class="portrait-art"></div>
        </div>
      </div>
      <div class="dialogue-box">
        <div class="dialogue-name"></div>
        <div class="dialogue-text"></div>
        <div class="dialogue-next">▼</div>
      </div>
      <div class="choice-overlay">
        <div class="choice-prompt"></div>
        <div class="choice-options"></div>
      </div>
      <div class="fade-overlay is-visible"></div>
      <div class="scene-intro">
        <div class="scene-intro-title"></div>
        <div class="scene-intro-text"></div>
        <div class="scene-intro-next">Tap to continue ▼</div>
      </div>
    </div>
  `;

  const el = {
    bg: root.querySelector(".story-bg"),
    portraitDamiano: root.querySelector(".portrait--damiano"),
    portraitIliana: root.querySelector(".portrait--iliana"),
    dialogueBox: root.querySelector(".dialogue-box"),
    dialogueName: root.querySelector(".dialogue-name"),
    dialogueText: root.querySelector(".dialogue-text"),
    dialogueNext: root.querySelector(".dialogue-next"),
    choiceOverlay: root.querySelector(".choice-overlay"),
    choicePrompt: root.querySelector(".choice-prompt"),
    choiceOptions: root.querySelector(".choice-options"),
    fadeOverlay: root.querySelector(".fade-overlay"),
    sceneIntro: root.querySelector(".scene-intro"),
    sceneIntroTitle: root.querySelector(".scene-intro-title"),
    sceneIntroText: root.querySelector(".scene-intro-text"),
  };

  const damiano = getCharacter("damiano");
  const iliana = getCharacter("iliana");
  el.portraitDamiano.querySelector(".portrait-art").style.backgroundImage = `url(${damiano.image})`;
  el.portraitIliana.querySelector(".portrait-art").style.backgroundImage = `url(${iliana.image})`;

  applyBackground(el.bg, config.background);

  const queue = [...config.script];
  let index = 0;
  let onAdvanceClick = null;
  let currentTyping = null;

  // Reveals `text` into `element` one character at a time with a blip per non-space
  // character. Returns a controller so a tap mid-type can skip straight to full text.
  function typeText(element, text, speaker, onDone) {
    element.textContent = "";
    el.dialogueNext.classList.remove("is-visible");
    let i = 0;
    let timer = null;
    const pitch = PITCH_BY_SPEAKER[speaker] ?? 1;

    const step = () => {
      const ch = text[i];
      element.textContent += ch;
      if (ch.trim()) playBlip(pitch);
      i += 1;
      if (i >= text.length) {
        currentTyping = null;
        el.dialogueNext.classList.add("is-visible");
        onDone();
      } else {
        timer = setTimeout(step, TYPE_MS_PER_CHAR);
      }
    };
    step();

    return {
      skip: () => {
        clearTimeout(timer);
        element.textContent = text;
        currentTyping = null;
        el.dialogueNext.classList.add("is-visible");
        onDone();
      },
    };
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Resolves the next time the player taps the scene. No timeout — the reader decides
  // when to move on, same as the dialogue box.
  function waitForTap() {
    return new Promise((resolve) => root.addEventListener("click", resolve, { once: true }));
  }

  // Scene-setter card (used for the opener, closer, and mid-scene time-skips): title +
  // description fade in over a black screen and stay until tapped, then fade out.
  // Assumes the screen is already black (the caller fades that in/out itself).
  async function playCard(text) {
    if (!text) return;
    el.sceneIntroTitle.textContent = config.title ?? "";
    el.sceneIntroText.textContent = text;
    el.sceneIntro.classList.add("is-visible");
    await wait(INTRO_FADE_MS);
    await waitForTap();
    el.sceneIntro.classList.remove("is-visible");
    await wait(INTRO_FADE_MS);
  }

  function fadeToBlack() {
    return new Promise((resolve) => {
      el.fadeOverlay.classList.add("is-visible");
      setTimeout(resolve, FADE_MS);
    });
  }

  function fadeFromBlack() {
    return new Promise((resolve) => {
      el.fadeOverlay.classList.remove("is-visible");
      setTimeout(resolve, FADE_MS);
    });
  }

  function setSpeaking(speakerKey) {
    el.portraitDamiano.classList.toggle("is-speaking", speakerKey === "damiano");
    el.portraitIliana.classList.toggle("is-speaking", speakerKey === "iliana");
  }

  function showLine(entry) {
    const character = getCharacter(entry.speaker);
    setSpeaking(entry.speaker);
    el.dialogueName.textContent = character ? character.name : "";
    el.dialogueBox.classList.remove("is-hidden");
    el.dialogueText.classList.toggle("is-thought", !!entry.thought);
    onAdvanceClick = null;
    currentTyping = typeText(el.dialogueText, entry.text, entry.speaker, () => {
      onAdvanceClick = advance;
    });
  }

  function showChoice(choice) {
    el.dialogueBox.classList.add("is-hidden");
    setSpeaking(null);
    el.choicePrompt.textContent = choice.prompt;
    el.choiceOptions.innerHTML = "";
    choice.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.textContent = opt.label;
      btn.addEventListener("click", () => chooseOption(opt));
      el.choiceOptions.appendChild(btn);
    });
    el.choiceOverlay.classList.add("is-visible");
  }

  function chooseOption(opt) {
    if (opt.flag) setFlag(opt.flag);
    el.choiceOverlay.classList.remove("is-visible");
    if (opt.outcome?.length) queue.splice(index, 0, ...opt.outcome);
    advance();
  }

  async function changeBackground(key) {
    await fadeToBlack();
    applyBackground(el.bg, key);
    await fadeFromBlack();
    advance();
  }

  // A mid-scene time-skip/narration card — same black-screen treatment as the
  // opener/closer, but inline in the script (e.g. "the next few days passed...").
  async function showSceneCard(text) {
    await fadeToBlack();
    await playCard(text);
    await fadeFromBlack();
    advance();
  }

  function advance() {
    onAdvanceClick = null;
    if (index >= queue.length) {
      finish();
      return;
    }
    const entry = queue[index];
    index += 1;
    if (entry.speaker) showLine(entry);
    else if (entry.choice) showChoice(entry.choice);
    else if (entry.background) changeBackground(entry.background);
    else if (entry.card) showSceneCard(entry.card);
    else advance();
  }

  async function finish() {
    markDayComplete(config.dayNumber);
    el.dialogueBox.classList.add("is-hidden");
    setSpeaking(null);
    await fadeToBlack();
    await playCard(config.outro);
    onFinish();
  }

  el.dialogueBox.addEventListener("click", () => {
    if (currentTyping) {
      currentTyping.skip();
      return;
    }
    if (onAdvanceClick) onAdvanceClick();
  });

  // A plain timer, not requestAnimationFrame: rAF can be suspended indefinitely on a
  // backgrounded/inactive tab (some mobile browsers do this too), and game logic
  // shouldn't be gated on the page actively repainting.
  setTimeout(async () => {
    await playCard(config.intro);
    await fadeFromBlack();
    advance();
  }, 20);
}

function applyBackground(bgEl, key) {
  bgEl.innerHTML = getBackground(key);
}
