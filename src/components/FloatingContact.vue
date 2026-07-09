<template>
  <Transition name="fab">
    <div v-if="show" class="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <a
        href="https://lin.ee/yLb33tW" target="_blank" rel="noopener" aria-label="LINE"
        class="flex h-11 w-11 items-center justify-center rounded-full bg-[#06C755] font-bold text-white shadow-lg transition-transform hover:scale-105">
        L
      </a>
      <RouterLink
        to="/contact"
        class="inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-pink-600">
        {{ lang === 'ja' ? 'お見積もり' : 'Get a Quote' }}
      </RouterLink>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../i18n/index.js'

/* スクロール後に現れる問い合わせ導線。SSR 初期状態は非表示（scrolled=false）なのでハイドレーション安全。
   フッターが見えたら退場（プライバシーポリシー等のリンクを塞がない） */
const { lang } = useI18n()
const route = useRoute()
const scrolled = ref(false)
const footerVisible = ref(false)
let io = null

const onScroll = () => { scrolled.value = window.scrollY > 500 }
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  const footer = document.querySelector('footer')
  if (footer) {
    io = new IntersectionObserver(
      entries => { footerVisible.value = entries.some(e => e.isIntersecting) },
      { threshold: 0 },
    )
    io.observe(footer)
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  io?.disconnect()
})

const show = computed(() => scrolled.value && !footerVisible.value && route.path !== '/contact')
</script>

<style scoped>
.fab-enter-active, .fab-leave-active { transition: opacity .25s ease, transform .25s ease; }
.fab-enter-from, .fab-leave-to { opacity: 0; transform: translateY(12px); }
</style>
