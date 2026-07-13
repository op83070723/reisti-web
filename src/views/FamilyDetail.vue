<template>
  <div v-if="fam && variant" class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">

    <!-- Breadcrumb -->
    <nav class="text-sm text-zinc-500">
      <RouterLink to="/products" class="hover:text-zinc-700 transition-colors">{{ t('product.breadcrumb') }}</RouterLink>
      <span class="mx-2">/</span>
      <span class="text-zinc-600">{{ tField(fam.name) }}</span>
    </nav>

    <!-- Title + variant tabs -->
    <div class="mt-3 flex flex-wrap items-center gap-3">
      <h1 class="text-2xl font-extrabold text-zinc-900 sm:text-3xl">{{ tField(fam.name) }}</h1>
      <span class="inline-flex items-center rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600 ring-1 ring-inset ring-pink-200">
        {{ t('product.brand_badge') }}
      </span>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="v in fam.variants" :key="v.slug"
          class="rounded-full border px-3 py-1 text-sm font-medium transition-colors"
          :class="v.slug === variant.slug
            ? 'border-pink-600 bg-pink-600 text-white'
            : 'border-zinc-300 text-zinc-600 hover:border-zinc-500 hover:text-zinc-900'"
          @click="goVariant(v.slug)">
          {{ tField(v.label) }}
        </button>
      </div>
    </div>
    <p class="mt-2 text-zinc-500">{{ tField(fam.intro) }}</p>

    <!-- ファーストビュー CTA：見積もり・サンプル（製品名を自動プリフィル） -->
    <div class="mt-5 flex flex-wrap gap-2.5">
      <RouterLink
        :to="{ path: '/contact', query: { type: 'bulk', product: quoteProduct } }"
        class="btn-red"
        @click="track('cta_click', { cta: 'quote', product: quoteProduct })">
        {{ t('product.quote_btn') }}
      </RouterLink>
      <RouterLink
        :to="{ path: '/contact', query: { type: 'sample', product: quoteProduct } }"
        class="btn-outline"
        @click="track('cta_click', { cta: 'sample', product: quoteProduct })">
        {{ t('product.sample_btn') }}
      </RouterLink>
    </div>

    <!-- Main: description + gallery -->
    <div class="mt-8 grid gap-8 md:grid-cols-12">
      <div class="md:col-span-5">
        <div class="rounded-xl border border-zinc-100 bg-zinc-50 p-5 text-sm leading-7 text-zinc-700 whitespace-pre-line">
          {{ tField(variant.detail) || tField(fam.intro) }}
        </div>

        <!-- Features -->
        <div v-if="variant.features?.length" class="mt-5">
          <h2 class="mb-3 text-base font-bold text-zinc-900">{{ t('product.features_title') }}</h2>
          <ul class="space-y-2.5">
            <li v-for="(f, i) in variant.features" :key="i" class="flex gap-2.5 text-sm leading-relaxed text-zinc-600">
              <svg class="mt-1 h-4 w-4 shrink-0 text-pink-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              <span>{{ tField(f) }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="md:col-span-7">
        <ProductGallery :key="variant.slug" :images="gallery" ratio="4/3" :interval="4200" />
      </div>
    </div>

    <!-- Quick specs: materials / shank / tools -->
    <div v-if="variant.materials || variant.shank || variant.tools" class="mt-8 grid gap-3 sm:grid-cols-3">
      <div v-if="variant.materials" class="rounded-xl border border-zinc-200 p-5">
        <p class="text-xs font-semibold uppercase tracking-widest text-pink-600">{{ t('product.materials_label') }}</p>
        <p class="mt-2 text-sm leading-relaxed text-zinc-700">{{ tField(variant.materials) }}</p>
      </div>
      <div v-if="variant.shank" class="rounded-xl border border-zinc-200 p-5">
        <p class="text-xs font-semibold uppercase tracking-widest text-pink-600">{{ t('product.shank_label') }}</p>
        <p class="mt-2 text-sm leading-relaxed text-zinc-700">{{ tField(variant.shank) }}</p>
      </div>
      <div v-if="variant.tools" class="rounded-xl border border-zinc-200 p-5">
        <p class="text-xs font-semibold uppercase tracking-widest text-pink-600">{{ t('product.tools_label') }}</p>
        <p class="mt-2 text-sm leading-relaxed text-zinc-700">{{ tField(variant.tools) }}</p>
      </div>
    </div>

    <!-- Suitability -->
    <div class="mt-10" v-reveal>
      <h2 class="mb-3 text-lg font-bold text-zinc-900">{{ lang === 'ja' ? '適合素材' : 'Material Suitability' }}</h2>
      <SuitabilityMatrix :items="variant.suitability || []" />
      <p class="mt-2 text-xs text-zinc-500">{{ t('product.suitability_note') }}</p>
    </div>

    <!-- Spec table -->
    <div class="mt-10" v-reveal>
      <div class="mb-3 flex flex-wrap items-center gap-3">
        <h2 class="text-lg font-bold text-zinc-900">{{ t('product.size_title') }}</h2>
        <span v-if="variant.sizeNote" class="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          {{ tField(variant.sizeNote) }}
        </span>
        <div v-if="rows.length" class="flex items-center gap-2">
          <input
            v-model="sizeQuery"
            type="text" inputmode="decimal"
            :aria-label="lang === 'ja' ? 'サイズ検索' : 'Filter size'"
            :placeholder="lang === 'ja' ? 'サイズ検索（例: 33）' : 'Filter size'"
            class="w-36 rounded-lg border border-zinc-500 px-3 py-1.5 text-xs text-zinc-700 placeholder-zinc-500 focus:border-pink-600 focus:outline-none focus:ring-1 focus:ring-pink-600" />
          <span v-if="sizeQuery.trim()" class="text-xs text-zinc-500">{{ hitCount }}{{ lang === 'ja' ? '件' : ' found' }}</span>
        </div>
        <RouterLink :to="{ path: '/contact', query: { type: 'bulk', product: quoteProduct } }" class="ml-auto btn-outline text-xs">{{ t('product.quote_btn') }}</RouterLink>
      </div>
      <div class="overflow-x-auto rounded-xl border border-zinc-200">
        <table class="min-w-full text-sm">
          <thead class="bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <tr>
              <th v-for="c in cols" :key="c" class="px-4 py-3 text-left whitespace-nowrap">{{ colLabels[c] }}</th>
              <th class="px-4 py-3"><span class="sr-only">{{ t('product.quote_btn') }}</span></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100">
            <!-- v-show（CSS 隠し）を使う：収合中も全行が静的 HTML に含まれ、品番・JAN が検索エンジンに読まれる -->
            <tr v-for="(row, i) in rows" :key="row.code || row.size" v-show="rowVisible(row, i)" class="hover:bg-zinc-50">
              <td v-for="c in cols" :key="c" class="px-4 py-3 whitespace-nowrap"
                  :class="[
                    c === 'code' || c === 'jan' ? 'font-mono text-xs text-zinc-500' : c === 'size' ? 'font-medium' : 'text-zinc-600',
                    copyable(c, row) ? 'copy-cell cursor-pointer select-none transition-colors hover:text-pink-600' : '',
                  ]"
                  :tabindex="copyable(c, row) ? 0 : undefined"
                  @keydown.enter.prevent="copyable(c, row) && copyText(row[c])"
                  @keydown.space.prevent="copyable(c, row) && copyText(row[c])"
                  @click="copyable(c, row) && copyText(row[c])">
                <template v-if="c === 'size'">
                  Ø{{ row.size }}mm
                  <span v-if="row.popular" class="ml-1.5 inline-flex items-center rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-semibold text-pink-600 ring-1 ring-inset ring-pink-200">
                    {{ t('product.popular') }}
                  </span>
                </template>
                <template v-else-if="c === 'overall' || c === 'effective'">{{ row[c] != null ? row[c] + 'mm' : '—' }}</template>
                <template v-else-if="c === 'shank'">{{ tField(row.shank) }}</template>
                <template v-else-if="c === 'jan'">
                  {{ row.jan ?? t('product.jan_pending') }}<svg v-if="row.jan" class="copy-ic ml-1.5 inline h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
                </template>
                <template v-else>
                  {{ row[c] ?? '—' }}<svg v-if="copyable(c, row)" class="copy-ic ml-1.5 inline h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
                </template>
              </td>
              <!-- 行単位の見積もり CTA：製品名＋サイズをプリフィルして遷移 -->
              <td class="px-4 py-3 whitespace-nowrap text-right">
                <RouterLink
                  :to="{ path: '/contact', query: { type: 'bulk', product: `${quoteProduct} Ø${row.size}mm` } }"
                  class="text-xs font-medium text-pink-600 hover:text-pink-700"
                  :aria-label="`Ø${row.size}mm ${t('product.quote_btn')}`"
                  @click.stop="track('cta_click', { cta: 'quote_size', product: quoteProduct, size: `${row.size}mm` })">
                  {{ t('product.quote_btn') }} →
                </RouterLink>
              </td>
            </tr>
            <tr v-if="!rows.length">
              <td :colspan="cols.length + 1" class="px-4 py-6 text-center text-zinc-500">{{ t('product.pending') }}</td>
            </tr>
            <tr v-if="rows.length && sizeQuery.trim() && !hitCount">
              <td :colspan="cols.length + 1" class="px-4 py-6 text-center text-zinc-500">
                {{ lang === 'ja' ? '該当するサイズがありません' : 'No matching sizes' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3 flex flex-wrap items-center gap-4">
        <button
          v-if="rows.length > COLLAPSE_AT && !sizeQuery.trim()"
          class="btn-outline text-xs"
          @click="expanded = !expanded">
          {{ expanded
            ? (lang === 'ja' ? '折りたたむ' : 'Collapse')
            : (lang === 'ja' ? `全${rows.length}サイズを表示` : `Show all ${rows.length} sizes`) }}
        </button>
        <p class="text-xs text-zinc-500">{{ t('product.price_note') }}</p>
      </div>
    </div>

    <!-- コピー完了トースト -->
    <Transition name="toast">
      <div v-if="toast" class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white shadow-lg">
        {{ toast }}
      </div>
    </Transition>

    <!-- Related docs -->
    <div v-if="fam.docs?.length" class="mt-10">
      <h2 class="mb-3 text-lg font-bold text-zinc-900">{{ lang === 'ja' ? '関連資料' : 'Documents' }}</h2>
      <div class="grid gap-3 sm:grid-cols-2">
        <a
          v-for="doc in fam.docs" :key="doc.file"
          :href="doc.file"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-4 text-sm transition-colors hover:border-zinc-400 hover:bg-zinc-50">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-lg">📄</span>
          <div>
            <p class="font-semibold text-zinc-700">{{ tField(doc.label) }}</p>
            <p class="text-xs text-zinc-500">PDF</p>
          </div>
        </a>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useI18n, tField } from '../i18n/index.js'
import { findFamily, CATEGORIES } from '../data/products.js'
import { track } from '../utils/track.js'
import { SITE } from '../router/index.js'
import ProductGallery    from '../components/ProductGallery.vue'
import SuitabilityMatrix from '../components/SuitabilityMatrix.vue'

const COLLAPSE_AT = 12

const { t, lang } = useI18n()
const route  = useRoute()
const router = useRouter()
const fam    = ref(null)
const variant = ref(null)
const expanded = ref(false)
const sizeQuery = ref('')

function load() {
  const match  = findFamily(route.params.category, route.params.slug)
  fam.value    = match?.family  ?? null
  variant.value = match?.variant ?? null
  expanded.value = false
  sizeQuery.value = ''
}
watch(() => route.fullPath, load, { immediate: true })

/* --- サイズ検索・品番/JAN コピー --- */
const matchesQuery = r => String(r.size).includes(sizeQuery.value.trim())
const hitCount = computed(() => rows.value.filter(matchesQuery).length)
const rowVisible = (row, i) =>
  sizeQuery.value.trim() ? matchesQuery(row) : (expanded.value || i < COLLAPSE_AT)

const copyable = (c, row) => (c === 'code' || c === 'jan') && !!row[c]
const toast = ref('')
let toastTimer = null
async function copyText(text) {
  let ok = true
  try { await navigator.clipboard.writeText(text) } catch { ok = false } // 非 HTTPS 等で失敗し得る
  toast.value = ok
    ? (lang.value === 'ja' ? `${text} をコピーしました` : `Copied ${text}`)
    : (lang.value === 'ja' ? 'コピーできませんでした' : 'Copy failed')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value = '' }, 1600)
}

/* 製品ごとの title / description / Product 構造化データ。
   useHead は SSG 時に静的 HTML へ焼き込み、言語切替にもリアクティブに追従する */
useHead({
  title: computed(() => fam.value ? `${tField(fam.value.name)}｜REISTI` : 'REISTI｜公式サイト'),
  meta: [
    { name: 'description', content: computed(() => tField(fam.value?.intro) || '') },
    // OG は App.vue の全站定義を property キーで上書き（og:image は製品写真）。
    // og:image は WebP 非対応の SNS クローラーがあるため PNG 版を指す（PNG は public/products/ に併存）
    { property: 'og:title',       content: computed(() => fam.value ? `${tField(fam.value.name)}｜REISTI` : 'REISTI｜公式サイト') },
    { property: 'og:description', content: computed(() => tField(fam.value?.intro) || '') },
    { property: 'og:image',       content: computed(() => variant.value?.hero ? SITE + variant.value.hero.replace(/\.webp$/, '.png') : `${SITE}/og.jpg`) },
    { name: 'twitter:title',       content: computed(() => fam.value ? `${tField(fam.value.name)}｜REISTI` : 'REISTI｜公式サイト') },
    { name: 'twitter:description', content: computed(() => tField(fam.value?.intro) || '') },
    { name: 'twitter:image',       content: computed(() => variant.value?.hero ? SITE + variant.value.hero.replace(/\.webp$/, '.png') : `${SITE}/og.jpg`) },
  ],
  script: [
    {
      id: 'product-jsonld',
      type: 'application/ld+json',
      innerHTML: computed(() => fam.value ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: fam.value.name.ja,
        alternateName: fam.value.name.en,
        brand: { '@type': 'Brand', name: 'REISTI' },
        manufacturer: { '@type': 'Organization', name: '瑞士釘株式会社', '@id': 'https://www.reisti.com/#org' },
        url: `https://www.reisti.com${route.path}`,
        category: CATEGORIES.find(c => c.slug === fam.value.category)?.name.ja || fam.value.category,
        image: `https://www.reisti.com${variant.value?.hero || ''}`,
        description: fam.value.intro.ja,
        // material は使わない：products.js の materials は「加工対象の材料」であり製品自体の素材ではない
        additionalProperty: [
          variant.value?.materials && { '@type': 'PropertyValue', name: '用途材料', value: variant.value.materials.ja },
          variant.value?.shank     && { '@type': 'PropertyValue', name: 'シャンク', value: variant.value.shank.ja },
          variant.value?.tools     && { '@type': 'PropertyValue', name: '適合電動機', value: variant.value.tools.ja },
        ].filter(Boolean),
      }) : ''),
    },
    {
      id: 'breadcrumb-jsonld',
      type: 'application/ld+json',
      innerHTML: computed(() => fam.value ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '製品一覧', item: `${SITE}/products` },
          { '@type': 'ListItem', position: 2, name: fam.value.name.ja, item: SITE + route.path },
        ],
      }) : ''),
    },
  ],
})

const goVariant = (slug) => router.replace({ name: 'family', params: { category: fam.value.category, slug } })

/* 見積フォームへ渡す製品名（バリエーションが複数ある場合はラベルも付ける） */
const quoteProduct = computed(() => {
  if (!fam.value) return ''
  const name = tField(fam.value.name)
  return fam.value.variants.length > 1 && variant.value
    ? `${name}（${tField(variant.value.label)}）`
    : name
})

/* alt は「ブランド＋製品名＋写真番号」——Google 画像検索向けのキーワードを自然に含める */
const gallery = computed(() =>
  (variant.value?.gallery || []).map((src, i) => ({
    src,
    alt: `REISTI ${tField(fam.value?.name) || ''} 製品写真${i > 0 ? ` ${i + 1}` : ''}`.trim(),
  }))
)

/* --- spec table --- */
const cols = computed(() => variant.value?.specCols || ['size', 'overall', 'effective'])
const colLabels = computed(() => ({
  code:      t('product.col_code'),
  size:      t('product.col_diameter'),
  overall:   t('product.col_overall'),
  effective: t('product.col_effective'),
  shank:     t('product.col_shank'),
  jan:       t('product.col_jan'),
}))
const rows = computed(() => {
  const pop = new Set(variant.value?.popularSizes || [])
  return (variant.value?.specs || []).map(r => ({ ...r, popular: pop.has(String(r.size)) }))
})
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: opacity .2s ease, transform .2s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 8px); }
.toast-enter-to, .toast-leave-from { transform: translate(-50%, 0); }

/* 複製圖示：滑到該格立即浮現（取代反應慢的原生 title tooltip） */
.copy-ic { opacity: 0; transition: opacity .15s ease; vertical-align: -2px; }
.copy-cell:hover .copy-ic { opacity: .85; }
</style>
