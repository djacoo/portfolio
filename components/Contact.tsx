"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { personal } from "@/lib/data";
import { useCopy } from "@/lib/useCopy";
import Toast from "@/components/Toast";
import { Reveal, RevealWords } from "@/components/ScrollReveal";

const SCRIBBLE_A = "M 80,100 C 240,240 80,420 220,560 C 360,700 120,820 280,880";
const SCRIBBLE_B = "M 1180,80 Q 1320,240 1200,420 T 1320,820";

const socials = [
  { label: "GitHub",    href: personal.github,    icon: Github },
  { label: "LinkedIn",  href: personal.linkedin,  icon: Linkedin },
  { label: "Instagram", href: personal.instagram, icon: SiInstagram },
];

const BURST_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315, 22, 67, 112, 157];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [burst, setBurst] = useState(false);
  const { copied, copy } = useCopy();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
    const subject = encodeURIComponent(`Portfolio — ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contact"
      className="section section--cream relative overflow-hidden"
    >
      <motion.span
        initial={{ y: 60, x: "-50%" }}
        whileInView={{ y: -100, x: "-50%" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          top: "2%",
          left: "50%",
          fontSize: "clamp(13rem, 30vw, 28rem)",
        }}
        className="ghost"
        aria-hidden="true"
      >
        Hello
      </motion.span>

      {/* Scribble */}
      <svg className="scribble-layer" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d={SCRIBBLE_A}
          className="scribble"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 3.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={SCRIBBLE_B}
          className="scribble"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 3.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      {/* Vertical rail */}
      <div className="hidden lg:block absolute left-4 top-[14%] z-10">
        <span className="side-rail-v">Chapter VII · Correspondence & Reply</span>
      </div>

      <div className="mx-auto max-w-4xl px-6 relative z-10">

        <div className="mb-14">
          <Reveal>
            <div className="flex items-baseline gap-3 justify-center">
              <span className="section-marker" style={{ fontSize: 22 }}>(VII)</span>
              <span className="eyebrow-micro">Chapter 07 · Correspondence</span>
            </div>
          </Reveal>
          <Reveal delay={80} className="mt-4">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-7" style={{ background: "var(--amber-line)" }} />
              <span className="eyebrow">Say hello</span>
              <span className="h-px w-7" style={{ background: "var(--amber-line)" }} />
            </div>
          </Reveal>
          <div className="mt-8 text-center">
            <RevealWords
              text="Send"
              as="h2"
              italic
              delay={140}
              className="display display-lg"
            />
            <RevealWords
              text="a request."
              as="h2"
              italic
              delay={300}
              className="display display-lg"
            />
          </div>
          <Reveal delay={520} className="mt-8 max-w-lg mx-auto text-center">
            <p className="footnote" style={{ color: "var(--fg-2)" }}>
              Research collaborations, job opportunities, or a quiet conversation about language models — write and I&apos;ll respond within a day.
            </p>
          </Reveal>
        </div>

        {/* Correspondence metadata strip */}
        <Reveal delay={100} className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { k: "Office hours",      v: "09:00 — 21:00 CET" },
            { k: "Reply window",      v: "Within one day" },
            { k: "Preferred medium",  v: "Email · LinkedIn" },
            { k: "Language",          v: "EN · IT" },
          ].map((m) => (
            <div
              key={m.k}
              className="flex flex-col gap-1 pt-4"
              style={{ borderTop: "0.5px solid var(--divider)" }}
            >
              <span className="eyebrow-micro">{m.k}</span>
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 17,
                  color: "var(--fg-2)",
                  fontFeatureSettings: '"swsh","salt","ss01"',
                  letterSpacing: "-0.008em",
                }}
              >
                {m.v}
              </span>
            </div>
          ))}
        </Reveal>

        {/* Monogram seal — gothic arch portal */}
        <Reveal delay={100}>
          <div className="flex justify-center mb-10">
            <div style={{
              width: 78, height: 104,
              borderRadius: "50% 50% 2px 2px / 65% 65% 2px 2px",
              border: "0.5px solid var(--amber-line)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}>
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 6,
                  borderRadius: "inherit",
                  border: "0.5px solid rgba(200,160,106,0.28)",
                  pointerEvents: "none",
                }}
              />
              <span style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: 30,
                color: "var(--amber)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                fontFeatureSettings: '"swsh", "salt"',
              }}>
                jp
              </span>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={180}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-8 rounded-[36px]"
            style={{
              background: "var(--field-shell)",
              border: "0.5px solid var(--divider)",
              backdropFilter: "blur(8px) saturate(1.05)",
              WebkitBackdropFilter: "blur(8px) saturate(1.05)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="field-shell">
                <input
                  className="field-input"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
                  required
                />
              </div>
              <div className="field-shell">
                <input
                  className="field-input"
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="field-shell">
              <textarea
                className="field-input"
                placeholder="Your message"
                value={form.message}
                onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
                rows={6}
                required
              />
            </div>

            <div className="relative">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.99 }}
                className="btn-pill btn-pill--filled w-full justify-center"
                style={{ padding: "1rem 1.5rem", fontSize: 11 }}
              >
                <Send size={12} />
                Seek Admission
              </motion.button>
              <AnimatePresence>
                {burst && BURST_ANGLES.map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const tx = Math.cos(rad) * 48;
                  const ty = Math.sin(rad) * 24;
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{ opacity: 0, x: tx, y: ty, scale: 0.4 }}
                      exit={{}}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--amber)",
                        pointerEvents: "none",
                        marginLeft: -3,
                        marginTop: -3,
                      }}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>

        {/* Divider + contact links */}
        <Reveal delay={260} className="mt-14 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
            <span className="eyebrow shrink-0" style={{ fontSize: 9 }}>
              or reach directly
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
          </div>

          <button
            onClick={() => copy(personal.email)}
            className="editorial-link flex items-center gap-2.5"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: 26,
              color: "var(--fg-1)",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            <Mail size={16} />
            {personal.email}
          </button>

          <div className="flex items-center gap-8">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link flex items-center gap-2"
                style={{ color: "var(--fg-3)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}
              >
                <Icon size={13} />
                {label}
              </a>
            ))}
          </div>
        </Reveal>

        {/* Footer — obsidian-assembly style bottom line */}
        <div className="mt-24 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "0.5px solid var(--divider)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: 18,
              color: "var(--fg-2)",
            }}
          >
            Jacopo Parretti
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--fg-4)" }}>
            © {new Date().getFullYear()} · Operating from Verona
          </span>
        </div>
      </div>

      <Toast message="Email copied to clipboard" visible={copied} />
    </section>
  );
}
