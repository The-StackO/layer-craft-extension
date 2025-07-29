import { defineExtensionMessaging } from '@webext-core/messaging';

interface ProtocolMap {
  ping({}): boolean;
  // 开始选择元素
  selection({ type }: { type: 'start' | 'stop' }): boolean;
  // 撤销改动
  makeUndo({
    type,
    xpath,
    before,
    after,
  }: {
    type: 'text_replace' | 'style_modify';
    xpath: string;
    before: string;
    after: string;
  }): boolean;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
