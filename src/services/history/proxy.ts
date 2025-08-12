import { defineProxyService } from '@webext-core/proxy-service';
import type { HistoryService } from './service';

export const [_, getProxiedHistoryService] = defineProxyService<HistoryService, any>(
  'HistoryService',
  // @ts-expect-error: No implementation required for creating the proxy
  () => ({})
);
