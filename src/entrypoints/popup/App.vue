<script setup lang="ts">
import { onMounted } from 'vue';
import { NConfigProvider, NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader } from 'naive-ui';
import PopupHeader from './components/PopupHeader.vue';
import PopupFooter from './components/PopupFooter.vue';
import PopupMain from './components/PopupMain.vue';
import { analytics } from '#analytics';

onMounted(() => {
  analytics.autoTrack(document);

  analytics.track('popup_open');
});
</script>

<template>
  <n-config-provider inline-theme-disabled>
    <n-layout class="w-[380px] h-[478px] overflow-hidden">
      <n-layout-header bordered class="h-[52px] p-0">
        <PopupHeader />
      </n-layout-header>
      <n-layout-content
        position="absolute"
        class="!top-[52px] !bottom-[26px]"
        :native-scrollbar="false"
        content-style="padding: 16px;"
      >
        <PopupMain />
      </n-layout-content>
      <n-layout-footer bordered position="absolute" class="h-[26px] p-0">
        <PopupFooter />
      </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<style scoped></style>
