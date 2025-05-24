"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const GOOGLE_API_KEY = "AIzaSyCBY-vhluDW2PnFv-wjX7whesf6ZFD_Mw8";
const SEARCH_ENGINE_ID = "84129d6fc73d94bbd";

export default function Explore() {
  const [articles, setArticles] = useState<any[]>([]);
  const [query, setQuery] = useState("Hands");
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

  useEffect(() => {
    if (query) {
      fetch(
        `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&searchType=image`
      )
        .then((res) => res.json())
        .then((data) => {
          setArticles(data.items || []);
        })
        .catch((error) => console.error("Image search error:", error));
    }
  }, [query]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2 text-center">🧠 Explore LISTO's Dashboard</h1>
        <p className="text-center text-gray-600 mb-8 text-sm italic">
          {location ? `🌍 Showing inspiration near: ${location}` : "📍 Locating you..."}
        </p>

        <div className="mb-6 text-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, media, and more..."
            className="px-4 py-2 border rounded w-full sm:w-96 shadow"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length === 0 ? (
            <p className="text-center text-gray-500 italic col-span-full">
              🔍 Media search coming soon! This will include GIFs, videos, docs, and images.
            </p>
          ) : (
            articles.map((item, index) => (
              <motion.a
                key={item.link}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="block p-4 rounded-lg shadow bg-white hover:shadow-lg transition duration-300"
              >
                <img
                  src={item.image?.thumbnailLink || item.link}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h2 className="text-lg font-semibold text-blue-800 mb-1">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.displayLink}</p>
              </motion.a>
            ))
          )}
        </div>
      </div>
    </main>
  );
}