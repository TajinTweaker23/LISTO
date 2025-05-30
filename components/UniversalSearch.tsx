"use client";

import React, { useState } from "react";

export default function UniversalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const GOOGLE_API_KEY = "AIzaSyBjiX2VKSPSKYnLF9LEzHr4n_WxsZX0qqc";
  const SEARCH_ENGINE_ID = "84129d6fc73d94bbd";

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();
    setResults(data.items || []);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <input
        type="text"
        placeholder="Search articles, blogs, science, eco, and more..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      />
      <div className="flex justify-center mb-6">
        <button
          onClick={search}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-sm text-gray-500">Loading results...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-gray-200 rounded-xl bg-white shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg mb-1 text-indigo-700">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.snippet}</p>
            <p className="text-indigo-400 text-xs mt-2">{item.displayLink}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
