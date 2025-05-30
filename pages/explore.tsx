// pages/explore.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Menu } from "lucide-react";
import UniversalSearch from "../components/UniversalSearch";

const tiles = [
  { emoji: "📰", title: "Breaking News",   desc: "Global updates & headlines", bgClass: "cream" },
  { emoji: "🌱", title: "Green Living",    desc: "Daily eco-tips for you",      bgClass: "blush" },
  { emoji: "📚", title: "Book Recs",       desc: "Curated reads to inspire",    bgClass: "sky"   },
  { emoji: "⚽", title: "Sports",          desc: "Highlights & analysis",       bgClass: "fog"   },
  { emoji: "🛠️", title: "DIY Projects",    desc: "Hands-on creativity",         bgClass: "apricot" },
  { emoji: "💖", title: "Humanity Wins",   desc: "Stories of kindness",         bgClass: "mint"  },
  { emoji: "💡", title: "Mindful Living",  desc: "Peace meets productivity",    bgClass: "cloud" },
  { emoji: "📣", title: "Get Involved",    desc: "Volunteer & impact",          bgClass: "cream" },
];

export default function Explore() {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-cloud text-sage">
      {/* ─── HEADER / NAV ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 backdrop-blur bg-cloud/75 border-b border-fog">
        <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
          <Link href="/">
            <span className="font-serif text-2xl">LISTO</span>
          </Link>
          <h1 className="hidden sm:block text-xl font-semibold">🔍 Explore LISTO</h1>
          <div className="flex gap-4 items-center">
            <button
              className="sm:hidden p-2 rounded hover:bg-fog transition"
              onClick={()=>setMenuOpen(!menuOpen)}
            >
              <Menu className="w-6 h-6"/>
            </button>
            <Link href="/"><Home className="w-6 h-6"/></Link>
            <Link href="/profile"><User className="w-6 h-6"/></Link>
          </div>
        </div>

        {/* mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-cloud/90"
            >
              <ul className="flex flex-col gap-2 p-4 text-center">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/explore">Explore</Link></li>
                <li><Link href="/vision-board">Vision Board</Link></li>
                <li><Link href="/impact-projects">Impact Projects</Link></li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ─── SEARCH BAR ─────────────────────────────────────────────────────────── */}
      <div className="sticky top-[64px] z-10 bg-cloud/75 border-b border-fog">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <UniversalSearch
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
            placeholder="Search images, articles, docs…"
          />
        </div>
      </div>

      {/* ─── TILE GRID ─────────────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence>
          {(!query && !loading && !results.length) && (
            <motion.div
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {tiles.map((t, i) => (
                <motion.div
                  key={i}
                  className={`p-6 rounded-2xl shadow-lg bg-${t.bgClass} text-center flex flex-col items-center`}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-6xl">{t.emoji}</div>
                  <h2 className="mt-4 text-lg font-semibold">{t.title}</h2>
                  <p className="mt-1 text-gray-700">{t.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── LOADING & ERRORS ─────────────────────────────────────────────────── */}
        {loading && <p className="text-center mt-10">Loading…</p>}
        {error   && <p className="text-center mt-10 text-red-500">{error}</p>}

        {/* ─── SEARCH RESULTS ───────────────────────────────────────────────────── */}
        {results.length > 0 && (
          <motion.div
            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {results.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition-transform"
                whileHover={{ scale: 1.02 }}
              >
                {item.pagemap?.cse_image?.[0]?.src && (
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.pagemap.cse_image[0].src}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform"
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-indigo-700 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {item.snippet}
                  </p>
                  <span className="text-xs text-indigo-400 mt-3 block">
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
