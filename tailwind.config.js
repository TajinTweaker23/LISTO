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
