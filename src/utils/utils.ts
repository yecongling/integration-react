import { lazyLoad } from "@/router/lazyLoad";
import { RouteItem, RouteObject } from "@/types/route";
import { isObject } from "./is";


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

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
      parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge<T = object>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
      src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}
