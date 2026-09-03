// Edit TRIP_START_DATE once you know real travel dates — every day's unlock date
// is derived from it, so content authoring never needs to touch dates again.
// Format: "YYYY-MM-DD", interpreted in the player's local timezone at midnight.
//
// Day 1 is always unlocked (see isDayUnlocked below) and isn't part of the dated
// schedule at all — the sequence below starts counting from Day 2, so Day 2 unlocks
// on TRIP_START_DATE itself, Day 3 the day after, and so on.
export const TRIP_START_DATE = "2026-09-05"; // TODO: set real trip start date before shipping

export const DAY_COUNT = 15;

// Optional per-day unlock TIME overrides ("HH:MM", 24h, local time). The unlock DATE
// still comes from TRIP_START_DATE + dayNumber (see unlockDateForDay below) — an entry
// here just moves the moment within that day away from the default midnight, e.g. to
// time a reveal for the evening instead. Uncomment/edit a line to set a real time for
// that day. Day 15's is left active as a placeholder for testing.
//
// The trailing date comments are just a reference for the CURRENT TRIP_START_DATE
// (2026-09-05) — if that date ever changes, these comments won't auto-update, but the
// actual dates used in-app always will (only the time-of-day is hardcoded here). Day 1
// has no entry since it's always unlocked and never follows this dated sequence.
const UNLOCK_TIME_OVERRIDES = {
  // 2: "09:00", // Sat 5 Sept
  // 3: "09:00", // Sun 6 Sept
  // 4: "09:00", // Mon 7 Sept
  // 5: "09:00", // Tue 8 Sept
  // 6: "09:00", // Wed 9 Sept
  // 7: "09:00", // Thu 10 Sept
  // 8: "09:00", // Fri 11 Sept
  // 9: "09:00", // Sat 12 Sept
  // 10: "09:00", // Sun 13 Sept
  // 11: "09:00", // Mon 14 Sept
  // 12: "09:00", // Tue 15 Sept
  // 13: "09:00", // Wed 16 Sept
  14: "09:00", // Thu 17 Sept
  15: "09:00", // testing — Fri 18 Sept
};

function addDays(dateStr, days) {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d;
}

export function unlockDateForDay(dayNumber) {
  const date = addDays(TRIP_START_DATE, dayNumber - 2);
  const override = UNLOCK_TIME_OVERRIDES[dayNumber];
  if (override) {
    const [hours, minutes] = override.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
  }
  return date;
}

export function isDayUnlocked(dayNumber, now = new Date()) {
  if (dayNumber === 1) return true;
  return now >= unlockDateForDay(dayNumber);
}

export function hasCustomUnlockTime(dayNumber) {
  return dayNumber in UNLOCK_TIME_OVERRIDES;
}

export function formatUnlockDate(dayNumber) {
  return unlockDateForDay(dayNumber).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatUnlockDateTime(dayNumber) {
  const date = unlockDateForDay(dayNumber);
  const datePart = date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  const timePart = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", hour12: true });
  return `${datePart} at ${timePart}`;
}
