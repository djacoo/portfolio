import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jacopo Parretti — AI Engineer & Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "72px 80px",
          background: "#08080f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow — top left violet */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -80,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
          }}
        />
        {/* Ambient glow — bottom right cyan */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Hairline top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, rgba(167,139,250,0.8), rgba(96,165,250,0.6), transparent)",
          }}
        />

        {/* Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(167,139,250,1)",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(167,139,250,0.85)",
            }}
          >
            Portfolio
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 20,
            background:
              "linear-gradient(135deg, rgba(192,184,255,1) 0%, rgba(167,139,250,1) 50%, rgba(128,216,255,1) 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Jacopo Parretti
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.01em",
            marginBottom: 48,
          }}
        >
          AI Engineer &amp; Developer · MSc Artificial Intelligence
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {["LLMs", "Deep Learning", "NLP", "Bioinformatics"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                border: "1px solid rgba(167,139,250,0.25)",
                background: "rgba(167,139,250,0.08)",
                fontSize: 14,
                color: "rgba(192,184,255,0.8)",
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
