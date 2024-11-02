import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080/assets', // Địa chỉ của server bạn muốn kết nối
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '') // Thay đổi đường dẫn nếu cần
  //     }
  //   }
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
