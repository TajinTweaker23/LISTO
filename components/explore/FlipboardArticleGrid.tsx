import React from "react";
import { motion } from "framer-motion";

const articles = [
  { title: "Article 1", excerpt: "Short description...", image: "/placeholder.jpg" },
  { title: "Article 2", excerpt: "Another description...", image: "/placeholder.jpg" },
];

const FlipboardArticleGrid: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
    >
      {articles.map((article, idx) => (
        <motion.div
          key={article.title}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ delay: idx * 0.2, duration: 0.6 }}
          whileHover={{ rotateY: 10, scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
        >
          <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="font-bold text-gray-800 mb-2">{article.title}</h3>
            <p className="text-gray-600">{article.excerpt}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FlipboardArticleGrid;