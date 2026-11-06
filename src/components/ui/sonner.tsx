import type { CSSProperties } from 'react';

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

import { useThemePreferencesStore } from '@/store/preferences/theme-preferences';

function resolveToasterTheme(colorScheme: string, osPrefersDark: boolean): NonNullable<ToasterProps['theme']> {
  if (colorScheme === 'dark') {
    return 'dark';
  }

  if (colorScheme === 'light') {
    return 'light';
  }

  return osPrefersDark ? 'dark' : 'light';
}

const Toaster = ({ ...props }: ToasterProps) => {
  const colorScheme = useThemePreferencesStore((state) => state.colorScheme);
  const osPrefersDark = useThemePreferencesStore((state) => state.osPrefersDark);
  const theme = resolveToasterTheme(colorScheme, osPrefersDark);

  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as CSSProperties
      }
      theme={theme}
      toastOptions={{
        classNames: {
          toast: 'cn-toast',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
