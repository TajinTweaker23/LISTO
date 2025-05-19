import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Explore() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/news'); // Temporary placeholder endpoint
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }

    fetchArticles();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-white to-blue-50">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🌍 Explore What's Happening
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500 italic col-span-full">
            Loading curated stories for you...
          </p>
        ) : (
          articles.map((article, index) => (
            <motion.a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="block p-4 rounded-lg shadow-md bg-white hover:bg-blue-50 transition"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3">
                {article.description || 'No description available.'}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Source: {article.source?.name || 'Unknown'}
              </p>
            </motion.a>
          ))
        )}
      </div>

      <div className="mt-12 text-center">
        <Link href="/">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            ⬅ Back to Home
          </button>
        </Link>
      </div>
    </main>
  );
}
