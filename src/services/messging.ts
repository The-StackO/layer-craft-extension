import { defineExtensionMessaging } from '@webext-core/messaging';

interface ProtocolMap {
  selection({ type }: { type: 'start' | 'stop' }): boolean;
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
