<script setup lang="ts">
import CursorInspector from '@/components/content/CursorInspector.vue';
import EditorPanel from '@/components/content/EditorPanel.vue';

const isInspecting = ref(false);
const selectedElement = ref<HTMLElement | null>(null);

const handleInspectorSelect = (target: HTMLElement) => {
  if (target) {
    selectedElement.value = target;
  }
};
</script>

<template>
  <div class="layer-craft-panel absolute z-9999 left-0 top-0">
    <button class="color-red" @click="isInspecting = !isInspecting">开始</button>
    <CursorInspector :is-inspecting="isInspecting" @select="handleInspectorSelect" />
    <EditorPanel :target="selectedElement" />
  </div>
</template>

<style scoped></style>
