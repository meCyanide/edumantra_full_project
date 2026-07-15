/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      colors: {
        appleBlue: {
          DEFAULT: "#0071e3",
          hover: "#147ce5",
        },
        appleGray: {
          50: "#f5f5f7",
          100: "#e8e8ed",
          200: "#d2d2d7",
          300: "#86868b",
          400: "#6e6e73",
          800: "#333336",
          900: "#1d1d1f",
          950: "#161617",
        },
        mono: {
          50: "#fafafa",
          100: "#e5e5e5",
          200: "#cccccc",
          300: "#aaaaaa",
          400: "#888888",
          500: "#666666",
          600: "#444444",
          700: "#333333",
          800: "#222222",
          900: "#111111",
          950: "#0a0a0a",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.05)" },
        },
        bounceDown: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(12px)" },
        },
      },
      animation: {
        float: "float 4.5s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        bounceDown: "bounceDown 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

