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
      </div>
      <div class="md:col-span-7">
        <ProductGallery :key="variant.slug" :images="gallery" ratio="4/3" :interval="4200" />
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
      <div class="mb-3 flex items-center gap-3">
        <h2 class="text-lg font-bold text-zinc-900">{{ t('product.size_title') }}</h2>
        <span class="text-xs text-zinc-400">⭐ = {{ t('product.popular') }}</span>
        <RouterLink to="/contact" class="ml-auto btn-outline text-xs">{{ t('product.quote_btn') }}</RouterLink>
      </div>
      <div class="overflow-x-auto rounded-xl border border-zinc-200">
        <table class="min-w-full text-sm">
          <thead class="bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <tr>
              <th class="px-4 py-3 text-left">{{ t('product.col_diameter') }}</th>
              <th class="px-4 py-3 text-left">{{ t('product.col_overall') }}</th>
              <th class="px-4 py-3 text-left">{{ t('product.col_effective') }}</th>
              <th class="px-4 py-3 text-left">{{ t('product.col_price') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-100">
            <tr v-for="row in rows" :key="row.size" class="hover:bg-zinc-50">
              <td class="px-4 py-3 font-medium">Ø{{ row.size }}mm <span v-if="row.popular">⭐</span></td>
              <td class="px-4 py-3 text-zinc-600">{{ row.overall ?? '—' }}</td>
              <td class="px-4 py-3 text-zinc-600">{{ row.effective ?? '—' }}</td>
              <td class="px-4 py-3 text-zinc-600">
                <span v-if="row.priceJPY == null" class="text-zinc-400">—</span>
                <span v-else>¥{{ row.priceJPY.toLocaleString() }}</span>
              </td>
            </tr>
            <tr v-if="!rows.length">
              <td colspan="4" class="px-4 py-6 text-center text-zinc-400">{{ t('product.pending') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n, tField } from '../i18n/index.js'
import { findFamily } from '../data/products.js'
import ProductGallery    from '../components/ProductGallery.vue'
import SuitabilityMatrix from '../components/SuitabilityMatrix.vue'

const { t, lang } = useI18n()
const route  = useRoute()
const router = useRouter()
const fam    = ref(null)
const variant = ref(null)

function load() {
  const match  = findFamily(route.params.category, route.params.slug)
  fam.value    = match?.family  ?? null
  variant.value = match?.variant ?? null
}
watch(() => route.fullPath, load, { immediate: true })

const goVariant = (slug) => router.replace({ name: 'family', params: { category: fam.value.category, slug } })

const gallery = computed(() =>
  (variant.value?.gallery || []).map(src => ({ src, alt: tField(fam.value?.name) || '' }))
)
const rows = computed(() => {
  const pop = new Set(variant.value?.popularSizes || [])
  return (variant.value?.specs || []).map(r => ({ ...r, popular: pop.has(String(r.size)) }))
})
</script>
