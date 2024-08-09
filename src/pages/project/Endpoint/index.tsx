import React, { Key, useEffect, useState } from "react";
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
import { addKeyToTreeData } from "@/utils/utils";
const { Search } = Input;
/**
 * 端点维护
 * @returns 端点
 */
const Endpoint: React.FC = () => {
  // 定义端点类型数据、端点数据
  const [endpointTypes, setEndpointTypes] = useState<TreeDataNode[]>([]);
  const [endpoints, setEndpoints] = useState<EndpointModel[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // 表格中选中的行
  const [selectRow, setSelectRow] = useState<EndpointModel[]>([]);
  // 设置树是否加载完成
  const [treeLoading, setTreeLoading] = useState<boolean>(false);
  // 查询表单数据
  const [searchForm] = Form.useForm();

  useEffect(() => {
    getEndpointType().then((res) => {
      // 数据转换
      const transform = addKeyToTreeData(res, "id");
      // 设置树数据
      setEndpointTypes(transform);
    });
  }, []);

  // 树节点加载完毕后默认选中第一个节点
  useEffect(() => {
    if (endpointTypes.length > 0 && !treeLoading) {
      // 默认选中第一个节点
      if (endpointTypes[0].children && endpointTypes[0].children.length > 0) {
        setSelectedKeys([endpointTypes[0].children[0].key as string]);
      } else {
        setSelectedKeys([endpointTypes[0].key as string]);
      }
      // 设置树加载完成
      setTreeLoading(true);
    }
  }, [endpointTypes, treeLoading]);

  // 选中的节点发生变化时重新查询右边的表格数据
  useEffect(() => {
    if (treeLoading) {
      console.log("selectedKeys", selectedKeys);
    }
  }, [selectedKeys, treeLoading]);

  /**
   * 查询端点类型
   * @param search 查询条件
   */
  const queryEndpointType = async (search?: string) => {
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
  const onTreeSelect = (selectedKeys: any[]) => {
    setSelectedKeys(selectedKeys);
  };

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
            {endpointTypes.length > 0 && (
              <Tree
                treeData={endpointTypes}
                selectedKeys={selectedKeys}
                defaultExpandAll
                showIcon
                showLine
                blockNode
                onSelect={onTreeSelect}
              />
            )}
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
