"use client";

import React, { useState } from "react";

export default function UniversalSearch() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
  };

  return (
    <div className="mb-8 text-center">
      <input
        type="text"
        placeholder="Search anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 rounded-l border border-gray-300 focus:outline-none w-2/3 max-w-md"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}