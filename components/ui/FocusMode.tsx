import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Eye, Volume2, Heart } from 'lucide-react';

interface FocusModeProps {
  onToggle?: (isEnabled: boolean) => void;
}

export const FocusMode: React.FC<FocusModeProps> = ({ onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    largerText: false,
    soundEnabled: true,
  });
  const [wellnessPrompt, setWellnessPrompt] = useState('Take a deep breath and focus on your goals.');

  useEffect(() => {
    // Check for system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setPreferences(prev => ({
      ...prev,
      reducedMotion: prefersReducedMotion,
      highContrast: prefersHighContrast,
    }));
  }, []);

  const toggleFocusMode = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    
    // Apply focus mode styles
    if (newState) {
      document.documentElement.classList.add('focus-mode');
      document.documentElement.style.setProperty('--animation-speed', '0s');
      document.documentElement.style.setProperty('--transition-speed', '0.1s');
      // Add wellness overlay
      setWellnessPrompt('Great job entering focus mode! Remember to stay hydrated.');
    } else {
      document.documentElement.classList.remove('focus-mode');
      setWellnessPrompt('Focus session complete. How do you feel?');
    }
    onToggle?.(newState);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white bg-opacity-95 backdrop-blur-xl rounded-2xl border border-gray-200 border-opacity-60 p-6 shadow-lg"
    >
      {/* Main Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-primary-100 to-purple-100 rounded-xl">
            <Brain className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Focus Mode</h3>
            <p className="text-sm text-gray-500">Optimize for concentration</p>
          </div>
        </div>
        
        <button
          onClick={toggleFocusMode}
          aria-label={`${isEnabled ? 'Disable' : 'Enable'} focus mode`}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
            isEnabled 
              ? 'bg-gradient-to-r from-primary-500 to-primary-600' 
              : 'bg-gray-300'
          }`}
        >
          <motion.div
            className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
            animate={{ x: isEnabled ? 24 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      {/* Detailed Preferences */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isEnabled ? 'auto' : 0, 
          opacity: isEnabled ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="space-y-4 pt-4 border-t border-gray-200/60">
          {/* Motion Sensitivity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Reduce Motion</span>
            </div>
            <button
              onClick={() => updatePreference('reducedMotion', !preferences.reducedMotion)}
              aria-label={`${preferences.reducedMotion ? 'Disable' : 'Enable'} reduced motion`}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                preferences.reducedMotion ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                animate={{ x: preferences.reducedMotion ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gradient-to-r from-gray-900 to-gray-300 rounded-sm" />
              <span className="text-sm font-medium text-gray-700">High Contrast</span>
            </div>
            <button
              onClick={() => updatePreference('highContrast', !preferences.highContrast)}
              aria-label={`${preferences.highContrast ? 'Disable' : 'Enable'} high contrast`}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                preferences.highContrast ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                animate={{ x: preferences.highContrast ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          {/* Larger Text */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-600">Aa</span>
              <span className="text-sm font-medium text-gray-700">Larger Text</span>
            </div>
            <button
              onClick={() => updatePreference('largerText', !preferences.largerText)}
              aria-label={`${preferences.largerText ? 'Disable' : 'Enable'} larger text`}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                preferences.largerText ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                animate={{ x: preferences.largerText ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          {/* Sound Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Sound Feedback</span>
            </div>
            <button
              onClick={() => updatePreference('soundEnabled', !preferences.soundEnabled)}
              aria-label={`${preferences.soundEnabled ? 'Disable' : 'Enable'} sound feedback`}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                preferences.soundEnabled ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                animate={{ x: preferences.soundEnabled ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FocusMode;
