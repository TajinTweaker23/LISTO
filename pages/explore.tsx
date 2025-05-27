"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const mockCategories = [
  { emoji: "📰", title: "Breaking News", desc: "Top global stories" },
  { emoji: "🌱", title: "Green Living", desc: "Sustainable lifestyle" },
  { emoji: "📚", title: "Books", desc: "Curated reads" },
  { emoji: "⚽", title: "Sports", desc: "Game highlights & analysis" },
  { emoji: "🛠️", title: "DIY", desc: "Projects & builds" },
  { emoji: "💖", title: "Humanity Wins", desc: "Stories of kindness" },
  { emoji: "💡", title: "Mindfulness", desc: "Habits & peace" },
  { emoji: "📣", title: "Get Involved", desc: "Volunteer & activism" }
];

const featured = [
  {
    image: "/demo-hero1.jpg",
    title: "5 ways to live greener this summer",
    tag: "Mindful Living",
    color: "#D0E7D2"
  },
  {
    image: "/demo-hero2.jpg",
    title: "Top sports highlights of the week",
    tag: "Sports",
    color: "#E0ECF7"
  },
  {
    image: "/demo-hero3.jpg",
    title: "Books that reshape your mindset",
    tag: "Book Recs",
    color: "#FFF7E0"
  }
];

export default function ExploreAdvanced() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDark = () => setDarkMode(!darkMode);
  useEffect(() => {
    document.body.className = darkMode ? "bg-[#1a1a1a] text-white" : "bg-[#f8f9f7] text-[#2a2d2e]";
  }, [darkMode]);

  return (
    <main className="min-h-screen px-4 py-6 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">🔍 Explore LISTO</h1>
        <button
          onClick={toggleDark}
          className="p-2 rounded-full bg-sage-200 hover:bg-sage-300 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="overflow-x-auto flex gap-4 mb-10 scrollbar-hide">
        {featured.map((item, i) => (
          <motion.div
            key={i}
            className="min-w-[320px] h-[200px] rounded-xl shadow-lg relative overflow-hidden"
            style={{ backgroundColor: item.color }}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute w-full h-full object-cover opacity-40"
            />
            <div className="absolute bottom-4 left-4 z-10">
              <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-full">
                {item.tag}
              </span>
              <h2 className="text-lg font-bold leading-tight mt-1 text-black">
                {item.title}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockCategories.map((cat, i) => (
          <motion.div
            key={i}
            className="rounded-xl p-5 shadow-md hover:shadow-xl bg-white hover:-translate-y-1 transition-all border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="text-3xl mb-2">{cat.emoji}</div>
            <h3 className="font-semibold text-lg">{cat.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{cat.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Suggested for You</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-lg shadow hover:shadow-lg p-4 transition dark:bg-[#2b2b2b]"
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-32 w-full bg-sage-100 rounded mb-3"></div>
              <h3 className="font-bold text-md">Topic #{i + 1}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Quick preview description goes here.</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
