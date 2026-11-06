import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { APP_CONFIG } from '@/config/app-config';

const DIRECTION_SET = new Set<string>(APP_CONFIG.directionItems.map((item) => item.id));

interface DirectionPreferencesState {
  /** 文档方向 */
  direction: string;
  /** 设置文档方向 */
  setDirection: (value: string) => void;
  /** 应用方向到 DOM */
  applyToDom: () => void;
}

/** 文档方向偏好（ui.direction） */
export const useDirectionPreferencesStore = create<DirectionPreferencesState>()(
  persist(
    (set, get) => ({
      direction: APP_CONFIG.directionItems[0].id,

      setDirection: (value) => {
        if (!DIRECTION_SET.has(value)) {
          return;
        }

        set({ direction: value });
        get().applyToDom();
      },

      applyToDom: () => {
        document.documentElement.dir = get().direction;
      },
    }),
    {
      name: 'ui.direction',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ direction: state.direction }),
    }
  )
);
