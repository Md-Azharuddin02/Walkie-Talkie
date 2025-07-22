import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
  proxy: {
    '/api': {
      target: 'https://walkie-talkie-backend-25gu.onrender.com',
      changeOrigin: true,
        secure: false, // ❗ disables SSL verification
    },
  },
  port: 5173,
},

  plugins: [
    tailwindcss()  ],
     base: './',
})