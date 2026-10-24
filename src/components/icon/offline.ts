import type { ComponentType, SVGProps } from 'react';

import Apps2Line from '~icons/ri/apps-2-line';
import ComputerLine from '~icons/ri/computer-line';
import MoonLine from '~icons/ri/moon-line';
import Notification3Line from '~icons/ri/notification-3-line';
import SunLine from '~icons/ri/sun-line';
import Table2 from '~icons/ri/table-2';
import TextDirectionL from '~icons/ri/text-direction-l';
import TextDirectionR from '~icons/ri/text-direction-r';
import Translate from '~icons/ri/translate';

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

/** 配置字符串 → unplugin 编译产物。壳层常用图标只改这里。 */
export const OFFLINE_ICONS: Record<string, SvgIcon> = {
  'ri:apps-2-line': Apps2Line,
  'ri:computer-line': ComputerLine,
  'ri:moon-line': MoonLine,
  'ri:notification-3-line': Notification3Line,
  'ri:sun-line': SunLine,
  'ri:table-2': Table2,
  'ri:text-direction-l': TextDirectionL,
  'ri:text-direction-r': TextDirectionR,
  'ri:translate': Translate,
};
