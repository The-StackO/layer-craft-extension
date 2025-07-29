import { registerHistoryService } from '@/services/history/register';

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  registerHistoryService();
});
