import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { themes, generateCSSVars, colorPalette } from '../../lib/design-system';
import { AppSettings } from '../../types';

interface ThemeContextType {
  currentTheme: keyof typeof themes;
  colorMode: 'light' | 'dark' | 'auto';
  setTheme: (theme: keyof typeof themes) => void;
  setColorMode: (mode: 'light' | 'dark' | 'auto') => void;
  toggleColorMode: () => void;
  isDark: boolean;
  themeConfig: typeof themes[keyof typeof themes];
  colors: typeof colorPalette;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialSettings?: Partial<AppSettings>;
}

/**
 * Theme Provider that manages the application's theme and color mode
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialSettings 
}) => {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>(() => {
    if (typeof window === 'undefined') return 'sage';
    const stored = localStorage.getItem('app-theme');
    return (stored as keyof typeof themes) || initialSettings?.theme || 'sage';
  });

  const [colorMode, setColorModeState] = useState<'light' | 'dark' | 'auto'>(() => {
    if (typeof window === 'undefined') return 'auto';
    const stored = localStorage.getItem('app-color-mode');
    return (stored as 'light' | 'dark' | 'auto') || initialSettings?.colorMode || 'auto';
  });

  const [isDark, setIsDark] = useState(false);

  // Determine if dark mode should be active
  useEffect(() => {
    const updateDarkMode = () => {
      if (colorMode === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(prefersDark);
      } else {
        setIsDark(colorMode === 'dark');
      }
    };

    updateDarkMode();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (colorMode === 'auto') {
        updateDarkMode();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [colorMode]);

  // Apply CSS custom properties when theme or color mode changes
  useEffect(() => {
    const root = document.documentElement;
    const cssVars = generateCSSVars(currentTheme, isDark ? 'dark' : 'light');
    
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value.toString());
    });

    // Apply theme classes
    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
    
    // Apply theme-specific classes
    root.classList.remove('theme-sage', 'theme-ocean', 'theme-sunset', 'theme-forest', 'theme-royal');
    root.classList.add(`theme-${currentTheme}`);

  }, [currentTheme, isDark]);

  const setTheme = useCallback((theme: keyof typeof themes) => {
    setCurrentTheme(theme);
    localStorage.setItem('app-theme', theme);
    
    // Trigger theme change event for achievements
    const event = new CustomEvent('themeChanged', { detail: { theme } });
    window.dispatchEvent(event);
  }, []);

  const setColorMode = useCallback((mode: 'light' | 'dark' | 'auto') => {
    setColorModeState(mode);
    localStorage.setItem('app-color-mode', mode);
  }, []);

  const toggleColorMode = useCallback(() => {
    const newMode = isDark ? 'light' : 'dark';
    setColorMode(newMode);
  }, [isDark, setColorMode]);

  const themeConfig = themes[currentTheme];

  const contextValue: ThemeContextType = {
    currentTheme,
    colorMode,
    setTheme,
    setColorMode,
    toggleColorMode,
    isDark,
    themeConfig,
    colors: colorPalette,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use the theme context
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Higher-order component to inject theme props
 */
export const withTheme = <P extends object>(
  Component: React.ComponentType<P & { theme: ThemeContextType }>
) => {
  const ThemedComponent = React.forwardRef<any, P>((props, ref) => {
    const theme = useTheme();
    const componentProps = { ...props, theme, ref } as P & { theme: ThemeContextType };
    return <Component {...componentProps} />;
  });
  
  ThemedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
  return ThemedComponent;
};
