import { useTranslation } from 'react-i18next';
import { Settings } from 'lucide-react';

import Translate from '~icons/ri/translate';

import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { LOCALES } from '@/config/locale-config.ts';
import { openPreferencesDrawer } from '@/layouts/_shared/preferences-panel';
import { useLocalePreferencesStore } from '@/store/preferences/locale-preferences.ts';

/** 顶栏偏好入口：语言下拉 + 打开设置抽屉 */
export function NavbarPreferences() {
  const { t } = useTranslation();
  const locale = useLocalePreferencesStore((state) => state.locale);
  const setLocale = useLocalePreferencesStore((state) => state.setLocale);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label={t('panel.locale.title')} size="icon-sm" variant="ghost">
            <Translate aria-hidden className="size-4 text-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup value={locale} onValueChange={setLocale}>
            {LOCALES.map(({ locale: localeId, label }) => (
              <DropdownMenuRadioItem key={localeId} value={localeId}>
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button aria-label={t('panel.systemSettings')} size="icon-sm" variant="ghost" onClick={openPreferencesDrawer}>
        <Settings />
      </Button>
    </>
  );
}
