<template>
  <!-- 狭い画面では横スクロール、主画像を十分大きく保てる xl 以上でのみ縦サムネイルにする -->
  <div
    class="grid gap-3"
    :class="slots.length > 1 ? 'xl:grid-cols-[minmax(0,1fr)_80px] xl:items-start' : ''"
    role="region"
    :aria-label="labels.region">
    <!-- Main image -->
    <div
      class="relative rounded-xl border border-zinc-200 bg-white overflow-hidden select-none"
      :style="{ aspectRatio: ratio }"
      @touchstart.passive="ts" @touchmove.passive="tm" @touchend.passive="te">

      <img
        v-if="currentSlot"
        :key="currentSlot.src"
        :src="currentSlot.src"
        :alt="currentSlot.alt || ''"
        :width="currentSlot.width || 1600"
        :height="currentSlot.height || 900"
        fetchpriority="high"
        class="h-full w-full object-contain" />

      <!-- Empty placeholder -->
      <div v-else class="flex h-full w-full flex-col items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-xs text-zinc-500">{{ labels.empty }}</span>
      </div>

      <button v-if="slots.length > 1" type="button" class="nav-btn left-2"  @click="prev" :aria-label="labels.previous">‹</button>
      <button v-if="slots.length > 1" type="button" class="nav-btn right-2" @click="next" :aria-label="labels.next">›</button>
    </div>

    <!-- Thumbnails（実画像が 1 枚のときは列ごと非表示） -->
    <div v-if="slots.length > 1" class="flex gap-2 overflow-x-auto pb-1 xl:flex-col xl:overflow-visible xl:pb-0">
      <button
        v-for="(slot, i) in slots" :key="slot.src"
        type="button"
        class="relative shrink-0 rounded-lg overflow-hidden ring-1 transition bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        :class="i === idx ? 'ring-pink-500 ring-2' : 'ring-zinc-200 hover:ring-zinc-400'"
        :aria-label="thumbnailLabel(slot, i)"
        :aria-current="i === idx ? 'true' : undefined"
        @click="go(i)">
        <img
          v-if="slot"
          :src="slot.src"
          alt=""
          :width="slot.width || 1600"
          :height="slot.height || 900"
          loading="lazy"
          decoding="async"
          class="h-16 w-20 object-contain p-1" />
        <div v-else class="h-16 w-20 flex items-center justify-center text-zinc-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </button>
    </div>

    <!-- 手動切替だけを読み上げる。自動再生は製品比較を妨げるため行わない -->
    <p v-if="slots.length > 1" class="sr-only" role="status" aria-atomic="true">
      {{ statusText }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  images: { type: Array,  default: () => [] },
  ratio:  { type: String, default: '4/3'    },
  labels: { type: Object, required: true },
})

const idx = ref(0)

const slots = computed(() => {
  // 「Coming soon」の空スロットは作らない：手動ナビが空白ページに入る事故の温床になる。
  // 画像が無い変種のみ、プレースホルダーを 1 枚表示する
  const real = (props.images || [])
    .filter(image => image && (typeof image === 'string' || image.src))
    .map(image => typeof image === 'string' ? { src: image } : image)
  return real.length ? real : [null]
})

const currentSlot = computed(() => slots.value[idx.value % slots.value.length] ?? null)

const go   = (n) => { idx.value = (n + slots.value.length) % slots.value.length }
const next = () => go(idx.value + 1)
const prev = () => go(idx.value - 1)

const formatLabel = (template, current, total) => String(template || '')
  .replace('{current}', current)
  .replace('{total}', total)

const statusText = computed(() => {
  const position = formatLabel(props.labels.status, idx.value + 1, slots.value.length)
  return currentSlot.value?.alt ? `${position}: ${currentSlot.value.alt}` : position
})

const thumbnailLabel = (slot, i) => {
  const action = formatLabel(props.labels.show, i + 1, slots.value.length)
  return slot?.alt ? `${action}: ${slot.alt}` : action
}

let sx = 0, dx = 0
const ts = (e) => { sx = e.touches[0].clientX; dx = 0 }
const tm = (e) => { dx = e.touches[0].clientX - sx }
const te = () => { if (dx > 40) prev(); else if (dx < -40) next(); dx = 0 }

// 言語切替で表示対象の画像が変わる場合、存在しない index を残さない
watch(() => slots.value.map(slot => slot?.src || '').join('|'), () => { idx.value = 0 })
</script>

<style scoped>
.nav-btn { @apply absolute top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-white/90 border border-zinc-200 text-lg text-zinc-700 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-2; }
</style>
