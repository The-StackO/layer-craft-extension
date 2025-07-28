export const setupNaiveStyles = (container: HTMLElement) => {
  const copyStyles = () => {
    const shadowRoot = container.getRootNode() as ShadowRoot;

    if (!shadowRoot) {
      return;
    }

    // 更精确的 NaiveUI 样式识别
    const isNaiveStyle = (style: HTMLStyleElement): boolean => {
      const text = style.textContent;
      if (!text) return false;

      // 检查是否包含 NaiveUI 的特征
      const isNaive =
        text.includes('cssr-id="n-') ||
        text.includes('naive-ui') ||
        text.includes('.n-') ||
        !!text.match(/cssr-id="(n-[^"]+)"/);

      return isNaive;
    };

    // 完整复制样式标签（包括属性）
    const copyStyleElement = (sourceStyle: HTMLStyleElement) => {
      const newStyle = document.createElement('style');

      // 复制所有属性
      for (let i = 0; i < sourceStyle.attributes.length; i++) {
        const attr = sourceStyle.attributes[i];
        newStyle.setAttribute(attr.name, attr.value);
      }

      // 复制文本内容
      newStyle.textContent = sourceStyle.textContent;

      return newStyle;
    };

    // 复制已存在的样式
    const copyExistingStyles = () => {
      const allStyles = Array.from(document.head.querySelectorAll('style'));

      const naiveStyles = allStyles.filter(style => {
        return isNaiveStyle(style as HTMLStyleElement);
      });

      naiveStyles.forEach((style, index) => {
        const newStyle = copyStyleElement(style as HTMLStyleElement);
        shadowRoot.appendChild(newStyle);
      });
    };

    // 监听新样式
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeName === 'STYLE' && isNaiveStyle(node as HTMLStyleElement)) {
            const newStyle = copyStyleElement(node as HTMLStyleElement);
            shadowRoot.appendChild(newStyle);
          }
        });
      });
    });

    observer.observe(document.head, { childList: true, subtree: true });

    // 立即复制现有样式
    copyExistingStyles();

    return observer;
  };

  // 使用 setTimeout 确保 Shadow DOM 已经创建
  setTimeout(copyStyles, 100);
};
