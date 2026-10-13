import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';
import { useDisplayPreferencesStore } from '@/store/preferences/display-preferences';
import { useLayoutPreferencesStore } from '@/store/preferences/layout-preferences';
import { useLocalePreferencesStore } from '@/store/preferences/locale-preferences';
import { useThemePreferencesStore } from '@/store/preferences/theme-preferences';

interface PersistHydrationApi {
  persist: {
    hasHydrated: () => boolean;
    onFinishHydration: (fn: () => void) => () => void;
  };
}

function waitHydrated(store: PersistHydrationApi): Promise<void> {
  return new Promise((resolve) => {
    const unsub = store.persist.onFinishHydration(() => {
      resolve();
    });

    if (store.persist.hasHydrated()) {
      unsub();
      resolve();
    }
  });
}

/**
 * 等待各偏好 store 水合完成后，将 UI 偏好应用到 DOM（冷启动入口）
 */
export async function applyHydratedUiPreferences(): Promise<void> {
  await Promise.all([
    waitHydrated(useThemePreferencesStore),
    waitHydrated(useLocalePreferencesStore),
    waitHydrated(useDirectionPreferencesStore),
    waitHydrated(useLayoutPreferencesStore),
    waitHydrated(useDisplayPreferencesStore),
  ]);

  const theme = useThemePreferencesStore.getState();
  const locale = useLocalePreferencesStore.getState();
  const direction = useDirectionPreferencesStore.getState();
  const display = useDisplayPreferencesStore.getState();

  theme.applyToDom();
  theme.startSystemThemeWatch();
  locale.applyToDom();
  direction.applyToDom();
  display.applyToDom();
}
