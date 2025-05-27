// pages/explore.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UniversalSearch from "../components/UniversalSearch";
import { Compass, Home, User } from "lucide-react";

const tiles = [
  { emoji: "📰", title: "Breaking News", desc: "Global updates & headlines" },
  { emoji: "🌱", title: "Green Living", desc: "Daily eco-tips for you" },
  { emoji: "📚", title: "Book Recs", desc: "Curated reads to inspire" },
  { emoji: "⚽", title: "Sports", desc: "Highlights & analysis" },
  { emoji: "🛠️", title: "DIY Projects", desc: "Hands-on creativity" },
  { emoji: "💖", title: "Humanity Wins", desc: "Stories of kindness" },
  { emoji: "💡", title: "Mindful Living", desc: "Peace meets productivity" },
  { emoji: "📣", title: "Get Involved", desc: "Volunteer & impact" },
];

const bgClasses = [
  "bg-[#D0E7D2]",
  "bg-[#FFF7E0]",
  "bg-[#FBE4E4]",
  "bg-[#E0ECF7]",
  "bg-[#F1E3F3]",
  "bg-[#FFF3E7]",
  "bg-[#E6F4EA]",
  "bg-[#E3E8F0]",
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
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.items) setResults(data.items);
      else setError("No results found.");
    } catch {
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Top search bar */}
      <UniversalSearch
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        placeholder="Search images, articles, docs..."
      />

      {/* Tiles when there’s no search query */}
      <AnimatePresence>
        {!query && !loading && !results.length && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {tiles.map((t, i) => (
              <motion.div
                key={i}
                className={`rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all ${bgClasses[i % bgClasses.length]}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl mb-2">{t.emoji}</div>
                <h2 className="text-xl font-bold">{t.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading indicator */}
      {loading && (
        <p className="text-center mt-8 text-lg text-gray-700">Loading...</p>
      )}

      {/* Error message */}
      {error && (
        <p className="text-center mt-8 text-red-500 font-semibold">{error}</p>
      )}

      {/* Search results */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {results.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition"
              whileHover={{ scale: 1.02 }}
            >
              {item.pagemap?.cse_image?.[0]?.src && (
                <img
                  src={item.pagemap.cse_image[0].src}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="text-lg font-semibold text-[#46675B]">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {item.snippet}
              </p>
            </motion.a>
          ))}
        </div>
      )}
    </>
  );
}
