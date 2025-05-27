"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "🌟 Inspire Me",
    description: "Curated stories tailored to your interests.",
  },
  {
    title: "🎥 Stream of the Day",
    description: "Handpicked insightful videos daily.",
  },
  {
    title: "💡 Quick Eco-Tips",
    description: "Bite-sized daily actions to help the planet.",
  },
  {
    title: "🛠️ DIY Innovation",
    description: "Creative DIY projects to spark your innovation.",
  },
  {
    title: "🎧 Podcasts for Growth",
    description: "Top episodes to accelerate personal growth.",
  },
  {
    title: "📅 Event Radar",
    description: "Upcoming webinars, meetups, and more.",
  },
];

const API_KEY = "AIzaSyBjiX2VKSPSKYnLF9LEzHr4n_WxsZX0qqc";
const CSE_ID = "84129d6fc73d94bbd";

export default function Explore() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 text-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center mb-8"
      >
        🔍 Explore LISTO
      </motion.h1>

      <div className="flex justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search for images, links, ideas, docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full max-w-xl px-4 py-2 rounded-full border shadow-md outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="text-center text-lg text-indigo-600 font-semibold">
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {results.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-5 shadow-lg border border-indigo-100 transition"
            >
              <h3 className="text-lg font-bold mb-2 text-indigo-700">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-2">{item.snippet}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 underline hover:text-indigo-700"
              >
                Visit
              </a>
            </motion.div>
          ))}
        </div>
      )}

      {results.length === 0 && !loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-indigo-100"
            >
              <h2 className="text-xl font-semibold mb-2">{cat.title}</h2>
              <p className="text-gray-600">{cat.description}</p>
              <button className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                Explore →
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
