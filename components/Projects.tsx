"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import SectionHeader from "./SectionHeader";

interface SpotlightPos { x: number; y: number }

function ProjectCard({ project, i }: { project: typeof projects[0]; i: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [spotlight, setSpotlight] = useState<SpotlightPos | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.a
      ref={cardRef}
      key={project.index}
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight(null)}
      className="group glass-panel rounded-2xl overflow-hidden glass-lift flex items-stretch block"
      style={{ textDecoration: "none", position: "relative" }}
    >
      {/* Mouse spotlight */}
      {spotlight && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background: `radial-gradient(280px circle at ${spotlight.x}px ${spotlight.y}px, ${project.accent}14 0%, transparent 70%)`,
            transition: "background 0.05s",
            borderRadius: "inherit",
          }}
        />
      )}

      {/* Accent bar */}
      <div
        className="w-[3px] shrink-0 transition-all duration-300 group-hover:w-[5px]"
        style={{ background: project.accent, position: "relative", zIndex: 1 }}
      />

      {/* Index number */}
      <div
        className="shrink-0 flex items-center justify-center w-20 sm:w-24 px-4 py-6 border-r"
        style={{ borderColor: "var(--divider)", position: "relative", zIndex: 1 }}
      >
        <span
          className="font-mono text-4xl sm:text-5xl font-bold leading-none select-none transition-all duration-300"
          style={{
            color: project.accent,
            opacity: 0.28,
            fontFamily: "var(--font-playfair)",
          }}
        >
          {project.index}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-6 py-5 min-w-0" style={{ position: "relative", zIndex: 1 }}>
        <div className="flex items-start justify-between gap-4">
          <h3
            className="text-base font-bold leading-snug transition-colors duration-200"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--fg-1)",
            }}
          >
            {project.title}
          </h3>
          <ArrowUpRight
            size={15}
            className="shrink-0 mt-0.5 transition-all duration-200 -translate-y-0.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-1"
            style={{ color: project.accent }}
          />
        </div>

        <p
          className="mt-2 text-xs leading-relaxed line-clamp-2 sm:line-clamp-none"
          style={{ color: "var(--fg-2)" }}
        >
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md px-2 py-0.5 font-mono text-[11px]"
              style={{
                color: "var(--fg-3)",
                border: "0.5px solid var(--divider)",
                background: `${project.accent}08`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          label="What I've built"
          title="Projects"
          subtitle="Research, tools, and applications — from coursework to production."
        />

        <div className="space-y-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.index} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
