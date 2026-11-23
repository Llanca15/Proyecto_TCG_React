import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js', 
    coverage: {
      all: true,
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/tests/**', 'src/assets/**'],
      reporter: ['text', 'html', 'clover', 'json'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})