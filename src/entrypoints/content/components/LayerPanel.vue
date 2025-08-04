<script setup lang="ts">
import { NPopover } from 'naive-ui';
import { useElementBounding } from '@vueuse/core';
import type { ChangeType } from '@/services/history/types';
import GuidePanel from './panel/GuidePanel.vue';
import TextReplacePanel from './panel/TextReplacePanel.vue';
import ElementDeletePanel from './panel/ElementDeletePanel.vue';
import ImageReplacePanel from './panel/ImageReplacePanel.vue';

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

const openedPanel = ref<'guide' | ChangeType>('guide');

const handlePanelCommand = (panel: ChangeType) => {
  trackEvent('click_guide_panel_' + panel, {
    source: 'content',
    change_type: panel,
  });
  openedPanel.value = panel;
};

watch(
  () => props.target,
  newTarget => {
    if (newTarget) {
      openedPanel.value = 'guide';
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
  <div ref="panelRef" class="layer-craft-panel absolute top-0 left-0">
    <n-popover
      :show="showPanel"
      :x="panelX"
      :y="panelY"
      trigger="manual"
      :z-index="2147483647"
      :to="panelRef?.$el || panelRef"
      placement="bottom"
      @clickoutside="emits('close')"
      :class="{
        '!p-0': openedPanel === 'guide',
      }"
    >
      <template #trigger>
        <div style="position: fixed; width: 0; height: 0"></div>
      </template>
      <GuidePanel
        v-if="openedPanel === 'guide'"
        @select-command="handlePanelCommand"
        @close="emits('close')"
      />
      <TextReplacePanel
        v-else-if="openedPanel === 'text_replace'"
        :target="target"
        @close="emits('close')"
      />
      <ElementDeletePanel
        v-else-if="openedPanel === 'element_delete'"
        :target="target"
        @close="emits('close')"
      />
      <ImageReplacePanel
        v-else-if="openedPanel === 'image_replace'"
        :target="target"
        @close="emits('close')"
      />
    </n-popover>
  </div>
</template>

<style scoped></style>
