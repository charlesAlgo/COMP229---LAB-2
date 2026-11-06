import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves the site from /<repo-name>/, so production builds need
  // that prefix on every asset URL. The dev server keeps using "/".
  base: command === 'build' ? '/react-portfolio/' : '/',

  // Assignment 2: the React dev server runs on 5173 and the Express API on
  // 3000. Proxying means the front end can call "/api/contacts" with no host
  // name, so the same code works in development and in production, and the
  // browser never sees a cross-origin request.
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:3000', changeOrigin: true },
      '/auth': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
}))
