import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  root: 'client',
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html',
    },
  },
  plugins: [react()],
  base: '/akar/',
});