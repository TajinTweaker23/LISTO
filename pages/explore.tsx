"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const categories = [
  { emoji: "📰", title: "Breaking News", desc: "Top global stories." },
  { emoji: "🌱", title: "Green Living", desc: "Sustainable lifestyle tips." },
  { emoji: "📚", title: "Books", desc: "Curated reads for the curious mind." },
  { emoji: "⚽", title: "Sports", desc: "Latest highlights & insights." },
  { emoji: "🛠️", title: "DIY", desc: "Creative projects to try." },
  { emoji: "💖", title: "Humanity Wins", desc: "Stories of kindness & hope." },
  { emoji: "💡", title: "Mindfulness", desc: "Live softer, smarter, slower." },
  { emoji: "📣", title: "Get Involved", desc: "Be the change — act locally." }
];

export default function ExploreRebuild() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDark = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.body.className = darkMode ? "bg-[#1b1f1e] text-gray-100" : "bg-[#e9ecef] text-[#2e302f]";
  }, [darkMode]);

  return (
    <main className="min-h-screen px-6 py-8 font-[\'Inter\']">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#3D5A40] dark:text-[#C9EBCB]">
          <span className="mr-2">🔎</span> Explore LISTO
        </h1>
        <button
          onClick={toggleDark}
          className="p-2 rounded-full border dark:border-white border-gray-300 hover:bg-gray-100 dark:hover:bg-[#2c2c2c]"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative overflow-hidden rounded-2xl p-6 shadow-lg bg-gradient-to-br from-white via-sage-50 to-white dark:from-[#252b25] dark:to-[#202220] hover:shadow-2xl"
          >
            <div className="text-4xl mb-3 drop-shadow-sm">{cat.emoji}</div>
            <h3 className="text-xl font-bold mb-1 tracking-tight">{cat.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">{cat.desc}</p>
            <motion.div
              className="absolute top-0 right-0 h-full w-2 bg-[#B8DBCA] dark:bg-[#5f7b70] rounded-tl-2xl"
              layoutId={`stripe-${i}`}
            />
          </motion.div>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold mb-6 text-[#3A4D39] dark:text-[#C9EBCB]">🌍 Trending Topics</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl overflow-hidden bg-white dark:bg-[#252b25] shadow transition border border-gray-200 dark:border-[#333]"
            >
              <div className="h-36 w-full bg-gradient-to-br from-[#C4E7C7] to-[#EAF8E1] dark:from-[#34403A] dark:to-[#2A322E]" />
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1 text-[#3D5A40] dark:text-[#C9EBCB]">Article #{i + 1}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Engaging summary or snippet that entices clicks and curiosity.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-gray-400 mt-14 dark:text-gray-500">
        Built with 🌿 by Team LISTO — A future-forward platform for goal-driven dreamers.
      </footer>
    </main>
  );
}
