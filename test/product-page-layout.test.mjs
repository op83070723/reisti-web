import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import ja from '../src/i18n/ja.js'
import en from '../src/i18n/en.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

test('規格表の sr-only 見出しを横スクロール領域内に閉じ込める', () => {
  const view = readFileSync(join(ROOT, 'src/views/FamilyDetail.vue'), 'utf8')
  const index = readFileSync(join(ROOT, 'index.html'), 'utf8')
  const quoteHeader = view.match(
    /<th\b[^>]*>\s*<span class="sr-only">\{\{ t\('product\.quote_btn'\) \}\}<\/span>\s*<\/th>/
  )?.[0]
  const tableScroller = view.match(/<div\b[^>]*>\s*<table\b/)?.[0]
  const tableScrollerClasses = tableScroller?.match(/class="([^"]*)"/)?.[1]?.split(/\s+/) || []
  const quoteHeaderClasses = quoteHeader?.match(/class="([^"]*)"/)?.[1]?.split(/\s+/) || []

  assert.ok(tableScroller, '規格表の scroll container を特定できる')
  assert.ok(tableScrollerClasses.includes('overflow-x-auto'), '規格表だけを横スクロール可能にする')
  assert.ok(quoteHeader, '見積もり列の sr-only 見出しを特定できる')
  assert.ok(quoteHeaderClasses.includes('relative'), 'absolute の sr-only に表内の containing block を与え、document 幅へ漏らさない')
  assert.doesNotMatch(index, /user-scalable\s*=\s*no|maximum-scale\s*=\s*1/i, '利用者のピンチズームを禁止しない')
})

test('横スクロール案内を必要なモバイル表だけに短時間表示する', () => {
  const view = readFileSync(join(ROOT, 'src/views/FamilyDetail.vue'), 'utf8')

  assert.equal(ja.product.scroll_hint, '左右にスクロールできます')
  assert.equal(en.product.scroll_hint, 'Swipe horizontally')
  assert.match(view, /ref="tableScroller"/, '実際の scrollWidth を判定する')
  assert.match(view, /scrollHintObserver\.observe\(tableScroller\.value\)/, '表自体が画面に入ってから案内する')
  assert.match(view, /rootMargin: '0px 0px -20% 0px'/, '案内が見える位置まで表が入る前にタイマーを開始しない')
  assert.match(view, /scroller\.scrollWidth <= scroller\.clientWidth \+ 1/, '横スクロール不要なら表示しない')
  assert.match(view, /matchMedia\('\(max-width: 639px\)'\)/, 'モバイルだけに表示する')
  assert.match(view, /@pointerdown="dismissScrollHint"/, '触れたら案内を消す')
  assert.match(view, /@scroll\.passive="dismissScrollHint"/, 'スクロール開始後は案内を消す')
  assert.match(view, /setTimeout\(dismissScrollHint, 5000\)/, '案内を自動で消す')
  assert.match(view, /animation: scroll-hint-swipe \.8s ease-in-out 3;/, '有限回だけ動かす')
  assert.match(view, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.scroll-hint-icon \{ animation: none; \}/, '減少動態設定を尊重する')
})
