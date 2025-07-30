<script setup lang="ts">
const emits = defineEmits<{
  (e: 'panelSelect', s: 'text_replace' | 'element_delete' | 'image_replace'): void;
  (e: 'close'): void;
}>();
</script>

<template>
  <div class="panel__guide">
    <div class="guide-layer">
      <button class="guide-btn" @click="emits('panelSelect', 'text_replace')">
        <span class="btn-text">文本替换</span>
      </button>
      <button class="guide-btn" @click="emits('panelSelect', 'element_delete')">
        <span class="btn-text">删除元素</span>
      </button>
      <button class="guide-btn close-btn" @click="emits('close')">
        <span class="btn-text">×</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.panel__guide {
  @apply p-1;
}

.guide-layer {
  @apply flex items-center gap-1 rounded-md backdrop-blur-sm bg-white/80  p-1;
}

.guide-btn {
  @apply relative overflow-hidden rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-300 ease-in-out cursor-pointer border-0 bg-transparent text-gray-700 dark:text-gray-200;
  @apply hover:bg-gray-100 dark:hover:bg-gray-700;
}

.guide-btn::before {
  @apply absolute bottom-0 left-1/2 h-0.5 w-0 bg-[var(--lc-inspector-main)] transition-all duration-300 ease-in-out;
  content: '';
  transform: translateX(-50%);
}

.guide-btn:hover::before {
  @apply w-4/5;
}

.close-btn {
  @apply px-2;
}

.btn-text {
  @apply relative z-10;
}
</style>
