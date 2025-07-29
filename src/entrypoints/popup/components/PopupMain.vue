<script setup lang="ts">
import { NButton, NDivider } from 'naive-ui';
import HistoryList from '@/entrypoints/popup/components/HistoryList.vue';
import { sendMessage } from '@/services/messging';
import type { HistoryItem } from '@/services/history/types';
import { getProxiedHistoryService } from '@/services/history/proxy';
import { getActiveTab } from '@/utils/tabs';

// 操作历史的模拟数据
const historyItems = ref<HistoryItem[]>([]);

/**
 * 处理“选择元素”按钮的点击事件
 */
const handleSelectElement = async () => {
  const activeTab = await getActiveTab();
  if (activeTab) {
    await sendMessage('selection', { type: 'start' }, activeTab.id);
    window.close();
  }
};

const handleHistoryUndo = async (history: HistoryItem) => {
  const activeTab = await getActiveTab();
  if (activeTab) {
    const undoMessage = {
      type: history.type,
      xpath: history.xpath,
      before: history.before,
      after: history.after,
    };
    await sendMessage('makeUndo', undoMessage, activeTab.id);
    await getProxiedHistoryService().deleteHistoryItem(history.id);
  }
};

onMounted(async () => {
  const activeTab = await getActiveTab();
  if (activeTab && activeTab.url) {
    historyItems.value = await getProxiedHistoryService().getHistoryByUrl(activeTab.url);
  }
});
</script>

<template>
  <div class="w-full h-full">
    <div class="flex-shrink-0 mb-6">
      <p class="text-sm text-gray-400 mb-3 text-center">点击下方按钮，在页面上选择元素进行修改</p>
      <n-button type="primary" size="large" @click="handleSelectElement" block>
        选择页面元素
      </n-button>
    </div>

    <n-divider class="!my-1 flex-shrink-0" />

    <HistoryList :items="historyItems" @undo="handleHistoryUndo" />
  </div>
</template>

<style scoped></style>
