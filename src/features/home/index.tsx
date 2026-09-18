import { HomeDialogDemo } from './home-dialog-demo';
import { HomeDrawerDemo } from './home-drawer-demo';

import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <section className="flex flex-col items-start justify-center gap-6 py-8 md:py-10">
      <div className="inline-block max-w-xl">
        <h1 className="inline text-3xl font-semibold tracking-tight sm:text-[2.3rem] lg:text-5xl">shadcn-ui-site</h1>
        <p className="mt-4 mb-2 block w-full max-w-full text-base text-muted-foreground sm:text-lg md:w-1/2 lg:text-xl">
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
