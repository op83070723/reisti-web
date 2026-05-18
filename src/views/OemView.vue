<template>
  <!-- Hero -->
  <section class="bg-zinc-950 py-20 sm:py-28">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-sm font-semibold uppercase tracking-widest text-pink-400">{{ t('oem.hero_label') }}</p>
        <h1 class="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl" style="white-space: pre-line">{{ t('oem.hero_title') }}</h1>
        <p class="mt-6 text-lg text-zinc-400">{{ t('oem.hero_sub') }}</p>
        <RouterLink to="/contact" class="mt-8 inline-flex btn-red text-base px-7 py-3">{{ t('oem.hero_btn') }}</RouterLink>
      </div>
    </div>
  </section>

  <!-- Why REISTI -->
  <section class="py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-extrabold text-zinc-900 sm:text-4xl">{{ t('oem.why_title') }}</h2>
      </div>
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(r, i) in t('oem.reasons')" :key="i"
          class="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900">
            <span class="text-sm font-bold text-white">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <h3 class="font-bold text-zinc-900">{{ r.title }}</h3>
          <p class="mt-2 text-sm text-zinc-500 leading-relaxed">{{ r.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- OEM Products: own factory -->
  <section class="bg-zinc-50 py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="mb-2 flex flex-wrap items-center gap-3">
        <h2 class="text-2xl font-extrabold text-zinc-900 sm:text-3xl">{{ t('oem.own_title') }}</h2>
        <span class="inline-flex items-center rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600 ring-1 ring-inset ring-pink-200">REISTI Brand</span>
      </div>
      <p class="mb-8 text-zinc-500">{{ t('oem.own_sub') }}</p>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="p in ownProducts" :key="p.family"
          class="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div class="mb-3 h-1 w-8 rounded-full bg-pink-400" />
          <h3 class="font-bold text-zinc-900">{{ tField(p.name) }}</h3>
          <p class="mt-2 text-sm text-zinc-500 leading-relaxed">{{ tField(p.intro) }}</p>
          <RouterLink
            :to="`/products/${p.category}/${p.variants[0].slug}`"
            class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-pink-500 hover:text-pink-700 transition-colors">
            {{ lang === 'ja' ? '製品詳細' : 'Details' }} →
          </RouterLink>
        </div>
      </div>
      <p class="mt-6 text-xs text-zinc-400">※ {{ t('oem.own_note') }}</p>
    </div>
  </section>

  <!-- OEM Products: partner factory -->
  <section class="py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="mb-2">
        <h2 class="text-2xl font-extrabold text-zinc-900 sm:text-3xl">{{ t('oem.partner_title') }}</h2>
      </div>
      <p class="mb-8 text-zinc-500">{{ t('oem.partner_sub') }}</p>
      <div class="grid gap-4 sm:grid-cols-3">
        <div
          v-for="p in partnerProducts" :key="p.family"
          class="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p class="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">OEM Only</p>
          <h3 class="mt-1 font-bold text-zinc-900">{{ tField(p.name) }}</h3>
          <p class="mt-2 text-sm text-zinc-500 leading-relaxed">{{ tField(p.intro) }}</p>
          <RouterLink to="/contact" class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            {{ lang === 'ja' ? 'お問い合わせ' : 'Inquire' }} →
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="bg-zinc-50 py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-extrabold text-zinc-900 sm:text-4xl">{{ t('oem.process_title') }}</h2>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(step, i) in t('oem.steps')" :key="i"
          class="relative rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm">
          <div v-if="i < 3" class="absolute right-0 top-10 hidden h-px w-4 translate-x-full bg-zinc-200 lg:block" />
          <p class="text-3xl font-black text-zinc-100">{{ step.n }}</p>
          <h3 class="mt-2 font-bold text-zinc-900">{{ step.title }}</h3>
          <p class="mt-1.5 text-sm text-zinc-500 leading-relaxed">{{ step.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Capabilities -->
  <section class="py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="mx-auto max-w-2xl">
        <h2 class="mb-8 text-3xl font-extrabold text-zinc-900 sm:text-4xl text-center">{{ t('oem.specs_title') }}</h2>
        <div class="divide-y divide-zinc-100 rounded-2xl border border-zinc-200 overflow-hidden">
          <div class="grid grid-cols-2 gap-4 px-6 py-5 text-sm">
            <dt class="font-semibold text-zinc-500">{{ t('oem.spec_moq_label') }}</dt>
            <dd class="text-zinc-900">{{ t('oem.spec_moq') }}</dd>
          </div>
          <div class="grid grid-cols-2 gap-4 px-6 py-5 text-sm">
            <dt class="font-semibold text-zinc-500">{{ t('oem.spec_lead_label') }}</dt>
            <dd class="text-zinc-900">{{ t('oem.spec_lead') }}</dd>
          </div>
          <div class="grid grid-cols-2 gap-4 px-6 py-5 text-sm">
            <dt class="font-semibold text-zinc-500">{{ t('oem.spec_custom_label') }}</dt>
            <dd class="text-zinc-900">{{ t('oem.spec_custom') }}</dd>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-zinc-950 py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 text-center">
      <h2 class="text-3xl font-extrabold text-white sm:text-4xl">{{ t('oem.cta_title') }}</h2>
      <p class="mt-3 text-zinc-400">{{ t('oem.cta_sub') }}</p>
      <RouterLink to="/contact" class="mt-8 inline-flex btn-red text-base px-7 py-3">{{ t('oem.cta_btn') }}</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { useI18n, tField } from '../i18n/index.js'
import { FAMILIES, OEM_FAMILIES } from '../data/products.js'

const { t, lang } = useI18n()

const ownProducts     = FAMILIES
const partnerProducts = OEM_FAMILIES
</script>
