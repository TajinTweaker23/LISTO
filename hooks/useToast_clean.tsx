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
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const timeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const addToast = useCallback((
    message: string, 
    type: 'success' | 'error' | 'info' | 'warning' = 'info', 
    duration: number = 3000
  ): number => {
    const id = Date.now();
    const newToast: ToastState = {
      id,
      message,
      type,
      duration,
      timestamp: Date.now(),
      show: true
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast after duration
    const timeout = setTimeout(() => {
      removeToast(id);
    }, duration);
    
    timeoutsRef.current.set(id, timeout);
    
    return id;
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current.clear();
    setToasts([]);
  }, []);

  const success = useCallback((message: string, duration?: number) => 
    addToast(message, 'success', duration), [addToast]);
  
  const error = useCallback((message: string, duration?: number) => 
    addToast(message, 'error', duration), [addToast]);
  
  const info = useCallback((message: string, duration?: number) => 
    addToast(message, 'info', duration), [addToast]);
  
  const warning = useCallback((message: string, duration?: number) => 
    addToast(message, 'warning', duration), [addToast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current.clear();
    };
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    info,
    warning
  };
};
