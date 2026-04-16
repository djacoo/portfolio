"use client";

import { motion } from "framer-motion";
import { degrees } from "@/lib/data";
import { Reveal, RevealWords } from "@/components/ScrollReveal";
import SectionCurve from "@/components/SectionCurve";

const SCRIBBLE_D = "M 80,80 C 240,260 100,440 220,600 C 340,760 100,860 260,900";

const romans = ["I", "II", "III", "IV", "V"];

const quotes = [
  {
    k: "On method",
    v: "Study is not accumulation. It is the slow habit of asking better questions.",
  },
  {
    k: "On discipline",
    v: "A degree is a constraint. The interesting work begins after the constraint is internalised.",
  },
];

export default function Degrees() {
  return (
    <section
      id="degrees"
      className="section section--obsidian relative overflow-hidden"
    >
      <SectionCurve position="top" fill="cream" />

      {/* Scribble */}
      <svg className="scribble-layer" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d={SCRIBBLE_D}
          className="scribble"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 3.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <motion.span
        aria-hidden="true"
        className="ghost"
        initial={{ y: -60 }}
        whileInView={{ y: 100 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          top: "15%",
          left: "-2vw",
          fontSize: "clamp(12rem, 32vw, 28rem)",
        }}
      >
        Academia
      </motion.span>

      {/* Vertical rail */}
      <div className="hidden lg:block absolute right-4 top-[14%] z-10">
        <span className="side-rail-v">Chapter VI · The Paper Record</span>
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">

        {/* Header */}
        <div className="mb-16 sm:mb-20">
          <Reveal>
            <div className="flex items-baseline gap-3">
              <span className="section-marker" style={{ fontSize: 22 }}>(VI)</span>
              <span className="eyebrow-micro">Chapter 06 · Credentials</span>
            </div>
          </Reveal>
          <Reveal delay={80} className="mt-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-7" style={{ background: "var(--amber-line)" }} />
              <span className="eyebrow">The paper record</span>
            </div>
          </Reveal>
          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <RevealWords text="The paper" as="h2" italic delay={140} className="display display-lg" />
              <RevealWords text="record." as="h2" italic delay={320} className="display display-lg" />
            </div>
            <Reveal delay={500} className="max-w-md">
              <p className="footnote" style={{ color: "var(--fg-2)" }}>
                Two broadsides, one department. Separated by four years and the shift from wet biology to modelling.
              </p>
              <p className="eyebrow-micro mt-3" style={{ color: "var(--amber)" }}>
                {degrees.length} Broadsides · Università di Verona
              </p>
            </Reveal>
          </div>
        </div>

        {/* Flanking quote strip */}
        <Reveal delay={120} className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {quotes.map((q) => (
            <div
              key={q.k}
              className="pl-5 border-l"
              style={{ borderColor: "var(--amber)" }}
            >
              <p className="eyebrow-micro" style={{ color: "var(--amber)" }}>{q.k}</p>
              <p
                className="mt-2"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)",
                  color: "var(--fg-2)",
                  lineHeight: 1.35,
                  letterSpacing: "-0.008em",
                  fontFeatureSettings: '"swsh","salt","ss01"',
                }}
              >
                {q.v}
              </p>
            </div>
          ))}
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {degrees.map((d, i) => {
            const roman = romans[i] ?? String(i + 1);
            return (
              <Reveal key={i} delay={i * 160}>
                <article className="degree-broadside h-full flex flex-col">
                  <span className="corner tl" />
                  <span className="corner tr" />
                  <span className="corner bl" />
                  <span className="corner br" />

                  <div className="flex items-center justify-center gap-3 mb-8">
                    <span className="h-px w-5" style={{ background: "var(--amber-line)" }} />
                    <span className="eyebrow-micro" style={{ color: "var(--fg-4)" }}>
                      Entry 0{i + 1}
                    </span>
                    <span className="h-px w-5" style={{ background: "var(--amber-line)" }} />
                  </div>

                  <div
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      fontSize: "clamp(6rem, 14vw, 11rem)",
                      lineHeight: 0.85,
                      color: "transparent",
                      WebkitTextStroke: "1px var(--amber)",
                      letterSpacing: "-0.04em",
                      fontFeatureSettings: '"swsh","salt","ss01"',
                    }}
                    aria-hidden="true"
                  >
                    {roman}
                  </div>

                  <p
                    className="font-mono mt-8"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.34em",
                      textTransform: "uppercase",
                      color: "var(--amber)",
                    }}
                  >
                    {d.title}
                  </p>

                  <h3
                    className="mt-4"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      fontSize: "clamp(2rem, 4.2vw, 3rem)",
                      lineHeight: 1.05,
                      color: "var(--fg-1)",
                      letterSpacing: "-0.015em",
                      fontFeatureSettings: '"liga","dlig","swsh","salt","ss01","kern"',
                    }}
                  >
                    {d.field}
                  </h3>

                  <p
                    className="mt-3"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: 17,
                      color: "var(--fg-3)",
                    }}
                  >
                    {d.institution}
                  </p>
                  <p
                    className="font-mono mt-1"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      color: "var(--fg-4)",
                      textTransform: "uppercase",
                    }}
                  >
                    {d.location}
                  </p>

                  <div className="mt-8 flex items-center justify-center gap-3">
                    <span className="h-px w-10" style={{ background: "var(--amber-line)" }} />
                    <span className="eyebrow-micro" style={{ color: "var(--fg-3)" }}>
                      {d.period}
                    </span>
                    <span className="h-px w-10" style={{ background: "var(--amber-line)" }} />
                  </div>

                  <div className="mt-auto pt-10">
                    {"grade" in d && d.grade ? (
                      <>
                        <p className="eyebrow-micro" style={{ color: "var(--fg-4)" }}>
                          Final Mark
                        </p>
                        <p
                          className="mt-3 num-monument"
                          style={{
                            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {d.grade}
                        </p>
                      </>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                            style={{ background: "var(--amber)" }}
                          />
                          <span
                            className="relative inline-flex rounded-full h-1.5 w-1.5"
                            style={{ background: "var(--amber)" }}
                          />
                        </span>
                        <span className="eyebrow-micro" style={{ color: "var(--amber)" }}>
                          In Progress
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Footer strip */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="eyebrow-micro">End of broadsides · Chapter VI</span>
          <span className="eyebrow-micro" style={{ color: "var(--amber)" }}>
            Archived at Verona · MMXXIV–MMXXVI
          </span>
        </div>
      </div>

      <SectionCurve position="bottom" fill="cream" />
    </section>
  );
}
