import '@/assets/main.css';
import './style.css';
import { name } from '~~/package.json';
import { createVueApp } from './main';
import * as analytics from '@/utils/analytics';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: name,
      position: 'inline',
      anchor: 'html',
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
