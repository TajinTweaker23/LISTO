import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Explore() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${process.env.NEXT_PUBLIC_CURRENTS_API_KEY}`);
        const data = await response.json();
        setArticles(data.news || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }

    fetchArticles();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-white to-gray-100">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">📰 Explore What's Happening</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500 italic col-span-full">
            Loading curated stories for you...
          </p>
        ) : (
          articles.map((article, index) => (
            <motion.a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="block p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-700 text-sm mb-2">
                {article.description?.slice(0, 160)}...
              </p>
              <span className="text-xs text-gray-500 italic">
                {new Date(article.published).toLocaleString()} — {article.category?.join(', ')}
              </span>
            </motion.a>
          ))
        )}
      </div>

      <div className="text-center mt-10">
        <Link href="/">
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-xl">
            ← Back to Home
          </button>
        </Link>
      </div>
    </main>
  );
}
