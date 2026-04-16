"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personal, about } from "@/lib/data";
import { useCopy } from "@/lib/useCopy";
import Toast from "@/components/Toast";
import { Reveal, RevealWords } from "@/components/ScrollReveal";

const SCRIBBLE_D = "M 1200,60 C 1100,200 1360,340 1260,480 C 1180,600 1380,720 1200,840";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const BASE_STATS = [
  { label: "Projects",     target: 6,  suffix: "" },
  { label: "Years coding", target: 4,  suffix: "+" },
  { label: "Degrees",      target: 2,  suffix: "" },
];

const currently = [
  { role: "MSc Artificial Intelligence", org: "Università di Verona" },
  { role: "Data Analyst",                org: "JD Sports & Fashion" },
  { role: "Open-Source Contributor",     org: "GitHub" },
];

const principles = [
  { n: "i",   title: "Rigour over novelty",    note: "Understanding why systems work outlasts the systems themselves." },
  { n: "ii",  title: "Code meets reality",     note: "Write software that survives contact with production." },
  { n: "iii", title: "Data before opinion",    note: "Measure, then argue — never the reverse." },
  { n: "iv",  title: "Craft is slow",          note: "Taste compounds. Shortcuts do not." },
];

const info = [
  { label: "Based in", value: personal.location,  href: undefined,                        copy: false },
  { label: "GitHub",   value: "@djacoo",           href: personal.github,                  copy: false },
  { label: "Email",    value: personal.email,      href: `mailto:${personal.email}`,       copy: true,  copyText: personal.email    },
  { label: "Academic", value: personal.emailUni,   href: `mailto:${personal.emailUni}`,    copy: true,  copyText: personal.emailUni },
];

export default function About() {
  const { copied, copy } = useCopy();
  const [repoCount, setRepoCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/djacoo")
      .then(r => r.json())
      .then(d => { if (typeof d.public_repos === "number") setRepoCount(d.public_repos); })
      .catch(() => {});
  }, []);

  const stats = [
    ...BASE_STATS,
    ...(repoCount !== null
      ? [{ label: "Repos", target: repoCount, suffix: "" }]
      : []),
  ];

  return (
    <section
      id="about"
      className="section section--cream relative overflow-hidden"
    >
      {/* Scribble trace */}
      <svg className="scribble-layer" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d={SCRIBBLE_D}
          className="scribble"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 3.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <motion.span
        initial={{ x: -60 }}
        whileInView={{ x: 60 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="ghost"
        aria-hidden="true"
      >
        <span style={{ fontSize: "clamp(10rem, 28vw, 26rem)" }}>Story</span>
      </motion.span>

      {/* Vertical rail label — left edge */}
      <div className="hidden lg:block absolute left-4 top-[18%] z-10">
        <span className="side-rail-v">Chapter I · Principle Preceding Practice</span>
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">

        {/* Header */}
        <div className="mb-16 sm:mb-24">
          <Reveal>
            <div className="flex items-baseline gap-3">
              <span className="section-marker" style={{ fontSize: 22 }}>(I)</span>
              <span className="eyebrow-micro">Chapter 01 · Principle</span>
            </div>
          </Reveal>
          <Reveal delay={80} className="mt-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-7" style={{ background: "var(--amber-line)" }} />
              <span className="eyebrow">Who I am</span>
            </div>
          </Reveal>
          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <RevealWords text="Principle" as="h2" stagger={0} delay={140} italic className="display display-lg" />
              <RevealWords text="thought as craft" as="p" stagger={90} delay={360} italic className="display display-sm mt-3" />
            </div>
            <Reveal delay={520} className="max-w-sm md:text-right">
              <p className="footnote">
                Objects are not designed first and placed later. They are formed within a practice and only leave once complete.
              </p>
              <p className="eyebrow-micro mt-2">§ 01 — On method</p>
            </Reveal>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left column — body */}
          <div className="lg:col-span-8">
            <Reveal>
              <p
                className="body-serif drop-cap"
                style={{
                  fontSize: "clamp(1.4rem, 2.2vw, 1.95rem)",
                  color: "var(--fg-1)",
                  lineHeight: 1.3,
                }}
              >
                <span style={{ color: "var(--amber)", fontSize: "1.2em", lineHeight: 0, verticalAlign: "-0.1em", marginRight: "0.05em" }}>·</span>
                &ldquo;I came to computer science through biology. That detour taught me to
                think algorithmically about messy, high-dimensional data — a foundation
                that maps cleanly onto modern machine learning.&rdquo;
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-10 space-y-6">
              {about.paragraphs.slice(1).map((p, i) => (
                <p key={i} className="text-[14px] leading-[1.95] max-w-[48ch]" style={{ color: "var(--fg-2)" }}>
                  {p}
                </p>
              ))}
            </Reveal>

            {/* Principles list — numbered editorial rows */}
            <Reveal delay={180} className="mt-14">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="section-marker" style={{ fontSize: 16 }}>§</span>
                <span className="eyebrow">Four principles</span>
                <span className="flex-1 h-px" style={{ background: "var(--divider)" }} />
              </div>
              <ul className="divide-y" style={{ borderColor: "var(--divider)" }}>
                {principles.map((p) => (
                  <li key={p.n} className="grid grid-cols-12 gap-4 py-5" style={{ borderTop: "0.5px solid var(--divider)" }}>
                    <div className="col-span-1">
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontStyle: "italic",
                          fontSize: 17,
                          color: "var(--amber)",
                          fontFeatureSettings: '"swsh","salt","ss01"',
                        }}
                      >
                        {p.n}.
                      </span>
                    </div>
                    <div className="col-span-11 sm:col-span-4">
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontStyle: "italic",
                          fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)",
                          color: "var(--fg-1)",
                          letterSpacing: "-0.008em",
                          fontFeatureSettings: '"swsh","salt","ss01"',
                        }}
                      >
                        {p.title}
                      </span>
                    </div>
                    <p className="col-span-12 sm:col-span-7 text-[13px] leading-[1.85]" style={{ color: "var(--fg-3)" }}>
                      {p.note}
                    </p>
                  </li>
                ))}
                <li className="h-0" style={{ borderTop: "0.5px solid var(--divider)" }} />
              </ul>
            </Reveal>

            {/* Interests — italic comma-list like inspo */}
            <Reveal delay={220} className="mt-12">
              <p className="eyebrow-micro mb-3">Current preoccupations</p>
              <p className="tag-serif" style={{ lineHeight: 1.5 }}>
                {about.interests.map((t, i) => (
                  <span key={t}>
                    {t}
                    {i < about.interests.length - 1 && (
                      <span style={{ color: "var(--amber)", margin: "0 0.5em" }}>·</span>
                    )}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>

          {/* Right rail */}
          <div className="lg:col-span-4 lg:pt-16 flex flex-col gap-10">

            {/* Currently */}
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-5" style={{ background: "var(--amber)" }} />
                  <span className="eyebrow" style={{ color: "var(--amber)" }}>Currently</span>
                </div>
                <ul className="space-y-3">
                  {currently.map((c) => (
                    <li key={c.role} className="flex items-baseline gap-1.5">
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontStyle: "italic",
                          fontSize: 17,
                          color: "var(--fg-1)",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          fontFeatureSettings: '"swsh","salt","ss01"',
                        }}
                      >
                        {c.role}
                      </span>
                      <span style={{
                        flex: 1,
                        borderBottom: "1px dotted var(--fg-5)",
                        marginBottom: "0.25em",
                        minWidth: 8,
                      }} />
                      <span className="eyebrow-micro" style={{ whiteSpace: "nowrap" }}>
                        {c.org}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={120}>
              <div>
                <p className="eyebrow-micro mb-3">Ledger</p>
                <ul>
                  {stats.map(({ label, target, suffix }) => (
                    <li key={label} className="pair-row">
                      <span className="pair-label">{label}</span>
                      <span
                        className="num-monument"
                        style={{ fontSize: "2.3rem" }}
                      >
                        <Counter target={target} suffix={suffix} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Reading now — decorative fill */}
            <Reveal delay={160}>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-5" style={{ background: "var(--amber-line)" }} />
                  <span className="eyebrow-micro" style={{ color: "var(--amber)" }}>Reading</span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    { t: "Deep Learning",              a: "Goodfellow · Bengio" },
                    { t: "Probabilistic ML",           a: "Kevin P. Murphy" },
                    { t: "The Elements of Computing", a: "Nisan · Schocken" },
                  ].map((b) => (
                    <li key={b.t} className="flex items-baseline gap-2">
                      <span style={{
                        fontFamily: "var(--font-cormorant)",
                        fontStyle: "italic",
                        fontSize: 15,
                        color: "var(--fg-1)",
                        fontFeatureSettings: '"swsh","salt","ss01"',
                      }}>{b.t}</span>
                      <span style={{
                        flex: 1,
                        borderBottom: "1px dotted var(--fg-5)",
                        marginBottom: "0.2em",
                      }} />
                      <span className="eyebrow-micro" style={{ fontSize: 8.5 }}>{b.a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Contact rows */}
            <Reveal delay={200}>
              <div>
                <p className="eyebrow-micro mb-3">Directory</p>
                <ul className="space-y-2.5">
                  {info.map(({ label, value, href, copy: isCopy, copyText }) => (
                    <li key={label} className="flex items-center justify-between gap-4">
                      <span className="eyebrow shrink-0" style={{ fontSize: 9 }}>{label}</span>
                      {href ? (
                        <a
                          href={isCopy ? undefined : href}
                          target={!isCopy && !href.startsWith("mailto") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          onClick={isCopy ? (e) => { e.preventDefault(); copy(copyText!); } : undefined}
                          className="editorial-link truncate"
                          style={{
                            color: "var(--fg-1)",
                            fontFamily: "var(--font-cormorant)",
                            fontSize: 15,
                            fontStyle: "italic",
                            fontFeatureSettings: '"swsh","salt","ss01"',
                          }}
                        >
                          {value}
                        </a>
                      ) : (
                        <span
                          className="truncate"
                          style={{
                            color: "var(--fg-2)",
                            fontFamily: "var(--font-cormorant)",
                            fontSize: 15,
                            fontStyle: "italic",
                          }}
                        >
                          {value}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Toast message="Email copied to clipboard" visible={copied} />
    </section>
  );
}
