import React from "react";
type Props = { theme: string; setTheme: (t: string) => void };
export default function ThemeToggle({ theme, setTheme }: Props) {
  return (
    <button
      className="absolute top-6 right-6 z-30 px-4 py-2 rounded-full bg-white/20 dark:bg-black/30 text-black dark:text-white border border-gray-300 dark:border-gray-700 shadow"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}