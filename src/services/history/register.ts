import { defineProxyService } from '@webext-core/proxy-service';
import { HistoryService } from './service';

export const [registerHistoryService] = defineProxyService(
  'HistoryService',
  () => new HistoryService()
);
