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
