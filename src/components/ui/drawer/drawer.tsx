import type { ReactNode } from 'react';

import { Loader2Icon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { waitOverlayExitAnimations } from '@/components/ui/overlay';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';

/** 受控 Drawer 打开参数，对应 antd Drawer 的 `open` 模型 */
interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  /** 滑出边；默认 `right` */
  placement?: 'right' | 'left' | 'top' | 'bottom';
  className?: string;
  /** 隐藏底部操作区；默认 `false` */
  hideFooter?: boolean;
  /** 点击遮罩关闭；默认 `true` */
  isDismissable?: boolean;
  /** 禁用 ESC 关闭；默认 `false` */
  isKeyboardDismissDisabled?: boolean;
  /** 显示右上角关闭钮；默认 `true` */
  showClose?: boolean;
  confirmLoading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * 受控抽屉：调用方持有 `open`，正文作为 children 进入同一棵树。
 */
export function Drawer({
  open,
  onOpenChange,
  title,
  children,
  placement = 'right',
  className,
  hideFooter = false,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  showClose = true,
  confirmLoading = false,
  onConfirm,
  onCancel,
}: DrawerProps) {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(open);

  if (open && !mounted) {
    setMounted(true);
  }

  useEffect(() => {
    if (open || !mounted) {
      return;
    }

    return waitOverlayExitAnimations(contentRef.current, () => {
      setMounted(false);
    });
  }, [open, mounted]);

  function handleCancel() {
    if (onCancel) {
      onCancel();

      return;
    }

    onOpenChange(false);
  }

  function handleConfirm() {
    if (onConfirm) {
      onConfirm();

      return;
    }

    onOpenChange(false);
  }

  if (!mounted) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        ref={contentRef}
        className={className}
        showCloseButton={showClose}
        side={placement}
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
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto px-4 text-sm">{children}</div>
        {hideFooter ? null : (
          <SheetFooter>
            <Button variant="secondary" onClick={handleCancel}>
              {t('dialog.close')}
            </Button>
            <Button disabled={confirmLoading} onClick={handleConfirm}>
              {confirmLoading ? <Loader2Icon className="animate-spin" /> : null}
              {t('dialog.confirm')}
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
