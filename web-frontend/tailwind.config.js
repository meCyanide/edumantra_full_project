/** @type {import('tailwindcss').Config} */
export default {
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
        brand: {
          primary: "#0B1F3A",
          primaryDark: "#07152A",
          secondary: "#1D4ED8",
          accent: "#D99A24",
          accentLight: "#F3C969",
        },
        bg: {
          page: "#F7F9FC",
          surface: "#FFFFFF",
          surfaceAlt: "#EEF3F9",
        },
        txt: {
          primary: "#0F172A",
          secondary: "#475569",
          muted: "#64748B",
          white: "#FFFFFF",
        },
        border: {
          DEFAULT: "#E2E8F0",
          dark: "#1B3556",
          hover: "#BFDBFE",
        },
        status: {
          success: "#16805C",
          warning: "#D99A24",
          error: "#C2413B",
          info: "#1D4ED8",
        },
        edu: {
          primary: "#0B1F3A",
          primaryDark: "#07152A",
          secondary: "#1D4ED8",
          accent: "#D99A24",
          accentLight: "#F3C969",
          bg: "#F4F7FB",
          surface: "#FFFFFF",
          surfaceAlt: "#EEF3F9",
          text: "#0F172A",
          textSec: "#475569",
          muted: "#64748B",
          border: "#E2E8F0",
          borderDark: "#1B3556",
        },
      },
      boxShadow: {
        'card': '0 1px 4px 0 rgba(15, 32, 68, 0.06), 0 1px 2px 0 rgba(15, 32, 68, 0.04)',
        'card-hover': '0 4px 16px 0 rgba(15, 32, 68, 0.10), 0 2px 6px 0 rgba(15, 32, 68, 0.06)',
        'btn': '0 1px 3px 0 rgba(15, 32, 68, 0.18)',
        'btn-hover': '0 3px 10px 0 rgba(15, 32, 68, 0.22)',
        'navbar': '0 1px 0 0 #E2E8F0',
        // Keep these aliases so existing JSX classes don't break
        'glass': '0 1px 4px 0 rgba(15, 32, 68, 0.06)',
        'glass-sm': '0 1px 2px 0 rgba(15, 32, 68, 0.04)',
        'glass-hover': '0 4px 16px 0 rgba(15, 32, 68, 0.10)',
        'glass-dark': '0 4px 12px 0 rgba(7, 21, 42, 0.30)',
        'glass-gold': '0 2px 8px 0 rgba(217, 119, 6, 0.18)',
        'glass-blue': '0 2px 8px 0 rgba(30, 64, 175, 0.18)',
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        fadeUp: "fadeUp 0.4s ease-out both",
      },
    },
  },
  plugins: [],
}
