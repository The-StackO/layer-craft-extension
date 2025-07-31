<script setup lang="ts">
import type { ChangeType } from '@/services/history/types';

const emits = defineEmits<{
  (e: 'selectCommand', s: ChangeType): void;
  (e: 'close'): void;
}>();

const btnList: { text: string; type: ChangeType }[] = [
  { text: '文本替换', type: 'text_replace' },
  { text: '图片替换', type: 'image_replace' },
  { text: '删除元素', type: 'element_delete' },
];
</script>

<template>
  <div class="panel__guide">
    <div class="guide-layer">
      <div class="flex-shrink-0 px-1">
        <img src="@/assets/logo/logo.svg" class="w-4 h-4" alt="logo" />
      </div>
      <div class="flex-grow">
        <button v-for="btn in btnList" class="guide-btn" @click="emits('selectCommand', btn.type)">
          <span class="btn-text">{{ btn.text }}</span>
        </button>
      </div>
      <div class="flex-shrink-0">
        <button
          class="w-4 h-4 rounded-full px-1 hover:bg-gray-100 flex items-center justify-center"
          @click="emits('close')"
        >
          <span class="btn-text">×</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.guide-layer {
  @apply flex items-center gap-1 rounded-md backdrop-blur-sm p-1 px-2;
}

.guide-btn {
  @apply relative overflow-hidden rounded-md px-2.5 py-1.5 text-sm font-medium transition-all duration-300 ease-in-out cursor-pointer border-0 bg-transparent text-gray-700 dark:text-gray-200;
  @apply hover:bg-gray-100;
}

.guide-btn::before {
  @apply absolute bottom-0 left-1/2 h-0.5 w-0 bg-[var(--lc-inspector-main)] transition-all duration-300 ease-in-out;
  content: '';
  transform: translateX(-50%);
}

.guide-btn:hover::before {
  @apply w-4/5;
}

.btn-text {
  @apply relative z-10;
}
</style>
