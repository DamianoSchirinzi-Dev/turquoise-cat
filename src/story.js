// The visual-novel player: renders a background, two character portraits, and a
// dialogue box, then walks through a day's script sequentially. Tap the dialogue box
// to advance; choices branch into their outcome lines before continuing the main
// script; `{ background }` entries cross-fade to a new backdrop mid-scene. This file
// is the only "engine" — everything day-specific lives in src/content/days/dayNN.js.
import { getCharacter } from "./ui/characters.js";
import { getBackground } from "./ui/backgrounds.js";
import { markDayComplete, setFlag } from "./systems/gameState.js";
import { playBlip, playTap, playCorrect, playIncorrect, playSplash } from "./systems/sound.js";

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
      <div class="answer-flash"></div>
      <div class="splash-effect">
        <span class="splash-drop"></span>
        <span class="splash-drop"></span>
        <span class="splash-drop"></span>
        <span class="splash-drop"></span>
        <span class="splash-drop"></span>
        <span class="splash-drop"></span>
        <span class="splash-drop"></span>
        <span class="splash-drop"></span>
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
    answerFlash: root.querySelector(".answer-flash"),
    splashEffect: root.querySelector(".splash-effect"),
    fadeOverlay: root.querySelector(".fade-overlay"),
    sceneIntro: root.querySelector(".scene-intro"),
    sceneIntroTitle: root.querySelector(".scene-intro-title"),
    sceneIntroText: root.querySelector(".scene-intro-text"),
  };

  const damiano = getCharacter("damiano");
  const iliana = getCharacter("iliana");
  el.portraitDamiano.querySelector(".portrait-art").style.backgroundImage = `url(${damiano.image})`;
  el.portraitIliana.querySelector(".portrait-art").style.backgroundImage = `url(${iliana.image})`;

  const queue = [...config.script];
  let index = 0;
  let onAdvanceClick = null;
  let currentTyping = null;
  let answering = false;
  // Set whenever applyBackground runs; consumed by revealBackgroundEffect() once the
  // fade-from-black after it completes, so a visual effect (e.g. the water splash)
  // plays when the scene is actually visible, not while it's still hidden behind black.
  let pendingBackgroundEffect = null;

  applyBackground(el.bg, config.background);
  pendingBackgroundEffect = config.background;

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
    return new Promise((resolve) =>
      root.addEventListener(
        "click",
        () => {
          playTap();
          resolve();
        },
        { once: true },
      ),
    );
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

  // Fires the visual effect (if any) for whichever background was last applied behind
  // the black screen — call this right after fadeFromBlack() so it plays once the
  // scene is actually visible, not while it's still hidden.
  function revealBackgroundEffect() {
    const key = pendingBackgroundEffect;
    pendingBackgroundEffect = null;
    BACKGROUND_EFFECTS[key]?.(el.splashEffect);
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

  // Flashes the screen green/red with a verdict stamp — "Correct!"/"Incorrect!" by
  // default, or `message` if the option supplies its own flavor (e.g. "Liar."). Used
  // for quiz-style choices (options with a `correct` flag); resolves once the flash
  // has faded back out.
  function flashAnswer(isCorrect, message) {
    if (isCorrect) playCorrect();
    else playIncorrect();
    return new Promise((resolve) => {
      el.answerFlash.textContent = message || (isCorrect ? "Correct!" : "Incorrect!");
      el.answerFlash.classList.remove("is-correct", "is-incorrect");
      el.answerFlash.classList.add(isCorrect ? "is-correct" : "is-incorrect", "is-visible");
      setTimeout(() => {
        el.answerFlash.classList.remove("is-visible");
        setTimeout(resolve, FADE_MS);
      }, 900);
    });
  }

  async function chooseOption(opt) {
    if (answering) return;
    // Quiz-style choices (options carrying `correct`) flash a verdict before continuing;
    // a wrong pick just re-shows the same question so the player can try again.
    if (opt.correct !== undefined) {
      answering = true;
      await flashAnswer(opt.correct, opt.verdict);
      answering = false;
      if (!opt.correct) return;
    }
    if (opt.flag) setFlag(opt.flag);
    el.choiceOverlay.classList.remove("is-visible");
    if (opt.outcome?.length) queue.splice(index, 0, ...opt.outcome);
    advance();
  }

  // Hides the dialogue box and empties its text so the previous line can't linger
  // underneath a scene transition and still be sitting there once it fades back in.
  function clearDialogue() {
    el.dialogueBox.classList.add("is-hidden");
    el.dialogueText.textContent = "";
    el.dialogueNext.classList.remove("is-visible");
    setSpeaking(null);
  }

  async function changeBackground(key) {
    clearDialogue();
    await fadeToBlack();
    applyBackground(el.bg, key);
    pendingBackgroundEffect = key;
    await fadeFromBlack();
    revealBackgroundEffect();
    advance();
  }

  // Plays `firstEntry` and then, for as long as the next queued entry is also a
  // `{ card }`, keeps consuming and playing those too — all under one continuous black
  // screen. Assumes the screen is already black; the caller handles fading to/from it.
  // This is what stops consecutive cards (including the opening intro card followed by
  // a `{ card }` as the script's first entry) from briefly revealing the live scene
  // in between — that reveal-then-hide was the "flash" between two back-to-back cards.
  async function playCardChain(firstEntry) {
    let entry = firstEntry;
    while (entry) {
      if (entry.background) {
        applyBackground(el.bg, entry.background);
        pendingBackgroundEffect = entry.background;
      }
      await playCard(entry.card);
      const next = queue[index];
      if (next && next.card) {
        index += 1;
        entry = next;
      } else {
        entry = null;
      }
    }
  }

  // A mid-scene time-skip/narration card — same black-screen treatment as the
  // opener/closer, but inline in the script (e.g. "the next few days passed...").
  // If an entry also carries `background`, the backdrop swaps while the screen is
  // still black, so the reveal lands on the new scene directly with no flash first.
  async function showSceneCard(firstEntry) {
    clearDialogue();
    await fadeToBlack();
    await playCardChain(firstEntry);
    await fadeFromBlack();
    revealBackgroundEffect();
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
    else if (entry.card) showSceneCard(entry);
    else if (entry.background) changeBackground(entry.background);
    else advance();
  }

  async function finish() {
    markDayComplete(config.dayNumber);
    clearDialogue();
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
    // The screen starts black already, so no fadeToBlack here — but if the script's
    // first entry is also a card, chain straight into it (see playCardChain) instead
    // of revealing the scene after the intro just to hide it again immediately.
    await playCardChain({ card: config.intro });
    await fadeFromBlack();
    revealBackgroundEffect();
    advance();
  }, 20);
}

// Backgrounds that play a one-shot ambient sound the moment they're applied.
const BACKGROUND_SOUNDS = { water: playSplash };

// Backgrounds that also trigger a one-shot visual effect (see `.splash-effect` in the
// template) the moment they're applied — a burst of droplet elements toggled via a
// class, restarted with a forced reflow so it can replay if the background is set again.
const BACKGROUND_EFFECTS = {
  water: (splashEl) => {
    if (!splashEl) return;
    splashEl.classList.remove("is-active");
    void splashEl.offsetWidth;
    splashEl.classList.add("is-active");
  },
};

// Applies the background and plays its one-shot ambient sound (if any) immediately —
// sound is fine to hear while the screen is still black. Any visual effect for this
// background is deliberately NOT triggered here; see revealBackgroundEffect(), which
// callers run after the fade back in so it plays while the scene is actually visible.
function applyBackground(bgEl, key) {
  bgEl.innerHTML = getBackground(key);
  BACKGROUND_SOUNDS[key]?.();
}
