"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION = 4500; // ms before exit starts

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), DURATION);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black select-none"
        >
          {/* Subtle scanline texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
            }}
          />

          {/* Glitch text */}
          <h1
            className="glitch mb-12 font-mono"
            data-glitch="LOADING"
            style={{ letterSpacing: "0.3em" }}
          >
            LOADING
          </h1>

          {/* Progress bar track */}
          <div className="w-48 overflow-hidden" style={{ background: "rgba(255,255,255,0.07)", height: "1px" }}>
            <div
              className="loader-bar"
              style={{ "--loader-duration": `${DURATION}ms` } as React.CSSProperties}
            />
          </div>

          {/* Status line */}
          <p
            className="mt-5 font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            Initializing
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
