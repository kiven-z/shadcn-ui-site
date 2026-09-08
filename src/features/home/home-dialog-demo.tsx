import { Button } from '@/components/ui/button';
import { addDialog } from '@/components/ui/dialog';

/** Confirm stays pending until `beforeSure` resolves, then closes. */
function openConfirmLoadingDialog() {
  addDialog({
    title: 'Confirm loading',
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Press Confirm. The button shows a spinner for 400ms, then the dialog closes.</li>
        <li>Cancel, the X, the backdrop, and Escape still close immediately.</li>
      </ol>
    ),
    beforeSure: async (done) => {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 400);
      });
      done();
    },
  });
}

/** Footer hidden. Default dismiss: X, backdrop, and Escape. */
function openFooterLessDialog() {
  addDialog({
    title: 'No footer',
    hideFooter: true,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>The footer is hidden.</li>
        <li>Close with the X, the backdrop, or Escape.</li>
      </ol>
    ),
  });
}

/** Backdrop click does not close. X and Escape still do. */
function openBackdropLockedDialog() {
  addDialog({
    title: 'Backdrop locked',
    hideFooter: true,
    isDismissable: false,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Clicking the backdrop does not close this dialog.</li>
        <li>Close with the X or Escape.</li>
      </ol>
    ),
  });
}

/** Escape does not close. X and backdrop still do. */
function openEscapeLockedDialog() {
  addDialog({
    title: 'Escape locked',
    hideFooter: true,
    isKeyboardDismissDisabled: true,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Escape does not close this dialog.</li>
        <li>Close with the X or by clicking the backdrop.</li>
      </ol>
    ),
  });
}

/** Backdrop and Escape both locked. Only the X closes. */
function openDismissLockedDialog() {
  addDialog({
    title: 'Backdrop and Escape locked',
    hideFooter: true,
    isDismissable: false,
    isKeyboardDismissDisabled: true,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>The backdrop and Escape do not close this dialog.</li>
        <li>Close with the X.</li>
      </ol>
    ),
  });
}

function openCustomContentDialog() {
  addDialog({
    title: 'Custom content',
    content: (
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Dialog content can be any React node.</p>
        <p>Use this for forms, previews, and richer confirmations.</p>
      </div>
    ),
  });
}

/** DEV-only imperative Dialog demo. Omitted from production builds. */
export function HomeDialogDemo() {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={openConfirmLoadingDialog}>Confirm loading</Button>
      <Button variant="secondary" onClick={openFooterLessDialog}>
        No footer
      </Button>
      <Button variant="outline" onClick={openBackdropLockedDialog}>
        Lock backdrop
      </Button>
      <Button variant="ghost" onClick={openEscapeLockedDialog}>
        Lock Escape
      </Button>
      <Button variant="outline" onClick={openDismissLockedDialog}>
        Lock backdrop and Escape
      </Button>
      <Button variant="secondary" onClick={openCustomContentDialog}>
        Custom content
      </Button>
    </div>
  );
}
