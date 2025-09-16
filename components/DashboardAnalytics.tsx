import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaUsers, FaTasks } from "react-icons/fa";

const metrics = [
  { icon: <FaChartLine />, label: "Productivity", value: "85%", color: "text-green-500" },
  { icon: <FaUsers />, label: "Connections", value: "42", color: "text-blue-500" },
  { icon: <FaTasks />, label: "Tasks Completed", value: "127", color: "text-purple-500" },
];

const DashboardAnalytics: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6"
    >
      {metrics.map((metric, idx) => (
        <motion.div
          key={metric.label}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: idx * 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200"
        >
          <div className={`text-4xl mb-4 ${metric.color}`}>{metric.icon}</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{metric.value}</h3>
          <p className="text-gray-600">{metric.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardAnalytics;