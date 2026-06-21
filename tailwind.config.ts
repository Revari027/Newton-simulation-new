import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FDF6ED",
          soft: "#fefaf3",
          deep: "#f5ece0"
        },
        beige: {
          DEFAULT: "#DCCFC0",
          soft: "#e8ddd0",
          deep: "#cdbda9"
        },
        sage: {
          DEFAULT: "#A1BC98",
          soft: "#c3d6bb",
          deep: "#8aa680"
        },
        moss: {
          DEFAULT: "#778873",
          soft: "#94a390",
          deep: "#5e6b5b"
        },
        ink: {
          DEFAULT: "#1c2120",
          soft: "#2a322f",
          deep: "#131816",
          muted: "#3a443f"
        }
      },
      fontFamily: {
        sf: [
          "SF Pro Display",
          "SF Pro Text",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "sans-serif"
        ]
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      },
      boxShadow: {
        soft: "0 4px 20px rgba(94, 107, 91, 0.08)",
        float: "0 12px 36px rgba(94, 107, 91, 0.12)",
        lift: "0 24px 56px rgba(94, 107, 91, 0.18)",
        glow: "0 0 50px rgba(161, 188, 152, 0.35)",
        "soft-dark": "0 4px 24px rgba(0, 0, 0, 0.35)",
        "float-dark": "0 14px 40px rgba(0, 0, 0, 0.45)",
        "lift-dark": "0 28px 64px rgba(0, 0, 0, 0.55)"
      },
      backgroundImage: {
        "sage-mesh":
          "radial-gradient(40% 40% at 12% 8%, rgba(161,188,152,0.30) 0%, transparent 60%), radial-gradient(40% 40% at 88% 12%, rgba(220,207,192,0.45) 0%, transparent 60%), radial-gradient(45% 45% at 78% 88%, rgba(119,136,115,0.18) 0%, transparent 60%), radial-gradient(40% 40% at 18% 92%, rgba(161,188,152,0.22) 0%, transparent 60%)",
        "ink-mesh":
          "radial-gradient(45% 45% at 12% 8%, rgba(94,107,91,0.28) 0%, transparent 60%), radial-gradient(40% 40% at 88% 12%, rgba(119,136,115,0.16) 0%, transparent 60%), radial-gradient(45% 45% at 78% 88%, rgba(161,188,152,0.10) 0%, transparent 60%), radial-gradient(40% 40% at 18% 92%, rgba(94,107,91,0.14) 0%, transparent 60%)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        },
        "float-slow": {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(8px,-10px)" }
        },
        "blur-in": {
          "0%": { opacity: "0", transform: "scale(0.94)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "scale(1)", filter: "blur(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        "gradient-pan": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        "spin-slow": {
          "100%": { transform: "rotate(360deg)" }
        },
        "theme-pop": {
          "0%": { transform: "scale(0.6) rotate(-30deg)", opacity: "0" },
          "60%": { transform: "scale(1.15) rotate(8deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.8s ease both",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        "blur-in": "blur-in 0.9s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 2.6s linear infinite",
        "gradient-pan": "gradient-pan 10s ease infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        "theme-pop": "theme-pop 0.5s cubic-bezier(0.22,1,0.36,1) both"
      }
    }
  },
  plugins: []
};

export default config;
