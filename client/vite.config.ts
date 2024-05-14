import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "./index.html",
    },
  },
  plugins: [react()],
  base: "/akar/client/",
});
