import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {//配置代理的路径->代理http://localhost:80/api后的所有路由
        target: 'http://xxxx.xxxx.xxx.xxxx:xx',//目标地址->服务器地址
        changeOrigin: true,//允许跨域
        ws: true,//允许websocket代理
        // 路径重写->去掉/api
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
