import React, { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import { UseFocusTimerReturn } from '../types';

const FocusTimerContext = createContext<UseFocusTimerReturn | undefined>(undefined);

export function useFocusTimerContext() {
  const context = useContext(FocusTimerContext);
  if (context === undefined) {
    throw new Error('useFocusTimerContext must be used within a FocusTimerProvider');
  }
  return context;
}

const DEFAULT_FOCUS_DURATION = 25 * 60; // 25 minutes in seconds
const DEFAULT_BREAK_DURATION = 5 * 60;  // 5 minutes in seconds

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

  const progress = type === 'focus'
    ? ((DEFAULT_FOCUS_DURATION - timeRemaining) / DEFAULT_FOCUS_DURATION) * 100
    : ((DEFAULT_BREAK_DURATION - timeRemaining) / DEFAULT_BREAK_DURATION) * 100;

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

  const stop = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimeRemaining(type === 'focus' ? DEFAULT_FOCUS_DURATION : DEFAULT_BREAK_DURATION);
  }, [type]);

  const handleFocusSessionComplete = useCallback(() => {
    const newCount = sessionsCompleted + 1;
    setSessionsCompleted(newCount);
    localStorage.setItem('focus-sessions-completed', newCount.toString());
    showNotification('Focus Session Complete! 🎉', 'Time for a well-deserved break!');
  }, [sessionsCompleted, showNotification]);

  const reset = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const duration = type === 'focus' ? DEFAULT_FOCUS_DURATION : DEFAULT_BREAK_DURATION;
    setTimeRemaining(duration);
  }, [type]);

  const handleSessionComplete = useCallback(() => {
    if (type === 'focus') {
      const newCount = sessionsCompleted + 1;
      setSessionsCompleted(newCount);
      localStorage.setItem('focus-sessions-completed', newCount.toString());
      showNotification('Focus Session Complete! 🎉', 'Time for a well-deserved break!');
    } else {
      showNotification('Break Complete! ⚡', 'Ready to focus again?');
    }
  }, [type, sessionsCompleted, showNotification]);

  useEffect(() => {
    if (timeRemaining > 0 || !isActive) return;

    setIsActive(false);

    if (type === 'focus') {
      handleFocusSessionComplete();
    } else {
      handleBreakComplete();
    }

    const event = new CustomEvent('focusSessionCompleted', {
      detail: { sessionsCompleted: type === 'focus' ? sessionsCompleted + 1 : sessionsCompleted }
    });
    window.dispatchEvent(event);
  }, [timeRemaining, isActive, type, handleSessionComplete, sessionsCompleted]);

  return { isActive, timeRemaining, type, progress, sessionsCompleted, start, stop, reset };
};

export function FocusTimerProvider({ children }: { readonly children: ReactNode }) {
  const focusTimer = useFocusTimer();
  return (
    <FocusTimerContext.Provider value={focusTimer}>
      {children}
    </FocusTimerContext.Provider>
  );
}
