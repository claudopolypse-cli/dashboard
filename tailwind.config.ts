import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0c0a08",
          secondary: "#110e0a",
          card: "#161210",
          "card-hover": "#1c1714",
        },
        accent: {
          DEFAULT: "#f0923a",
          bright: "#ffb366",
          dim: "rgba(232,114,42,0.31)",
        },
        orange: { DEFAULT: "#e8722a" },
        amber: { DEFAULT: "#f59e0b" },
        burnt: { DEFAULT: "#c2410c" },
        warm: { DEFAULT: "#d97706" },
        txt: {
          1: "#f0e6dc",
          2: "#a89888",
          3: "#6b5c50",
        },
        border: { DEFAULT: "#2a2018" },
        "c-green": "#22c55e",
        "c-red": "#ef4444",
      },
      fontFamily: {
        display: ["'Outfit'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        "grad-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(60vh)" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "grad-shift": "grad-shift 6s ease infinite",
        float: "float 8s ease-in-out infinite",
        scanline: "scanline 4s linear infinite",
        pulse: "pulse 2s infinite",
        "fade-up": "fade-up 0.8s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
