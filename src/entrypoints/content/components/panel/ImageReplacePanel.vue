<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NInput, NImage } from 'naive-ui';
import { getProxiedHistoryService } from '@/services/history/proxy';
import { getXpathForElement } from '@/utils/dom';
import { getCurrentLocation } from '@/utils/url';

interface ImageInfo {
  type: 'img' | 'background' | 'picture' | 'other';
  src: string;
  element: HTMLElement;
}

const props = defineProps<{
  target: HTMLElement | null;
}>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

// 检测元素是否为图片元素
const isImageElement = computed(() => {
  if (!props.target) return false;
  return getImageInfo(props.target) !== null;
});

// 获取图片信息
const getImageInfo = (element: HTMLElement): ImageInfo | null => {
  if (!element) return null;
  
  // 1. 检查是否是img标签
  if (element.tagName.toLowerCase() === 'img') {
    const img = element as HTMLImageElement;
    return {
      type: 'img',
      src: img.src || img.currentSrc || '',
      element
    };
  }
  
  // 2. 检查是否是picture标签内的img
  if (element.tagName.toLowerCase() === 'picture') {
    const img = element.querySelector('img');
    if (img) {
      return {
        type: 'picture',
        src: img.src || img.currentSrc || '',
        element
      };
    }
  }
  
  // 3. 检查背景图片
  const computedStyle = window.getComputedStyle(element);
  const backgroundImage = computedStyle.backgroundImage;
  if (backgroundImage && backgroundImage !== 'none') {
    // 提取url中的图片地址
    const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
    if (urlMatch) {
      return {
        type: 'background',
        src: urlMatch[1],
        element
      };
    }
  }
  
  // 4. 检查其他可能包含图片的元素
  // 例如: css中的content属性，object标签等
  const content = computedStyle.content;
  if (content && content !== 'none' && content.includes('url')) {
    const urlMatch = content.match(/url\(['"]?([^'"]+)['"]?\)/);
    if (urlMatch) {
      return {
        type: 'other',
        src: urlMatch[1],
        element
      };
    }
  }
  
  return null;
};

const imageInfo = computed(() => props.target ? getImageInfo(props.target) : null);
const originalImage = computed(() => imageInfo.value?.src || '');
const replacedImage = ref(originalImage.value);
const imageType = computed(() => imageInfo.value?.type || '');

const onConfirm = async () => {
  if (!imageInfo.value || !props.target) return;
  
  trackEvent('confirm_image_replace', {
    source: 'content',
    image_type: imageInfo.value.type,
  });

  await getProxiedHistoryService().addHistoryItem({
    type: 'image_replace',
    url: getCurrentLocation(),
    xpath: getXpathForElement(props.target),
    before: originalImage.value || '',
    after: replacedImage.value,
  });

  // 根据不同类型应用替换
  applyImageReplacement(imageInfo.value, replacedImage.value);

  emits('close');
};

const applyImageReplacement = (imageInfo: ImageInfo, newSrc: string) => {
  const { type, element } = imageInfo;
  
  switch (type) {
    case 'img':
      (element as HTMLImageElement).src = newSrc;
      break;
      
    case 'picture':
      const img = element.querySelector('img');
      if (img) {
        img.src = newSrc;
      }
      break;
      
    case 'background':
      element.style.backgroundImage = `url('${newSrc}')`;
      break;
      
    case 'other':
      // 处理其他类型的图片替换
      const computedStyle = window.getComputedStyle(element);
      const content = computedStyle.content;
      if (content && content.includes('url')) {
        element.style.content = `url('${newSrc}')`;
      }
      break;
  }
};

const getImageTypeLabel = (type: string): string => {
  switch (type) {
    case 'img':
      return 'IMG标签';
    case 'picture':
      return 'PICTURE标签';
    case 'background':
      return '背景图片';
    case 'other':
      return '其他类型';
    default:
      return '未知类型';
  }
};
</script>

<template>
  <div class="panel__image-replace space-y-4 w-70">
    <div class="panel-header flex justify-center font-bold">
      {{ i18n.t('content.layerPanel.imageReplacePanel.title') }}
    </div>
    <div class="panel-body flex flex-col items-center">
      <template v-if="isImageElement">
        <!-- 显示图片类型信息 -->
        <div class="text-sm text-gray-500 mb-2">
          类型: {{ getImageTypeLabel(imageType) }}
        </div>
        
        <!-- 图片URL输入 -->
        <n-input 
          v-model:value="replacedImage" 
          placeholder="输入图片URL"
          type="text"
        />
        
        <!-- 图片预览 -->
        <n-image 
          class="mt-4" 
          width="100%" 
          :src="replacedImage" 
          :alt="imageType === 'background' ? '背景图片' : '图片'"
          :fallback-src="replacedImage"
        />
        
        <!-- 原始图片信息 -->
        <div class="text-xs text-gray-400 mt-2 text-center">
          <div>原始: {{ originalImage.substring(0, 50) }}{{ originalImage.length > 50 ? '...' : '' }}</div>
        </div>
      </template>
      <p v-else class="text-amber-500">
        {{ i18n.t('content.layerPanel.imageReplacePanel.invalidImagePlaceholder') }}
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
