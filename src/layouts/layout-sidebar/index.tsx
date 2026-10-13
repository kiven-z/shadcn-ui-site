import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { siteConfig } from '@/config/site';
import { LayoutSidebarNavMain } from '@/layouts/layout-sidebar/components/nav-main';
import { LayoutSidebarNavUser } from '@/layouts/layout-sidebar/components/nav-user';
import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';
import { useLayoutPreferencesStore } from '@/store/preferences/layout-preferences';

export function LayoutSidebar() {
  const { t } = useTranslation();
  const direction = useDirectionPreferencesStore((state) => state.direction);
  const layout = useLayoutPreferencesStore((state) => state.layout);

  return (
    <Sidebar collapsible={layout} dir={direction} side={direction === 'rtl' ? 'right' : 'left'} variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link to="/">
                <img alt="" className="size-5" src="/logo.svg" />
                <span className="truncate text-base font-semibold">{siteConfig.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <LayoutSidebarNavMain />
      </SidebarContent>

      <SidebarFooter>
        <LayoutSidebarNavUser />
      </SidebarFooter>
      <SidebarRail aria-label={t('nav.sidebarToggle')} />
    </Sidebar>
  );
}
