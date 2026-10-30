import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    // Agrega esto para simular matchMedia que React-Bootstrap necesita
    setupFiles: './src/tests/setup.js', 
  },
})