import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
      __API_URL__: JSON.stringify(env.VITE_API_URL),
    },
    server: {
      port: 5173,
      open: true,
      cors: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'dev',
      minify: mode === 'prod' ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            antd: ['antd'],
          }
        }
      }
    }
  }
})
