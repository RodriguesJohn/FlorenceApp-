import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|js|tsx|ts)$/,
    }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(
        __dirname,
        'node_modules/react/jsx-runtime',
      ),
      'react/jsx-dev-runtime': path.resolve(
        __dirname,
        'node_modules/react/jsx-dev-runtime',
      ),
      motion: path.resolve(__dirname, 'node_modules/motion'),
      'motion/react': path.resolve(__dirname, 'node_modules/motion/react'),
    },
  },
  server: {
    // Dedicated Florence preview port - avoid 5173/3000 (other local apps + agents).
    port: 4721,
    strictPort: true,
    fs: {
      allow: [
        path.resolve(__dirname, '..'),
        path.resolve(__dirname, '../..'),
      ],
    },
  },
})
