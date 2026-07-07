<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-28 text-center">
    <p class="text-7xl font-extrabold tracking-tight text-zinc-200 sm:text-8xl">404</p>
    <h1 class="mt-4 text-2xl font-extrabold text-zinc-900 sm:text-3xl">{{ t('notfound.title') }}</h1>
    <p class="mt-3 text-sm leading-7 text-zinc-500">{{ t('notfound.sub') }}</p>

    <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
      <RouterLink to="/" class="btn-primary text-sm">{{ t('notfound.btn_home') }}</RouterLink>
      <RouterLink to="/products" class="btn-outline text-sm">{{ t('notfound.btn_products') }}</RouterLink>
      <RouterLink to="/contact" class="btn-outline text-sm">{{ t('notfound.btn_contact') }}</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { useI18n } from '../i18n/index.js'

const { t } = useI18n()

// 404 は検索エンジンにインデックスさせない
useHead({
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>
