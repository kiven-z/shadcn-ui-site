import { useTranslation } from 'react-i18next';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { HeaderBreadcrumb } from '@/layouts/layout-header/components/header-breadcrumb.tsx';

export function LayoutHeader() {
  const { t } = useTranslation();

  return (
    <header className="sticky z-20 flex h-12 items-center gap-2 border-b px-4">
      <SidebarTrigger aria-label={t('nav.sidebarToggle')} />
      <Separator orientation="vertical" />
      <HeaderBreadcrumb />
    </header>
  );
}
