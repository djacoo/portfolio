"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import SectionHeader from "./SectionHeader";

const THEME = {
  "In Progress": {
    accent:   "rgba(167,139,250,0.85)",
    gradient: "linear-gradient(135deg, rgba(167,139,250,1), rgba(120,180,255,1))",
    bar:      "linear-gradient(180deg, rgba(167,139,250,0.9), rgba(96,165,250,0.5))",
    pattern:  `linear-gradient(rgba(167,139,250,0.07) 1px, transparent 1px),
               linear-gradient(90deg, rgba(167,139,250,0.07) 1px, transparent 1px)`,
    patternSize: "28px 28px",
    mark:     "AI",
  },
  Completed: {
    accent:   "rgba(96,165,250,0.85)",
    gradient: "linear-gradient(135deg, rgba(120,190,255,1), rgba(80,230,180,1))",
    bar:      "linear-gradient(180deg, rgba(96,165,250,0.9), rgba(52,211,153,0.5))",
    pattern:  `radial-gradient(circle, rgba(96,165,250,0.14) 1.5px, transparent 1.5px)`,
    patternSize: "22px 22px",
    mark:     "99",
  },
};

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          label="Academic background"
          title="Education"
          subtitle="Where I built the theoretical foundations that drive my work."
        />

        <div className="space-y-5">
          {education.map((item, i) => {
            const t = THEME[item.status];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
                className="glass-panel rounded-3xl overflow-hidden glass-lift"
              >
                <div className="flex flex-col sm:flex-row">

                  {/* ── Left panel ────────────────────────────── */}
                  <div
                    className="relative sm:w-52 shrink-0 flex flex-col items-center justify-center gap-1 py-10 px-6 overflow-hidden"
                    style={{ borderBottom: "0.5px solid var(--divider)" }}
                  >
                    {/* Accent bar — left edge on desktop, top edge on mobile */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] hidden sm:block"
                      style={{ background: t.bar }}
                    />
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px] sm:hidden"
                      style={{ background: t.bar }}
                    />

                    {/* Background geometric pattern */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ backgroundImage: t.pattern, backgroundSize: t.patternSize }}
                    />

                    {/* Hero mark — grade or "AI" */}
                    <p
                      className="relative font-mono text-5xl font-bold leading-none tracking-tight"
                      style={{ background: t.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    >
                      {t.mark}
                    </p>

                    {/* Subscript */}
                    {item.status === "Completed" && "grade" in item ? (
                      <p className="relative font-mono text-xs" style={{ color: "var(--fg-4)" }}>
                        / 110 final grade
                      </p>
                    ) : (
                      <p className="relative font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--fg-4)" }}>
                        In Progress
                      </p>
                    )}

                    {/* Period */}
                    <p
                      className="relative font-mono text-[10px] tracking-wider mt-3"
                      style={{ color: "var(--fg-4)" }}
                    >
                      {item.period}
                    </p>
                  </div>

                  {/* ── Right panel ───────────────────────────── */}
                  <div
                    className="flex flex-col flex-1 p-7 gap-4"
                    style={{ borderLeft: "0.5px solid var(--divider)" }}
                  >
                    {/* Degree + institution */}
                    <div>
                      <h3 className="text-xl font-bold leading-snug" style={{ color: "var(--fg-1)" }}>
                        {item.degree}
                      </h3>
                      <p className="mt-1 text-sm" style={{ color: t.accent }}>
                        {item.institution} · {item.location}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed" style={{ color: "var(--fg-2)" }}>
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="mt-auto flex flex-wrap gap-2">
                      {item.highlights.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg px-2.5 py-1 font-mono text-xs transition-colors duration-200"
                          style={{
                            color: "var(--fg-3)",
                            border: `0.5px solid var(--divider)`,
                            background: `${t.accent}08`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
