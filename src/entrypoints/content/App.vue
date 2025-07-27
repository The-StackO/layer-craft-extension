<script setup lang="ts">
import { ref } from 'vue';
import CursorInspector from '@/components/content/CursorInspector.vue';
import EditorPanel from '@/components/content/EditorPanel.vue';

const isInspecting = ref(false);
</script>

<template>
  <div class="layer-craft-panel absolute z-9999 left-0 top-0">
    <button class="color-red" @click="isInspecting = !isInspecting">开始</button>
    <CursorInspector :is-inspecting="isInspecting" />
    <EditorPanel />
  </div>
</template>

<style scoped></style>
