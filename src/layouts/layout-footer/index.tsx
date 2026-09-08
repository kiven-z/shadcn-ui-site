export function LayoutFooter() {
  return (
    <footer className="flex w-full items-center justify-center py-3">
      <a
        className="flex items-center gap-1 text-current no-underline"
        href="https://ui.shadcn.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="text-muted-foreground">Powered by</span>
        <p className="font-medium text-foreground">shadcn/ui</p>
      </a>
    </footer>
  );
}
