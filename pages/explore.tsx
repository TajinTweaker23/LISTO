"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, User } from "lucide-react";
import UniversalSearch from "../components/UniversalSearch";

const tiles = [
  { emoji: "📰", title: "Breaking News", desc: "Global updates & headlines", bgClass: "bg-[#D0E7D2]" },
  { emoji: "🌱", title: "Green Living", desc: "Daily eco-tips for you", bgClass: "bg-[#FFF7E0]" },
  { emoji: "📚", title: "Book Recs", desc: "Curated reads to inspire", bgClass: "bg-[#FBE4E4]" },
  { emoji: "⚽", title: "Sports", desc: "Highlights & analysis", bgClass: "bg-[#E0ECF7]" },
  { emoji: "🛠️", title: "DIY Projects", desc: "Hands-on creativity", bgClass: "bg-[#F1E3F3]" },
  { emoji: "💖", title: "Humanity Wins", desc: "Stories of kindness", bgClass: "bg-[#FFF3E7]" },
  { emoji: "💡", title: "Mindful Living", desc: "Peace meets productivity", bgClass: "bg-[#E6F4EA]" },
  { emoji: "📣", title: "Get Involved", desc: "Volunteer & impact", bgClass: "bg-[#E3E8F0]" },
];

export default function Explore() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);

  async function search() {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        setError("Search failed. Try again.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setResults(Array.isArray(data.items) ? data.items : []);
      if (!data.items?.length) setError("No results found.");
    } catch (e) {
      setError("Search failed. Try again.");
    }
    setLoading(false);
  }

  function toggleSelect(link: string) {
    setSelectedLinks(links =>
      links.includes(link) ? links.filter(l => l !== link) : [...links, link]
    );
  }

  function handleSaveToBoard() {
    // Placeholder for Firestore logic (step 2)
    alert(
      selectedLinks.length
        ? `Saved ${selectedLinks.length} items to your board!`
        : "No items selected."
    );
    setSelectedLinks([]);
  }

  return (
    <div className="min-h-screen bg-[#E3E8F0]">
      <nav className="flex justify-between items-center bg-white shadow py-4 px-6">
        <Link href="/">
          <Home className="w-6 h-6 text-[#46675B] hover:text-[#36574B]" />
        </Link>
        <h1 className="text-xl font-bold text-[#46675B] flex items-center gap-2">
          <span role="img" aria-label="search">🔍</span> Explore LISTO
        </h1>
        <Link href="/profile">
          <User className="w-6 h-6 text-[#46675B] hover:text-[#36574B]" />
        </Link>
      </nav>
      <div className="sticky top-0 z-10 bg-[#E3E8F0] py-4 px-6 border-b border-gray-200">
        <div className="flex items-center w-full max-w-xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && search()}
            placeholder="Search images, articles, docs…"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={search}
            disabled={!query.trim()}
            className="px-5 py-2 bg-indigo-600 text-white rounded-r-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >🔍</button>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 py-6">
        {!query && !loading && !results.length && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {tiles.map((tile, i) => (
              <motion.div
                key={i}
                className={`${tile.bgClass} p-6 rounded-xl shadow-md flex flex-col items-center text-center`}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="text-5xl mb-2">{tile.emoji}</div>
                <h2 className="font-semibold text-lg text-[#2e423f]">{tile.title}</h2>
                <p className="text-gray-700 mt-1">{tile.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
        {loading && (
          <p className="text-center mt-12 text-gray-600">Loading results…</p>
        )}
        {error && (
          <p className="text-center mt-12 text-red-500 font-semibold">{error}</p>
        )}
        {results.length > 0 && (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {results.map((item, idx) => {
                const imageUrl =
                  item.pagemap?.cse_image?.[0]?.src ||
                  item.pagemap?.cse_thumbnail?.[0]?.src ||
                  "";
                return (
                  <motion.div
                    key={item.cacheId || item.link || idx}
                    whileHover={{ scale: 1.05, boxShadow: "0 6px 24px rgba(0,0,0,0.10)" }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition duration-200 hover:ring-2 hover:ring-indigo-400"
                  >
                    <div className="relative group cursor-pointer">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:opacity-90 transition"
                          style={{ maxHeight: 200, objectFit: "cover" }}
                        />
                      )}
                      {selectedLinks.includes(item.link) && (
                        <div className="absolute inset-0 bg-indigo-500 bg-opacity-40 flex items-center justify-center z-10">
                          <span className="text-white text-3xl font-bold">✓</span>
                        </div>
                      )}
                      <button
                        className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-indigo-200 rounded-full p-2 z-20"
                        onClick={e => {
                          e.preventDefault();
                          toggleSelect(item.link);
                        }}
                        title={selectedLinks.includes(item.link) ? "Deselect" : "Select"}
                      >
                        {selectedLinks.includes(item.link) ? "✓" : "＋"}
                      </button>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block flex-1"
                    >
                      <div className="p-4">
                        <h2 className="font-bold text-lg mb-1 text-[#46675B] line-clamp-2">{item.title}</h2>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">{item.snippet}</p>
                        <span className="text-xs text-indigo-400">{item.displayLink}</span>
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg transition disabled:opacity-40"
                disabled={!selectedLinks.length}
                onClick={handleSaveToBoard}
              >
                Save {selectedLinks.length || ""} to Board
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
