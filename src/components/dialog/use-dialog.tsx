import type { ReactNode } from 'react';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { Dialog } from './dialog';

/** 函数式确认 / 警告的打开参数，对应 antd `modal.confirm` */
interface DialogConfirmConfig {
  title: string;
  content?: ReactNode;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  afterClose?: () => void;
  okText?: string;
  cancelText?: string;
}

/** `confirm` / `warning` 返回的实例 */
interface DialogConfirmInstance {
  destroy: () => void;
  update: (patch: Partial<DialogConfirmConfig>) => void;
}

interface DialogApi {
  confirm: (config: DialogConfirmConfig) => DialogConfirmInstance;
  warning: (config: DialogConfirmConfig) => DialogConfirmInstance;
}

interface ConfirmItem {
  id: string;
  open: boolean;
  config: DialogConfirmConfig;
  confirmLoading: boolean;
  showCancel: boolean;
}

const DialogApiContext = createContext<DialogApi | null>(null);

/**
 * 函数式确认框。须在 `DialogProvider` 内使用，对应 antd `App.useApp().modal`。
 */
export function useDialog(): DialogApi {
  const api = useContext(DialogApiContext);

  if (!api) {
    throw new Error('useDialog must be used within a DialogProvider.');
  }

  return api;
}

/**
 * 根上挂确认框宿主，使 `useDialog().confirm` / `warning` 能吃到 i18n 与主题。
 * 同刻仅一层：再次打开会替换当前项。
 */
export function DialogProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<ConfirmItem | null>(null);

  const openConfirm = useCallback((config: DialogConfirmConfig, showCancel: boolean): DialogConfirmInstance => {
    const id = crypto.randomUUID();

    setItem({
      id,
      open: true,
      config,
      confirmLoading: false,
      showCancel,
    });

    return {
      destroy() {
        setItem((prev) => (prev?.id === id && prev.open ? { ...prev, open: false, confirmLoading: false } : prev));
      },
      update(patch) {
        setItem((prev) => (prev?.id === id ? { ...prev, config: { ...prev.config, ...patch } } : prev));
      },
    };
  }, []);

  const api = useMemo(
    () => ({
      confirm: (config: DialogConfirmConfig) => openConfirm(config, true),
      warning: (config: DialogConfirmConfig) => openConfirm(config, false),
    }),
    [openConfirm]
  );

  /**
   * 取消关闭当前确认框
   *
   * 当前项未打开时直接返回
   * 触发配置中的 onCancel
   * 将 open 置为 false 并清除 confirmLoading，进入关闭动画
   * 当前项仍保留，等关闭动画结束后再卸载
   */
  function requestClose() {
    if (!item?.open) {
      return;
    }

    item.config.onCancel?.();
    setItem((prev) => (prev?.id === item.id && prev.open ? { ...prev, open: false, confirmLoading: false } : prev));
  }

  /**
   * 处理确认按钮
   *
   * 当前项未打开或正在确认中时直接返回
   * 未提供 onOk 时直接将 open 置为 false
   * 提供 onOk 时先将 confirmLoading 置为 true
   * onOk 成功则关闭并清除 loading，失败则仅清除 loading 并保持打开
   */
  function handleConfirm() {
    if (!item?.open || item.confirmLoading) {
      return;
    }

    const { id, config } = item;
    const { onOk } = config;

    if (!onOk) {
      setItem((prev) => (prev?.id === id && prev.open ? { ...prev, open: false } : prev));

      return;
    }

    setItem((prev) => (prev?.id === id ? { ...prev, confirmLoading: true } : prev));

    void Promise.resolve(onOk()).then(
      () => {
        setItem((prev) => (prev?.id === id && prev.open ? { ...prev, open: false, confirmLoading: false } : prev));
      },
      () => {
        setItem((prev) => (prev?.id === id ? { ...prev, confirmLoading: false } : prev));
      }
    );
  }

  /**
   * 关闭动画结束后的清理
   *
   * 无当前项时直接返回
   * 触发配置中的 afterClose
   * 将当前项从宿主卸载
   */
  function handleAfterClose() {
    const closed = item;

    if (!closed) {
      return;
    }

    closed.config.afterClose?.();
    setItem((prev) => (prev?.id === closed.id ? null : prev));
  }

  return (
    <DialogApiContext.Provider value={api}>
      {children}
      {item ? (
        <Dialog
          key={item.id}
          cancelText={item.config.cancelText}
          confirmLoading={item.confirmLoading}
          isDismissable={false}
          okText={item.config.okText}
          open={item.open}
          showCancel={item.showCancel}
          showClose={false}
          title={item.config.title}
          onAfterClose={handleAfterClose}
          onCancel={requestClose}
          onConfirm={handleConfirm}
          onOpenChange={(open) => {
            if (!open) {
              requestClose();
            }
          }}
        >
          {item.config.content}
        </Dialog>
      ) : null}
    </DialogApiContext.Provider>
  );
}
