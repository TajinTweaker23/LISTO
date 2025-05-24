"use client";

import React, { useState } from "react";

export default function UniversalSearch() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleSearchURL, "_blank");
  };

  return (
    <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-md mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for anything (images, GIFs, docs, etc)"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-sm"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-sm"
      >
        Search
      </button>
    </div>
  );
}