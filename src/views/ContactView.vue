<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-sm font-semibold uppercase tracking-widest text-pink-600">Contact</p>
      <h1 class="mt-1 text-3xl font-extrabold text-zinc-900 sm:text-4xl">{{ t('contact.title') }}</h1>
      <p class="mt-3 text-zinc-500">{{ t('contact.sub') }}</p>
    </div>

    <!-- Form -->
    <!-- maxlength は api/contact.js の LIMITS と一致させること -->
    <form class="space-y-5" @submit.prevent="submit" @focusin="onFormStart">

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label class="label" for="contact-company">{{ t('contact.label_company') }} *</label>
          <input id="contact-company" v-model="form.company" class="input mt-1" type="text" autocomplete="organization" required maxlength="100" :placeholder="t('contact.ph_company')" />
        </div>
        <div>
          <label class="label" for="contact-name">{{ t('contact.label_name') }} *</label>
          <input id="contact-name" v-model="form.name" class="input mt-1" type="text" autocomplete="name" required maxlength="100" :placeholder="t('contact.ph_name')" />
        </div>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label class="label" for="contact-email">{{ t('contact.label_email') }} *</label>
          <input id="contact-email" v-model="form.email" class="input mt-1" type="email" autocomplete="email" required maxlength="254" :placeholder="t('contact.ph_email')" />
        </div>
        <div>
          <label class="label" for="contact-phone">{{ t('contact.label_phone') }}</label>
          <input id="contact-phone" v-model="form.phone" class="input mt-1" type="tel" autocomplete="tel" maxlength="50" :placeholder="t('contact.ph_phone')" />
        </div>
      </div>

      <div>
        <label class="label" for="contact-type">{{ t('contact.label_type') }}</label>
        <select id="contact-type" v-model="form.type" class="input mt-1">
          <option value="">{{ t('contact.select_type') }}</option>
          <!-- value は言語非依存のコード（API の allowlist・URL プリフィルと共通）。表示だけ翻訳する -->
          <option v-for="(code, i) in TYPE_CODES" :key="code" :value="code">{{ t('contact.types')[i] }}</option>
        </select>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label class="label" for="contact-product">{{ t('contact.label_product') }}</label>
          <input id="contact-product" v-model="form.product" class="input mt-1" type="text" maxlength="100" :placeholder="t('contact.ph_product')" />
        </div>
        <div>
          <label class="label" for="contact-qty">{{ t('contact.label_qty') }}</label>
          <input id="contact-qty" v-model="form.qty" class="input mt-1" type="text" maxlength="50" :placeholder="t('contact.ph_qty')" />
        </div>
      </div>

      <div>
        <label class="label" for="contact-message">{{ t('contact.label_message') }} *</label>
        <textarea id="contact-message" v-model="form.message" class="input mt-1" rows="5" required maxlength="5000" :placeholder="t('contact.ph_message')" />
      </div>

      <!-- Honeypot -->
      <input v-model="hp" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px" autocomplete="off" />

      <p v-if="errorMsg" role="alert"  class="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{{ errorMsg }}</p>
      <p v-if="done"     role="status" class="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">{{ t('contact.success') }}</p>

      <button class="btn-primary w-full py-3 text-base" :disabled="loading">
        {{ loading ? t('contact.submitting') : t('contact.submit') }}
      </button>

      <p class="text-xs text-zinc-500">
        {{ t('contact.privacy_pre') }}<RouterLink to="/privacy" class="underline hover:text-zinc-700">{{ t('contact.privacy_link') }}</RouterLink>{{ t('contact.privacy_post') }}
      </p>
    </form>

    <!-- Alternative contact methods -->
    <div v-reveal class="mt-12 border-t border-zinc-100 pt-10">
      <p class="text-sm font-semibold text-zinc-500 uppercase tracking-widest">{{ t('contact.also_label') }}</p>
      <div class="mt-4 grid gap-4 sm:grid-cols-3">
        <a href="tel:05088948687" class="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-4 text-sm transition-colors hover:border-zinc-400">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-lg">☎</span>
          <div>
            <p class="font-semibold text-zinc-700">{{ t('contact.phone_label') }}</p>
            <p class="text-zinc-500 text-xs">050-8894-8687</p>
          </div>
        </a>
        <a href="mailto:chenytbiz@reisti.org" class="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-4 text-sm transition-colors hover:border-zinc-400">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-lg">✉</span>
          <div>
            <p class="font-semibold text-zinc-700">{{ t('contact.email_label') }}</p>
            <p class="text-zinc-500 text-xs">chenytbiz@reisti.org</p>
          </div>
        </a>
        <a href="https://lin.ee/yLb33tW" target="_blank" rel="noopener" class="flex items-center gap-3 rounded-xl border border-zinc-200 px-4 py-4 text-sm transition-colors hover:border-zinc-400">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#06C755] text-lg text-white font-bold">L</span>
          <div class="min-w-0 flex-1">
            <p class="font-semibold text-zinc-700">{{ t('contact.line_label') }}</p>
            <p class="text-zinc-500 text-xs"><span class="whitespace-nowrap">@503wuawu</span> <span class="whitespace-nowrap">・{{ t('contact.line_add') }}</span></p>
          </div>
          <img src="/line-qr.png" width="480" height="480" :alt="t('contact.line_add')" loading="lazy" decoding="async" class="hidden h-16 w-16 shrink-0 rounded sm:block" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../i18n/index.js'
import { track } from '../utils/track.js'

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
   type は言語非依存のコードのまま保持・送信し、i18n の contact.types と index で対応する
   （翻訳文字列を value にすると言語切替で選択が失われるため）。
   SSG の静的 HTML はクエリなしで焼かれるため、onMounted で反映する（hydration 不一致回避） */
const TYPE_CODES = ['oem', 'bulk', 'sample', 'catalog', 'other']
onMounted(() => {
  const q = route.query
  if (typeof q.product === 'string' && q.product) form.product = q.product
  if (typeof q.qty === 'string' && q.qty)         form.qty     = q.qty
  if (TYPE_CODES.includes(q.type)) form.type = q.type
})

/* 変換イベント（個人情報は送らない：form_start は無属性、form_success は種別コードのみ） */
let formStarted = false
function onFormStart() {
  if (formStarted) return
  formStarted = true
  track('form_start')
}

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
    track('form_success', { type: form.type || 'none' })
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
