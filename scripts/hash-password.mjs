// Prints the SHA-256 hex hash of a password, for src/systems/auth.js's PASSWORD_HASH.
// Run this locally with your real password — the plaintext never has to touch the
// codebase, a chat log, or version control, only the resulting hash does.
//
// Usage: node scripts/hash-password.mjs "your password here"
import { createHash } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your password here"');
  process.exit(1);
}

console.log(createHash("sha256").update(password, "utf8").digest("hex"));
