<script setup lang="ts">
import { NList, NListItem, NThing, NButton, NEmpty, NIcon, NTooltip } from 'naive-ui';
import { ArrowUndo } from '@vicons/ionicons5';

export interface HistoryItem {
  id: number;
  type: string;
  target: string;
}

defineProps<{
  items: HistoryItem[];
}>();

const emits = defineEmits<{
  (e: 'undo', id: number): void;
}>();

function handleUndoClick(id: number) {
  emits('undo', id);
}
</script>

<template>
  <div class="flex flex-col flex-grow min-h-0">
    <h2 class="text-base font-semibold mb-2 flex-shrink-0">操作历史</h2>
    <div class="flex-grow overflow-y-auto pr-1">
      <n-list v-if="items.length > 0" bordered class="bg-transparent">
        <n-list-item v-for="item in items" :key="item.id">
          <n-thing>
            <template #header>
              <div class="flex justify-between items-center">
                <span class="font-medium text-sm">{{ item.type }}</span>

                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-button text @click="handleUndoClick(item.id)" style="font-size: 16px">
                      <n-icon :component="ArrowUndo" />
                    </n-button>
                  </template>
                  <span>撤销 (ID: {{ item.id }})</span>
                </n-tooltip>
              </div>
            </template>
            <template #description>
              <span class="text-xs">目标: {{ item.target }}</span>
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

<style scoped></style>
