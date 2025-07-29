<script setup lang="ts">
import { NEmpty, NList, NListItem } from 'naive-ui';
import HistoryItemComponent from './HistoryItem.vue';
import type { HistoryItem } from '@/services/history/types';

defineProps<{
  items: HistoryItem[];
}>();

const emits = defineEmits<{
  (e: 'undo', history: HistoryItem): void;
}>();
</script>

<template>
  <div class="flex flex-col flex-grow min-h-0">
    <div class="flex-grow">
      <div v-if="items.length > 0" class="bg-transparent">
        <div
          v-for="item in items"
          :key="item.id"
          class="!p-4 mb-3 rounded-xl bg-white shadow-sm transition-all duration-300 border border-gray-100 hover:border-gray-200"
        >
          <HistoryItemComponent :item="item" @undo="emits('undo', item)" />
        </div>
      </div>

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
