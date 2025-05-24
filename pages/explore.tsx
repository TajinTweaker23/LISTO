// pages/explore.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import UniversalSearch from "../components/UniversalSearch";

const mockCategories = [
  { title: "Humanitarian Stories", color: "bg-rose-100", icon: "🌍", description: "Inspiring acts of kindness from around the world." },
  { title: "Breaking News", color: "bg-red-100", icon: "🗞️", description: "Live updates on major global events." },
  { title: "Science & Space", color: "bg-indigo-100", icon: "🔬", description: "New discoveries from labs and beyond the stars." },
  { title: "Eco & Animal Action", color: "bg-green-100", icon: "🌱", description: "Tips to help the planet and protect creatures we share it with." },
  { title: "Interior Design Inspo", color: "bg-yellow-100", icon: "🛋️", description: "Ideas from top-rated decorators and homes around the globe." },
  { title: "Fitness & Wellness", color: "bg-blue-100", icon: "💪", description: "Routines, diet protocols, and mental health tips." },
  { title: "Fashion & Culture", color: "bg-pink-100", icon: "👗", description: "What’s trending on real runways and in real life." },
  { title: "TV & Movie Gems", color: "bg-purple-100", icon: "🎬", description: "Hidden shows, moving stories, and top-rated recs." },
  { title: "Political Action", color: "bg-orange-100", icon: "🗳️", description: "Realistic ways to create change and understand policies." },
  { title: "Food & Recipes", color: "bg-lime-100", icon: "🍲", description: "Top-rated easy meals, kitchen hacks, and health-forward cooking." },
];

const GOOGLE_API_KEY = "AIzaSyBjiX2VKSPSKYnLF9LEzHr4n_WxsZX0qqc";
const SEARCH_ENGINE_ID = "84129d6fc73d94bbd";

export default function Explore() {
  const [location, setLocation] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

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

  async function handleSearch() {
    if (!query.trim()) return;

    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}`
    );
    const data = await res.json();
    setResults(data.items || []);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for articles, blogs, science, eco, and more..."
          className="w-full px-4 py-2 border rounded-xl shadow-md mb-2"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-100 hover:bg-gray-200 text-sm py-1 px-4 rounded mb-6"
        >
          Search
        </button>

        <h1 className="text-4xl font-extrabold mb-2 text-center">🧠 Explore LISTO's Dashboard</h1>
        <p className="text-center text-gray-600 mb-6 text-sm italic">
          {location ? `🌍 Showing inspiration near: ${location}` : "📍 Locating you..."}
        </p>

        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {results.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                className="p-4 border rounded-lg bg-white shadow hover:shadow-lg transition"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="font-bold text-lg mb-1 text-blue-700 underline">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.snippet}</p>
              </motion.a>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.map((cat, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl shadow-md p-6 border ${cat.color}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h2 className="text-xl font-bold mb-2">{cat.icon} {cat.title}</h2>
              <p className="text-gray-700 text-sm mb-3">{cat.description}</p>
              <Link href="/vision-board">
                <span className="inline-block text-sm text-blue-600 hover:underline">View Related Goals →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}