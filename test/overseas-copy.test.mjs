import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import ja from '../src/i18n/ja.js'
import en from '../src/i18n/en.js'
import { FAMILIES, OEM_FAMILIES } from '../src/data/products.js'

const read = file => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
const englishFields = value => {
  if (!value || typeof value !== 'object') return []
  return Object.entries(value).flatMap(([key, item]) => key === 'en'
    ? [typeof item === 'string' ? item : JSON.stringify(item)]
    : englishFields(item))
}

test('確認済みの輸出条件は英語データにのみ存在する', () => {
  assert.doesNotMatch(JSON.stringify(ja), /1,000|1000/)
  assert.equal(ja.oem.export_terms, undefined)
  assert.equal(ja.product.export_summary, undefined)
  assert.equal(en.oem.spec_moq, '1,000 pcs per size')
  assert.deepEqual(en.oem.export_terms, [
    { label: 'MOQ', value: '1,000 pcs per size' },
    { label: 'Trade terms', value: 'FOB Shanghai (Incoterms® 2020)' },
    { label: 'Lead time', value: '45–60 days after receipt of deposit' },
    { label: 'Payment', value: 'To be agreed for each order' },
    { label: 'Shipping', value: 'Shipped directly from our factory in China' },
  ])
  assert.equal(en.product.export_summary, 'MOQ 1,000 pcs per size · FOB Shanghai · Lead time 45–60 days')
  for (const file of ['src/views/OemView.vue', 'src/views/FamilyDetail.vue']) {
    assert.match(read(file), /v-if="lang === 'en'"/, `${file}: 輸出条件は英語限定`)
  }
  const capabilities = read('src/views/OemView.vue').match(/<dl v-if="lang === 'en'"[\s\S]*?<\/dl>/)?.[0]
  assert.ok(capabilities, '英語専用の Capabilities 表が存在する')
  assert.match(capabilities, /t\('oem\.export_terms'\)[\s\S]*t\('oem\.spec_custom'\)[\s\S]*t\('oem\.spec_items'\)/,
    '輸出条件の後にもカスタマイズと製品カテゴリを案内する')
})

test('産地・品質・輸出条件の禁止表現を原始碼へ入れない', () => {
  const forbidden = /made in (?:taiwan|japan)|taiwan-made|japan-made|taiwanese manufacturer|japanese quality|tungsten steel|FOB China port|after order confirmation|zuishidin/i
  const files = readdirSync(new URL('../src', import.meta.url), { recursive: true }).filter(file => /\.(?:js|vue)$/.test(file))
  for (const file of files) assert.doesNotMatch(read(`src/${file}`), forbidden, file)
  const copy = [JSON.stringify(en), ...englishFields(FAMILIES), ...englishFields(OEM_FAMILIES)].join('\n')
  assert.doesNotMatch(copy, /\b(?:best|No\.?\s*1|highest quality|ODM|OBM)\b/i)
})

test('海外向けの製品名・六角軸表記と英語の個人情報案内を揃える', () => {
  assert.deepEqual(FAMILIES.map(family => family.name.en), [
    'Carbide-Tipped Multi-Material Drill Bit', 'Hex Shank Cobalt Drill Bit',
    'Bi-Metal Hole Saw', 'Carbide-Tipped Hole Saw (TCT)',
  ])
  for (const family of FAMILIES) {
    for (const variant of family.variants) {
      if (variant.shank.ja.includes('6.35mm')) {
        assert.match(variant.shank.en, /6\.35 mm \(1\/4"\) hex shank/)
      }
      for (const row of variant.specs) {
        if (row.shank?.ja.includes('六角')) {
          assert.equal(row.shank.en, '6.35 mm (1/4") hex shank', `${row.code}: 英語の六角軸表記を規格表にも適用する`)
        }
      }
    }
  }
  assert.doesNotMatch(englishFields(FAMILIES).join('\n'), /\bbimetal\b|hex multi drill bit|tct carbide hole saw|porcelain|DIN 338/i)
  assert.doesNotMatch(JSON.stringify(en.privacy), /・/)
  assert.match(en.privacy.sections.find(s => s.h === 'Purpose of Use').body, /• /)
  assert.match(en.privacy.sections.find(s => s.h === 'Information We Collect').body,
    /via email, phone, or LINE,.*country or region, how you heard about REISTI/,
    '収集経路は LINE を含む実際の窓口を記載し、国・地域と流入経路も保持する')
  assert.equal(en.privacy.sections.find(s => s.h === 'Disclosure to Third Parties').body,
    'We do not provide personal information to third parties without your consent, except where required by law.')
})
