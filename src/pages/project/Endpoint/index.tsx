import React from "react";
import "./endpoint.scss";
import { Card, Col, Row, Input } from "antd";
const { Search } = Input;
/**
 * 端点维护
 * @returns 端点
 */
const Endpoint: React.FC = () => {
  return (
    <Row gutter={8} style={{ height: "100%" }}>
      <Col span={6} xl={10} xxl={6}>
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
            }}
          >
            一棵树
          </section>
        </Card>
      </Col>
      <Col span={18} xl={14} xxl={18}>
        <Card style={{ height: "100%" }}>右边</Card>
      </Col>
    </Row>
  );
};
export default Endpoint;
