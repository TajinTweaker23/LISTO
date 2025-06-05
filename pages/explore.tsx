"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Helper to get safe image for each result
const getImageUrl = (item: any) =>
  item.pagemap?.cse_image?.[0]?.src ||
  item.pagemap?.cse_thumbnail?.[0]?.src ||
  "";

export default function Explore() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const doSearch = async () => {
    if (!query.trim()) return;
    setError("");
    setResults([]);
    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data?.items?.length) {
        setResults(data.items);
      } else {
        setError("No results found.");
      }
    } catch (e) {
      setError("Search failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#E3E8F0]">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow py-4 px-6">
        <Link href="/">
          <span className="font-bold text-xl text-[#46675B] hover:text-[#36574B]">🏠 Listo</span>
        </Link>
        <h1 className="text-2xl font-bold text-[#46675B] flex items-center">
          <span className="mr-2">🔍</span> Explore LISTO
        </h1>
        <div />
      </nav>
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-[#E3E8F0] py-4 px-6 border-b border-gray-200">
        <div className="flex max-w-xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && doSearch()}
            placeholder="Search anything..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-xl shadow-sm focus:outline-none"
          />
          <button
            onClick={doSearch}
            disabled={!query.trim()}
            className="px-5 py-2 bg-indigo-600 text-white rounded-r-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            🔍
          </button>
        </div>
      </div>
      {/* Results */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading && <p className="text-center text-gray-600 mt-12">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-12">{error}</p>}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.map((item, idx) => (
            <motion.div
              key={item.cacheId || item.link || idx}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {getImageUrl(item) && (
                  <img
                    src={getImageUrl(item)}
                    alt={item.title}
                    className="h-48 w-full object-cover group-hover:opacity-90 transition"
                  />
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="font-bold text-lg mb-1 text-[#46675B] line-clamp-2">{item.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">{item.snippet}</p>
                  <span className="text-xs text-indigo-400">{item.displayLink}</span>
                </div>
              </a>
              {/* Example: Add-to-board icon, can hook this up later */}
              <button
                className="bg-indigo-100 hover:bg-indigo-300 text-indigo-700 py-2 font-semibold rounded-b-2xl"
                title="Save to Vision Board"
                // onClick={() => saveToBoard(item)} // You’ll add this later
              >
                📌 Save
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
