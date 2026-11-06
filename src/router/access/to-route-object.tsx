import type { RouteObject } from 'react-router-dom';
import type { AppRoute, RouteHandle } from './types';

import { Outlet } from 'react-router-dom';

import { lazyPage } from './page-map';

export function toRouteObjects(routes: AppRoute[]): RouteObject[] {
  return routes.flatMap((route): RouteObject[] => {
    const children = route.children ? toRouteObjects(route.children) : [];

    // 目录没有地址，只作为父级给面包屑留下 title
    if (!route.component) {
      if (children.length === 0) {
        return [];
      }

      const handle: RouteHandle = { title: route.meta.title };

      return [{ element: <Outlet />, handle, children }];
    }

    if (!route.path || !route.path.startsWith('/')) {
      throw new Error(`Page route ${route.name} path must start with /`);
    }

    const handle: RouteHandle = { title: route.meta.title, path: route.path };
    const lazy = lazyPage(route.component);

    // `/` 是根布局的 index；其余去掉前导 /，成为相对 path
    if (route.path === '/') {
      return [{ index: true, handle, lazy }, ...children];
    }

    return [{ path: route.path.slice(1), handle, lazy }, ...children];
  });
}
