/**
 * 使用 XPath 查找并返回匹配的第一个元素。
 * @param xpath - 要执行的 XPath 表达式字符串。
 * @param contextNode - 查询的上下文节点，默认为整个 document。
 * @returns {HTMLElement | null} 匹配到的第一个 HTML 元素，如果未找到则返回 null。
 */
export function getElementByXpath(xpath: string, contextNode: Node = document): HTMLElement | null {
  try {
    const result = document.evaluate(
      xpath,
      contextNode,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );
    // singleNodeValue 的类型是 Node，我们断言为 HTMLElement
    return result.singleNodeValue as HTMLElement | null;
  } catch (error) {
    console.error('执行 XPath 查询时出错:', error);
    return null;
  }
}

/**
 * 使用 XPath 查找并返回所有匹配的元素数组。
 * @param xpath - 要执行的 XPath 表达式字符串。
 * @param contextNode - 查询的上下文节点，默认为整个 document。
 * @returns {HTMLElement[]} 包含所有匹配的 HTML 元素的数组。
 */
export function getElementsByXpath(xpath: string, contextNode: Node = document): HTMLElement[] {
  const elements: HTMLElement[] = [];
  try {
    const iterator = document.evaluate(
      xpath,
      contextNode,
      null,
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null
    );

    let node = iterator.iterateNext();
    while (node) {
      if (node instanceof HTMLElement) {
        elements.push(node);
      }
      node = iterator.iterateNext();
    }
  } catch (error) {
    console.error('执行 XPath 查询时出错:', error);
  }
  return elements;
}

/**
 * 为给定的 HTMLElement 生成一个唯一的 XPath 路径。
 * 优先使用元素的 ID（如果存在且唯一），否则会构建一个从根节点开始的完整路径。
 * @param element - 需要计算 XPath 的 HTML 元素。
 * @returns {string} 计算出的 XPath 字符串。
 */
export function getXpathForElement(element: HTMLElement | null): string {
  // 如果元素无效，则返回空字符串
  if (!element || !(element instanceof HTMLElement)) {
    console.warn('提供的参数不是一个有效的 HTMLElement。');
    return '';
  }

  // 最佳情况：如果元素有 ID，这是最稳定和首选的定位器。
  // 我们假设 ID 在文档中是唯一的，这是 HTML 的标准实践。
  if (element.id) {
    return `//*[@id='${element.id}']`;
  }

  // 如果没有 ID，则从元素向上遍历到文档根节点来构建路径。
  const segments: string[] = [];
  let current: Element | null = element;

  while (current && current.nodeType === Node.ELEMENT_NODE) {
    const tagName = current.nodeName.toLowerCase();

    // 如果我们到达了文档的顶层（body 或 html），就不需要计算索引了。
    if (current === document.body) {
      segments.unshift('body');
      // 假设 body 是 html 的直接子元素
      segments.unshift('html');
      break;
    }

    let index = 1;
    let sibling = current.previousElementSibling;
    // 遍历所有前面的同级元素
    while (sibling) {
      // 如果同级元素和当前元素的标签名相同，则索引加一
      if (sibling.nodeName.toLowerCase() === tagName) {
        index++;
      }
      sibling = sibling.previousElementSibling;
    }

    // 构建路径片段，例如 'div[2]'
    const segment = `${tagName}[${index}]`;
    segments.unshift(segment);

    current = current.parentElement;
  }

  return segments.length ? '/' + segments.join('/') : '';
}

/**
 * 计算一个 DOM 元素在其父元素的子元素列表中的索引位置。
 * @param element 要计算索引的目标元素。
 * @returns {number} 元素在其父元素中的索引。如果元素没有父元素，则返回 -1。
 */
export function getElementIndex(element: HTMLElement): number {
  return Array.from(element.parentElement?.children || []).indexOf(element);
}
