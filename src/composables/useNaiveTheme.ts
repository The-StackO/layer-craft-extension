import { ref } from 'vue';
import type { GlobalThemeOverrides } from 'naive-ui';

/**
 * @description 提供 Naive UI 的主题配置 - 使用 CSS 变量方案
 * @returns {{ themeOverrides: Ref<GlobalThemeOverrides> }}
 */
export function useNaiveTheme() {
  /**
   * Naive UI 主题覆盖
   *
   * 直接使用 CSS 变量，无需 JavaScript 映射
   * 支持动态主题切换，性能更优
   * @see /DESIGN.md
   */
  const themeOverrides = ref<GlobalThemeOverrides>({
    common: {
      // 主题色 (直接使用 CSS 变量)
      primaryColor: 'var(--lc-primary)',
      primaryColorHover: 'var(--lc-primary-hover)',
      primaryColorPressed: 'var(--lc-primary-active)',
      primaryColorSuppl: 'var(--lc-primary-active)', // 用于 a, loading bar 等

      // 成功色
      successColor: 'var(--lc-success)',
      successColorHover: 'var(--lc-success)',
      successColorPressed: 'var(--lc-success)',
      successColorSuppl: 'var(--lc-success)',

      // 警告色
      warningColor: 'var(--lc-warning)',
      warningColorHover: 'var(--lc-warning)',
      warningColorPressed: 'var(--lc-warning)',
      warningColorSuppl: 'var(--lc-warning)',

      // 错误/危险色
      errorColor: 'var(--lc-error)',
      errorColorHover: 'var(--lc-error)',
      errorColorPressed: 'var(--lc-error)',
      errorColorSuppl: 'var(--lc-error)',

      // 中性色
      textColorBase: 'var(--lc-text-main)', // 基本文字
      textColor1: 'var(--lc-text-main)', // 主要文字
      textColor2: 'var(--lc-text-subtle)', // 次要文字
      textColor3: 'var(--lc-text-light)', // 占位符、禁用文字
      borderColor: 'var(--lc-border)',
      borderRadius: '4px',
    },
    // 组件级覆盖
    Button: {
      // 主要按钮文字颜色
      textColorPrimary: 'var(--lc-primary-text)',
      textColorHoverPrimary: 'var(--lc-primary-text)',
      textColorPressedPrimary: 'var(--lc-primary-text)',
      textColorFocusPrimary: 'var(--lc-primary-text)',
      // 危险按钮文字颜色
      textColorDanger: 'var(--lc-primary-text)',
      textColorHoverDanger: 'var(--lc-primary-text)',
      textColorPressedDanger: 'var(--lc-primary-text)',
      textColorFocusDanger: 'var(--lc-primary-text)',
    },
    Popover: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    Input: {
      boxShadowFocus: '0 0 0 1px var(--lc-primary)',
    },
  });

  return {
    themeOverrides,
  };
}
