/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Nunito"],
      },
      colors: {
        base: "#1e1e2e",
        textBase: "#cdd6f4",
        Subtext2: "#a6adc8",
        surface0: "#313244",
        translucentSurface0: "rgba(49, 50, 68, 0.3)",
        rosewater: "#f5e0dc",
        teal: "#94e2d5",
        accent: "#94e2d5",
        surface1: "#45475a",
        new: "#cba6f7",
        learning: "#fab387",
        review: "#a6e3a1",
        overlay0: "#6c7086",
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
  plugins: [],
};
