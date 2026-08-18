// Builds iliana's animated portrait sprite sheet: the "draculacat" from the CatPackFree
// pack, used as-is (already a clean 6-frame strip, 32x32/frame, tail-swish idle loop).
//
// Usage: node scripts/build-iliana-portrait.mjs <path-to-CatPackFree-folder>
import { copyFileSync, mkdirSync } from "node:fs";

const packDir = process.argv[2];
if (!packDir) {
  console.error("Usage: node scripts/build-iliana-portrait.mjs <path-to-CatPackFree-folder>");
  process.exit(1);
}

mkdirSync("public/assets/portraits", { recursive: true });
copyFileSync(`${packDir}/drculacat.png`, "public/assets/portraits/iliana.png");

console.log("Wrote public/assets/portraits/iliana.png (CatPackFree draculacat, 6 frames @32x32)");
