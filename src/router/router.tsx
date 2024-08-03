import { RouteObject } from "@/types/route";
import { lazyLoad } from "./lazyLoad";
import { Suspense, useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { App, Skeleton } from "antd";
import { useStore } from "@/hooks/sotreContext";
import { handleRouter } from "@/utils/utils";
import { antdUtils } from "@/utils/antd";

// 默认错误路由
const errorRoutes: RouteObject[] = [
  {
    path: "/*",
    component: lazyLoad("@/pages/404").type,
  },
  {
    path: "/500",
    component: lazyLoad("@/pages/500").type,
  },
  {
    path: "/404",
    component: lazyLoad("@/pages/404").type,
  },
];

// 动态路由
const routes: RouteObject[] = [
  {
    path: "/",
    component: lazyLoad("@/layouts/MainLayout").type,
    children: [],
  },
  {
    path: "/login",
    component: lazyLoad("@/pages/Login").type,
  },
];

// 路由处理方式
const generateRouter = (routers: RouteObject[]) => {
  return routers.map((item: any) => {
    if (item.index) {
      return item;
    }
    item.element = (
      <Suspense fallback={<Skeleton />}>
        <item.component />
      </Suspense>
    );
    if (item.children) {
      item.children = generateRouter(item.children);
      if (item.children.length) {
        item.children.unshift({
          index: true,
          element: <Navigate to={item.children[0].path} replace />,
        });
      }
    }
    return item;
  });
};

// 生成路由
export const Router = () => {
  // 方便非react组件内部使用
  const { notification, message, modal } = App.useApp();
  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
  }, [notification, message, modal]);

  const [route, setRoute] = useState<RouteObject[]>([...routes]);

  // 从Store中获取Menu
  const { globalStore } = useStore();
  const { menus } = globalStore;

  useEffect(() => {
    route[0].children = [...handleRouter(menus), ...errorRoutes];
    setRoute([...route]);
  }, [menus]);
  return useRoutes(generateRouter(route));
}
