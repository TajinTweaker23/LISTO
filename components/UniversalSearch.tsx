// components/UniversalSearch.tsx
"use client";

import React, { useState } from "react";

const GOOGLE_API_KEY = "AIzaSyBjiX2VKSPSKYnLF9LEzHr4n_WxsZX0qqc";
const SEARCH_ENGINE_ID = "84129d6fc73d94bbd";

export default function UniversalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query) return;
    setLoading(true);

    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    setResults(data.items || []);
    setLoading(false);
  };

  return (
    <div className="my-6 text-center">
      <input
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-xl"
        type="text"
        placeholder="Search for articles, blogs, science, eco, and more..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={search}
      >
        Search
      </button>

      {loading && <p className="mt-4 italic text-gray-500">Searching...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {results.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-200 rounded p-4 shadow hover:shadow-lg bg-white text-left"
          >
            <h3 className="text-lg font-semibold text-blue-700">{item.title}</h3>
            <p className="text-sm text-gray-700 mt-1">{item.snippet}</p>
            <p className="text-xs text-gray-500 mt-2">{item.displayLink}</p>
          </a>
        ))}
      </div>
    </div>
  );
}