import { DataTableDemo } from './data-table-demo';

export default function DataTablePage() {
  return (
    <section className="flex w-full flex-col items-start gap-6 py-8 md:py-10">
      <div className="max-w-xl">
        <h1 className="inline text-3xl font-semibold tracking-tight sm:text-[2.3rem] lg:text-5xl">Table</h1>
        <p className="mt-4 mb-2 block w-full max-w-full text-base text-muted-foreground sm:text-lg md:w-1/2 lg:text-xl">
          Column-driven table with controlled pagination.
        </p>
      </div>

      <DataTableDemo />
    </section>
  );
}
