<template>
  <div class="grid gap-3 md:grid-cols-[1fr_80px]">
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
        width="1000"
        height="1000"
        fetchpriority="high"
        class="h-full w-full object-contain p-6" />

      <!-- Empty placeholder -->
      <div v-else class="flex h-full w-full flex-col items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-xs text-zinc-300">Coming soon</span>
      </div>

      <button v-if="slots.length > 1" class="nav-btn left-2"  @click="prev" aria-label="Previous">‹</button>
      <button v-if="slots.length > 1" class="nav-btn right-2" @click="next" aria-label="Next">›</button>
      <div v-if="slots.length > 1" class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        <button
          v-for="(_, i) in slots" :key="i"
          class="h-1.5 w-5 rounded-full transition-colors"
          :class="i === idx ? 'bg-zinc-800' : 'bg-zinc-300 hover:bg-zinc-500'"
          @click="go(i)" />
      </div>
    </div>

    <!-- Thumbnails -->
    <div class="flex md:flex-col gap-2 overflow-auto">
      <button
        v-for="(slot, i) in slots" :key="i"
        class="relative shrink-0 rounded-lg overflow-hidden ring-1 transition bg-white"
        :class="i === idx ? 'ring-pink-500 ring-2' : 'ring-zinc-200 hover:ring-zinc-400'"
        @click="go(i)">
        <img v-if="slot" :src="slot.src" :alt="slot.alt || ''" width="1000" height="1000" loading="lazy" decoding="async" class="h-16 w-20 md:h-20 md:w-20 object-contain p-1" />
        <div v-else class="h-16 w-20 md:h-20 md:w-20 flex items-center justify-center text-zinc-200">
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
  minSlots: { type: Number, default: 4        },
})

const idx = ref(0)
let timer = null

const slots = computed(() => {
  const real = (props.images || []).filter(Boolean)
  const count = Math.max(real.length, props.minSlots)
  return Array.from({ length: count }, (_, i) => real[i] ?? null)
})

const currentSlot = computed(() => slots.value[idx.value] ?? null)
const realCount   = computed(() => (props.images || []).filter(Boolean).length)

const go   = (n) => { idx.value = (n + slots.value.length) % slots.value.length }
const next = () => go(idx.value + 1)
const prev = () => go(idx.value - 1)

const start = () => { stop(); if (realCount.value > 1 && props.interval) timer = setInterval(next, props.interval) }
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
.nav-btn { @apply absolute top-1/2 -translate-y-1/2 grid place-items-center h-8 w-8 rounded-full bg-white/90 border border-zinc-200 text-lg text-zinc-700 hover:bg-white; }
</style>
