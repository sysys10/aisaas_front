import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  envDir: '../../',
  plugins: [
    svgr(),
    react(),
    tsconfigPaths(),
  ],
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // React 관련
          'react-core': ['react', 'react-dom'],

          // 상태 관리
          'state-management': ['zustand'],

          // 라우팅
          routing: ['react-router-dom'],
          // 데이터 관련
          data: ['@tanstack/react-query', 'axios']
        }
      }
    },
    chunkSizeWarningLimit: 500,
    target: 'esnext',
    minify: 'esbuild'
  },
  resolve: {
    alias: [
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, 'src/constants')
      },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@stores', replacement: path.resolve(__dirname, 'src/stores') },
      { find: '@apis', replacement: path.resolve(__dirname, 'src/apis') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@helper', replacement: path.resolve(__dirname, 'src/helper') },
      { find: '@types', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  },
  server: {
    port: 4000
  }
})
