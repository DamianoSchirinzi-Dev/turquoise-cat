// Edit TRIP_START_DATE once you know real travel dates — every day's unlock date
// is derived from it, so content authoring never needs to touch dates again.
// Format: "YYYY-MM-DD", interpreted in the player's local timezone at midnight.
export const TRIP_START_DATE = "2026-08-14"; // TODO: set real trip start date before shipping

export const DAY_COUNT = 14;

function addDays(dateStr, days) {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d;
}

export function unlockDateForDay(dayNumber) {
  return addDays(TRIP_START_DATE, dayNumber - 1);
}

export function isDayUnlocked(dayNumber, now = new Date()) {
  return now >= unlockDateForDay(dayNumber);
}

export function formatUnlockDate(dayNumber) {
  return unlockDateForDay(dayNumber).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
