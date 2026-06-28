import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'
import './styles/light.css'
import { initConfig, getTitle, getBackgroundImage } from './utils/config'
import { VERSION } from './utils/api'
import { http } from './utils/http'

async function fetchConfig() {
  try {
    const results = await http.getAll('/api/config', { includeAuth: false, includeTurnstile: true })
    if (!results || results.length === 0) {
      return { version: '' }
    }
    for (const { data, error } of results) {
      if (error || !data) continue
      if (data.version) {
        VERSION.value = data.version
        return { version: data.version }
      }
    }
  } catch (e) {
    console.error('Failed to fetch config:', e)
  }
  return { version: '' }
}

async function initTheme() {
  await initConfig()

  const appTitle = getTitle()
  if (appTitle) {
    document.title = appTitle
  }

  const bgImage = getBackgroundImage()
  if (bgImage) {
    document.body.style.backgroundImage = `url(${bgImage})`
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center'
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundAttachment = 'fixed'
  }

  await fetchConfig()

  const app = createApp(App)
  app.use(router)
  app.mount('#app')
}

initTheme()
