import { Roboto_Mono } from "next/font/google";
import React, { ReactNode, useState, useEffect } from "react";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import Image from "next/image";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: "400" });

export default function Layout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  // Futuristic gradient backgrounds
  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-br from-[#181824] via-[#232946] to-[#0f2027]"
      : "bg-gradient-to-br from-[#e0eafc] via-[#cfdef3] to-[#f8f9f3]";

  // Glassmorphism card style for main content
  const glassCard =
    "backdrop-blur-xl bg-white/10 dark:bg-[#232946]/40 rounded-3xl shadow-2xl border border-cyan-400/30 dark:border-fuchsia-400/30 ring-2 ring-pink-400/10 dark:ring-blue-400/10";

  return (
    <div
      className={`flex flex-col min-h-screen transition-all duration-300 ${bgGradient} ${robotoMono.className} relative overflow-x-hidden`}
    >
      <Navbar theme={theme} />
      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-green-400 via-cyan-400 to-blue-500 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[180px] h-[180px] bg-gradient-to-br from-pink-400 via-fuchsia-500 to-blue-500 opacity-20 rounded-full blur-2xl animate-spin-slow" />
      </div>
      <ThemeToggle theme={theme} setTheme={setTheme} />

      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`flex-1 container mx-auto px-4 py-12 z-10 ${glassCard} shadow-neon`}
        style={{
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 40px 4px #a21caf33",
          border: "1.5px solid rgba(255,255,255,0.12)",
        }}
      >
        {children}
      </motion.main>

      {/* Futuristic floating action button with glow */}
      <button
        type="button"
        className="fixed bottom-8 right-8 p-5 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-pink-500/60 transition-all duration-300 border-4 border-white/20 z-20 ring-4 ring-pink-400/30 focus:outline-none focus:ring-8 focus:ring-blue-400/40"
        aria-label="Add"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 drop-shadow-neon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <Footer />
      <div className="relative w-64 h-64">
        <Image
          src="..."
          alt="..."
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
