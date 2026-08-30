// The 14-day content registry. `type` drives pacing/badges on the calendar screen;
// adjust the distribution freely — this starting layout just mirrors the brief's mix
// (3 big, 8 medium, 2 filler, 1 finale). `load` is a dynamic import so days without a
// config yet don't break anything; add day02.js etc. during the week-2 content sprint
// and wire its `load` here using the same pattern as day 1.
// `voiceNote` (the actual audio path) shows the mic icon on that day's calendar tile
// AND lets calendar.js "unlock" the clip for iOS the instant the tile is tapped — both
// need it here, not just in the lazy-loaded day file, since neither can wait on a
// dynamic import (the icon needs it with zero loading, and the iOS unlock needs to run
// synchronously inside the tap, before any await). The matching dayNN.js still needs
// its own identical `voiceNote` field — that copy is what actually drives playback.
export const DAY_REGISTRY = [
  { dayNumber: 1, type: "big", load: () => import("./day01.js") },
  { dayNumber: 2, type: "big", voiceNote: "assets/recordings/day_2.m4a", load: () => import("./day02.js") },
  { dayNumber: 3, type: "medium", load: () => import("./day03.js") },
  { dayNumber: 4, type: "medium", load: () => import("./day04.js") },
  { dayNumber: 5, type: "medium", load: () => import("./day05.js") },
  { dayNumber: 6, type: "big", load: () => import("./day06.js") },
  { dayNumber: 7, type: "medium", load: () => import("./day07.js") },
  { dayNumber: 8, type: "medium", voiceNote: "assets/recordings/day_8.m4a", load: () => import("./day08.js") },
  { dayNumber: 9, type: "medium", load: () => import("./day09.js") },
  { dayNumber: 10, type: "medium", load: () => import("./day10.js") },
  { dayNumber: 11, type: "medium", load: () => import("./day11.js") },
  { dayNumber: 12, type: "big", load: () => import("./day12.js") },
  { dayNumber: 13, type: "medium", load: () => import("./day13.js") },
  { dayNumber: 14, type: "finale", load: () => import("./day14.js") },
  { dayNumber: 15, type: "finale", voiceNote: "assets/recordings/day_15.m4a", load: () => import("./day15.js") },
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
