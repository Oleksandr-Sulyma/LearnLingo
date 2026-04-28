/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-yellow": "#F4C550", 
        "brand-yellow-light": "#FBE9BA", 
        "brand-yellow-hover": "#FFD466", 
      },
    },
  },
  plugins: [],
}