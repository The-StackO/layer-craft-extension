<script setup lang="ts">
import { NPopover } from 'naive-ui';
import TextReplacePanel from './panel/TextReplacePanel.vue';

const props = defineProps<{
  target: HTMLElement | null;
}>();

const panelRef = ref();
const showPanel = computed(() => !!props.target);
const panelX = ref(0);
const panelY = ref(0);

const updatePanelPosition = (target: HTMLElement) => {
  const rect = target.getBoundingClientRect();
  panelX.value = rect.left + window.scrollX + rect.width / 2;
  panelY.value = rect.top + window.scrollY + rect.height;
};

watch(
  () => props.target,
  newTarget => {
    if (newTarget) {
      updatePanelPosition(newTarget);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div ref="panelRef" class="layer-craft-panel">
    <n-popover
      :show="showPanel"
      :x="panelX"
      :y="panelY"
      trigger="manual"
      :to="panelRef?.$el || panelRef"
    >
      <template #trigger>
        <div style="position: fixed; width: 0; height: 0"></div>
      </template>
      <TextReplacePanel :target="target" @cancel="" />
    </n-popover>
  </div>
</template>

<style scoped></style>
