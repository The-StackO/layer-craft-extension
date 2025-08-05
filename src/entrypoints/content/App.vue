<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import CursorInspector from './components/CursorInspector.vue';
import LayerPanel from './components/LayerPanel.vue';
import { onMessage } from '@/services/messging';
import { getElementByXpath } from '@/utils/dom';
import { getCurrentLocation } from '@/utils/url';
import { getProxiedHistoryService } from '@/services/history/proxy';
import { useNaiveTheme } from '@/composables/useNaiveTheme';

const isInspecting = ref(false);
const selectedElement = ref<HTMLElement | null>(null);

const { themeOverrides } = useNaiveTheme();

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
  getProxiedHistoryService()
    .getHistoryByUrl(getCurrentLocation())
    .then(historyItems => {
      historyItems.reverse().forEach(history => {
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
});
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="layer-craft-ext absolute z-9999 left-0 top-0">
      <CursorInspector v-model:is-inspecting="isInspecting" @select="handleInspectorSelect" />
      <LayerPanel :target="selectedElement" @close="handlePanelClose" />
    </div>
  </n-config-provider>
</template>

<style scoped></style>
