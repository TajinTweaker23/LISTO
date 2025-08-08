import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface DarkModeToggleProps {
  className?: string;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ className = '' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDarkMode = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    setIsDarkMode(shouldUseDarkMode);
    updateTheme(shouldUseDarkMode);
  }, []);

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--bg-primary', 'var(--dark-bg-primary)');
      document.documentElement.style.setProperty('--bg-secondary', 'var(--dark-bg-secondary)');
      document.documentElement.style.setProperty('--surface', 'var(--dark-surface)');
      document.documentElement.style.setProperty('--text-primary', 'var(--dark-text)');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.removeProperty('--bg-primary');
      document.documentElement.style.removeProperty('--bg-secondary');
      document.documentElement.style.removeProperty('--surface');
      document.documentElement.style.removeProperty('--text-primary');
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    updateTheme(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}
        ${className}
      `}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Track */}
      <div className="absolute inset-0 rounded-full">
        {/* Sun Icon */}
        <div className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center transition-opacity duration-300 ${
          isDarkMode ? 'opacity-0' : 'opacity-100 bg-yellow-400 text-yellow-800'
        }`}>
          <Sun className="w-4 h-4" />
        </div>
        
        {/* Moon Icon */}
        <div className={`absolute right-1 top-1 w-6 h-6 rounded-full flex items-center justify-center transition-opacity duration-300 ${
          isDarkMode ? 'opacity-100 bg-blue-600 text-blue-100' : 'opacity-0'
        }`}>
          <Moon className="w-4 h-4" />
        </div>
      </div>

      {/* Sliding Indicator */}
      <motion.div
        className="absolute top-0.5 w-7 h-7 bg-white rounded-full shadow-md"
        animate={{
          x: isDarkMode ? 32 : 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  );
};

export default DarkModeToggle;
