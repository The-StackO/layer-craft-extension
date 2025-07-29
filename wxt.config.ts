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
    name: '层舟-网页修改',
    description: '层舟-网页修改',
    permissions: ['storage'],
  },
});
