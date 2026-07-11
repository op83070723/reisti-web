#!/usr/bin/env node
// public/sitemap.xml を src/data/products.js から自動生成する（npm run build の先頭で実行）。
// 製品ページは FAMILIES から導出するため、製品追加時に手書きで同期する必要はない。
// vite.config.js の includedRoutes も同じ FAMILIES から導出しており、両者は常に一致する。
import { writeFileSync } from 'node:fs'
import { FAMILIES } from '../src/data/products.js'

const SITE = 'https://www.reisti.com'
const today = new Date().toISOString().slice(0, 10)
const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c])
)

const entry = ({ loc, changefreq, priority, image, imageTitle }) => `  <url>
    <loc>${SITE}${loc}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority>${image ? `
    <image:image>
      <image:loc>${SITE}${esc(image)}</image:loc>
      <image:title>${esc(imageTitle)}</image:title>
    </image:image>` : ''}
  </url>`

const productEntries = FAMILIES.flatMap(f => f.variants.map(v => ({
  loc: `/products/${f.category}/${v.slug}`,
  changefreq: 'monthly',
  priority: '0.8',
  // 画像サイトマップは og:image と同じく PNG 版を指す（public/products/ に WebP と併存）
  image: v.hero?.replace(/\.webp$/, '.png'),
  imageTitle: `${f.name.ja}（REISTI）`,
})))

const entries = [
  { loc: '/',         changefreq: 'weekly',  priority: '1.0' },
  { loc: '/products', changefreq: 'weekly',  priority: '0.9' },
  ...productEntries,
  { loc: '/about',    changefreq: 'monthly', priority: '0.6' },
  { loc: '/oem',      changefreq: 'monthly', priority: '0.7' },
  { loc: '/contact',  changefreq: 'yearly',  priority: '0.5' },
  { loc: '/privacy',  changefreq: 'yearly',  priority: '0.3' },
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(entry).join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml 生成完了：全 ${entries.length} URL（うち製品ページ ${productEntries.length}）`)
