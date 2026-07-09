<template>
  <span ref="el">{{ display }}</span>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

/* 数値ならビューポート進入時に 0 からカウントアップ。
   非数値（OEM / QC など）はそのまま表示。SSR は常に最終値を出力（SEO・非JS環境用） */
const props = defineProps({
  value:    { type: [String, Number], required: true },
  duration: { type: Number, default: 1100 },
})

const el = ref(null)
const display = ref(String(props.value))
const isNumeric = /^\d+$/.test(String(props.value))
let io = null
let raf = 0

function animate() {
  const target = parseInt(props.value, 10)
  const t0 = performance.now()
  const step = now => {
    const p = Math.min((now - t0) / props.duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    display.value = String(Math.round(target * eased))
    if (p < 1) raf = requestAnimationFrame(step)
  }
  display.value = '0'
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  if (!isNumeric) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  io = new IntersectionObserver(
    entries => {
      if (entries.some(e => e.isIntersecting)) {
        io.disconnect()
        animate()
      }
    },
    { threshold: 0.5 },
  )
  io.observe(el.value)
})

onBeforeUnmount(() => {
  io?.disconnect()
  cancelAnimationFrame(raf)
})
</script>
