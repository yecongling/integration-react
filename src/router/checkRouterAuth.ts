import { RouteObject } from "@/types/route";
import { routes } from "./router";

// 根据路径获取路由
const checkAuth = (routes: RouteObject[], path: string) => {
  return routes.some((route: RouteObject): boolean => {
    if (route.path === path) {
      return true;
    }
    if (route.children) {
      return checkAuth(route.children, path);
    }
    return false;
  });
};

// 检查路由权限
export const checkRouterAuth = (path: string) => {
  return checkAuth(routes, path);
};
