// Design System - Sage & Complementary Color Palette
export const designTokens = {
  // Z-Index Scale
  zIndex: {
    background: 0,
    content: 10,
    navbar: 20,
    sidebar: 30,
    modal: 40,
    toast: 50,
    tooltip: 60,
  },

  // Animation Timings
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    verySlow: '800ms',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },

  // Spacing Scale
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
    full: '9999px',
  },

  // Typography Scale
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },

  // Shadow System
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    neon: '0 0 20px rgb(139 92 246 / 0.3), 0 0 40px rgb(139 92 246 / 0.1)',
    glow: '0 0 30px rgb(34 197 94 / 0.4), 0 0 60px rgb(34 197 94 / 0.2)',
  },
};

// Sage Color Palette with Complementary Colors
export const colorPalette = {
  // Primary Sage Colors
  sage: {
    50: '#f7f9f7',
    100: '#eff3ef',
    200: '#d7e3d7',
    300: '#bfd3bf',
    400: '#8fb38f',
    500: '#5f935f',   // Main sage
    600: '#568456',
    700: '#486e48',
    800: '#3a583a',
    900: '#2f472f',
    950: '#1a2a1a',
  },

  // Complementary Warm Terracotta
  terracotta: {
    50: '#fdf7f5',
    100: '#fbeee8',
    200: '#f5d5c6',
    300: '#efbca4',
    400: '#e38a60',
    500: '#d7581c',   // Main terracotta
    600: '#c24f19',
    700: '#a14215',
    800: '#813511',
    900: '#6a2c0e',
    950: '#3d1908',
  },

  // Accent Lavender (for special highlights)
  lavender: {
    50: '#faf9ff',
    100: '#f4f2ff',
    200: '#e7e1ff',
    300: '#dad0ff',
    400: '#c0aeff',
    500: '#a68cff',   // Main lavender
    600: '#957ee6',
    700: '#7d69bf',
    800: '#645499',
    900: '#52447d',
    950: '#2f2748',
  },

  // Supporting Warm Cream
  cream: {
    50: '#fffef7',
    100: '#fffdf0',
    200: '#fefae1',
    300: '#fdf6d2',
    400: '#fcefb4',
    500: '#fbe896',   // Main cream
    600: '#e2d187',
    700: '#bcae71',
    800: '#968b5a',
    900: '#7a724a',
    950: '#47422b',
  },

  // Neutral Grays with Sage Undertones
  gray: {
    50: '#f8f9f8',
    100: '#f1f3f1',
    200: '#e3e7e3',
    300: '#d4dbd4',
    400: '#b7c3b7',
    500: '#9aab9a',
    600: '#8b9a8b',
    700: '#748174',
    800: '#5d675d',
    900: '#4c544c',
    950: '#2c312c',
  },

  // System Colors
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

// Theme Configurations
export const themes = {
  sage: {
    name: 'Sage Garden',
    primary: colorPalette.sage[500],
    secondary: colorPalette.terracotta[500],
    accent: colorPalette.lavender[500],
    background: {
      light: `linear-gradient(135deg, ${colorPalette.cream[50]} 0%, ${colorPalette.sage[50]} 50%, ${colorPalette.lavender[50]} 100%)`,
      dark: `linear-gradient(135deg, ${colorPalette.sage[950]} 0%, ${colorPalette.gray[950]} 50%, ${colorPalette.lavender[950]} 100%)`,
    },
    glass: {
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(95, 147, 95, 0.1)',
    },
  },
  
  ocean: {
    name: 'Ocean Breeze',
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    accent: '#8b5cf6',
    background: {
      light: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f3e8ff 100%)',
      dark: 'linear-gradient(135deg, #0c4a6e 0%, #164e63 50%, #581c87 100%)',
    },
    glass: {
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(14, 165, 233, 0.1)',
    },
  },

  sunset: {
    name: 'Sunset Vibes',
    primary: '#f97316',
    secondary: '#ec4899',
    accent: '#eab308',
    background: {
      light: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fdf2f8 100%)',
      dark: 'linear-gradient(135deg, #9a3412 0%, #be185d 50%, #a16207 100%)',
    },
    glass: {
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(249, 115, 22, 0.1)',
    },
  },

  forest: {
    name: 'Deep Forest',
    primary: '#16a34a',
    secondary: '#059669',
    accent: '#84cc16',
    background: {
      light: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f7fee7 100%)',
      dark: 'linear-gradient(135deg, #14532d 0%, #064e3b 50%, #365314 100%)',
    },
    glass: {
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(22, 163, 74, 0.1)',
    },
  },

  royal: {
    name: 'Royal Purple',
    primary: '#7c3aed',
    secondary: '#c026d3',
    accent: '#f59e0b',
    background: {
      light: 'linear-gradient(135deg, #faf5ff 0%, #fdf4ff 50%, #fffbeb 100%)',
      dark: 'linear-gradient(135deg, #581c87 0%, #86198f 50%, #92400e 100%)',
    },
    glass: {
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(124, 58, 237, 0.1)',
    },
  },
};

// CSS Custom Properties Generator
export const generateCSSVars = (theme: keyof typeof themes, mode: 'light' | 'dark') => {
  const selectedTheme = themes[theme];
  return {
    '--color-primary': selectedTheme.primary,
    '--color-secondary': selectedTheme.secondary,
    '--color-accent': selectedTheme.accent,
    '--background': selectedTheme.background[mode],
    '--glass': selectedTheme.glass[mode],
    '--z-background': designTokens.zIndex.background,
    '--z-content': designTokens.zIndex.content,
    '--z-navbar': designTokens.zIndex.navbar,
    '--z-sidebar': designTokens.zIndex.sidebar,
    '--z-modal': designTokens.zIndex.modal,
    '--z-toast': designTokens.zIndex.toast,
    '--z-tooltip': designTokens.zIndex.tooltip,
    '--animation-fast': designTokens.animation.fast,
    '--animation-normal': designTokens.animation.normal,
    '--animation-slow': designTokens.animation.slow,
    '--animation-very-slow': designTokens.animation.verySlow,
    '--animation-spring': designTokens.animation.spring,
    '--animation-ease': designTokens.animation.ease,
    '--shadow-neon': designTokens.shadows.neon,
    '--shadow-glow': designTokens.shadows.glow,
  };
};

// Soundscape configurations
export const soundscapes = [
  { label: "None", file: "", icon: "🔇" },
  { label: "Rain", file: "/sounds/rain.mp3", icon: "🌧️" },
  { label: "Café", file: "/sounds/cafe.mp3", icon: "☕" },
  { label: "Forest", file: "/sounds/forest.mp3", icon: "🌲" },
  { label: "Ocean", file: "/sounds/ocean.mp3", icon: "🌊" },
  { label: "Fireplace", file: "/sounds/fireplace.mp3", icon: "🔥" },
  { label: "Birds", file: "/sounds/birds.mp3", icon: "🐦" },
];
