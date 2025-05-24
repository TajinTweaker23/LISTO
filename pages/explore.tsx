"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Explore() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const cx = process.env.NEXT_PUBLIC_GOOGLE_CX_ID;
    const endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      query
    )}&cx=${cx}&key=${apiKey}&searchType=image`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-center">
          🔍 Explore the World
        </h1>

        <div className="flex justify-center mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search GIFs, articles, blogs, etc..."
            className="p-2 border rounded-l-md w-2/3"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((item, i) => (
            <motion.div
              key={item.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <a
                href={item.image?.contextLink || item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={item.link}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-3">
                  <h2 className="text-lg font-bold text-blue-700 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 italic mt-1">
                    Visit full article
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}