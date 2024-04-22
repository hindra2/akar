const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Nunito"],
      },
      colors: {
        base: "#1e1e2e",
        textBase: "#cdd6f4",
        textPlaceholder: "rgb(205, 214, 244, 0.3)",
        Subtext0: "#a6adc8",
        surface0: "#313244",
        translucentSurface0: "rgba(49, 50, 68, 0.3)",
        surface1: "#45475a",
        surface2: "#585b70",
        rosewater: "#f5e0dc",
        red: "#f38ba8",
        teal: "#94e2d5",
        accent: "#89b4fa",
        translucentAccent: "rgb(137, 180, 250, 0.5)",
        new: "#cba6f7",
        learning: "#fab387",
        review: "#a6e3a1",
        overlay0: "#6c7086",
        overlay1: "#7c7f93",

        dark: {
          base: "#eff1f5",
          textBase: "#4c4f69",
          textPlaceholder: "rgb(239, 241, 245, 0.3)",
          Subtext0: "#a5adce",
          surface0: "#ccd0da",
          translucentSurface0: "rgb(204, 208, 218, 0.3)",
          surface1: "#bcc0cc",
          surface2: "#acb0be",
          overlay0: "#9ca0b0",
          overlay1: "#8c8fa1",
        },
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
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
