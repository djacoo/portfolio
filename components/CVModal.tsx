"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { downloadCV } from "@/lib/generateCV";

interface CVModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CVModal({ open, onClose }: CVModalProps) {
  const [loading, setLoading] = useState<"EN" | "IT" | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
          transition={{ duration: 0.18 }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel"
            style={{
              width: "100%",
              maxWidth: 400,
              borderRadius: 24,
              padding: "32px 32px 28px",
              position: "relative",
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--fg-4)",
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--fg-1)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--fg-4)")}
            >
              <X size={16} />
            </button>

            {/* Title */}
            <p
              className="font-mono text-[9px] tracking-[0.28em] uppercase mb-3"
              style={{ color: "var(--fg-4)" }}
            >
              Download CV
            </p>
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "var(--fg-1)",
                marginBottom: 6,
                lineHeight: 1.2,
              }}
            >
              Choose a language
            </p>
            <p className="text-xs mb-8" style={{ color: "var(--fg-3)", lineHeight: 1.7 }}>
              The CV will be generated and downloaded as a PDF file.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(["EN", "IT"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleDownload(lang)}
                  disabled={loading !== null}
                  className="glass-lift"
                  style={{
                    width: "100%",
                    border: "0.5px solid var(--divider)",
                    borderRadius: 14,
                    padding: "14px 20px",
                    cursor: loading !== null ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "transparent",
                    opacity: loading !== null && loading !== lang ? 0.4 : 1,
                    transition: "opacity 0.15s",
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <p
                      className="font-mono text-[11px] tracking-widest"
                      style={{ color: "var(--fg-1)", fontWeight: 600, marginBottom: 2 }}
                    >
                      {lang === "EN" ? "English" : "Italiano"}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--fg-4)" }}>
                      {lang === "EN" ? "International version" : "Versione italiana"}
                    </p>
                  </div>
                  {loading === lang ? (
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        border: "1.5px solid var(--fg-4)",
                        borderTopColor: "var(--fg-accent)",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                  ) : (
                    <Download size={14} style={{ color: "var(--fg-4)" }} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
