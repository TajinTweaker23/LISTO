import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastState } from '../../types';
import { designTokens } from '../../lib/design-system';

interface EnhancedToastProps {
  toast: ToastState;
  onClose?: () => void;
}

const toastStyles = {
  success: {
    bg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    icon: '✅',
    border: 'border-emerald-400/30',
  },
  error: {
    bg: 'bg-gradient-to-r from-red-500 to-rose-500',
    icon: '❌',
    border: 'border-red-400/30',
  },
  warning: {
    bg: 'bg-gradient-to-r from-amber-500 to-orange-500',
    icon: '⚠️',
    border: 'border-amber-400/30',
  },
  info: {
    bg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    icon: 'ℹ️',
    border: 'border-blue-400/30',
  },
};

/**
 * Enhanced Toast component with better styling and accessibility
 */
const EnhancedToast: React.FC<EnhancedToastProps> = ({ toast, onClose }) => {
  const { message, type = 'info' } = toast;
  const style = toastStyles[type];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.8 }}
      animate={{ 
        y: 0, 
        opacity: 1, 
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
          duration: 0.4,
        }
      }}
      exit={{ 
        y: 100, 
        opacity: 0, 
        scale: 0.8,
        transition: {
          duration: 0.3,
          ease: 'easeInOut',
        }
      }}
          className={`
            fixed bottom-8 left-1/2 -translate-x-1/2 z-[${designTokens.zIndex.toast}]
            ${style.bg} ${style.border}
            text-white px-6 py-4 rounded-2xl shadow-2xl
            font-semibold text-sm backdrop-blur-sm
            border border-solid
            max-w-md w-auto
            flex items-center gap-3
            hover:scale-105 transition-transform duration-200
          `}
          role="alert"
          aria-live="polite"
          style={{
            boxShadow: `${designTokens.shadows.lg}, 0 0 30px rgba(0, 0, 0, 0.3)`,
          }}
        >
          <span className="text-lg" role="img" aria-label={`${type} icon`}>
            {style.icon}
          </span>
          <span className="flex-1">{message}</span>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 text-white/70 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
              aria-label="Close notification"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </button>
          )}
        </motion.div>
  );
};

export default EnhancedToast;
