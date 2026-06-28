<template>
  <router-view />
</template>

<script setup>
import { useTheme } from './composables/useTheme'
const { initTheme } = useTheme()
initTheme()
</script>
