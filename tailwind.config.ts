import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#e8e4df",
        forensic: {
          black: "#0a0a0a",
          dark: "#111111",
          panel: "#1a1a1a",
          card: "#2a2a2a",
          border: "#333333",
          muted: "#666666",
          text: "#999999",
        },
        verdict: {
          critical: "#dc2626",
          active: "#d97706",
          signal: "#16a34a",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
      },
      animation: {
        "scan-line": "scanLine 3s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "progress-fill": "progressFill 1.2s ease-out forwards",
        flicker: "flicker 4s linear infinite",
      },
      keyframes: {
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        progressFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--target-width)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
          "52%": { opacity: "1" },
          "54%": { opacity: "0.6" },
          "56%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
