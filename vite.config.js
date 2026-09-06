import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this repo from /csreboot/, but keep local dev at the root.
  base: command === 'build' ? '/csreboot/' : '/',
}))
