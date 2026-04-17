"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/data";
import { Reveal, RevealWords } from "@/components/ScrollReveal";

const SCRIBBLE_A = "M 60,80 C 240,260 80,440 220,580 C 360,720 120,820 280,880";
const SCRIBBLE_B = "M 1180,60 Q 1320,240 1200,420 T 1320,820";
const PATH_CURVE = "M 50 0 C 80 15, 20 35, 50 50 S 80 85, 50 100";

const typeLabel: Record<string, string> = {
  work:      "Work",
  education: "Study",
  personal:  "Side",
};

const typeGloss: Record<string, string> = {
  work:      "Employment, retail, applied analytics.",
  education: "University coursework and degrees.",
  personal:  "Open-source and side projects.",
};

const periodGroups = [
  { label: "MMXXV — Present", caption: "Current chapter" },
  { label: "MMXXII – MMXXV",  caption: "Bridge years" },
  { label: "MMXXI – MMXXIV",  caption: "Foundation" },
];

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="section section--cream relative overflow-hidden"
    >
      {/* Scribble */}
      <svg className="scribble-layer" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d={SCRIBBLE_A}
          className="scribble"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 3.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={SCRIBBLE_B}
          className="scribble"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 3.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <span
        style={{
          top: "12%",
          left: "-2vw",
          fontSize: "clamp(12rem, 30vw, 26rem)",
        }}
        className="ghost"
        aria-hidden="true"
      >
        Path
      </span>

      {/* Vertical rail */}
      <div className="hidden lg:block absolute right-4 top-[14%] z-10">
        <span className="side-rail-v">Chapter V · Path So Far</span>
      </div>

      <div className="w-full px-6 sm:px-10 lg:px-14 relative z-10">

        {/* Header */}
        <div className="mb-16 sm:mb-20">
          <Reveal>
            <div className="flex items-baseline gap-3">
              <span className="section-marker" style={{ fontSize: 22 }}>(V)</span>
              <span className="eyebrow-micro">Chapter 05 · Timeline</span>
            </div>
          </Reveal>
          <Reveal delay={80} className="mt-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-7" style={{ background: "var(--amber-line)" }} />
              <span className="eyebrow">The path so far</span>
            </div>
          </Reveal>
          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <RevealWords text="Across" as="h2" italic delay={140} className="display display-lg" />
              <RevealWords text="five years." as="h2" italic delay={320} className="display display-md" />
            </div>
            <Reveal delay={500} className="max-w-md">
              <p className="footnote" style={{ color: "var(--fg-2)" }}>
                Overlapping rather than sequential — university, work, and independent projects running together since 2021.
              </p>
              <p className="eyebrow-micro mt-3" style={{ color: "var(--amber)" }}>
                {timeline.length} Entries · MMXXI–Present
              </p>
            </Reveal>
          </div>
        </div>

        {/* Period grouping strip */}
        <Reveal delay={120} className="mb-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {periodGroups.map((g) => (
            <div
              key={g.label}
              className="flex flex-col gap-1 pt-4"
              style={{ borderTop: "0.5px solid var(--divider)" }}
            >
              <span className="eyebrow-micro" style={{ color: "var(--amber)" }}>{g.label}</span>
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "var(--fg-2)",
                  fontFeatureSettings: '"swsh","salt","ss01"',
                }}
              >
                {g.caption}
              </span>
            </div>
          ))}
        </Reveal>

        {/* Timeline body — 3 columns: left rail · path · rows */}
        <div className="relative grid grid-cols-12 gap-6">

          {/* Left margin — year monuments */}
          <div className="hidden md:flex md:col-span-2 flex-col gap-16 pt-4">
            {["MMXXV", "MMXXIII", "MMXXII", "MMXXI"].map((yr, yi) => (
              <div key={yr} className="flex flex-col items-start">
                <span className="eyebrow-micro">{String(yi + 1).padStart(2, "0")}</span>
                <span
                  className="num-monument mt-2"
                  style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)" }}
                >
                  {yr}
                </span>
              </div>
            ))}
          </div>

          {/* Path + events */}
          <div className="col-span-12 md:col-span-10 relative">
            <svg
              className="absolute left-4 top-0 pointer-events-none"
              style={{ width: 2, height: "100%", overflow: "visible" }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <motion.path
                d={PATH_CURVE}
                fill="none"
                stroke="var(--amber-line)"
                strokeWidth="8"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="relative flex items-start gap-6 pl-12 pr-0">
                    {/* Dot + index */}
                    <div className="absolute left-0 mt-2 flex flex-col items-center gap-1 z-10">
                      <span
                        className="block w-2 h-2 rounded-full"
                        style={{
                          background: "var(--amber)",
                          boxShadow: "0 0 0 4px var(--cream), 0 0 0 5px var(--amber-line)",
                        }}
                      />
                      <span className="eyebrow-micro" style={{ fontSize: 8, color: "var(--amber)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div
                      className="flex-1 grid grid-cols-12 gap-4 py-4"
                      style={{ borderTop: "0.5px solid var(--divider)" }}
                    >
                      <div className="col-span-12 md:col-span-3">
                        <span className="eyebrow" style={{ fontSize: 10, color: "var(--amber)" }}>
                          {item.period}
                        </span>
                        <p className="eyebrow-micro mt-2">
                          {typeLabel[item.type]}
                        </p>
                        <p
                          className="mt-1"
                          style={{
                            fontFamily: "var(--font-cormorant)",
                            fontStyle: "italic",
                            fontSize: 13,
                            color: "var(--fg-3)",
                            lineHeight: 1.4,
                            fontFeatureSettings: '"swsh","salt","ss01"',
                          }}
                        >
                          {typeGloss[item.type]}
                        </p>
                      </div>

                      <div className="col-span-12 md:col-span-9">
                        <h3
                          style={{
                            fontFamily: "var(--font-cormorant)",
                            fontStyle: "italic",
                            fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
                            lineHeight: 1.1,
                            color: "var(--fg-1)",
                            letterSpacing: "-0.012em",
                            fontFeatureSettings: '"liga","dlig","swsh","salt","ss01","kern"',
                          }}
                        >
                          {item.role}
                        </h3>
                        <p
                          className="mt-1"
                          style={{
                            fontFamily: "var(--font-cormorant)",
                            fontSize: 16,
                            color: "var(--fg-3)",
                          }}
                        >
                          {item.organization}
                        </p>
                        {item.description && (
                          <p className="mt-3 text-[12.5px] leading-[1.85] max-w-[56ch]" style={{ color: "var(--fg-2)" }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div className="mt-20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "0.5px solid var(--divider)" }}
        >
          <span className="eyebrow-micro">End of Chapter V</span>
          <span className="eyebrow-micro" style={{ color: "var(--amber)" }}>
            Chapter VI — Degrees follows
          </span>
        </div>
      </div>
    </section>
  );
}
