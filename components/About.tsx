"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personal, about } from "@/lib/data";
import { useCopy } from "@/lib/useCopy";
import Toast from "@/components/Toast";
import SectionHeader from "./SectionHeader";

// ── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const BASE_STATS = [
  { label: "Projects",     target: 6,  suffix: "",  accent: "rgba(167,139,250,0.95)" },
  { label: "Years coding", target: 4,  suffix: "+", accent: "rgba(96,165,250,0.95)"  },
  { label: "Degrees",      target: 2,  suffix: "",  accent: "rgba(52,211,153,0.95)"  },
];

const currently = [
  { role: "MSc Artificial Intelligence", org: "Università di Verona", color: "rgba(96,165,250,0.9)"  },
  { role: "Data Analyst",                org: "JD Sports & Fashion",  color: "rgba(52,211,153,0.9)"  },
  { role: "Open-Source Contributor",     org: "GitHub",               color: "rgba(167,139,250,0.9)" },
];

const info = [
  { label: "Based in", value: personal.location,  href: undefined,                        copy: false },
  { label: "GitHub",   value: "@djacoo",           href: personal.github,                  copy: false },
  { label: "Email",    value: personal.email,      href: `mailto:${personal.email}`,       copy: true,  copyText: personal.email    },
  { label: "Academic", value: personal.emailUni,   href: `mailto:${personal.emailUni}`,    copy: true,  copyText: personal.emailUni },
];

export default function About() {
  const { copied, copy } = useCopy();
  const [repoCount, setRepoCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/djacoo")
      .then(r => r.json())
      .then(d => { if (typeof d.public_repos === "number") setRepoCount(d.public_repos); })
      .catch(() => {});
  }, []);

  const stats = [
    ...BASE_STATS,
    ...(repoCount !== null
      ? [{ label: "Repos", target: repoCount, suffix: "", accent: "rgba(251,146,60,0.95)" }]
      : []),
  ];

  return (
    <section id="about" className="section">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader label="Who I am" title="About Me" />

        <div className="flex flex-col gap-4">

          {/* ── Lead paragraph ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-3xl overflow-hidden flex"
          >
            <div
              className="w-[3px] shrink-0"
              style={{ background: "linear-gradient(180deg, rgba(167,139,250,0.9), rgba(96,165,250,0.6))" }}
            />
            <div className="px-8 py-7">
              <p
                className="font-mono text-[9px] tracking-[0.28em] uppercase mb-4"
                style={{ color: "var(--fg-4)" }}
              >
                {personal.tagline}
              </p>
              <p
                className="text-lg leading-[1.8]"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--fg-1)" }}
              >
                {about.paragraphs[0]}
              </p>
            </div>
          </motion.div>

          {/* ── Two-column row ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_256px] gap-4">

            {/* Left — body + currently + interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="glass-panel rounded-3xl p-8 flex flex-col gap-6"
            >
              <div className="space-y-4">
                {about.paragraphs.slice(1).map((p, i) => (
                  <p key={i} className="text-sm leading-[1.85]" style={{ color: "var(--fg-2)" }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Currently */}
              <div className="pt-5" style={{ borderTop: "0.5px solid var(--divider)" }}>
                <p
                  className="font-mono text-[9px] tracking-[0.28em] uppercase mb-3"
                  style={{ color: "var(--fg-5)" }}
                >
                  Currently
                </p>
                <div className="space-y-2.5">
                  {currently.map((c) => (
                    <div key={c.role} className="flex items-center gap-2.5 min-w-0">
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span
                          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
                          style={{ background: c.color }}
                        />
                        <span
                          className="relative inline-flex rounded-full h-1.5 w-1.5"
                          style={{ background: c.color }}
                        />
                      </span>
                      <span className="text-xs font-medium" style={{ color: "var(--fg-2)" }}>
                        {c.role}
                      </span>
                      <span className="text-xs" style={{ color: "var(--fg-5)" }}>·</span>
                      <span className="text-xs truncate" style={{ color: "var(--fg-4)" }}>
                        {c.org}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="flex flex-wrap gap-2">
                {about.interests.map((tag) => (
                  <span
                    key={tag}
                    className="glass-inset rounded-full px-3.5 py-1 text-xs font-mono"
                    style={{ color: "var(--fg-3)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right sidebar */}
            <div className="flex flex-col gap-4">

              {/* Stats with animated counters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.14 }}
                className="glass-panel rounded-3xl overflow-hidden"
              >
                {stats.map(({ label, target, suffix, accent }, i) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-6 py-5"
                    style={{ borderBottom: i < stats.length - 1 ? "0.5px solid var(--divider)" : "none" }}
                  >
                    <span
                      className="font-mono text-[10px] tracking-wider uppercase"
                      style={{ color: "var(--fg-4)" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-3xl font-bold leading-none"
                      style={{ fontFamily: "var(--font-playfair)", color: accent }}
                    >
                      <Counter target={target} suffix={suffix} />
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Info rows */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.20 }}
                className="glass-panel rounded-3xl overflow-hidden"
              >
                {info.map(({ label, value, href, copy: isCopy, copyText }, i) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-5 py-3.5"
                    style={{ borderBottom: i < info.length - 1 ? "0.5px solid var(--divider)" : "none" }}
                  >
                    <span
                      className="font-mono text-[10px] tracking-wide shrink-0 w-16"
                      style={{ color: "var(--fg-4)" }}
                    >
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={isCopy ? undefined : href}
                        target={!isCopy && !href.startsWith("mailto") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        onClick={isCopy ? (e) => { e.preventDefault(); copy(copyText!); } : undefined}
                        className="text-xs text-right truncate transition-colors duration-200"
                        style={{
                          color: "var(--fg-accent)",
                          cursor: isCopy ? "copy" : "pointer",
                          textDecoration: "none",
                        }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-xs text-right truncate" style={{ color: "var(--fg-2)" }}>
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      <Toast message="Email copied to clipboard" visible={copied} />
    </section>
  );
}
