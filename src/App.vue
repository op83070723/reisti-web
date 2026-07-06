<template>
  <Header />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { lang, initLang } from './i18n/index.js'
import { DEFAULT_DESC } from './router/index.js'

const SITE = 'https://www.reisti.com'
const route = useRoute()

/* ルートの meta から title / description / canonical を設定。
   SSG 時に静的 HTML へ焼き込まれる。製品ページは FamilyDetail の useHead が優先される */
useHead({
  title: computed(() => route.meta?.title || 'REISTI｜公式サイト'),
  meta: [
    { name: 'description', content: computed(() => route.meta?.desc || DEFAULT_DESC) },
  ],
  link: [
    { rel: 'canonical', href: computed(() => SITE + route.path) },
  ],
  htmlAttrs: { lang },
})

// 言語のユーザー偏好はブラウザ側でのみ復元（SSG は常に ja で出力）
onMounted(initLang)
</script>
