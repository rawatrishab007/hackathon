/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vedam: {
            primary: "#1e3a8a", // Dark Blue
            secondary: "#1d4ed8", // Blue
            accent: "#f59e0b", // Amber/Gold
        }
      },
    },
  },
  plugins: [],
}
