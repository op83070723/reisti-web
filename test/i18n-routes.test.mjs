import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createRouter, createMemoryHistory } from 'vue-router'
import config from '../vite.config.js'
import { FAMILIES } from '../src/data/products.js'
import { useI18n } from '../src/i18n/index.js'
import { localizePath } from '../src/i18n/paths.js'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
// Node に .vue を読み込ませず、route の定義と router のマッチングを検証する。
const routeSource = read('src/router/index.js').replace(
  /^import (\w+)\s+from '[^']+\.vue'$/gm,
  'const $1 = { name: "$1", render() {} }',
).replaceAll('export const ', 'const ')
const routes = runInNewContext(`${routeSource}\nroutes`)
const paths = ['/', '/products', '/about', '/oem', '/contact', '/privacy',
  ...FAMILIES.flatMap(f => f.variants.map(v => `/products/${f.category}/${v.slug}`)),
]
const routerFor = () => createRouter({ history: createMemoryHistory(), routes })

test('各日本語ページは同じ view の英語 route と言語別 meta を持つ', () => {
  const router = routerFor()
  for (const route of routes) {
    assert.ok(['ja', 'en'].includes(route.meta?.locale), `${route.path}: locale`)
    assert.ok(route.meta.title && route.meta.desc, `${route.path}: metadata`)
    if (route.redirect) assert.equal(route.meta.locale, 'ja', route.path)
  }
  for (const path of paths) {
    const ja = router.resolve(path)
    const en = router.resolve(localizePath(path, 'en'))
    assert.equal(ja.meta.locale, 'ja', path)
    assert.equal(en.meta.locale, 'en', path)
    assert.equal(ja.matched[0].components.default, en.matched[0].components.default, path)
    for (const route of [ja, en]) {
      assert.ok(route.meta.title && route.meta.desc, route.path)
    }
    assert.notEqual(ja.name, en.name)
  }
  const names = routes.filter(r => r.name).map(r => r.name)
  assert.equal(new Set(names).size, names.length, 'route names must be unique')
})

test('未知の /en URL も単一の日本語 404 に一致する', () => {
  const router = routerFor()
  assert.equal(routes.filter(r => r.name === 'notfound').length, 1)
  for (const path of ['/404', '/unknown', '/en/unknown']) {
    assert.equal(router.resolve(path).name, 'notfound', path)
    assert.equal(router.resolve(path).meta.locale, 'ja', path)
  }
  assert.ok(routes.filter(r => r.redirect).every(r => !r.path.startsWith('/en')))
})

test('localePath は問い合わせ query、manual hash、静的リソースを維持する', () => {
  assert.match(read('src/App.vue'), /<a href="#main"/, 'skip link は純粋な fragment とし問い合わせ query を維持する')
  assert.equal(localizePath('/', 'en'), '/en')
  assert.equal(localizePath('/en', 'ja'), '/')
  assert.equal(localizePath('/en/oem', 'en'), '/en/oem')
  assert.equal(localizePath('/contact?type=oem&product=Drill#form', 'en'), '/en/contact?type=oem&product=Drill#form')
  const to = { path: '/products/hole-saw/hss', query: { type: 'bulk' }, hash: '#manual' }
  assert.deepEqual(localizePath(to, 'en'), { ...to, path: '/en/products/hole-saw/hss' })
  assert.equal(to.path, '/products/hole-saw/hss', '入力オブジェクトを変更しない')
  for (const asset of ['/pdf/manual.pdf', '/products/hss-1.jpg', '/logo.png', '#manual', 'https://example.com/']) {
    assert.equal(localizePath(asset, 'en'), asset)
  }
})

test('同一モジュールを使う並行 SSR でも言語とリンクを混在させない', async () => {
  const source = read('src/i18n/index.js')
  assert.doesNotMatch(source, /localStorage|export\s+(?:const|let|var)\s+lang|initLang|setLang/)
  assert.match(source, /route\.meta\.locale/)
  const render = async path => {
    const router = routerFor()
    const app = createSSRApp({
      setup() {
        const { t, tField, lang, localePath } = useI18n()
        return () => h('p', { lang: lang.value }, `${t('nav.home')}|${tField({ ja: '日本語', en: 'English' })}|${localePath('/contact')}`)
      },
    })
    app.use(router)
    await router.push(path)
    await router.isReady()
    return renderToString(app)
  }
  const cases = Array.from({ length: 20 }, (_, i) => i % 2 ? '/en/oem' : '/oem')
  const html = await Promise.all(cases.map(render))
  html.forEach((value, i) => assert.equal(value, cases[i].startsWith('/en')
    ? '<p lang="en">Home|English|/en/contact</p>'
    : '<p lang="ja">ホーム|日本語|/contact</p>'))
})

test('includedRoutes と sitemap は全 20 URL の双方向版を含む', () => {
  const expected = [...paths, ...paths.map(p => localizePath(p, 'en'))]
  const included = config.ssgOptions.includedRoutes()
  assert.deepEqual([...included].sort(), [...expected, '/404'].sort())
  const sitemap = read('public/sitemap.xml')
  const urls = [...sitemap.matchAll(/<loc>https:\/\/www\.reisti\.com([^<]*)<\/loc>/g)].map(m => m[1])
  assert.deepEqual(urls.sort(), expected.sort())
  assert.doesNotMatch(sitemap, /lastmod|xhtml:link/)
  for (const f of FAMILIES) assert.ok(sitemap.includes(`${f.name.en}（REISTI）`), f.family)
})

test('Vue template の内部リンクは localePath を経由し、旧社名は存在しない', () => {
  const files = readdirSync(new URL('../src', import.meta.url), { recursive: true }).filter(p => /\.(vue|js)$/.test(p))
  for (const file of files) {
    const source = read(`src/${file}`)
    assert.doesNotMatch(source, /Zuishidin/i, file)
    if (!file.endsWith('.vue')) continue
    const template = source.slice(0, source.indexOf('<script'))
    assert.doesNotMatch(template, /(?<!:)\bto="\//, file)
    for (const match of template.matchAll(/:to="([^"]+)"/g)) {
      assert.match(match[1], /^localePath\(/, `${file}: ${match[0]}`)
    }
  }
})
