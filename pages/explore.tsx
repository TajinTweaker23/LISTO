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

      console.log("✅ GOOGLE API RESPONSE:", data);
    } catch (err) {
      console.error("❌ API FETCH ERROR:", err);
      setError("Something went wrong while searching. Check the console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 text-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center mb-8"
      >
        🔍 Explore LISTO
      </motion.h1>

      <div className="flex justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search anything (images, topics, docs...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full max-w-xl px-4 py-2 rounded-full border shadow-md outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="text-center text-indigo-500 font-medium">Loading...</div>
      )}

      {error && (
        <div className="text-center text-red-500 font-semibold mt-4">{error}</div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {results.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-xl shadow-md border border-indigo-100 transition"
            >
              <h2 className="text-lg font-semibold text-indigo-700 mb-1">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-2">{item.snippet}</p>
              {item.pagemap?.cse_image?.[0]?.src && (
                <img
                  src={item.pagemap.cse_image[0].src}
                  alt={item.title}
                  className="rounded-lg mb-2 w-full object-cover max-h-40"
                />
              )}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-medium underline"
              >
                Visit
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
