"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal dot cursor. The canvas trail was clearing + redrawing up to
 * 80 quadratic curves across the full viewport every animation frame —
 * the single biggest scroll+cursor lag source. Deleted.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current;
    if (!dot) return;

    let targetX = -100, targetY = -100;
    let smoothX = -100, smoothY = -100;
    let initialized = false;
    let running = false;
    let raf = 0;

    const tick = () => {
      const dx = targetX - smoothX;
      const dy = targetY - smoothY;
      smoothX += dx * 0.32;
      smoothY += dy * 0.32;
      dot.style.transform = `translate3d(${smoothX}px, ${smoothY}px, 0)`;
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      dot.classList.remove("hidden");
      targetX = e.clientX;
      targetY = e.clientY;
      if (!initialized) {
        smoothX = targetX;
        smoothY = targetY;
        initialized = true;
      }
      start();
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const hit = target?.closest("a, button, [data-hover], input, textarea");
      dot.classList.toggle("hovered", !!hit);
    };
    const onLeave = () => dot.classList.add("hidden");
    const onEnter = () => dot.classList.remove("hidden");

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot hidden" aria-hidden="true" />;
}
