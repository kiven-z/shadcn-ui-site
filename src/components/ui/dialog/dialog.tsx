import type { ReactNode } from 'react';

import { Loader2Icon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dialog as DialogRoot, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './primitives';

import { Button } from '@/components/ui/button';
import { waitOverlayExitAnimations } from '@/components/ui/overlay';
import { cn } from '@/lib/utils';

/** Dialog 尺寸 */
type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'cover' | 'full';

/** 受控 Dialog 打开参数，对应 antd Modal 的 `open` 模型 */
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  size?: DialogSize;
  className?: string;
  /** 隐藏底部操作区；默认 `false` */
  hideFooter?: boolean;
  /** 点击遮罩关闭；默认 `true` */
  isDismissable?: boolean;
  /** 禁用 ESC 关闭；默认 `false` */
  isKeyboardDismissDisabled?: boolean;
  /** 显示右上角关闭钮；默认 `true` */
  showClose?: boolean;
  /** 显示取消按钮；默认 `true` */
  showCancel?: boolean;
  okText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** 关闭动画结束后回调 */
  onAfterClose?: () => void;
}

const DIALOG_SIZE_CLASS: Record<DialogSize, string> = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  cover: 'sm:max-w-3xl',
  full: 'h-[calc(100%-2rem)] max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-2rem)]',
};

/**
 * 受控弹窗：调用方持有 `open`，正文作为 children 进入同一棵树。
 */
export function Dialog({
  open,
  onOpenChange,
  title,
  children,
  size = 'sm',
  className,
  hideFooter = false,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  showClose = true,
  showCancel = true,
  okText,
  cancelText,
  confirmLoading = false,
  onConfirm,
  onCancel,
  onAfterClose,
}: DialogProps) {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  const onAfterCloseRef = useRef(onAfterClose);
  const [mounted, setMounted] = useState(open);

  onAfterCloseRef.current = onAfterClose;

  if (open && !mounted) {
    setMounted(true);
  }

  useEffect(() => {
    if (open || !mounted) {
      return;
    }

    return waitOverlayExitAnimations(contentRef.current, () => {
      setMounted(false);
      onAfterCloseRef.current?.();
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
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={contentRef}
        className={cn(DIALOG_SIZE_CLASS[size], className)}
        showCloseButton={showClose}
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
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="text-sm">{children}</div>
        {hideFooter ? null : (
          <DialogFooter>
            {showCancel ? (
              <Button variant="secondary" onClick={handleCancel}>
                {cancelText ?? t('dialog.close')}
              </Button>
            ) : null}
            <Button disabled={confirmLoading} onClick={handleConfirm}>
              {confirmLoading ? <Loader2Icon className="animate-spin" /> : null}
              {okText ?? t('dialog.confirm')}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </DialogRoot>
  );
}
