import '@/assets/main.css';
import './style.css';
import { createVueApp } from './main';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'layer-craft-root',
      position: 'inline',
      anchor: 'body',
      onMount: container => {
        return createVueApp(container);
      },
      onRemove: app => {
        app?.unmount();
      },
    });

    ui.mount();
  },
});
