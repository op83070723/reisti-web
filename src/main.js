import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router/index.js'
import './assets/main.css'

// SSG エントリ：ビルド時は各ルートを静的 HTML に書き出し、ブラウザではそのままハイドレートされる
export const createApp = ViteSSG(App, {
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
