import React, { Key, useState } from "react";
import {
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
  RestOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import "./endpoint.scss";
import {
  Card,
  Col,
  Row,
  Input,
  TreeDataNode,
  Tree,
  Form,
  Select,
  Button,
  Table,
  Tooltip,
  Space,
} from "antd";
import {
  getEndpoints,
  getEndpointType,
} from "@/services/project/endpoint/endpointApi";
import { EndpointModel } from "@/services/project/endpoint/endpointModel";
import { TableRowSelection } from "antd/es/table/interface";
const { Search } = Input;
/**
 * 端点维护
 * @returns 端点
 */
const Endpoint: React.FC = () => {
  // 定义端点类型数据、端点数据
  const [endpointTypes, setEndpointTypes] = useState([]);
  const [endpoints, setEndpoints] = useState([]);
  // 表格中选中的行
  const [selectRow, setSelectRow] = useState<EndpointModel[]>([]);
  // 查询表单数据
  const [searchForm] = Form.useForm();

  /**
   * 查询端点类型
   * @param search 查询条件
   */
  const queryEndpointType = async (search: string) => {
    return await getEndpointType(search);
  };

  /**
   * 查询端点信息
   * @param endpoint 端点查询条件
   * @returns 所有的端点
   */
  const queryEndpoints = async (endpoint: EndpointModel) => {
    return await getEndpoints(endpoint);
  };

  /**
   * 树节点选择事件，刷新右边的数据
   */
  const onTreeSelect = (selectedKeys: Key[], info: any) => {
    console.log("选中的key是", selectedKeys);
    console.log("选中的节点是", info.selectedNodes);
  };

  // 定义树数据（后续改造从后台获取）
  const treeData: TreeDataNode[] = [
    {
      title: "web服务",
      key: "0-0",
      children: [
        {
          title: "SOAP(CXF)",
          key: "0-0-0",
        },
        {
          title: "HTTP(Netty)",
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

  // 定义可多选
  const rowSelection: TableRowSelection<EndpointModel> = {
    onChange: (_selectedRowKeys, selectedRows) => {
      setSelectRow(selectedRows);
    },
  };

  return (
    <Row gutter={8} style={{ height: "100%" }}>
      <Col span={5} xl={10} xxl={5}>
        <Card style={{ height: "100%" }} styles={{ body: { height: "100%" } }}>
          <section style={{ marginBottom: "8px" }}>
            <Search
              autoFocus
              placeholder="请输入端点类型名进行检索"
              enterButton
              onSearch={(value) => queryEndpointType(value)}
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
            <Tree
              treeData={treeData}
              defaultExpandAll
              showIcon
              showLine
              blockNode
              onSelect={onTreeSelect}
            />
          </section>
        </Card>
      </Col>
      <Col
        span={19}
        xl={14}
        xxl={19}
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <section style={{ marginBottom: "8px" }}>
          <Card styles={{ body: { height: "100%" } }}>
            <Form
              form={searchForm}
              initialValues={{ projectType: "-1", mode: "-1" }}
            >
              <Row gutter={24}>
                <Col span={6}>
                  <Form.Item
                    label="端点名称"
                    name="name"
                    style={{ marginBottom: 0 }}
                  >
                    <Input autoFocus allowClear autoComplete="false" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="模式"
                    name="mode"
                    style={{ marginBottom: 0 }}
                  >
                    <Select
                      options={[
                        { value: "-1", label: "请选择模式", disabled: true },
                        { value: "IN", label: "IN" },
                        { value: "IN_OUT", label: "IN_OUT" },
                        { value: "OUT", label: "OUT" },
                        { value: "OUT_IN", label: "OUT_IN" },
                      ]}
                    />
                  </Form.Item>
                </Col>

                <Col span={6} style={{ textAlign: "end" }}>
                  <Button type="primary" htmlType="submit">
                    <SearchOutlined />
                    查询
                  </Button>
                  <Button htmlType="reset" style={{ margin: "0 8px" }}>
                    <SyncOutlined />
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </section>
        {/* 下面表格内容 */}
        <section style={{ flex: "1" }}>
          <Card
            style={{ height: "100%" }}
            styles={{
              body: {
                height: "100%",
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <section style={{ marginBottom: "16px" }}>
              <Row>
                <Col span={22}>
                  <Space wrap>
                    <Button type="primary" icon={<PlusOutlined />}>
                      新增
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        alert("批量操作");
                      }}
                      icon={
                        <DeleteOutlined
                          style={{
                            color: selectRow.length === 0 ? "#ccc" : "red",
                          }}
                        />
                      }
                      disabled={selectRow.length === 0}
                    >
                      批量操作
                    </Button>
                    <Button
                      type="default"
                      onClick={() => alert("导入")}
                      icon={<ImportOutlined style={{ color: "orange" }} />}
                    >
                      导入
                    </Button>
                    <Button
                      type="default"
                      onClick={() => alert("导出")}
                      icon={
                        <ExportOutlined
                          style={{
                            color: selectRow.length === 0 ? "#ccc" : "red",
                          }}
                        />
                      }
                      disabled={selectRow.length === 0}
                    >
                      导出
                    </Button>
                  </Space>
                </Col>
                <Col span={2} style={{ textAlign: "right" }}>
                  <Tooltip title="回收站">
                    <Button
                      type="primary"
                      icon={<RestOutlined />}
                      onClick={() => {}}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </section>
            <section style={{ flex: 1 }}>
              <Table
                rowSelection={{ ...rowSelection, checkStrictly: false }}
                scroll={{ x: "100", y: "calc(100vh - 270px)" }}
                style={{ marginTop: "6px" }}
                size="middle"
                bordered
                pagination={{
                  showQuickJumper: true,
                  showSizeChanger: true,
                  defaultPageSize: 25,
                  total: 1,
                  showTotal: (total) => `共 ${total} 条`,
                }}
                // columns={columns}
                // dataSource={endpointSource}
              />
            </section>
          </Card>
        </section>
      </Col>
    </Row>
  );
};
export default Endpoint;
