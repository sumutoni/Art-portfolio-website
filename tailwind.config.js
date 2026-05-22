/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "Times New Roman", "serif"],
        brand: ["Cinzel", "Times New Roman", "serif"],
        ui: ["Inter", "Helvetica Neue", "sans-serif"]
      },
      colors: {
        gallery: {
          bg: "#0f1010",
          text: "#f2efea",
          soft: "#c8c2b6",
          line: "#2b2c2c",
          accent: "#b89f74",
          lightBg: "#f5f1e8",
          lightText: "#181614",
          lightSoft: "#5a5148",
          lightLine: "#d8cfc1",
          lightAccent: "#8c6e3f"
        }
      },
      boxShadow: {
        glass: "0 8px 30px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
};
