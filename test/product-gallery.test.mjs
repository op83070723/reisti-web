import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { FAMILIES } from '../src/data/products.js'
import ja from '../src/i18n/ja.js'
import en from '../src/i18n/en.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

test('製品ギャラリーの画像データは寸法・日英 alt・実ファイルを持つ', () => {
  for (const family of FAMILIES) {
    for (const variant of family.variants) {
      if (!variant.gallery?.length) continue

      assert.equal(variant.gallery[0].src, variant.hero, `${variant.slug}: hero は gallery の先頭に置く`)

      for (const image of variant.gallery) {
        assert.match(image.src, /^\/products\/.+\.webp$/, `${variant.slug}: src`)
        assert.ok(Number.isInteger(image.width) && image.width > 0, `${image.src}: width`)
        assert.ok(Number.isInteger(image.height) && image.height > 0, `${image.src}: height`)
        assert.ok(image.alt?.ja?.trim(), `${image.src}: 日本語 alt`)
        assert.ok(image.alt?.en?.trim(), `${image.src}: 英語 alt`)
        assert.ok(existsSync(join(ROOT, 'public', image.src)), `${image.src}: 実ファイル`)

        if (image.locales) {
          assert.deepEqual(image.locales, ['ja'], `${image.src}: 日本語を焼き込んだ画像は日本語表示だけに限定する`)
        }
      }
    }
  }
})

test('日英の表示枚数は烙字画像の有無を反映する', () => {
  const expected = {
    multi: { ja: 5, en: 4 },
    cobalt: { ja: 5, en: 4 },
    hss: { ja: 3, en: 2 },
    tct: { ja: 3, en: 3 },
  }

  for (const family of FAMILIES) {
    for (const variant of family.variants) {
      if (!expected[variant.slug]) continue
      for (const locale of ['ja', 'en']) {
        const count = variant.gallery.filter(image => !image.locales || image.locales.includes(locale)).length
        assert.equal(count, expected[variant.slug][locale], `${variant.slug}: ${locale}`)
      }
    }
  }
})

test('ギャラリー操作ラベルは日英で揃い、自動再生は使わない', () => {
  const keys = ['gallery_region', 'gallery_previous', 'gallery_next', 'gallery_show', 'gallery_status', 'gallery_empty']
  for (const key of keys) {
    assert.ok(ja.product[key], `ja.product.${key}`)
    assert.ok(en.product[key], `en.product.${key}`)
  }

  const source = readFileSync(join(ROOT, 'src/components/ProductGallery.vue'), 'utf8')
  assert.doesNotMatch(source, /setInterval|setTimeout|requestAnimationFrame|interval:/, '製品ギャラリーは自動再生しない')
  assert.match(source, /xl:grid-cols-/, '縦サムネイルは xl 以上に限定する')
  assert.doesNotMatch(source, /md:grid-cols-/, 'md では横サムネイルを維持する')
  assert.match(source, /:aria-current=/, '現在の縮圖を支援技術へ伝える')
  assert.match(source, /role="status"/, '手動切替後の状態を読み上げる')
  assert.match(source, /currentSlot\.value\?\.alt/, '状態通知に現在画像の説明を含める')
})
