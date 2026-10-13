import { useTranslation } from 'react-i18next';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { HeaderBreadcrumb } from '@/layouts/layout-header/components/header-breadcrumb.tsx';

export function LayoutHeader() {
  const { t } = useTranslation();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b px-3 sm:px-4">
      <SidebarTrigger aria-label={t('nav.sidebarToggle')} />
      <Separator className="mx-2 data-[orientation=vertical]:h-4" orientation="vertical" />
      <HeaderBreadcrumb />
    </header>
  );
}
