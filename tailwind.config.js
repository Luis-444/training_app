/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBanner: {
          DEFAULT: '#E71316',
        }
      },
    },
  },
  plugins: [],
}