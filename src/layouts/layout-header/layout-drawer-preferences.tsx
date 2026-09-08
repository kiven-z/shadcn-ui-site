import { useTranslation } from 'react-i18next';

import { Icon } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { DIRECTION_ITEMS, LOCALES } from '@/config/locale-config';
import { THEMES } from '@/config/ui-config';
import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';
import { useLocalePreferencesStore } from '@/store/preferences/locale-preferences';
import { useThemePreferencesStore } from '@/store/preferences/theme-preferences';

/** 抽屉内偏好：主题 / 语言 / 文档方向 */
export function LayoutDrawerPreferences() {
  const { t } = useTranslation();

  const locale = useLocalePreferencesStore((state) => state.locale);
  const setLocale = useLocalePreferencesStore((state) => state.setLocale);

  const direction = useDirectionPreferencesStore((state) => state.direction);
  const setDirection = useDirectionPreferencesStore((state) => state.setDirection);

  const colorScheme = useThemePreferencesStore((state) => state.colorScheme);
  const setColorScheme = useThemePreferencesStore((state) => state.setColorScheme);

  return (
    <div className="mt-4 flex flex-col gap-4">
      <Separator />

      <div className="flex flex-col gap-2">
        <span className="px-1 text-xs font-medium text-muted-foreground">{t('panel.theme.title')}</span>
        <ToggleGroup
          className="w-full"
          type="single"
          value={colorScheme}
          variant="outline"
          onValueChange={(value) => {
            if (value) {
              setColorScheme(value);
            }
          }}
        >
          {THEMES.map(({ id, icon }) => (
            <ToggleGroupItem key={id} aria-label={t(`panel.theme.${id}`)} className="flex-1 gap-1.5" value={id}>
              <Icon className="size-3.5" name={icon} />
              {t(`panel.theme.${id}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="px-1 text-xs font-medium text-muted-foreground">{t('panel.locale.title')}</Label>
        <Select value={locale} onValueChange={setLocale}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LOCALES.map(({ locale: localeId, label }) => (
              <SelectItem key={localeId} value={localeId}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <span className="px-1 text-xs font-medium text-muted-foreground">{t('panel.direction.title')}</span>
        <ToggleGroup
          className="w-full"
          type="single"
          value={direction}
          variant="outline"
          onValueChange={(value) => {
            if (value) {
              setDirection(value);
            }
          }}
        >
          {DIRECTION_ITEMS.map(({ id, icon }) => (
            <ToggleGroupItem key={id} aria-label={t(`panel.direction.${id}`)} className="flex-1 gap-1.5" value={id}>
              <Icon className="size-3.5" name={icon} />
              {t(`panel.direction.${id}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}
