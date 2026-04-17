"use client";

import { useEffect, useRef, useState } from "react";
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
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !noMotion);
  }, []);

  // Cache rect on pointer enter; recompute only when pointer enters again.
  // Throttle pointer moves through rAF to prevent reading/writing every pixel.
  const rectRef = useRef<{ cx: number; cy: number } | null>(null);
  const rafRef = useRef(0);
  const pendingRef = useRef<{ clientX: number; clientY: number } | null>(null);

  const flush = () => {
    rafRef.current = 0;
    const pending = pendingRef.current;
    const rect = rectRef.current;
    if (!pending || !rect) return;
    x.set((pending.clientX - rect.cx) * strength);
    y.set((pending.clientY - rect.cy) * strength);
  };

  const onMouseEnter = () => {
    const inner = innerRef.current;
    if (!inner) return;
    const r = inner.getBoundingClientRect();
    rectRef.current = { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    pendingRef.current = { clientX: e.clientX, clientY: e.clientY };
    if (!rectRef.current) onMouseEnter();
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(flush);
  };

  const onMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    pendingRef.current = null;
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  if (!enabled) {
    return <span style={{ display: "inline-block" }}>{children}</span>;
  }

  return (
    // Outer hit area extends `padding` px beyond the button on all sides
    <div
      style={{ padding, margin: -padding, display: "inline-block" }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div ref={innerRef} style={{ x: sx, y: sy }}>
        {children}
      </motion.div>
    </div>
  );
}
