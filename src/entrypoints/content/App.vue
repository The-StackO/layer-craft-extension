<script setup lang="ts">
import CursorInspector from './components/CursorInspector.vue';
import LayerPanel from './components/LayerPanel.vue';
import { onMessage } from '@/services/messging';
import { getElementByXpath } from '@/utils/dom';
import { getCurrentLocation } from '@/utils/url';
import { getProxiedHistoryService } from '@/services/history/proxy';

const isInspecting = ref(false);
const selectedElement = ref<HTMLElement | null>(null);

const handleInspectorSelect = (target: HTMLElement) => {
  if (target) {
    selectedElement.value = target;
  }
};

const handlePanelClose = () => {
  isInspecting.value = false;
  selectedElement.value = null;
};

onMounted(() => {
  onMessage('ping', message => {
    return true;
  });

  getProxiedHistoryService()
    .getHistoryByUrl(getCurrentLocation())
    .then(historyItems => {
      historyItems.forEach(history => {
        if (history.type === 'text_replace') {
          const element = getElementByXpath(history.xpath);
          if (element) {
            element.textContent = history.after;
          }
        }
      });
    });

  // 监听选择元素
  onMessage('selection', message => {
    isInspecting.value = message.data.type === 'start';
    return true;
  });

  // 监听撤销改动
  onMessage('makeUndo', message => {
    const { type, xpath, before, after } = message.data;
    if (type === 'text_replace') {
      const element = getElementByXpath(xpath);
      if (element) {
        element.textContent = before;
      }
    }
    return true;
  });
});
</script>

<template>
  <div class="layer-craft-ext absolute z-9999 left-0 top-0">
    <CursorInspector v-model:is-inspecting="isInspecting" @select="handleInspectorSelect" />
    <LayerPanel :target="selectedElement" @close="handlePanelClose" />
  </div>
</template>

<style scoped></style>
