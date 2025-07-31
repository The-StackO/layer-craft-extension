<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NInput, NImage } from 'naive-ui';
import { getProxiedHistoryService } from '@/services/history/proxy';
import { getXpathForElement } from '@/utils/dom';
import { getCurrentLocation } from '@/utils/url';

const props = defineProps<{
  target: HTMLElement | null;
}>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const isImageElement = computed(() => props.target?.tagName?.toLowerCase() === 'img');
const originalImage = computed(() =>
  isImageElement ? (props.target as HTMLImageElement).src : ''
);
const replacedImage = ref(originalImage.value);

const onConfirm = async () => {
  if (isImageElement) {
    await getProxiedHistoryService().addHistoryItem({
      type: 'image_replace',
      url: getCurrentLocation(),
      xpath: getXpathForElement(props.target),
      before: originalImage.value || '',
      after: replacedImage.value,
    });

    (props.target as HTMLImageElement).src = replacedImage.value;

    emits('close');
  }
};
</script>

<template>
  <div class="panel__image-replace space-y-4 w-70">
    <div class="panel-header flex justify-center font-bold">图片替换</div>
    <div class="panel-body flex flex-col items-center">
      <template v-if="isImageElement">
        <n-input v-model:value="replacedImage"></n-input>
        <n-image class="mt-4" width="100%" :src="replacedImage" />
      </template>
      <p v-else class="text-amber-500">当前选中的元素不是图片</p>
    </div>
    <div class="panel-footer flex justify-end gap-2">
      <n-button size="small" @click="emits('close')">取消</n-button>
      <n-button size="small" type="primary" @click="onConfirm">确定</n-button>
    </div>
  </div>
</template>

<style scoped></style>
