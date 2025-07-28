<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput } from 'naive-ui';

const props = defineProps<{
  target: HTMLElement | null;
}>();

const originalText = computed(() => props.target?.textContent?.trim());
const replacedText = ref('');

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const onConfirm = () => {
  if (props.target && replacedText.value) {
    props.target.textContent = replacedText.value;
    emits('close');
  }
};
</script>

<template>
  <div class="panel__text-replace space-y-2">
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
