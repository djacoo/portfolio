"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Download } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { personal } from "@/lib/data";
import Magnetic from "@/components/Magnetic";
import CVModal from "@/components/CVModal";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const socials = [
  { href: personal.github,    icon: Github,      label: "GitHub" },
  { href: personal.linkedin,  icon: Linkedin,    label: "LinkedIn" },
  { href: personal.instagram, icon: SiInstagram, label: "Instagram" },
];

const ribbonLoop = [
  "AI Engineer", "Developer", "Researcher", "Bioinformatician",
  "Open-Source", "Verona · Italy", "MMXXVI",
];

export default function Hero() {
  const [cvOpen, setCvOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // Scribble SVG is a pixel-fill animation for 3+ seconds; hold it back until
  // the hero type is already in place so it doesn't contend with initial paint.
  const [scribbleOn, setScribbleOn] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let t1 = 0, t2 = 0;
    const onReady = () => {
      t1 = window.setTimeout(() => setLoaded(true), 180);
      t2 = window.setTimeout(() => setScribbleOn(true), 900);
    };

    if (document.documentElement.dataset.loaded === "true") {
      onReady();
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    const obs = new MutationObserver(() => {
      if (document.documentElement.dataset.loaded === "true") {
        obs.disconnect();
        onReady();
      }
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-loaded"] });
    return () => {
      obs.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const firstY  = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const secondY = useTransform(scrollYProgress, [0, 1], [0, -210]);
  const monoY   = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const sealText = "ATELIER · JACOPO PARRETTI · MMXXVI · VERONA · ";

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden flex flex-col"
      style={{ paddingTop: "7.5rem" }}
    >
      {/* Single decorative scribble — deferred after hero type lands. */}
      <svg
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M -60,420 C 160,200 380,700 640,500 C 900,300 1080,760 1280,520 C 1380,400 1480,480 1520,440"
          stroke="var(--amber-line)" strokeWidth="0.6" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={scribbleOn ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.8, ease }}
        />
      </svg>

      <motion.span
        aria-hidden="true"
        className="ghost"
        style={{
          top: "18%",
          left: "-2vw",
          fontSize: "clamp(16rem, 40vw, 40rem)",
          y: firstY,
        }}
      >
        JP
      </motion.span>

      <motion.span
        aria-hidden="true"
        className="ghost-outline hidden sm:block"
        style={{
          bottom: "14%",
          right: "-6vw",
          fontSize: "clamp(10rem, 26vw, 22rem)",
          y: secondY,
        }}
      >
        parretti
      </motion.span>

      {/* Top-left meta — Issue number + coordinates */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="absolute top-28 sm:top-32 left-6 sm:left-12 z-20 max-w-[13rem]"
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.7, delay: 0.8, ease }}
        >
          <div className="flex items-baseline gap-2 mb-3">
            <span className="section-marker" style={{ fontSize: 24 }}>(I)</span>
            <span className="eyebrow-micro" style={{ color: "var(--fg-4)" }}>Issue N° 01</span>
          </div>
          <p className="footnote" style={{ fontSize: 13, color: "var(--fg-3)" }}>
            A private atelier for the practice of intelligent systems — research, engineering, and the long craft of building things that think.
          </p>
          <div className="mt-4 pt-4" style={{ borderTop: "0.5px solid var(--divider)" }}>
            <p className="eyebrow-micro">Coordinates</p>
            <p
              className="mt-1"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: 14,
                color: "var(--fg-2)",
                lineHeight: 1.3,
              }}
            >
              45.4384° N <br />
              10.9916° E
            </p>
            <p className="eyebrow-micro mt-2">Verona · Italy</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Top-right — rotating seal + metadata */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="absolute top-32 right-6 sm:right-12 z-20 hidden md:flex flex-col items-end gap-4"
        initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
        animate={loaded ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.7, rotate: -30 }}
        transition={{ duration: 1.2, delay: 1.0, ease }}
      >
        <div className="hero-seal">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="seal-circle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
            </defs>
            <g className="seal-ring">
              <circle cx="100" cy="100" r="84" fill="none" stroke="var(--amber-line)" strokeWidth="0.5" />
              {Array.from({ length: 24 }).map((_, i) => {
                const a = (i / 24) * Math.PI * 2;
                const r2 = i % 4 === 0 ? 70 : 73;
                const x1 = (100 + Math.cos(a) * 76).toFixed(3);
                const y1 = (100 + Math.sin(a) * 76).toFixed(3);
                const x2 = (100 + Math.cos(a) * r2).toFixed(3);
                const y2 = (100 + Math.sin(a) * r2).toFixed(3);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--amber-line)" strokeWidth="0.5" />;
              })}
              <text fill="var(--fg-3)" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "8px", letterSpacing: "0.22em" }}>
                <textPath href="#seal-circle" startOffset="0">{sealText + sealText}</textPath>
              </text>
            </g>
            <circle cx="100" cy="100" r="2.4" fill="var(--amber)" />
            <circle cx="100" cy="100" r="56" fill="none" stroke="var(--amber-line)" strokeWidth="0.4" />
          </svg>
        </div>

        <div className="text-right">
          <p className="eyebrow-micro" style={{ color: "var(--amber)" }}>Imagine Possible</p>
          <p
            className="mt-1"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: 14,
              color: "var(--fg-3)",
              lineHeight: 1.3,
              maxWidth: "9rem",
            }}
          >
            Est. MMXXVI <br /> Still under construction.
          </p>
        </div>
      </motion.div>

      {/* Stage */}
      <div className="relative flex-1 flex items-center justify-center px-6 z-10">
        <div className="relative flex flex-col items-center max-w-6xl w-full">

          <motion.div
            style={{ y: monoY }}
            initial={{ opacity: 0, y: 10 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="flex items-center gap-4 mb-6 sm:mb-10"
          >
            <span className="h-px w-10" style={{ background: "var(--amber-line)" }} />
            <span className="eyebrow-micro" style={{ fontSize: 10, letterSpacing: "0.36em", color: "var(--fg-3)" }}>
              MSc · Artificial Intelligence
            </span>
            <span className="h-px w-10" style={{ background: "var(--amber-line)" }} />
          </motion.div>

          <motion.div style={{ y: firstY }} className="reveal-line overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={loaded ? { y: 0 } : { y: "110%" }}
              transition={{ duration: 1.1, delay: 0.15, ease }}
              className="display display-italic"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--fg-1)",
                display: "block",
                textAlign: "center",
                fontSize: "clamp(4.2rem, 14vw, 14rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.012em",
                fontFeatureSettings: '"liga","dlig","swsh","salt","ss01","ss02","kern"',
              }}
            >
              Jacopo
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={loaded ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease }}
            style={{ y: secondY, transformOrigin: "center" }}
            className="flex items-center justify-center gap-3 my-3 sm:my-4 w-full"
          >
            <span className="h-px flex-1 max-w-[18%]" style={{ background: "var(--amber-line)" }} />
            <span style={{ width: 6, height: 6, background: "var(--amber)", transform: "rotate(45deg)" }} />
            <span className="h-px flex-1 max-w-[18%]" style={{ background: "var(--amber-line)" }} />
          </motion.div>

          <motion.div style={{ y: secondY }} className="reveal-line overflow-hidden w-full">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 1.1, delay: 0.35, ease }}
              className="hero-surname"
              style={{ textAlign: "center", letterSpacing: "0.52em" }}
            >
              PARRETTI
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: monoY }}
            initial={{ opacity: 0, y: 14 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
            className="mt-8 sm:mt-10 flex flex-col items-center gap-3"
          >
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: "clamp(1.15rem, 2vw, 1.6rem)",
                color: "var(--fg-2)",
                letterSpacing: "-0.005em",
                lineHeight: 1.2,
              }}
            >
              AI Engineer &nbsp;·&nbsp; Developer &nbsp;·&nbsp; Researcher
            </span>
            <span className="eyebrow-micro">Est. MMXXVI</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom content + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.9, delay: 1.5, ease }}
        style={{ opacity: fadeOut }}
        className="relative z-20 px-6 sm:px-12 pb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6"
      >
        <div className="max-w-[22rem] flex flex-col gap-3 sm:ml-16 md:ml-20">
          <span className="eyebrow-micro" style={{ color: "var(--amber)" }}>— Manifesto</span>
          <p className="text-[13px] leading-[1.85]" style={{ color: "var(--fg-3)" }}>
            {personal.description}
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="h-px w-5" style={{ background: "var(--amber)" }} />
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: 13,
                color: "var(--fg-2)",
              }}
            >
              Jacopo Parretti, signed.
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4 shrink-0">
          <div className="flex flex-wrap items-center gap-3 justify-end">
            <Magnetic>
              <a href="#projects" className="btn-pill btn-pill--filled">View Work</a>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => setCvOpen(true)}
                className="btn-pill flex items-center gap-2"
              >
                <Download size={11} />
                Download CV
              </button>
            </Magnetic>
          </div>
          <span className="eyebrow-micro" style={{ color: "var(--fg-4)" }}>
            07 Chapters · One Portfolio
          </span>
        </div>
      </motion.div>

      {/* Socials rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.7, ease }}
        style={{ opacity: fadeOut }}
        className="absolute bottom-24 left-6 sm:left-12 hidden sm:flex flex-col gap-3 z-20"
      >
        {socials.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors duration-300 group"
            style={{ color: "var(--fg-4)", textDecoration: "none" }}
          >
            <Icon size={12} />
            <span className="font-mono text-[10px] tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
              {label}
            </span>
          </a>
        ))}
      </motion.div>

      {/* Marquee ribbon at very bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9, delay: 1.9, ease }}
        style={{ opacity: fadeOut }}
        className="relative z-10 marquee-wrap"
      >
        <div className="ribbon-rule">
          <div className="marquee-track slow">
            {Array.from({ length: 2 }).map((_, pass) => (
              <span key={pass} className="inline-flex items-center gap-8 pr-8">
                {ribbonLoop.map((w, i) => (
                  <span key={i} className="inline-flex items-center gap-8">
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontStyle: "italic",
                        fontSize: "1.15rem",
                        color: "var(--fg-2)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {w}
                    </span>
                    <span className="ribbon-dot" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <CVModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </section>
  );
}
