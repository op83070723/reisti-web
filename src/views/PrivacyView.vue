<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-sm font-semibold uppercase tracking-widest text-pink-500">Privacy Policy</p>
      <h1 class="mt-1 text-3xl font-extrabold text-zinc-900 sm:text-4xl">{{ t('privacy.title') }}</h1>
      <p class="mt-4 text-sm leading-7 text-zinc-600 whitespace-pre-line">{{ t('privacy.intro') }}</p>
    </div>

    <!-- Sections -->
    <div class="space-y-8">
      <section v-for="(s, i) in t('privacy.sections')" :key="i">
        <h2 class="text-base font-bold text-zinc-900">{{ i + 1 }}. {{ s.h }}</h2>
        <p class="mt-2 text-sm leading-7 text-zinc-600 whitespace-pre-line">{{ s.body }}</p>
      </section>
    </div>

    <!-- Established date -->
    <p class="mt-12 border-t border-zinc-100 pt-6 text-xs text-zinc-400">{{ t('privacy.established') }}</p>
  </div>
</template>

<script setup>
import { useI18n } from '../i18n/index.js'
const { t } = useI18n()
</script>
