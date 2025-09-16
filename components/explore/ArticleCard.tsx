import React from "react";
import { motion } from "framer-motion";
import { FaBookmark, FaShare } from "react-icons/fa";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, excerpt, author, date }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>By {author} • {date}</span>
        <div className="flex gap-2">
          <FaBookmark className="cursor-pointer hover:text-blue-500" />
          <FaShare className="cursor-pointer hover:text-blue-500" />
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;