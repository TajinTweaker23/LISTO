
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/AnimatedMenu.css';

const AnimatedMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container relative">
      {/* Menu Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="menu-trigger fixed top-6 right-6 z-50 w-12 h-12 flex flex-col justify-center items-center gap-1.5 cursor-pointer"
      >
        <i className="menu-trigger-bar top w-8 h-0.5 bg-gray-800"></i>
        <i className="menu-trigger-bar middle w-8 h-0.5 bg-gray-800"></i>
        <i className="menu-trigger-bar bottom w-8 h-0.5 bg-gray-800"></i>
      </button>

      {/* Logo */}
      <motion.span 
        className="logo fixed top-6 left-6 z-50"
        animate={{ scale: isOpen ? 0.8 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <svg width="50" height="50" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="15" fill="#6295ca" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="50" fill="#fff">L</text>
          </svg>
        </div>
      </motion.span>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-blue-500 z-40"
            />
            
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="close-trigger fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center cursor-pointer"
            >
              <div className="relative w-8 h-8">
                <i className="close-trigger-bar left absolute top-1/2 left-0 w-8 h-0.5 bg-white transform -translate-y-1/2 rotate-45"></i>
                <i className="close-trigger-bar right absolute top-1/2 left-0 w-8 h-0.5 bg-white transform -translate-y-1/2 -rotate-45"></i>
              </div>
            </motion.button>

            {/* Menu Items */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="menu-container fixed inset-0 z-40 flex items-center justify-center"
            >
              <ul className="menu text-center space-y-6">
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <a href="#" className="text-white text-4xl font-bold hover:text-blue-200 transition-colors">Login</a>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <a href="#" className="text-white text-4xl font-bold hover:text-blue-200 transition-colors">Create account</a>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <a href="#" className="text-white text-4xl font-bold hover:text-blue-200 transition-colors">Support</a>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <a href="#" className="text-white text-4xl font-bold hover:text-blue-200 transition-colors">About</a>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedMenu;
