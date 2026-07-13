<template>
  <section class="relative">
    <div v-if="heading" class="mb-4 flex items-end justify-between px-1">
      <h2 class="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900">{{ heading }}</h2>
    </div>

    <div class="relative" :style="sizeVars">
      <div class="fade fade-l" :class="{ 'opacity-0': !canL }" aria-hidden="true" />
      <div class="fade fade-r" :class="{ 'opacity-0': !canR }" aria-hidden="true" />

      <div
        ref="track"
        class="track hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto"
        role="region"
        :aria-label="heading || '製品スライダー'"
        @wheel.passive="onWheel"
        @scroll.passive="sync"
        tabindex="0"
        @keydown.left="scroll(-1)"
        @keydown.right="scroll(1)">
        <RouterLink
          v-for="(p, i) in items"
          :key="i"
          :to="p.to || '#'"
          class="card snap-center sm:snap-start shrink-0">
          <div class="card-inner relative h-full overflow-hidden">
            <div class="copy px-4 pt-4">
              <p v-if="p.badge" class="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">{{ p.badge }}</p>
              <h3 class="mt-1 text-xl font-extrabold leading-tight text-zinc-900">{{ p.title }}</h3>
              <p v-if="p.subtitle" class="mt-1 text-sm text-zinc-500">{{ p.subtitle }}</p>
              <p v-if="p.price" class="mt-2 text-xs font-medium text-zinc-500">{{ p.price }}</p>
            </div>
            <!-- 產品圖統一為內容置中的正方形（見下方 .art 註解），寬高屬性只提供 1:1 比例 -->
            <img
              :src="p.img"
              :alt="`REISTI ${p.title}`"
              width="1000"
              height="1000"
              loading="lazy"
              decoding="async"
              class="art"
              :style="{
                '--aw': (p.artW ?? 320) + 'px',
                '--ay': (p.artY ?? 40)  + 'px',
              }"
              @error="e => e.target && (e.target.style.opacity = 0)" />
          </div>
        </RouterLink>
      </div>

      <div class="pointer-events-none absolute inset-0 z-10 flex items-center justify-between">
        <button class="ctrl pointer-events-auto" :class="{ 'opacity-30': !canL }" :disabled="!canL" @click="scroll(-1)" aria-label="前へ">‹</button>
        <button class="ctrl pointer-events-auto" :class="{ 'opacity-30': !canR }" :disabled="!canR" @click="scroll(1)"  aria-label="次へ">›</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  heading: { type: String,  default: '' },
  items:   { type: Array,   default: () => [] },
  cardW:   { type: Number,  default: 400 },
  cardH:   { type: Number,  default: 500 },
  step:    { type: Number,  default: 1 },
})

const sizeVars = computed(() => ({ '--cw': props.cardW + 'px', '--ch': props.cardH + 'px' }))
const track = ref(null)
const canL  = ref(false)
const canR  = ref(false)

function sync() {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  // 8px 容差：iOS smooth scroll 常停在離邊界 1〜2px 處
  canL.value = el.scrollLeft > 8
  canR.value = el.scrollLeft < max - 8
}

function onWheel(e) {
  if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) && !e.shiftKey) return
  track.value?.scrollBy({ left: e.deltaX, behavior: 'auto' })
}

function scroll(dir) {
  const el = track.value
  if (!el) return
  const card = el.querySelector('.card')
  const gap  = parseFloat(getComputedStyle(el).columnGap || 16)
  const step = (card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.8) * props.step * dir
  // 目標位置手動夾在 [0, max]：iOS Safari 的 scrollBy+snap 不會可靠夾邊界，超出會停在空白區
  const max = el.scrollWidth - el.clientWidth
  const target = Math.max(0, Math.min(max, el.scrollLeft + step))
  el.scrollTo({ left: target, behavior: 'smooth' })
  requestAnimationFrame(() => setTimeout(sync, 120))
}

onMounted(() => { sync(); window.addEventListener('resize', sync) })
onBeforeUnmount(() => window.removeEventListener('resize', sync))
watch(() => props.items, () => requestAnimationFrame(sync))
</script>

<style scoped>
/* .card＝吸附元素：只負責尺寸，不能加 transform（會觸發 scroll-snap 重新吸附而跳動） */
.card {
  position: relative;
  width: min(var(--cw, 400px), 85vw);
  height: var(--ch, 500px);
}
/* 視覺與 hover 浮起放在內層，不影響吸附計算 */
.card-inner {
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0,0,0,.07), 0 1px 4px rgba(0,0,0,.04);
  transition: transform .2s ease, box-shadow .2s ease;
}
.card:hover .card-inner {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0,0,0,.10), 0 2px 8px rgba(0,0,0,.05);
}
.copy { position: relative; z-index: 2; }
/* 產品圖：水平幾何置中（圖檔本身已重製為「內容置中的正方形」），不旋轉 */
.art {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--aw, 320px);
  height: auto;
  transform: translate(-50%, calc(-50% + var(--ay, 40px)));
  z-index: 1;
  pointer-events: none;
}
.ctrl {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: rgba(24,24,27,.6);
  color: #fff;
  font-size: 20px;
  border: 1px solid rgba(255,255,255,.2);
  backdrop-filter: blur(8px);
  margin: 0 6px;
  transition: opacity .15s;
}
.ctrl:hover { background: rgba(24,24,27,.8); }
.fade {
  position: absolute;
  top: 0; bottom: 0;
  width: 40px;
  z-index: 4;
  pointer-events: none;
  transition: opacity .2s ease;
}
.fade-l { left:  0; background: linear-gradient(90deg,  #fafafa, transparent); }
.fade-r { right: 0; background: linear-gradient(-90deg, #fafafa, transparent); }
.track {
  overscroll-behavior-inline: contain;
  scrollbar-width: none;
  /* 上下留空間給 hover 浮起與陰影，負 margin 抵銷視覺位移。
     水平方向不加 padding：會偏移 snap 吸附點（桌機霧氣誤觸發、iOS 越界怪行為的來源） */
  padding: 1rem 0;
  margin: -1rem 0;
}
/* 手機：兩端加 (滑軌寬 − 卡寬)/2 的緩衝，讓第一張/最後一張也能置中吸附 */
@media (max-width: 639px) {
  .track {
    padding-left:  calc((100% - min(var(--cw, 400px), 85vw)) / 2);
    padding-right: calc((100% - min(var(--cw, 400px), 85vw)) / 2);
    margin-left: 0;
    margin-right: 0;
  }
}
.track::-webkit-scrollbar { display: none; }
</style>
