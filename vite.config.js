import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { FAMILIES } from './src/data/products.js'

export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    // /products → dist/products/index.html（Vercel などの静的ホスティングがそのまま解決できる形式）
    dirStyle: 'nested',
    // 生成するページの明示リスト。製品ページは products.js の FAMILIES から導出（追加漏れ防止、
    // sitemap も scripts/generate-sitemap.mjs が同じデータから生成）。リダイレクト用ルートは除外。
    // /404 は catch-all ルートで描画され、ビルド後に dist/404.html へコピーされる（package.json の build）
    includedRoutes: () => {
      const jaPaths = [
      '/',
      '/products',
      '/about',
      '/oem',
      '/contact',
      '/privacy',
      ...FAMILIES.flatMap(f => f.variants.map(v => `/products/${f.category}/${v.slug}`)),
      ]
      return [...jaPaths, ...jaPaths.map(path => path === '/' ? '/en' : `/en${path}`), '/404']
    },
  },
})
