<template>
  <ul
    class="flex flex-wrap items-center gap-2"
    :aria-label="t('product.drive_badges_label')">
    <li
      v-for="mode in modes"
      :key="mode.type"
      class="inline-flex min-h-8 items-center justify-center rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[13px] font-bold leading-none tracking-wide text-zinc-700 shadow-[0_1px_2px_rgba(24,24,27,0.06)]">
      <span aria-hidden="true">{{ t(`product.drive_${mode.type}`) }}</span>
      <span
        v-if="mode.condition"
        data-mode-condition
        aria-hidden="true"
        class="ml-1.5 border-l border-zinc-200 pl-1.5 text-[11px] tracking-normal text-zinc-500">
        {{ tField(mode.condition) }}
      </span>
      <span class="sr-only">{{ modeAssistiveText(mode) }}</span>
    </li>
  </ul>
</template>

<script setup>
import { useI18n, tField } from '../i18n/index.js'

defineProps({
  modes: { type: Array, required: true },
})

const { t } = useI18n()

const modeAssistiveText = mode => {
  if (mode.type === 'rotation') {
    return t(mode.only ? 'product.drive_rotation_only' : 'product.drive_rotation_mode')
  }
  const impactMode = t('product.drive_impact_mode')
  return mode.condition ? `${impactMode} · ${tField(mode.condition)}` : impactMode
}
</script>
