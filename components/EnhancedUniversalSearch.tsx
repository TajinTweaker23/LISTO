import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilter } from "react-icons/fa";

const EnhancedUniversalSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = () => {
    // Mock search
    setResults(["Result 1", "Result 2", "Result 3"]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Search everything..."
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-500 text-white p-3 rounded-lg"
        >
          <FaFilter />
        </motion.button>
      </div>
      {results.length > 0 && (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          {results.map((result, idx) => (
            <motion.li
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              {result}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default EnhancedUniversalSearch;