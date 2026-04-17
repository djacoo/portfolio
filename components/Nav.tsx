"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { personal } from "@/lib/data";

const MOBILE_MENU_ID = "primary-mobile-menu";

const links = [
  { label: "Work",    href: "#projects",  id: "projects", n: "01" },
  { label: "Story",   href: "#about",     id: "about",    n: "02" },
  { label: "Stack",   href: "#stack",     id: "stack",    n: "03" },
  { label: "Path",    href: "#timeline",  id: "timeline", n: "04" },
  { label: "Contact", href: "#contact",   id: "contact",  n: "05" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    let lastActive = -1;
    // Cache absolute tops so scroll updates don't trigger layout every frame.
    let tops: number[] = [];

    const measure = () => {
      const y = window.scrollY;
      tops = links.map((l) => {
        const el = document.getElementById(l.id);
        return el ? el.getBoundingClientRect().top + y : Number.POSITIVE_INFINITY;
      });
    };

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const nextScrolled = y > 40;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }

      const mid = y + window.innerHeight * 0.42;
      let found = -1;
      for (let i = 0; i < tops.length; i++) {
        if (tops[i] <= mid) found = i;
      }
      if (found !== lastActive) {
        lastActive = found;
        setActive(found);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    // Initial measurement after layout settles (fonts/images may shift it).
    measure();
    update();
    const settle = window.setTimeout(measure, 400);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", measure, { passive: true, once: true });
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", measure);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const go = (href: string, idx: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setActive(idx);
    setOpen(false);
    const id = href.slice(1);
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(id === "hero" ? 0 : `#${id}`, { offset: -48, duration: 1.1 });
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.header
        ref={barRef}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`nav-bar ${scrolled ? "scrolled" : ""}`}
        style={{ paddingBlock: scrolled ? "0.85rem" : "1.25rem" }}
      >
        <div className="w-full px-6 sm:px-10 lg:px-14 flex items-center justify-between gap-6">
          {/* Wordmark — stacked serif name + tagline */}
          <a
            href="#hero"
            onClick={go("#hero", -1)}
            className="flex items-start gap-3 shrink-0"
            style={{ textDecoration: "none" }}
          >
            <div className="flex flex-col leading-none">
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "1.22rem",
                  letterSpacing: "-0.012em",
                  color: "var(--fg-1)",
                  lineHeight: 1.02,
                  fontFeatureSettings: '"liga","dlig","swsh","salt","ss01","kern"',
                }}
              >
                Jacopo
              </span>
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "1.22rem",
                  letterSpacing: "-0.012em",
                  color: "var(--fg-1)",
                  lineHeight: 1.02,
                  fontFeatureSettings: '"liga","dlig","swsh","salt","ss01","kern"',
                }}
              >
                Parretti
              </span>
            </div>
            <span
              className="hidden sm:inline-block font-mono mt-[3px]"
              style={{
                fontSize: "8.5px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--fg-4)",
                lineHeight: 1.1,
              }}
            >
              Portfolio<br />MMXXVI
            </span>
          </a>

          {/* Center pill-tab nav */}
          <nav className="hidden md:flex items-center">
            <div className="nav-pillset">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`nav-pill ${active === i ? "active" : ""}`}
                  onClick={go(l.href, i)}
                >
                  <span className="nav-numeral">{l.n}</span>
                  {l.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <span className="hidden lg:flex items-center gap-2">
              <span className="relative inline-flex">
                <span className="nav-status-ping" />
                <span className="nav-status-dot relative" />
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--fg-3)",
                }}
              >
                Available
              </span>
            </span>

            <span
              className="hidden lg:inline-block"
              style={{ width: "0.5px", height: "14px", background: "var(--divider)" }}
            />

            <a
              href={`mailto:${personal.email}`}
              className="hidden md:inline-flex items-baseline gap-1.5 editorial-link"
              style={{
                fontSize: "10.5px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--fg-1)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Get in Touch
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  color: "var(--amber)",
                  fontSize: "13px",
                  letterSpacing: 0,
                }}
              >
                ↗
              </span>
            </a>

            <button
              ref={toggleRef}
              onClick={() => setOpen(v => !v)}
              className="md:hidden theme-swatch flex items-center justify-center"
              style={{ width: 44, height: 44 }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={MOBILE_MENU_ID}
            >
              {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={MOBILE_MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Primary navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 md:hidden"
            style={{ background: "var(--bg-body)" }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={l.href}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={go(l.href, i)}
                className="flex items-baseline gap-3"
                style={{ textDecoration: "none", padding: "10px 14px" }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: "var(--amber)",
                  }}
                >
                  {l.n}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontSize: "clamp(2.4rem, 8vw, 3.6rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.018em",
                    color: "var(--fg-1)",
                    fontFeatureSettings: '"liga","dlig","swsh","salt","ss01","ss02","kern"',
                  }}
                >
                  {l.label}
                </span>
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${personal.email}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 font-mono text-[11px] tracking-[0.22em]"
              style={{ color: "var(--fg-3)" }}
            >
              {personal.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
