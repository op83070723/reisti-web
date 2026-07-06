import { ref } from 'vue'
import ja from './ja.js'
import en from './en.js'

const messages = { ja, en }

// SSG 建置時（Node 環境）固定為 ja；瀏覽器端由 App.vue onMounted 呼叫 initLang() 讀取使用者偏好
export const lang = ref('ja')

export function initLang() {
  if (typeof localStorage === 'undefined') return
  const saved = localStorage.getItem('lang')
  if (saved && saved !== lang.value) lang.value = saved
}

export function setLang(l) {
  lang.value = l
  if (typeof localStorage !== 'undefined') localStorage.setItem('lang', l)
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
