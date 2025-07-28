<script setup lang="ts">
import CursorInspector from './components/CursorInspector.vue';
import LayerPanel from './components/LayerPanel.vue';

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
  browser.runtime.onMessage.addListener((message, _, sendResponse) => {
    console.log('Content script received message:', message);
    isInspecting.value = true;
    sendResponse(Math.random());
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
