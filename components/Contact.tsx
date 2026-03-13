"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { personal } from "@/lib/data";
import { useCopy } from "@/lib/useCopy";
import Toast from "@/components/Toast";
import SectionHeader from "./SectionHeader";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const socials = [
  { label: "GitHub",    href: personal.github,    icon: Github,      size: 14 },
  { label: "LinkedIn",  href: personal.linkedin,  icon: Linkedin,    size: 14 },
  { label: "Instagram", href: personal.instagram, icon: SiInstagram, size: 13 },
];


export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { copied, copy } = useCopy();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio — ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader label="Say hello" title="Get in Touch" />

        {/* Centered content column */}
        <div className="mx-auto max-w-xl">

          {/* Heading + description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-10"
          >
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "var(--fg-1)",
              }}
            >
              Let&apos;s build something{" "}
              <span className="gradient-text italic">remarkable.</span>
            </h3>
            <p
              className="mt-4 text-sm leading-[1.85]"
              style={{ color: "var(--fg-3)" }}
            >
              Research collaborations, job opportunities, or a conversation about AI —
              drop me a message and I&apos;ll get back to you.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="flex flex-col gap-4"
            style={{
              background: "var(--form-bg)",
              borderRadius: "1.5rem",
              padding: "1.75rem",
              border: "0.5px solid var(--divider)",
            }}
          >
            {/* Name + Email side-by-side in one container */}
            <div className="input-container">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
                required
              />
            </div>

            {/* Message */}
            <div className="input-container">
              <textarea
                placeholder="Message"
                value={form.message}
                onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
                rows={6}
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="iridescent-btn btn-no-sheen w-full mt-1"
              style={{ borderRadius: "12px", padding: "14px 24px" }}
            >
              <span className="btn-text flex items-center justify-center gap-2">
                <Send size={14} />
                Send Message
              </span>
            </motion.button>
          </motion.form>

          {/* Divider + contact links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-5"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
              <span className="font-mono text-[9px] tracking-[0.28em] uppercase shrink-0" style={{ color: "var(--fg-5)" }}>
                or reach me directly
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
            </div>

            <button
              onClick={() => copy(personal.email)}
              className="flex items-center gap-2.5 font-mono text-xs transition-colors duration-200"
              style={{ color: "var(--fg-4)", background: "none", border: "none", cursor: "copy", padding: 0 }}
              onMouseOver={e => (e.currentTarget.style.color = "var(--fg-1)")}
              onMouseOut={e => (e.currentTarget.style.color = "var(--fg-4)")}
            >
              <Mail size={12} />
              {personal.email}
            </button>

            <div className="flex items-center gap-6">
              {socials.map(({ label, href, icon: Icon, size }) => (
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
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center font-mono text-[10px]"
          style={{ color: "var(--fg-4)" }}
        >
          {personal.name} · {new Date().getFullYear()}
        </motion.p>
      </div>

      <Toast message="Email copied to clipboard" visible={copied} />
    </section>
  );
}
