import React from "react";
import { motion } from "framer-motion";

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: number;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ children, columns = 3 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`grid gap-6 p-6 ${columns === 1 ? "grid-cols-1" : columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
    >
      {React.Children.map(children, (child, idx) => (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: idx * 0.1 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ResponsiveGrid;