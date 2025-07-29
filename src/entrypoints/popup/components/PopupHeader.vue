<script setup lang="ts">
import ThemeSwitch from '@/entrypoints/popup/components/ThemeSwitch.vue';
</script>

<template>
  <div class="w-full h-full flex items-center justify-between">
    <div class="text-sm font-semibold">层舟网页修改器</div>
    <div class="flex-shrink-0 p-1 cursor-pointer transition-colors">
      <ThemeSwitch />
    </div>
  </div>
</template>

<style scoped></style>
