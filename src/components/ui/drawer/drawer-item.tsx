import type { DrawerStoreItem } from './drawer-store';
import type { DrawerFooterButton } from './types';

import { Loader2Icon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { waitOverlayExitAnimations } from '../overlay';

import { closeDrawer, confirmDrawer, finalizeDrawerClose } from './drawer-store';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface DrawerItemProps {
  item: DrawerStoreItem;
}

function DrawerActionButton({ label, isDisabled, isPending, variant = 'default', onClick }: DrawerFooterButton) {
  return (
    <Button disabled={isDisabled || isPending} variant={variant} onClick={onClick}>
      {isPending ? <Loader2Icon className="animate-spin" /> : null}
      {label}
    </Button>
  );
}

/**
 * 单个命令式 Drawer：受控 shadcn Sheet，退出动画结束后再移除。
 */
export function DrawerItem({ item }: DrawerItemProps) {
  const { t } = useTranslation();
  const { options } = item;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item.isOpen) {
      return;
    }

    return waitOverlayExitAnimations(contentRef.current, () => {
      finalizeDrawerClose(item.id);
    });
  }, [item.id, item.isOpen]);

  function handleOpenChange(open: boolean) {
    if (!open) {
      closeDrawer(item.id, 'close');
    }
  }

  function handleCancel() {
    const done = () => closeDrawer(item.id, 'cancel');

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
    <Sheet open={item.isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        ref={contentRef}
        className={options.className}
        showCloseButton={options.showClose !== false}
        side={options.placement ?? 'right'}
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
        <SheetHeader>
          <SheetTitle>{options.title}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto px-4 text-sm">{options.content}</div>
        {options.hideFooter ? null : (
          <SheetFooter>
            {customButtons && customButtons.length > 0 ? (
              customButtons.map((button, index) => <DrawerActionButton key={`${button.label}-${index}`} {...button} />)
            ) : (
              <>
                <Button variant="secondary" onClick={handleCancel}>
                  {t('dialog.close')}
                </Button>
                <DrawerActionButton
                  isPending={item.confirmLoading}
                  label={t('dialog.confirm')}
                  onClick={() => confirmDrawer(item.id)}
                />
              </>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
