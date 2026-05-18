<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 py-12">

    <!-- Page header -->
    <header class="mb-10">
      <p class="text-sm font-semibold uppercase tracking-widest text-pink-500">{{ t('home.products_label') }}</p>
      <h1 class="mt-1 text-3xl font-extrabold text-zinc-900 sm:text-4xl">{{ t('products.title') }}</h1>
      <p class="mt-2 text-zinc-500">{{ t('products.sub') }}</p>
    </header>

    <!-- Featured -->
    <ProductScroller class="mb-14" :heading="t('products.featured')" :items="featured" />

    <!-- ===== REISTI Brand section ===== -->
    <div class="mb-3 flex items-center gap-3">
      <span class="inline-flex items-center rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600 ring-1 ring-inset ring-pink-200">
        REISTI Brand
      </span>
      <p class="text-xs text-zinc-400">{{ lang === 'ja' ? '自社工場製造 · OEM代工対応' : 'Own factory · OEM available' }}</p>
    </div>

    <ProductScroller class="mb-12" :heading="t('products.drillbit')" :items="drillbit" />
    <ProductScroller class="mb-14" :heading="t('products.holesaw')"  :items="holesaw" />

    <!-- ===== OEM Partnership section ===== -->
    <div class="mb-6 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-5">
      <div class="flex flex-wrap items-start gap-4">
        <div class="flex-1 min-w-0">
          <h2 class="text-xl font-extrabold text-zinc-900">{{ t('products.oem_section_title') }}</h2>
          <p class="mt-1 text-sm text-zinc-500">{{ t('products.oem_section_sub') }}</p>
        </div>
        <RouterLink to="/oem" class="shrink-0 inline-flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
          {{ t('nav.oem') }} →
        </RouterLink>
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-3">
        <div
          v-for="p in oemProducts" :key="p.family"
          class="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p class="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">OEM Only</p>
          <h3 class="mt-1 text-base font-extrabold text-zinc-900">{{ tField(p.name) }}</h3>
          <p class="mt-1 text-sm text-zinc-500 leading-relaxed">{{ tField(p.intro) }}</p>
          <RouterLink to="/contact" class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            {{ lang === 'ja' ? 'お問い合わせ' : 'Inquire' }} →
          </RouterLink>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n, tField } from '../i18n/index.js'
import { OEM_FAMILIES } from '../data/products.js'
import ProductScroller from '../components/ProductScroller.vue'

const { t, lang } = useI18n()

const oemProducts = OEM_FAMILIES

/* Product scroller item sets — bilingual via computed */
const DRILL_DATA = [
  {
    title: { ja: '充電マルチドリルビット', en: 'Cordless Multi Drill Bit' },
    subtitle: { ja: '充電工具に最適化した万能ビット。', en: 'One bit for wood, plastic & thin metal.' },
    img: '/products/hex-635.png',
    to: '/products/drill-bit/multi',
    artW: 280, artX: -50, artY: 40, rotate: 0,
  },
  {
    title: { ja: '六角軸コバルトドリル', en: 'Hex Shank Cobalt Drill' },
    subtitle: { ja: 'ステンレスも切る、M35コバルト鋼。', en: 'M35 cobalt steel for stainless & hard metals.' },
    img: '/products/M35.png',
    to: '/products/drill-bit/cobalt',
    artW: 245, artX: -60, artY: 60, rotate: 0,
  },
]

const HOLESAW_DATA = [
  {
    title: { ja: 'ハイスホールソー', en: 'HSS Hole Saw' },
    subtitle: { ja: '金属・木材・樹脂に幅広く対応。', en: 'Versatile HSS cutting across metal, wood & plastic.' },
    img: '/products/holesaw-bi.png',
    to: '/products/hole-saw/hss',
    artW: 260, artX: -50, artY: 40, rotate: -1,
  },
  {
    title: { ja: '超硬ホールソー', en: 'Carbide-Tipped Hole Saw' },
    subtitle: { ja: 'ALC・窯業系サイディングに超硬チップ。', en: 'Carbide tips for ALC and fiber-cement siding.' },
    img: '/products/holesaw-tct.png',
    to: '/products/hole-saw/tct',
    artW: 255, artX: -50, artY: 50, rotate: 0,
  },
]

const FEATURED_DATA = [...DRILL_DATA, ...HOLESAW_DATA]

const resolve = list => list.map(p => ({
  ...p,
  title:    p.title[lang.value]    || p.title.ja,
  subtitle: p.subtitle[lang.value] || p.subtitle.ja,
}))

const featured  = computed(() => resolve(FEATURED_DATA))
const drillbit  = computed(() => resolve(DRILL_DATA))
const holesaw   = computed(() => resolve(HOLESAW_DATA))
</script>
