import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Keep generated asset URLs valid on GitHub Pages project subpaths.
  base: './',
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
