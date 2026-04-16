"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { Reveal, RevealWords } from "@/components/ScrollReveal";
import SectionCurve from "@/components/SectionCurve";

const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const SCRIBBLE_D = "M 60,120 C 260,40 120,340 320,420 C 500,500 260,700 420,820";

function ProjectRowBase({ project, i }: { project: typeof projects[0]; i: number }) {
  const roman = romans[i] ?? String(i + 1);
  return (
    <Reveal delay={i * 60}>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="proj-row group grid grid-cols-12 items-start gap-6 py-8"
        style={{ textDecoration: "none", color: "inherit", borderTop: "0.5px solid var(--divider)" }}
      >
        {/* Roman numeral index */}
        <div className="col-span-1 flex items-baseline gap-1 pt-1">
          <span
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "clamp(1.6rem, 2.4vw, 2.1rem)",
              color: "var(--amber)",
              lineHeight: 1,
              fontFeatureSettings: '"swsh","salt","ss01"',
            }}
          >
            {roman}.
          </span>
        </div>

        {/* Title + body */}
        <div className="col-span-12 sm:col-span-7">
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "clamp(1.75rem, 3.4vw, 2.6rem)",
              lineHeight: 1.08,
              color: "var(--fg-1)",
              letterSpacing: "-0.012em",
              fontFeatureSettings: '"liga","dlig","swsh","salt","ss01","kern"',
            }}
          >
            {project.title}
          </h3>
          <p className="mt-3 text-[13px] leading-[1.85] max-w-[56ch]" style={{ color: "var(--fg-3)" }}>
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
            {project.tags.map((tag, ti) => (
              <span key={tag} className="flex items-center gap-3">
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "var(--fg-4)",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
                {ti < project.tags.length - 1 && <span style={{ color: "var(--amber)", fontSize: 9 }}>·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Right column — metadata + monogram */}
        <div className="col-span-12 sm:col-span-4 flex items-start justify-between sm:justify-end gap-4">
          <div className="hidden sm:flex flex-col text-right gap-1.5 pt-1">
            <span className="eyebrow-micro">File N° {project.index}</span>
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: 14,
                color: "var(--fg-2)",
              }}
            >
              Repository
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: 9,
                color: "var(--amber)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              github.com
            </span>
          </div>
          <div
            className="proj-thumb shrink-0"
            style={{
              width: 96,
              height: 96,
              border: "0.5px solid var(--divider)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 4,
                border: "0.5px solid rgba(200,160,106,0.22)",
                pointerEvents: "none",
              }}
            />
            <span style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "clamp(3rem, 6vw, 4.5rem)",
              color: "var(--amber)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              fontFeatureSettings: '"swsh","salt","ss01"',
            }}>
              {project.title.charAt(0)}
            </span>
          </div>
          <ArrowUpRight
            size={26}
            className="transition-all duration-500 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 mt-1"
            style={{ color: "var(--amber)" }}
          />
        </div>
      </a>
    </Reveal>
  );
}

const ProjectRow = memo(ProjectRowBase);

export default function Projects() {
  return (
    <section
      id="projects"
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
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 3.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <motion.span
        initial={{ y: -60 }}
        whileInView={{ y: 120 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ top: "10%", left: "-2vw", fontSize: "clamp(14rem, 32vw, 30rem)" }}
        className="ghost"
        aria-hidden="true"
      >
        Work
      </motion.span>

      {/* Vertical rail */}
      <div className="hidden lg:block absolute right-4 top-[14%] z-10">
        <span className="side-rail-v">Chapter II · Selected Works MMXXI–MMXXVI</span>
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">

        {/* Header */}
        <div className="mb-16 sm:mb-24">
          <Reveal>
            <div className="flex items-baseline gap-3">
              <span className="section-marker" style={{ fontSize: 22 }}>(II)</span>
              <span className="eyebrow-micro">Chapter 02 · Objects</span>
            </div>
          </Reveal>
          <Reveal delay={80} className="mt-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-7" style={{ background: "var(--amber-line)" }} />
              <span className="eyebrow">Explore the work</span>
            </div>
          </Reveal>
          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <RevealWords text="Selected" as="h2" italic delay={140} className="display display-lg" />
              <RevealWords text="Objects" as="h2" italic={false} delay={320} className="display display-lg" />
            </div>
            <Reveal delay={500} className="max-w-md">
              <p className="footnote" style={{ color: "var(--fg-2)" }}>
                Each originates on site, shaped by material, process, and circumstance.
              </p>
              <p className="mt-3 text-[13px] leading-[1.85]" style={{ color: "var(--fg-3)" }}>
                Research, tools, and production systems — from LLM fine-tuning and formal verification to RL for smart buildings.
              </p>
              <p className="eyebrow-micro mt-3" style={{ color: "var(--amber)" }}>
                {projects.length} Entries · {new Date().getFullYear()}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Curator's note — italic quote strip */}
        <Reveal delay={100} className="mb-12">
          <div className="flex items-start gap-5 pl-4 border-l" style={{ borderColor: "var(--amber)" }}>
            <span className="section-marker" style={{ fontSize: 28, lineHeight: 0.9 }}>&ldquo;</span>
            <p
              className="body-serif"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", color: "var(--fg-2)", maxWidth: "44rem" }}
            >
              These items are formed within the places themselves. Once completed, they leave their point of origin and circulate independently.
            </p>
          </div>
        </Reveal>

        {/* List */}
        <div>
          {projects.map((p, i) => (
            <ProjectRow key={p.index} project={p} i={i} />
          ))}
          <div style={{ borderBottom: "0.5px solid var(--divider)" }} />
        </div>

        {/* Footer ribbon */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="eyebrow-micro">End of catalogue · Chapter II</span>
          <span className="eyebrow-micro" style={{ color: "var(--amber)" }}>
            Continues in Chapter III — Instruments
          </span>
        </div>
      </div>

      <SectionCurve position="bottom" fill="cream" />
    </section>
  );
}
