"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/data";
import SectionHeader from "./SectionHeader";

const typeAccent: Record<string, string> = {
  work:      "rgba(52,211,153,0.85)",   // emerald
  education: "rgba(96,165,250,0.85)",   // blue
  personal:  "rgba(167,139,250,0.85)",  // violet
};

export default function Timeline() {
  return (
    <section id="timeline" className="section">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeader
          label="My journey"
          title="Timeline"
          subtitle="The path that brought me here."
        />

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px sm:left-1/2 sm:-translate-x-px"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, var(--fg-4) 8%, var(--fg-4) 92%, transparent 100%)",
            }}
          />

          <div className="space-y-6">
            {timeline.map((item, i) => {
              const accent = typeAccent[item.type];
              // Alternate left/right on sm+
              const isRight = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    isRight ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Mobile left line + dot / Desktop: dot centered on line */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    className="relative z-10 shrink-0 flex items-center justify-center
                      ml-0 mt-4 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:ml-0"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.25 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.06 + 0.25 }}
                      className="absolute rounded-full pointer-events-none"
                      style={{ width: 22, height: 22, background: accent, filter: "blur(6px)" }}
                    />
                    <div
                      className="relative h-3 w-3 rounded-full"
                      style={{
                        background: accent,
                        border: "2px solid var(--bg-body)",
                        boxShadow: `0 0 10px ${accent}88`,
                      }}
                    />
                  </motion.div>

                  {/* Card — takes up half the width on desktop */}
                  <div
                    className={`flex-1 sm:w-[calc(50%-32px)] sm:flex-none pl-2 sm:pl-0 ${
                      isRight ? "sm:pr-12" : "sm:pl-12"
                    }`}
                  >
                    <div className="glass-panel rounded-2xl p-5 glass-lift">
                      {/* Period badge */}
                      <span
                        className="font-mono text-[10px] tracking-widest uppercase"
                        style={{ color: "var(--fg-4)" }}
                      >
                        {item.period}
                      </span>

                      <div className="mt-2 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3
                            className="font-semibold text-sm leading-snug"
                            style={{ color: "var(--fg-1)" }}
                          >
                            {item.role}
                          </h3>
                          <p
                            className="mt-0.5 text-xs"
                            style={{ color: accent }}
                          >
                            {item.organization}
                          </p>
                        </div>

                        {/* Type pill */}
                        <span
                          className="shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase"
                          style={{
                            color: accent,
                            border: `0.5px solid ${accent}55`,
                            background: `${accent}12`,
                          }}
                        >
                          {item.type}
                        </span>
                      </div>

                      {item.description && (
                        <p
                          className="mt-3 text-xs leading-relaxed"
                          style={{ color: "var(--fg-2)" }}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
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
