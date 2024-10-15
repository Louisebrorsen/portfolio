/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white": "#f5f5f5",
        "green": "#CCD5C6",
      },
      container: {
        padding: "2rem",
        center: true,
      },
    },
  },
  plugins: [],
}