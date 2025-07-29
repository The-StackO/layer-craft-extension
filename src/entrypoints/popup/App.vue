<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  darkTheme,
  GlobalTheme,
  NConfigProvider,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
} from 'naive-ui';
import PopupHeader from './components/PopupHeader.vue';
import PopupFooter from './components/PopupFooter.vue';
import PopupMain from './components/PopupMain.vue';

const theme = ref<GlobalTheme | null>(null);
const applyTheme = (newTheme: string | null) => {
  theme.value = newTheme === 'dark' ? darkTheme : null;
  document.documentElement.classList.toggle(
    'dark',
    newTheme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
  );
};

onMounted(async () => {
  const newTheme = await storage.getItem<string>('local:theme');
  applyTheme(newTheme);

  storage.watch<string>('local:theme', newTheme => {
    applyTheme(newTheme);
  });
});
</script>

<template>
  <n-config-provider :theme="theme">
    <n-layout class="w-[380px] h-[464px]">
      <n-layout-header bordered class="h-12 flex items-center justify-between py-2 px-4">
        <PopupHeader />
      </n-layout-header>
      <n-layout-content
        position="absolute"
        class="!top-12 !bottom-6"
        :native-scrollbar="false"
        content-style="padding: 24px;"
      >
        <PopupMain />
      </n-layout-content>
      <n-layout-footer bordered position="absolute" class="h-6">
        <PopupFooter />
      </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<style scoped></style>
