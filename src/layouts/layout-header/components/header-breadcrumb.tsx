import { useLocation } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { siteConfig } from '@/config/site';

function resolveBreadcrumbLabel(pathname: string): string | undefined {
  const fromNav = siteConfig.navItems.find((item) => {
    if (item.href === '/') {
      return pathname === '/';
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  });

  return fromNav?.label;
}

export function HeaderBreadcrumb() {
  const pathname = useLocation().pathname;
  const label = resolveBreadcrumbLabel(pathname) ?? siteConfig.name;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
