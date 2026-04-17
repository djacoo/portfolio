"use client";

import { useSyncExternalStore } from "react";

/**
 * Ambient orbs — CSS-keyframe drift only. Previous version wrapped
 * each layer in motion.div with scroll-linked y transforms. Combined
 * with infinite drift animations and 52-62vw layers that compounded
 * compositor work every scroll frame. Keyframe alone is enough motion.
 */

const subscribe = (cb: () => void) => {
  const mm1 = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mm2 = window.matchMedia("(max-width: 768px)");
  mm1.addEventListener("change", cb);
  mm2.addEventListener("change", cb);
  return () => {
    mm1.removeEventListener("change", cb);
    mm2.removeEventListener("change", cb);
  };
};

const getSnapshot = () =>
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !window.matchMedia("(max-width: 768px)").matches;

const getServerSnapshot = () => false;

export default function AmbientDrift() {
  const show = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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
