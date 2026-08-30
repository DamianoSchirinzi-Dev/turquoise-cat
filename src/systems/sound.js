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

// A splash — filtered white noise with a falling lowpass cutoff and a quick decay,
// rather than an oscillator tone, since a splash reads as noise, not a pitch. Played
// automatically whenever the "water" background is applied (see story.js).
export function playSplash() {
  const ctx = getContext();
  if (ctx.state === "suspended") ctx.resume();

  const duration = 0.35;
  const bufferSize = Math.round(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2400, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start();
  noise.stop(ctx.currentTime + duration + 0.02);
}

// ---------- Ambient calendar-screen music ----------
// A cheerful, looping little tune — short plucky major-scale notes (like a music box)
// over a soft held bass note per phrase, not a slow sustained pad — a minor-key drone
// read as moody rather than fun, so this leans bright and bouncy instead. Loops
// seamlessly; kept quiet so it sits behind the UI without fighting the tap/blip sounds.
const MELODY = [
  261.63, 329.63, 392.0, 329.63, // C4 E4 G4 E4
  349.23, 440.0, 392.0, 329.63, // F4 A4 G4 E4
  392.0, 493.88, 523.25, 440.0, // G4 B4 C5 A4
  392.0, 349.23, 329.63, 293.66, // G4 F4 E4 D4
];
// One bass note per 4-note phrase above (C - F - G - G), held softly underneath.
const BASS_NOTES = [130.81, 174.61, 196.0, 196.0];
const NOTE_DURATION = 0.32; // seconds per melody note
const NOTE_GAP = 0.02; // brief silence between notes so they read as plucks, not legato

let musicBus = null;
let musicTimer = null;
let musicNoteIndex = 0;
let musicRunning = false;
// Bumped on every startMusic() call; each tick() closure captures its own value and
// bails the instant it no longer matches musicGeneration. This is the real guard
// against two overlapping loops — belt-and-braces alongside musicRunning, in case
// start/stop ever gets called out of the order this module expects.
let musicGeneration = 0;

function playMelodyNote(ctx, freq) {
  const startTime = ctx.currentTime;
  const osc = ctx.createOscillator();
  const noteGain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq;
  noteGain.gain.setValueAtTime(0.0001, startTime);
  noteGain.gain.exponentialRampToValueAtTime(0.05, startTime + 0.02);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + NOTE_DURATION);
  osc.connect(noteGain).connect(musicBus);
  osc.start(startTime);
  osc.stop(startTime + NOTE_DURATION + 0.05);
}

function playBassNote(ctx, freq) {
  const startTime = ctx.currentTime;
  const duration = (NOTE_DURATION + NOTE_GAP) * 4;
  const osc = ctx.createOscillator();
  const noteGain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  noteGain.gain.setValueAtTime(0, startTime);
  noteGain.gain.linearRampToValueAtTime(0.035, startTime + 0.1);
  noteGain.gain.setValueAtTime(0.035, startTime + duration - 0.15);
  noteGain.gain.linearRampToValueAtTime(0, startTime + duration);
  osc.connect(noteGain).connect(musicBus);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

// Starts the loop from the beginning. Always safe to call, even if it's already
// running or mid-fade-out from a very recent stopMusic() — it hard-resets state every
// time (new generation, fresh bus) so two loops can never end up overlapping, which is
// what caused notes to "double up" when quickly leaving and returning to the calendar.
export function startMusic() {
  const ctx = getContext();
  if (ctx.state === "suspended") ctx.resume();

  clearTimeout(musicTimer);
  musicGeneration += 1;
  const generation = musicGeneration;
  musicRunning = true;
  musicNoteIndex = 0;

  // A fresh bus, not a reused one: disconnecting the old one immediately silences any
  // notes still ringing from a previous generation, instead of leaving them to finish
  // their natural envelope underneath the new loop.
  if (musicBus) musicBus.disconnect();
  musicBus = ctx.createGain();
  musicBus.gain.value = 1;
  musicBus.connect(ctx.destination);

  const tick = () => {
    if (musicGeneration !== generation) return;
    if (musicNoteIndex % 4 === 0) playBassNote(ctx, BASS_NOTES[musicNoteIndex / 4]);
    playMelodyNote(ctx, MELODY[musicNoteIndex]);
    musicNoteIndex = (musicNoteIndex + 1) % MELODY.length;
    musicTimer = setTimeout(tick, (NOTE_DURATION + NOTE_GAP) * 1000);
  };
  tick();
}

// Stops scheduling new notes and fades out whatever's currently sounding — safe to
// call even if the music isn't running.
export function stopMusic() {
  if (!musicRunning) return;
  musicRunning = false;
  musicGeneration += 1; // invalidates the current tick() closure immediately
  clearTimeout(musicTimer);
  if (musicBus) {
    const ctx = getContext();
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.setValueAtTime(musicBus.gain.value, ctx.currentTime);
    musicBus.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
  }
}
