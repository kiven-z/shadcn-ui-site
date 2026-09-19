import type { ReactNode } from 'react';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, useDialog } from '@/components/ui/dialog';

type DialogDemoId = 'confirm' | 'noFooter' | 'lockBackdrop' | 'lockEscape' | 'lockDismiss' | 'custom';

interface DialogDemo {
  title: string;
  hideFooter?: boolean;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  content: ReactNode;
}

const DIALOG_DEMOS: Record<DialogDemoId, DialogDemo> = {
  confirm: {
    title: 'Confirm loading',
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Press Confirm. The button shows a spinner for 400ms, then the dialog closes.</li>
        <li>Cancel, the X, the backdrop, and Escape still close immediately.</li>
      </ol>
    ),
  },
  noFooter: {
    title: 'No footer',
    hideFooter: true,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>The footer is hidden.</li>
        <li>Close with the X, the backdrop, or Escape.</li>
      </ol>
    ),
  },
  lockBackdrop: {
    title: 'Backdrop locked',
    hideFooter: true,
    isDismissable: false,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Clicking the backdrop does not close this dialog.</li>
        <li>Close with the X or Escape.</li>
      </ol>
    ),
  },
  lockEscape: {
    title: 'Escape locked',
    hideFooter: true,
    isKeyboardDismissDisabled: true,
    content: (
      <ol className="ms-6 list-outside list-decimal space-y-1">
        <li>Escape does not close this dialog.</li>
        <li>Close with the X or by clicking the backdrop.</li>
      </ol>
    ),
  },
  lockDismiss: {
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
  },
  custom: {
    title: 'Custom content',
    content: (
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Dialog content can be any React node.</p>
        <p>Use this for forms, previews, and richer confirmations.</p>
      </div>
    ),
  },
};

/** DEV-only Dialog demo: controlled `open` plus `useDialog().confirm` / `warning`. */
export function HomeDialogDemo() {
  const dialog = useDialog();
  const [demo, setDemo] = useState<DialogDemoId | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const current = demo ? DIALOG_DEMOS[demo] : null;

  function handleOpenChange(open: boolean) {
    if (open) {
      return;
    }

    setConfirmLoading(false);
    setDemo(null);
  }

  async function handleConfirm() {
    setConfirmLoading(true);
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 400);
    });
    setConfirmLoading(false);
    setDemo(null);
  }

  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setDemo('confirm')}>Confirm loading</Button>
        <Button variant="secondary" onClick={() => setDemo('noFooter')}>
          No footer
        </Button>
        <Button variant="outline" onClick={() => setDemo('lockBackdrop')}>
          Lock backdrop
        </Button>
        <Button variant="ghost" onClick={() => setDemo('lockEscape')}>
          Lock Escape
        </Button>
        <Button variant="outline" onClick={() => setDemo('lockDismiss')}>
          Lock backdrop and Escape
        </Button>
        <Button variant="secondary" onClick={() => setDemo('custom')}>
          Custom content
        </Button>
        <Button
          onClick={() => {
            dialog.confirm({
              title: 'Imperative confirm',
              content: (
                <ol className="ms-6 list-outside list-decimal space-y-1">
                  <li>Press Confirm. The button shows a spinner for 400ms, then the dialog closes.</li>
                  <li>onOk may return a Promise; reject keeps the dialog open.</li>
                </ol>
              ),
              onOk: async () => {
                await new Promise<void>((resolve) => {
                  window.setTimeout(resolve, 400);
                });
              },
            });
          }}
        >
          useDialog.confirm
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            dialog.confirm({
              title: 'Confirm stays open on reject',
              content: 'Press Confirm. onOk rejects after 400ms; the dialog stays open.',
              onOk: async () => {
                await new Promise<void>((resolve) => {
                  window.setTimeout(resolve, 400);
                });
                throw new Error('confirm rejected');
              },
            });
          }}
        >
          useDialog.confirm reject
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            dialog.warning({
              title: 'Imperative warning',
              content: 'OK only. No cancel button, no backdrop dismiss, no close icon.',
            });
          }}
        >
          useDialog.warning
        </Button>
      </div>

      <Dialog
        confirmLoading={confirmLoading}
        hideFooter={current?.hideFooter}
        isDismissable={current?.isDismissable}
        isKeyboardDismissDisabled={current?.isKeyboardDismissDisabled}
        open={demo !== null}
        title={current?.title ?? ''}
        onConfirm={demo === 'confirm' ? handleConfirm : undefined}
        onOpenChange={handleOpenChange}
      >
        {current?.content}
      </Dialog>
    </>
  );
}
