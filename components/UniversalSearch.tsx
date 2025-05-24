"use client";

import React, { useState } from "react";

const GOOGLE_API_KEY = "AIzaSyBjiX2VKSPSKYnLF9LEzHr4n_WxsZX0qqc";
const SEARCH_ENGINE_ID = "84129d6fc73d94bbd";

export default function UniversalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&searchType=image`
      );
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Search error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="🔍 Search images, GIFs, articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded-xl shadow-sm text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
      />
      <button
        onClick={handleSearch}
        className="mt-3 bg-purple-500 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:bg-purple-600 transition"
      >
        Search 🌐
      </button>

      {loading && <p className="mt-4 text-gray-500 animate-pulse">Loading amazing content...</p>}

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {results.map((item, index) => (
          <a
            key={index}
            href={item.image.contextLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={item.link}
              alt={item.title}
              className="w-full h-36 object-cover"
            />
            <p className="absolute bottom-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate w-full text-center">{item.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}