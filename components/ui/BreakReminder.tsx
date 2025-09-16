import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const BreakReminder: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsBreak(true);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const reset = () => {
    setTimeLeft(300);
    setIsActive(false);
    setIsBreak(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-sm mx-auto bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 p-8 rounded-3xl shadow-2xl text-white text-center"
    >
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-2xl font-bold mb-4 drop-shadow-lg"
      >
        Break Reminder
      </motion.h2>
      <motion.div
        className="text-6xl font-mono mb-6 drop-shadow"
        animate={{ scale: isBreak ? [1, 1.1, 1] : 1 }}
        transition={{ repeat: isBreak ? Infinity : 0, duration: 1 }}
      >
        {formatTime(timeLeft)}
      </motion.div>
      <div className="w-full bg-white/20 rounded-full h-4 mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: "100%" }}
          animate={{ width: `${(timeLeft / 300) * 100}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsActive(!isActive)}
          className="bg-white text-purple-600 p-3 rounded-full shadow-lg hover:bg-purple-100 transition-all"
        >
          {isActive ? <FaPause /> : <FaPlay />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="bg-white text-purple-600 p-3 rounded-full shadow-lg hover:bg-purple-100 transition-all"
        >
          <FaRedo />
        </motion.button>
      </div>
      {isBreak && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-lg"
        >
          Time for a break! Stretch, breathe, and recharge.
        </motion.p>
      )}
    </motion.div>
  );
};

export default BreakReminder;