<script setup lang="ts">
import { NButton } from 'naive-ui';
import { getProxiedHistoryService } from '@/services/history/proxy';
import { getXpathForElement, getElementIndex } from '@/utils/dom';
import { getCurrentLocation } from '@/utils/url';

const props = defineProps<{
  target: HTMLElement | null;
}>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const onConfirm = async () => {
  if (props.target) {
    trackEvent('confirm_element_delete', {
      source: 'content',
    });

    await getProxiedHistoryService().addHistoryItem({
      type: 'element_delete',
      url: getCurrentLocation(),
      xpath: getXpathForElement(props.target.parentElement),
      index: getElementIndex(props.target),
      before: props.target.outerHTML,
      after: 'Deleted',
    });

    props.target.remove();

    emits('close');
  }
};
</script>

<template>
  <div class="panel__element-delete space-y-2 w-70">
    <div class="panel-header flex justify-center font-bold">
      {{ i18n.t('content.layerPanel.elementDeletePanel.title') }}
    </div>
    <div class="panel-body">
      <p class="text-amber-500 text-center">
        {{ i18n.t('content.layerPanel.elementDeletePanel.description') }}
      </p>
    </div>
    <div class="panel-footer flex justify-end gap-2">
      <n-button size="small" @click="emits('close')">
        {{ i18n.t('content.layerPanel.cancelButton') }}
      </n-button>
      <n-button size="small" type="primary" @click="onConfirm">
        {{ i18n.t('content.layerPanel.confirmButton') }}
      </n-button>
    </div>
  </div>
</template>

<style scoped></style>
