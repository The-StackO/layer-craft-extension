import { defineExtensionMessaging } from '@webext-core/messaging';

interface ProtocolMap {
  selection({ type }: { type: 'start' | 'stop' }): boolean;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
