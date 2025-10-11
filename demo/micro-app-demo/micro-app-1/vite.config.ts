import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 'micro-app-1',
  plugins: [react()],
  server: {
    port: 9002
  }
})
