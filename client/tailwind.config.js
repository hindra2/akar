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
        base: "rgb(30, 30, 46)",
        textBase: "rgb(205, 214, 244)",
        textPlaceholder: "rgb(205, 214, 244, 0.3)",
        Subtext0: "rgb(166, 173, 200)",
        surface0: "rgb(49, 50, 68)",
        translucentSurface0: "rgba(49, 50, 68, 0.3)",
        surface1: "rgb(69, 71, 90)",
        surface2: "rgb(88, 91, 112)",
        rosewater: "rgb(245, 224, 220)",
        green: "rgb(166, 227, 161)",
        red: "rgb(243, 139, 168)",
        teal: "rgb(148, 226, 213)",
        accent: "rgb(137, 180, 250)",
        translucentAccent: "rgb(137, 180, 250, 0.5)",
        new: "rgb(203, 166, 247)",
        learning: "rgb(250, 179, 135)",
        review: "rgb(166, 227, 161)",
        overlay0: "rgb(108, 112, 134)",
        overlay1: "rgb(127, 132, 156)",

        light: {
          base: "rgb(239, 241, 245)",
          textBase: "rgb(76, 79, 105)",
          textPlaceholder: "rgb(239, 241, 245, 0.3)",
          Subtext0: "rgb(108, 111, 133)",
          surface0: "rgb(204, 208, 218)",
          translucentSurface0: "rgb(204, 208, 218, 0.3)",
          surface1: "rgb(188, 192, 204)",
          surface2: "rgb(172, 176, 190)",
          overlay0: "rgb(156, 160, 176)",
          overlay1: "rgb(140, 143, 161)",
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
