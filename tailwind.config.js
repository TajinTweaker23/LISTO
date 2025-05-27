// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream:    "#FFF7E0",
        blush:    "#FBE4E4",
        sky:      "#E0ECF7",
        fog:      "#E3E8F0",
        apricot:  "#FFF3E7",
        mint:     "#E6F4EA",
        cloud:    "#F1E3F3",
        sage:     "#46675B"
      }
    }
  },
  plugins: [ require('@tailwindcss/line-clamp') ],
}
