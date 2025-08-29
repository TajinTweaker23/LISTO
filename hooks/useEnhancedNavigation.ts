// hooks/useEnhancedNavigation.ts
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';

interface NavigationOptions {
  enableLoadingStates?: boolean;
  enableTransitions?: boolean;
  preloadRoutes?: boolean;
}

export const useEnhancedNavigation = (options: NavigationOptions = {}) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState<string | null>(null);

  const navigateWithFeedback = useCallback(async (
    href: string, 
    options: { replace?: boolean; scroll?: boolean } = {}
  ) => {
    if (isNavigating) return; // Prevent double navigation
    
    setIsNavigating(true);
    setLoadingRoute(href);
    
    try {
      // Add visual feedback
      const button = document.activeElement as HTMLElement;
      if (button) {
        button.style.transform = 'scale(0.95)';
        button.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
          button.style.transform = 'scale(1)';
        }, 100);
      }
      
      // Perform navigation
      if (options.replace) {
        await router.replace(href, undefined, { scroll: options.scroll ?? true });
      } else {
        await router.push(href, undefined, { scroll: options.scroll ?? true });
      }
      
    } catch (error) {
      console.error('Navigation error:', error);
      // Show user-friendly error message
      alert('Navigation failed. Please try again.');
    } finally {
      setIsNavigating(false);
      setLoadingRoute(null);
    }
  }, [router, isNavigating]);

  const preloadRoute = useCallback((href: string) => {
    if (options.preloadRoutes !== false) {
      router.prefetch(href);
    }
  }, [router, options.preloadRoutes]);

  return {
    navigateWithFeedback,
    preloadRoute,
    isNavigating,
    loadingRoute,
    currentPath: router.pathname
  };
};

export default useEnhancedNavigation;
