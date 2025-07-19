import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AchievementBadgeProps = {
  name: string;
  description: string;
  icon: string;
  show: boolean;
};

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ name, description, icon, show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] mt-5 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white p-4 rounded-xl shadow-lg flex items-center gap-4 border-2 border-white/50"
        >
          <div className="text-4xl">{icon}</div>
          <div>
            <div className="font-bold text-lg">{name}</div>
            <div className="text-sm">{description}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementBadge;
