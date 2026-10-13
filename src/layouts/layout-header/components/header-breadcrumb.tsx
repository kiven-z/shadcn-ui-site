import { Fragment } from 'react';
import { useMatches } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { siteConfig } from '@/config/site';

interface RouteHandle {
  title: string;
}

function isRouteHandle(handle: unknown): handle is RouteHandle {
  if (typeof handle !== 'object' || handle === null) {
    return false;
  }

  return 'title' in handle;
}

export function HeaderBreadcrumb() {
  const titles = useMatches().flatMap((match) => (isRouteHandle(match.handle) ? [match.handle.title] : []));
  const crumbs = titles.length > 0 ? titles : [siteConfig.name];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((title, index) => (
          <Fragment key={`${index}-${title}`}>
            {index > 0 ? <BreadcrumbSeparator /> : null}
            <BreadcrumbItem>
              {index === crumbs.length - 1 ? <BreadcrumbPage>{title}</BreadcrumbPage> : <span>{title}</span>}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
