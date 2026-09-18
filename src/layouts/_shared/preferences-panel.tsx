import { useTranslation } from 'react-i18next';

import { i18n } from '@/app/i18n';
import { addDrawer } from '@/components/ui/drawer';
import { Icon } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { DIRECTION_ITEMS } from '@/config/locale-config';
import { THEMES } from '@/config/ui-config';
import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';
import { useDisplayPreferencesStore } from '@/store/preferences/display-preferences';
import { useThemePreferencesStore } from '@/store/preferences/theme-preferences';

/**
 * 打开系统偏好抽屉
 */
export function openPreferencesDrawer() {
  addDrawer({
    title: i18n.t('panel.systemSettings'),
    content: <PreferencesPanel />,
    hideFooter: true,
  });
}

/** 偏好抽屉正文：主题 / 文档方向 / 灰色与色弱 */
function PreferencesPanel() {
  const { t } = useTranslation();

  const direction = useDirectionPreferencesStore((state) => state.direction);
  const setDirection = useDirectionPreferencesStore((state) => state.setDirection);

  const colorScheme = useThemePreferencesStore((state) => state.colorScheme);
  const setColorScheme = useThemePreferencesStore((state) => state.setColorScheme);

  const grey = useDisplayPreferencesStore((state) => state.grey);
  const weak = useDisplayPreferencesStore((state) => state.weak);
  const setGrey = useDisplayPreferencesStore((state) => state.setGrey);
  const setWeak = useDisplayPreferencesStore((state) => state.setWeak);

  return (
    <div className="flex flex-col gap-6 pb-4">
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
