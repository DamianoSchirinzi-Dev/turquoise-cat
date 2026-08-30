// Plays real recorded voice-note audio files — the one place this app uses an actual
// audio asset rather than synthesized Web Audio (see systems/sound.js for everything
// else). Short personal clips attached to specific days, played once at that day's
// outro. `path` is relative to /public, same convention as character portrait images
// (e.g. "assets/recordings/day_1.m4a").
let currentAudio = null;

// Resolves once playback actually finishes (or immediately if it fails/gets blocked —
// autoplay restrictions or a bad file shouldn't leave the caller waiting forever, since
// story.js uses this to freeze input for the clip's duration).
export function playVoiceNote(path) {
  return new Promise((resolve) => {
    if (currentAudio) currentAudio.pause();
    currentAudio = new Audio(path);
    currentAudio.addEventListener("ended", resolve, { once: true });
    currentAudio.addEventListener("error", resolve, { once: true });
    currentAudio.play().catch(resolve);
  });
}
