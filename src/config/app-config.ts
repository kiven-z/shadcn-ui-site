import LayoutOffcanvas from '@/assets/layout/layout-horizontal.svg?react';
import LayoutIcon from '@/assets/layout/layout-vertical.svg?react';

const APP_CONFIG = {
  name: 'shadcn-ui-site',
  description: 'Vite + React + shadcn/ui site',
  user: {
    name: 'shadcn',
    email: 'm@example.com',
  },
  defaultColorScheme: 'system',
  themes: [
    { id: 'light', icon: 'ri:sun-line' },
    { id: 'dark', icon: 'ri:moon-line' },
    { id: 'system', icon: 'ri:computer-line' },
  ],
  layouts: [
    { id: 'icon', icon: LayoutIcon },
    { id: 'offcanvas', icon: LayoutOffcanvas },
  ],
  locales: [
    { locale: 'zh-CN', label: '简体中文' },
    { locale: 'en', label: 'English' },
  ],
  directionItems: [
    { id: 'ltr', icon: 'ri:text-direction-l' },
    { id: 'rtl', icon: 'ri:text-direction-r' },
  ],
};

export { APP_CONFIG };
