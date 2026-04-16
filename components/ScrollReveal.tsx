"use client";

import { useEffect, useRef, ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────
   Shared IntersectionObserver — one instance drives every
   Reveal / RevealWords on the page. Each target registers a
   callback that fires once on first intersection, then detaches.
   This replaces 120+ per-instance observers with a single one.
   ───────────────────────────────────────────────────────────── */

type RevealHandler = (el: Element) => void;

let sharedObserver: IntersectionObserver | null = null;
const handlers = new WeakMap<Element, RevealHandler>();

function getObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const fn = handlers.get(entry.target);
        if (fn) {
          fn(entry.target);
          handlers.delete(entry.target);
          obs.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  return sharedObserver;
}

function observe(el: Element, fn: RevealHandler) {
  handlers.set(el, fn);
  getObserver().observe(el);
}

function unobserve(el: Element) {
  if (handlers.has(el)) {
    handlers.delete(el);
    sharedObserver?.unobserve(el);
  }
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/* Wraps content; fades + lifts in when visible. */
export function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    observe(el, (target) => (target as HTMLElement).classList.add("in"));
    return () => unobserve(el);
  }, [delay]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref as React.RefObject<HTMLElement>} className={`reveal-fade ${className}`}>
      {children}
    </Tag>
  );
}

interface RevealWordsProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  italic?: boolean;
}

/* Splits text by words and reveals each with a stagger. */
export function RevealWords({
  text,
  className = "",
  stagger = 80,
  delay = 0,
  as = "div",
  italic = false,
}: RevealWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observe(el, (target) => {
      const spans = (target as HTMLElement).querySelectorAll<HTMLSpanElement>(".reveal-word");
      spans.forEach((s, i) => {
        s.style.transitionDelay = `${delay + i * stagger}ms`;
        s.classList.add("in");
      });
    });
    return () => unobserve(el);
  }, [delay, stagger]);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={className}
      style={italic ? { fontStyle: "italic" } : undefined}
    >
      {words.map((w, i) => (
        <span key={i} className="reveal-line">
          <span className="reveal-word">
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
