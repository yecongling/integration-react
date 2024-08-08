import React from "react";
import "./endpoint.scss";
import { Card, Col, Row, Input, TreeDataNode, Tree } from "antd";
const { Search } = Input;
/**
 * 端点维护
 * @returns 端点
 */
const Endpoint: React.FC = () => {
  // 定义树数据（后续改造从后台获取）
  const treeData: TreeDataNode[] = [
    {
      title: "web服务",
      key: "0-0",
      children: [
        {
          title: "SOAP（CXF）",
          key: "0-0-0",
        },
        {
          title: "HTTP（Netty）",
          key: "0-0-1",
        },
        {
          title: "RPC",
          key: "0-0-2",
        },
      ],
    },
    {
      title: "MQ",
      key: "1-0",
      children: [
        {
          title: "kafka",
          key: "1-0-0",
        },
        {
          title: "RabbitMQ",
          key: "1-0-1",
        },
      ],
    },
    {
      title: "文件",
      key: "2-0",
      children: [
        {
          title: "FTP",
          key: "2-0-0",
        },
        {
          title: "FILE",
          key: "2-0-1",
        },
        {
          title: "SFTP",
          key: "2-0-2",
        },
        {
          title: "邮件",
          key: "2-0-3",
        },
      ],
    },
    {
      title: "数据库",
      key: "3-0",
      children: [
        {
          title: "MySQL",
          key: "3-0-0",
        },
        {
          title: "Oracle",
          key: "3-0-1",
        },
        {
          title: "SQL Server",
          key: "3-0-2",
        },
        {
          title: "redis",
          key: "3-0-3",
        },
        {
          title: "mongoDB",
          key: "3-0-4",
        },
        {
          title: "其他",
          key: "3-0-5",
        },
      ],
    },
  ];
  return (
    <Row gutter={8} style={{ height: "100%" }}>
      <Col span={5} xl={10} xxl={5}>
        <Card style={{ height: "100%" }} styles={{ body: { height: "100%" } }}>
          <section style={{ marginBottom: "8px" }}>
            <Search
              autoFocus
              placeholder="请输入端点类型名进行检索"
              enterButton
            />
          </section>
          <section
            style={{
              height: "calc(100% - 48px)",
              display: "flex",
              flexDirection: "column",
              paddingTop: "16px",
            }}
          >
            <Tree treeData={treeData} defaultExpandAll showIcon showLine blockNode/>
          </section>
        </Card>
      </Col>
      <Col span={19} xl={14} xxl={19}>
        <Card style={{ height: "100%" }}>右边</Card>
      </Col>
    </Row>
  );
};
export default Endpoint;
