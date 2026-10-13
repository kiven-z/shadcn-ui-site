import type { AppRoute } from '@/router/access/types';

import { toMenu } from '@/router/access/menu';

export const staticRoutes: AppRoute[] = [
  {
    name: 'Home',
    path: '/',
    component: '/home/index',
    meta: { title: '首页', icon: 'ri:home-line' },
  },
  {
    name: 'Demo',
    meta: { title: 'Demo', icon: 'ri:apps-2-line' },
    children: [
      {
        name: 'DataTable',
        path: '/data-table',
        component: '/data-table/index',
        meta: { title: 'Table' },
      },
    ],
  },
];

export const staticMenu = toMenu(staticRoutes);
