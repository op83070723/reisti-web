import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ja from './ja.js'
import en from './en.js'
import { localizePath } from './paths.js'

const messages = { ja, en }

export function useI18n() {
  const route = useRoute()
  // SSG は並行処理するため、言語は各 router instance の meta から導出する。
  const lang = computed(() => route.meta.locale === 'en' ? 'en' : 'ja')
  function t(key) {
    const keys = key.split('.')
    let val = messages[lang.value]
    for (const k of keys) val = val?.[k]
    return val ?? key
  }
  function tField(field) {
    if (typeof field === 'string') return field
    return field?.[lang.value] ?? field?.ja ?? ''
  }
  const localePath = (to, locale = lang.value) => localizePath(to, locale)
  return { t, tField, localePath, lang }
}
