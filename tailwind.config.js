// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:   "#FFF7E0",
        blush:   "#FBE4E4",
        sky:     "#E0ECF7",
        fog:     "#E3E8F0",
        apricot: "#FFF3E7",
        mint:    "#E6F4EA",
        cloud:   "#F1E3F3",
        sage: {
          50: '#f6f7f6',
          100: '#e5e8e5',
          200: '#ced5ce',
          300: '#adb9ad',
          400: '#8fa08f',
          500: '#6d7c6d',
          600: '#5a6b5a',
          700: '#4a564a',
          800: '#3d463d',
          900: '#323832',
          950: '#191d19',
        },
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
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'sf-pro': ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float-1': 'float-1 6s ease-in-out infinite',
        'float-2': 'float-2 8s ease-in-out infinite',
        'float-3': 'float-3 7s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'transform': 'translateX(0%)',
          },
          '50%': {
            'transform': 'translateX(100%)',
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'transform': 'translateY(0%)',
          },
          '50%': {
            'transform': 'translateY(100%)',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'transform': 'translate(0%, 0%)',
          },
          '25%': {
            'transform': 'translate(100%, 0%)',
          },
          '50%': {
            'transform': 'translate(100%, 100%)',
          },
          '75%': {
            'transform': 'translate(0%, 100%)',
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
          '0%, 100%': {
            'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
          '50%': {
            'border-radius': '30% 60% 70% 40% / 50% 60% 30% 60%',
          },
        },
        'wiggle': {
          '0%, 100%': { 'transform': 'rotate(-3deg)' },
          '50%': { 'transform': 'rotate(3deg)' },
        },
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
};
