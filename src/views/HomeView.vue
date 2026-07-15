<template>
  <!-- ===== HERO ===== -->
  <section class="relative min-h-[78vh] overflow-hidden bg-zinc-950 flex items-end">
    <!-- Pink glow -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(236,72,153,0.13)_0%,transparent_60%)]" />
    <!-- Top border line -->
    <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

    <!-- Copy -->
    <div class="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-24 w-full">
      <p class="text-sm font-semibold uppercase tracking-widest text-pink-400">{{ t('home.hero_lead') }}</p>
      <h1 class="mt-4 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
        {{ t('home.hero_title') }}
      </h1>
      <p class="mt-4 max-w-xl text-zinc-400 md:text-lg">{{ t('home.hero_sub') }}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink to="/products" class="btn-red text-base px-7 py-3">{{ t('home.btn_products') }}</RouterLink>
        <RouterLink to="/contact" class="inline-flex items-center justify-center rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white">
          {{ t('home.btn_contact') }}
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- ===== TRUST SIGNALS ===== -->
  <section class="border-b border-zinc-100 bg-zinc-50 py-10" v-reveal>
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div v-for="(item, i) in t('home.trust')" :key="i" class="text-center">
          <p class="text-3xl font-black text-zinc-900"><CountUp :value="item.n" /></p>
          <p class="mt-0.5 text-sm font-semibold text-zinc-700">{{ item.label }}</p>
          <p class="mt-0.5 text-xs text-zinc-500">{{ item.sub }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== PRODUCTS ===== -->
  <section class="py-16 sm:py-20" v-reveal>
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="mb-10">
        <p class="text-sm font-semibold uppercase tracking-widest text-pink-600">{{ t('home.products_label') }}</p>
        <h2 class="mt-1 text-3xl font-extrabold text-zinc-900 sm:text-4xl">{{ t('home.products_title') }}</h2>
      </div>

      <!-- Category cards -->
      <div class="grid gap-5 sm:grid-cols-2">
        <RouterLink
          v-for="cat in categories" :key="cat.slug"
          :to="`/products`"
          class="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
          <p class="text-xs font-semibold uppercase tracking-widest text-pink-600">{{ tField(cat.lead) }}</p>
          <h3 class="mt-2 text-xl font-extrabold text-zinc-900">{{ tField(cat.name) }}</h3>
          <div class="mt-4 flex items-center gap-1 text-sm font-medium text-zinc-500 group-hover:text-zinc-900 transition-colors">
            <span>{{ t('home.btn_products') }}</span>
            <span class="transition-transform group-hover:translate-x-0.5">→</span>
          </div>
          <img
            :src="catImg[cat.slug]"
            :alt="`REISTI ${tField(cat.name)}`"
            width="1000"
            height="1000"
            loading="lazy"
            decoding="async"
            class="absolute right-4 bottom-4 h-24 w-24 object-contain opacity-70 transition group-hover:opacity-90"
            @error="e => e.target.style.display = 'none'" />
        </RouterLink>
      </div>

      <!-- Featured scroller -->
      <div class="mt-12">
        <ProductScroller :heading="t('products.featured')" :items="featured" />
      </div>
    </div>
  </section>

  <!-- ===== OEM CTA ===== -->
  <section class="bg-zinc-950 py-16 sm:py-20" v-reveal>
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">{{ t('home.cta_title') }}</h2>
        <p class="mt-4 text-zinc-400">{{ t('home.cta_sub') }}</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <RouterLink to="/contact?type=oem" class="btn-red">{{ t('home.cta_contact') }}</RouterLink>
          <RouterLink to="/oem" class="inline-flex items-center justify-center rounded-xl border border-zinc-600 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white">
            {{ t('home.cta_oem') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n, tField } from '../i18n/index.js'
import { CATEGORIES } from '../data/products.js'
import ProductScroller from '../components/ProductScroller.vue'
import CountUp from '../components/CountUp.vue'

const { t, lang } = useI18n()
const categories = CATEGORIES

const catImg = {
  'drill-bit': '/products/scroller/multi.webp',
  'hole-saw':  '/products/scroller/hss.webp',
}

const FEATURED_DATA = [
  {
    badge: 'REISTI',
    title: { ja: '充電マルチドリルビット', en: 'Cordless Multi Drill Bit' },
    subtitle: { ja: '超硬チップで薄鉄板からタイルまで。', en: 'Carbide-tipped bit for steel, concrete & tile.' },
    img: '/products/scroller/multi.webp',
    to: '/products/drill-bit/multi',
    artW: 330, artY: 40,
  },
  {
    badge: 'REISTI',
    title: { ja: '六角軸コバルトドリル', en: 'Hex Shank Cobalt Drill' },
    subtitle: { ja: 'ステンレスも切る、M35コバルト鋼。', en: 'M35 cobalt steel for stainless & hard metals.' },
    img: '/products/scroller/cobalt.webp',
    to: '/products/drill-bit/cobalt',
    artW: 330, artY: 40,
  },
  {
    badge: 'REISTI',
    title: { ja: 'ハイスホールソー', en: 'HSS Hole Saw' },
    subtitle: { ja: '金属・木材・樹脂に幅広く対応。', en: 'Versatile HSS cutting across metal, wood & plastic.' },
    img: '/products/scroller/hss.webp',
    to: '/products/hole-saw/hss',
    artW: 330, artY: 40,
  },
  {
    badge: 'REISTI',
    title: { ja: '超硬ホールソー', en: 'Carbide-Tipped Hole Saw' },
    subtitle: { ja: 'ステンレス板・FRPも切れるトリプル刃。', en: 'Triple-blade carbide for stainless, steel & FRP.' },
    img: '/products/scroller/tct.webp',
    to: '/products/hole-saw/tct',
    artW: 330, artY: 40,
  },
]

const featured = computed(() =>
  FEATURED_DATA.map(p => ({
    ...p,
    title: p.title[lang.value] || p.title.ja,
    subtitle: p.subtitle[lang.value] || p.subtitle.ja,
  }))
)

</script>

