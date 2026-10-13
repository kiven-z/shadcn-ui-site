import { NavLink, useLocation } from 'react-router-dom';

import { Icon } from '@/components/ui/icon';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { siteConfig } from '@/config/site';
import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';

function isNavActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function LayoutSidebarNavMain() {
  const pathname = useLocation().pathname;
  const { setOpenMobile } = useSidebar();
  const direction = useDirectionPreferencesStore((state) => state.direction);
  const tooltipSide = direction === 'rtl' ? 'left' : 'right';

  return (
    <SidebarGroup>
      <SidebarMenu>
        {siteConfig.navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={isNavActive(pathname, item.href)}
              tooltip={{ children: item.label, side: tooltipSide }}
            >
              <NavLink end={item.href === '/'} to={item.href} onClick={() => setOpenMobile(false)}>
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
