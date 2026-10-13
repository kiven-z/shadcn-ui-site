import LayoutOffcanvas from '@/assets/layout/layout-horizontal.svg?react';
import LayoutIcon from '@/assets/layout/layout-vertical.svg?react';

/** 颜色方案：浅色 / 深色 / 跟随系统 */
export type ColorScheme = 'light' | 'dark' | 'system';

/** 默认颜色方案 */
export const THEME_DEFAULT_COLOR_SCHEME: ColorScheme = 'system';

export const THEMES = [
  { id: 'light', icon: 'ri:sun-line' },
  { id: 'dark', icon: 'ri:moon-line' },
  { id: 'system', icon: 'ri:computer-line' },
] as const;

/** 侧栏收起方式 */
export const LAYOUTS = [
  { id: 'icon', icon: LayoutIcon },
  { id: 'offcanvas', icon: LayoutOffcanvas },
] as const;

/** 默认收起方式 */
export const DEFAULT_LAYOUT_MODE = LAYOUTS[0].id;
