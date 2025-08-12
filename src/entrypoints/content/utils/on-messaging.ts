import { onMessage } from '@/services/messging';
import { getElementByXpath } from '@/utils/dom';
import type { HistoryItem } from '@/services/history/types';

// popup 探活
onMessage('ping', message => {
  return true;
});

// 监听撤销改动
onMessage('makeUndo', message => {
  const { type } = message.data;
  if (type === 'text_replace') {
    undoTextReplace(message.data);
  } else if (type === 'element_delete') {
    undoElementDelete(message.data);
  } else if (type === 'image_replace') {
    undoImageReplace(message.data);
  }
  return true;
});

const undoTextReplace = (history: HistoryItem) => {
  const { xpath, before } = history;
  const element = getElementByXpath(xpath);
  if (element) {
    element.textContent = before;
  }
};

const undoElementDelete = (history: HistoryItem) => {
  const { xpath, index, before } = history;

  const parentElement = getElementByXpath(xpath);
  if (!parentElement) {
    return;
  }

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = before;
  const restoredElement = tempDiv.firstChild as Element;
  if (!restoredElement) {
    return;
  }

  if (index !== undefined && index >= 0 && index < parentElement.children.length) {
    const referenceNode = parentElement.children[index];
    parentElement.insertBefore(restoredElement, referenceNode);
  } else {
    parentElement.appendChild(restoredElement);
  }
};

const undoImageReplace = (history: HistoryItem) => {
  const { xpath, before } = history;

  const element = getElementByXpath(xpath);
  if (!element) return;
  
  // 检查元素类型并应用相应的恢复逻辑
  const tagName = element.tagName.toLowerCase();
  
  if (tagName === 'img') {
    (element as HTMLImageElement).src = before;
  } else if (tagName === 'picture') {
    const img = element.querySelector('img');
    if (img) {
      img.src = before;
    }
  } else {
    // 检查是否是背景图片
    const computedStyle = window.getComputedStyle(element);
    const backgroundImage = computedStyle.backgroundImage;
    if (backgroundImage && backgroundImage !== 'none') {
      element.style.backgroundImage = `url('${before}')`;
    } else {
      // 检查其他类型的图片
      const content = computedStyle.content;
      if (content && content.includes('url')) {
        element.style.content = `url('${before}')`;
      }
    }
  }
};
