import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Icon } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { DIRECTION_ITEMS, LOCALES } from '@/config/locale-config';
import { LAYOUTS, THEMES } from '@/config/ui-config';
import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';
import { useDisplayPreferencesStore } from '@/store/preferences/display-preferences';
import { useLayoutPreferencesStore } from '@/store/preferences/layout-preferences';
import { useLocalePreferencesStore } from '@/store/preferences/locale-preferences.ts';
import { useThemePreferencesStore } from '@/store/preferences/theme-preferences';

/** 偏好抽屉正文 */
export function PreferencesPanel() {
  const { t } = useTranslation();

  /** 语言 */
  const locale = useLocalePreferencesStore((state) => state.locale);
  const setLocale = useLocalePreferencesStore((state) => state.setLocale);

  /** 文档方向 */
  const direction = useDirectionPreferencesStore((state) => state.direction);
  const setDirection = useDirectionPreferencesStore((state) => state.setDirection);

  /** 布局 */
  const layout = useLayoutPreferencesStore((state) => state.layout);
  const setLayout = useLayoutPreferencesStore((state) => state.setLayout);

  /** 主题 */
  const colorScheme = useThemePreferencesStore((state) => state.colorScheme);
  const setColorScheme = useThemePreferencesStore((state) => state.setColorScheme);

  /** 灰色与色弱 */
  const grey = useDisplayPreferencesStore((state) => state.grey);
  const setGrey = useDisplayPreferencesStore((state) => state.setGrey);

  /** 色弱 */
  const weak = useDisplayPreferencesStore((state) => state.weak);
  const setWeak = useDisplayPreferencesStore((state) => state.setWeak);

  return (
    <div className="flex flex-col gap-6 pb-4">
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium">{t('panel.locale.title')}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label={t('panel.locale.title')} variant="outline">
              {LOCALES.find((l) => l.locale === locale)?.label}
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
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium">{t('panel.theme.title')}</h3>
        <ToggleGroup
          aria-label={t('panel.theme.title')}
          className="w-full"
          spacing={0}
          type="single"
          value={colorScheme}
          variant="outline"
          onValueChange={setColorScheme}
        >
          {THEMES.map(({ id, icon }) => (
            <ToggleGroupItem key={id} className="flex-1" value={id}>
              <Icon className="size-4" name={icon} />
              {t(`panel.theme.${id}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium">{t('panel.layout.title')}</h3>
        <ToggleGroup
          aria-label={t('panel.layout.title')}
          className="w-full"
          spacing={0}
          type="single"
          value={layout}
          variant="outline"
          onValueChange={setLayout}
        >
          {LAYOUTS.map(({ id, icon: LayoutIcon }) => (
            // h-auto! flex-1 flex-col gap-1.5 py-2 text-center whitespace-normal!
            <ToggleGroupItem
              key={id}
              className="flex h-auto flex-1 flex-col items-center justify-around gap-1.5 py-2"
              value={id}
            >
              <LayoutIcon aria-hidden className="h-11! w-14!" />
              {t(`panel.layout.${id}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium">{t('panel.direction.title')}</h3>
        <ToggleGroup
          aria-label={t('panel.direction.title')}
          className="w-full"
          spacing={0}
          type="single"
          value={direction}
          variant="outline"
          onValueChange={setDirection}
        >
          {DIRECTION_ITEMS.map(({ id, icon }) => (
            <ToggleGroupItem key={id} className="flex-1" value={id}>
              <Icon className="size-4" name={icon} />
              {t(`panel.direction.${id}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>

      <Separator />

      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium">{t('panel.display.title')}</h3>
        <div className="flex items-center justify-between gap-4">
          <Label className="font-normal" htmlFor="pref-grey">
            {t('panel.display.grey')}
          </Label>
          <Switch checked={grey} id="pref-grey" onCheckedChange={setGrey} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label className="font-normal" htmlFor="pref-weak">
            {t('panel.display.weak')}
          </Label>
          <Switch checked={weak} id="pref-weak" onCheckedChange={setWeak} />
        </div>
      </section>
    </div>
  );
}
