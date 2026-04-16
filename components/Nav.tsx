"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Sun, Moon } from "lucide-react";
import { personal } from "@/lib/data";

const links = [
  { label: "About",    href: "#about",    id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Stack",    href: "#stack",    id: "stack" },
  { label: "Timeline", href: "#timeline", id: "timeline" },
  { label: "Contact",  href: "#contact",  id: "contact" },
];

const N = links.length;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState(-1);
  const [dark, setDark]         = useState(true);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") !== "light";
    setDark(isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      const mid = y + window.innerHeight * 0.45;
      let found = -1;
      links.forEach((link, i) => {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= mid) found = i;
      });
      setActive(found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-6"
      >
        <div
          className={`relative flex items-center gap-3 rounded-full px-4 py-2 transition-all duration-500 overflow-hidden ${
            scrolled ? "nav-metal" : "border border-transparent bg-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            className="relative z-10 font-mono text-xs tracking-widest uppercase transition-colors shrink-0 pr-1"
            style={{ color: "var(--fg-2)" }}
            onClick={() => setActive(-1)}
          >
            HERO
            <span style={{ color: "var(--fg-4)" }}>.</span>
          </a>

          {/* Glass radio nav — desktop */}
          <nav className="relative z-10 hidden md:block">
            <div className="glass-nav-group">
              {links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`glass-nav-item${active === i ? " active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  {link.label}
                </a>
              ))}
              {active >= 0 && (
                <div
                  className="glass-nav-glider"
                  style={{
                    width: `${100 / N}%`,
                    transform: `translateX(${active * 100}%)`,
                  }}
                />
              )}
            </div>
          </nav>

          {/* Hire me */}
          <a
            href={`mailto:${personal.email}`}
            className="relative z-10 hidden md:inline-flex items-center rounded-full px-4 py-1.5 text-xs shrink-0 ml-1 hire-btn"
          >
            Hire me
          </a>

          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            className="md:hidden transition-colors"
            style={{ color: dark ? "rgba(255,255,255,0.55)" : "rgba(18,12,40,0.6)" }}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden transition-colors"
            style={{ color: dark ? "rgba(255,255,255,0.75)" : "rgba(18,12,40,0.75)" }}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-black/95 backdrop-blur-xl md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { setOpen(false); setActive(i); }}
                className="text-2xl font-light transition-colors"
                style={{ fontFamily: "var(--font-playfair)", color: "rgba(255,255,255,0.82)" }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
