import React, { useState, useCallback, useRef, createContext, useContext, ReactNode } from 'react';
import { ToastState, UseToastReturn } from '../types';

/**
 * Custom hook for managing toast notifications with enhanced features
 */
export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const toastIdRef = useRef(0);

  const removeToast = useCallback((id: number) => {
    setToasts(prevToasts => prevToasts.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration = 3000) => {
    const id = toastIdRef.current++;
    const toast: ToastState = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, [removeToast]);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts
  };
};

const ToastContext = createContext<UseToastReturn | undefined>(undefined);

export const ToastProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const toast = useToast();
  return (
    <ToastContext.Provider value={toast}>
      {children}
    </ToastContext.Provider>
  );
};

export function useToastContext() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}
