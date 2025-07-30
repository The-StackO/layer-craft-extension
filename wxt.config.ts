import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  srcDir: 'src',
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: '层舟-网页魔术贴',
    description:
      '层舟(LayerCraft) 像用魔术贴一样，轻松修改网页文本、替换图片，支持一键撤销和截图分享。是一款不会编程也能轻松上手的网页编辑器。',
    permissions: ['storage'],
  },
});
