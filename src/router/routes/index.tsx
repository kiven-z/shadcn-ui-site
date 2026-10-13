import type { RouteObject } from 'react-router-dom';

import { authRoutes } from './auth';
import { errorRoutes } from './error';
import { staticRoutes } from './static';

import DefaultLayout from '@/layouts';
import { toRouteObjects } from '@/router/access/to-route-object';

export const routes: RouteObject[] = [
  ...authRoutes,
  {
    path: '/',
    element: <DefaultLayout />,
    children: toRouteObjects(staticRoutes),
  },
  ...errorRoutes,
];
