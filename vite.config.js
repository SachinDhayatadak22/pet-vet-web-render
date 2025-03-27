import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: parseInt(process.env.PORT) || 5173,
    strictPort: true,
    allowedHosts: ['pet-vet-web-render-1.onrender.com']
  },
  preview: {
    host: true,
    port: parseInt(process.env.PORT) || 4173,
    strictPort: true,
    allowedHosts: ['pet-vet-web-render-1.onrender.com']
  }
})
