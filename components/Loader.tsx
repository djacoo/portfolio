"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION = 5000;
const PHASE_COUNT = 4;
const PHASE_MS = DURATION / PHASE_COUNT;
const TOTAL_S = (DURATION / 1000).toFixed(2);

const phases = [
  { numeral: "I",   verb: "Drafting",   sub: "the frame." },
  { numeral: "II",  verb: "Composing",  sub: "the grammar." },
  { numeral: "III", verb: "Threading",  sub: "the archive." },
  { numeral: "IV",  verb: "Unveiling",  sub: "the entrance." },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const TICK_COUNT = 48;

const TICKS = Array.from({ length: TICK_COUNT }, (_, i) => {
  const a = (i / TICK_COUNT) * Math.PI * 2;
  const r = (n: number) => Math.round(n * 1000) / 1000;
  return {
    x1: r(100 + Math.cos(a) * 84),
    y1: r(100 + Math.sin(a) * 84),
    x2: r(100 + Math.cos(a) * 92),
    y2: r(100 + Math.sin(a) * 92),
    accent: i % 6 === 0,
  };
});

const TICKER = [
  "calibrating kerning",
  "inking margins",
  "binding quires",
  "threading lace",
  "sealing imprimatur",
  "pressing folio",
  "tuning grammar",
  "drawing archway",
];
const TICKER_MS = 620;

const CONSTELLATION: { x: number; y: number; size: number; delay: number }[] = [
  { x: 7,  y: 18, size: 2.5, delay: 0.9 },
  { x: 92, y: 14, size: 3,   delay: 1.2 },
  { x: 12, y: 72, size: 2,   delay: 1.6 },
  { x: 89, y: 80, size: 2.5, delay: 2.0 },
  { x: 52, y: 8,  size: 2,   delay: 2.4 },
  { x: 46, y: 93, size: 2,   delay: 2.8 },
  { x: 72, y: 30, size: 1.6, delay: 3.2 },
  { x: 26, y: 35, size: 1.6, delay: 3.6 },
];

const pad5 = (s: string) => (s.length < 5 ? "0".repeat(5 - s.length) + s : s);
const formatSecs = (ms: number) => {
  const clamped = Math.max(0, Math.min(ms, DURATION));
  return pad5((clamped / 1000).toFixed(2));
};

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0);
  const [tickerIdx, setTickerIdx] = useState(0);

  // Refs for values that tick every frame — avoids React reconciliation.
  const elapsedRef = useRef<HTMLSpanElement>(null);
  const remainingRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const serialRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let lastPhase = 0;
    let lastTickerIdx = 0;
    let lastSerialBucket = -1;
    let lastElapsedStr = "";
    let lastRemainingStr = "";
    let lastProgressStr = "";

    const tick = (now: number) => {
      const t0 = now - start;
      const clamped = Math.min(t0, DURATION);

      // Phase: 0..3
      const nextPhase = Math.min(Math.floor(clamped / PHASE_MS), PHASE_COUNT - 1);
      if (nextPhase !== lastPhase) {
        lastPhase = nextPhase;
        setPhase(nextPhase);
      }

      // Ticker idx
      const nextTickerIdx = Math.floor(t0 / TICKER_MS) % TICKER.length;
      if (nextTickerIdx !== lastTickerIdx) {
        lastTickerIdx = nextTickerIdx;
        setTickerIdx(nextTickerIdx);
      }

      // DOM-only updates — no React reconciliation.
      const elapsedStr = formatSecs(clamped);
      if (elapsedStr !== lastElapsedStr && elapsedRef.current) {
        elapsedRef.current.textContent = elapsedStr;
        lastElapsedStr = elapsedStr;
      }

      const remainingStr = formatSecs(DURATION - clamped);
      if (remainingStr !== lastRemainingStr && remainingRef.current) {
        remainingRef.current.textContent = remainingStr;
        lastRemainingStr = remainingStr;
      }

      const progress = Math.min(1, clamped / DURATION);
      const progressStr = (progress * 100).toFixed(1);
      if (progressStr !== lastProgressStr && progressRef.current) {
        progressRef.current.textContent = progressStr + "%";
        lastProgressStr = progressStr;
      }

      const serialBucket = Math.floor(clamped / 55);
      if (serialBucket !== lastSerialBucket && serialRef.current) {
        const s = ((serialBucket * 7919 + 1337) % 9999).toString().padStart(4, "0");
        serialRef.current.textContent = s;
        lastSerialBucket = serialBucket;
      }

      if (t0 < DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        setVisible(false);
        document.documentElement.dataset.loaded = "true";
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const current = phases[phase];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015, filter: "blur(4px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center select-none overflow-hidden"
          style={{ background: "var(--cream)" }}
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, transparent 55%, rgba(15,12,9,0.05) 100%)",
            }}
          />

          {/* Giant watermark chapter numeral — cycles with phase */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={current.numeral}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 0.12, scale: 1 }}
                exit={{ opacity: 0, scale: 1.06 }}
                transition={{ duration: 0.42, ease: EASE }}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(20rem, 48vw, 56rem)",
                  color: "var(--obsidian)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.04em",
                  fontFeatureSettings: '"liga","dlig","swsh","salt","ss01","ss02","kern"',
                  userSelect: "none",
                  willChange: "transform, opacity",
                }}
              >
                {current.numeral}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Constellation sparks */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {CONSTELLATION.map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.9, 0.5, 0.9, 0.6], scale: 1 }}
                transition={{
                  opacity: {
                    duration: 2.4,
                    delay: c.delay,
                    times: [0, 0.15, 0.5, 0.75, 1],
                    ease: EASE,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                  scale: { duration: 0.7, delay: c.delay, ease: EASE },
                }}
                className="absolute"
                style={{
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  width: c.size,
                  height: c.size,
                  borderRadius: "50%",
                  background: "var(--amber)",
                  boxShadow: "0 0 6px rgba(200,160,106,0.6)",
                  willChange: "transform, opacity",
                }}
              />
            ))}
          </div>

          {/* Scanner sweep — thin amber line crosses the stage once.
              Uses y transform (not top) to stay on compositor, no layout. */}
          <motion.span
            aria-hidden="true"
            initial={{ y: "-3vh", opacity: 0 }}
            animate={{ y: "103vh", opacity: [0, 0.55, 0.55, 0] }}
            transition={{
              y: { duration: 4.4, ease: "linear", delay: 0.7 },
              opacity: {
                duration: 4.4,
                times: [0, 0.06, 0.94, 1],
                delay: 0.7,
                ease: "linear",
              },
            }}
            className="absolute left-0 right-0 top-0 pointer-events-none"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, var(--amber) 48%, var(--amber) 52%, transparent)",
              filter: "blur(0.4px)",
              willChange: "transform, opacity",
            }}
          />

          {/* Ambient drifting flourish paths */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1400 800"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.4 }}
          >
            <motion.path
              d="M -40,520 C 220,360 480,640 720,420 S 1200,220 1460,480"
              fill="none"
              stroke="var(--amber)"
              strokeWidth="0.6"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3.2, ease: [0.65, 0, 0.35, 1], delay: 0.25 }}
            />
            <motion.path
              d="M 160,180 Q 720,60 1260,220"
              fill="none"
              stroke="var(--amber)"
              strokeWidth="0.45"
              strokeLinecap="round"
              strokeOpacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.6, ease: EASE, delay: 0.6 }}
            />
            <motion.path
              d="M 120,720 C 420,780 960,780 1280,720"
              fill="none"
              stroke="var(--amber)"
              strokeWidth="0.45"
              strokeLinecap="round"
              strokeOpacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: EASE, delay: 0.85 }}
            />
          </svg>

          {/* Corner crosshairs */}
          <Crosshair pos="tl" delay={0.05} />
          <Crosshair pos="tr" delay={0.1} />
          <Crosshair pos="bl" delay={0.15} />
          <Crosshair pos="br" delay={0.2} />

          {/* Top eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-3"
          >
            <span className="h-px w-12" style={{ background: "var(--amber-line)" }} />
            <span
              className="font-mono"
              style={{
                fontSize: 9,
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                color: "var(--fg-4)",
              }}
            >
              The Private Atelier · Imagine Composed
            </span>
            <span className="h-px w-12" style={{ background: "var(--amber-line)" }} />
          </motion.div>

          {/* Typewriter ticker under eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
            style={{ top: "68px" }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 9,
                color: "var(--amber)",
                letterSpacing: "0.1em",
              }}
            >
              »
            </span>
            <div
              className="relative flex items-center"
              style={{ width: 200, justifyContent: "center" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={tickerIdx}
                  initial={{ opacity: 0, y: 4, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -4, filter: "blur(3px)" }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="absolute font-mono"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "var(--fg-3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {TICKER[tickerIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 11,
                color: "var(--amber)",
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              ▌
            </motion.span>
          </motion.div>

          {/* Top-left serial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="absolute top-10 left-16 flex items-center gap-2 pointer-events-none"
          >
            <span
              className="font-mono"
              style={{
                fontSize: 8.5,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--fg-4)",
              }}
            >
              Serial
            </span>
            <span
              ref={serialRef}
              className="font-mono tabular-nums"
              style={{
                fontSize: 10,
                letterSpacing: "0.1em",
                color: "var(--amber)",
              }}
            >
              1337
            </span>
          </motion.div>

          {/* Top-right edition stamp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="absolute top-10 right-16 flex items-center gap-2 pointer-events-none"
          >
            <span
              className="font-mono"
              style={{
                fontSize: 8.5,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--fg-4)",
              }}
            >
              Edition
            </span>
            <span
              className="relative inline-flex"
              style={{ width: 6, height: 6 }}
              aria-hidden="true"
            >
              <motion.span
                animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0"
                style={{ background: "var(--amber)", borderRadius: "50%", willChange: "transform, opacity" }}
              />
              <span
                className="absolute inset-0"
                style={{ background: "var(--amber)", borderRadius: "50%" }}
              />
            </span>
            <span
              className="font-mono tabular-nums"
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "var(--amber)",
              }}
            >
              PRIMA
            </span>
          </motion.div>

          {/* Left vertical label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="absolute left-10 top-1/2 font-mono"
            style={{
              transform: "translateY(-50%) rotate(-90deg)",
              transformOrigin: "left center",
              fontSize: 9,
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              color: "var(--fg-4)",
              whiteSpace: "nowrap",
            }}
          >
            N°&nbsp;MMXXVI · Folio Prima
          </motion.div>

          {/* Right vertical label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="absolute right-10 top-1/2 font-mono"
            style={{
              transform: "translateY(-50%) rotate(90deg)",
              transformOrigin: "right center",
              fontSize: 9,
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              color: "var(--fg-4)",
              whiteSpace: "nowrap",
            }}
          >
            Edition · Made by Hand
          </motion.div>

          {/* Center stage */}
          <div className="relative flex flex-col items-center">
            {/* Chapter marker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="h-px w-14" style={{ background: "var(--divider)" }} />
              <span
                className="font-mono"
                style={{
                  fontSize: 9.5,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--fg-4)",
                }}
              >
                Chapter
              </span>
              <div className="relative" style={{ width: "2.6ch", textAlign: "center" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.numeral}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.32, ease: EASE }}
                    className="font-mono inline-block"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      color: "var(--amber)",
                    }}
                  >
                    {current.numeral}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="h-px w-14" style={{ background: "var(--divider)" }} />
            </motion.div>

            {/* Cycling italic verb + arch behind */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: "min(90vw, 820px)", height: "clamp(260px, 34vw, 360px)" }}
            >
              {/* Arch */}
              <svg
                aria-hidden="true"
                viewBox="0 0 420 380"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 w-full h-full"
                style={{ overflow: "visible" }}
              >
                <motion.path
                  d="M 30,380 L 30,190 Q 30,30 210,30 Q 390,30 390,190 L 390,380"
                  fill="none"
                  stroke="var(--amber)"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  strokeOpacity="0.75"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.1, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
                />
                <motion.path
                  d="M 54,380 L 54,200 Q 54,54 210,54 Q 366,54 366,200 L 366,380"
                  fill="none"
                  stroke="var(--amber)"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  strokeOpacity="0.35"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.0, ease: EASE, delay: 0.55 }}
                />
              </svg>

              {/* Rotating hairline seal inside arch */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  scale: [0.7, 1, 1.025, 1, 1.025, 1],
                }}
                transition={{
                  opacity: { duration: 1.1, delay: 0.8, ease: EASE },
                  scale: {
                    duration: 4.4,
                    delay: 0.8,
                    times: [0, 0.22, 0.45, 0.65, 0.85, 1],
                    ease: "easeInOut",
                  },
                }}
                className="absolute"
                style={{
                  width: "clamp(96px, 11vw, 128px)",
                  height: "clamp(96px, 11vw, 128px)",
                  top: "14%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  willChange: "transform, opacity",
                }}
              >
                {/* Orbital dots (rotating wrapper) */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, ease: "linear", repeat: Infinity }}
                  aria-hidden="true"
                  style={{ willChange: "transform" }}
                >
                  <span
                    className="absolute"
                    style={{
                      top: -3,
                      left: "50%",
                      width: 4,
                      height: 4,
                      marginLeft: -2,
                      borderRadius: "50%",
                      background: "var(--amber)",
                      boxShadow: "0 0 6px rgba(200,160,106,0.7)",
                    }}
                  />
                  <span
                    className="absolute"
                    style={{
                      bottom: -2,
                      left: "50%",
                      width: 2,
                      height: 2,
                      marginLeft: -1,
                      borderRadius: "50%",
                      background: "var(--amber)",
                      opacity: 0.55,
                    }}
                  />
                </motion.div>

                {/* Counter-rotating fleuron orbit */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 14, ease: "linear", repeat: Infinity }}
                  aria-hidden="true"
                  style={{ willChange: "transform" }}
                >
                  <span
                    className="absolute"
                    style={{
                      top: "50%",
                      right: -6,
                      marginTop: -6,
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      color: "var(--amber)",
                      fontSize: 11,
                      lineHeight: 1,
                      opacity: 0.75,
                    }}
                  >
                    ✦
                  </span>
                </motion.div>

                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <g className="seal-ring" style={{ transformOrigin: "100px 100px" }}>
                    <circle
                      cx="100"
                      cy="100"
                      r="92"
                      fill="none"
                      stroke="var(--amber)"
                      strokeWidth="0.6"
                      strokeOpacity="0.75"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="78"
                      fill="none"
                      stroke="var(--amber)"
                      strokeWidth="0.4"
                      strokeOpacity="0.4"
                    />
                    {TICKS.map((t, i) => (
                      <line
                        key={i}
                        x1={t.x1}
                        y1={t.y1}
                        x2={t.x2}
                        y2={t.y2}
                        stroke="var(--amber)"
                        strokeWidth="0.4"
                        strokeOpacity={t.accent ? 0.85 : 0.35}
                      />
                    ))}
                  </g>
                </svg>

                {/* Center fleuron */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    color: "var(--amber)",
                    fontSize: "clamp(26px, 3vw, 34px)",
                    lineHeight: 1,
                  }}
                >
                  ✦
                </motion.span>
              </motion.div>

              {/* Cycling verb — centered below seal inside arch */}
              <div
                className="absolute left-0 right-0 flex items-baseline justify-center"
                style={{ bottom: "12%", height: "1.05em" }}
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={current.verb}
                    initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="loader-name absolute"
                    style={{
                      fontSize: "clamp(2.8rem, 8vw, 6.4rem)",
                      color: "var(--fg-1)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {current.verb}
                  </motion.h1>
                </AnimatePresence>
              </div>
            </div>

            {/* Subtitle italic below arch */}
            <div
              className="relative mt-2 flex items-center justify-center"
              style={{ height: "1.6em", minWidth: "260px" }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.sub}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
                  className="absolute"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
                    color: "var(--fg-3)",
                    letterSpacing: "-0.005em",
                    fontFeatureSettings: '"liga","dlig","swsh","salt","ss01","ss02","kern"',
                  }}
                >
                  {current.sub}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom meta rail */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            style={{ width: "min(92vw, 760px)" }}
          >
            {/* Live timer row */}
            <div className="w-full flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span
                  className="font-mono"
                  style={{
                    fontSize: 8.5,
                    letterSpacing: "0.34em",
                    textTransform: "uppercase",
                    color: "var(--fg-4)",
                  }}
                >
                  T+
                </span>
                <span
                  ref={elapsedRef}
                  className="font-mono tabular-nums"
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    color: "var(--fg-1)",
                  }}
                >
                  00.00
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "var(--fg-4)",
                  }}
                >
                  s
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span
                  ref={progressRef}
                  className="font-mono"
                  style={{
                    fontSize: 8.5,
                    letterSpacing: "0.34em",
                    textTransform: "uppercase",
                    color: "var(--amber)",
                  }}
                >
                  0.0%
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span
                  className="font-mono"
                  style={{
                    fontSize: 8.5,
                    letterSpacing: "0.34em",
                    textTransform: "uppercase",
                    color: "var(--fg-4)",
                  }}
                >
                  T−
                </span>
                <span
                  ref={remainingRef}
                  className="font-mono tabular-nums"
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    color: "var(--fg-1)",
                  }}
                >
                  {TOTAL_S}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "var(--fg-4)",
                  }}
                >
                  s
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="relative w-full overflow-hidden"
              style={{ background: "rgba(15,12,9,0.28)", height: "1px" }}
            >
              <div
                className="loader-bar"
                style={{ "--loader-duration": `${DURATION}ms` } as React.CSSProperties}
              />
              <motion.span
                initial={{ left: "0%", opacity: 0 }}
                animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: DURATION / 1000,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.06, 0.94, 1],
                }}
                className="absolute"
                style={{
                  top: "50%",
                  width: 7,
                  height: 7,
                  marginTop: -3.5,
                  marginLeft: -3.5,
                  borderRadius: "50%",
                  background: "var(--amber)",
                  boxShadow: "0 0 12px rgba(200,160,106,0.7)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Meta footer */}
            <div className="w-full flex items-center justify-between">
              <span
                className="font-mono"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--fg-4)",
                }}
              >
                Imprimatur · MMXXVI
              </span>
              <span
                className="font-mono tabular-nums"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--fg-4)",
                }}
              >
                Of · {TOTAL_S}s
              </span>
              <span
                className="font-mono tabular-nums"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--fg-4)",
                }}
              >
                Chapter {current.numeral} / IV
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Crosshair({ pos, delay = 0 }: { pos: "tl" | "tr" | "bl" | "br"; delay?: number }) {
  const top = pos.startsWith("t") ? 28 : undefined;
  const bottom = pos.startsWith("b") ? 28 : undefined;
  const left = pos.endsWith("l") ? 28 : undefined;
  const right = pos.endsWith("r") ? 28 : undefined;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="absolute pointer-events-none"
      style={{ top, bottom, left, right, width: 16, height: 16 }}
      aria-hidden="true"
    >
      <span
        className="absolute"
        style={{
          top: "50%",
          left: 0,
          right: 0,
          height: "0.5px",
          background: "var(--amber-line)",
        }}
      />
      <span
        className="absolute"
        style={{
          left: "50%",
          top: 0,
          bottom: 0,
          width: "0.5px",
          background: "var(--amber-line)",
        }}
      />
    </motion.div>
  );
}
