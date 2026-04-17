"use client";

import { useEffect, useState } from "react";

/**
 * Ambient orbs — CSS-keyframe drift only. Previous version wrapped
 * each layer in motion.div with scroll-linked y transforms. Combined
 * with infinite drift animations and 52-62vw layers that compounded
 * compositor work every scroll frame. Keyframe alone is enough motion.
 */
export default function AmbientDrift() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="ambient-drift"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        overflow: "hidden",
        contain: "strict",
      }}
    >
      <div className="drift-orb drift-orb-1" />
      <div className="drift-orb drift-orb-2" />
    </div>
  );
}
