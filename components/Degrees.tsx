"use client";

import { motion } from "framer-motion";
import { degrees } from "@/lib/data";
import SectionHeader from "./SectionHeader";

const ACCENT = {
  "In Progress": {
    bar:   "linear-gradient(90deg, rgba(167,139,250,0.9), rgba(96,165,250,0.6))",
    text:  "linear-gradient(90deg, rgba(192,168,255,1), rgba(120,180,255,1))",
    dot:   "rgba(167,139,250,0.9)",
    label: "rgba(167,139,250,0.7)",
  },
  Completed: {
    bar:   "linear-gradient(90deg, rgba(96,165,250,0.9), rgba(52,211,153,0.6))",
    text:  "linear-gradient(90deg, rgba(120,190,255,1), rgba(80,230,180,1))",
    dot:   "rgba(96,165,250,0.9)",
    label: "rgba(96,165,250,0.7)",
  },
};

export default function Degrees() {
  return (
    <section id="degrees" className="section">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          label="Credentials"
          title="Academic Degrees"
          subtitle="Formal qualifications from the University of Verona."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {degrees.map((degree, i) => {
            const acc = ACCENT[degree.status];
            const monogram = degree.status === "Completed" ? "B" : "M";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
                className="relative glass-panel rounded-3xl overflow-hidden glass-lift liquid-shimmer flex flex-col min-h-[500px]"
              >
                {/* Gradient accent bar */}
                <div className="h-[3px] w-full shrink-0" style={{ background: acc.bar }} />

                {/* Watermark monogram */}
                <div
                  className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
                  aria-hidden="true"
                >
                  <span
                    className="text-[220px] font-bold leading-none"
                    style={{ fontFamily: "var(--font-playfair)", color: "var(--fg-1)", opacity: 0.025 }}
                  >
                    {monogram}
                  </span>
                </div>

                {/* Card body */}
                <div className="relative flex flex-col flex-1 p-8 gap-0">

                  {/* Institution block */}
                  <div>
                    <p
                      className="font-mono text-[9px] tracking-[0.28em] uppercase mb-1"
                      style={{ color: acc.label }}
                    >
                      {degree.location}
                    </p>
                    <p
                      className="font-mono text-[11px] tracking-[0.15em] uppercase leading-snug"
                      style={{ color: "var(--fg-3)" }}
                    >
                      {degree.institution}
                    </p>
                  </div>

                  {/* Ornamental divider */}
                  <div className="flex items-center gap-3 my-7">
                    <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
                    <span style={{ color: acc.dot, fontSize: "8px", lineHeight: 1 }}>✦</span>
                    <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
                  </div>

                  {/* Degree name */}
                  <div className="flex-1">
                    <p
                      className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
                      style={{ color: "var(--fg-4)" }}
                    >
                      {degree.title}
                    </p>
                    <h3
                      className="text-4xl font-bold leading-[1.12]"
                      style={{ fontFamily: "var(--font-playfair)", color: "var(--fg-1)" }}
                    >
                      {degree.field}
                    </h3>
                  </div>

                  {/* Bottom row */}
                  <div
                    className="mt-auto pt-6 flex items-end justify-between gap-4"
                    style={{ borderTop: "0.5px solid var(--divider)" }}
                  >
                    <div>
                      <p
                        className="font-mono text-[9px] tracking-[0.22em] uppercase mb-1.5"
                        style={{ color: "var(--fg-4)" }}
                      >
                        Period
                      </p>
                      <p className="font-mono text-sm" style={{ color: "var(--fg-2)" }}>
                        {degree.period}
                      </p>
                    </div>

                    {"grade" in degree && degree.grade ? (
                      <div className="text-right">
                        <p
                          className="font-mono text-[9px] tracking-[0.22em] uppercase mb-1.5"
                          style={{ color: "var(--fg-4)" }}
                        >
                          Final Grade
                        </p>
                        <p
                          className="font-mono text-3xl font-bold"
                          style={{
                            background: acc.text,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {degree.grade}
                        </p>
                      </div>
                    ) : (
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-inset font-mono text-xs shrink-0"
                        style={{ color: "#FFBD2E" }}
                      >
                        <span className="text-[8px]">◌</span>
                        In Progress
                      </div>
                    )}
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
