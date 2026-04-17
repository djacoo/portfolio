import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08080f",
          color: "#c8a06a",
          fontSize: 320,
          fontWeight: 700,
          fontStyle: "italic",
          letterSpacing: "-0.06em",
          fontFamily: "serif",
        }}
      >
        jp
      </div>
    ),
    { ...size }
  );
}
