<template>
  <Header />
  <main>
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
import { lang, initLang } from './i18n/index.js'
import { SITE, DEFAULT_DESC } from './router/index.js'

const route = useRoute()

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
    { name: 'twitter:card',       content: 'summary_large_image' },
  ],
  link: [
    { rel: 'canonical', href: pageUrl },
  ],
  htmlAttrs: { lang },
})

// 言語のユーザー偏好はブラウザ側でのみ復元（SSG は常に ja で出力）
onMounted(initLang)
</script>
