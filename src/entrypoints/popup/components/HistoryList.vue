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
import { ArrowUndo, TrashBinOutline, ArrowForward, CodeSlashOutline } from '@vicons/ionicons5';
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
    <h2 class="text-base font-semibold mb-2 flex-shrink-0">操作历史</h2>
    <div class="flex-grow overflow-y-auto pr-1">
      <n-list v-if="items.length > 0" class="bg-transparent -ml-3 -mr-1">
        <n-list-item v-for="item in items" :key="item.id" class="!p-2">
          <n-thing class="w-full">
            <template #header>
              <div class="flex justify-between items-center">
                <n-tag :type="getChangeTypeInfo(item.type).tagType" size="small" round>
                  {{ getChangeTypeInfo(item.type).text }}
                </n-tag>
                <span class="text-xs text-gray-400 ml-2">{{ formatTimeAgo(item.timestamp) }}</span>
              </div>
            </template>

            <!-- Main content for before/after changes -->
            <div class="mt-2 text-xs flex items-center">
              <span
                class="font-mono bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-1 rounded-sm truncate"
              >
                {{ item.before }}
              </span>
              <n-icon :component="ArrowForward" class="mx-2" :size="12" />
              <span
                class="font-mono bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-1 rounded-sm truncate"
              >
                {{ item.after }}
              </span>
            </div>

            <template #footer>
              <div class="flex justify-between items-center mt-2">
                <n-tooltip trigger="hover" :delay="500">
                  <template #trigger>
                    <div class="flex items-center text-xs text-gray-500 cursor-pointer">
                      <n-icon :component="CodeSlashOutline" class="mr-1" />
                      <span class="truncate max-w-[150px]">{{ item.xpath }}</span>
                    </div>
                  </template>
                  <span>{{ item.xpath }}</span>
                </n-tooltip>

                <n-button-group size="tiny">
                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <n-button text @click="handleUndoClick(item)" class="p-1">
                        <template #icon>
                          <n-icon :component="ArrowUndo" :size="16" />
                        </template>
                      </n-button>
                    </template>
                    <span>撤销</span>
                  </n-tooltip>
                </n-button-group>
              </div>
            </template>
          </n-thing>
        </n-list-item>
      </n-list>

      <n-empty
        v-else
        description="暂无操作历史"
        class="h-full flex justify-center items-center flex-col"
      >
        <template #extra>
          <span class="text-gray-500 text-xs">您的所有修改都将记录在此</span>
        </template>
      </n-empty>
    </div>
  </div>
</template>

<style scoped>
/* Using Tailwind utilities, so scoped styles are likely not needed */
/* Negative margins on the list are to counteract padding from parent containers if any, giving a fuller look */
</style>
