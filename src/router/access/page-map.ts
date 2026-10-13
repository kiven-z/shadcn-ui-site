import type { ComponentType } from 'react';

interface FeaturePageModule {
  default: ComponentType;
}

const pageModules = import.meta.glob<FeaturePageModule>('/src/features/**/index.tsx');

/**
 * 懒加载组件
 * @param component 组件路径
 * @returns 组件
 */
export function lazyPage(component: string) {
  const loader = pageModules[`/src/features${component}.tsx`];

  if (!loader) {
    throw new Error(`Missing page module for component ${component}`);
  }

  return () => loader().then((module) => ({ Component: module.default }));
}
