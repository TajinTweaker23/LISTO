import React, { createContext, useContext, ReactNode } from 'react';
import { useState, useCallback, useRef, useEffect, createContext, useContext, ReactNode } from 'react';
import { UseFocusTimerReturn } from '../types';

const FocusTimerContext = createContext<UseFocusTimerReturn | undefined>(undefined);

export function useFocusTimerContext() {
  const context = useContext(FocusTimerContext);
  if (context === undefined) {
    throw new Error('useFocusTimerContext must be used within a FocusTimerProvider');
  }
  return context;
}

export function FocusTimerProvider({ children }: { children: ReactNode }) {
  const focusTimer = useFocusTimer();
  return (
    <FocusTimerContext.Provider value={focusTimer}>
      {children}
    </FocusTimerContext.Provider>
  );
}

const DEFAULT_FOCUS_DURATION = 25 * 60; // 25 minutes in seconds
const DEFAULT_BREAK_DURATION = 5 * 60;  // 5 minutes in seconds

/**
 * Custom hook for managing focus timer (Pomodoro technique) with persistence and notifications
 */
export const useFocusTimer = (): UseFocusTimerReturn => {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_FOCUS_DURATION);
  const [type, setType] = useState<'focus' | 'break'>('focus');
  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const stored = localStorage.getItem('focus-sessions-completed');
    return stored ? parseInt(stored, 10) : 0;
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Calculate progress percentage
  const progress = type === 'focus' 
    ? ((DEFAULT_FOCUS_DURATION - timeRemaining) / DEFAULT_FOCUS_DURATION) * 100
    : ((DEFAULT_BREAK_DURATION - timeRemaining) / DEFAULT_BREAK_DURATION) * 100;

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const showNotification = useCallback((title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.png' });
    }
  }, []);

  const start = useCallback((timerType: 'focus' | 'break' = 'focus') => {
    setType(timerType);
    const duration = timerType === 'focus' ? DEFAULT_FOCUS_DURATION : DEFAULT_BREAK_DURATION;
    setTimeRemaining(duration);
    setIsActive(true);
    startTimeRef.current = Date.now();

    // Request notification permission if not granted
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleFocusSessionComplete = useCallback(() => {
    const newCount = sessionsCompleted + 1;
    setSessionsCompleted(newCount);
    localStorage.setItem('focus-sessions-completed', newCount.toString());
    
    // Show completion notification
    showNotification('Focus Session Complete! 🎉', 'Time for a well-deserved break!');
    
    // Auto-start break if enabled
    const autoStartBreaks = localStorage.getItem('auto-start-breaks') === 'true';
    if (autoStartBreaks) {
      setTimeout(() => start('break'), 1000);
    }
  }, [sessionsCompleted, start, showNotification]);

  const handleBreakComplete = useCallback(() => {
    showNotification('Break Complete! ⚡', 'Ready to focus again?');
  }, [showNotification]);

  // Handle timer completion
  useEffect(() => {
    if (timeRemaining > 0 || !isActive) return;
    
    setIsActive(false);
    
    if (type === 'focus') {
      handleFocusSessionComplete();
    } else {
      handleBreakComplete();
    }
    
    // Trigger achievement check
    const event = new CustomEvent('focusSessionCompleted', {
      detail: { sessionsCompleted: type === 'focus' ? sessionsCompleted + 1 : sessionsCompleted }
    });
    window.dispatchEvent(event);
  }, [timeRemaining, isActive, type, handleFocusSessionComplete, handleBreakComplete, sessionsCompleted]);

  return { isActive, timeRemaining, type, progress, sessionsCompleted, start, stop, reset };
};

export const FocusTimerContext = createContext<UseFocusTimerReturn | undefined>(undefined);

export const FocusTimerProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const focusTimer = useFocusTimer();
  return (
    <FocusTimerContext.Provider value={focusTimer}>
      {children}
    </FocusTimerContext.Provider>
  );
};
