import { useTranslation } from 'react-i18next';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { HeaderBreadcrumb } from '@/layouts/layout-header/components/header-breadcrumb.tsx';
import { cn } from '@/lib/utils';
import { useLayoutPreferencesStore } from '@/store/preferences/layout-preferences';

export function LayoutHeader() {
  const { t } = useTranslation();
  const layout = useLayoutPreferencesStore((state) => state.layout);

  return (
    <header
      className={cn(
        'flex shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear',
        layout === 'icon' ? 'h-16 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12' : 'h-(--header-height)'
      )}
    >
      <SidebarTrigger aria-label={t('nav.sidebarToggle')} className="-ms-1" />
      <Separator className="mx-2 data-[orientation=vertical]:h-4" orientation="vertical" />
      <HeaderBreadcrumb />
    </header>
  );
}
