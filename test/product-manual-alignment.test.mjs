import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { FAMILIES } from '../src/data/products.js'
import ja from '../src/i18n/ja.js'
import en from '../src/i18n/en.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const bySlug = Object.fromEntries(FAMILIES.map(family => [family.variants[0].slug, family]))

const ean13IsValid = value => {
  if (!/^\d{13}$/.test(value)) return false
  const digits = [...value].map(Number)
  const sum = digits.slice(0, 12).reduce((total, digit, index) => total + digit * (index % 2 ? 3 : 1), 0)
  return (10 - (sum % 10)) % 10 === digits[12]
}

test('4 製品の表示情報を確認済み仕様・取扱説明書優先・カタログ規格準拠で一元管理する', () => {
  const expected = {
    multi: {
      nameEn: 'Hex Multi Drill Bit',
      count: 20,
      specDigest: 'be8aa24c5f1fc27ba8aa352dc02e12f9f0baa4954d25e87d7e96f84c64855c62',
      materials: '薄鉄板（t3.0mm以下）・アルミ・コンクリート・モルタル・ブロック・レンガ・ALC・陶器タイル・石膏ボード・木材・プラスチック',
      tools: 'インパクトドライバー・充電ドリル（9.6V以上）・電気ドリル（400W以下）・振動ドリル（回転モード）',
      driveBadges: [{ type: 'rotation' }, { type: 'impact' }],
      facts: ['回転・インパクト', '振動モード', '逆回転', '超硬チップ', '非対称刃先'],
    },
    cobalt: {
      nameEn: 'Hex Cobalt Drill Bit',
      count: 27,
      specDigest: '03e6e1cd27957063f128f563c65abf50c038f82f442dcaf37a8439000c802231',
      materials: 'ステンレス・鉄・アルミ・その他難削材・プラスチック・木材',
      tools: 'インパクトドライバー・充電ドリル（9.6V以上）・電気ドリル・振動ドリル（回転モード）',
      driveBadges: [{ type: 'rotation' }, { type: 'impact' }],
      facts: ['回転・インパクト', '振動モード', 'M35', 'HSS-Co5', 'JIS SKH55', '削り出し一体構造', '135°', 'X型シンニング'],
    },
    hss: {
      nameEn: 'HSS Bimetal Hole Saw',
      count: 33,
      specDigest: '72f789c744efffa34989845a237637f82abeb9117b93d2b39d453cc7d15e51d6',
      materials: 'ステンレス板（t1.0mm以下）・鉄板／アルミ板（t3.0mm以下）・木材・合板・石膏ボード・塩ビ板・アクリル板',
      tools: 'インパクトドライバー（口径45mm以下）・充電ドリル・電気ドリル（回転専用・回転モード）・振動ドリル（回転モード）',
      driveBadges: [
        { type: 'rotation' },
        { type: 'impact', condition: { ja: '口径45mm以下', en: 'Ø45mm and below' } },
      ],
      facts: ['回転・インパクト', '口径45mm以下', 'バイメタル構造', 'ツバ無し設計', 'チタンコーティングセンタードリル', 'カステルスプリング', '3,000rpm以下'],
    },
    tct: {
      nameEn: 'TCT Carbide Hole Saw',
      count: 28,
      specDigest: 'b73fb5ff20c5d2e901d968797c14f344b19e8103e24ae3836d5ba8e543f10db0',
      materials: 'ステンレス板（t10.0mm以下）・鋼板（HB200以下）・アルミ板（t5.0mm以下）・金属パイプ材・FRP',
      tools: '電気ドリル（回転専用・回転モード）・充電ドリル（回転モード）・ボール盤',
      driveBadges: [{ type: 'rotation', only: true }],
      facts: ['外刃・中刃・内刃', 'ツバ無し設計', 'チタンコーティングセンタードリル', 'カステルスプリング', 'インパクトドライバー'],
    },
  }

  for (const [slug, contract] of Object.entries(expected)) {
    const family = bySlug[slug]
    const variant = family?.variants[0]
    assert.ok(family && variant, `${slug}: family/variant`)
    assert.equal(family.name.en, contract.nameEn, `${slug}: 説明書の公式英語名`)
    for (const locale of ['ja', 'en']) {
      assert.equal(typeof family.seo?.[locale]?.title, 'string', `${slug}: ${locale} SEO title`)
      assert.equal(typeof family.seo?.[locale]?.description, 'string', `${slug}: ${locale} SEO description`)
      assert.ok(family.seo[locale].title.length > 0, `${slug}: ${locale} SEO title is not empty`)
      assert.ok(family.seo[locale].description.length > 0, `${slug}: ${locale} SEO description is not empty`)
    }
    assert.equal(variant.materials.ja, contract.materials, `${slug}: 用途材料・条件`)
    assert.equal(variant.tools.ja, contract.tools, `${slug}: 適合電動機`)
    assert.deepEqual(variant.driveBadges, contract.driveBadges, `${slug}: 使用可能モード表示`)
    assert.equal(variant.specs.length, contract.count, `${slug}: カタログ記載のサイズ数`)
    // 型録から転記した全フィールドを固定し、形式上は正しい値への誤置換も検出する。
    const specDigest = createHash('sha256').update(JSON.stringify(variant.specs)).digest('hex')
    assert.equal(specDigest, contract.specDigest, `${slug}: 品番・寸法・シャンク・JAN の型録一致`)
    assert.equal(variant.popularSizes, undefined, `${slug}: 根拠のない定番表示を出さない`)
    assert.ok(variant.suitability.every(item => item.condition && item.level == null), `${slug}: 説明書にない適合度を付けない`)

    const copy = [family.intro.ja, variant.detail.ja, ...variant.features.map(feature => feature.ja)].join('\n')
    for (const fact of contract.facts) assert.match(copy, new RegExp(fact), `${slug}: ${fact}`)

    const codes = new Set()
    const sizes = new Set()
    for (const row of variant.specs) {
      assert.ok(!codes.has(row.code), `${slug}: 品番 ${row.code} の重複なし`)
      assert.ok(!sizes.has(row.size), `${slug}: サイズ ${row.size} の重複なし`)
      codes.add(row.code)
      sizes.add(row.size)
      if (row.jan) assert.ok(ean13IsValid(row.jan), `${slug}: ${row.code} の JAN check digit`)
    }
  }

  assert.match(bySlug.multi.variants[0].tools.ja, /400W以下/, 'RP の 400W 条件は維持する')
  assert.match(bySlug.multi.intro.ja, /回転・インパクトの両モード/, 'RP は回転・インパクト両対応を明示する')
  assert.match(bySlug.multi.variants[0].detail.ja, /回転・インパクトのどちらでも使用できます。/, 'RP の日本語本文は両モードを許可する')
  assert.match(bySlug.multi.variants[0].detail.ja, /振動ドリルの振動モード、ハンマードリルおよび逆回転では使用しないでください。/, 'RP の日本語本文は振動・ハンマー・逆回転を禁止する')
  assert.match(bySlug.multi.variants[0].detail.en, /Both rotation and impact operation are supported\./, 'RP の英語本文も両モードを許可する')
  assert.match(bySlug.multi.variants[0].detail.en, /Do not use a vibration drill in vibration mode, a hammer drill, or reverse rotation\./, 'RP の英語本文も vibration・hammer・reverse を禁止する')
  assert.match(bySlug.cobalt.variants[0].detail.ja, /回転・インパクトのどちらでも使用できます。/, 'RC の日本語本文は両モードを許可する')
  assert.match(bySlug.cobalt.variants[0].detail.ja, /振動ドリルの振動モードおよびハンマードリルでは使用しないでください。/, 'RC の日本語本文は振動・ハンマーを禁止する')
  assert.match(bySlug.cobalt.variants[0].detail.en, /Both rotation and impact operation are supported\./, 'RC の英語本文も両モードを許可する')
  assert.match(bySlug.cobalt.variants[0].detail.en, /Do not use a vibration drill in vibration mode or a hammer drill\./, 'RC の英語本文も vibration・hammer を禁止する')
  assert.match(bySlug.hss.variants[0].detail.ja, /口径45mm以下は回転・インパクトのどちらでも使用でき/, 'RH の日本語本文は 45mm 以下に限り両モードを許可する')
  assert.match(bySlug.hss.variants[0].detail.ja, /18V以下・3,000rpm以下を推奨します。/, 'RH の日本語本文はインパクト使用条件を維持する')
  assert.match(bySlug.hss.variants[0].detail.en, /Sizes up to 45mm support both rotation and impact operation;/, 'RH の英語本文も 45mm 以下に限り両モードを許可する')
  assert.match(bySlug.hss.variants[0].detail.en, /18V or less and 3,000rpm or less are recommended\./, 'RH の英語本文もインパクト使用条件を維持する')
  assert.match(bySlug.tct.variants[0].detail.ja, /必ず回転モードで使用し、インパクトドライバー・振動モード・ハンマードリルは使用しないでください。/, 'RHC の日本語本文は回転のみを許可しインパクト等を禁止する')
  assert.match(bySlug.tct.variants[0].detail.en, /Use in rotation mode only; impact drivers, vibration mode, and hammer drills are not permitted\./, 'RHC の英語本文も回転のみを許可し impact 等を禁止する')
  assert.equal(ja.product.drive_badges_label, '使用可能モード', '日本語のバッジは運転モードとして案内する')
  assert.equal(en.product.drive_badges_label, 'Permitted operating modes', '英語のバッジも運転モードとして案内する')
  assert.doesNotMatch(JSON.stringify(bySlug.cobalt), /400W|up to 400W/, 'RC から旧 400W 条件を完全に除く')
  assert.equal(bySlug.multi.variants[0].specs.find(row => row.code === 'RP1050125')?.jan, null, 'RP 10.5mm は JAN 発売予定')

  for (const row of bySlug.hss.variants[0].specs) {
    const expectedShank = Number(row.size) <= 45 ? '6.35mm 六角軸' : '10mm ストレート'
    assert.equal(row.shank.ja, expectedShank, `RH ${row.size}mm のシャンク境界`)
  }
  assert.ok(bySlug.tct.variants[0].specs.every(row => row.shank.ja === '10mm ストレート'), 'RHC は全サイズ 10mm ストレート')

  for (const file of ['src/views/HomeView.vue', 'src/views/ProductsView.vue']) {
    const source = readFileSync(join(ROOT, file), 'utf8')
    assert.match(source, /FAMILIES/, `${file}: 製品カードを単一データ源から導出`)
    assert.doesNotMatch(source, /const (?:FEATURED_DATA|DRILL_DATA|HOLESAW_DATA)/, `${file}: 製品情報を重複定義しない`)
  }

  const detailSource = readFileSync(join(ROOT, 'src/views/FamilyDetail.vue'), 'utf8')
  assert.match(detailSource, /fam\.value\.seo/, '製品詳細の meta 情報を SEO データから導出')
  assert.match(detailSource, /<DriveBadges v-if="variant\.driveBadges\?\.length"/, '駆動方式ラベルを製品名の近くに表示')
  assert.match(detailSource, /v-if="fam\.variants\.length > 1"/, '単一バリエーションの「標準」タブを表示しない')

  const driveBadgesSource = readFileSync(join(ROOT, 'src/components/DriveBadges.vue'), 'utf8')
  assert.match(driveBadgesSource, /v-if="mode\.condition"/, '条件付きモードは条件を画面にも表示する')
  assert.match(driveBadgesSource, /data-mode-condition/, '条件表示をブラウザ検証できる状態にする')
  assert.match(driveBadgesSource, /tField\(mode\.condition\)/, '条件表示を日英で切り替える')
  assert.match(driveBadgesSource, /<span aria-hidden="true">\{\{ t\(`product\.drive_\$\{mode\.type\}`\) \}\}<\/span>/, '見えるモード名を支援技術で重複朗読しない')
  assert.match(driveBadgesSource, /<span class="sr-only">\{\{ modeAssistiveText\(mode\) \}\}<\/span>/, '完全なモード情報を支援技術へ一度だけ渡す')

  assert.match(ja.products.catalog_sub, /取扱説明書/, 'カタログより取扱説明書を優先する案内')
  assert.match(en.products.catalog_sub, /product manual/i, '英語表示も説明書優先を明示')

  const sourceCodes = ['search', 'referral', 'event', 'social', 'other']
  const contactSource = readFileSync(join(ROOT, 'src/views/ContactView.vue'), 'utf8')
  assert.match(contactSource, /const SOURCE_CODES = \['search', 'referral', 'event', 'social', 'other'\]/, '流入経路コードをフォームで固定する')
  assert.equal(ja.contact.source_options.length, sourceCodes.length, '日本語の流入経路ラベル数をコードと揃える')
  assert.equal(en.contact.source_options.length, sourceCodes.length, '英語の流入経路ラベル数をコードと揃える')
})
