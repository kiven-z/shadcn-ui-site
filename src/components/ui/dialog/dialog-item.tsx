import type { DialogStoreItem } from './dialog-store';
import type { DialogFooterButton, DialogSize } from './types';

import { Loader2Icon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { waitOverlayExitAnimations } from '../overlay';

import { closeDialog, confirmDialog, finalizeDialogClose } from './dialog-store';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './primitives';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DialogItemProps {
  item: DialogStoreItem;
}

const DIALOG_SIZE_CLASS: Record<DialogSize, string> = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  cover: 'sm:max-w-3xl',
  full: 'h-[calc(100%-2rem)] max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-2rem)]',
};

function DialogActionButton({ label, isDisabled, isPending, variant = 'default', onClick }: DialogFooterButton) {
  return (
    <Button disabled={isDisabled || isPending} variant={variant} onClick={onClick}>
      {isPending ? <Loader2Icon className="animate-spin" /> : null}
      {label}
    </Button>
  );
}

/**
 * 单个命令式 Dialog：受控 shadcn Dialog，退出动画结束后再从队列移除。
 */
export function DialogItem({ item }: DialogItemProps) {
  const { t } = useTranslation();
  const { options } = item;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item.isOpen) {
      return;
    }

    return waitOverlayExitAnimations(contentRef.current, () => {
      finalizeDialogClose(item.id);
    });
  }, [item.id, item.isOpen]);

  function handleOpenChange(open: boolean) {
    if (!open) {
      closeDialog(item.id, 'close');
    }
  }

  function handleCancel() {
    const done = () => closeDialog(item.id, 'cancel');

    if (options.beforeCancel) {
      options.beforeCancel(done);

      return;
    }

    done();
  }

  const customButtons = options.footerButtons;
  const isDismissable = options.isDismissable ?? true;
  const isKeyboardDismissDisabled = options.isKeyboardDismissDisabled ?? false;

  return (
    <Dialog open={item.isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        ref={contentRef}
        className={cn(DIALOG_SIZE_CLASS[options.size ?? 'sm'])}
        showCloseButton={options.showClose !== false}
        onEscapeKeyDown={(event) => {
          if (isKeyboardDismissDisabled) {
            event.preventDefault();
          }
        }}
        onInteractOutside={(event) => {
          if (!isDismissable) {
            event.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{options.title}</DialogTitle>
        </DialogHeader>
        <div className="text-sm">{options.content}</div>
        {options.hideFooter ? null : (
          <DialogFooter>
            {customButtons && customButtons.length > 0 ? (
              customButtons.map((button, index) => <DialogActionButton key={`${button.label}-${index}`} {...button} />)
            ) : (
              <>
                <Button variant="secondary" onClick={handleCancel}>
                  {t('dialog.close')}
                </Button>
                <DialogActionButton
                  isPending={item.confirmLoading}
                  label={t('dialog.confirm')}
                  onClick={() => confirmDialog(item.id)}
                />
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
