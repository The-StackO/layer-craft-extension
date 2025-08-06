import { ref } from 'vue';
import type { GlobalThemeOverrides } from 'naive-ui';
import { name } from '~~/package.json';

/**
 * 获取 CSS 变量值
 * @param variable CSS 变量名
 * @returns CSS 变量值
 */
function getCssVar(variable: string): string {
  const shadowRoot = (document.querySelector(name) as HTMLElement)?.shadowRoot;
  const container = shadowRoot?.firstElementChild ?? document.documentElement;
  const styles = getComputedStyle(container);
  return styles.getPropertyValue(variable).trim() || '';
}

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
      primaryColor: getCssVar('--lc-primary'),
      primaryColorHover: getCssVar('--lc-primary-hover'),
      primaryColorPressed: getCssVar('--lc-primary-active'),
      primaryColorSuppl: getCssVar('--lc-primary-active'), // 用于 a, loading bar 等

      // 成功色
      successColor: getCssVar('--lc-success'),
      successColorHover: getCssVar('--lc-success'),
      successColorPressed: getCssVar('--lc-success'),
      successColorSuppl: getCssVar('--lc-success'),

      // 警告色
      warningColor: getCssVar('--lc-warning'),
      warningColorHover: getCssVar('--lc-warning'),
      warningColorPressed: getCssVar('--lc-warning'),
      warningColorSuppl: getCssVar('--lc-warning'),

      // 错误/危险色
      errorColor: getCssVar('--lc-error'),
      errorColorHover: getCssVar('--lc-error'),
      errorColorPressed: getCssVar('--lc-error'),
      errorColorSuppl: getCssVar('--lc-error'),

      // 中性色
      textColorBase: getCssVar('--lc-text-main'), // 基本文字
      textColor1: getCssVar('--lc-text-main'), // 主要文字
      textColor2: getCssVar('--lc-text-subtle'), // 次要文字
      textColor3: getCssVar('--lc-text-light'), // 占位符、禁用文字
      borderColor: getCssVar('--lc-border'),
      borderRadius: '4px',
    },
    // 组件级覆盖
    Button: {
      // 主要按钮文字颜色
      textColorPrimary: getCssVar('--lc-primary-text'),
      textColorHoverPrimary: getCssVar('--lc-primary-text'),
      textColorPressedPrimary: getCssVar('--lc-primary-text'),
      textColorFocusPrimary: getCssVar('--lc-primary-text'),
      // 危险按钮文字颜色
      textColorDanger: getCssVar('--lc-primary-text'),
      textColorHoverDanger: getCssVar('--lc-primary-text'),
      textColorPressedDanger: getCssVar('--lc-primary-text'),
      textColorFocusDanger: getCssVar('--lc-primary-text'),
    },
    Popover: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    Input: {
      boxShadowFocus: `0 0 0 1px ${getCssVar('--lc-primary')}`,
    },
  });

  return {
    themeOverrides,
  };
}
