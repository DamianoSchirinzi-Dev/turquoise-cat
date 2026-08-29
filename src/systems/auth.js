// A soft password gate in front of the calendar — NOT real security. The check runs
// entirely in the browser, so anyone who reads the deployed bundle could recover the
// hash and brute-force it offline. It's just a barrier so a stray link doesn't
// immediately open the calendar for anyone who happens to have it.
//
// To set your own password: run `node scripts/hash-password.mjs "your password"`
// locally and paste the printed hash below. The plaintext password itself never needs
// to touch this file, a chat log, or version control — only the hash does.
const PASSWORD_HASH = "6593d0e5f5fe92591ba771970ee193b2c1738e2b6ac6e388f83a915eb121ea43";

const STORAGE_KEY = "gateUnlocked";

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function isUnlocked() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export async function checkPassword(input) {
  const hash = await sha256Hex(input);
  const ok = hash === PASSWORD_HASH;
  if (ok) localStorage.setItem(STORAGE_KEY, "true");
  return ok;
}
