// explore.tsx — Ultra-Stylized Flipboard-style Grid
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_KEY = "AIzaSyBjiX2VKSPSKYnLF9LEzHr4n_WxsZX0qqc";
const CSE_ID = "84129d6fc73d94bbd";

const tiles = [
  { title: "📰 Breaking News", desc: "Global updates & headlines", color: "bg-gradient-to-br from-red-400 to-pink-400" },
  { title: "🌱 Green Living", desc: "Simple daily sustainability", color: "bg-gradient-to-br from-green-400 to-lime-300" },
  { title: "📚 Book Recs", desc: "Fiction, strategy, and escape", color: "bg-gradient-to-br from-yellow-300 to-orange-400" },
  { title: "⚽ Sports", desc: "Game day updates & analysis", color: "bg-gradient-to-br from-blue-400 to-sky-300" },
  { title: "🛠️ DIY Projects", desc: "Build it, fix it, try it", color: "bg-gradient-to-br from-amber-400 to-orange-500" },
  { title: "💖 Humanity Wins", desc: "People helping people", color: "bg-gradient-to-br from-pink-400 to-fuchsia-400" },
  { title: "💡 Mindful Living", desc: "Productivity meets peace", color: "bg-gradient-to-br from-emerald-300 to-teal-400" },
  { title: "📣 Get Involved", desc: "Volunteering & impact", color: "bg-gradient-to-br from-purple-400 to-indigo-400" }
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
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-violet-200 px-6 py-10">
      <motion.h1
        className="text-center text-4xl font-extrabold mb-8 text-indigo-900"
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
          className="w-full max-w-xl px-5 py-3 rounded-full border border-indigo-300 shadow-md text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 font-semibold text-lg transition"
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
                className={`rounded-3xl text-white p-6 shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer ${tile.color}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <h2 className="text-xl font-bold mb-2 drop-shadow">{tile.title}</h2>
                <p className="text-sm opacity-90 leading-snug">{tile.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {loading && (
          <p className="text-center text-indigo-500 text-lg font-semibold">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        {results.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-4 rounded-xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-all flex items-start gap-4"
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
                  <h2 className="text-md font-bold text-indigo-700">{item.title}</h2>
                  <p className="text-gray-600 text-sm mb-1">{item.snippet}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:text-indigo-700 underline text-sm"
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
