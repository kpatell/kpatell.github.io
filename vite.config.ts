import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { writeFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'add-nojekyll',
      closeBundle() {
        // Create .nojekyll file to prevent GitHub Pages from using Jekyll
        writeFileSync('dist/.nojekyll', '')
      }
    }
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
