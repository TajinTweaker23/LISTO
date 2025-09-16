import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const FloatingSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-500 text-white p-4 rounded-full shadow-lg z-40"
      >
        <FaSearch />
      </motion.button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search..."
              autoFocus
            />
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default FloatingSearch;