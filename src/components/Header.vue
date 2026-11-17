<template>
  <header class="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">

      <!-- Logo -->
      <RouterLink :to="localePath('/')" class="flex items-center gap-1 shrink-0">
        <img src="/logo.png" width="1050" height="600" class="h-[42px] w-auto" alt="" />
        <img src="/logo-text.png" width="426" height="240" class="h-[60px] w-auto -ml-7 translate-y-[2.5px]" alt="REISTI" />
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-1 text-sm font-medium">
        <RouterLink class="nav-link" :to="localePath('/')">{{ t('nav.home') }}</RouterLink>

        <!-- Products mega menu -->
        <div class="relative" @mouseenter="megaOpen = true" @mouseleave="megaOpen = false">
          <RouterLink :to="localePath('/products')" class="nav-link" :class="{ 'bg-zinc-100 text-zinc-900': megaOpen }">
            {{ t('nav.products') }}
          </RouterLink>
          <Transition name="dropdown">
            <div v-if="megaOpen" class="absolute left-1/2 top-full mt-1 w-screen max-w-3xl -translate-x-1/2 px-4">
              <div class="h-2 w-full" />
              <div class="rounded-2xl border border-zinc-200 bg-white shadow-xl ring-1 ring-black/5 p-5">
                <div class="grid grid-cols-3 gap-4">
                  <div v-for="cat in categories" :key="cat.slug">
                    <p class="mb-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                      {{ tField(cat.name) }}
                    </p>
                    <ul class="space-y-1">
                      <li v-for="f in byCategory(cat.slug)" :key="f.family">
                        <RouterLink
                          :to="localePath(`/products/${cat.slug}/${f.variants[0].slug}`)"
                          class="block rounded-lg px-2 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                          @click="megaOpen = false">
                          {{ tField(f.name) }}
                        </RouterLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="mt-4 border-t border-zinc-100 pt-3">
                  <RouterLink :to="localePath('/products')" class="text-xs text-zinc-500 hover:text-zinc-900 transition-colors" @click="megaOpen = false">
                    {{ t('nav.products_all') }} →
                  </RouterLink>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <RouterLink class="nav-link" :to="localePath('/about')">{{ t('nav.about') }}</RouterLink>
        <RouterLink class="nav-link" :to="localePath('/oem')">{{ t('nav.oem') }}</RouterLink>
        <RouterLink class="nav-link" :to="localePath('/contact')">{{ t('nav.contact') }}</RouterLink>
      </nav>

      <!-- Right controls -->
      <div class="flex items-center gap-2">
        <!-- Language switcher -->
        <div class="hidden md:flex items-center rounded-lg border border-zinc-200 p-0.5 text-xs font-semibold">
          <a
            :href="languageLink('ja')" hreflang="ja" lang="ja"
            :aria-current="lang === 'ja' ? 'true' : undefined"
            class="rounded-md px-2.5 py-1 transition-colors"
            :class="lang === 'ja' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-700'">
            JA
          </a>
          <a
            :href="languageLink('en')" hreflang="en" lang="en"
            :aria-current="lang === 'en' ? 'true' : undefined"
            class="rounded-md px-2.5 py-1 transition-colors"
            :class="lang === 'en' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-700'">
            EN
          </a>
        </div>

        <RouterLink :to="localePath('/contact')" class="hidden md:inline-flex btn-primary text-sm">
          {{ t('nav.quote') }}
        </RouterLink>

        <!-- Mobile burger -->
        <button
          class="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen">
          <span v-if="!mobileOpen" aria-hidden="true" class="text-lg leading-none">☰</span>
          <span v-else aria-hidden="true" class="text-lg leading-none">✕</span>
          <span class="sr-only">Menu</span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div v-if="mobileOpen" class="md:hidden border-t border-zinc-100 bg-white">
        <div class="mx-auto max-w-7xl px-4 py-3 space-y-1">
          <RouterLink class="m-link" :to="localePath('/')" @click="mobileOpen = false">{{ t('nav.home') }}</RouterLink>

          <!-- Products accordion -->
          <div>
            <button
              class="m-link w-full !flex items-center justify-between text-left"
              @click="mProd = !mProd">
              <span>{{ t('nav.products') }}</span>
              <span class="text-zinc-500">{{ mProd ? '−' : '+' }}</span>
            </button>
            <div v-show="mProd" class="ml-4 mt-1 space-y-3 pb-2">
              <div v-for="cat in categories" :key="cat.slug">
                <p class="px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                  {{ tField(cat.name) }}
                </p>
                <RouterLink
                  v-for="f in byCategory(cat.slug)" :key="f.family"
                  :to="localePath(`/products/${cat.slug}/${f.variants[0].slug}`)"
                  class="block rounded-lg px-2 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50"
                  @click="mobileOpen = false; mProd = false">
                  {{ tField(f.name) }}
                </RouterLink>
              </div>
            </div>
          </div>

          <RouterLink class="m-link" :to="localePath('/about')"   @click="mobileOpen = false">{{ t('nav.about') }}</RouterLink>
          <RouterLink class="m-link" :to="localePath('/oem')"     @click="mobileOpen = false">{{ t('nav.oem') }}</RouterLink>
          <RouterLink class="m-link" :to="localePath('/contact')" @click="mobileOpen = false">{{ t('nav.contact') }}</RouterLink>

          <!-- Mobile lang + CTA -->
          <div class="flex items-center justify-between pt-2 border-t border-zinc-100">
            <div class="flex items-center rounded-lg border border-zinc-200 p-0.5 text-xs font-semibold">
              <a :href="languageLink('ja')" hreflang="ja" lang="ja" :aria-current="lang === 'ja' ? 'true' : undefined" class="rounded-md px-2.5 py-1 transition-colors" :class="lang === 'ja' ? 'bg-zinc-900 text-white' : 'text-zinc-500'">JA</a>
              <a :href="languageLink('en')" hreflang="en" lang="en" :aria-current="lang === 'en' ? 'true' : undefined" class="rounded-md px-2.5 py-1 transition-colors" :class="lang === 'en' ? 'bg-zinc-900 text-white' : 'text-zinc-500'">EN</a>
            </div>
            <RouterLink :to="localePath('/contact')" class="btn-primary text-xs" @click="mobileOpen = false">{{ t('nav.quote') }}</RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '../i18n/index.js'
import { CATEGORIES, FAMILIES } from '../data/products.js'

const { t, lang, tField, localePath } = useI18n()
const route = useRoute()
const router = useRouter()
const mounted = ref(false)
onMounted(() => { mounted.value = true })
// query/hash は mount 後のみ引き継ぎ、SSG のクエリなし HTML と一致させる。
const languageLink = locale => router.resolve(localePath({
  path: route.name === 'notfound' ? '/' : route.path,
  ...(mounted.value ? { query: route.query, hash: route.hash } : {}),
}, locale)).href
const megaOpen  = ref(false)
const mobileOpen = ref(false)
const mProd     = ref(false)

const categories = CATEGORIES
const byCategory = (slug) => FAMILIES.filter(f => f.category === slug)
</script>

<style scoped>
.nav-link {
  @apply rounded-lg px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900;
}
.m-link {
  @apply block rounded-xl px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors;
}
.dropdown-enter-active, .dropdown-leave-active { transition: opacity .15s ease, transform .15s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px); }
.slide-enter-active, .slide-leave-active { transition: opacity .15s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; }
</style>
