import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

interface ModernCardProps {
  title: string;
  description: string;
  rating?: number;
}

const ModernCard: React.FC<ModernCardProps> = ({ title, description, rating }) => {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-purple-300 transition-all duration-300"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {rating && (
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          <span className="text-sm text-gray-500">{rating}/5</span>
        </div>
      )}
    </motion.div>
  );
};

export default ModernCard;