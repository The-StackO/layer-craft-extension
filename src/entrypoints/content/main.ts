import { createApp } from 'vue';
import App from './App.vue';
import { setupNaiveStyles } from './naive';

export const createVueApp = (container: HTMLElement) => {
  const app = createApp(App);
  app.mount(container);

  // 复制 NaiveUI 样式
  setupNaiveStyles(container);

  return app;
};
