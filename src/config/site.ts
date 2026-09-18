export const siteConfig = {
  name: 'shadcn-ui-site',
  description: 'Vite + React + shadcn/ui site',
  user: {
    name: 'shadcn',
    email: 'm@example.com',
  },
  navItems: [
    { label: 'Features', href: '/', icon: 'ri:apps-2-line' },
    { label: 'Table', href: '/data-table', icon: 'ri:table-2' },
  ],
} as const;
