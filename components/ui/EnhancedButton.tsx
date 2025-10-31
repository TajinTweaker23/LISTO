// components/ui/EnhancedButton.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useEnhancedNavigation } from '../../hooks/useEnhancedNavigation';

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  href?: string;
  external?: boolean;
  rippleEffect?: boolean;
  hoverScale?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  rounded?: boolean;
  gradient?: boolean;
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300',
  danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg',
  success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg',
  outline: 'border-2 border-sage-500 text-sage-600 hover:bg-sage-500 hover:text-white bg-transparent'
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
};

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  href,
  external = false,
  rippleEffect = true,
  hoverScale = true,
  loadingText,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  rounded = true,
  gradient = true,
  className,
  onClick,
  disabled,
  ...props
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { navigateWithFeedback, isNavigating } = useEnhancedNavigation();
  
  const isLoading = loading || (href && isNavigating);
  const isDisabled = Boolean(disabled || isLoading);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    // Create ripple effect
    if (rippleEffect && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const newRipple = { id: Date.now(), x, y };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    // Handle navigation
    if (href) {
      event.preventDefault();
      if (external) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        await navigateWithFeedback(href);
      }
    }

    // Call custom onClick handler
    if (onClick) {
      onClick(event);
    }
  };

  const buttonClasses = [
    'relative overflow-hidden font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 active:scale-95',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full' : '',
    rounded ? 'rounded-lg' : '',
    isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className || ''
  ].filter(Boolean).join(' ');

  const motionProps = {
    whileHover: hoverScale && !isDisabled ? { scale: 1.02 } : undefined,
    whileTap: !isDisabled ? { scale: 0.98 } : undefined,
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 }
  };

  const content = (
    <>
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && !isLoading && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {loadingText && <span>{loadingText}</span>}
          </>
        ) : (
          children
        )}
        
        {icon && iconPosition === 'right' && !isLoading && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </span>

      {/* Gradient overlay for extra shine */}
      {gradient && !isDisabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
    </>
  );

  if (href && !external) {
    const { onAnimationStart, onAnimationEnd, onDragStart, onDragEnd, onDrag, ...safeProps } = props;
    return (
      <motion.button
        ref={buttonRef}
        className={buttonClasses}
        onClick={handleClick}
        disabled={isDisabled}
        {...motionProps}
        {...safeProps}
      >
        {content}
      </motion.button>
    );
  }

  const { onAnimationStart, onAnimationEnd, onDragStart, onDragEnd, onDrag, ...safeProps } = props;
  return (
    <motion.button
      ref={buttonRef}
      className={buttonClasses}
      onClick={handleClick}
      disabled={isDisabled}
      {...motionProps}
      {...safeProps}
    >
      {content}
    </motion.button>
  );
};

export default EnhancedButton;
