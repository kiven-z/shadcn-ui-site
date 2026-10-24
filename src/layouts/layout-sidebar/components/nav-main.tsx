import type { MenuGroup } from '@/router/access/menu';

import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import ArrowRightSLine from '~icons/ri/arrow-right-s-line';

import { Icon } from '@/components/icon';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { isNavHrefActive } from '@/layouts/_shared/utils/nav-href';
import { staticMenu } from '@/router/routes/static';
import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';

function NavGroup({
  item,
  pathname,
  tooltipSide,
  onNavigate,
}: {
  item: MenuGroup;
  pathname: string;
  tooltipSide: 'left' | 'right';
  onNavigate: () => void;
}) {
  const routeOpen = item.children.some((sub) => isNavHrefActive(pathname, sub.path));
  const [open, setOpen] = useState(routeOpen);
  const [trackedPath, setTrackedPath] = useState(pathname);

  if (pathname !== trackedPath) {
    setTrackedPath(pathname);
    if (routeOpen) {
      setOpen(true);
    }
  }

  return (
    <Collapsible asChild className="group/collapsible" open={open} onOpenChange={setOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton isActive={routeOpen} tooltip={{ children: item.title, side: tooltipSide }}>
            {item.icon ? <Icon name={item.icon} /> : null}
            <span>{item.title}</span>
            <ArrowRightSLine className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180 rtl:group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((subItem) => (
              <SidebarMenuSubItem key={subItem.path}>
                <SidebarMenuSubButton asChild isActive={isNavHrefActive(pathname, subItem.path)}>
                  <NavLink end={subItem.path === '/'} to={subItem.path} onClick={onNavigate}>
                    <span>{subItem.title}</span>
                  </NavLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function LayoutSidebarNavMain() {
  const pathname = useLocation().pathname;
  const { setOpenMobile } = useSidebar();
  const direction = useDirectionPreferencesStore((state) => state.direction);
  const tooltipSide = direction === 'rtl' ? 'left' : 'right';

  return (
    <SidebarGroup>
      <SidebarMenu>
        {staticMenu.map((item) => {
          if ('children' in item) {
            return (
              <NavGroup
                key={item.title}
                item={item}
                pathname={pathname}
                tooltipSide={tooltipSide}
                onNavigate={() => setOpenMobile(false)}
              />
            );
          }

          return (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={isNavHrefActive(pathname, item.path)}
                tooltip={{ children: item.title, side: tooltipSide }}
              >
                <NavLink end={item.path === '/'} to={item.path} onClick={() => setOpenMobile(false)}>
                  {item.icon ? <Icon name={item.icon} /> : null}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
