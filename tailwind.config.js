/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css,scss}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // CSS Variables Integration for shadcn/ui compatibility
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          // Enhanced primary scale
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          500: "hsl(var(--primary-500))",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          900: "hsl(var(--primary-900))",
          950: "hsl(var(--primary-950))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          // Enhanced accent colors
          success: "hsl(var(--success-500))",
          warning: "hsl(var(--warning-500))",
          danger: "hsl(var(--danger-500))",
          info: "hsl(var(--info-500))",
          purple: '#a78bfa',
          coral: '#fb7185',
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Enhanced Sage Brand Colors (matching your CSS)
        sage: {
          50: "hsl(var(--sage-50))",
          100: "hsl(var(--sage-100))",
          200: "hsl(var(--sage-200))",
          300: "hsl(var(--sage-300))",
          400: "hsl(var(--sage-400))",
          500: "hsl(var(--sage-500))",
          600: "hsl(var(--sage-600))",
          700: "hsl(var(--sage-700))",
          800: "hsl(var(--sage-800))",
          900: "hsl(var(--sage-900))",
          950: "hsl(var(--sage-950))",
        },

        // Semantic Color System
        success: {
          50: "hsl(var(--success-50))",
          100: "hsl(var(--success-100))",
          200: "hsl(var(--success-200))",
          300: "hsl(var(--success-300))",
          400: "hsl(var(--success-400))",
          500: "hsl(var(--success-500))",
          600: "hsl(var(--success-600))",
          700: "hsl(var(--success-700))",
          800: "hsl(var(--success-800))",
          900: "hsl(var(--success-900))",
          950: "hsl(var(--success-950))",
        },
        danger: {
          50: "hsl(var(--danger-50))",
          100: "hsl(var(--danger-100))",
          200: "hsl(var(--danger-200))",
          300: "hsl(var(--danger-300))",
          400: "hsl(var(--danger-400))",
          500: "hsl(var(--danger-500))",
          600: "hsl(var(--danger-600))",
          700: "hsl(var(--danger-700))",
          800: "hsl(var(--danger-800))",
          900: "hsl(var(--danger-900))",
          950: "hsl(var(--danger-950))",
        },
        warning: {
          50: "hsl(var(--warning-50))",
          100: "hsl(var(--warning-100))",
          200: "hsl(var(--warning-200))",
          300: "hsl(var(--warning-300))",
          400: "hsl(var(--warning-400))",
          500: "hsl(var(--warning-500))",
          600: "hsl(var(--warning-600))",
          700: "hsl(var(--warning-700))",
          800: "hsl(var(--warning-800))",
          900: "hsl(var(--warning-900))",
          950: "hsl(var(--warning-950))",
        },
        info: {
          50: "hsl(var(--info-50))",
          100: "hsl(var(--info-100))",
          200: "hsl(var(--info-200))",
          300: "hsl(var(--info-300))",
          400: "hsl(var(--info-400))",
          500: "hsl(var(--info-500))",
          600: "hsl(var(--info-600))",
          700: "hsl(var(--info-700))",
          800: "hsl(var(--info-800))",
          900: "hsl(var(--info-900))",
          950: "hsl(var(--info-950))",
        },

        // Enhanced Neutral System
        neutral: {
          50: "hsl(var(--neutral-50))",
          100: "hsl(var(--neutral-100))",
          200: "hsl(var(--neutral-200))",
          300: "hsl(var(--neutral-300))",
          400: "hsl(var(--neutral-400))",
          500: "hsl(var(--neutral-500))",
          600: "hsl(var(--neutral-600))",
          700: "hsl(var(--neutral-700))",
          800: "hsl(var(--neutral-800))",
          900: "hsl(var(--neutral-900))",
          950: "hsl(var(--neutral-950))",
        },

        // Legacy colors (keeping for backward compatibility)
        'brand-background': '#1A1A1A',
        'brand-surface': '#252525',
        'brand-primary': '#4A90E2',
        'brand-secondary': '#50E3C2',
        'brand-warning': '#F5A623',
        'brand-border': '#333333',
        'brand-text-primary': '#FFFFFF',
        'brand-text-secondary': '#A0A0A0',

        // Neurodivergent-friendly grays (enhanced)
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },

        // Dark mode colors
        dark: {
          'bg-primary': '#0f0f23',
          'bg-secondary': '#16213e',
          'surface': '#1e2749',
          'text': '#e2e8f0',
        },

        // Existing color palette
        cream: "#FFF7E0",
        blush: "#FBE4E4",
        sky: "#E0ECF7",
        fog: "#E3E8F0",
        apricot: "#FFF3E7",
        mint: "#E6F4EA",
        cloud: "#F1E3F3",
        
        'warm-gray': {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },

      // Enhanced Typography
      fontFamily: {
        sans: ['Inter', 'var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'var(--font-mono)', 'SF Mono', 'Monaco', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      // Enhanced Spacing Scale (matching CSS variables)
      spacing: {
        'px': '1px',
        '0': '0',
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
        '60': '15rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        
        // Safe area spacing for mobile
        'safe-top': 'var(--safe-area-inset-top)',
        'safe-bottom': 'var(--safe-area-inset-bottom)',
        'safe-left': 'var(--safe-area-inset-left)',
        'safe-right': 'var(--safe-area-inset-right)',
      },

      // Enhanced Border Radius
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },

      // Enhanced Box Shadow
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-base)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'inner': 'var(--shadow-inner)',
        'none': 'none',
      },

      // Enhanced Backdrop Blur
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },

      // Enhanced Animations
      animation: {
        // Existing animations
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        
        // Gradient animations
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        
        // Float animations
        'float-1': 'float-1 6s ease-in-out infinite',
        'float-2': 'float-2 8s ease-in-out infinite',
        'float-3': 'float-3 7s ease-in-out infinite',
        
        // New animations for mobile
        'shimmer': 'shimmer 2s infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'slide-left': 'slide-left 0.3s ease-out',
        'slide-right': 'slide-right 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'scale-out': 'scale-out 0.2s ease-in',
      },

      // Enhanced Keyframes
      keyframes: {
        // Existing keyframes
        'gradient-x': {
          '0%, 100%': { 'transform': 'translateX(0%)' },
          '50%': { 'transform': 'translateX(100%)' },
        },
        'gradient-y': {
          '0%, 100%': { 'transform': 'translateY(0%)' },
          '50%': { 'transform': 'translateY(100%)' },
        },
        'gradient-xy': {
          '0%, 100%': { 'transform': 'translate(0%, 0%)' },
          '25%': { 'transform': 'translate(100%, 0%)' },
          '50%': { 'transform': 'translate(100%, 100%)' },
          '75%': { 'transform': 'translate(0%, 100%)' },
        },
        },
        'float-1': {
          '0%, 100%': { 'transform': 'translateY(0px) rotate(0deg)' },
          '33%': { 'transform': 'translateY(-30px) rotate(120deg)' },
          '66%': { 'transform': 'translateY(-15px) rotate(240deg)' },
        },
        'float-2': {
          '0%, 100%': { 'transform': 'translateY(0px) rotate(0deg)' },
          '33%': { 'transform': 'translateY(-20px) rotate(-120deg)' },
          '66%': { 'transform': 'translateY(-40px) rotate(-240deg)' },
        },
        'float-3': {
          '0%, 100%': { 'transform': 'translateY(0px) rotate(0deg)' },
          '50%': { 'transform': 'translateY(-25px) rotate(180deg)' },
        },
        'shimmer': {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        'morph': {
          '0%, 100%': { 'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { 'border-radius': '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'wiggle': {
          '0%, 100%': { 'transform': 'rotate(-3deg)' },
          '50%': { 'transform': 'rotate(3deg)' },
        },
        
        // New keyframes for mobile interactions
        'fade-in': {
          'from': { 'opacity': '0' },
          'to': { 'opacity': '1' },
        },
        'slide-up': {
          'from': { 'opacity': '0', 'transform': 'translateY(16px)' },
          'to': { 'opacity': '1', 'transform': 'translateY(0)' },
        },
        'slide-down': {
          'from': { 'opacity': '0', 'transform': 'translateY(-16px)' },
          'to': { 'opacity': '1', 'transform': 'translateY(0)' },
        },
        'slide-left': {
          'from': { 'opacity': '0', 'transform': 'translateX(16px)' },
          'to': { 'opacity': '1', 'transform': 'translateX(0)' },
        },
        'slide-right': {
          'from': { 'opacity': '0', 'transform': 'translateX(-16px)' },
          'to': { 'opacity': '1', 'transform': 'translateX(0)' },
        },
        'scale-in': {
          'from': { 'opacity': '0', 'transform': 'scale(0.9)' },
          'to': { 'opacity': '1', 'transform': 'scale(1)' },
        },
        'scale-out': {
          'from': { 'opacity': '1', 'transform': 'scale(1)' },
          'to': { 'opacity': '0', 'transform': 'scale(0.9)' },
        },
      },

      // Enhanced Transitions
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },

      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
      },

      // Z-index scale
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
        'max': '2147483647',
      },

      // Enhanced screens for better responsive design
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
        '3xl': '1600px',
        
        // Custom breakpoints
        'mobile': { 'max': '767px' },
        'tablet': { 'min': '768px', 'max': '1023px' },
        'desktop': { 'min': '1024px' },
        
        // Orientation-based
        'landscape': { 'raw': '(orientation: landscape)' },
        'portrait': { 'raw': '(orientation: portrait)' },
        
        // Touch-based
        'touch': { 'raw': '(hover: none)' },
        'no-touch': { 'raw': '(hover: hover)' },
      },
    },
  },
  plugins: [
    // Essential plugins
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    
    // Keep existing plugin if you need it
    // require("@tailwindcss/line-clamp"), // Note: This is deprecated in Tailwind v3.3+
    
    // Custom plugin for additional utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Safe area utilities
        '.safe-area-top': {
          paddingTop: `max(1rem, var(--safe-area-inset-top))`,
        },
        '.safe-area-bottom': {
          paddingBottom: `max(1rem, var(--safe-area-inset-bottom))`,
        },
        '.safe-area-left': {
          paddingLeft: `max(1rem, var(--safe-area-inset-left))`,
        },
        '.safe-area-right': {
          paddingRight: `max(1rem, var(--safe-area-inset-right))`,
        },
        '.safe-area-x': {
          paddingLeft: `max(1rem, var(--safe-area-inset-left))`,
          paddingRight: `max(1rem, var(--safe-area-inset-right))`,
        },
        '.safe-area-y': {
          paddingTop: `max(1rem, var(--safe-area-inset-top))`,
          paddingBottom: `max(1rem, var(--safe-area-inset-bottom))`,
        },
        '.safe-area-all': {
          paddingTop: `max(1rem, var(--safe-area-inset-top))`,
          paddingBottom: `max(1rem, var(--safe-area-inset-bottom))`,
          paddingLeft: `max(1rem, var(--safe-area-inset-left))`,
          paddingRight: `max(1rem, var(--safe-area-inset-right))`,
        },
        
        // Touch-friendly utilities
        '.touch-manipulation': {
          touchAction: 'manipulation',
        },
        '.touch-pan-x': {
          touchAction: 'pan-x',
        },
        '.touch-pan-y': {
          touchAction: 'pan-y',
        },
        '.touch-none': {
          touchAction: 'none',
        },
        
        // Text utilities
        '.text-balance': {
          textWrap: 'balance',
        },
        '.text-pretty': {
          textWrap: 'pretty',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};