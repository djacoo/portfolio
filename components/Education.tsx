"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { Reveal, RevealWords } from "@/components/ScrollReveal";
import SectionCurve from "@/components/SectionCurve";

const SCRIBBLE_A = "M 80,120 C 260,280 40,440 180,560 C 320,680 80,780 220,860";
const SCRIBBLE_B = "M 1100,80 Q 1280,260 1160,420 T 1280,760";

const callouts = [
  { k: "Thesis (in progress)", v: "Adaptive inference routing for mixture-of-experts LLMs under tight latency budgets." },
  { k: "Research interests",   v: "Language models · efficient architectures · retrieval-augmented reasoning." },
  { k: "Supervisor",           v: "Department of Computer Science · Università di Verona." },
];

export default function Education() {
  return (
    <section
      id="education"
      className="section section--obsidian relative overflow-hidden"
    >
      <SectionCurve position="top" fill="cream" />

      <svg className="scribble-layer" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d={SCRIBBLE_A}
          className="scribble"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 3.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={SCRIBBLE_B}
          className="scribble"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 3.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <span
        style={{ top: "20%", right: "-4vw", fontSize: "clamp(12rem, 30vw, 26rem)" }}
        className="ghost"
        aria-hidden="true"
      >
        Origin
      </span>

      <div className="hidden lg:block absolute left-4 top-[14%] z-10">
        <span className="side-rail-v">Chapter IV · Education</span>
      </div>

      <div className="w-full px-6 sm:px-10 lg:px-14 relative z-10">

        <div className="mb-16 sm:mb-24">
          <Reveal>
            <div className="flex items-baseline gap-3">
              <span className="section-marker" style={{ fontSize: 22 }}>(IV)</span>
              <span className="eyebrow-micro">Chapter 04 · Education</span>
            </div>
          </Reveal>
          <Reveal delay={80} className="mt-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-7" style={{ background: "var(--amber-line)" }} />
              <span className="eyebrow">Academic background</span>
            </div>
          </Reveal>
          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <RevealWords text="Education" as="h2" italic delay={140} className="display display-lg" />
              <RevealWords text="at Verona." as="h2" italic delay={320} className="display display-md" />
            </div>
            <Reveal delay={500} className="max-w-md">
              <p className="footnote" style={{ color: "var(--fg-2)" }}>
                Two degrees at the same university, four years apart. Biology first, then AI.
              </p>
              <p className="eyebrow-micro mt-3" style={{ color: "var(--amber)" }}>
                {education.length} Degrees · Verona
              </p>
            </Reveal>
          </div>
        </div>

        {/* Callouts strip */}
        <Reveal delay={120} className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {callouts.map((c) => (
            <div
              key={c.k}
              className="p-6"
              style={{
                border: "0.5px solid var(--divider)",
                borderRadius: 2,
                background: "rgba(239,228,210,0.03)",
              }}
            >
              <p className="eyebrow-micro" style={{ color: "var(--amber)" }}>{c.k}</p>
              <p
                className="mt-2"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 17,
                  color: "var(--fg-1)",
                  lineHeight: 1.4,
                  letterSpacing: "-0.008em",
                  fontFeatureSettings: '"swsh","salt","ss01"',
                }}
              >
                {c.v}
              </p>
            </div>
          ))}
        </Reveal>

        <div className="space-y-12 sm:space-y-16">
          {education.map((item, i) => (
            <Reveal key={i} delay={i * 120}>
              <article
                style={{
                  border: "0.5px solid var(--divider)",
                  padding: "clamp(2.5rem, 5vw, 4rem)",
                  borderRadius: 2,
                  position: "relative",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <p className="eyebrow-micro">Entry 0{i + 1}</p>
                  <p className="eyebrow-micro" style={{ color: "var(--amber)" }}>{item.status}</p>
                </div>
                <div className="grid grid-cols-12 gap-6 items-start">
                  <div className="col-span-12 md:col-span-3">
                    <span className="eyebrow" style={{ fontSize: 10, color: "var(--amber)" }}>
                      {item.period}
                    </span>
                    {"grade" in item && item.grade ? (
                      <>
                        <p className="eyebrow-micro mt-4">Final mark</p>
                        <p
                          className="mt-2 num-monument"
                          style={{ fontSize: "clamp(4.5rem, 9vw, 8rem)" }}
                        >
                          {item.grade}
                        </p>
                      </>
                    ) : (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                                style={{ background: "var(--amber)" }} />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5"
                                style={{ background: "var(--amber)" }} />
                        </span>
                        <span className="eyebrow-micro" style={{ color: "var(--amber)" }}>
                          Ongoing enrolment
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-9">
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontStyle: "italic",
                        fontSize: "clamp(1.9rem, 4vw, 3.1rem)",
                        lineHeight: 1.05,
                        color: "var(--fg-1)",
                        letterSpacing: "-0.012em",
                        fontFeatureSettings: '"liga","dlig","swsh","salt","ss01","kern"',
                      }}
                    >
                      {item.degree}
                    </h3>
                    <p
                      className="mt-2"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: 19,
                        color: "var(--fg-3)",
                      }}
                    >
                      {item.institution} · {item.location}
                    </p>
                    <p className="mt-5 text-[13.5px] leading-[1.9] max-w-[62ch]" style={{ color: "var(--fg-2)" }}>
                      {item.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.highlights.map((tag) => (
                        <span key={tag} className="chip chip-amber">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="eyebrow-micro">Department of Computer Science</span>
          <span className="eyebrow-micro" style={{ color: "var(--amber)" }}>
            Università degli Studi di Verona · EST. 1982
          </span>
        </div>
      </div>

      <SectionCurve position="bottom" fill="cream" />
    </section>
  );
}
