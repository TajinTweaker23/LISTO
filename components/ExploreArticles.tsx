import React from "react";
import { motion } from "framer-motion";
import ArticleCard from "./explore/ArticleCard";

const articles = [
  { title: "How to Boost Productivity", excerpt: "Tips for staying focused...", author: "Jane Doe", date: "Aug 29, 2025" },
  { title: "Mindfulness in Daily Life", excerpt: "Simple practices...", author: "John Smith", date: "Aug 28, 2025" },
];

const ExploreArticles: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Explore Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <ArticleCard {...article} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExploreArticles;