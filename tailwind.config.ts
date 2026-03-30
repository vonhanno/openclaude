import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#F7F5F0",
          card: "#FFFFFF",
          sidebar: "#F0EDE8",
        },
        mascot: {
          body: "#CC8B6E",
          eyes: "#1A1A1A",
        },
        accent: {
          blue: "#4A7DFF",
          green: "#10B981",
          purple: "#8B5CF6",
          red: "#EF4444",
          amber: "#F59E0B",
        },
        equipped: {
          glow: "#34D399",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        pixel: ["'Press Start 2P'", "monospace"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
