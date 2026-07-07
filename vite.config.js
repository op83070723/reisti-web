import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    // /products → dist/products/index.html（Vercel などの静的ホスティングがそのまま解決できる形式）
    dirStyle: 'nested',
    // 生成するページの明示リスト（動的ルートの製品 4 ページ含む。リダイレクト用ルートは除外）
    // /404 は catch-all ルートで描画され、ビルド後に dist/404.html へコピーされる（package.json の build）
    includedRoutes: () => [
      '/',
      '/products',
      '/about',
      '/oem',
      '/contact',
      '/privacy',
      '/404',
      '/products/drill-bit/multi',
      '/products/drill-bit/cobalt',
      '/products/hole-saw/hss',
      '/products/hole-saw/tct',
    ],
  },
})
