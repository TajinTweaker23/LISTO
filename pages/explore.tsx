// pages/explore.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User } from "lucide-react";
import UniversalSearch from "../components/UniversalSearch";

const tiles = [
  { emoji: "📰", title: "Breaking News",   desc: "Global updates & headlines", bgClass: "bg-cream" },
  { emoji: "🌱", title: "Green Living",    desc: "Daily eco-tips for you",      bgClass: "bg-blush" },
  { emoji: "📚", title: "Book Recs",       desc: "Curated reads to inspire",    bgClass: "bg-sky" },
  { emoji: "⚽", title: "Sports",          desc: "Highlights & analysis",       bgClass: "bg-fog" },
  { emoji: "🛠️", title: "DIY Projects",    desc: "Hands-on creativity",         bgClass: "bg-apricot" },
  { emoji: "💖", title: "Humanity Wins",   desc: "Stories of kindness",         bgClass: "bg-mint" },
  { emoji: "💡", title: "Mindful Living",  desc: "Peace meets productivity",    bgClass: "bg-cloud" },
  { emoji: "📣", title: "Get Involved",    desc: "Volunteer & impact",          bgClass: "bg-cream" },
];

export default function Explore() {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setError(""); setResults([]); setLoading(true);
    try {
      const res  = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      if (json.items?.length) setResults(json.items);
      else setError("No results found.");
    } catch {
      setError("Search failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cloud p-6">
      {/* NavBar */}
      <nav className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <Link href="/"><Home className="w-6 h-6 text-sage" /></Link>
        <h1 className="text-2xl font-bold text-sage">🔍 Explore LISTO</h1>
        <Link href="/profile"><User className="w-6 h-6 text-sage" /></Link>
      </nav>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto sticky top-4 z-10">
        <UniversalSearch
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          placeholder="Search images, articles, docs…"
        />
      </div>

      <main className="max-w-4xl mx-auto mt-8">
        {/* Tiles when no query */}
        <AnimatePresence>
          {!query && !loading && !results.length && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {tiles.map((t, i) => (
                <motion.div
                  key={i}
                  className={`${t.bgClass} p-6 rounded-xl shadow-md flex flex-col items-center text-center`}
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-5xl mb-2">{t.emoji}</div>
                  <h2 className="font-semibold text-lg">{t.title}</h2>
                  <p className="text-gray-700 mt-1">{t.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading & Error */}
        {loading && <p className="text-center mt-10">Loading…</p>}
        {error   && <p className="text-center mt-10 text-red-500">{error}</p>}

        {/* Search Results */}
        {results.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {results.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transform transition"
                whileHover={{ scale: 1.02 }}
              >
                {item.pagemap?.cse_image?.[0]?.src && (
                  <img
                    src={item.pagemap.cse_image[0].src}
                    className="w-full h-40 object-cover"
                    alt={item.title}
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-indigo-700 mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {item.snippet}
                  </p>
                  <span className="text-xs text-indigo-400 mt-2 block">
                    {item.displayLink}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
