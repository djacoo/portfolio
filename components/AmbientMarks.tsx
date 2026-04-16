"use client";

const SPARKS: { x: number; y: number; s: number; d: number }[] = [
  { x: 7,  y: 24, s: 2,   d: 0 },
  { x: 93, y: 16, s: 1.8, d: 1.1 },
  { x: 11, y: 72, s: 1.8, d: 2.2 },
  { x: 89, y: 62, s: 2,   d: 3.0 },
  { x: 52, y: 8,  s: 1.4, d: 3.8 },
  { x: 80, y: 34, s: 1.4, d: 4.6 },
];

export default function AmbientMarks() {
  return (
    <div
      aria-hidden="true"
      className="ambient-marks"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 30,
        contain: "strict",
      }}
    >
      {/* Subtle flourish curve, viewport-fixed */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.18 }}
      >
        <path
          d="M -40,720 C 260,540 520,820 780,620 S 1280,380 1460,660"
          fill="none"
          stroke="var(--amber)"
          strokeWidth="0.3"
          strokeLinecap="round"
        />
      </svg>

      {/* Constellation sparks */}
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="ambient-spark"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            animationDelay: `${s.d}s`,
          }}
        />
      ))}
    </div>
  );
}
