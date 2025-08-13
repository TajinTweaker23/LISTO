import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'circle';
  color?: string;
  className?: string;
  sizes?: 'sm' | 'md' | 'lg';
}

const Loader: React.FC<LoaderProps> = ({ 
  variant = 'spinner',
  color = "#6366f1", 
  className = "",
  sizes = 'md'
}) => {
  // Size mappings
  const sizeClasses = {
    sm: { width: 20, height: 20, dots: 'w-2 h-2', bars: 'w-1 h-6' },
    md: { width: 32, height: 32, dots: 'w-3 h-3', bars: 'w-2 h-8' },
    lg: { width: 48, height: 48, dots: 'w-4 h-4', bars: 'w-3 h-12' }
  };

  const currentSize = sizeClasses[sizes];

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={`flex gap-1 ${className}`}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`${currentSize.dots} rounded-full`}
                style={{ backgroundColor: color }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <motion.div
            className={`${currentSize.dots} rounded-full ${className}`}
            style={{ backgroundColor: color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );

      case 'bars':
        return (
          <div className={`flex gap-1 items-end ${className}`}>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className={`${currentSize.bars} rounded-t`}
                style={{ backgroundColor: color }}
                animate={{
                  scaleY: [1, 2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        );

      case 'circle':
        return (
          <motion.div
            className={`border-4 border-gray-200 rounded-full ${className}`}
            style={{ 
              width: currentSize.width, 
              height: currentSize.height,
              borderTopColor: color 
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );

      default: // spinner
        return (
          <motion.div
            className={`border-4 border-gray-200 border-t-transparent rounded-full ${className}`}
            style={{ 
              width: currentSize.width, 
              height: currentSize.height,
              borderTopColor: color 
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
    }
  };

  return (
    <div className="flex items-center justify-center">
      {renderLoader()}
    </div>
  );
};

export default Loader;
