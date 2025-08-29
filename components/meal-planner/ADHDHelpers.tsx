import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Zap, Target, Brain } from 'lucide-react';

interface FocusTimerProps {
  duration?: number; // in minutes
  onComplete?: () => void;
  taskName?: string;
}

export const FocusTimer: React.FC<FocusTimerProps> = ({
  duration = 25,
  onComplete,
  taskName = "Focus Session"
}) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false);
            setIsCompleted(true);
            onComplete?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 text-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-purple-500" />
        <h3 className="font-semibold text-lg">{taskName}</h3>
      </div>

      {/* Circular Progress */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="6"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={283}
            strokeDashoffset={283 - (progress / 100) * 283}
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (progress / 100) * 283 }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs text-gray-500">
              {isActive ? 'Focus Time' : isCompleted ? 'Complete!' : 'Ready'}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center">
        {!isCompleted ? (
          <>
            <motion.button
              onClick={() => setIsActive(!isActive)}
              className={`px-4 py-2 rounded-lg font-medium ${
                isActive 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive ? 'Pause' : 'Start'}
            </motion.button>
            
            <motion.button
              onClick={() => {
                setTimeLeft(duration * 60);
                setIsActive(false);
                setIsCompleted(false);
              }}
              className="px-4 py-2 rounded-lg font-medium bg-gray-500 hover:bg-gray-600 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 text-green-600 font-semibold"
          >
            <CheckCircle className="w-5 h-5" />
            Session Complete!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  label,
  onClick,
  color = 'primary',
  size = 'md',
  disabled = false
}) => {
  const colorClasses = {
    primary: 'from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
    secondary: 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
    success: 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
    danger: 'from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
  };

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group overflow-hidden
        ${sizeClasses[size]}
        bg-gradient-to-r ${colorClasses[color]}
        text-white font-semibold rounded-xl shadow-lg
        transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
      `}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      <div className="relative flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
    </motion.button>
  );
};

interface MotivationalBadgeProps {
  achievement: string;
  description: string;
  color?: string;
  isNew?: boolean;
}

export const MotivationalBadge: React.FC<MotivationalBadgeProps> = ({
  achievement,
  description,
  color = 'purple',
  isNew = false
}) => {
  return (
    <motion.div
      className={`relative bg-gradient-to-r from-${color}-400 to-${color}-600 text-white p-3 rounded-lg shadow-lg`}
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {isNew && (
        <motion.div
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          NEW!
        </motion.div>
      )}
      
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5" />
        <div>
          <div className="font-semibold text-sm">{achievement}</div>
          <div className="text-xs opacity-90">{description}</div>
        </div>
      </div>
    </motion.div>
  );
};
