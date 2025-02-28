import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    historyApiFallback: true, // Redirige les requêtes vers index.html
  },
  build: {
    outDir: "dist",
  }
});
