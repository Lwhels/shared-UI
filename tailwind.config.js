/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Syne", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#0c0c0e",
          50: "#18181b",
          100: "#141416",
          200: "#0f0f11",
          300: "#0c0c0e",
        },
        surfaceElevated: "#141416",
        accent: {
          DEFAULT: "#f59e0b",
          hover: "#d97706",
          light: "#fbbf24",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scroll": "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [],
}
