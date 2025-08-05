import { ref } from 'vue';
import type { GlobalThemeOverrides } from 'naive-ui';

/**
 * 获取 CSS 变量值
 * @param variable CSS 变量名
 * @returns CSS 变量值
 */
function getCssVariableValue(variable: string): string {
  if (typeof window !== 'undefined') {
    const bodyStyles = window.getComputedStyle(document.body);
    return bodyStyles.getPropertyValue(variable).trim() || '';
  }
  return '';
}

/**
 * @description 提供 Naive UI 的主题配置
 * @returns {{ themeOverrides: Ref<GlobalThemeOverrides> }}
 */
export function useNaiveTheme() {
  /**
   * Naive UI 主题覆盖
   *
   * 根据 DESIGN.md 文档定义
   * @see /DESIGN.md
   */
  const themeOverrides = ref<GlobalThemeOverrides>({
    common: {
      // 主题色 (使用 main.css 中的 CSS 变量)
      primaryColor: getCssVariableValue('--lc-primary') || '#14B8A6',
      primaryColorHover: getCssVariableValue('--lc-primary-hover') || '#0F766E',
      primaryColorPressed: getCssVariableValue('--lc-primary-active') || '#0D9488',
      primaryColorSuppl: getCssVariableValue('--lc-primary-active') || '#0D9488', // 用于 a, loading bar 等

      // 成功色
      successColor: getCssVariableValue('--lc-success') || '#22C55E',
      successColorHover:
        `color-mix(in srgb, ${getCssVariableValue('--lc-success') || '#22C55E'} 80%, black)` ||
        '#16A34A',
      successColorPressed:
        `color-mix(in srgb, ${getCssVariableValue('--lc-success') || '#22C55E'} 60%, black)` ||
        '#15803D',
      successColorSuppl:
        `color-mix(in srgb, ${getCssVariableValue('--lc-success') || '#22C55E'} 60%, black)` ||
        '#15803D',

      // 警告色
      warningColor: getCssVariableValue('--lc-warning') || '#F59E0B',
      warningColorHover:
        `color-mix(in srgb, ${getCssVariableValue('--lc-warning') || '#F59E0B'} 80%, black)` ||
        '#D97706',
      warningColorPressed:
        `color-mix(in srgb, ${getCssVariableValue('--lc-warning') || '#F59E0B'} 60%, black)` ||
        '#B45309',
      warningColorSuppl:
        `color-mix(in srgb, ${getCssVariableValue('--lc-warning') || '#F59E0B'} 60%, black)` ||
        '#B45309',

      // 错误/危险色
      errorColor: getCssVariableValue('--lc-error') || '#DC2626',
      errorColorHover:
        `color-mix(in srgb, ${getCssVariableValue('--lc-error') || '#DC2626'} 80%, black)` ||
        '#B91C1C',
      errorColorPressed:
        `color-mix(in srgb, ${getCssVariableValue('--lc-error') || '#DC2626'} 60%, black)` ||
        '#991B1B',
      errorColorSuppl:
        `color-mix(in srgb, ${getCssVariableValue('--lc-error') || '#DC2626'} 60%, black)` ||
        '#991B1B',

      // 中性色
      textColorBase: getCssVariableValue('--lc-text-main') || '#1F2937', // 基本文字
      textColor1: getCssVariableValue('--lc-text-main') || '#1F2937', // 主要文字
      textColor2: getCssVariableValue('--lc-text-subtle') || '#6B7280', // 次要文字
      textColor3: getCssVariableValue('--lc-text-light') || '#9CA3AF', // 占位符、禁用文字
      borderColor: getCssVariableValue('--lc-border') || '#E5E7EB',
      borderRadius: '4px',
    },
    // 组件级覆盖
    Button: {
      // 主要按钮文字颜色
      textColorPrimary: getCssVariableValue('--lc-primary-text') || '#FFFFFF',
      textColorHoverPrimary: getCssVariableValue('--lc-primary-text') || '#FFFFFF',
      textColorPressedPrimary: getCssVariableValue('--lc-primary-text') || '#FFFFFF',
      textColorFocusPrimary: getCssVariableValue('--lc-primary-text') || '#FFFFFF',
      // 危险按钮文字颜色
      textColorDanger: getCssVariableValue('--lc-primary-text') || '#FFFFFF',
      textColorHoverDanger: getCssVariableValue('--lc-primary-text') || '#FFFFFF',
      textColorPressedDanger: getCssVariableValue('--lc-primary-text') || '#FFFFFF',
      textColorFocusDanger: getCssVariableValue('--lc-primary-text') || '#FFFFFF',
    },
    Popover: {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    Input: {
      boxShadowFocus: `0 0 0 1px ${getCssVariableValue('--lc-primary') || '#14B8A6'}`,
    },
  });

  return {
    themeOverrides,
  };
}
