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
  const tooltipSide = direction === 'rtl' ? 'left' : 'right';

  return (
    <Sidebar collapsible={layout} dir={direction} side={direction === 'rtl' ? 'right' : 'left'} variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip={{ children: siteConfig.name, side: tooltipSide }}>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <span
                    aria-hidden
                    className="size-4 bg-current mask-[url(/logo.svg)] mask-alpha mask-contain mask-center mask-no-repeat"
                  />
                </div>
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-medium">{siteConfig.name}</span>
                  <span className="truncate text-xs">{siteConfig.description}</span>
                </div>
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
