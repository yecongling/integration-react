import { Layout } from "antd";
import React from "react";
import LeftMenu from "./LeftMenu";
import Header from "./Header";
import Content from "./Content";

/**
 * 页面主要布局
 * @returns 组件内容
 */
const MainLayout: React.FC = () => {
    return (
        <>
            {/* SQL监控台 */}
            <Layout style={{ height: '100%' }}>
                <LeftMenu />
                <Layout>
                    <Header />
                    <Content />
                </Layout>
            </Layout>
        </>
    )
}
export default MainLayout;