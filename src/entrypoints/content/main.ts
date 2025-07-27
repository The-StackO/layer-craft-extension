import { createApp } from 'vue';
import App from './App.vue';

export const createVueApp = (container: HTMLElement) => {
  const app = createApp(App);
  app.mount(container);
  return app;
};
