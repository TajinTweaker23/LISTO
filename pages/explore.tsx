// pages/explore.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Explore() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?language=en&pageSize=20&category=general&q=world OR health OR science OR sports OR wellness OR sustainability OR social%20justice OR education OR climate&apiKey=020d432c85854e3f89951167c4c1bd3d');
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }

    fetchArticles();
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 to-blue-100">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-800">🌍 Explore What’s Happening</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length === 0 ? (
          <p className="text-center text-gray-600 italic col-span-full">Loading curated stories for you...</p>
        ) : (
          articles.map((article, index) => (
            <motion.a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="block rounded-lg shadow-lg bg-white p-5 hover:shadow-xl transition-all duration-300"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-lg font-semibold text-blue-700 mb-2">{article.title}</h2>
              <p className="text-sm text-gray-700 line-clamp-3">{article.description}</p>
              <p className="text-xs text-gray-500 mt-2">{new Date(article.publishedAt).toLocaleDateString()} — {article.source?.name}</p>
            </motion.a>
          ))
        )}
      </div>

      <div className="text-center mt-12">
        <Link href="/">
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">⬅ Back to Home</button>
        </Link>
      </div>
    </main>
  );
}
