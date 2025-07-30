<script setup lang="ts">
import { NPopover } from 'naive-ui';
import TextReplacePanel from './panel/TextReplacePanel.vue';
import { useElementBounding } from '@vueuse/core';

const props = defineProps<{
  target: HTMLElement | null;
}>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const currentTarget = ref<HTMLElement | null>(props.target);
const panelRef = ref();
const showPanel = ref(false);
const panelX = ref(0);
const panelY = ref(0);

const { x, y, top, left, width, height } = useElementBounding(currentTarget);

const updatePanelPosition = () => {
  if (currentTarget.value) {
    panelX.value = left.value + width.value / 2;
    panelY.value = top.value + height.value;
  }
};

watch(
  () => props.target,
  newTarget => {
    if (newTarget) {
      showPanel.value = true;
      currentTarget.value = newTarget;
    } else {
      showPanel.value = false;
      currentTarget.value = null;
    }
  },
  { immediate: true }
);

watch([x, y, width, height], () => {
  updatePanelPosition();
});
</script>

<template>
  <div ref="panelRef" class="layer-craft-panel">
    <n-popover
      :show="showPanel"
      :x="panelX"
      :y="panelY"
      trigger="manual"
      :z-index="2147483647"
      :to="panelRef?.$el || panelRef"
      @clickoutside="emits('close')"
    >
      <template #trigger>
        <div style="position: fixed; width: 0; height: 0"></div>
      </template>
      <TextReplacePanel :target="target" @close="emits('close')" />
    </n-popover>
  </div>
</template>

<style scoped>
@reference '@/assets/main.css';

.layer-craft-panel {
  @apply absolute top-0 left-0;
}
</style>
