import type { CSSProperties } from 'react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { LayoutFooter } from '@/layouts/layout-footer';
import { LayoutHeader } from '@/layouts/layout-header';
import { LayoutMain } from '@/layouts/layout-main';
import { LayoutSidebar } from '@/layouts/layout-sidebar';

function readSidebarCookieOpen(): boolean {
  const match = document.cookie.match(/(?:^|; )sidebar_state=(true|false)(?:;|$)/);

  if (!match) {
    return true;
  }

  return match[1] === 'true';
}

export default function DefaultLayout() {
  return (
    <SidebarProvider
      defaultOpen={readSidebarCookieOpen()}
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as CSSProperties
      }
    >
      <LayoutSidebar />
      <SidebarInset>
        <LayoutHeader />
        <LayoutMain />
        <LayoutFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
