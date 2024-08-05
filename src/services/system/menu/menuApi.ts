import { HttpRequest } from "@/utils/request";

/**
 * 枚举菜单相关的请求API
 */
export enum Api {
  // 根据token获取菜单（多用于框架上根据角色获取菜单那种）
  getMenuList = "/menu/getMenusByRole",
  // 获取所有菜单
  getAllMenus = "/menu/getAllMenus",
  // 获取所有上级菜单
  getDirectoryMenu = "/menu/getDirectoryMenu",
  // 添加菜单
  addPermission = "/menu/addPermission",
  // 编辑菜单
  updatePermission = "/menu/updatePermission",
  // 删除菜单
  deletePermission = "/menu/deletePermission",
}

/**
 * 根据角色获取菜单
 * @param params
 * @returns
 */
export const getMenuListByRoleId = (params: any) => {
  return HttpRequest.get(
    {
      url: Api.getMenuList,
      params,
    },
    { successMessageMode: "none" }
  );
};
