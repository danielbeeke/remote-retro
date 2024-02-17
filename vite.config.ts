import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'docs',
  },
  plugins: [preact()],
})
