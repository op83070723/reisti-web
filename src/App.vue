<template>
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-pink-600 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg">{{ t('nav.skip') }}</a>
  <Header />
  <main id="main">
    <RouterView />
  </main>
  <Footer />
  <FloatingContact />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import FloatingContact from './components/FloatingContact.vue'
import { useI18n, lang, initLang } from './i18n/index.js'
import { SITE, DEFAULT_DESC } from './router/index.js'
// 字体は Vite がハッシュ付きで /assets/ へ出力するため、?url で解決した URL を preload する
import fontUrl400 from './assets/fonts/subset/GenYoGothic2JP-400.woff2?url'
import fontUrl700 from './assets/fonts/subset/GenYoGothic2JP-700.woff2?url'

const route = useRoute()
const { t } = useI18n()

/* ルートの meta から title / description / canonical / OG を設定。
   SSG 時に静的 HTML へ焼き込まれる。製品ページは FamilyDetail の useHead が
   property / name キーの重複排除により og:title・og:description・og:image を上書きする */
const pageTitle = computed(() => route.meta?.title || 'REISTI｜公式サイト')
const pageDesc  = computed(() => route.meta?.desc || DEFAULT_DESC)
const pageUrl   = computed(() => SITE + route.path)

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDesc },
    { property: 'og:type',        content: 'website' },
    { property: 'og:site_name',   content: 'REISTI' },
    { property: 'og:locale',      content: 'ja_JP' },
    { property: 'og:title',       content: pageTitle },
    { property: 'og:description', content: pageDesc },
    { property: 'og:url',         content: pageUrl },
    { property: 'og:image',       content: `${SITE}/og.jpg` },
    { name: 'twitter:card',        content: 'summary_large_image' },
    { name: 'twitter:title',       content: pageTitle },
    { name: 'twitter:description', content: pageDesc },
    { name: 'twitter:image',       content: `${SITE}/og.jpg` },
  ],
  link: [
    { rel: 'canonical', href: pageUrl },
    // preload は本文と見出しで必ず使う 400/700 のみ（500/900 は初期表示に不要）
    { rel: 'preload', as: 'font', type: 'font/woff2', href: fontUrl400, crossorigin: 'anonymous' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: fontUrl700, crossorigin: 'anonymous' },
  ],
  htmlAttrs: { lang },
})

// 言語のユーザー偏好はブラウザ側でのみ復元（SSG は常に ja で出力）
onMounted(initLang)
</script>
