import type { AppRoute } from './types';

export interface MenuLink {
  title: string;
  icon?: string;
  path: string;
}

export interface MenuGroup {
  title: string;
  icon?: string;
  children: MenuLink[];
}

export type MenuItem = MenuLink | MenuGroup;

export function toMenu(routes: AppRoute[]): MenuItem[] {
  return [...routes]
    .sort((a, b) => (a.meta.order ?? 0) - (b.meta.order ?? 0))
    .flatMap((route): MenuItem[] => {
      // 隐藏项不进菜单
      if (route.meta.hideInMenu) {
        return [];
      }

      const children = route.children ? toMenu(route.children) : [];

      // 页面：绝对 path，且不能再挂子菜单
      if (route.component) {
        if (!route.path || !route.path.startsWith('/')) {
          throw new Error(`Page route ${route.name} path must start with /`);
        }

        if (children.length > 0) {
          throw new Error(`Page route ${route.name} cannot contain menu children`);
        }

        return [{ title: route.meta.title, icon: route.meta.icon, path: route.path }];
      }

      // 目录：只收叶子链接；没有可见子项则整组不出现
      const links: MenuLink[] = [];

      for (const child of children) {
        if (!('path' in child)) {
          throw new Error(`Menu group ${route.name} cannot contain nested groups`);
        }

        links.push(child);
      }

      if (links.length === 0) {
        return [];
      }

      return [{ title: route.meta.title, icon: route.meta.icon, children: links }];
    });
}
