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
let isProcessingComplete = false;

// 创建预隐藏样式
function createPreHideStyle(): HTMLStyleElement {
  const style = document.createElement('style');
  style.textContent = `
    .layer-craft-pre-hide {
      visibility: hidden !important;
    }
    .layer-craft-processing {
      transition: visibility 0s !important;
    }
  `;
  return style;
}

// 立即注入预隐藏样式
function injectPreHideStyle() {
  const style = createPreHideStyle();
  (document.head || document.documentElement).appendChild(style);
  return style;
}

// 移除预隐藏样式
function removePreHideStyle(style: HTMLStyleElement) {
  style.remove();
}

// 预处理DOM - 在元素创建前就进行干预
function preprocessDOM(historyItems: HistoryItem[]) {
  const xpathSet = new Set(historyItems.map(h => h.xpath));
  
  // 为所有目标XPath添加预隐藏类
  xpathSet.forEach(xpath => {
    try {
      const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      for (let i = 0; i < result.snapshotLength; i++) {
        const element = result.snapshotItem(i) as HTMLElement;
        if (element && !element.classList.contains('layer-craft-pre-hide')) {
          element.classList.add('layer-craft-pre-hide');
        }
      }
    } catch (error) {
      console.warn('Failed to evaluate XPath for preprocessing:', xpath, error);
    }
  });
}

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
          // 移除预隐藏类，显示元素
          textElement.classList.remove('layer-craft-pre-hide');
          return true;
        }
        break;
      
      case 'image_replace':
        const imageElement = getElementByXpath(history.xpath);
        if (imageElement && imageElement.tagName === 'IMG') {
          (imageElement as HTMLImageElement).src = history.after;
          // 移除预隐藏类，显示元素
          imageElement.classList.remove('layer-craft-pre-hide');
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
  
  // 在每次DOM变化时，预处理新出现的元素
  if (!isProcessingComplete) {
    const allHistoryItems = Array.from(pendingItems.values()).map(item => item.history);
    preprocessDOM(allHistoryItems);
  }
  
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
    isProcessingComplete = true;
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

async function processHistoryItems(historyItems: HistoryItem[], preHideStyle: HTMLStyleElement) {
  const unprocessedItems: HistoryItem[] = [];
  
  // 预处理所有目标元素
  preprocessDOM(historyItems);
  
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
        // 清理所有预隐藏的元素
        document.querySelectorAll('.layer-craft-pre-hide').forEach(el => {
          el.classList.remove('layer-craft-pre-hide');
        });
      }
      stopObserving();
      removePreHideStyle(preHideStyle);
    }, 10000);
  } else {
    // 所有项目都已应用，移除预隐藏样式
    removePreHideStyle(preHideStyle);
  }
}

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_start',
  async main(ctx) {
    // 立即注入预隐藏样式
    const preHideStyle = injectPreHideStyle();
    
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      });
    }
    
    getProxiedHistoryService()
      .getHistoryByUrl(getCurrentLocation())
      .then(async (historyItems) => {
        if (historyItems && historyItems.length > 0) {
          await processHistoryItems(historyItems.reverse(), preHideStyle);
        } else {
          // 没有历史记录，移除预隐藏样式
          removePreHideStyle(preHideStyle);
        }
      })
      .catch(error => {
        console.error('Failed to load history:', error);
        // 发生错误时也要移除预隐藏样式
        removePreHideStyle(preHideStyle);
      });
  },
});
