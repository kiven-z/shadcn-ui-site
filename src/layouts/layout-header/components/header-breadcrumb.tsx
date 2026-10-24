import { toast } from 'sonner';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function HeaderBreadcrumb() {
  /**
   * 可以返回到当前路由，若是当前路由没有重定向直接返回到404
   */
  const breadCrumbClick = (path: string) => {
    toast.success(path);
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="cursor-pointer" onClick={() => breadCrumbClick('/')}>
          顶级路由
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem className="cursor-pointer" onClick={() => breadCrumbClick('/sub')}>
          子路由
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbPage onClick={() => breadCrumbClick('/more')}>更多路由</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
