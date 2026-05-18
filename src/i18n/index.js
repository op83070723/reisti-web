import { ref } from 'vue'
import ja from './ja.js'
import en from './en.js'

const messages = { ja, en }
export const lang = ref(localStorage.getItem('lang') || 'ja')

export function setLang(l) {
  lang.value = l
  localStorage.setItem('lang', l)
  document.documentElement.lang = l
}

export function useI18n() {
  function t(key) {
    const keys = key.split('.')
    let val = messages[lang.value]
    for (const k of keys) val = val?.[k]
    return val ?? key
  }
  return { t, lang, setLang }
}

// For product data fields shaped as { ja, en }
export function tField(field) {
  if (typeof field === 'string') return field
  return field?.[lang.value] ?? field?.ja ?? ''
}
