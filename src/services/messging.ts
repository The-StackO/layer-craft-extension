import { defineExtensionMessaging } from '@webext-core/messaging';
import type { HistoryItem } from '@/services/history/types';

interface ProtocolMap {
  ping({}): boolean;
  // 开始选择元素
  selection({ type }: { type: 'start' | 'stop' }): boolean;
  // 撤销改动
  makeUndo(history: HistoryItem): boolean;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
