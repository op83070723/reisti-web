import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/main.css'
import { lang } from './i18n/index.js'

document.documentElement.lang = lang.value
createApp(App).use(router).mount('#app')
