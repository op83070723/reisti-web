import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { FAMILIES } from '../src/data/products.js'
import ja from '../src/i18n/ja.js'
import en from '../src/i18n/en.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://www.reisti.com'

const MANUALS = [
  { key: 'rp',  category: 'drill-bit', slug: 'multi',  pdf: '/pdf/reisti-rp-hex-multi-drill-bit-manual.pdf' },
  { key: 'rc',  category: 'drill-bit', slug: 'cobalt', pdf: '/pdf/reisti-rc-hex-cobalt-drill-manual.pdf' },
  { key: 'rh',  category: 'hole-saw',  slug: 'hss',    pdf: '/pdf/reisti-rh-hss-bimetal-hole-saw-manual.pdf' },
  { key: 'rhc', category: 'hole-saw',  slug: 'tct',    pdf: '/pdf/reisti-rhc-tct-carbide-hole-saw-manual.pdf' },
]

const PRINT_QR = [
  {
    key: 'rh-hss-bimetal-hole-saw',
    url: `${SITE}/products/hole-saw/hss#manual`,
    svgSha256: '114aefab82b1b72bb38679d682e467d9ec1445f39e35c2723c14448df42487c8',
    pngSha256: '9c0ebef13bd8431bb09242b03ecc0c50965253ae6d4bb398c5f03a0e1f1a15b2',
  },
  {
    key: 'rhc-tct-carbide-hole-saw',
    url: `${SITE}/products/hole-saw/tct#manual`,
    svgSha256: 'de4d73f9010093824ddd18f70faee980622f6ff1204b1f134d736c9ef447eac0',
    pngSha256: 'fc36c8082d742e06b4a44dcd3f7559da515d46226df7398517726d8d1266a9ef',
  },
]

const sha256 = data => createHash('sha256').update(data).digest('hex')

test('4 製品の永久ルートと固定 PDF ファイル名を維持する', () => {
  const router = readFileSync(join(ROOT, 'src/router/index.js'), 'utf8')
  const viteConfig = readFileSync(join(ROOT, 'vite.config.js'), 'utf8')

  assert.match(router, /export const SITE = 'https:\/\/www\.reisti\.com'/, '印刷 QR の正式網域')
  assert.match(router, /path:\s*'\/products\/:category\/:slug'/, '印刷 QR が参照する製品 route template')
  assert.match(
    viteConfig,
    /\.\.\.FAMILIES\.flatMap\(f => f\.variants\.map\(v => `\/products\/\$\{f\.category\}\/\$\{v\.slug\}`\)\)/,
    '4 製品ページを同じ永久 URL で SSG 出力する'
  )

  assert.equal(FAMILIES.filter(family => family.manual).length, MANUALS.length, '取扱説明書の対象製品数')

  for (const expected of MANUALS) {
    const family = FAMILIES.find(candidate =>
      candidate.category === expected.category &&
      candidate.variants.some(variant => variant.slug === expected.slug)
    )
    assert.ok(family, `${expected.key}: 製品ルート`)
    assert.equal(family.manual, expected.pdf, `${expected.key}: 固定 PDF URL`)

    const pdfPath = join(ROOT, 'public', expected.pdf.slice(1))
    assert.ok(existsSync(pdfPath), `${expected.key}: PDF 実ファイル`)
    const pdf = readFileSync(pdfPath)
    assert.equal(pdf.subarray(0, 5).toString('ascii'), '%PDF-', `${expected.key}: PDF シグネチャ`)
    assert.ok(pdf.length > 10_000, `${expected.key}: 空または不完全な PDF ではない`)
  }
})

test('#manual とブラウザ表示リンクの契約を維持する', () => {
  const view = readFileSync(join(ROOT, 'src/views/FamilyDetail.vue'), 'utf8')
  const main = readFileSync(join(ROOT, 'src/main.js'), 'utf8')
  const idMatches = view.match(/id="manual"/g) || []
  const manualIdIndex = view.indexOf('id="manual"')
  const sectionStart = view.lastIndexOf('<section', manualIdIndex)
  const sectionEnd = view.indexOf('</section>', manualIdIndex)
  const manualSection = view.slice(sectionStart, sectionEnd + '</section>'.length)
  const manualLinkStart = manualSection.indexOf('<a')
  const manualLinkEnd = manualSection.indexOf('</a>', manualLinkStart)
  const manualLink = manualSection.slice(manualLinkStart, manualLinkEnd + '</a>'.length)

  assert.equal(idMatches.length, 1, 'id="manual" は共通製品ページに一つだけ置く')
  assert.ok(sectionStart >= 0 && sectionEnd > sectionStart, '#manual section を特定できる')
  assert.ok(manualLinkStart >= 0 && manualLinkEnd > manualLinkStart, '#manual の PDF link を特定できる')
  assert.match(manualSection, /v-if="fam\.manual"/, '説明書のある製品だけに表示する')
  assert.match(manualSection, /scroll-mt-20 sm:scroll-mt-24/, '固定ヘッダー分の scroll margin を残す')
  assert.match(manualLink, /:href="fam\.manual"/, '製品データの固定 PDF URL を使う')
  assert.match(manualLink, /target="_blank"/, 'PDF はブラウザで開く')
  assert.match(manualLink, /rel="noopener"/, '新規タブを安全に開く')
  assert.doesNotMatch(manualLink, /\bdownload(?:=|\s|>)/, 'PDF を強制ダウンロードしない')
  assert.match(main, /left:\s*0/, 'アンカー遷移でページを横へずらさない')
  assert.match(main, /scrollMarginTop/, 'CSS の scroll-margin-top を実際の定位に使う')

  assert.equal(ja.product.manual_title, '取扱説明書')
  assert.equal(ja.product.manual_description, 'ご使用前に取扱説明書を必ずお読みください。')
  assert.equal(ja.product.manual_btn, '取扱説明書を見る（PDF）')
  assert.ok(en.product.manual_title && en.product.manual_description && en.product.manual_btn, '英語表示も欠落させない')
})

test('印刷済み RH／RHC QR の内容と母檔を変更しない', () => {
  const attributes = readFileSync(join(ROOT, '.gitattributes'), 'utf8')
  assert.match(attributes, /^print-assets\/qr\/\*\.svg text eol=lf$/m, 'SVG の byte hash を OS 間で一定にする')
  assert.match(attributes, /^print-assets\/qr\/\*\.png binary$/m, 'PNG を binary のまま扱う')

  for (const expected of PRINT_QR) {
    const base = join(ROOT, 'print-assets/qr', `reisti-${expected.key}-manual-qr`)
    const svg = readFileSync(`${base}.svg`)
    const png = readFileSync(`${base}.png`)
    const svgText = svg.toString('utf8')

    assert.equal(sha256(svg), expected.svgSha256, `${expected.key}: SVG は印刷済み母檔のまま`)
    assert.equal(sha256(png), expected.pngSha256, `${expected.key}: PNG は印刷済み母檔のまま`)
    assert.ok(
      svgText.includes(`Encoded URL: ${expected.url} | Error correction: Q | Quiet zone: 4 modules`),
      `${expected.key}: 正式 URL・ECC Q・quiet zone`
    )
    assert.match(svgText, /width="25mm" height="25mm" viewBox="0 0 47 47"/, `${expected.key}: 印刷寸法と viewBox`)
    assert.match(svgText, /fill="#fff"/, `${expected.key}: 白背景`)
    assert.match(svgText, /fill="#000"/, `${expected.key}: 黒パターン`)

    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${expected.key}: PNG シグネチャ`)
    assert.ok(png.readUInt32BE(16) >= 1200, `${expected.key}: PNG 幅 1200px 以上`)
    assert.ok(png.readUInt32BE(20) >= 1200, `${expected.key}: PNG 高さ 1200px 以上`)
  }
})

test('PDF は同名更新を反映できる再検証キャッシュに固定する', () => {
  const config = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'))
  const pdfRule = config.headers.find(rule => rule.source === '/pdf/(.*)\\.pdf')
  assert.ok(pdfRule, 'PDF 専用 header rule')

  const cacheControl = pdfRule.headers.find(header => header.key.toLowerCase() === 'cache-control')
  assert.equal(cacheControl?.value, 'public, max-age=0, must-revalidate')
  assert.doesNotMatch(cacheControl.value, /immutable|stale-while-revalidate|(?:^|[, ])max-age=[1-9]/)
})
