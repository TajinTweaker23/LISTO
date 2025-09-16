"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Hook for device detection and capabilities
const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = React.useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    hasTouch: false,
    hasHover: false,
    orientation: 'portrait' as 'portrait' | 'landscape',
    viewportHeight: 0,
    safeAreaTop: 0,
    safeAreaBottom: 0,
    reducedMotion: false,
    highContrast: false,
    supportsHaptics: false,
    isIPad: false,
    isAndroid: false,
  });

  React.useEffect(() => {
    const updateCapabilities = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Get CSS safe area values
      const safeAreaTop = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--safe-area-inset-top') || '0');
      const safeAreaBottom = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--safe-area-inset-bottom') || '0');

      const userAgent = navigator.userAgent;
      const isIPad = /iPad/.test(userAgent) || (/Macintosh/.test(userAgent) && 'ontouchend' in document);
      const isAndroid = /Android/.test(userAgent);

      setCapabilities({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        hasTouch: 'ontouchstart' in window,
        hasHover: window.matchMedia('(hover: hover)').matches,
        orientation: height > width ? 'portrait' : 'landscape',
        viewportHeight: height,
        safeAreaTop,
        safeAreaBottom,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        highContrast: window.matchMedia('(prefers-contrast: high)').matches,
        supportsHaptics: 'vibrate' in navigator,
        isIPad,
        isAndroid,
      });
    };

    updateCapabilities();
    window.addEventListener('resize', updateCapabilities);
    window.addEventListener('orientationchange', updateCapabilities);
    
    return () => {
      window.removeEventListener('resize', updateCapabilities);
      window.removeEventListener('orientationchange', updateCapabilities);
    };
  }, []);

  return capabilities;
};// Hook for pull-to-refresh
const usePullToRefresh = (onRefresh: () => Promise<void>, enabled = true) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [pullDistance, setPullDistance] = React.useState(0);
  const touchStartY = React.useRef(0);
  const scrollElement = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!enabled) return;

    let startY = 0;
    let currentY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        touchStartY.current = startY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!startY || window.scrollY > 0) return;
      
      currentY = e.touches[0].clientY;
      const pullDistance = Math.max(0, (currentY - startY) * 0.5);
      
      if (pullDistance > 0) {
        e.preventDefault();
        setPullDistance(pullDistance);
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance > 80 && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      }
      setPullDistance(0);
      startY = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, enabled, pullDistance, isRefreshing]);

  return { isRefreshing, pullDistance };
};

// Haptic feedback hook
const useHaptics = () => {
  const triggerHaptic = React.useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30, 10, 30]
      };
      navigator.vibrate(patterns[type]);
    }
  }, []);

  return { triggerHaptic };
};

const layoutVariants = cva(
  "min-h-screen bg-background text-foreground transition-all duration-300",
  {
    variants: {
      pattern: {
        default: "flex flex-col",
        sidebar: "flex",
        dashboard: "grid grid-cols-1 lg:grid-cols-12",
        mobile: "flex flex-col",
        fullscreen: "h-screen overflow-hidden",
      },
      spacing: {
        none: "",
        sm: "p-2 gap-2",
        default: "p-4 gap-4",
        lg: "p-6 gap-6",
        adaptive: "", // Will be set dynamically
      },
      safeArea: {
        none: "",
        top: "",
        bottom: "",
        both: "",
      }
    },
    defaultVariants: {
      pattern: "default",
      spacing: "adaptive",
      safeArea: "both",
    },
  }
);

interface AdaptiveLayoutProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
         VariantProps<typeof layoutVariants> {
  // Core layout props
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  fab?: React.ReactNode; // Floating Action Button
  
  // Mobile-specific features
  pullToRefresh?: () => Promise<void>;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enableHaptics?: boolean;
  
  // Layout behavior
  stickyHeader?: boolean;
  hideHeaderOnScroll?: boolean;
  bottomSheet?: React.ReactNode;
  
  // Accessibility
  skipToContent?: boolean;
  announcements?: string;
  
  // Performance
  lazyLoad?: boolean;
  prioritizeAboveFold?: boolean;
}

const AdaptiveLayout = React.forwardRef<HTMLDivElement, AdaptiveLayoutProps>(
  ({
    className,
    pattern = "default",
    spacing = "adaptive", 
    safeArea = "both",
    header,
    footer,
    sidebar,
    fab,
    pullToRefresh,
    onSwipeLeft,
    onSwipeRight,
    enableHaptics = false,
    stickyHeader = false,
    hideHeaderOnScroll = false,
    bottomSheet,
    skipToContent = true,
    announcements,
    lazyLoad = true,
    prioritizeAboveFold = true,
    children,
    ...props
  }, ref) => {
    
    const capabilities = useDeviceCapabilities();
    const { triggerHaptic } = useHaptics();
    const [headerVisible, setHeaderVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const mainContentRef = React.useRef<HTMLDivElement>(null);

    // Pull to refresh
    const pullToRefreshData = usePullToRefresh(
      pullToRefresh || (() => Promise.resolve()),
      !!pullToRefresh && capabilities.isMobile
    );

    // Swipe gestures
    React.useEffect(() => {
      if (!capabilities.hasTouch || (!onSwipeLeft && !onSwipeRight)) return;

      let startX = 0;
      let startY = 0;

      const handleTouchStart = (e: TouchEvent) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      };

      const handleTouchEnd = (e: TouchEvent) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        // Only trigger if horizontal swipe is dominant
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
          if (deltaX > 0 && onSwipeRight) {
            enableHaptics && triggerHaptic('light');
            onSwipeRight();
          } else if (deltaX < 0 && onSwipeLeft) {
            enableHaptics && triggerHaptic('light');
            onSwipeLeft();
          }
        }
      };

      const element = mainContentRef.current;
      if (element) {
        element.addEventListener('touchstart', handleTouchStart, { passive: true });
        element.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
          element.removeEventListener('touchstart', handleTouchStart);
          element.removeEventListener('touchend', handleTouchEnd);
        };
      }
    }, [onSwipeLeft, onSwipeRight, capabilities.hasTouch, enableHaptics, triggerHaptic]);

    // Header hide/show on scroll
    React.useEffect(() => {
      if (!hideHeaderOnScroll) return;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setHeaderVisible(false);
        } else {
          setHeaderVisible(true);
        }
        
        setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, hideHeaderOnScroll]);

    // Dynamic spacing based on device
    const getAdaptiveSpacing = () => {
      if (spacing !== "adaptive") return "";
      
      if (capabilities.isMobile) return "p-3 gap-3";
      if (capabilities.isTablet) return "p-5 gap-5";
      return "p-6 gap-6";
    };

    // Safe area styles
    const getSafeAreaStyles = () => {
      const styles: React.CSSProperties = {};
      
      if (safeArea === "top" || safeArea === "both") {
        styles.paddingTop = `max(1rem, env(safe-area-inset-top))`;
      }
      if (safeArea === "bottom" || safeArea === "both") {
        styles.paddingBottom = `max(1rem, env(safe-area-inset-bottom))`;
      }
      
      return styles;
    };

    // Determine layout pattern based on device
    const getEffectivePattern = () => {
      if (capabilities.isMobile) return "mobile";
      return pattern;
    };

    const effectivePattern = getEffectivePattern();
    const adaptiveSpacing = getAdaptiveSpacing();

    return (
      <>
        {/* Skip to content link for accessibility */}
        {skipToContent && (
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            Skip to main content
          </a>
        )}

        {/* Live announcements for screen readers */}
        {announcements && (
          <div role="status" aria-live="polite" className="sr-only">
            {announcements}
          </div>
        )}

        <div
          ref={ref}
          className={cn(
            layoutVariants({ 
              pattern: effectivePattern, 
              spacing: spacing === "adaptive" ? undefined : spacing 
            }),
            adaptiveSpacing,
            className
          )}
          style={getSafeAreaStyles()}
          {...props}
        >
          {/* Pull to refresh indicator */}
          {pullToRefresh && capabilities.isMobile && (
            <div 
              className={cn(
                "fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300",
                pullToRefreshData.isRefreshing || pullToRefreshData.pullDistance > 0 
                  ? "opacity-100" : "opacity-0"
              )}
              style={{
                transform: `translateX(-50%) translateY(${Math.min(pullToRefreshData.pullDistance, 80)}px)`
              }}
            >
              <div className="bg-background border rounded-full p-3 shadow-lg">
                {pullToRefreshData.isRefreshing ? (
                  <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                ) : (
                  <div className="h-5 w-5 text-muted-foreground">↓</div>
                )}
              </div>
            </div>
          )}

          {/* Header */}
          {header && (
            <header 
              className={cn(
                "flex-shrink-0 transition-transform duration-300",
                stickyHeader && "sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b",
                hideHeaderOnScroll && !headerVisible && "-translate-y-full"
              )}
            >
              {header}
            </header>
          )}

          {/* Main layout container */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar for larger screens */}
            {sidebar && !capabilities.isMobile && (
              <aside className="flex-shrink-0 w-64 lg:w-72 border-r bg-card">
                {sidebar}
              </aside>
            )}

            {/* Main content */}
            <main 
              ref={mainContentRef}
              id="main-content"
              className={cn(
                "flex-1 overflow-auto",
                effectivePattern === "dashboard" && "col-span-full lg:col-span-9",
                prioritizeAboveFold && "focus:scroll-smooth"
              )}
              // Improved focus management for screen readers
              tabIndex={-1}
            >
              {children}
            </main>
          </div>

          {/* Footer */}
          {footer && (
            <footer className="flex-shrink-0 border-t bg-card">
              {footer}
            </footer>
          )}

          {/* Floating Action Button */}
          {fab && (
            <div 
              className={cn(
                "fixed z-50 transition-all duration-300",
                capabilities.isMobile 
                  ? "bottom-6 right-6" 
                  : "bottom-8 right-8"
              )}
              style={{ 
                bottom: capabilities.safeAreaBottom 
                  ? `max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom)))` 
                  : undefined 
              }}
            >
              {fab}
            </div>
          )}

          {/* Bottom Sheet Modal for Mobile */}
          {bottomSheet && capabilities.isMobile && (
            <div className="fixed inset-0 z-50 pointer-events-none">
              <div className="absolute bottom-0 left-0 right-0 pointer-events-auto">
                {bottomSheet}
              </div>
            </div>
          )}
        </div>

        {/* PWA-style status bar color */}
        <style jsx global>{`
          :root {
            --safe-area-inset-top: env(safe-area-inset-top);
            --safe-area-inset-bottom: env(safe-area-inset-bottom);
            --safe-area-inset-left: env(safe-area-inset-left);
            --safe-area-inset-right: env(safe-area-inset-right);
          }
          
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </>
    );
  }
);

AdaptiveLayout.displayName = "AdaptiveLayout";

// Additional utility components for common patterns

const MobileTabBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    tabs: Array<{
      id: string;
      label: string;
      icon: React.ReactNode;
      badge?: number;
      active?: boolean;
    }>;
    onTabChange?: (tabId: string) => void;
  }
>(({ className, tabs, onTabChange, ...props }, ref) => {
  const capabilities = useDeviceCapabilities();
  
  if (!capabilities.isMobile) return null;
  
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-around bg-card border-t py-2",
        "safe-area-padding-bottom",
        className
      )}
      style={{
        paddingBottom: `max(0.5rem, env(safe-area-inset-bottom))`
      }}
      {...props}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange?.(tab.id)}
          className={cn(
            "flex flex-col items-center p-2 rounded-lg min-w-0 flex-1 relative",
            "transition-colors duration-200",
            tab.active 
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="relative">
            {tab.icon}
            {tab.badge && tab.badge > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center">
                {tab.badge > 99 ? '99+' : tab.badge}
              </span>
            )}
          </div>
          <span className="text-xs font-medium truncate w-full mt-1">
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
});

MobileTabBar.displayName = "MobileTabBar";

export { 
  AdaptiveLayout, 
  MobileTabBar,
  useDeviceCapabilities,
  useHaptics,
  type AdaptiveLayoutProps 
};