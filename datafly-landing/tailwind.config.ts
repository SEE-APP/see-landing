import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tech-blue": "#2563EB",
        "tech-blue-hover": "#1D4ED8",
        "agro-green": "#10B981",
        "agro-green-hover": "#059669",
        "bg-slate": "#F8FAFC",
        "bg-slate-cool": "#F1F5F9",
        "text-main": "#0F172A",
        "text-muted": "#475569",
      },
      fontFamily: {
        sans: ["Bahnschrift", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;