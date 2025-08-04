import '@/assets/main.css';
import './style.css';
import { createVueApp } from './main';
import * as analytics from '@/utils/analytics';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'layer-craft-ext',
      position: 'inline',
      anchor: 'body',
      onMount: container => {
        analytics.autoTrack(container);
        return createVueApp(container);
      },
      onRemove: app => {
        app?.unmount();
      },
    });

    ui.mount();
  },
});
