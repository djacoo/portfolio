"use client";

interface Props {
  position: "top" | "bottom";
  fill: "cream" | "obsidian";
  variant?: "round" | "soft";
}

const FILLS = {
  cream:    "var(--cream)",
  obsidian: "var(--obsidian)",
};

export default function SectionCurve({ position, fill, variant = "round" }: Props) {
  const d =
    variant === "round"
      ? "M0,0 L0,80 Q720,210 1440,80 L1440,0 Z"
      : "M0,0 L0,90 C360,160 1080,160 1440,90 L1440,0 Z";

  return (
    <div className={`curve curve--${position}`}>
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          transform: position === "top" ? "scaleY(-1)" : undefined,
        }}
      >
        <path d={d} fill={FILLS[fill]} />
      </svg>
    </div>
  );
}
