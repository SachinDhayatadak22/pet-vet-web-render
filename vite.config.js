import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Ensures accessibility from external requests
    port: parseInt(process.env.PORT) || 5173  // Uses Render's assigned port
  },
  preview: {
    host: true,  
    port: parseInt(process.env.PORT) || 4173  // Uses Render's assigned port
  }
})
