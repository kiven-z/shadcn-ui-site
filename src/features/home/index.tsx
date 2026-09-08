import { HomeDialogDemo } from './home-dialog-demo';
import { HomeDrawerDemo } from './home-drawer-demo';

import { Button } from '@/components/ui/button';
import { subtitle, title } from '@/components/primitives';

export default function HomePage() {
  return (
    <section className="flex flex-col items-start justify-center gap-6 py-8 md:py-10">
      <div className="inline-block max-w-xl">
        <h1 className={title()}>shadcn-ui-site</h1>
        <p className={subtitle({ class: 'mt-4' })}>
          Vite + React + shadcn/ui site starter. Dialog and Drawer hosts are mounted at the app root, alongside the
          route tree.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <HomeDialogDemo />
      <HomeDrawerDemo />
    </section>
  );
}
