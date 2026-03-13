"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface ToastProps {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: 12,
            background: "rgba(24,24,26,0.94)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "0.5px solid rgba(255,255,255,0.14)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
            color: "rgba(255,255,255,0.88)",
            fontSize: 13,
            fontFamily: "var(--font-geist-sans)",
            fontWeight: 450,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <Check size={14} style={{ color: "rgba(52,211,153,0.95)", flexShrink: 0 }} />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
