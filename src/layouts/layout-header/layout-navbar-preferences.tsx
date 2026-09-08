import { useTranslation } from 'react-i18next';

import TextDirectionL from '~icons/ri/text-direction-l';
import TextDirectionR from '~icons/ri/text-direction-r';
import Translate from '~icons/ri/translate';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { DIRECTION_ITEMS, LOCALES } from '@/config/locale-config';
import { THEMES } from '@/config/ui-config';
import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';
import { useLocalePreferencesStore } from '@/store/preferences/locale-preferences';
import { useThemePreferencesStore } from '@/store/preferences/theme-preferences';

/** 顶栏偏好：主题 / 语言 / 文档方向 */
export function LayoutNavbarPreferences() {
  const { t } = useTranslation();

  const locale = useLocalePreferencesStore((state) => state.locale);
  const setLocale = useLocalePreferencesStore((state) => state.setLocale);

  const direction = useDirectionPreferencesStore((state) => state.direction);
  const setDirection = useDirectionPreferencesStore((state) => state.setDirection);
  const DirectionTriggerIcon = direction === 'rtl' ? TextDirectionR : TextDirectionL;

  const colorScheme = useThemePreferencesStore((state) => state.colorScheme);
  const setColorScheme = useThemePreferencesStore((state) => state.setColorScheme);
  const triggerIcon = THEMES.find((item) => item.id === colorScheme)?.icon ?? 'ri:sun-line';

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label={t('panel.theme.title')} size="icon-sm" variant="ghost">
            <Icon className="size-4 text-foreground" name={triggerIcon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup value={colorScheme} onValueChange={setColorScheme}>
            {THEMES.map(({ id, icon }) => (
              <DropdownMenuRadioItem key={id} value={id}>
                <Icon className="size-4" name={icon} />
                {t(`panel.theme.${id}`)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label={t('panel.locale.title')} size="icon-sm" variant="ghost">
            <Translate aria-hidden className="size-4 text-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {LOCALES.map(({ locale: localeId, label }) => (
            <DropdownMenuItem key={localeId} onClick={() => setLocale(localeId)}>
              {label}
              {locale === localeId ? <span className="ms-auto text-xs text-muted-foreground">✓</span> : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label={t('panel.direction.title')} size="icon-sm" variant="ghost">
            <DirectionTriggerIcon aria-hidden className="size-4 text-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup value={direction} onValueChange={setDirection}>
            {DIRECTION_ITEMS.map(({ id, icon }) => (
              <DropdownMenuRadioItem key={id} value={id}>
                <Icon className="size-4" name={icon} />
                {t(`panel.direction.${id}`)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
