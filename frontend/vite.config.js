import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// 🔧 Configuração para funcionar no Replit
export default defineConfig({
  plugins: [react()],
  root: './',
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['*'], // 🔥 evita erro "Blocked request"
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'dist')
  }
});
