<script setup lang="ts">
import { version } from '~~/package.json';
</script>

<template>
  <div
    class="w-full h-full py-2 px-4 flex items-center justify-center bg-white/50 text-xs text-gray-500"
  >
    <div>{{ i18n.t('popup.footer.version') }} v{{ version }}</div>
  </div>
</template>

<style scoped></style>
