import type { RouteHandle } from '@/router/access/types';

import { Fragment } from 'react';
import { Link, useMatches } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

function CrumbContent({ crumb, current }: { crumb: RouteHandle; current: boolean }) {
  if (current) {
    return <BreadcrumbPage>{crumb.title}</BreadcrumbPage>;
  }

  if (!crumb.path) {
    return crumb.title;
  }

  return (
    <BreadcrumbLink asChild>
      <Link to={crumb.path}>{crumb.title}</Link>
    </BreadcrumbLink>
  );
}

export function HeaderBreadcrumb() {
  const crumbs = useMatches().flatMap((match) => {
    const handle = match.handle as RouteHandle | undefined;

    if (!handle) {
      return [];
    }

    return [handle];
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <Fragment key={`${crumb.path ?? crumb.title}-${index}`}>
            {index > 0 ? <BreadcrumbSeparator /> : null}
            <BreadcrumbItem>
              <CrumbContent crumb={crumb} current={index === crumbs.length - 1} />
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
