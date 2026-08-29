// Edit TRIP_START_DATE once you know real travel dates — every day's unlock date
// is derived from it, so content authoring never needs to touch dates again.
// Format: "YYYY-MM-DD", interpreted in the player's local timezone at midnight.
export const TRIP_START_DATE = "2026-08-17"; // TODO: set real trip start date before shipping

export const DAY_COUNT = 15;

// Optional per-day unlock TIME overrides ("HH:MM", 24h, local time). The unlock DATE
// still comes from TRIP_START_DATE + dayNumber (see unlockDateForDay below) — an entry
// here just moves the moment within that day away from the default midnight, e.g. to
// time a reveal for the evening instead. Uncomment/edit a line to set a real time for
// that day. Day 15's is left active as a placeholder for testing.
//
// The trailing date comments are just a reference for the CURRENT TRIP_START_DATE
// (2026-08-14) — if that date ever changes, these comments won't auto-update, but the
// actual dates used in-app always will (only the time-of-day is hardcoded here).
const UNLOCK_TIME_OVERRIDES = {
  // 1: "09:00", // Fri 14 Aug
  // 2: "09:00", // Sat 15 Aug
  // 3: "09:00", // Sun 16 Aug
  // 4: "09:00", // Mon 17 Aug
  // 5: "09:00", // Tue 18 Aug
  // 6: "09:00", // Wed 19 Aug
  // 7: "09:00", // Thu 20 Aug
  // 8: "09:00", // Fri 21 Aug
  // 9: "09:00", // Sat 22 Aug
  // 10: "09:00", // Sun 23 Aug
  // 11: "09:00", // Mon 24 Aug
  // 12: "09:00", // Tue 25 Aug
  // 13: "09:00", // Wed 26 Aug
  14: "09:00", // Thu 27 Aug
  15: "09:00", // testing — Fri 28 Aug
};

function addDays(dateStr, days) {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d;
}

export function unlockDateForDay(dayNumber) {
  const date = addDays(TRIP_START_DATE, dayNumber - 1);
  const override = UNLOCK_TIME_OVERRIDES[dayNumber];
  if (override) {
    const [hours, minutes] = override.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
  }
  return date;
}

export function isDayUnlocked(dayNumber, now = new Date()) {
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
