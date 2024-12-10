import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define : {
    'import.meta.env.VITE_API_URL' : JSON.stringify('http://192.168.10.171:8080'),
      // 'import.meta.env.VITE_API_URL' : JSON.stringify('http://localhost:8080'),

      // 프론트에서 npm run dev 로 실행할때 필요한 코드
      //'import.meta.env.VITE_API_URL' : JSON.stringify('/api'),


      'import.meta.env.VITE_IMG_URL' : JSON.stringify('http://192.168.10.171:8080/goods/upload/')
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },

    // 프론트에서 npm run dev 로 실행할때 필요한 코드
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://localhost:8080',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, '')
    //     }
    //   }
    // }
})
