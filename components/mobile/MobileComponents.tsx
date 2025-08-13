'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MobileCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  gradient?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: 'default' | 'glass' | 'gradient' | 'neurodivergent';
  size?: 'sm' | 'md' | 'lg';
}

export const MobileCard: React.FC<MobileCardProps> = ({
  title,
  description,
  icon: Icon,
  gradient = 'from-blue-500 to-purple-600',
  onClick,
  children,
  variant = 'default',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-lg hover:shadow-xl',
    glass: 'bg-white/80 backdrop-blur-xl border border-white/30',
    gradient: `bg-gradient-to-br ${gradient} text-white`,
    neurodivergent: 'bg-green-50 border-l-4 border-green-500 focus:ring-2 focus:ring-green-300'
  };

  return (
    <motion.div
      className={`
        rounded-2xl transition-all duration-300 cursor-pointer
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        hover:scale-105 active:scale-95
      `}
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-4">
        {Icon && (
          <motion.div
            className={`
              p-3 rounded-xl
              ${variant === 'gradient' ? 'bg-white/20' : 'bg-gradient-to-br from-blue-500 to-purple-600'}
            `}
            whileHover={{ rotate: 15 }}
          >
            <Icon 
              className={`w-6 h-6 ${variant === 'gradient' ? 'text-white' : 'text-white'}`} 
            />
          </motion.div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className={`
            font-semibold text-lg leading-tight
            ${variant === 'gradient' ? 'text-white' : 'text-gray-900'}
          `}>
            {title}
          </h3>
          
          {description && (
            <p className={`
              mt-2 text-sm
              ${variant === 'gradient' ? 'text-white/90' : 'text-gray-600'}
            `}>
              {description}
            </p>
          )}
          
          {children && (
            <div className="mt-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface ProgressIndicatorProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showLabel?: boolean;
  label?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  size = 'md',
  color = 'blue',
  showLabel = true,
  label = 'Progress'
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  onClick,
  gradient = 'from-blue-500 to-purple-600',
  size = 'md',
  position = 'bottom-right'
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
    'bottom-left': 'bottom-6 left-6'
  };

  return (
    <motion.button
      className={`
        fixed ${positionClasses[position]} ${sizeClasses[size]}
        bg-gradient-to-br ${gradient}
        rounded-full shadow-2xl
        flex items-center justify-center
        text-white z-50
        hover:shadow-3xl
      `}
      onClick={onClick}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Icon className={iconSizes[size]} />
    </motion.button>
  );
};

export default MobileCard;
