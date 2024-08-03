// 菜单属性
export interface MetaProps {
    keepAlive?: boolean;
    requiresAuth?: boolean;
    title: string;
    isLeaf?: string;
    key?: string;
}

// 路由对象
export interface RouteObject {
    caseSensitive?: boolean;
    children?: RouteObject[];
    component?: React.ReactNode;
    index?: boolean;
    path?: string;
    meta?: MetaProps;
    isLink?: string;
    auth?: boolean;
    title?: string
}

/**
 * 定义路由项
 */
export interface RouteItem {
    path: string;
    component: string;
    meta: any,
    route?: string;
    name?: string;
    alias?: string | string[];
    redirect?: string;
    caseSensitive?: boolean;
    children?: RouteItem[];
    childrenRoute?: RouteItem[];
  }