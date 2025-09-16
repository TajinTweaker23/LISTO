import React from "react";
import { motion } from "framer-motion";

interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default ResponsiveCard;