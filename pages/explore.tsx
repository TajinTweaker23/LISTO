"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, Home, Compass, User } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const ExploreRebuild = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    document.body.className = darkMode ? "bg-[#1b1f1e] text-gray-100" : "bg-[#e9ecef] text-[#2e302f]";
  }, [darkMode]);

  useEffect(() => {
    const fetchArticles = async () => {
      const snapshot = await getDocs(collection(db, "trending"));
      const fetched = snapshot.docs.map((doc) => doc.data());
      setArticles(fetched);
    };
    fetchArticles();
  }, []);

  return (
    <main className="min-h-screen px-6 py-8 font-[\'Inter\']">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#3D5A40] dark:text-[#C9EBCB]">
          <span className="mr-2">🔎</span> Explore LISTO
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full border dark:border-white border-gray-300 hover:bg-gray-100 dark:hover:bg-[#2c2c2c]"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="p-2 rounded-full bg-[#3D5A40] text-white hover:bg-[#2e4232]">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#202220] border-t border-gray-200 dark:border-gray-700 flex justify-around p-3 shadow-md text-sm">
        <button className="flex flex-col items-center text-[#3D5A40] dark:text-[#C9EBCB]">
          <Home size={20} />
          Home
        </button>
        <button className="flex flex-col items-center text-[#3D5A40] dark:text-[#C9EBCB]">
          <Compass size={20} />
          Explore
        </button>
        <button className="flex flex-col items-center text-[#3D5A40] dark:text-[#C9EBCB]">
          <User size={20} />
          Profile
        </button>
      </nav>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
        {["📰", "🌱", "📚", "⚽", "🛠️", "💖", "💡", "📣"].map((emoji, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative overflow-hidden rounded-2xl p-6 shadow-lg bg-gradient-to-br from-white via-sage-50 to-white dark:from-[#252b25] dark:to-[#202220] hover:shadow-2xl"
          >
            <div className="text-4xl mb-3 drop-shadow-sm">{emoji}</div>
            <h3 className="text-xl font-bold mb-1 tracking-tight">Tile {i + 1}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">Description of tile {i + 1} goes here.</p>
          </motion.div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-[#3A4D39] dark:text-[#C9EBCB]">🚀 Trending Articles</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((a, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl overflow-hidden bg-white dark:bg-[#252b25] shadow transition border border-gray-200 dark:border-[#333]"
            >
              <img src={a.image || "/fallback.jpg"} alt={a.title} className="w-full h-36 object-cover" />
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1 text-[#3D5A40] dark:text-[#C9EBCB]">{a.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{a.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-gray-400 mt-20 pb-28 dark:text-gray-500">
        🌿 Built by Team LISTO. Designed for visionaries.
      </footer>
    </main>
  );
};

export default ExploreRebuild;
