/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': "Nunito"
    },
    colors: {
      "base": "#1e1e2e",
      "text": "#cdd6f4"
    },
  },
  plugins: [],
}

