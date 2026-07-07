<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-sm font-semibold uppercase tracking-widest text-pink-500">Contact</p>
      <h1 class="mt-1 text-3xl font-extrabold text-zinc-900 sm:text-4xl">{{ t('contact.title') }}</h1>
      <p class="mt-3 text-zinc-500">{{ t('contact.sub') }}</p>
    </div>

    <!-- Form -->
    <form class="space-y-5" @submit.prevent="submit" novalidate>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label class="label">{{ t('contact.label_company') }} *</label>
          <input v-model="form.company" class="input mt-1" type="text" :placeholder="t('contact.ph_company')" />
        </div>
        <div>
          <label class="label">{{ t('contact.label_name') }} *</label>
          <input v-model="form.name" class="input mt-1" type="text" :placeholder="t('contact.ph_name')" />
        </div>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label class="label">{{ t('contact.label_email') }} *</label>
          <input v-model="form.email" class="input mt-1" type="text" :placeholder="t('contact.ph_email')" />
        </div>
        <div>
          <label class="label">{{ t('contact.label_phone') }}</label>
          <input v-model="form.phone" class="input mt-1" type="text" :placeholder="t('contact.ph_phone')" />
        </div>
      </div>

      <div>
        <label class="label">{{ t('contact.label_type') }}</label>
        <select v-model="form.type" class="input mt-1">
          <option value="">{{ t('contact.select_type') }}</option>
          <option v-for="tp in t('contact.types')" :key="tp" :value="tp">{{ tp }}</option>
        </select>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label class="label">{{ t('contact.label_product') }}</label>
          <input v-model="form.product" class="input mt-1" type="text" :placeholder="t('contact.ph_product')" />
        </div>
        <div>
          <label class="label">{{ t('contact.label_qty') }}</label>
          <input v-model="form.qty" class="input mt-1" type="text" :placeholder="t('contact.ph_qty')" />
        </div>
      </div>

      <div>
        <label class="label">{{ t('contact.label_message') }} *</label>
        <textarea v-model="form.message" class="input mt-1" rows="5" :placeholder="t('contact.ph_message')" />
      </div>

      <!-- Honeypot -->
      <input v-model="hp" tabindex="-1" style="position:absolute;left:-9999px" autocomplete="off" />

      <p v-if="errorMsg" class="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{{ errorMsg }}</p>
      <p v-if="done"     class="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">{{ t('contact.success') }}</p>

      <button class="btn-primary w-full py-3 text-base" :disabled="loading">
        {{ loading ? t('contact.submitting') : t('contact.submit') }}
      </button>
    </form>

    <!-- Alternative contact methods -->
    <div class="mt-12 border-t border-zinc-100 pt-10">
      <p class="text-sm font-semibold text-zinc-400 uppercase tracking-widest">{{ t('contact.also_label') }}</p>
      <div class="mt-4 grid gap-4 sm:grid-cols-3">
        <a href="tel:05088948687" class="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-4 text-sm transition-colors hover:border-zinc-400">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-lg">☎</span>
          <div>
            <p class="font-semibold text-zinc-700">{{ t('contact.phone_label') }}</p>
            <p class="text-zinc-400 text-xs">050-8894-8687</p>
          </div>
        </a>
        <a href="mailto:chenytbiz@reisti.org" class="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-4 text-sm transition-colors hover:border-zinc-400">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-lg">✉</span>
          <div>
            <p class="font-semibold text-zinc-700">{{ t('contact.email_label') }}</p>
            <p class="text-zinc-400 text-xs">chenytbiz@reisti.org</p>
          </div>
        </a>
        <a href="https://lin.ee/yLb33tW" target="_blank" rel="noopener" class="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-4 text-sm transition-colors hover:border-zinc-400">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#06C755] text-lg text-white font-bold">L</span>
          <div class="min-w-0 flex-1">
            <p class="font-semibold text-zinc-700">{{ t('contact.line_label') }}</p>
            <p class="text-zinc-400 text-xs"><span class="whitespace-nowrap">@503wuawu</span> <span class="whitespace-nowrap">・{{ t('contact.line_add') }}</span></p>
          </div>
          <img src="/line-qr.png" :alt="t('contact.line_add')" class="hidden h-16 w-16 shrink-0 rounded sm:block" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../i18n/index.js'

const { t } = useI18n()
const route    = useRoute()
const loading  = ref(false)
const done     = ref(false)
const errorMsg = ref('')
const hp       = ref('')

const form = reactive({
  company: '', name: '', email: '', phone: '',
  type: '', product: '', qty: '', message: '',
})

/* クエリからの事前入力（例：製品ページの「お見積もり」→ /contact?type=bulk&product=…）。
   ?type= は言語非依存のキーで受け、表示中の言語の選択肢へマッピングする。
   SSG の静的 HTML はクエリなしで焼かれるため、onMounted で反映する（hydration 不一致回避） */
const TYPE_INDEX = { oem: 0, bulk: 1, sample: 2, catalog: 3, other: 4 }
onMounted(() => {
  const q = route.query
  if (typeof q.product === 'string' && q.product) form.product = q.product
  if (typeof q.qty === 'string' && q.qty)         form.qty     = q.qty
  const idx = TYPE_INDEX[q.type]
  if (idx != null) form.type = t('contact.types')[idx] ?? ''
})

async function submit() {
  done.value     = false
  errorMsg.value = ''

  if (!form.company || !form.name || !form.email || !form.message) {
    errorMsg.value = t('contact.err_required')
    return
  }

  loading.value = true
  try {
    const res  = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, hp: hp.value }),
    })
    const data = await res.json()
    if (!res.ok || !data.ok) throw new Error(data.error || t('contact.err_send'))
    done.value = true
    Object.keys(form).forEach(k => form[k] = '')
  } catch (e) {
    errorMsg.value = e.message || t('contact.err_send')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.label { @apply block text-sm font-medium text-zinc-700; }
</style>
