"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-16 text-center"
    >
      {/* Label with flanking rules */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-8" style={{ background: "var(--divider)" }} />
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--fg-4)" }}>
          {label}
        </p>
        <div className="h-px w-8" style={{ background: "var(--divider)" }} />
      </div>

      <h2
        className="text-3xl font-bold sm:text-4xl md:text-5xl"
        style={{ fontFamily: "var(--font-playfair)", color: "var(--fg-1)" }}
      >
        {title}
      </h2>

      {/* Accent underline */}
      <div className="flex justify-center mt-3">
        <div style={{
          width: 36,
          height: 2,
          borderRadius: 99,
          background: "linear-gradient(90deg, rgba(167,139,250,0.85), rgba(96,165,250,0.6))",
        }} />
      </div>

      {subtitle && (
        <p
          className="mt-5 mx-auto max-w-lg text-sm leading-relaxed sm:text-base"
          style={{ color: "var(--fg-3)" }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
