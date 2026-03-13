"use client";

import { useEffect, useRef } from "react";

const TINTS: Record<string, string> = {
  hero:      "rgba(100,60,255,0.10)",
  about:     "rgba(80,40,220,0.08)",
  education: "rgba(40,100,240,0.08)",
  projects:  "rgba(0,180,220,0.09)",
  stack:     "rgba(0,160,200,0.09)",
  timeline:  "rgba(130,60,255,0.10)",
  degrees:   "rgba(180,50,220,0.09)",
  contact:   "rgba(0,200,240,0.08)",
};

const TINTS_LIGHT: Record<string, string> = {
  hero:      "rgba(120,80,255,0.10)",
  about:     "rgba(80,40,220,0.08)",
  education: "rgba(40,100,240,0.08)",
  projects:  "rgba(0,160,220,0.10)",
  stack:     "rgba(0,140,200,0.10)",
  timeline:  "rgba(130,60,255,0.10)",
  degrees:   "rgba(180,50,220,0.08)",
  contact:   "rgba(0,180,240,0.08)",
};

export default function BackgroundScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const tintRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const tint  = tintRef.current;
    if (!scene) return;

    // rAF-throttled scroll → CSS custom property --sy
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        scene.style.setProperty("--sy", String(window.scrollY));
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Section tinting
    const ids = Object.keys(TINTS);
    const els = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    let io: IntersectionObserver | null = null;
    if (tint && els.length) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              const isLight = document.documentElement.dataset.theme === "light";
              const map = isLight ? TINTS_LIGHT : TINTS;
              tint.style.backgroundColor = map[e.target.id] ?? map.hero;
            }
          }
        },
        { threshold: 0.35 }
      );
      els.forEach(el => io!.observe(el));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={sceneRef} className="bg-scene" aria-hidden="true">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className="blob b4" />
      <div className="blob b5" />
      <div className="iri-sweep" />
      <div ref={tintRef} className="section-tint" />
    </div>
  );
}
