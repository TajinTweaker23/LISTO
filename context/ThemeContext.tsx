import React, { createContext, useContext, ReactNode } from 'react';
import { useThemePreferences } from '../hooks/useThemePreferences';

type ColorTheme = 'purple' | 'green' | 'red' | 'blue' | 'orange' | 'pink' | 'cyan' | 'gold' | 'custom';

interface ThemeContextType {
  preferences: {
    theme: ColorTheme;
    customAccentColor: string;
    customSecondaryColor: string;
  };
  isLoaded: boolean;
  updateTheme: (theme: ColorTheme) => void;
  updateCustomColors: (accentColor: string, secondaryColor: string) => void;
  resetToDefault: () => void;
  getCurrentColors: () => { accentColor?: string; secondaryColor?: string };
  getThemeColors: (theme: ColorTheme) => { accent: string; secondary: string };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themePreferences = useThemePreferences();

  return (
    <ThemeContext.Provider value={themePreferences}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
