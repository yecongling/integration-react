import { lazyLoad } from "@/router/lazyLoad";
import { RouteItem, RouteObject } from "@/types/route";

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} routerList 所有菜单列表
 * @param newArr
 * @return array
 */
export function handleRouter(
  routerList: RouteItem[],
  newArr: RouteObject[] = []
) {
  routerList.forEach((item: RouteItem) => {
    const menu: RouteObject = {};
    if (typeof item === "object" && item.path && item.route == "1") {
      menu["path"] = item.path;
      menu["component"] = lazyLoad(item.component).type;
      newArr.push(menu);
    }
    if (item.children && item.children.length) {
      menu.children = [];
      handleRouter(item.children, newArr);
    }
    if (item.childrenRoute && item.childrenRoute.length) {
      menu.children = [];
      handleRouter(item.childrenRoute, newArr);
    }
  });
  return newArr;
}

