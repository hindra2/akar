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
        textPlaceholder: "rgb(205, 214, 244, 0.3)",
        Subtext2: "#a6adc8",
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
