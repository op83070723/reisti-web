<template>
  <div v-if="fam && variant" class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">

    <!-- Breadcrumb -->
    <nav class="text-sm text-zinc-400">
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
            ? 'border-pink-500 bg-pink-500 text-white'
            : 'border-zinc-300 text-zinc-600 hover:border-zinc-500 hover:text-zinc-900'"
          @click="goVariant(v.slug)">
          {{ tField(v.label) }}
        </button>
      </div>
    </div>
    <p class="mt-2 text-zinc-500">{{ tField(fam.intro) }}</p>

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
        <p class="text-xs font-semibold uppercase tracking-widest text-pink-500">{{ t('product.materials_label') }}</p>
        <p class="mt-2 text-sm leading-relaxed text-zinc-700">{{ tField(variant.materials) }}</p>
      </div>
      <div v-if="variant.shank" class="rounded-xl border border-zinc-200 p-5">
        <p class="text-xs font-semibold uppercase tracking-widest text-pink-500">{{ t('product.shank_label') }}</p>
        <p class="mt-2 text-sm leading-relaxed text-zinc-700">{{ tField(variant.shank) }}</p>
      </div>
      <div v-if="variant.tools" class="rounded-xl border border-zinc-200 p-5">
        <p class="text-xs font-semibold uppercase tracking-widest text-pink-500">{{ t('product.tools_label') }}</p>
        <p class="mt-2 text-sm leading-relaxed text-zinc-700">{{ tField(variant.tools) }}</p>
      </div>
    </div>

    <!-- Suitability -->
    <div class="mt-10">
      <h2 class="mb-3 text-lg font-bold text-zinc-900">{{ lang === 'ja' ? '適合素材' : 'Material Suitability' }}</h2>
      <SuitabilityMatrix :items="variant.suitability || []" />
      <p class="mt-2 text-xs text-zinc-400">{{ t('product.suitability_note') }}</p>
    </div>

    <!-- Spec table -->
    <div class="mt-10">
      <div class="mb-3 flex flex-wrap items-center gap-3">
        <h2 class="text-lg font-bold text-zinc-900">{{ t('product.size_title') }}</h2>
        <span v-if="variant.sizeNote" class="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          {{ tField(variant.sizeNote) }}
        </span>
        <RouterLink :to="{ path: '/contact', query: { type: 'bulk', product: quoteProduct } }" class="ml-auto btn-outline text-xs">{{ t('product.quote_btn') }}</RouterLink>
      </div>
      <div class="overflow-x-auto rounded-xl border border-zinc-200">
        <table class="min-w-full text-sm">
          <thead class="bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <tr>
              <th v-for="c in cols" :key="c" class="px-4 py-3 text-left whitespace-nowrap">{{ colLabels[c] }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100">
            <!-- v-show（CSS 隠し）を使う：収合中も全行が静的 HTML に含まれ、品番・JAN が検索エンジンに読まれる -->
            <tr v-for="(row, i) in rows" :key="row.code || row.size" v-show="expanded || i < COLLAPSE_AT" class="hover:bg-zinc-50">
              <td v-for="c in cols" :key="c" class="px-4 py-3 whitespace-nowrap"
                  :class="c === 'code' || c === 'jan' ? 'font-mono text-xs text-zinc-500' : c === 'size' ? 'font-medium' : 'text-zinc-600'">
                <template v-if="c === 'size'">
                  Ø{{ row.size }}mm
                  <span v-if="row.popular" class="ml-1.5 inline-flex items-center rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-semibold text-pink-600 ring-1 ring-inset ring-pink-200">
                    {{ t('product.popular') }}
                  </span>
                </template>
                <template v-else-if="c === 'overall' || c === 'effective'">{{ row[c] != null ? row[c] + 'mm' : '—' }}</template>
                <template v-else-if="c === 'shank'">{{ tField(row.shank) }}</template>
                <template v-else-if="c === 'jan'">{{ row.jan ?? t('product.jan_pending') }}</template>
                <template v-else>{{ row[c] ?? '—' }}</template>
              </td>
            </tr>
            <tr v-if="!rows.length">
              <td :colspan="cols.length" class="px-4 py-6 text-center text-zinc-400">{{ t('product.pending') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3 flex flex-wrap items-center gap-4">
        <button
          v-if="rows.length > COLLAPSE_AT"
          class="btn-outline text-xs"
          @click="expanded = !expanded">
          {{ expanded
            ? (lang === 'ja' ? '折りたたむ' : 'Collapse')
            : (lang === 'ja' ? `全${rows.length}サイズを表示` : `Show all ${rows.length} sizes`) }}
        </button>
        <p class="text-xs text-zinc-400">{{ t('product.price_note') }}</p>
      </div>
    </div>

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
            <p class="text-xs text-zinc-400">PDF</p>
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
import { findFamily } from '../data/products.js'
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

function load() {
  const match  = findFamily(route.params.category, route.params.slug)
  fam.value    = match?.family  ?? null
  variant.value = match?.variant ?? null
  expanded.value = false
}
watch(() => route.fullPath, load, { immediate: true })

/* 製品ごとの title / description / Product 構造化データ。
   useHead は SSG 時に静的 HTML へ焼き込み、言語切替にもリアクティブに追従する */
useHead({
  title: computed(() => fam.value ? `${tField(fam.value.name)}｜REISTI` : 'REISTI｜公式サイト'),
  meta: [
    { name: 'description', content: computed(() => tField(fam.value?.intro) || '') },
    // OG は App.vue の全站定義を property キーで上書き（og:image は製品写真）
    { property: 'og:title',       content: computed(() => fam.value ? `${tField(fam.value.name)}｜REISTI` : 'REISTI｜公式サイト') },
    { property: 'og:description', content: computed(() => tField(fam.value?.intro) || '') },
    { property: 'og:image',       content: computed(() => variant.value?.hero ? SITE + variant.value.hero : `${SITE}/og.png`) },
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
        image: `https://www.reisti.com${variant.value?.hero || ''}`,
        description: fam.value.intro.ja,
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

const gallery = computed(() =>
  (variant.value?.gallery || []).map(src => ({ src, alt: tField(fam.value?.name) || '' }))
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
