<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { NButton, NDivider } from 'naive-ui';
import HistoryList from '@/entrypoints/popup/components/HistoryList.vue';
import { sendMessage } from '@/services/messging';
import type { HistoryItem } from '@/services/history/types';
import { getProxiedHistoryService } from '@/services/history/proxy';
import { getActiveTab } from '@/utils/tabs';
import { getCurrentLocationByUrl } from '@/utils/url';

// 操作历史的模拟数据
const contentScriptInjected = ref(false);
const historyItems = ref<HistoryItem[]>([]);

/**
 * 处理"选择元素"按钮的点击事件
 */
const handleSelectElement = async () => {
  trackEvent('click_select_element_button', {
    source: 'popup',
  });
  const activeTab = await getActiveTab();
  if (activeTab) {
    await sendMessage('selection', { type: 'start' }, activeTab.id);
    window.close();
  }
};

const handleHistoryUndo = async (history: HistoryItem) => {
  trackEvent('click_history_undo_button', {
    source: 'popup',
    historyId: history.id,
  });
  const activeTab = await getActiveTab();
  if (activeTab) {
    // 将代理对象转换为普通对象，避免 Firefox 中的克隆错误
    const plainHistory = JSON.parse(JSON.stringify(history));
    await sendMessage('makeUndo', plainHistory, activeTab.id);
    await getProxiedHistoryService().deleteHistoryItem(history.id);
    historyItems.value = historyItems.value.filter(item => item.id !== history.id);
  }
};

onMounted(async () => {
  const activeTab = await getActiveTab();
  if (activeTab && activeTab.url) {
    contentScriptInjected.value = await sendMessage('ping', {}, activeTab.id);
    historyItems.value = await getProxiedHistoryService().getHistoryByUrl(
      getCurrentLocationByUrl(activeTab.url)
    );
  }
});
</script>

<template>
  <div class="w-full h-full">
    <div class="flex-shrink-0 mb-6 p-5 rounded-xl shadow-sm transition-all duration-300">
      <p class="text-sm text-gray-500 mb-5 text-center leading-relaxed">
        {{ i18n.t('popup.main.elementSelectTips') }}
      </p>
      <n-button
        type="primary"
        size="large"
        @click="handleSelectElement"
        block
        :disabled="!contentScriptInjected"
      >
        {{ i18n.t('popup.main.elementSelectButton') }}
      </n-button>
      <p class="text-xs text-amber-500 mt-3" v-if="!contentScriptInjected">
        {{ i18n.t('popup.main.unableSelectElement') }}
      </p>
    </div>

    <n-divider class="!my-4 flex-shrink-0">
      <span class="text-xs text-gray-400 px-3 py-1 rounded-full">
        {{ i18n.t('popup.main.history.divider') }}
      </span>
    </n-divider>

    <div class="flex-grow overflow-hidden">
      <HistoryList :items="historyItems" @undo="handleHistoryUndo" />
    </div>
  </div>
</template>

<style scoped></style>
