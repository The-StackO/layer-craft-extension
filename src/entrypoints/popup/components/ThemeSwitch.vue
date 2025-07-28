<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useOsTheme, NButton, NIcon } from 'naive-ui';
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5';

const themeRef = ref('');

const initTheme = async () => {
  const theme = await storage.getItem<string>('local:theme');
  if (theme === undefined || theme === null) {
    themeRef.value = useOsTheme().value === 'dark' ? 'dark' : 'light';
    await storage.setItem('local:theme', themeRef.value);
  }
  themeRef.value = theme ?? 'light';
};

const changeTheme = async () => {
  if (themeRef.value === 'light') {
    themeRef.value = 'dark';
    await storage.setItem('local:theme', themeRef.value);
  } else {
    themeRef.value = 'light';
    await storage.setItem('local:theme', themeRef.value);
  }
};

onMounted(async () => {
  await initTheme();
});
</script>

<template>
  <n-button circle size="small" @click="changeTheme">
    <n-icon v-if="themeRef === 'dark'" :component="MoonOutline" />
    <n-icon v-else :component="SunnyOutline" />
  </n-button>
</template>

<style scoped></style>
