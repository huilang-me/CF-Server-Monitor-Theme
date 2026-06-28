<template>
  <div class="terminal-header">
    <div class="terminal-dots">
      <span class="terminal-dot red"></span>
      <span class="terminal-dot yellow"></span>
      <span class="terminal-dot green"></span>
    </div>
    <div class="terminal-title">{{ title }}</div>
    <div class="terminal-header-controls">
      <div class="lang-toggle">
        <button
          class="lang-btn"
          :class="{ active: currentLang === 'en' }"
          @click="setLang('en')"
          title="English"
        >EN</button>
        <button
          class="lang-btn"
          :class="{ active: currentLang === 'zh' }"
          @click="setLang('zh')"
          title="中文"
        >中</button>
      </div>
      <div class="theme-toggle-wrapper">
        <div class="theme-toggle">
          <button
            class="theme-btn"
            :class="{ active: currentTheme === 'auto' }"
            @click="setTheme('auto')"
            title="Auto - Follow System"
          >🌙☀</button>
          <button
            class="theme-btn"
            :class="{ active: currentTheme === 'dark' }"
            @click="setTheme('dark')"
            title="Dark Mode"
          >🌙</button>
          <button
            class="theme-btn"
            :class="{ active: currentTheme === 'light' }"
            @click="setTheme('light')"
            title="Light Mode"
          >☀</button>
        </div>
      </div>
      <button class="admin-link-header" @click="handleAdminClick">⚙ {{ t('admin') }}</button>
    </div>

    <div v-if="showAdminModal" class="modal-overlay active" @click.self="showAdminModal = false">
      <div class="modal-dialog" style="max-width: 420px;">
        <div class="modal-header">
          <div class="modal-title">{{ t('selectAdminPanel') }}</div>
          <button class="modal-close" @click="showAdminModal = false">✕</button>
        </div>
        <div class="modal-body">
          <div v-for="(base, index) in apiBases" :key="index" class="admin-choice-item" @click="goToAdmin(base)">
            <span class="admin-choice-index">{{ index + 1 }}</span>
            <span class="admin-choice-url">{{ base }}</span>
            <span class="admin-choice-arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { t, setLanguage, getLanguage } from '../utils/i18n'
import { useTheme } from '../composables/useTheme'
import { getApiBases, hasMultipleApiBases } from '../utils/config'

defineProps({
  title: {
    type: String,
    default: 'Server Monitor'
  }
})

const { currentTheme, setTheme } = useTheme()
const currentLang = ref('en')
const showAdminModal = ref(false)
const apiBases = ref([])

const setLang = (lang) => {
  setLanguage(lang)
  currentLang.value = lang
}

const handleLanguageChange = (e) => {
  currentLang.value = e.detail.lang
}

const handleAdminClick = () => {
  if (hasMultipleApiBases()) {
    apiBases.value = getApiBases()
    showAdminModal.value = true
  } else {
    const base = getApiBases()[0]
    if (base && base !== window.location.origin) {
      window.open(`${base}/#/admin`, '_blank')
    } else {
      window.location.hash = '#/admin'
    }
  }
}

const goToAdmin = (base) => {
  showAdminModal.value = false
  if (base === window.location.origin) {
    window.location.hash = '#/admin'
  } else {
    window.open(`${base}/#/admin`, '_blank')
  }
}

onMounted(() => {
  currentLang.value = getLanguage()
  window.addEventListener('languageChanged', handleLanguageChange)
})

onUnmounted(() => {
  window.removeEventListener('languageChanged', handleLanguageChange)
})
</script>

<style scoped>
.admin-link-header {
  background: none;
  border: 1px solid var(--border-color, rgba(255,255,255,0.15));
  color: var(--text-muted, #8b949e);
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}
.admin-link-header:hover {
  color: var(--text-primary, #e6edf3);
  border-color: var(--text-muted, #8b949e);
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.modal-overlay.active {
  opacity: 1;
  pointer-events: auto;
}
.modal-dialog {
  background: var(--bg-primary, #0d1117);
  border: 1px solid var(--border-color, rgba(255,255,255,0.1));
  border-radius: 12px;
  width: 90%;
  max-height: 80vh;
  overflow: auto;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.1));
}
.modal-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary, #e6edf3);
}
.modal-close {
  background: none;
  border: none;
  color: var(--text-muted, #8b949e);
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
}
.modal-body {
  padding: 12px 20px 20px;
}
.admin-choice-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  margin-bottom: 8px;
  border: 1px solid var(--border-color, rgba(255,255,255,0.1));
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.admin-choice-item:hover {
  border-color: var(--accent-blue, #58a6ff);
  background: rgba(88, 166, 255, 0.05);
}
.admin-choice-index {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent-blue, #58a6ff);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}
.admin-choice-url {
  flex: 1;
  font-size: 13px;
  color: var(--text-primary, #e6edf3);
  word-break: break-all;
}
.admin-choice-arrow {
  color: var(--text-muted, #8b949e);
  font-size: 14px;
}
</style>
