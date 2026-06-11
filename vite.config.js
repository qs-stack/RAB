import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' supaya bisa di-host di subfolder (mis. GitHub Pages) maupun root (Vercel/Netlify)
export default defineConfig({
  plugins: [react()],
  base: './',
})
