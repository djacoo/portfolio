"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, MapPin, Download } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { personal } from "@/lib/data";
import Magnetic from "@/components/Magnetic";
import CVModal from "@/components/CVModal";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const socials = [
  { href: personal.github,    icon: Github,      label: "GitHub",    size: 14 },
  { href: personal.linkedin,  icon: Linkedin,    label: "LinkedIn",  size: 14 },
  { href: personal.instagram, icon: SiInstagram, label: "Instagram", size: 13 },
];

export default function Hero() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-28"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.15] pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(100,70,255,0.10) 0%, transparent 68%)",
        }}
      />

      {/* Ghost watermark — centered behind the name */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none hidden md:flex"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(7rem, 18vw, 18rem)",
            fontWeight: 800,
            lineHeight: 1,
            color: "var(--fg-1)",
            opacity: 0.025,
            letterSpacing: "-0.03em",
          }}
        >
          Parretti
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto">

        {/* ── Meta bar ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 mb-12"
        >
          <span
            className="font-mono text-[10px] tracking-[0.18em]"
            style={{ color: "var(--fg-4)" }}
          >
            {personal.tagline}
          </span>
          <div className="h-px w-8" style={{ background: "var(--divider)" }} />
          <span
            className="font-mono text-[10px] flex items-center gap-1"
            style={{ color: "var(--fg-4)" }}
          >
            <MapPin size={9} />
            {personal.location}
          </span>
        </motion.div>

        {/* ── Name ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease }}
          className="mb-10"
        >
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.2rem, 9vw, 9rem)",
              fontWeight: 800,
              fontStyle: "normal",
              color: "var(--fg-1)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              display: "block",
            }}
          >
            Jacopo Parretti
          </span>
        </motion.div>

        {/* ── Divider + role ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease }}
          className="flex items-center gap-4 mb-7"
        >
          <div className="h-px w-10" style={{ background: "var(--divider)" }} />
          <p
            className="font-mono text-[11px] tracking-widest uppercase"
            style={{ color: "var(--fg-3)" }}
          >
            {personal.title}
          </p>
          <div className="h-px w-10" style={{ background: "var(--divider)" }} />
        </motion.div>

        {/* ── Description ───────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36, ease }}
          className="text-sm leading-[1.9] max-w-md mb-12"
          style={{ color: "var(--fg-3)" }}
        >
          {personal.description}
        </motion.p>

        {/* ── CTAs ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.44, ease }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <Magnetic>
            <div className="btn-wrapper">
              <a href="#projects" className="iridescent-btn">
                <span className="btn-text">View Projects</span>
              </a>
            </div>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn-ghost">
              Get in Touch
            </a>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => setCvOpen(true)}
              className="btn-ghost"
              style={{ display: "flex", alignItems: "center", gap: 7 }}
            >
              <Download size={13} />
              Download CV
            </button>
          </Magnetic>
        </motion.div>

        <CVModal open={cvOpen} onClose={() => setCvOpen(false)} />

        {/* ── Social row ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.56, ease }}
          className="flex items-center gap-6"
        >
          {socials.map(({ href, icon: Icon, label, size }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] tracking-wider transition-colors duration-200"
              style={{ color: "var(--fg-4)", textDecoration: "none" }}
              onMouseOver={e => (e.currentTarget.style.color = "var(--fg-1)")}
              onMouseOut={e => (e.currentTarget.style.color = "var(--fg-4)")}
            >
              <Icon size={size} />
              <span>{label}</span>
            </a>
          ))}
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--fg-3)" }}
          />
          <div
            className="h-8 w-[1px]"
            style={{ background: "linear-gradient(180deg, var(--fg-3) 0%, transparent 100%)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
