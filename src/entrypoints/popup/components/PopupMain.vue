<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { NButton, NDivider } from 'naive-ui';
import HistoryList from '@/entrypoints/popup/components/HistoryList.vue';
import { sendMessage } from '@/services/messging';
import type { HistoryItem } from '@/services/history/types';
import { getProxiedHistoryService } from '@/services/history/proxy';
import { getActiveTab } from '@/utils/tabs';

// 操作历史的模拟数据
const contentScriptInjected = ref(false);
const historyItems = ref<HistoryItem[]>([]);

/**
 * 处理"选择元素"按钮的点击事件
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
    historyItems.value = historyItems.value.filter(item => item.id !== history.id);
  }
};

onMounted(async () => {
  const activeTab = await getActiveTab();
  if (activeTab && activeTab.url) {
    contentScriptInjected.value = await sendMessage('ping', {}, activeTab.id);
    historyItems.value = await getProxiedHistoryService().getHistoryByUrl(activeTab.url);
  }
});
</script>

<template>
  <div class="w-full h-full">
    <div class="flex-shrink-0 mb-6 p-5 rounded-xl shadow-sm transition-all duration-300">
      <p class="text-sm text-gray-500 mb-5 text-center leading-relaxed">
        点击下方按钮，在页面上选择元素进行修改
      </p>
      <n-button
        type="primary"
        size="large"
        @click="handleSelectElement"
        block
        :disabled="!contentScriptInjected"
      >
        选择页面元素
      </n-button>
      <p class="text-xs text-amber-500 mt-3" v-if="!contentScriptInjected">
        无法操作当前页面的元素，可能是由于新标签页或浏览器特权页面等
      </p>
    </div>

    <n-divider class="!my-4 flex-shrink-0">
      <span class="text-xs text-gray-400 px-3 py-1 rounded-full">历史记录</span>
    </n-divider>

    <div class="flex-grow overflow-hidden">
      <HistoryList :items="historyItems" @undo="handleHistoryUndo" />
    </div>
  </div>
</template>

<style scoped></style>
