import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      optimizeDeps: {
        exclude: ['lucide-react'],
      },
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:8000', // Your Django backend URL
            changeOrigin: true,
            // rewrite: (path) => path.replace(/^\/api/, ''), //  Remove /api prefix if your Django URLs don't have it.
          },
        },
      },
    })
