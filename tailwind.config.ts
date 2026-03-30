import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a"
        },
        accent: {
          blue: "#3b82f6",
          teal: "#14b8a6",
          amber: "#f59e0b",
          rose: "#f43f5e"
        }
      },
      boxShadow: {
        card: "0 20px 60px -20px rgba(15, 23, 42, 0.28)"
      },
      fontFamily: {
        sans: ["Satoshi", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backdropBlur: {
        xs: "2px"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.14) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
