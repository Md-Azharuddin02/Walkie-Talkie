import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
  proxy: {
    '/api': {
      target: 'http://localhost:580',
      changeOrigin: true,
        secure: false,
    },
  },
  port: 5173,
},

  plugins: [
    tailwindcss()  ],
     base: './',
})