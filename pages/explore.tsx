// explore.tsx — Flipboard-style Explore w/ Graphic Designer Color Scheme
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_KEY = "AIzaSyBjiX2VKSPSKYnLF9LEzHr4n_WxsZX0qqc";
const CSE_ID = "84129d6fc73d94bbd";

// 🎨 LISTO Brand Default Palette (can be customized by user later)
const colors = [
  "bg-[#D0E7D2]", // 🌿 Sage green (main)
  "bg-[#FFF7E0]", // 🍋 Soft lemon cream
  "bg-[#FBE4E4]", // 🌸 Rose blush
  "bg-[#E0ECF7]", // 🌤️ Pale sky blue
  "bg-[#F1E3F3]", // 💜 Lavender fog
  "bg-[#FFF3E7]", // 🍊 Apricot light
  "bg-[#E6F4EA]", // 🍐 Mist mint
  "bg-[#E3E8F0]"  // 🌫️ Neutral cloud gray
];

const tiles = [
  { emoji: "📰", title: "Breaking News", desc: "Global updates & headlines" },
  { emoji: "🌱", title: "Green Living", desc: "Simple daily sustainability" },
  { emoji: "📚", title: "Book Recs", desc: "Fiction, strategy, and escape" },
  { emoji: "⚽", title: "Sports", desc: "Game day updates & analysis" },
  { emoji: "🛠️", title: "DIY Projects", desc: "Build it, fix it, try it" },
  { emoji: "💖", title: "Humanity Wins", desc: "People helping people" },
  { emoji: "💡", title: "Mindful Living", desc: "Productivity meets peace" },
  { emoji: "📣", title: "Get Involved", desc: "Volunteering & impact" }
];

export default function Explore() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data.items?.length) setResults(data.items);
      else setError("No results found.");
    } catch (err) {
      console.error(err);
      setError("Error searching. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#edf5f2] via-white to-[#f4f7f8] px-6 py-10">
      <motion.h1
        className="text-center text-4xl font-extrabold mb-8 text-[#46675B]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🔍 Explore LISTO
      </motion.h1>

      <div className="flex justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search images, docs, ideas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full max-w-xl px-5 py-3 rounded-full border border-sage-300 shadow-md text-lg focus:ring-2 focus:ring-[#B2D2BD] outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 rounded-full bg-[#46675B] text-white hover:bg-[#36574B] font-semibold text-lg transition"
        >
          Search
        </button>
      </div>

      <AnimatePresence>
        {!query && results.length === 0 && !loading && (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {tiles.map((tile, i) => (
              <motion.div
                key={i}
                className={`rounded-xl text-[#333] p-5 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex flex-col items-center text-center ${colors[i % colors.length]}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl mb-2">{tile.emoji}</div>
                <h2 className="text-lg font-bold mb-1">{tile.title}</h2>
                <p className="text-sm opacity-80">{tile.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {loading && (
          <p className="text-center text-sage-500 text-lg font-semibold">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        {results.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {results.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-4 rounded-xl shadow-md border border-sage-200 hover:shadow-2xl transition-all flex items-start gap-4"
                whileHover={{ scale: 1.02 }}
              >
                {item.pagemap?.cse_image?.[0]?.src && (
                  <img
                    src={item.pagemap.cse_image[0].src}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                )}
                <div>
                  <h2 className="text-md font-bold text-[#46675B]">{item.title}</h2>
                  <p className="text-gray-600 text-sm mb-1">{item.snippet}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#46675B] hover:underline text-sm"
                  >
                    Visit →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
