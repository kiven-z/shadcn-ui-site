import type { ReactNode } from 'react';

import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/app/i18n';
import { DialogProvider } from '@/components/ui/dialog';
import { DirectionProvider } from '@/components/ui/direction';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';

export function Provider({ children }: { children: ReactNode }) {
  const direction = useDirectionPreferencesStore((state) => state.direction);

  return (
    <I18nextProvider i18n={i18n}>
      <DirectionProvider dir={direction}>
        <TooltipProvider>
          <DialogProvider>{children}</DialogProvider>
        </TooltipProvider>
      </DirectionProvider>
    </I18nextProvider>
  );
}
