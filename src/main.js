import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router/index.js'
import reveal from './directives/reveal.js'
import './assets/main.css'

function scrollBehavior(to) {
  if (!to.hash) return { top: 0 }
  if (typeof document === 'undefined') return { top: 0 }

  const target = document.getElementById(to.hash.slice(1))
  if (!target) return { top: 0 }

  // 横スクロール可能な規格表があっても QR 遷移でページ全体を横へずらさず、
  // CSS の scroll-margin-top を固定ヘッダー分の余白として反映する。
  const marginTop = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0
  return {
    left: 0,
    top: target.getBoundingClientRect().top + window.scrollY - marginTop,
  }
}

// SSG エントリ：ビルド時は各ルートを静的 HTML に書き出し、ブラウザではそのままハイドレートされる
export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior,
  },
  ({ app, isClient }) => {
    app.directive('reveal', reveal)
    // Vercel Analytics はブラウザ専用（dynamic import で SSG ビルドから完全に除外）
    if (isClient) import('@vercel/analytics').then(m => m.inject())
  },
)
