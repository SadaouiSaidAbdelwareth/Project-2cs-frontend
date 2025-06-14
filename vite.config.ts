import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/phase': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/sondages': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/days': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/operations': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },

      
     
    },
    
  },

})


