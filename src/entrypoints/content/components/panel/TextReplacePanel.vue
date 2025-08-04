<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NForm, NFormItem, NInput } from 'naive-ui';
import { getProxiedHistoryService } from '@/services/history/proxy';
import { getXpathForElement } from '@/utils/dom';
import { getCurrentLocation } from '@/utils/url';

const props = defineProps<{
  target: HTMLElement | null;
}>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const originalText = computed(() => props.target?.textContent?.trim());
const replacedText = ref(originalText.value);

const onConfirm = async () => {
  if (props.target && replacedText.value) {
    trackEvent('confirm_text_replace', {
      source: 'content',
    });

    props.target.textContent = replacedText.value;

    await getProxiedHistoryService().addHistoryItem({
      type: 'text_replace',
      url: getCurrentLocation(),
      xpath: getXpathForElement(props.target),
      before: originalText.value || '',
      after: replacedText.value,
    });

    emits('close');
  }
};
</script>

<template>
  <div class="panel__text-replace space-y-2 w-70">
    <div class="panel-header flex justify-center font-bold">
      {{ i18n.t('content.layerPanel.textReplacePanel.title') }}
    </div>
    <div class="panel-body">
      <n-form size="small">
        <n-form-item :label="i18n.t('content.layerPanel.textReplacePanel.originalLabel')">
          <n-input v-model:value="originalText" disabled></n-input>
        </n-form-item>
        <n-form-item
          :label="i18n.t('content.layerPanel.textReplacePanel.replacedLabel')"
          type="textarea"
        >
          <n-input v-model:value="replacedText"></n-input>
        </n-form-item>
      </n-form>
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
