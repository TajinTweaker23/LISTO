import { Roboto_Mono } from "next/font/google";
import React, { ReactNode, useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Dialog, Combobox } from "@headlessui/react";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import CustomizationPanel from "./CustomizationPanel";
import ShapeInsert from "./ShapeInsert";
import TableInsert from "./TableInsert";
import Image from "next/image";

// Use a modern, geometric sans-serif font for a more futuristic impression
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: "400" });

export default function Layout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");
  const [settings, setSettings] = useState({
    fontFamily: "Space Grotesk, sans-serif",
    fontColor: "#e4e6fb",
    bgColor: "#1a1b23",
    fontSize: 17,
    musicUrl: "",
    textToSpeech: false,
    highContrast: false,
    deafMode: false,
    blindMode: false,
  });
  const [shapes, setShapes] = useState<string[]>([]);
  const [tables, setTables] = useState<{ rows: number; cols: number }[]>([]);
  const [focusMode, setFocusMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  // Confetti trigger
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // Update shape/table handlers to trigger confetti
  const handleInsertShape = (shape: string) => {
    setShapes([...shapes, shape]);
    triggerConfetti();
  };
  const handleInsertTable = (rows: number, cols: number) => {
    setTables([...tables, { rows, cols }]);
    triggerConfetti();
  };

  // Command palette actions
  const actions = [
    { name: "Toggle Focus Mode", action: () => setFocusMode(f => !f) },
    { name: "Insert Circle", action: () => handleInsertShape("circle") },
    { name: "Insert Square", action: () => handleInsertShape("square") },
    { name: "Insert Triangle", action: () => handleInsertShape("triangle") },
    { name: "Insert Table", action: () => handleInsertTable(2, 2) },
    { name: "Toggle Theme", action: () => setTheme(theme === "dark" ? "light" : "dark") },
  ];
  const [query, setQuery] = useState("");
  const filteredActions = actions.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  // Futuristic gradient backgrounds
  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-br from-[#171824] via-[#24305e] to-[#0f2027]"
      : "bg-gradient-to-br from-[#e0eafc] via-[#cfdef3] to-[#f8f9f3]";

  // Glassmorphism card style for main content
  const glassCard =
    "backdrop-blur-2xl bg-white/10 dark:bg-[#232946]/60 rounded-[2.5rem] shadow-2xl border border-cyan-400/20 dark:border-fuchsia-400/30 ring-2 ring-blue-400/20 dark:ring-pink-400/10";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen transition-all duration-300 ${bgGradient} ${robotoMono.className} relative overflow-x-hidden`}
      style={
        focusMode
          ? { filter: "blur(2.5px) brightness(0.6) grayscale(0.3)" }
          : {}
      }
    >
      {/* Confetti */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <Navbar theme={theme} />
      {/* Animated, layered, glowing background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] bg-gradient-to-br from-indigo-500 via-purple-700 to-pink-500 opacity-40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-cyan-300 via-teal-300 to-blue-600 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[180px] h-[180px] bg-gradient-to-br from-pink-400 via-fuchsia-600 to-sky-400 opacity-20 rounded-full blur-2xl animate-spin-slow" />
      </div>
      <ThemeToggle theme={theme} setTheme={setTheme} />

      {/* Focus Mode Toggle Button */}
      <button
        onClick={() => setFocusMode(f => !f)}
        className="fixed top-8 left-8 z-30 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-bold shadow-lg hover:scale-105 focus:outline-none transition"
        aria-label="Toggle Focus Mode"
      >
        {focusMode ? "Exit Focus Mode" : "Focus Mode"}
      </button>

      {/* Command Palette (Ctrl+K to open) */}
      <button
        onClick={() => setCommandOpen(true)}
        className="fixed top-8 right-8 z-30 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 focus:outline-none transition"
        aria-label="Open Command Palette"
      >
        ⌨️ Command Palette
      </button>
      <Dialog open={commandOpen} onClose={() => setCommandOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative bg-white dark:bg-[#1a1b23] rounded-2xl shadow-2xl p-7 w-full max-w-xl mx-auto border border-sky-400/20">
          <Combobox value={null} onChange={a => { a.action(); setCommandOpen(false); }}>
            <Combobox.Input
              className="w-full p-3 border-none rounded-xl mb-4 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-800 dark:text-gray-100 outline-none text-lg"
              placeholder="Type a command..."
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
            <Combobox.Options>
              {filteredActions.map((a, idx) => (
                <Combobox.Option
                  key={idx}
                  value={a}
                  className="p-3 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900 cursor-pointer transition"
                >
                  {a.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
        </div>
      </Dialog>

      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`flex-1 container mx-auto px-4 py-12 z-10 ${glassCard} shadow-neon`}
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 40px 4px #a21caf33, 0 0 60px 8px #0ff1ce22",
          border: "1.5px solid rgba(255,255,255,0.18)",
        }}
      >
        <CustomizationPanel settings={settings} onChange={setSettings} />
        <ShapeInsert onInsert={handleInsertShape} />
        <TableInsert onInsert={handleInsertTable} />

        <div className="my-6 flex gap-6 flex-wrap justify-center">
          {shapes.map((shape, idx) => (
            <div key={idx} className="transition-transform hover:scale-110">
              {shape === "circle" && (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 via-fuchsia-500 to-cyan-400 shadow-lg border-2 border-white/30" />
              )}
              {shape === "square" && (
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-400 via-blue-400 to-pink-400 shadow-lg border-2 border-white/30" />
              )}
              {shape === "triangle" && (
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "40px solid transparent",
                    borderRight: "40px solid transparent",
                    borderBottom: "70px solid #facc15",
                    filter: "drop-shadow(0 0 16px #facc15cc)",
                  }}
                />
              )}
            </div>
          ))}
          {tables.map((table, idx) => (
            <table
              key={idx}
              className="border-separate border-spacing-1 border border-sky-400/60 bg-white/30 dark:bg-[#232946]/40 rounded-xl shadow-lg mx-4 animate-fade-in"
              style={{ minWidth: 90 }}
            >
              <tbody>
                {Array.from({ length: table.rows }).map((_, r) => (
                  <tr key={r}>
                    {Array.from({ length: table.cols }).map((_, c) => (
                      <td
                        key={c}
                        className="border border-sky-400/40 w-10 h-10 rounded-lg bg-white/60 dark:bg-[#2d2f4a]/60 shadow-inner"
                      ></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
        {children}
      </motion.main>

      {/* Futuristic floating action button with neon glow */}
      <button
        type="button"
        className="fixed bottom-10 right-10 p-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-pink-500/60 transition-all duration-300 border-4 border-white/20 z-20 ring-4 ring-pink-400/30 focus:outline-none focus:ring-8 focus:ring-blue-400/40"
        aria-label="Add"
        tabIndex={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 drop-shadow-neon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Sleek, minimal footer */}
      <footer className="bg-white/40 dark:bg-black/30 text-center p-3 text-xs text-slate-500 rounded-t-xl mt-4 shadow-inner">
        © {new Date().getFullYear()} LISTO
      </footer>
    </div>
  );
}
