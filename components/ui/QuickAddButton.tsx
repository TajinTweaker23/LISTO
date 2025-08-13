import React from 'react';
import { motion } from 'framer-motion';

type QuickAddButtonProps = {
  onClick: () => void;
};

const QuickAddButton: React.FC<QuickAddButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      type="button"
      className="fixed bottom-10 right-10 p-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-pink-500/60 transition-all duration-300 border-4 border-white/20 z-20 ring-4 ring-pink-400/30 focus:outline-none focus:ring-8 focus:ring-blue-400/40 animate-fab-pulse"
      aria-label="Add"
      tabIndex={0}
      whileHover={{ scale: 1.13, boxShadow: "0 0 32px #f472b6" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 drop-shadow-neon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
      <span className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded shadow pointer-events-none z-10 transition">
        Quick Add
      </span>
    </motion.button>
  );
};

export default QuickAddButton;
