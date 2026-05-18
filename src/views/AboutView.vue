<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-sm font-semibold uppercase tracking-widest text-pink-500">About</p>
      <h1 class="mt-1 text-3xl font-extrabold text-zinc-900 sm:text-4xl">{{ t('about.title') }}</h1>
      <p class="mt-2 max-w-2xl text-zinc-500">{{ t('about.sub') }}</p>
    </div>

    <!-- Brand story -->
    <section class="mb-14">
      <p class="mb-4 text-sm font-semibold uppercase tracking-widest text-pink-500">{{ t('about.story_label') }}</p>
      <h2 class="mb-8 max-w-2xl text-2xl font-extrabold leading-snug text-zinc-900 sm:text-3xl">
        {{ t('about.story_title') }}
      </h2>
      <div class="grid gap-8 sm:grid-cols-3">
        <div v-for="(para, i) in storyParagraphs" :key="i" class="flex gap-4">
          <div class="mt-1.5 h-12 w-0.5 shrink-0 rounded-full bg-pink-300" />
          <p class="text-[15px] leading-relaxed text-zinc-600">{{ t(para) }}</p>
        </div>
      </div>
    </section>

    <!-- Company info table -->
    <section class="mb-12">
      <h2 class="mb-4 text-xl font-bold text-zinc-900">{{ t('about.company_title') }}</h2>
      <div class="overflow-hidden rounded-2xl border border-zinc-200">
        <dl class="divide-y divide-zinc-100 text-sm">
          <div v-for="(item, i) in companyRows" :key="i" class="grid grid-cols-12 gap-4 px-6 py-4">
            <dt class="col-span-12 font-medium text-zinc-400 sm:col-span-3">{{ t(item.label) }}</dt>
            <dd class="col-span-12 text-zinc-700 sm:col-span-9">{{ item.value }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Mission / Quality / Sustainability -->
    <section class="mb-12 grid gap-5 sm:grid-cols-3">
      <div v-for="(card, i) in cards" :key="i" class="rounded-2xl border border-zinc-200 p-6">
        <h3 class="font-bold text-zinc-900">{{ t(card.title) }}</h3>
        <p class="mt-2 text-sm text-zinc-500 leading-relaxed">{{ t(card.body) }}</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="rounded-2xl bg-zinc-950 px-8 py-10 text-center">
      <h2 class="text-2xl font-extrabold text-white">{{ t('about.cta_title') }}</h2>
      <p class="mt-2 text-zinc-400">{{ t('about.cta_sub') }}</p>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <RouterLink to="/contact" class="btn-red">{{ t('about.cta_btn') }}</RouterLink>
        <RouterLink to="/oem" class="inline-flex items-center justify-center rounded-xl border border-zinc-600 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white">
          {{ t('nav.oem') }} →
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from '../i18n/index.js'
const { t } = useI18n()

const storyParagraphs = ['about.story_p1', 'about.story_p2', 'about.story_p3']

const companyRows = [
  { label: 'about.label_name',     value: '瑞士釘株式会社 REISTI（レイスティ）' },
  { label: 'about.label_address',  value: '神奈川県川崎市中原区上新城 2-4-15' },
  { label: 'about.label_founded',  value: '2025年8月1日' },
  { label: 'about.label_ceo',      value: '代表取締役社長　陳 兪岑' },
  { label: 'about.label_capital',  value: '500万円' },
  { label: 'about.label_business', value: '金物・工具・各種電動先端工具の製造販売' },
]

const cards = [
  { title: 'about.mission_title', body: 'about.mission_body' },
  { title: 'about.quality_title', body: 'about.quality_body' },
  { title: 'about.sustain_title', body: 'about.sustain_body' },
]
</script>
