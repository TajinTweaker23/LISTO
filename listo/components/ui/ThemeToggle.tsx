import React from "react";
import confetti from "canvas-confetti";
type Props = { theme: string; setTheme: (t: string) => void };

export default function ThemeToggle({ theme, setTheme }: Props) {
  // Animate confetti on theme change
  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.2 },
      colors: theme === "dark" ? ["#fff7ae", "#ffe066"] : ["#bdbdbd", "#22223b"],
    });
  };

  return (
    <button
      className={`absolute top-6 right-6 z-30 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 shadow transition-transform hover:scale-110 focus:outline-none
        ${theme === "dark"
          ? "bg-black/40 text-white ring-2 ring-yellow-400/40"
          : "bg-white/40 text-black ring-2 ring-blue-400/30"}
      `}
      onClick={handleClick}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      style={{
        boxShadow:
          theme === "dark"
            ? "0 0 16px 4px #ffe06688"
            : "0 0 16px 4px #22223b33",
        transition: "box-shadow 0.4s cubic-bezier(.4,2,.6,1)",
      }}
    >
      <span className="inline-block transition-transform duration-500 ease-in-out scale-110">
        <span className="sr-only">
          {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        </span>
        <span
          className={`transition-all duration-500 ease-in-out inline-block ${
            theme === "dark" ? "rotate-0 scale-100" : "rotate-180 scale-90"
          }`}
        >
          {theme === "dark" ? (
            // Moon SVG
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                fill="currentColor"
                className="drop-shadow-[0_0_6px_#ffe066]"
              />
            </svg>
          ) : (
            // Sun SVG
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" fill="currentColor" className="drop-shadow-[0_0_8px_#ffe066]" />
              <g stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            </svg>
          )}
        </span>
      </span>
    </button>
  );
}