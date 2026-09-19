import type { ReactNode } from 'react';

import { createContext, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PreferencesPanel } from './preferences-panel';

import { Drawer } from '@/components/ui/drawer';

interface PreferencesDrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PreferencesDrawerContext = createContext<PreferencesDrawerContextValue | null>(null);

export function usePreferencesDrawer() {
  const context = useContext(PreferencesDrawerContext);

  if (!context) {
    throw new Error('usePreferencesDrawer must be used within a PreferencesDrawerProvider.');
  }

  return context;
}

/** 布局持有偏好抽屉的 `open`，顶栏与侧栏入口共用同一棵 Drawer */
export function PreferencesDrawerProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <PreferencesDrawerContext.Provider value={value}>
      {children}
      <Drawer hideFooter open={open} title={t('panel.systemSettings')} onOpenChange={setOpen}>
        <PreferencesPanel />
      </Drawer>
    </PreferencesDrawerContext.Provider>
  );
}
