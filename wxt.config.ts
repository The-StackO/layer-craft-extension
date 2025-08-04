import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: [
    '@wxt-dev/module-vue',
    '@wxt-dev/auto-icons',
    '@wxt-dev/i18n/module',
    '@wxt-dev/analytics/module',
  ],
  srcDir: 'src',
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    default_locale: 'en_US',
    name: '__MSG_extName__',
    description: '__MSG_extDescription__',
    permissions: ['storage'],
  },
  autoIcons: {
    baseIconPath: 'assets/logo/logo.svg',
  },
});
