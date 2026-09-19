# shadcn-ui-site

[English](README.md) | [中文](README.zh-CN.md)

A site skeleton built with Vite, React, and shadcn/ui. Dialogs and drawers are controlled with `open` / `onOpenChange`.
Confirm and warning dialogs can also be opened with `useDialog()`.

## Tech Stack

- Runtime and language: [Node.js](https://nodejs.org/); [TypeScript](https://www.typescriptlang.org) (strict)
- Package manager: pnpm (preinstall check; pnpm only)
- Build: [Vite](https://vitejs.dev/guide/); production code splitting with Gzip / Brotli compression
- Framework: [React](https://react.dev/); [React Router](https://reactrouter.com/) (`createBrowserRouter`, lazy-loaded
  routes)
- UI: [shadcn/ui](https://ui.shadcn.com) (Radix Nova)
- Styling: [Tailwind CSS v4](https://tailwindcss.com); class-variance-authority; clsx; tailwind-merge
- Table: [TanStack Table](https://tanstack.com/table)
- State: Zustand (persist)
- Internationalization: i18next; YAML message catalogs
- Icons: unplugin-icons; Iconify; Lucide (shadcn primitives)
- Tooling: ESLint; Prettier; [shadcn MCP](https://ui.shadcn.com/docs/mcp) (Cursor)

## Features

- Admin shell: collapsible sidebar (icon mode; mobile Sheet), header toolbar, main content, and footer
- Global host: Toast mounted at the application root, alongside the route tree
- Controlled Dialog: `open` / `onOpenChange`; sizes, backdrop and Escape controls, caller-owned confirm loading
- Imperative confirm: `useDialog().confirm` / `warning`; `onOk` may return a Promise (reject keeps the dialog open);
  instance `destroy` / `update`; one dialog at a time
- Controlled Drawer: `open` / `onOpenChange`; four-edge placement via Sheet; preferences drawer is owned by the layout
- Data table: column-driven; TanStack Table + shadcn Table; controlled pagination, row selection, loading and empty
  states
- Pagination state: fetch, page change, and selection; Toast on failure
- UI preferences (persisted locally, applied to the DOM after hydration): light / dark / system; Simplified Chinese /
  English; LTR / RTL
- Icons: static icons in components use build-time artifacts; configured names prefer an offline map, with Iconify as
  fallback
- HTTP error pages: 403, 404, 500

## Requirements

- Node.js `^20.19.0` or `>=22.13.0`
- pnpm `>=10.26.0`

## Usage

```bash
pnpm install
pnpm dev
```

Production build:

```bash
pnpm build
pnpm preview
```
