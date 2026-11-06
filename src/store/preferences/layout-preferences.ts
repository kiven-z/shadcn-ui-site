import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { APP_CONFIG } from '@/config/app-config';

function isLayoutMode(value: string) {
  const LAYOUT_MODE_SET = new Set<string>(APP_CONFIG.layouts.map((item) => item.id));

  return LAYOUT_MODE_SET.has(value);
}

interface LayoutPreferencesState {
  /** 侧栏收起方式 */
  layout: string;
  /** 设置侧栏收起方式 */
  setLayout: (value: string) => void;
}

/** 布局偏好（ui.layout） */
export const useLayoutPreferencesStore = create<LayoutPreferencesState>()(
  persist(
    (set) => ({
      layout: APP_CONFIG.layouts[0].id,

      setLayout: (value) => {
        if (!isLayoutMode(value)) {
          return;
        }

        set({ layout: value });
      },
    }),
    {
      name: 'ui.layout',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ layout: state.layout }),
    }
  )
);
