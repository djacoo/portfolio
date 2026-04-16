"use client";

/**
 * Static grain overlay.
 * - No animation, no blend mode, no filter.
 * - Tiled SVG noise via backgroundImage (GPU-cached as a single texture).
 * - `contain: strict` prevents any layout/paint bleed from this layer.
 * - No willChange / no translateZ: this element never changes, so forcing
 *   it onto its own compositor layer just wastes video memory.
 */
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9997,
        opacity: 0.035,
        backgroundImage: GRAIN,
        backgroundRepeat: "repeat",
        contain: "strict",
      }}
    />
  );
}
