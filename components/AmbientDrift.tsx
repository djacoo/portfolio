"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function AmbientDrift() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 6000], [0, -900]);
  const y2 = useTransform(scrollY, [0, 6000], [0,  600]);
  const y3 = useTransform(scrollY, [0, 6000], [0, -400]);
  const yCurve = useTransform(scrollY, [0, 6000], [0, -250]);

  if (reduced) return null;

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
      <motion.div style={{ y: y1 }} className="drift-layer">
        <div className="drift-orb drift-orb-1" />
      </motion.div>

      <motion.div style={{ y: y2 }} className="drift-layer">
        <div className="drift-orb drift-orb-2" />
      </motion.div>

      <motion.div style={{ y: y3 }} className="drift-layer">
        <div className="drift-orb drift-orb-3" />
      </motion.div>

      <motion.div style={{ y: yCurve }} className="drift-layer">
        <svg
          className="drift-curve"
          viewBox="0 0 1600 1200"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            className="drift-stroke"
            d="M -120,260 C 380,80 820,520 1220,280 S 1780,80 2000,420"
          />
          <path
            className="drift-stroke drift-stroke--alt"
            d="M -80,840 C 360,1000 780,620 1180,820 S 1740,1040 1960,740"
          />
        </svg>
      </motion.div>
    </div>
  );
}
