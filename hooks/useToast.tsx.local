import React, { useState, useCallback, useRef, useEffect, createContext, useContext, ReactNode } from 'react';
import { ToastState, UseToastReturn } from '../types';

const ToastContext = createContext<UseToastReturn | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const toast = useToast();
  return (
    <ToastContext.Provider value={toast}>
      {children}
    </ToastContext.Provider>
  );
};

/**
 * Custom hook for managing toast notifications with enhanced features
 */
export const useToast = (): UseToastReturn => {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    show: false,
    type: 'info',
    duration: 3000
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((
    message: string, 
    type: ToastState['type'] = 'info', 
    duration: number = 3000
  ) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToast({ message, show: true, type, duration });

    // Auto-hide toast
    timeoutRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, duration);
  }, []);

  const hideToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setToast(prev => ({ ...prev, show: false }));
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    toast,
    showToast,
    hideToast
  };
};
