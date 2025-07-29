<script setup lang="ts">
import {
  NList,
  NListItem,
  NThing,
  NButton,
  NButtonGroup,
  NEmpty,
  NIcon,
  NTooltip,
  NTag,
} from 'naive-ui';
import { ArrowUndo, ArrowForward, CodeSlashOutline } from '@vicons/ionicons5';
import type { HistoryItem } from '@/services/history/types';
import { formatTimeAgo } from '@vueuse/core';

defineProps<{
  items: HistoryItem[];
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
      return { text: '文本替换', tagType: 'success' as const };
    case 'style_modify':
      return { text: '样式修改', tagType: 'info' as const };
    default:
      return { text: '未知操作', tagType: 'default' as const };
  }
}
</script>

<template>
  <div class="flex flex-col flex-grow min-h-0">
    <div
      class="flex-grow overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thumb-rounded-full hover:scrollbar-thumb-gray-400"
    >
      <n-list v-if="items.length > 0" class="bg-transparent -ml-3 -mr-1">
        <n-list-item
          v-for="item in items"
          :key="item.id"
          class="!p-4 mb-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200"
        >
          <n-thing class="w-full">
            <template #header>
              <div class="flex justify-between items-center">
                <n-tag
                  :type="getChangeTypeInfo(item.type).tagType"
                  size="small"
                  round
                  class="font-medium"
                >
                  {{ getChangeTypeInfo(item.type).text }}
                </n-tag>
                <span class="text-xs text-gray-500 font-medium ml-2">
                  {{ formatTimeAgo(item.timestamp) }}
                </span>
              </div>
            </template>
            <template #header-extra>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button
                    text
                    @click="handleUndoClick(item)"
                    class="p-1.5 transition-all duration-200"
                  >
                    <template #icon>
                      <n-icon :component="ArrowUndo" :size="18" />
                    </template>
                  </n-button>
                </template>
                <span>撤销</span>
              </n-tooltip>
            </template>

            <div class="text-xs flex items-start">
              <div class="flex-1 min-w-0">
                <div
                  class="font-medium text-gray-500 dark:text-gray-400 text-xs mb-2 flex items-center"
                >
                  修改前
                </div>
                <span
                  class="font-mono bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-lg truncate block text-xs leading-relaxed border border-red-100 dark:border-red-900/30"
                >
                  {{ item.before }}
                </span>
              </div>
              <n-icon
                :component="ArrowForward"
                class="mx-3 flex-shrink-0 self-center text-gray-400"
                :size="16"
              />
              <div class="flex-1 min-w-0">
                <div class="font-medium text-gray-500 text-xs mb-2 flex items-center">修改后</div>
                <span
                  class="font-mono bg-green-50 text-green-700 p-3 rounded-lg truncate block text-xs leading-relaxed border border-green-100"
                >
                  {{ item.after }}
                </span>
              </div>
            </div>
          </n-thing>
        </n-list-item>
      </n-list>

      <n-empty
        v-else
        description="暂无操作历史"
        class="h-full flex justify-center items-center flex-col py-10"
      >
        <template #extra>
          <span class="text-gray-500 text-xs mt-3">您的所有修改都将记录在此</span>
        </template>
      </n-empty>
    </div>
  </div>
</template>

<style scoped></style>
