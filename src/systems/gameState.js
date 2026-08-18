// Tracks day completion and choice flags across sessions (localStorage).
// Choice flags let later days (especially the finale) reference earlier decisions.
const STORAGE_KEY = "advent-game-state-v1";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completedDays: [], flags: {} };
  } catch {
    return { completedDays: [], flags: {} };
  }
}

function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = load();

export function isDayComplete(dayNumber) {
  return state.completedDays.includes(dayNumber);
}

export function markDayComplete(dayNumber) {
  if (!state.completedDays.includes(dayNumber)) {
    state.completedDays.push(dayNumber);
    save(state);
  }
}

export function setFlag(key, value = true) {
  state.flags[key] = value;
  save(state);
}

export function getFlag(key) {
  return state.flags[key];
}

export function allFlags() {
  return { ...state.flags };
}
