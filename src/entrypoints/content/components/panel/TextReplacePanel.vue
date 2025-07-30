<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NForm, NFormItem, NInput } from 'naive-ui';
import { getProxiedHistoryService } from '@/services/history/proxy';
import { getXpathForElement } from '@/utils/dom';
import { getCurrentLocation } from '@/utils/url';

const props = defineProps<{
  target: HTMLElement | null;
}>();

const originalText = computed(() => props.target?.textContent?.trim());
const replacedText = ref('');

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const onConfirm = async () => {
  if (props.target && replacedText.value) {
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
  <div class="panel__text-replace space-y-2 py-2 px-4">
    <div class="panel-header flex justify-center font-bold">文本替换</div>
    <div class="panel-body">
      <n-form size="small">
        <n-form-item label="原文本">
          <n-input v-model:value="originalText" disabled></n-input>
        </n-form-item>
        <n-form-item label="替换为" type="textarea">
          <n-input v-model:value="replacedText"></n-input>
        </n-form-item>
      </n-form>
    </div>
    <div class="panel-footer flex justify-end gap-2">
      <n-button size="small" @click="emits('close')">取消</n-button>
      <n-button size="small" type="primary" @click="onConfirm">确定</n-button>
    </div>
  </div>
</template>

<style scoped></style>
