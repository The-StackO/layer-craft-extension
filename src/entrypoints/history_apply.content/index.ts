import { getProxiedHistoryService } from '@/services/history/proxy';
import { getCurrentLocation } from '@/utils/url';
import { getElementByXpath } from '@/utils/dom';
import type { HistoryItem } from '@/services/history/types';

interface PendingHistoryItem {
  history: HistoryItem;
  retryCount: number;
  maxRetries: number;
}

const pendingItems = new Map<string, PendingHistoryItem>();
const appliedItems = new Set<string>();
let observer: MutationObserver | null = null;
let isObserving = false;

function ensureMutationObserver(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(handleMutation);
      resolve();
    } else {
      const checkInterval = setInterval(() => {
        if (typeof MutationObserver !== 'undefined') {
          observer = new MutationObserver(handleMutation);
          clearInterval(checkInterval);
          resolve();
        }
      }, 10);
    }
  });
}

function generateHistoryKey(history: HistoryItem): string {
  return `${history.type}_${history.xpath}_${history.id}`;
}

function applyHistoryItem(history: HistoryItem): boolean {
  try {
    switch (history.type) {
      case 'text_replace':
        const textElement = getElementByXpath(history.xpath);
        if (textElement) {
          textElement.textContent = history.after;
          return true;
        }
        break;
      
      case 'image_replace':
        const imageElement = getElementByXpath(history.xpath);
        if (imageElement && imageElement.tagName === 'IMG') {
          (imageElement as HTMLImageElement).src = history.after;
          return true;
        }
        break;
      
      case 'element_delete':
        const deleteElement = getElementByXpath(history.xpath);
        if (deleteElement) {
          deleteElement.remove();
          return true;
        }
        break;
    }
    return false;
  } catch (error) {
    console.warn('Failed to apply history item:', history, error);
    return false;
  }
}

function handleMutation(mutations: MutationRecord[]) {
  let hasChanges = false;
  
  for (const [key, pendingItem] of pendingItems.entries()) {
    if (appliedItems.has(key)) continue;
    
    const success = applyHistoryItem(pendingItem.history);
    if (success) {
      appliedItems.add(key);
      pendingItems.delete(key);
      hasChanges = true;
    } else {
      pendingItem.retryCount++;
      if (pendingItem.retryCount >= pendingItem.maxRetries) {
        console.warn('Max retries reached for history item:', pendingItem.history);
        pendingItems.delete(key);
      }
    }
  }
  
  if (hasChanges && pendingItems.size === 0) {
    stopObserving();
  }
}

async function startObserving() {
  if (!isObserving) {
    await ensureMutationObserver();
    if (observer) {
      observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
      isObserving = true;
    }
  }
}

function stopObserving() {
  if (isObserving && observer) {
    observer.disconnect();
    isObserving = false;
  }
}

async function processHistoryItems(historyItems: HistoryItem[]) {
  const unprocessedItems: HistoryItem[] = [];
  
  for (const history of historyItems) {
    const key = generateHistoryKey(history);
    
    if (appliedItems.has(key)) {
      continue;
    }
    
    const success = applyHistoryItem(history);
    if (!success) {
      unprocessedItems.push(history);
      pendingItems.set(key, {
        history,
        retryCount: 0,
        maxRetries: 50
      });
    } else {
      appliedItems.add(key);
    }
  }
  
  if (unprocessedItems.length > 0) {
    await startObserving();
    
    setTimeout(() => {
      if (pendingItems.size > 0) {
        console.warn('Some history items could not be applied:', pendingItems.size);
        stopObserving();
      }
    }, 10000);
  }
}

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_start',
  async main(ctx) {
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      });
    }
    
    getProxiedHistoryService()
      .getHistoryByUrl(getCurrentLocation())
      .then(async (historyItems) => {
        if (historyItems && historyItems.length > 0) {
          await processHistoryItems(historyItems.reverse());
        }
      })
      .catch(error => {
        console.error('Failed to load history:', error);
      });
  },
});
