"use client";

import React, { useState } from "react";

const GOOGLE_API_KEY = "AIzaSyBjiX2VKSPSKYnLF9LEzHr4n_WxsZX0qqc";
const SEARCH_ENGINE_ID = "84129d6fc73d94bbd";

export default function UniversalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query) return;
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`
      );
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Search error:", err);
    }

    setLoading(false);
  }

  return (
    <div className="w-full mb-10">
      <input
        type="text"
        placeholder="Search for articles, blogs, science, eco, and more..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="mt-2 px-4 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        Search
      </button>

      {loading && <p className="text-sm text-gray-500 mt-2">Loading...</p>}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {results.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border rounded shadow hover:bg-blue-50 transition"
          >
            <h3 className="text-lg font-semibold text-blue-700">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.snippet}</p>
            <p className="text-xs text-purple-600 mt-2">{item.displayLink}</p>
          </a>
        ))}
      </div>
    </div>
  );
}