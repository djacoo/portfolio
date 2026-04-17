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
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#08080f",
          position: "relative",
          overflow: "hidden",
          fontFamily: "serif",
        }}
      >
        {/* Soft amber glow — top right */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,160,106,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Top hairline */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(200,160,106,0.6), transparent)",
          }}
        />

        {/* Top row — atelier mark + status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                transform: "rotate(45deg)",
                background: "#c8a06a",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 14,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(239,228,210,0.72)",
              }}
            >
              Portfolio · MMXXVI
            </span>
          </div>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(200,160,106,0.85)",
            }}
          >
            Verona · Italy
          </span>
        </div>

        {/* Name block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(200,160,106,0.9)",
            }}
          >
            — In Brief
          </span>
          <div
            style={{
              fontSize: 128,
              fontStyle: "italic",
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#efe4d2",
            }}
          >
            Jacopo Parretti
          </div>
          <div
            style={{
              fontSize: 28,
              fontStyle: "italic",
              color: "rgba(239,228,210,0.62)",
              letterSpacing: "-0.005em",
            }}
          >
            AI Engineer · Developer · Researcher
          </div>
        </div>

        {/* Bottom row — tags + seal */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Language Models", "Deep Learning", "NLP", "Bioinformatics"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 2,
                    border: "0.5px solid rgba(200,160,106,0.35)",
                    fontSize: 14,
                    fontFamily: "monospace",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(239,228,210,0.8)",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontStyle: "italic",
                color: "#c8a06a",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              jp
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(239,228,210,0.4)",
              }}
            >
              Est. MMXXVI
            </span>
          </div>
        </div>

        {/* Bottom hairline */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(200,160,106,0.6), transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
