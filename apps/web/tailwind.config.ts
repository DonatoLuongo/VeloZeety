import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velocity: {
          primary: "var(--velocity-primary)",
          secondary: "var(--velocity-secondary)",
          dark: "var(--velocity-dark)",
          light: "var(--velocity-light)",
          accent: "var(--velocity-accent)",
          bg: "var(--velocity-bg)",
          surface: "var(--velocity-surface)",
          text: "var(--velocity-text)",
          muted: "var(--velocity-muted)",
          border: "var(--velocity-border)",
        },
        binance: {
          black: "#0B0E11",
          card: "#1E2329",
          border: "#2B3139",
          yellow: "#F0B90B",
        },
        vz: {
          orange: "#F46E20",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 20s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
