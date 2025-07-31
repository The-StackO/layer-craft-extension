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
  <div class="panel__element-delete space-y-2">
    <div class="panel-header flex justify-center font-bold">删除元素</div>
    <div class="panel-body">
      <p>是否删除当前选中的元素？</p>
    </div>
    <div class="panel-footer flex justify-end gap-2">
      <n-button size="small" @click="emits('close')">取消</n-button>
      <n-button size="small" type="primary" @click="onConfirm">确定</n-button>
    </div>
  </div>
</template>

<style scoped></style>
