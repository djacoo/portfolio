"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; age: number };

// Shorter trail + fewer samples. Visually identical feather, half the stroke work.
const MAX_AGE = 36;
const MAX_POINTS = 80;
const SAMPLE_MIN_DIST = 1.2;
// Retina DPR=2 doubles fill cost for a 1px amber hairline no-one can tell
// apart from the DPR=1 version. Cap hard at 1 — single biggest cursor win.
const MAX_DPR = 1;

// Pre-baked alpha LUT keyed by integer age. Pow() per-point per-frame removed.
const LIFE_LUT: { a: number; w: number }[] = (() => {
  const out: { a: number; w: number }[] = [];
  for (let age = 0; age <= MAX_AGE; age++) {
    const life = 1 - age / MAX_AGE;
    // match the old curve: alpha = life^1.3 * 0.55, width = 0.4 + life * 0.8
    const a = Math.pow(Math.max(life, 0), 1.3) * 0.55;
    const w = 0.4 + Math.max(life, 0) * 0.8;
    out.push({ a, w });
  }
  return out;
})();

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current;
    const canvas = canvasRef.current;
    if (!dot || !canvas) return;

    let disposed = false;
    let innerCleanup: (() => void) | null = null;

    const install = (): (() => void) | null => {
      if (!dot || !canvas) return null;
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return null;

      let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();

      let resizeRaf = 0;
      const onResize = () => {
        if (resizeRaf) return;
        resizeRaf = requestAnimationFrame(() => {
          resizeRaf = 0;
          resize();
        });
      };
      window.addEventListener("resize", onResize, { passive: true });

      const points: Point[] = [];
      let targetX = -100, targetY = -100;
      let smoothX = -100, smoothY = -100;
      let initialized = false;

      let running = false;
      let clean = true;
      let raf = 0;

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

      const amber = "200,160,106";

      const tick = () => {
        const dx = targetX - smoothX;
        const dy = targetY - smoothY;
        smoothX += dx * 0.28;
        smoothY += dy * 0.28;
        dot.style.transform = `translate3d(${smoothX}px, ${smoothY}px, 0)`;

        const last = points[points.length - 1];
        if (!last) {
          points.push({ x: smoothX, y: smoothY, age: 0 });
        } else {
          // cheap squared-distance check (no sqrt)
          const ddx = smoothX - last.x;
          const ddy = smoothY - last.y;
          if (ddx * ddx + ddy * ddy > SAMPLE_MIN_DIST * SAMPLE_MIN_DIST) {
            points.push({ x: smoothX, y: smoothY, age: 0 });
            if (points.length > MAX_POINTS) points.shift();
          }
        }

        // age everything; drop at head, single pass.
        for (let i = 0; i < points.length; i++) points[i].age += 1;
        while (points.length && points[0].age > MAX_AGE) points.shift();

        ctx!.clearRect(0, 0, canvas.width, canvas.height);

        const n = points.length;
        if (n > 2) {
          ctx!.lineCap = "round";
          ctx!.lineJoin = "round";
          for (let i = 1; i < n - 1; i++) {
            const p1 = points[i];
            const age = p1.age;
            if (age >= MAX_AGE) continue;
            const lut = LIFE_LUT[age];
            const p0 = points[i - 1];
            const p2 = points[i + 1];
            const m1x = (p0.x + p1.x) * 0.5;
            const m1y = (p0.y + p1.y) * 0.5;
            const m2x = (p1.x + p2.x) * 0.5;
            const m2y = (p1.y + p2.y) * 0.5;
            ctx!.strokeStyle = `rgba(${amber},${lut.a})`;
            ctx!.lineWidth = lut.w;
            ctx!.beginPath();
            ctx!.moveTo(m1x, m1y);
            ctx!.quadraticCurveTo(p1.x, p1.y, m2x, m2y);
            ctx!.stroke();
          }
          clean = false;
        } else if (!clean) {
          clean = true;
        }

        const atRest = Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1;
        if (atRest && n === 0 && clean) {
          running = false;
          return;
        }
        raf = requestAnimationFrame(tick);
      };

      return () => {
        cancelAnimationFrame(raf);
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        running = false;
        window.removeEventListener("resize", onResize);
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
        document.removeEventListener("mouseleave", onLeave);
        document.removeEventListener("mouseenter", onEnter);
      };
    };

    const boot = () => {
      if (disposed) return;
      innerCleanup = install();
    };

    if (document.documentElement.dataset.loaded === "true") {
      boot();
      return () => {
        disposed = true;
        innerCleanup?.();
      };
    }

    const obs = new MutationObserver(() => {
      if (document.documentElement.dataset.loaded === "true") {
        obs.disconnect();
        boot();
      }
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-loaded"] });
    return () => {
      disposed = true;
      obs.disconnect();
      innerCleanup?.();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot hidden" aria-hidden="true" />
    </>
  );
}
