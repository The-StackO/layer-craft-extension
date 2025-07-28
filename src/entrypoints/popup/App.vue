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
import HistoryList, { type HistoryItem } from './components/HistoryList.vue';
import ThemeSwitch from './components/ThemeSwitch.vue';

const theme = ref<GlobalTheme | null>(null);
onMounted(async () => {
  await storage.watch<string>('local:theme', newTheme => {
    theme.value = newTheme === 'dark' ? darkTheme : null;
  });
});

// 操作历史的模拟数据
const historyItems = ref<HistoryItem[]>([
  { id: 3, type: '文本替换', target: '页面主标题' },
  { id: 2, type: '样式修改', target: 'ID 为 "buy-button" 的按钮' },
  { id: 1, type: '删除元素', target: '类名为 "ad-banner" 的图片' },
]);

/**
 * 处理“选择元素”按钮的点击事件
 */
function handleSelectElement() {
  console.log('开始选择元素...');
  // TODO: 实现与 content-script 的通信
}

/**
 * 处理来自 HistoryList 的撤销事件
 * @param {number} id - 要撤销的操作ID
 */
function handleUndo(id: number) {
  console.log(`请求撤销操作 ID: ${id}`);
  // 演示：从列表中移除该项
  historyItems.value = historyItems.value.filter(item => item.id !== id);
  // TODO: 在此实现真正的撤销逻辑
}
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

      <n-layout-content class="flex-grow p-4 flex flex-col gap-y-4 overflow-y-auto">
        <div class="flex-shrink-0 mb-6">
          <p class="text-sm text-gray-400 mb-3 text-center">
            点击下方按钮，在页面上选择元素进行修改
          </p>
          <n-button type="primary" size="large" @click="handleSelectElement" block>
            选择页面元素
          </n-button>
        </div>

        <n-divider class="!my-1 flex-shrink-0" />

        <HistoryList :items="historyItems" @undo="handleUndo" />
      </n-layout-content>

      <n-layout-footer class="flex-shrink-0 py-2 px-4 text-center border-t border-gray-700/60">
        <p class="text-xs text-gray-500">版本 v0.1.0</p>
      </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<style scoped></style>
