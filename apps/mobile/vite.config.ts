import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  envDir: '../../',
  plugins: [
    svgr(),
    react(),
    tsconfigPaths(),
    visualizer({
      open: true,
      gzipSize: true
    })
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

          // UI 컴포넌트
          ui: ['@heroicons/react'],

          // 데이터 관련
          data: ['@tanstack/react-query', 'axios']
        }
      }
    }
  },
  server: {
    port: 4001
  }
})
