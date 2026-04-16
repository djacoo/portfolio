"use client";

/**
 * Static warm wash behind the page.
 *
 * The three blurred blobs were burning the compositor (filter: blur(44px)
 * on 60vw elements = huge offscreen buffers, re-composited on every scroll
 * because fixed layers move relative to the page). We keep the exact
 * visual by replacing them with a single fixed `<div>` whose background
 * is three stacked radial gradients — already "pre-blurred" by the
 * gradient stops, so no `filter: blur()` work is needed.
 */
export default function BackgroundScene() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        contain: "strict",
        backgroundColor: "transparent",
        backgroundImage: [
          // b1: top-left warm amber
          "radial-gradient(40vw 40vh at 15% 10%, rgba(200,160,106,0.11), rgba(200,160,106,0) 70%)",
          // b2: right-middle deeper amber
          "radial-gradient(35vw 38vh at 95% 55%, rgba(180,138,90,0.09), rgba(180,138,90,0) 70%)",
          // b3: bottom-left cool amber
          "radial-gradient(45vw 35vh at 20% 95%, rgba(160,118,76,0.08), rgba(160,118,76,0) 70%)",
        ].join(","),
      }}
    />
  );
}
