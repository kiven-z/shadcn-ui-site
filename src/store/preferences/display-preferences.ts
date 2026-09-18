import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DisplayPreferencesState {
  /** 灰色模式 */
  grey: boolean;
  /** 色弱模式 */
  weak: boolean;
  /** 设置灰色模式 */
  setGrey: (value: boolean) => void;
  /** 设置色弱模式 */
  setWeak: (value: boolean) => void;
  /** 应用灰色 / 色弱到 DOM */
  applyToDom: () => void;
}

/** 界面显示偏好（ui.display） */
export const useDisplayPreferencesStore = create<DisplayPreferencesState>()(
  persist(
    (set, get) => ({
      grey: false,
      weak: false,

      setGrey: (value) => {
        set({ grey: value });
        get().applyToDom();
      },

      setWeak: (value) => {
        set({ weak: value });
        get().applyToDom();
      },

      applyToDom: () => {
        const { grey, weak } = get();
        const html = document.documentElement;

        html.classList.toggle('html-grey', grey);
        html.classList.toggle('html-weakness', weak);
      },
    }),
    {
      name: 'ui.display',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ grey: state.grey, weak: state.weak }),
    }
  )
);
