import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        newton: {
          navy: "#003049",
          red: "#D62828",
          orange: "#F77F00",
          amber: "#FCBF49",
          parchment: "#EAE2B7"
        }
      },
      fontFamily: {
        sf: [
          "SF Pro Display",
          "SF Pro Text",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        panel: "0 24px 80px rgba(0, 48, 73, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
