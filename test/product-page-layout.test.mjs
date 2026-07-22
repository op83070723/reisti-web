import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

test('規格表の sr-only 見出しを横スクロール領域内に閉じ込める', () => {
  const view = readFileSync(join(ROOT, 'src/views/FamilyDetail.vue'), 'utf8')
  const index = readFileSync(join(ROOT, 'index.html'), 'utf8')
  const quoteHeader = view.match(
    /<th\b[^>]*>\s*<span class="sr-only">\{\{ t\('product\.quote_btn'\) \}\}<\/span>\s*<\/th>/
  )?.[0]
  const tableScrollerClasses = view.match(/<div class="([^"]*)">\s*<table\b/)?.[1]?.split(/\s+/) || []
  const quoteHeaderClasses = quoteHeader?.match(/class="([^"]*)"/)?.[1]?.split(/\s+/) || []

  assert.ok(tableScrollerClasses.includes('overflow-x-auto'), '規格表だけを横スクロール可能にする')
  assert.ok(quoteHeader, '見積もり列の sr-only 見出しを特定できる')
  assert.ok(quoteHeaderClasses.includes('relative'), 'absolute の sr-only に表内の containing block を与え、document 幅へ漏らさない')
  assert.doesNotMatch(index, /user-scalable\s*=\s*no|maximum-scale\s*=\s*1/i, '利用者のピンチズームを禁止しない')
})
