import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { i18n } from '@/app/i18n';
import { APP_CONFIG } from '@/config/app-config';

const LOCALE_SET = new Set<string>(APP_CONFIG.locales.map((item) => item.locale));

interface LocalePreferencesState {
  /** 界面语言 */
  locale: string;
  /** 设置界面语言 */
  setLocale: (value: string) => void;
  /** 应用语言到 i18n 与 DOM */
  applyToDom: () => void;
}

/** 语言偏好（ui.locale） */
export const useLocalePreferencesStore = create<LocalePreferencesState>()(
  persist(
    (set, get) => ({
      locale: APP_CONFIG.locales[0].locale,

      setLocale: (value) => {
        if (!LOCALE_SET.has(value)) {
          return;
        }

        set({ locale: value });
        get().applyToDom();
      },

      applyToDom: () => {
        const { locale } = get();

        void i18n.changeLanguage(locale);
        document.documentElement.lang = locale;
      },
    }),
    {
      name: 'ui.locale',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ locale: state.locale }),
    }
  )
);
