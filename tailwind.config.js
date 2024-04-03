/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Nunito"],
      },
      colors: {
        "base": "#1e1e2e",
        "text": "#cdd6f4",
        "surface-0": "#313244",
        "rosewater": "#f5e0dc",
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
    }
  },
  plugins: [],
}

