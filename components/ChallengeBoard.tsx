import React from "react";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

const challenges = [
  { title: "Daily Walk", progress: 80 },
  { title: "Read 10 Pages", progress: 60 },
  { title: "Meditate", progress: 100 },
];

const ChallengeBoard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-orange-800 flex items-center justify-center gap-2">
        <FaTrophy /> Challenge Board
      </h2>
      <div className="space-y-4">
        {challenges.map((challenge, idx) => (
          <motion.div
            key={challenge.title}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">{challenge.title}</span>
              <span className="text-sm text-gray-600">{challenge.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-orange-400 to-yellow-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${challenge.progress}%` }}
                transition={{ duration: 1, delay: idx * 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ChallengeBoard;