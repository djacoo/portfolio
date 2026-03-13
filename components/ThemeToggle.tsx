"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // checked = night/dark, unchecked = day/light
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") !== "light";
    setDark(isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <div className="fixed top-6 right-20 z-50 hidden md:block" style={{ position: "fixed", transform: "scale(0.7)", transformOrigin: "top right" }}>
      <input
        id="theme-toggle"
        type="checkbox"
        className="toggle-input"
        checked={dark}
        onChange={toggle}
        aria-label="Toggle dark/light mode"
      />
      <label htmlFor="theme-toggle" className="toggle">
        <div className="toggle__handler">
          <span className="crater crater--1" />
          <span className="crater crater--2" />
          <span className="crater crater--3" />
        </div>
        <span className="star star--1" />
        <span className="star star--2" />
        <span className="star star--3" />
        <span className="star star--4" />
        <span className="star star--5" />
        <span className="star star--6" />
      </label>
    </div>
  );
}
