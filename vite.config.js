import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // /api 로 시작하는 요청을 여기로 전달
        changeOrigin: true,
      },
    },
  },
});
