"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
const SEARCH_ENGINE_ID = process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID!;

export default function Explore() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`;
          setLocation(coords);
        },
        () => setLocation("Location unavailable")
      );
    }
  }, []);

  const searchGoogle = async () => {
    if (!query) return;
    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${SEARCH_ENGINE_ID}&key=${GOOGLE_API_KEY}`
    );
    const data = await res.json();
    setResults(data.items || []);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2 text-center">🧠 Explore LISTO's Dashboard</h1>
        <p className="text-center text-gray-600 mb-6 text-sm italic">
          {location ? `🌍 Showing inspiration near: ${location}` : "📍 Locating you..."}
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any topic..."
            className="p-2 border border-blue-300 rounded shadow-sm flex-1"
          />
          <button
            onClick={searchGoogle}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item, i) => (
            <motion.div
              key={item.link}
              className="p-4 rounded-2xl bg-white border shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h2 className="font-bold text-lg mb-2 text-blue-700">{item.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{item.snippet}</p>
              <Link href={item.link} target="_blank" className="text-sm text-blue-500 underline">
                Visit Full Article →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}