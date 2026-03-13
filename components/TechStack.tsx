"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiPython, SiTypescript, SiGo, SiRust,
  SiPytorch, SiTensorflow,
  SiNextdotjs, SiReact, SiTailwindcss, SiFastapi, SiNodedotjs,
  SiDocker, SiKubernetes, SiPostgresql, SiRedis, SiGit,
  SiHuggingface, SiScikitlearn,
} from "react-icons/si";
import { techStack } from "@/lib/data";
import SectionHeader from "./SectionHeader";

const iconMap: Record<string, { icon: React.ElementType | null; color: string }> = {
  Python:         { icon: SiPython,      color: "#3776AB" },
  TypeScript:     { icon: SiTypescript,  color: "#3178C6" },
  Go:             { icon: SiGo,          color: "#00ADD8" },
  Rust:           { icon: SiRust,        color: "#CE422B" },
  PyTorch:        { icon: SiPytorch,     color: "#EE4C2C" },
  TensorFlow:     { icon: SiTensorflow,  color: "#FF6F00" },
  JAX:            { icon: null,          color: "#A259FF" },
  "Hugging Face": { icon: SiHuggingface, color: "#FFD21E" },
  "scikit-learn": { icon: SiScikitlearn, color: "#F7931E" },
  "Next.js":      { icon: SiNextdotjs,   color: "#BBBBBB" },
  React:          { icon: SiReact,       color: "#61DAFB" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  FastAPI:        { icon: SiFastapi,     color: "#009688" },
  "Node.js":      { icon: SiNodedotjs,   color: "#339933" },
  Docker:         { icon: SiDocker,      color: "#2496ED" },
  Kubernetes:     { icon: SiKubernetes,  color: "#326CE5" },
  PostgreSQL:     { icon: SiPostgresql,  color: "#4169E1" },
  Redis:          { icon: SiRedis,       color: "#DC382D" },
  Git:            { icon: SiGit,         color: "#F05032" },
  AWS:            { icon: null,          color: "#FF9900" },
};

const categories = [
  {
    key: "ml",
    label: "ML / AI",
    index: "01",
    accent: "#22d3ee",
    accent2: "#a78bfa",
    description: "Frameworks powering research and production models.",
    featured: true,
  },
  {
    key: "language",
    label: "Languages",
    index: "02",
    accent: "#a78bfa",
    accent2: "#7c6af7",
    description: "Primary languages I write in.",
    featured: false,
  },
  {
    key: "web",
    label: "Web & APIs",
    index: "03",
    accent: "#34d399",
    accent2: "#06b6d4",
    description: "Fullstack tools for building products.",
    featured: false,
  },
  {
    key: "infra",
    label: "Infra & DevOps",
    index: "04",
    accent: "#f59e0b",
    accent2: "#f97316",
    description: "Deployment, databases, and tooling.",
    featured: false,
  },
];

function hexToRgba(hex: string, a: number) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface TechChipProps {
  name: string;
  catIndex: number;
  chipIndex: number;
  large?: boolean;
  isLight?: boolean;
}

function TechChip({ name, catIndex, chipIndex, large = false, isLight = false }: TechChipProps) {
  const [hovered, setHovered] = useState(false);
  const entry = iconMap[name];
  const color = entry?.color ?? "#8888ff";
  const Icon = entry?.icon;

  const defaultBorder = isLight ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.07)";
  const defaultBg     = isLight ? "rgba(0,0,0,0.04)"  : "rgba(255,255,255,0.035)";
  const defaultIcon   = isLight ? "rgba(29,29,31,0.45)" : "rgba(255,255,255,0.38)";
  const defaultLabel  = isLight ? "rgba(29,29,31,0.62)" : "rgba(255,255,255,0.52)";
  const hoveredLabel  = isLight ? "rgba(29,29,31,0.90)" : "rgba(255,255,255,0.90)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28, delay: catIndex * 0.07 + chipIndex * 0.03, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: large ? 10 : 8,
        padding: large ? "10px 18px" : "7px 13px",
        borderRadius: 10,
        border: `0.5px solid ${hovered ? hexToRgba(color, 0.45) : defaultBorder}`,
        background: hovered ? hexToRgba(color, 0.10) : defaultBg,
        boxShadow: hovered ? `0 0 18px ${hexToRgba(color, 0.18)}, inset 0 0.5px 0 rgba(255,255,255,0.12)` : "none",
        cursor: "default",
        transition: "all 0.18s ease",
        userSelect: "none" as const,
        flexShrink: 0,
      }}
    >
      {Icon ? (
        <Icon
          size={large ? 20 : 15}
          style={{
            color: hovered ? color : defaultIcon,
            transition: "color 0.18s ease",
            flexShrink: 0,
          }}
        />
      ) : (
        <span style={{
          fontSize: large ? 10 : 8,
          fontWeight: 700,
          fontFamily: "var(--font-geist-mono)",
          color: hovered ? color : defaultIcon,
          transition: "color 0.18s ease",
          flexShrink: 0,
          lineHeight: 1,
          letterSpacing: "0.04em",
        }}>
          {name.slice(0, 3).toUpperCase()}
        </span>
      )}
      <span style={{
        fontFamily: "var(--font-geist-sans)",
        fontSize: large ? 13.5 : 12.5,
        fontWeight: 450,
        color: hovered ? hoveredLabel : defaultLabel,
        transition: "color 0.18s ease",
        letterSpacing: "0.015em",
        whiteSpace: "nowrap" as const,
      }}>
        {name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsLight(document.documentElement.dataset.theme === "light");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const featured = categories.find(c => c.featured)!;
  const rest = categories.filter(c => !c.featured);

  const featuredItems = techStack.filter(t => t.category === featured.key);

  return (
    <section id="stack" className="section">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          label="Tools of the trade"
          title="Tech Stack"
          subtitle="Technologies and frameworks I reach for when building."
        />

        <div className="flex flex-col gap-[0.6rem]">

          {/* ── Featured: ML / AI ── full-width hero panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease }}
            style={{
              position: "relative",
              borderRadius: 20,
              border: `0.5px solid ${isLight ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.10)"}`,
              background: isLight
                ? "rgba(255,255,255,0.72)"
                : "rgba(14,16,24,0.80)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              overflow: "hidden",
              padding: "1.75rem 2rem",
            }}
          >
            {/* Ambient glow in background */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 70% 80% at 15% 50%, ${hexToRgba(featured.accent, 0.06)} 0%, transparent 60%),
                           radial-gradient(ellipse 50% 60% at 85% 40%, ${hexToRgba(featured.accent2, 0.07)} 0%, transparent 55%)`,
              pointerEvents: "none",
            }} />

            {/* Ghost index watermark */}
            <span style={{
              position: "absolute",
              right: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(5rem, 10vw, 8rem)",
              fontWeight: 800,
              color: hexToRgba(featured.accent, 0.04),
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
              letterSpacing: "-0.04em",
            }}>
              {featured.index}
            </span>

            {/* Header row */}
            <div className="flex items-center gap-3 mb-5">
              <span style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.26em",
                textTransform: "uppercase" as const,
                color: featured.accent,
              }}>
                {featured.label}
              </span>
              <span style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 9,
                letterSpacing: "0.14em",
                padding: "2px 8px",
                borderRadius: 99,
                border: `0.5px solid ${hexToRgba(featured.accent, 0.35)}`,
                color: hexToRgba(featured.accent, 0.80),
                background: hexToRgba(featured.accent, 0.06),
              }}>
                PRIMARY FOCUS
              </span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)"}, transparent)` }} />
              <span style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 9,
                color: isLight ? "rgba(29,29,31,0.45)" : "rgba(255,255,255,0.18)",
              }}>
                {featuredItems.length} frameworks
              </span>
            </div>

            {/* Large chips */}
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.5rem" }}>
              {featuredItems.map((tech, i) => (
                <TechChip key={tech.name} name={tech.name} catIndex={0} chipIndex={i} large isLight={isLight} />
              ))}
            </div>

            {/* Bottom description */}
            <p style={{
              marginTop: "1.25rem",
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10,
              letterSpacing: "0.06em",
              color: isLight ? "rgba(29,29,31,0.45)" : "rgba(255,255,255,0.18)",
              fontStyle: "italic",
            }}>
              {featured.description}
            </p>
          </motion.div>

          {/* ── Bottom 3 panels ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[0.6rem]">
            {rest.map((cat, ci) => {
              const items = techStack.filter(t => t.category === cat.key);
              return (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: ci * 0.07, ease }}
                  style={{
                    position: "relative",
                    borderRadius: 20,
                    border: `0.5px solid ${isLight ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.08)"}`,
                    background: isLight
                      ? "rgba(255,255,255,0.65)"
                      : "rgba(14,16,24,0.72)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    overflow: "hidden",
                    padding: "1.4rem 1.5rem",
                  }}
                >
                  {/* Top accent line */}
                  <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent2}, transparent)`,
                    borderRadius: "20px 20px 0 0",
                    opacity: 0.7,
                  }} />

                  {/* Ghost index */}
                  <span style={{
                    position: "absolute",
                    right: "1rem",
                    bottom: "0.75rem",
                    fontFamily: "var(--font-playfair)",
                    fontSize: "4rem",
                    fontWeight: 800,
                    color: hexToRgba(cat.accent, 0.04),
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                    letterSpacing: "-0.04em",
                  }}>
                    {cat.index}
                  </span>

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase" as const,
                      color: cat.accent,
                    }}>
                      {cat.label}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 9,
                      color: isLight ? "rgba(29,29,31,0.45)" : "rgba(255,255,255,0.16)",
                    }}>
                      {items.length}
                    </span>
                  </div>

                  {/* Chips */}
                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.4rem" }}>
                    {items.map((tech, ti) => (
                      <TechChip key={tech.name} name={tech.name} catIndex={ci + 1} chipIndex={ti} isLight={isLight} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
