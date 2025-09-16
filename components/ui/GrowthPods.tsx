import React from "react";
import { motion } from "framer-motion";
import { FaSeedling, FaTree, FaLeaf } from "react-icons/fa";

const pods = [
  { icon: <FaSeedling />, title: "Beginner", description: "Start your journey", color: "from-green-400 to-green-600" },
  { icon: <FaTree />, title: "Intermediate", description: "Grow stronger", color: "from-blue-400 to-blue-600" },
  { icon: <FaLeaf />, title: "Advanced", description: "Master your skills", color: "from-purple-400 to-purple-600" },
];

const GrowthPods: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-8">
      {pods.map((pod, idx) => (
        <motion.div
          key={pod.title}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ scale: 1.1, rotateY: 5 }}
          className={`bg-gradient-to-br ${pod.color} p-6 rounded-2xl shadow-xl text-white text-center cursor-pointer`}
        >
          <div className="text-5xl mb-4">{pod.icon}</div>
          <h3 className="text-xl font-bold mb-2">{pod.title}</h3>
          <p>{pod.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default GrowthPods;