export interface AppRouteMeta {
  title: string;
  icon?: string;
  hideInMenu?: boolean;
  order?: number;
}

export interface AppRoute {
  name: string;
  path?: string;
  component?: string;
  meta: AppRouteMeta;
  children?: AppRoute[];
}

export interface RouteHandle {
  title: string;
  path?: string;
}
