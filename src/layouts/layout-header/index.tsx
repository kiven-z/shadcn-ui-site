import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

import MenuLine from '~icons/ri/menu-line';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';
import { LayoutDrawerPreferences } from '@/layouts/layout-header/layout-drawer-preferences';
import { LayoutNavbarAvatar } from '@/layouts/layout-header/layout-navbar-avatar';
import { LayoutNavbarPreferences } from '@/layouts/layout-header/layout-navbar-preferences';
import { useDirectionPreferencesStore } from '@/store/preferences/direction-preferences';

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return clsx(
    'text-sm transition-colors',
    isActive ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'
  );
}

export function LayoutHeader() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const direction = useDirectionPreferencesStore((state) => state.direction);

  return (
    <header className="sticky top-4 z-40 px-3 sm:px-6">
      <nav className="mx-auto flex h-14 items-center justify-between rounded-2xl border bg-card px-3 shadow-sm">
        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <Button
            aria-expanded={menuOpen}
            aria-label={t('nav.menu')}
            className="md:hidden"
            size="icon-sm"
            variant="ghost"
            onClick={() => setMenuOpen(true)}
          >
            <MenuLine aria-hidden className="size-4 text-foreground" />
          </Button>

          <Link className="flex min-w-0 shrink-0 items-center gap-2 text-foreground" to="/">
            <img alt="" className="size-7" src="/logo.svg" />
            <span className="truncate text-base font-semibold tracking-tight">{siteConfig.name}</span>
          </Link>
        </div>

        <ul className="hidden items-center gap-6 md:flex">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <NavLink className={navLinkClassName} end={item.href === '/'} to={item.href}>
                {t(item.labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1">
          <div className="hidden md:flex">
            <LayoutNavbarPreferences />
          </div>
          <LayoutNavbarAvatar />
        </div>
      </nav>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side={direction === 'rtl' ? 'right' : 'left'}>
          <SheetHeader>
            <SheetTitle>{t('nav.menu')}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-4">
            <ul className="flex flex-col gap-1">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    className={({ isActive }) => clsx(navLinkClassName({ isActive }), 'block rounded-xl px-3 py-2.5')}
                    end={item.href === '/'}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(item.labelKey)}
                  </NavLink>
                </li>
              ))}
            </ul>
            <LayoutDrawerPreferences />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
