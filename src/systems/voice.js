// Plays real recorded voice-note audio files — the one place this app uses an actual
// audio asset rather than synthesized Web Audio (see systems/sound.js for everything
// else). Short personal clips attached to specific days, played once at that day's
// outro. `path` is relative to /public, same convention as character portrait images
// (e.g. "assets/recordings/day_1.m4a").
const unlockedAudio = new Map(); // path -> HTMLAudioElement, pre-"unlocked" for iOS
let currentAudio = null;

// Call this synchronously from within a real tap/click handler — as early as possible,
// with no `await` before it. iOS Safari only allows a given <audio> element to play
// later WITHOUT a fresh gesture if it already played (even silently, even for an
// instant) during a real one. The actual outro playback happens minutes later, deep in
// an async chain of awaited fades, which iOS does not count as user-initiated — it was
// silently rejecting play() there, which is why the recording skipped straight past
// with no sound. Unlocking here, at the moment the day is tapped, fixes that.
export function unlockVoiceNote(path) {
  if (!path || unlockedAudio.has(path)) return;
  const audio = new Audio(path);
  audio.muted = true;
  unlockedAudio.set(path, audio);
  audio
    .play()
    .then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
    })
    .catch(() => {
      // If the unlock attempt itself fails, playVoiceNote() below still falls back to
      // a plain `new Audio()` at real playback time — no worse off than before.
    });
}

// Resolves once playback actually finishes (or immediately if it fails/gets blocked —
// autoplay restrictions or a bad file shouldn't leave the caller waiting forever, since
// story.js uses this to freeze input for the clip's duration).
export function playVoiceNote(path) {
  return new Promise((resolve) => {
    if (currentAudio) currentAudio.pause();
    currentAudio = unlockedAudio.get(path) || new Audio(path);
    currentAudio.currentTime = 0;
    currentAudio.addEventListener("ended", resolve, { once: true });
    currentAudio.addEventListener("error", resolve, { once: true });
    currentAudio.play().catch(resolve);
  });
}
