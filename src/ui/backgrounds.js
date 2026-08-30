// Scene backdrops — layered SVG illustrations (not photos/pixel-art), rendered full-bleed
// with `preserveAspectRatio="xMidYMid slice"` so they crop to cover any screen like a
// `background-size:cover` image would. Swap any of these for real sourced/illustrated
// art later by changing story.js's applyBackground to set an <img>/background-image
// instead of injecting SVG markup — the `key` lookup stays the same either way.
//
// Shared canvas is 400x700 (portrait-ish); the slice crop handles other aspect ratios.
const WRAP = (inner) => `
  <svg viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    ${inner}
  </svg>
`;

const outdoor = WRAP(`
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6fa8d6"/>
      <stop offset="55%" stop-color="#bfe0d0"/>
      <stop offset="100%" stop-color="#e9dfa8"/>
    </linearGradient>
    <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff6c9" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#fff6c9" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="700" fill="url(#sky)"/>
  <circle cx="300" cy="150" r="90" fill="url(#sun-glow)"/>
  <circle cx="300" cy="150" r="34" fill="#fff9e0"/>
  <g fill="#ffffff" opacity="0.75">
    <ellipse cx="90" cy="120" rx="45" ry="16"/>
    <ellipse cx="120" cy="110" rx="34" ry="14"/>
    <ellipse cx="250" cy="230" rx="38" ry="13"/>
  </g>
  <path d="M0,430 Q100,380 200,420 T400,410 V700 H0 Z" fill="#7fae5e"/>
  <path d="M0,470 Q120,430 220,465 T400,455 V700 H0 Z" fill="#6a9c4d"/>
  <g fill="#4f7a3c">
    <path d="M60,470 L70,410 L80,470 Z"/>
    <ellipse cx="70" cy="400" rx="22" ry="26"/>
    <path d="M330,480 L340,430 L350,480 Z"/>
    <ellipse cx="340" cy="420" rx="18" ry="22"/>
  </g>
`);

const home = WRAP(`
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e9d9c4"/>
      <stop offset="75%" stop-color="#d9c3a4"/>
    </linearGradient>
    <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a3568"/>
      <stop offset="100%" stop-color="#8a6a8c"/>
    </linearGradient>
    <radialGradient id="lamp-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffe9a8" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#ffe9a8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="700" fill="url(#wall)"/>
  <rect y="600" width="400" height="100" fill="#b08c68"/>
  <rect x="240" y="90" width="130" height="170" rx="6" fill="#6b5642"/>
  <rect x="250" y="100" width="110" height="150" fill="url(#dusk)"/>
  <circle cx="330" cy="130" r="10" fill="#f4ecd0" opacity="0.9"/>
  <rect x="303" y="100" width="4" height="150" fill="#6b5642"/>
  <rect x="250" y="173" width="110" height="4" fill="#6b5642"/>
  <path d="M240,90 q-18,90 10,170 l14,0 q-24,-80 -8,-170 z" fill="#9c6b4f" opacity="0.9"/>
  <path d="M370,90 q18,90 -10,170 l-14,0 q24,-80 8,-170 z" fill="#9c6b4f" opacity="0.9"/>
  <circle cx="70" cy="150" r="70" fill="url(#lamp-glow)"/>
  <path d="M55,140 L85,140 L92,168 L48,168 Z" fill="#e8c37a"/>
  <line x1="70" y1="168" x2="70" y2="210" stroke="#6b5642" stroke-width="3"/>
  <g>
    <path d="M60,600 Q40,520 65,470 Q90,520 70,600 Z" fill="#5c8a52"/>
    <path d="M75,600 Q95,540 78,490 Q108,540 92,600 Z" fill="#4d7a45"/>
    <rect x="50" y="595" width="45" height="30" rx="4" fill="#a15c3f"/>
  </g>
`);

const cafe = WRAP(`
  <defs>
    <linearGradient id="cafe-wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#caa07a"/>
      <stop offset="100%" stop-color="#a97b56"/>
    </linearGradient>
    <radialGradient id="pendant-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffe3a3" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#ffe3a3" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="700" fill="url(#cafe-wall)"/>
  <rect y="80" width="400" height="70" fill="#8a5c3c" opacity="0.5"/>
  <g fill="#6b4328" opacity="0.8">
    <circle cx="70" cy="115" r="9"/>
    <circle cx="105" cy="115" r="9"/>
    <circle cx="300" cy="115" r="9"/>
    <circle cx="335" cy="115" r="9"/>
  </g>
  <g>
    <line x1="90" y1="0" x2="90" y2="120" stroke="#4a3020" stroke-width="3"/>
    <circle cx="90" cy="150" r="60" fill="url(#pendant-glow)"/>
    <path d="M65,120 L115,120 L108,150 L72,150 Z" fill="#4a3020"/>
  </g>
  <g>
    <line x1="230" y1="0" x2="230" y2="160" stroke="#4a3020" stroke-width="3"/>
    <circle cx="230" cy="190" r="60" fill="url(#pendant-glow)"/>
    <path d="M205,160 L255,160 L248,190 L212,190 Z" fill="#4a3020"/>
  </g>
  <rect y="500" width="400" height="200" fill="#6b4328"/>
  <rect y="500" width="400" height="18" fill="#3f2a18"/>
  <rect x="40" y="440" width="90" height="65" rx="4" fill="#8a5c3c"/>
  <rect x="270" y="440" width="90" height="65" rx="4" fill="#8a5c3c"/>
`);

const fireside = WRAP(`
  <defs>
    <linearGradient id="dark-room" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#171225"/>
      <stop offset="100%" stop-color="#2a2036"/>
    </linearGradient>
    <radialGradient id="fire-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffb457" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#ff8a3d" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ff8a3d" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="flame" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#ffcf6b"/>
      <stop offset="100%" stop-color="#ff6b3d"/>
    </linearGradient>
  </defs>
  <rect width="400" height="700" fill="url(#dark-room)"/>
  <circle cx="200" cy="470" r="260" fill="url(#fire-glow)"/>
  <rect x="110" y="330" width="180" height="240" rx="10" fill="#4a3f3f"/>
  <rect x="130" y="350" width="140" height="200" rx="6" fill="#241d1d"/>
  <path d="M150,545 Q160,470 185,500 Q200,440 215,500 Q235,465 250,545 Z" fill="url(#flame)"/>
  <rect x="120" y="560" width="160" height="14" fill="#5a4a3a"/>
  <rect y="600" width="400" height="100" fill="#2a2230"/>
`);

const water = WRAP(`
  <defs>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8fe3e0"/>
      <stop offset="35%" stop-color="#3fb6c9"/>
      <stop offset="75%" stop-color="#1c7fa3"/>
      <stop offset="100%" stop-color="#0d4f6e"/>
    </linearGradient>
    <linearGradient id="sunray" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="400" height="700" fill="url(#sea)"/>
  <g fill="url(#sunray)">
    <polygon points="60,0 140,0 90,700 40,700"/>
    <polygon points="220,0 300,0 330,700 260,700"/>
  </g>
  <g fill="#ffffff">
    <circle cx="90" cy="560" r="5" opacity="0.6"/>
    <circle cx="100" cy="500" r="3.5" opacity="0.5"/>
    <circle cx="80" cy="430" r="4" opacity="0.45"/>
    <circle cx="95" cy="360" r="3" opacity="0.4"/>
    <circle cx="300" cy="600" r="6" opacity="0.55"/>
    <circle cx="310" cy="530" r="4" opacity="0.45"/>
    <circle cx="295" cy="460" r="3.5" opacity="0.4"/>
    <circle cx="200" cy="620" r="4.5" opacity="0.5"/>
    <circle cx="205" cy="550" r="3" opacity="0.4"/>
  </g>
  <g fill="#ffd25a" opacity="0.85">
    <path d="M250,300 q20,-14 34,0 q-14,10 -34,0 z"/>
    <path d="M284,300 l10,-8 l0,16 z"/>
  </g>
  <g fill="#ff8f6b" opacity="0.8">
    <path d="M130,230 q16,-11 28,0 q-12,8 -28,0 z"/>
    <path d="M158,230 l8,-7 l0,14 z"/>
  </g>
  <path d="M0,630 Q100,600 200,625 T400,610 V700 H0 Z" fill="#e0c88a"/>
  <path d="M0,650 Q120,630 220,648 T400,640 V700 H0 Z" fill="#d1b877"/>
  <g fill="none" stroke="#3f8f4f" stroke-width="8" stroke-linecap="round">
    <path d="M70,650 Q60,600 75,560 Q88,520 72,480"/>
    <path d="M95,650 Q108,610 92,575 Q80,540 100,505"/>
  </g>
  <g fill="#e8613f">
    <ellipse cx="300" cy="640" rx="22" ry="14"/>
    <circle cx="286" cy="628" r="4"/>
    <circle cx="314" cy="628" r="4"/>
  </g>
  <g stroke="#e8613f" stroke-width="4" stroke-linecap="round">
    <path d="M280,636 l-14,-6 M280,644 l-16,2 M320,636 l14,-6 M320,644 l16,2"/>
    <path d="M292,626 l-6,-10 M308,626 l6,-10"/>
  </g>
`);

const neutral = WRAP(`
  <defs>
    <linearGradient id="neutral-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3d3552"/>
      <stop offset="100%" stop-color="#584d6e"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="42%" r="65%">
      <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.35"/>
    </radialGradient>
  </defs>
  <rect width="400" height="700" fill="url(#neutral-bg)"/>
  <rect width="400" height="700" fill="url(#vignette)"/>
`);

const club = WRAP(`
  <defs>
    <radialGradient id="club-glow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#3a2050" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0d0714" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="beam-pink" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff4fd8" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#ff4fd8" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="beam-cyan" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4fe9ff" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#4fe9ff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="beam-purple" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a34fff" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#a34fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="400" height="700" fill="#0d0714"/>
  <rect width="400" height="700" fill="url(#club-glow)"/>
  <g>
    <polygon points="60,0 140,0 40,700 -60,700" fill="url(#beam-pink)"/>
    <polygon points="180,0 240,0 260,700 160,700" fill="url(#beam-cyan)"/>
    <polygon points="300,0 380,0 460,700 340,700" fill="url(#beam-purple)"/>
  </g>
  <circle cx="200" cy="60" r="26" fill="#cfd8e6"/>
  <g stroke="#8892a6" stroke-width="1" opacity="0.6">
    <line x1="176" y1="46" x2="224" y2="74"/>
    <line x1="176" y1="74" x2="224" y2="46"/>
    <line x1="200" y1="34" x2="200" y2="86"/>
  </g>
  <g fill="#ffffff" opacity="0.85">
    <circle cx="90" cy="500" r="3"/>
    <circle cx="120" cy="540" r="2.5"/>
    <circle cx="300" cy="520" r="3"/>
    <circle cx="270" cy="480" r="2"/>
    <circle cx="200" cy="560" r="2.5"/>
  </g>
  <rect y="600" width="400" height="100" fill="#150c22"/>
  <g fill="#3a2255">
    <rect x="20" y="560" width="50" height="140"/>
    <rect x="330" y="560" width="50" height="140"/>
  </g>
`);

const cinema = WRAP(`
  <defs>
    <linearGradient id="cinema-room" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a1420"/>
      <stop offset="100%" stop-color="#0c0910"/>
    </linearGradient>
    <radialGradient id="screen-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#bfe6ff" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#bfe6ff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="700" fill="url(#cinema-room)"/>
  <circle cx="200" cy="150" r="220" fill="url(#screen-glow)"/>
  <rect x="60" y="60" width="280" height="160" rx="4" fill="#eaf6ff"/>
  <rect x="60" y="60" width="280" height="160" rx="4" fill="#89c8e8" opacity="0.35"/>
  <rect x="50" y="215" width="300" height="10" fill="#2a2230"/>
  <g fill="#241c2c">
    <path d="M20,360 L380,360 L400,430 L0,430 Z"/>
    <path d="M10,440 L390,440 L410,520 L-10,520 Z"/>
    <path d="M-5,530 L405,530 L430,620 L-30,620 Z"/>
  </g>
  <g fill="#3a2f45">
    <rect x="20" y="350" width="18" height="24" rx="3"/>
    <rect x="60" y="350" width="18" height="24" rx="3"/>
    <rect x="322" y="350" width="18" height="24" rx="3"/>
    <rect x="362" y="350" width="18" height="24" rx="3"/>
    <rect x="10" y="430" width="20" height="26" rx="3"/>
    <rect x="370" y="430" width="20" height="26" rx="3"/>
    <rect x="0" y="520" width="22" height="28" rx="3"/>
    <rect x="378" y="520" width="22" height="28" rx="3"/>
  </g>
  <rect y="640" width="400" height="60" fill="#100a14"/>
`);

const cabin = WRAP(`
  <defs>
    <linearGradient id="cabin-wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8a6a4a"/>
      <stop offset="100%" stop-color="#6b4f36"/>
    </linearGradient>
    <linearGradient id="cabin-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#bfe0e8"/>
      <stop offset="100%" stop-color="#e8dfc0"/>
    </linearGradient>
  </defs>
  <rect width="400" height="700" fill="url(#cabin-wall)"/>
  <g opacity="0.5" stroke="#5a4230" stroke-width="2">
    <line x1="0" y1="120" x2="400" y2="120"/>
    <line x1="0" y1="240" x2="400" y2="240"/>
    <line x1="0" y1="360" x2="400" y2="360"/>
  </g>
  <rect x="130" y="80" width="140" height="170" rx="70" fill="#3a2a1c"/>
  <rect x="140" y="90" width="120" height="150" rx="60" fill="url(#cabin-sky)"/>
  <path d="M140,190 Q200,150 260,190 L260,240 L140,240 Z" fill="#7fae5e" opacity="0.9"/>
  <path d="M150,240 Q160,200 175,240 Z" fill="#4f7a3c"/>
  <path d="M225,240 Q245,195 265,240 Z" fill="#4f7a3c"/>
  <circle cx="235" cy="120" r="18" fill="#fff6c9" opacity="0.9"/>
  <line x1="200" y1="90" x2="200" y2="240" stroke="#3a2a1c" stroke-width="3"/>
  <rect y="600" width="400" height="100" fill="#4a3624"/>
  <rect x="40" y="560" width="90" height="50" rx="6" fill="#c9a877"/>
  <rect x="40" y="560" width="90" height="10" rx="4" fill="#e9d3a8"/>
  <path d="M300,600 Q280,520 305,470 Q330,520 310,600 Z" fill="#5c8a52"/>
  <rect x="285" y="595" width="40" height="26" rx="4" fill="#a15c3f"/>
  <g fill="#ffe9a8">
    <circle cx="60" cy="140" r="3"/>
    <circle cx="90" cy="120" r="3"/>
    <circle cx="120" cy="150" r="3"/>
    <circle cx="300" cy="130" r="3"/>
    <circle cx="330" cy="150" r="3"/>
  </g>
`);

const boat = WRAP(`
  <defs>
    <linearGradient id="boat-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7fc4e8"/>
      <stop offset="60%" stop-color="#bfe6d8"/>
      <stop offset="100%" stop-color="#3a7ca5"/>
    </linearGradient>
  </defs>
  <rect width="400" height="700" fill="url(#boat-sky)"/>
  <circle cx="320" cy="110" r="40" fill="#fff6c9" opacity="0.9"/>
  <path d="M0,330 L60,300 L140,320 L220,290 L300,315 L400,295 L400,400 L0,400 Z" fill="#5c7a8c" opacity="0.55"/>
  <g fill="#3a5a3c" opacity="0.7">
    <path d="M20,340 L70,300 L120,340 Z"/>
    <path d="M260,335 L320,290 L380,335 Z"/>
  </g>
  <rect y="400" width="400" height="300" fill="#2f7ba0"/>
  <g stroke="#5aa3c4" stroke-width="4" opacity="0.5" fill="none">
    <path d="M0,440 Q50,430 100,440 T200,440 T300,440 T400,440"/>
    <path d="M0,500 Q50,490 100,500 T200,500 T300,500 T400,500"/>
    <path d="M0,560 Q50,550 100,560 T200,560 T300,560 T400,560"/>
  </g>
  <path d="M60,620 Q200,570 340,620 L320,660 Q200,630 80,660 Z" fill="#8a5c3c"/>
  <line x1="75" y1="620" x2="75" y2="660" stroke="#6b4328" stroke-width="4"/>
  <line x1="325" y1="620" x2="325" y2="660" stroke="#6b4328" stroke-width="4"/>
  <line x1="200" y1="500" x2="200" y2="620" stroke="#6b4328" stroke-width="5"/>
  <path d="M200,500 L260,610 L200,610 Z" fill="#f5efe0" opacity="0.9"/>
`);

export const BACKGROUNDS = { outdoor, home, cafe, fireside, neutral, water, club, cinema, cabin, boat };

export function getBackground(key) {
  return BACKGROUNDS[key] ?? BACKGROUNDS.neutral;
}
