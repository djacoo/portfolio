"use client";

import { motion } from "framer-motion";
import {
  SiPython, SiTypescript, SiGo, SiRust,
  SiPytorch, SiTensorflow,
  SiNextdotjs, SiReact, SiTailwindcss, SiFastapi, SiNodedotjs,
  SiDocker, SiKubernetes, SiPostgresql, SiRedis, SiGit,
  SiHuggingface, SiScikitlearn,
} from "react-icons/si";
import { techStack } from "@/lib/data";
import { Reveal, RevealWords } from "@/components/ScrollReveal";

const SCRIBBLE_D = "M 1260,40 Q 1160,180 1320,360 T 1260,780";

const iconMap: Record<string, React.ElementType | null> = {
  Python:         SiPython,
  TypeScript:     SiTypescript,
  Go:             SiGo,
  Rust:           SiRust,
  PyTorch:        SiPytorch,
  TensorFlow:     SiTensorflow,
  JAX:            null,
  "Hugging Face": SiHuggingface,
  "scikit-learn": SiScikitlearn,
  "Next.js":      SiNextdotjs,
  React:          SiReact,
  "Tailwind CSS": SiTailwindcss,
  FastAPI:        SiFastapi,
  "Node.js":      SiNodedotjs,
  Docker:         SiDocker,
  Kubernetes:     SiKubernetes,
  PostgreSQL:     SiPostgresql,
  Redis:          SiRedis,
  Git:            SiGit,
  AWS:            null,
};

const categories = [
  { key: "ml",       label: "ML & AI",         index: "I",  blurb: "Where models are trained, evaluated, and coaxed into usefulness." },
  { key: "language", label: "Languages",       index: "II", blurb: "The raw material — from hot loops in Go to quick sketches in Python." },
  { key: "web",      label: "Web & APIs",      index: "III", blurb: "Interfaces and services. Where research meets the browser." },
  { key: "infra",    label: "Infra & DevOps",  index: "IV", blurb: "Containers, databases, and the quiet pipelines that hold it all up." },
];

export default function TechStack() {
  return (
    <section
      id="stack"
      className="section section--cream relative overflow-hidden"
    >
      {/* Scribble */}
      <svg className="scribble-layer" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d={SCRIBBLE_D}
          className="scribble"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <motion.span
        initial={{ x: 80 }}
        whileInView={{ x: -80 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ bottom: "6%", right: "-4vw", fontSize: "clamp(12rem, 30vw, 26rem)" }}
        className="ghost"
        aria-hidden="true"
      >
        Craft
      </motion.span>

      {/* Vertical rail */}
      <div className="hidden lg:block absolute left-4 top-[16%] z-10">
        <span className="side-rail-v">Chapter III · Instruments of the Practice</span>
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">

        {/* Header */}
        <div className="mb-16">
          <Reveal>
            <div className="flex items-baseline gap-3">
              <span className="section-marker" style={{ fontSize: 22 }}>(III)</span>
              <span className="eyebrow-micro">Chapter 03 · Instruments</span>
            </div>
          </Reveal>
          <Reveal delay={80} className="mt-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-7" style={{ background: "var(--amber-line)" }} />
              <span className="eyebrow">Tools of the trade</span>
            </div>
          </Reveal>
          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <RevealWords text="The" as="h2" italic delay={140} className="display display-lg" />
              <RevealWords text="Instruments" as="h2" italic={false} delay={260} className="display display-lg" />
            </div>
            <Reveal delay={440} className="max-w-md">
              <p className="footnote" style={{ color: "var(--fg-2)" }}>
                Frameworks and runtimes reached for daily — grouped by the role they play in the work.
              </p>
              <p className="eyebrow-micro mt-3" style={{ color: "var(--amber)" }}>
                {techStack.length} Instruments · IV Categories
              </p>
            </Reveal>
          </div>
        </div>

        {/* Summary tally strip */}
        <Reveal delay={120} className="mb-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((c) => {
            const count = techStack.filter((t) => t.category === c.key).length;
            return (
              <div key={c.key} className="flex flex-col gap-1 pt-4" style={{ borderTop: "0.5px solid var(--divider)" }}>
                <span className="eyebrow-micro">{c.label}</span>
                <span className="num-monument" style={{ fontSize: "clamp(2.4rem, 4vw, 3.2rem)" }}>
                  {String(count).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </Reveal>

        {/* Categories — editorial 4-row list */}
        <div className="flex flex-col">
          {categories.map((cat, ci) => {
            const items = techStack.filter(t => t.category === cat.key);
            return (
              <Reveal key={cat.key} delay={ci * 80}>
                <div
                  className="grid grid-cols-12 gap-6 py-10"
                  style={{ borderTop: "0.5px solid var(--divider)" }}
                >
                  <div className="col-span-12 md:col-span-4">
                    <div className="flex items-baseline gap-3">
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontStyle: "italic",
                          fontSize: 22,
                          color: "var(--amber)",
                          fontFeatureSettings: '"swsh","salt","ss01"',
                        }}
                      >
                        {cat.index}.
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontStyle: "italic",
                          fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)",
                          lineHeight: 1,
                          color: "var(--fg-1)",
                          letterSpacing: "-0.012em",
                          fontFeatureSettings: '"swsh","salt","ss01"',
                        }}
                      >
                        {cat.label}
                      </h3>
                    </div>
                    <p className="mt-3 text-[12.5px] leading-[1.75] max-w-[26ch]" style={{ color: "var(--fg-3)" }}>
                      {cat.blurb}
                    </p>
                    <p className="eyebrow-micro mt-3">
                      {items.length} entries
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-8 overflow-hidden">
                    <div className="marquee-wrap">
                      {[0, 1].map((pass) => (
                        <div
                          key={pass}
                          className={`marquee-track slow${ci % 2 !== 0 ? " reverse" : ""}`}
                          aria-hidden={pass === 1 ? true : undefined}
                        >
                          {items.map((t) => {
                            const Icon = iconMap[t.name];
                            return (
                              <span
                                key={t.name}
                                className="flex items-center gap-2.5"
                                style={{ color: "var(--fg-2)" }}
                              >
                                {Icon ? (
                                  <Icon size={14} style={{ opacity: 0.55 }} />
                                ) : (
                                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 9, letterSpacing: "0.08em", color: "var(--amber)" }}>●</span>
                                )}
                                <span style={{
                                  fontFamily: "var(--font-cormorant)",
                                  fontStyle: "italic",
                                  fontSize: 19,
                                  letterSpacing: "-0.008em",
                                  whiteSpace: "nowrap",
                                  fontFeatureSettings: '"swsh","salt","ss01"',
                                }}>
                                  {t.name}
                                </span>
                                <span style={{ color: "var(--amber)", fontSize: 10, marginLeft: "0.5rem" }}>·</span>
                              </span>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
          <div style={{ borderBottom: "0.5px solid var(--divider)" }} />
        </div>

        {/* Footer strip */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="eyebrow-micro">End of catalogue · Chapter III</span>
          <span
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: 15,
              color: "var(--fg-2)",
              fontFeatureSettings: '"swsh","salt","ss01"',
            }}
          >
            Always learning, rarely finished.
          </span>
        </div>
      </div>
    </section>
  );
}
