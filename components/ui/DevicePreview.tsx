import React from "react";
import { motion } from "framer-motion";
import { FaMobileAlt, FaTabletAlt, FaDesktop } from "react-icons/fa";

const devices = [
  { icon: <FaMobileAlt />, label: "Mobile", size: "w-32 h-64" },
  { icon: <FaTabletAlt />, label: "Tablet", size: "w-48 h-72" },
  { icon: <FaDesktop />, label: "Desktop", size: "w-80 h-56" },
];

const DevicePreview: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-wrap justify-center gap-8 p-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl shadow-xl"
    >
      {devices.map((device, idx) => (
        <motion.div
          key={device.label}
          whileHover={{ scale: 1.05, rotateY: 10 }}
          className={`bg-white ${device.size} rounded-2xl shadow-lg border-4 border-gray-300 flex flex-col items-center justify-center p-4`}
        >
          <span className="text-4xl text-gray-600 mb-2">{device.icon}</span>
          <span className="text-sm font-semibold text-gray-700">{device.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DevicePreview;