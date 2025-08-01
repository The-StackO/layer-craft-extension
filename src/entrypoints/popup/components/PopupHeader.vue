<script setup lang="ts">
import { NIcon } from 'naive-ui';
import { LogoGithub } from '@vicons/ionicons5';

const handleOpenGithub = async () => {
  await browser.tabs.create({ url: 'https://github.com/The-StackO/layer-craft-extension' });
};
</script>

<template>
  <div class="w-full h-full flex items-center justify-between px-4 py-3">
    <div class="flex items-center">
      <img src="@/assets/logo/logo.svg" class="w-5 h-5 mr-2" alt="logo" />
      <a class="text-sm font-bold">{{ i18n.t('popup.header.title') }}</a>
    </div>
    <div class="flex-shrink-0 p-1">
      <span
        class="flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-700 transition-all duration-200"
        @click="handleOpenGithub"
      >
        <n-icon :component="LogoGithub" :size="18" />
      </span>
    </div>
  </div>
</template>

<style scoped></style>
