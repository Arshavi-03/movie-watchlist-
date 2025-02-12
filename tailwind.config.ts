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
        // New animations for the signin page
        'float-slow': 'float 6s ease-in-out infinite',
        'float-slower': 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 4s linear infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spotlight': 'spotlight 2s ease infinite',
        'grid-flow': 'grid-flow 20s linear infinite',
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
        // New keyframes for the signin page
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(1.2)' },
        },
        'grid-flow': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 50px' },
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': `
          linear-gradient(to right, rgba(128, 90, 213, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(128, 90, 213, 0.1) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
};

export default config;