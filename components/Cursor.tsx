"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      setHovered(!!(e.target as Element).closest("a, button, [data-hover]"));
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  return (
    <motion.div
      className="cursor-dot"
      style={{ x, y }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: hovered ? 1.6 : 1,
        boxShadow: hovered
          ? "0 0 18px 7px rgba(160,120,255,0.85)"
          : "0 0 8px 3px rgba(160,120,255,0.45)",
      }}
      transition={{ duration: 0.18 }}
    />
  );
}
