import { umami } from '@wxt-dev/analytics/providers/umami';
import { storage } from 'wxt/utils/storage';
import { version } from '../package.json';

export default defineAppConfig({
  analytics: {
    debug: true,
    version: version,
    enabled: storage.defineItem('local:analytics-enabled', {
      fallback: true,
    }),
    // @ts-ignore
    userId: storage.defineItem('local:lc-user-id', {
      init: () => crypto.randomUUID(),
    }),
    providers: [
      umami({
        apiUrl: 'https://us.umami.is/api',
        websiteId: import.meta.env.WXT_UMAMI_WEBSITE_ID,
        domain: import.meta.env.WXT_UMAMI_DOMAIN,
      }),
    ],
  },
});
