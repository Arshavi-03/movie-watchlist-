import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
        "meteor-effect": "meteor 5s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "glow-line-horizontal": "glow-line-horizontal 3s infinite",
      },
      keyframes: {
        aurora: {
          "0%": { backgroundPosition: "50% 50%, 50% 50%" },
          "100%": { backgroundPosition: "350% 50%, 350% 50%" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "glow-line-horizontal": {
          "0%": { opacity: "0", transform: "translateX(0)" },
          "5%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateX(min(60vw, 900px))" },
        },
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Changed to blue-500
          dark: '#2563EB',    // blue-600
          light: '#60A5FA',   // blue-400
        },
        background: {
          DEFAULT: '#020617', // slate-950
          light: '#0F172A',   // slate-900
          dark: '#020617',    // slate-950
        },
      },
    },
  },
  plugins: [],
};

export default config;