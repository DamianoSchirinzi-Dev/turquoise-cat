// Tiny synthesized "text blip" sound (Web Audio, no asset files) — a short soft square
// wave beep played per typed character, like Animal Crossing / Undertale dialogue.
let audioCtx = null;

function getContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
}

export function playBlip(pitch = 1) {
  const ctx = getContext();
  if (ctx.state === "suspended") ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = 220 * pitch;
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.06);
}

// Schedules one oscillator note starting `startOffset` seconds from now, with a quick
// attack and an exponential decay — the building block for the multi-note stings below.
function playTone(ctx, freq, startOffset, duration, type, peakGain) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const startTime = ctx.currentTime + startOffset;
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

// A soft downward "tock" for dismissing a scene-setter card — deliberately calmer and
// lower-pitched than the dialogue blip so it reads as "page turned", not "text typed".
export function playTap() {
  const ctx = getContext();
  if (ctx.state === "suspended") ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(520, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(340, ctx.currentTime + 0.09);
  gain.gain.setValueAtTime(0.07, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.11);
}

// A bright rising major-triad chime (C5-E5-G5) for a correct quiz answer.
export function playCorrect() {
  const ctx = getContext();
  if (ctx.state === "suspended") ctx.resume();
  playTone(ctx, 523.25, 0, 0.12, "triangle", 0.08);
  playTone(ctx, 659.25, 0.09, 0.12, "triangle", 0.08);
  playTone(ctx, 783.99, 0.18, 0.24, "triangle", 0.09);
}

// A flat, buzzy two-note descent for a wrong quiz answer — sawtooth instead of the
// warm triangle/sine used everywhere else, so it reads as an unambiguous "buzzer".
export function playIncorrect() {
  const ctx = getContext();
  if (ctx.state === "suspended") ctx.resume();
  playTone(ctx, 220, 0, 0.16, "sawtooth", 0.06);
  playTone(ctx, 164.81, 0.1, 0.24, "sawtooth", 0.06);
}

// A short, crisp upward chirp for picking a day tile on the main menu — punchier and
// quicker than the scene-card tap, so choosing a day feels distinct from advancing one.
export function playSelect() {
  const ctx = getContext();
  if (ctx.state === "suspended") ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(380, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.07);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.09);
}

// A low, blunt double-thud for tapping a day that hasn't unlocked yet — a soft "denied"
// bump, distinct from the buzzy quiz-wrong sound and the bright menu-select chirp.
export function playLocked() {
  const ctx = getContext();
  if (ctx.state === "suspended") ctx.resume();
  playTone(ctx, 140, 0, 0.12, "sine", 0.09);
  playTone(ctx, 110, 0.1, 0.16, "sine", 0.08);
}
