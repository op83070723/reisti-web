<template>
  <!-- items-start：サムネイル列が主画像より高いとき、主画像が引き伸ばされて 16:9 が崩れるのを防ぐ。
       focusin/focusout：キーボード操作中は自動再生を止める（マウスの hover 停止と対で WCAG 2.2.2 対応） -->
  <div class="grid gap-3" :class="slots.length > 1 ? 'md:grid-cols-[1fr_80px] md:items-start' : ''" @focusin="stop" @focusout="start">
    <!-- Main image -->
    <div
      class="relative rounded-xl border border-zinc-200 bg-white overflow-hidden select-none"
      :style="{ aspectRatio: ratio }"
      @mouseenter="stop" @mouseleave="start"
      @touchstart.passive="ts" @touchmove.passive="tm" @touchend.passive="te">

      <img
        v-if="currentSlot"
        :src="currentSlot.src"
        :alt="currentSlot.alt || ''"
        width="1600"
        height="900"
        fetchpriority="high"
        class="h-full w-full object-contain" />

      <!-- Empty placeholder -->
      <div v-else class="flex h-full w-full flex-col items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-xs text-zinc-300">Coming soon</span>
      </div>

      <button v-if="slots.length > 1" class="nav-btn left-2"  @click="prev" aria-label="前の画像">‹</button>
      <button v-if="slots.length > 1" class="nav-btn right-2" @click="next" aria-label="次の画像">›</button>
      <div v-if="slots.length > 1" class="absolute bottom-0 left-1/2 -translate-x-1/2 flex">
        <!-- ドットの視覚サイズは小さいまま、padding でタップ領域を 24px 以上確保する -->
        <button
          v-for="(_, i) in slots" :key="i"
          class="px-1.5 py-2.5"
          :aria-label="`${i + 1}枚目の画像`"
          :aria-current="i === idx ? 'true' : undefined"
          @click="go(i)">
          <span class="block h-1.5 w-5 rounded-full transition-colors" :class="i === idx ? 'bg-zinc-800' : 'bg-zinc-300 hover:bg-zinc-500'" />
        </button>
      </div>
    </div>

    <!-- Thumbnails（実画像が 1 枚のときは列ごと非表示） -->
    <div v-if="slots.length > 1" class="flex md:flex-col gap-2 overflow-auto">
      <button
        v-for="(slot, i) in slots" :key="i"
        class="relative shrink-0 rounded-lg overflow-hidden ring-1 transition bg-white"
        :class="i === idx ? 'ring-pink-500 ring-2' : 'ring-zinc-200 hover:ring-zinc-400'"
        :aria-label="`${i + 1}枚目の画像を表示`"
        @click="go(i)">
        <!-- サムネイル高さは 64px 固定：5 枚のとき列高 352px（5×64+4×8）に収め、主画像（16:9）より高くならないようにする -->
        <img v-if="slot" :src="slot.src" :alt="slot.alt || ''" width="1000" height="1000" loading="lazy" decoding="async" class="h-16 w-20 object-contain p-1" />
        <div v-else class="h-16 w-20 flex items-center justify-center text-zinc-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  images:   { type: Array,  default: () => [] },
  ratio:    { type: String, default: '4/3'    },
  interval: { type: Number, default: 4000     },
})

const idx = ref(0)
let timer = null

const slots = computed(() => {
  // 「Coming soon」の空スロットは作らない：ナビ・自動再生が空白ページに入る事故の温床だった。
  // 画像が無い変種のみ、プレースホルダーを 1 枚表示する
  const real = (props.images || []).filter(Boolean)
  return real.length ? real : [null]
})

const currentSlot = computed(() => slots.value[idx.value] ?? null)
const realCount   = computed(() => (props.images || []).filter(Boolean).length)

const go   = (n) => { idx.value = (n + slots.value.length) % slots.value.length }
const next = () => go(idx.value + 1)
const prev = () => go(idx.value - 1)

/* OS の「視差効果を減らす」設定中は自動再生しない（手動ナビは可）。
   window 参照はあるが、start はマウント後・ユーザー操作でしか呼ばれないため SSG でも安全 */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const start = () => { stop(); if (realCount.value > 1 && props.interval && !prefersReducedMotion()) timer = setInterval(next, props.interval) }
const stop  = () => { clearInterval(timer); timer = null }

let sx = 0, dx = 0
const ts = (e) => { stop(); sx = e.touches[0].clientX; dx = 0 }
const tm = (e) => { dx = e.touches[0].clientX - sx }
const te = () => { if (dx > 40) prev(); else if (dx < -40) next(); start() }

onMounted(start)
onBeforeUnmount(stop)
watch(() => props.images, () => { idx.value = 0; start() }, { deep: true })
</script>

<style scoped>
.nav-btn { @apply absolute top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-white/90 border border-zinc-200 text-lg text-zinc-700 hover:bg-white; }
</style>
