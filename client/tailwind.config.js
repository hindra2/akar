const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  lightMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Nunito"],
      },
      colors: {
        base: "rgba(var(--color-base), <alpha-value>)",
        textBase: "rgba(var(--color-textBase), <alpha-value>)",
        textPlaceholder: "rgba(var(--color-textPlaceholder), <alpha-value>)",
        Subtext0: "rgba(var(--color-Subtext0), <alpha-value>)",
        surface0: "rgba(var(--color-surface0), <alpha-value>)",
        surface1: "rgba(var(--color-surface1), <alpha-value>)",
        surface2: "rgba(var(--color-surface2), <alpha-value>)",
        rosewater: "rgba(var(--color-rosewater), <alpha-value>)",
        green: "rgba(var(--color-green), <alpha-value>)",
        red: "rgba(var(--color-red), <alpha-value>)",
        teal: "rgba(var(--color-teal), <alpha-value>)",
        accent: "rgba(var(--color-accent), <alpha-value>)",
        new: "rgba(var(--color-new), <alpha-value>)",
        learning: "rgba(var(--color-learning), <alpha-value>)",
        review: "rgba(var(--color-review), <alpha-value>)",
        overlay0: "rgba(var(--color-overlay0), <alpha-value>)",
        overlay1: "rgba(var(--color-overlay1), <alpha-value>)",
      },
      fontWeight: {
        extralight: "200",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontSize: {
        xxxs: "0.6rem",
        xxs: "0.62rem",
        sl: "0.9rem",
        l: "0.93rem",
        ssxl: "1.07rem",
        sxl: "1.13rem",
        s2xl: "1.35rem",
      },
      animation: {
        "slide-in": "slideIn 0.5s ease-in-out forwards",
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        slideDown: {
          "0%, 100%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [addVariablesForColors, require("tailwind-scrollbar")],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({
    ":root": newVars,
  });
}
