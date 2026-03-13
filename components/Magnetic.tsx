"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  children: React.ReactNode;
  strength?: number;
  // How far (px) outside the element the field extends
  padding?: number;
}

export default function Magnetic({ children, strength = 0.28, padding = 28 }: Props) {
  const innerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 12 });
  const sy = useSpring(y, { stiffness: 160, damping: 12 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = innerRef.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    // Outer hit area extends `padding` px beyond the button on all sides
    <div
      style={{ padding, margin: -padding, display: "inline-block" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div ref={innerRef} style={{ x: sx, y: sy }}>
        {children}
      </motion.div>
    </div>
  );
}
