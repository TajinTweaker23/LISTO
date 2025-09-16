import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWater, FaWalking, FaBed } from "react-icons/fa";

const metrics = [
  { icon: <FaWater />, label: "Water", value: 8, unit: "glasses", color: "text-blue-500" },
  { icon: <FaWalking />, label: "Steps", value: 8500, unit: "", color: "text-green-500" },
  { icon: <FaBed />, label: "Sleep", value: 7.5, unit: "hrs", color: "text-purple-500" },
];

const WellnessTracker: React.FC = () => {
  const [progress, setProgress] = useState({ water: 6, steps: 6500, sleep: 6 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl"
    >
      {metrics.map((metric, idx) => (
        <motion.div
          key={metric.label}
          whileHover={{ scale: 1.05 }}
          className="bg-white p-4 rounded-xl shadow-lg text-center"
        >
          <div className={`text-4xl mb-2 ${metric.color}`}>{metric.icon}</div>
          <h3 className="font-semibold text-gray-800">{metric.label}</h3>
          <p className="text-2xl font-bold text-gray-700">{progress[metric.label.toLowerCase() as keyof typeof progress]}{metric.unit}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(progress[metric.label.toLowerCase() as keyof typeof progress] / metric.value) * 100}%` }}
              transition={{ duration: 1, delay: idx * 0.2 }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WellnessTracker;