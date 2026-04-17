"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { downloadCV } from "@/lib/generateCV";

interface CVModalProps {
  open: boolean;
  onClose: () => void;
}

const langs = [
  {
    code: "EN" as const,
    numeral: "I",
    title: "English",
    sub: "International edition",
    note: "Latin script · A4 · 2 pp.",
  },
  {
    code: "IT" as const,
    numeral: "II",
    title: "Italiano",
    sub: "Edizione italiana",
    note: "Scrittura latina · A4 · 2 pp.",
  },
];

export default function CVModal({ open, onClose }: CVModalProps) {
  const [loading, setLoading] = useState<"EN" | "IT" | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => firstButtonRef.current?.focus(), 80);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      const opener = openerRef.current as HTMLElement | null;
      opener?.focus?.();
    };
  }, [open, onClose]);

  async function handleDownload(lang: "EN" | "IT") {
    setLoading(lang);
    await downloadCV(lang);
    setLoading(null);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,12,9,0.52)",
            backdropFilter: "blur(6px) saturate(1.05)",
            WebkitBackdropFilter: "blur(6px) saturate(1.05)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 18, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.975 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
            aria-describedby="cv-modal-desc"
            style={{
              width: "100%",
              maxWidth: 460,
              background: "var(--cream)",
              border: "0.5px solid var(--amber-line)",
              borderRadius: 20,
              padding: "28px 28px 24px",
              position: "relative",
              boxShadow:
                "0 24px 60px -20px rgba(15,12,9,0.28), 0 2px 0 rgba(200,160,106,0.08) inset",
              overflow: "hidden",
            }}
          >
            {/* Inner frame hairline */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 8,
                borderRadius: 14,
                border: "0.5px solid rgba(200,160,106,0.22)",
                pointerEvents: "none",
              }}
            />

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              type="button"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "transparent",
                border: "0.5px solid var(--divider)",
                cursor: "pointer",
                color: "var(--fg-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                transition: "color 0.18s, border-color 0.18s, background 0.18s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "var(--ink)";
                e.currentTarget.style.borderColor = "var(--amber)";
                e.currentTarget.style.background = "var(--amber-ghost)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "var(--fg-2)";
                e.currentTarget.style.borderColor = "var(--divider)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <X size={13} strokeWidth={1.5} />
            </button>

            {/* Editorial header */}
            <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginTop: 6 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ height: 1, width: 28, background: "var(--amber-line)" }} />
                <span
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "var(--fg-3)",
                  }}
                >
                  Appendix · Curriculum
                </span>
                <span style={{ height: 1, width: 28, background: "var(--amber-line)" }} />
              </div>

              <h2
                id="cv-modal-title"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: "2rem",
                  lineHeight: 1.05,
                  color: "var(--fg-1)",
                  letterSpacing: "-0.018em",
                  fontFeatureSettings: '"liga","dlig","swsh","salt","ss01","kern"',
                  margin: 0,
                }}
              >
                The curriculum,
                <br />
                <span style={{ color: "var(--amber)" }}>in two tongues.</span>
              </h2>

              <p
                id="cv-modal-desc"
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: "var(--fg-2)",
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  letterSpacing: "-0.004em",
                  fontFeatureSettings: '"swsh","salt","ss01"',
                }}
              >
                Choose an edition — the archive compiles a PDF and
                delivers it to your device.
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                marginTop: 20,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 10,
                position: "relative",
                zIndex: 1,
              }}
            >
              <div style={{ flex: 1, height: 1, background: "var(--divider)" }} />
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 13,
                  color: "var(--amber)",
                  letterSpacing: "-0.01em",
                  fontFeatureSettings: '"swsh","salt"',
                }}
              >
                ✦
              </span>
              <div style={{ flex: 1, height: 1, background: "var(--divider)" }} />
            </div>

            {/* Language editions */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                position: "relative",
                zIndex: 1,
              }}
            >
              {langs.map((l, idx) => {
                const isLoading = loading === l.code;
                const isDisabled = loading !== null && !isLoading;
                return (
                  <button
                    key={l.code}
                    ref={idx === 0 ? firstButtonRef : undefined}
                    onClick={() => handleDownload(l.code)}
                    disabled={loading !== null}
                    type="button"
                    aria-label={`Download CV in ${l.title}`}
                    aria-busy={isLoading}
                    data-hover
                    className="cv-edition"
                    style={{
                      width: "100%",
                      background: "rgba(239,228,210,0.55)",
                      border: "0.5px solid var(--divider)",
                      borderRadius: 12,
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      textAlign: "left",
                      cursor: loading !== null ? "not-allowed" : "pointer",
                      opacity: isDisabled ? 0.35 : 1,
                      transition:
                        "background 0.22s ease, border-color 0.22s ease, transform 0.22s ease",
                      fontFamily: "inherit",
                      color: "inherit",
                    }}
                    onMouseOver={(e) => {
                      if (loading !== null) return;
                      e.currentTarget.style.background = "rgba(200,160,106,0.09)";
                      e.currentTarget.style.borderColor = "var(--amber)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(239,228,210,0.55)";
                      e.currentTarget.style.borderColor = "var(--divider)";
                    }}
                  >
                    {/* Numeral */}
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontStyle: "italic",
                        fontSize: 26,
                        lineHeight: 1,
                        color: "var(--amber)",
                        minWidth: 26,
                        textAlign: "center",
                        letterSpacing: "-0.02em",
                        fontFeatureSettings: '"swsh","salt"',
                      }}
                    >
                      {l.numeral}
                    </span>

                    {/* Vertical hairline */}
                    <span
                      aria-hidden="true"
                      style={{
                        width: 1,
                        alignSelf: "stretch",
                        background: "var(--amber-line)",
                      }}
                    />

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 8,
                          marginBottom: 2,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-cormorant)",
                            fontStyle: "italic",
                            fontSize: 18,
                            color: "var(--fg-1)",
                            letterSpacing: "-0.012em",
                            fontFeatureSettings: '"liga","dlig","swsh","salt","ss01","kern"',
                          }}
                        >
                          {l.title}
                        </span>
                        <span
                          className="font-mono"
                          style={{
                            fontSize: 8.5,
                            letterSpacing: "0.24em",
                            textTransform: "uppercase",
                            color: "var(--fg-4)",
                          }}
                        >
                          {l.sub}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: 10.5,
                          color: "var(--fg-3)",
                          letterSpacing: "0.02em",
                          margin: 0,
                        }}
                      >
                        {l.note}
                      </p>
                    </div>

                    {/* Trailing icon */}
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: "0.5px solid var(--amber-line)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--amber)",
                        flexShrink: 0,
                      }}
                    >
                      {isLoading ? (
                        <span
                          aria-label="Downloading"
                          style={{
                            width: 12,
                            height: 12,
                            border: "1.3px solid var(--amber-line)",
                            borderTopColor: "var(--amber)",
                            borderRadius: "50%",
                            animation: "sealRotate 0.7s linear infinite",
                          }}
                        />
                      ) : (
                        <ArrowUpRight size={13} strokeWidth={1.4} />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer caption */}
            <p
              style={{
                marginTop: 18,
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                fontSize: 9,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--fg-4)",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              Press ESC to dismiss · MMXXVI
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
