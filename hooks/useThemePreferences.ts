import { useState, useEffect } from 'react';

type ColorTheme = 'purple' | 'green' | 'red' | 'blue' | 'orange' | 'pink' | 'cyan' | 'gold' | 'custom';

interface ThemePreferences {
  theme: ColorTheme;
  customAccentColor: string;
  customSecondaryColor: string;
}

const defaultPreferences: ThemePreferences = {
  theme: 'purple',
  customAccentColor: '#ae00ff',
  customSecondaryColor: '#001eff'
};

export const useThemePreferences = () => {
  const [preferences, setPreferences] = useState<ThemePreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('listo-theme-preferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPreferences({ ...defaultPreferences, ...parsed });
      }
    } catch (error) {
      console.warn('Failed to load theme preferences:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('listo-theme-preferences', JSON.stringify(preferences));
      } catch (error) {
        console.warn('Failed to save theme preferences:', error);
      }
    }
  }, [preferences, isLoaded]);

  const updateTheme = (theme: ColorTheme) => {
    setPreferences(prev => ({ ...prev, theme }));
  };

  const updateCustomColors = (accentColor: string, secondaryColor: string) => {
    setPreferences(prev => ({
      ...prev,
      customAccentColor: accentColor,
      customSecondaryColor: secondaryColor,
      theme: 'custom'
    }));
  };

  const resetToDefault = () => {
    setPreferences(defaultPreferences);
  };

  // Get current colors based on theme
  const getCurrentColors = () => {
    if (preferences.theme === 'custom') {
      return {
        accentColor: preferences.customAccentColor,
        secondaryColor: preferences.customSecondaryColor
      };
    }
    return { accentColor: undefined, secondaryColor: undefined };
  };

  const getThemeColors = (theme: ColorTheme) => {
    const themeMap = {
      purple: { accent: '#ae00ff', secondary: '#001eff' },
      green: { accent: '#00ff88', secondary: '#00aaff' },
      red: { accent: '#ff0055', secondary: '#ff4400' },
      blue: { accent: '#0088ff', secondary: '#4400ff' },
      orange: { accent: '#ff6600', secondary: '#ff0066' },
      pink: { accent: '#ff44aa', secondary: '#aa00ff' },
      cyan: { accent: '#00aaff', secondary: '#00ffaa' },
      gold: { accent: '#ffaa00', secondary: '#ff6600' },
      custom: { accent: preferences.customAccentColor, secondary: preferences.customSecondaryColor }
    };
    return themeMap[theme];
  };

  return {
    preferences,
    isLoaded,
    updateTheme,
    updateCustomColors,
    resetToDefault,
    getCurrentColors,
    getThemeColors
  };
};
