// components/UniversalSearch.tsx
"use client";

import React, { useState } from "react";

export default function UniversalSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full mb-6">
      <input
        type="text"
        placeholder="Search for anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="mt-2 text-xs text-gray-500">
        Try: “affordable eco tips” or “interior design blogs”
      </p>
    </div>
  );
}