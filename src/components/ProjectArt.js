// Placeholder illustrations in the site palette. Swap for real screenshots
// (e.g. next/image) once you have them.

const OLIVE = "#7C8B68";
const DEEP = "#4B573C";
const INK = "#171717";
const PAPER = "#F8F7F3";
const SAND = "#E4E1D5";

const compositions = [
  // 0: circle and slab
  <g key="0">
    <rect width="400" height="300" fill={SAND} />
    <circle cx="150" cy="150" r="108" fill={OLIVE} />
    <rect x="215" y="52" width="125" height="196" fill={INK} />
    <circle cx="277" cy="110" r="26" fill={PAPER} />
  </g>,
  // 1: page wireframe
  <g key="1">
    <rect width="400" height="300" fill={OLIVE} />
    <rect x="55" y="45" width="290" height="210" fill={PAPER} />
    <rect x="85" y="78" width="150" height="16" fill={INK} />
    <rect x="85" y="110" width="210" height="8" fill={DEEP} opacity="0.55" />
    <rect x="85" y="130" width="175" height="8" fill={DEEP} opacity="0.55" />
    <circle cx="295" cy="200" r="30" fill={INK} />
  </g>,
  // 2: rising bars
  <g key="2">
    <rect width="400" height="300" fill={INK} />
    <rect x="60" y="190" width="42" height="60" fill={OLIVE} />
    <rect x="120" y="160" width="42" height="90" fill={OLIVE} />
    <rect x="180" y="125" width="42" height="125" fill={OLIVE} />
    <rect x="240" y="90" width="42" height="160" fill={PAPER} />
    <rect x="300" y="55" width="42" height="195" fill={OLIVE} />
  </g>,
  // 3: overlapping shapes
  <g key="3">
    <rect width="400" height="300" fill={SAND} />
    <circle cx="190" cy="150" r="88" fill={INK} />
    <rect x="190" y="70" width="140" height="160" fill={OLIVE} opacity="0.9" />
    <circle cx="120" cy="210" r="34" fill={DEEP} />
  </g>,
];

export default function ProjectArt({ variant = 0 }) {
  return (
    <svg
      className="art"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {compositions[variant % compositions.length]}
    </svg>
  );
}
