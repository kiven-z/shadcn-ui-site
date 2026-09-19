# shadcn-ui-site

[English](README.md) | [中文](README.zh-CN.md)

基于 Vite、React 与 shadcn/ui 的站点骨架。弹窗与抽屉以受控 `open` 为主；确认 / 警告可用 `useDialog()`。

## 技术栈

- 运行时与语言：[Node.js](https://nodejs.org/)；[TypeScript](https://www.typescriptlang.org)（strict）
- 包管理：pnpm（安装前校验，仅允许 pnpm）
- 构建：[Vite](https://vitejs.dev/guide/)；生产分包与 Gzip / Brotli 压缩
- 框架：[React](https://react.dev/)；[React Router](https://reactrouter.com/)（`createBrowserRouter`，路由懒加载）
- UI：[shadcn/ui](https://ui.shadcn.com)（Radix Nova）
- 样式：[Tailwind CSS v4](https://tailwindcss.com)；class-variance-authority；clsx；tailwind-merge
- 表格：[TanStack Table](https://tanstack.com/table)
- 状态：Zustand（persist）
- 国际化：i18next；YAML 文案
- 图标：unplugin-icons；Iconify；Lucide（shadcn 原语）
- 工程：ESLint；Prettier；[shadcn MCP](https://ui.shadcn.com/docs/mcp)（Cursor）

## 功能

- 后台壳：可折叠侧栏（图标模式；移动端 Sheet）、顶栏工具区、主内容、页脚
- 全局宿主：Toast 挂在应用根，与路由并列
- 受控 Dialog：`open` / `onOpenChange`；尺寸、遮罩与 ESC 控制；确定 loading 由调用方持有
- 函数式确认：`useDialog().confirm` / `warning`；`onOk` 返回 Promise，reject 则保持打开；实例可 `destroy` / `update`；同刻仅一层
- 受控 Drawer：`open` / `onOpenChange`；经 Sheet 支持四向滑出；偏好抽屉由布局持有
- 数据表格：列配置驱动；TanStack Table + shadcn Table；受控分页、行选择、加载与空状态
- 分页状态：拉取、翻页、选择；失败时 Toast
- 界面偏好（本地持久化，水合后写入 DOM）：浅色 / 深色 / 跟随系统；简体中文 / English；LTR / RTL
- 图标：组件内静态图标走编译产物；配置名优先离线表，未命中再走 Iconify
- HTTP 错误页：403、404、500

## 环境要求

- Node.js `^20.19.0` 或 `>=22.13.0`
- pnpm `>=10.26.0`

## 使用

```bash
pnpm install
pnpm dev
```

生产构建：

```bash
pnpm build
pnpm preview
```
