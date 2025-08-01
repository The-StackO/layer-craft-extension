<script setup lang="ts">
import { ArrowForward, ArrowUndo } from '@vicons/ionicons5';
import { formatTimeAgo } from '@vueuse/core';
import { NButton, NIcon, NTag, NImage, NTooltip } from 'naive-ui';
import type { HistoryItem } from '@/services/history/types';

defineProps<{
  item: HistoryItem;
}>();

const emits = defineEmits<{
  (e: 'undo', history: HistoryItem): void;
}>();

function handleUndoClick(history: HistoryItem) {
  emits('undo', history);
}

/**
 * 根据操作类型返回对应的显示文本和标签类型。
 */
function getChangeTypeInfo(type: HistoryItem['type']) {
  switch (type) {
    case 'text_replace':
      return {
        text: i18n.t('popup.main.history.changeType.textReplace'),
        tagType: 'success' as const,
      };
    case 'element_delete':
      return {
        text: i18n.t('popup.main.history.changeType.elementDelete'),
        tagType: 'info' as const,
      };
    case 'image_replace':
      return {
        text: i18n.t('popup.main.history.changeType.imageReplace'),
        tagType: 'warning' as const,
      };
    default:
      return {
        text: i18n.t('popup.main.history.changeType.unknown'),
        tagType: 'default' as const,
      };
  }
}
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-3">
      <div class="flex-shrink-0 flex justify-between items-center">
        <n-tag :type="getChangeTypeInfo(item.type).tagType" size="small" round class="font-medium">
          {{ getChangeTypeInfo(item.type).text }}
        </n-tag>
        <span class="text-xs text-gray-500 font-medium ml-2">
          {{ formatTimeAgo(item.timestamp) }}
        </span>
      </div>

      <div class="flex items-center">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button text @click="handleUndoClick(item)" class="p-1.5 transition-all duration-200">
              <template #icon>
                <n-icon :component="ArrowUndo" :size="18" />
              </template>
            </n-button>
          </template>
          <span>{{ i18n.t('popup.main.history.undoButton') }}</span>
        </n-tooltip>
      </div>
    </div>

    <div class="text-xs flex items-start">
      <div class="flex-1 min-w-0">
        <div class="font-medium text-gray-500 text-xs mb-2 flex items-center">
          {{ i18n.t('popup.main.history.changeBefore') }}
        </div>
        <span
          v-if="item.type === 'text_replace' || item.type === 'element_delete'"
          class="font-mono bg-red-50 text-red-700 p-3 rounded-lg truncate block text-xs leading-relaxed border border-red-100"
        >
          {{ item.before }}
        </span>
        <div v-else-if="item.type === 'image_replace'">
          <n-image width="100" :src="item.before" />
        </div>
      </div>
      <n-icon
        :component="ArrowForward"
        class="mx-3 flex-shrink-0 self-center text-gray-400"
        :size="16"
      />
      <div class="flex-1 min-w-0">
        <div class="font-medium text-gray-500 text-xs mb-2 flex items-center">
          {{ i18n.t('popup.main.history.changeAfter') }}
        </div>
        <span
          v-if="item.type === 'text_replace' || item.type === 'element_delete'"
          class="font-mono bg-green-50 text-green-700 p-3 rounded-lg truncate block text-xs leading-relaxed border border-green-100"
        >
          {{ item.after }}
        </span>
        <div v-else-if="item.type === 'image_replace'">
          <n-image width="100" :src="item.after" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
