<template>
  <footer class="mt-16 border-t border-zinc-200 bg-zinc-950 text-zinc-300">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">

      <!-- Top: brand + columns -->
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

        <!-- Brand -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2">
            <img src="/logo.png" class="h-8 w-auto brightness-0 invert" alt="REISTI" />
            <span class="text-sm font-semibold text-white">REISTI</span>
          </div>
          <p class="mt-3 text-xs leading-relaxed text-zinc-400">{{ t('footer.tagline') }}</p>
          <p class="mt-3 text-xs text-zinc-500">{{ t('footer.address') }}</p>
          <a href="mailto:chenytbiz@reisti.org" class="mt-2 block text-xs text-zinc-400 hover:text-white transition-colors">
            chenytbiz@reisti.org
          </a>
        </div>

        <!-- Products -->
        <div>
          <h3 class="footer-title">{{ t('footer.col_products') }}</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li><RouterLink class="footer-link" to="/products/drill-bit/multi">{{ t('footer.link_drillbit') }}</RouterLink></li>
            <li><RouterLink class="footer-link" to="/products/hole-saw/hss">{{ t('footer.link_holesaw') }}</RouterLink></li>
            <li><RouterLink class="footer-link" to="/products">{{ t('footer.link_all_products') }}</RouterLink></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="footer-title">{{ t('footer.col_company') }}</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li><RouterLink class="footer-link" to="/about">{{ t('footer.link_about') }}</RouterLink></li>
            <li><RouterLink class="footer-link" to="/oem">{{ t('footer.link_oem') }}</RouterLink></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="footer-title">{{ t('footer.col_support') }}</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li><RouterLink class="footer-link" to="/contact">{{ t('footer.link_contact') }}</RouterLink></li>
            <li><span class="text-zinc-500 text-sm">{{ t('footer.link_catalog') }}</span></li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-10 flex flex-col gap-3 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-zinc-500">{{ t('footer.copyright') }}</p>
        <RouterLink to="/contact" class="text-xs text-zinc-400 hover:text-white transition-colors">
          {{ t('footer.privacy') }}
        </RouterLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from '../i18n/index.js'
const { t } = useI18n()
</script>

<style scoped>
.footer-title { @apply text-xs font-semibold uppercase tracking-widest text-zinc-400; }
.footer-link  { @apply text-zinc-300 hover:text-white transition-colors; }
</style>
