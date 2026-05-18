<template>
  <div class="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
    <ul class="grid gap-2 sm:grid-cols-2">
      <li
        v-for="(it, i) in items" :key="i"
        class="flex items-center justify-between rounded-lg bg-white px-3 py-2 border border-zinc-100">
        <span class="text-sm font-medium text-zinc-700">{{ tField(it.name) }}</span>
        <div class="flex gap-1" :aria-label="`${tField(it.name)} ${it.level}/3`">
          <span
            v-for="n in 3" :key="n"
            class="inline-block h-3.5 w-5 rounded-sm"
            :class="n <= it.level ? 'bg-zinc-800' : 'bg-zinc-200'" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { tField } from '../i18n/index.js'
defineProps({ items: { type: Array, default: () => [] } })
</script>
