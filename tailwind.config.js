/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Тут ми потім додамо кольори з макету (наприклад, жовтий чи блакитний)
      },
    },
  },
  plugins: [],
}