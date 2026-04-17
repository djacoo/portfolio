"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let lenis: Lenis | null = null;
    let raf = 0;

    if (!reduced && !coarse) {
      lenis = new Lenis({
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: false,
        lerp: 0.14,
      });
      window.__lenis = lenis;

      const tick = (time: number) => {
        lenis!.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    // Pause decorative infinite animations during active scroll. Browser can
    // use all frame budget on scroll + smoothing; resumes ~140ms after last
    // scroll event. Keeps visible-when-idle motion without stealing frames.
    const doc = document.documentElement;
    let idleTimer = 0;
    const onScroll = () => {
      if (!doc.classList.contains("is-scrolling")) {
        doc.classList.add("is-scrolling");
      }
      if (idleTimer) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        doc.classList.remove("is-scrolling");
      }, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      lenis?.destroy();
      delete window.__lenis;
      window.removeEventListener("scroll", onScroll);
      if (idleTimer) window.clearTimeout(idleTimer);
      doc.classList.remove("is-scrolling");
    };
  }, []);

  return <>{children}</>;
}
