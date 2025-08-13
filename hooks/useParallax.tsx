import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { UseParallaxReturn } from '../types';

/**
 * Custom hook for managing parallax mouse effects with performance optimization
 */
export const useParallax = (): UseParallaxReturn => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return false;
    
    // Check stored preference
    const stored = localStorage.getItem('parallax-enabled');
    return stored !== null ? stored === 'true' : true;
  });

  useEffect(() => {
    if (!isEnabled) {
      setParallax({ x: 0, y: 0 });
      return;
    }

    let animationFrameId: number;
    let isThrottled = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (isThrottled) return;
      
      isThrottled = true;
      
      animationFrameId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        setParallax({ x, y });
        isThrottled = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isEnabled]);

  // Listen for motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsEnabled(false);
        localStorage.setItem('parallax-enabled', 'false');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggle = useCallback(() => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    localStorage.setItem('parallax-enabled', newEnabled.toString());
    
    if (!newEnabled) {
      setParallax({ x: 0, y: 0 });
    }
  }, [isEnabled]);

  return {
    parallax,
    isEnabled,
    toggle,
  };
};

export const ParallaxContext = createContext<UseParallaxReturn | undefined>(undefined);

export const ParallaxProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const parallax = useParallax();
  return (
    <ParallaxContext.Provider value={parallax}>
      {children}
    </ParallaxContext.Provider>
  );
};

export const useParallaxContext = () => {
  const context = useContext(ParallaxContext);
  if (context === undefined) {
    throw new Error('useParallaxContext must be used within a ParallaxProvider');
  }
  return context;
};
