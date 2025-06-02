// pages/explore.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User } from "lucide-react";
import UniversalSearch from "../components/UniversalSearch";

const tiles = [
  { emoji: "📰", title: "Breaking News", desc: "Global updates & headlines", bgClass: "bg-[#D0E7D2]" },
  { emoji: "🌱", title: "Green Living",    desc: "Daily eco-tips for you",      bgClass: "bg-[#FFF7E0]" },
  { emoji: "📚", title: "Book Recs",       desc: "Curated reads to inspire",    bgClass: "bg-[#FBE4E4]" },
  { emoji: "⚽", title: "Sports",          desc: "Highlights & analysis",       bgClass: "bg-[#E0ECF7]" },
  { emoji: "🛠️", title: "DIY Projects",    desc: "Hands-on creativity",         bgClass: "bg-[#F1E3F3]" },
  { emoji: "💖", title: "Humanity Wins",   desc: "Stories of kindness",         bgClass: "bg-[#FFF3E7]" },
  { emoji: "💡", title: "Mindful Living",  desc: "Peace meets productivity",    bgClass: "bg-[#E6F4EA]" },
  { emoji: "📣", title: "Get Involved",    desc: "Volunteer & impact",          bgClass: "bg-[#E3E8F0]" },
];

export default function Explore() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1) Called when user hits “Search”
  const handleSearch = async () => {
    if (!query.trim()) return;
    setError("");
    setResults([]);
    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        setError("Search failed. Try again.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data.items) && data.items.length > 0) {
        setResults(data.items);
      } else {
        setError("No results found.");
      }
    } catch (err) {
      console.error("Error calling /api/search:", err);
      setError("Search failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#E3E8F0]">
      {/* ─── Top nav bar ──────────────────────────────────────────── */}
      <nav className="flex justify-between items-center bg-white shadow py-4 px-6">
        <Link href="/">
          <Home className="w-6 h-6 text-[#46675B] hover:text-[#36574B]" />
        </Link>
        <h1 className="text-xl font-bold text-[#46675B]">🔍 Explore LISTO</h1>
        <Link href="/profile">
          <User className="w-6 h-6 text-[#46675B] hover:text-[#36574B]" />
        </Link>
      </nav>

      {/* ─── Sticky search bar ───────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-[#E3E8F0] py-4 px-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <UniversalSearch
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
            placeholder="Search images, articles, docs…"
          />
        </div>
      </div>

      {/* ─── Main content area ───────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* 1) Show “tiles” if no query, no results, and not loading */}
        <AnimatePresence>
          {!query && !loading && results.length === 0 && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {tiles.map((t, i) => (
                <motion.div
                  key={i}
                  className={`${t.bgClass} p-6 rounded-xl shadow-md flex flex-col items-center text-center`}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-5xl mb-2">{t.emoji}</div>
                  <h2 className="font-semibold text-lg text-[#2e423f]">{t.title}</h2>
                  <p className="text-gray-700 mt-1">{t.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2) Loading indicator */}
        {loading && (
          <p className="text-center mt-12 text-gray-600">Loading results…</p>
        )}

        {/* 3) Error message */}
        {error && (
          <p className="text-center mt-12 text-red-500 font-semibold">{error}</p>
        )}

        {/* 4) Search results grid (images) */}
        {results.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {results.map((item: any, idx: number) => (
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
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-[#46675B] mb-1 line-clamp-2">
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
