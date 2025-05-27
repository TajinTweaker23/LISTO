"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const API_KEY = "AIzaSyBjiX2VKSPSKYnLF9LEzHr4n_WxsZX0qqc";
const CSE_ID = "84129d6fc73d94bbd";

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
        setError("No results found. Try a different keyword.");
      } else {
        setResults(data.items);
      }
    } catch (err) {
      console.error("❌ API FETCH ERROR:", err);
      setError("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <main className="min-h-screen px-6 py-12 bg-gradient-to-tr from-blue-100 via-white to-violet-200 text-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl font-bold mb-8 text-indigo-800"
      >
        🔍 Explore LISTO
      </motion.h1>

      <div className="flex justify-center items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search images, docs, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full max-w-xl px-5 py-3 rounded-full border border-indigo-300 shadow-md text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="text-center text-indigo-600 font-semibold text-lg">
          Loading results...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-medium text-lg">{error}</div>
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
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        >
          {results.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-all flex items-start gap-4"
            >
              {item.pagemap?.cse_image?.[0]?.src && (
                <img
                  src={item.pagemap.cse_image[0].src}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md border"
                />
              )}
              <div>
                <h2 className="text-md font-bold text-indigo-700">
                  {item.title}
                </h2>
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
    </main>
  );
}
