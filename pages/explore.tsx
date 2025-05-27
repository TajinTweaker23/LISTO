"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_KEY = "AIzaSyBjiX2VKSPSKYnLF9LEzHr4n_WxsZX0qqc";
const CSE_ID = "84129d6fc73d94bbd";

const preSearchTiles = [
  {
    title: "📰 Breaking News",
    desc: "Stay up-to-date with top global stories.",
    bg: "from-red-100 via-white to-red-200",
  },
  {
    title: "🌱 Live Greener",
    desc: "Daily eco-tips to reduce your footprint.",
    bg: "from-green-100 via-white to-green-200",
  },
  {
    title: "📚 Book Recs",
    desc: "Curated reads to sharpen your mind or escape it.",
    bg: "from-yellow-100 via-white to-yellow-200",
  },
  {
    title: "⚽ Sports Highlights",
    desc: "Catch today’s buzziest games and recaps.",
    bg: "from-indigo-100 via-white to-indigo-200",
  },
  {
    title: "🛠️ DIY Projects",
    desc: "Creative, useful, or ridiculous builds to try at home.",
    bg: "from-orange-100 via-white to-orange-200",
  },
  {
    title: "💖 Humanitarian Wins",
    desc: "Heartwarming stories of people helping people.",
    bg: "from-pink-100 via-white to-pink-200",
  },
  {
    title: "💡 Mindful Living",
    desc: "Simple ways to live softer & smarter.",
    bg: "from-sky-100 via-white to-sky-200",
  },
  {
    title: "📣 Get Involved",
    desc: "Volunteer ideas & community causes you can join.",
    bg: "from-purple-100 via-white to-purple-200",
  },
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
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (!data.items || data.items.length === 0) {
        setError("No results found. Try something else.");
      } else {
        setResults(data.items);
      }
    } catch (err) {
      console.error("Google API Error:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <main className="min-h-screen px-6 py-10 bg-gradient-to-br from-white via-indigo-50 to-white text-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-8 text-indigo-800"
      >
        🔍 Explore LISTO
      </motion.h1>

      <div className="flex justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search images, docs, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full max-w-xl px-5 py-3 rounded-full border border-indigo-300 shadow-md text-lg focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition"
        >
          Search
        </button>
      </div>

      <AnimatePresence>
        {!query && results.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {preSearchTiles.map((tile, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${tile.bg} rounded-2xl p-6 shadow-lg hover:shadow-xl transition`}
              >
                <h3 className="text-xl font-bold mb-2 text-indigo-800">{tile.title}</h3>
                <p className="text-sm text-gray-700">{tile.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-indigo-600 text-lg font-medium"
          >
            Loading...
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-500 font-medium"
          >
            {error}
          </motion.div>
        )}

        {results.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
          >
            {results.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-xl shadow-md border border-indigo-100 hover:shadow-2xl transition-all flex items-start gap-4"
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
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
