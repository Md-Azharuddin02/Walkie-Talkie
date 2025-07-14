import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5804',
    },
  },
  port: 5173,
},

  plugins: [
    tailwindcss(),
  ],
})