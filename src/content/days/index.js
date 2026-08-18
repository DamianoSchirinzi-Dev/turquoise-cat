// The 14-day content registry. `type` drives pacing/badges on the calendar screen;
// adjust the distribution freely — this starting layout just mirrors the brief's mix
// (3 big, 8 medium, 2 filler, 1 finale). `load` is a dynamic import so days without a
// config yet don't break anything; add day02.js etc. during the week-2 content sprint
// and wire its `load` here using the same pattern as day 1.
export const DAY_REGISTRY = [
  { dayNumber: 1, type: "big", load: () => import("./day01.js") },
  { dayNumber: 2, type: "medium", load: null },
  { dayNumber: 3, type: "medium", load: null },
  { dayNumber: 4, type: "filler", load: null },
  { dayNumber: 5, type: "medium", load: null },
  { dayNumber: 6, type: "medium", load: null },
  { dayNumber: 7, type: "big", load: null },
  { dayNumber: 8, type: "medium", load: null },
  { dayNumber: 9, type: "medium", load: null },
  { dayNumber: 10, type: "filler", load: null },
  { dayNumber: 11, type: "medium", load: null },
  { dayNumber: 12, type: "big", load: null },
  { dayNumber: 13, type: "medium", load: null },
  { dayNumber: 14, type: "finale", load: null },
];

export function getDayMeta(dayNumber) {
  return DAY_REGISTRY.find((d) => d.dayNumber === dayNumber);
}

export async function loadDayConfig(dayNumber) {
  const meta = getDayMeta(dayNumber);
  if (!meta || !meta.load) return null;
  const mod = await meta.load();
  return mod.default;
}
