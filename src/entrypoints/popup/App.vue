<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  NButton,
  NDivider,
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
} from 'naive-ui';
import { darkTheme } from 'naive-ui';
import type { GlobalTheme } from 'naive-ui';
import HistoryList from './components/HistoryList.vue';
import ThemeSwitch from './components/ThemeSwitch.vue';
import { sendMessage } from '@/services/messging';
import { getActiveTab } from '@/utils/tabs';
import { getProxiedHistoryService } from '@/services/history/proxy';
import type { HistoryItem } from '@/services/history/types';

const theme = ref<GlobalTheme | null>(null);
onMounted(async () => {
  storage.watch<string>('local:theme', newTheme => {
    theme.value = newTheme === 'dark' ? darkTheme : null;
  });

  const activeTab = await getActiveTab();
  if (activeTab && activeTab.url) {
    historyItems.value = await getProxiedHistoryService().getHistoryByUrl(activeTab.url);
  }
});

// 操作历史的模拟数据
const historyItems = ref<HistoryItem[]>([]);

/**
 * 处理“选择元素”按钮的点击事件
 */
const handleSelectElement = async () => {
  // 发送消息给当前标签页的 content script
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
</script>

<template>
  <n-config-provider :theme="theme">
    <n-layout class="w-[380px] h-[464px] flex flex-col font-sans">
      <n-layout-header
        class="flex-shrink-0 flex items-center justify-between py-2 px-4 border-b border-gray-700/60"
      >
        <div class="text-sm font-semibold">层舟网页修改器</div>
        <div class="flex-shrink-0 p-1 cursor-pointer transition-colors">
          <ThemeSwitch />
        </div>
      </n-layout-header>

      <n-layout-content
        class="flex-grow p-4 flex flex-col gap-y-4 overflow-y-auto"
        :native-scrollbar="false"
      >
        <div class="flex-shrink-0 mb-6">
          <p class="text-sm text-gray-400 mb-3 text-center">
            点击下方按钮，在页面上选择元素进行修改
          </p>
          <n-button type="primary" size="large" @click="handleSelectElement" block>
            选择页面元素
          </n-button>
        </div>

        <n-divider class="!my-1 flex-shrink-0" />

        <HistoryList :items="historyItems" @undo="handleHistoryUndo" />
      </n-layout-content>

      <n-layout-footer class="flex-shrink-0 py-2 px-4 text-center border-t border-gray-700/60">
        <p class="text-xs text-gray-500">版本 v0.1.0</p>
      </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<style scoped></style>
