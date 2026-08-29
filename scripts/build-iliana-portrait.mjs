// Builds iliana's animated portrait sprite sheet: the "draculacat" from the CatPackFree
// pack (6-frame strip, 32x32/frame, tail-swish idle loop), with one cleanup pass — the
// source art has a stray single black pixel floating just off the tail in frames 0-4
// (found via connected-component scan: an isolated 1px blob at the frame's right edge,
// unconnected to the cat's outline), which we strip out.
//
// Usage: node scripts/build-iliana-portrait.mjs <path-to-CatPackFree-folder>
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { inflateSync, deflateSync } from "node:zlib";

function readPNG(path) {
  const buf = readFileSync(path);
  let offset = 8;
  let width, height, colorType;
  const idatChunks = [];
  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString("ascii", offset + 4, offset + 8);
    const data = buf.slice(offset + 8, offset + 8 + len);
    if (type === "IHDR") { width = data.readUInt32BE(0); height = data.readUInt32BE(4); colorType = data[9]; }
    else if (type === "IDAT") idatChunks.push(data);
    offset += 8 + len + 4;
  }
  const raw = inflateSync(Buffer.concat(idatChunks));
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
  const stride = width * channels;
  const pixels = Buffer.alloc(width * height * 4);
  let pos = 0;
  let prevLine = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const line = raw.slice(pos, pos + stride);
    pos += stride;
    const out = Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? out[x - channels] : 0;
      const b = prevLine[x];
      const c = x >= channels ? prevLine[x - channels] : 0;
      let pred;
      if (filter === 0) pred = 0;
      else if (filter === 1) pred = a;
      else if (filter === 2) pred = b;
      else if (filter === 3) pred = Math.floor((a + b) / 2);
      else { const p = a + b - c; const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); pred = pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      out[x] = (line[x] + pred) & 0xff;
    }
    for (let x = 0; x < width; x++) {
      const si = x * channels, di = (y * width + x) * 4;
      pixels[di] = out[si]; pixels[di + 1] = out[si + 1]; pixels[di + 2] = out[si + 2];
      pixels[di + 3] = channels === 4 ? out[si + 3] : 255;
    }
    prevLine = out;
  }
  return { width, height, pixels };
}

const CRC_TABLE = (() => { const t = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(buf) { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) { const typeBuf = Buffer.from(type, "ascii"); const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0); const crcBuf = Buffer.alloc(4); crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0); return Buffer.concat([len, typeBuf, data, crcBuf]); }
function encodePNG(width, height, pixelFn) {
  const raw = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;
  for (let y = 0; y < height; y++) { raw[offset++] = 0; for (let x = 0; x < width; x++) { const [r, g, b, a] = pixelFn(x, y); raw[offset++] = r; raw[offset++] = g; raw[offset++] = b; raw[offset++] = a; } }
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4); ihdr[8] = 8; ihdr[9] = 6;
  const idat = deflateSync(raw);
  return Buffer.concat([signature, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

const packDir = process.argv[2];
if (!packDir) {
  console.error("Usage: node scripts/build-iliana-portrait.mjs <path-to-CatPackFree-folder>");
  process.exit(1);
}

const sheet = readPNG(`${packDir}/drculacat.png`);
const FRAME_W = 32;

// (frame index, local x, local y) of the stray pixels to erase.
const STRAY_PIXELS = [
  [0, 31, 16],
  [1, 31, 17],
  [2, 31, 16],
  [3, 31, 16],
  [4, 31, 17],
];
const strayGlobal = new Set(STRAY_PIXELS.map(([f, lx, y]) => `${f * FRAME_W + lx},${y}`));

mkdirSync("public/assets/portraits", { recursive: true });
writeFileSync(
  "public/assets/portraits/iliana.png",
  encodePNG(sheet.width, sheet.height, (x, y) => {
    if (strayGlobal.has(`${x},${y}`)) return [0, 0, 0, 0];
    const i = (y * sheet.width + x) * 4;
    return [sheet.pixels[i], sheet.pixels[i + 1], sheet.pixels[i + 2], sheet.pixels[i + 3]];
  }),
);

console.log("Wrote public/assets/portraits/iliana.png (CatPackFree draculacat, 6 frames @32x32, stray pixel removed)");
