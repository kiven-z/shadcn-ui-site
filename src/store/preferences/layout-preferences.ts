import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { DEFAULT_LAYOUT_MODE, LAYOUTS } from '@/config/ui-config';

function isLayoutMode(value: string) {
  const LAYOUT_MODE_SET = new Set<string>(LAYOUTS.map((item) => item.id));

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
      layout: DEFAULT_LAYOUT_MODE,

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
