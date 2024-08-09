import { MockMethod } from "vite-plugin-mock";

const project: Array<MockMethod> = [
  {
    url: "/api/project/endpoint/getEndpointType",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "",
        data: [
          {
            title: "web服务",
            id: "0-0",
            children: [
              {
                title: "SOAP(CXF)",
                id: "0-0-0",
              },
              {
                title: "HTTP(Netty)",
                id: "0-0-1",
              },
              {
                title: "RPC",
                id: "0-0-2",
              },
            ],
          },
          {
            title: "MQ",
            id: "1-0",
            children: [
              {
                title: "kafka",
                id: "1-0-0",
              },
              {
                title: "RabbitMQ",
                id: "1-0-1",
              },
            ],
          },
          {
            title: "文件",
            id: "2-0",
            children: [
              {
                title: "FTP",
                id: "2-0-0",
              },
              {
                title: "FILE",
                id: "2-0-1",
              },
              {
                title: "SFTP",
                id: "2-0-2",
              },
              {
                title: "邮件",
                id: "2-0-3",
              },
            ],
          },
          {
            title: "数据库",
            id: "3-0",
            children: [
              {
                title: "MySQL",
                id: "3-0-0",
              },
              {
                title: "Oracle",
                id: "3-0-1",
              },
              {
                title: "SQL Server",
                id: "3-0-2",
              },
              {
                title: "redis",
                id: "3-0-3",
              },
              {
                title: "mongoDB",
                id: "3-0-4",
              },
              {
                title: "其他",
                id: "3-0-5",
              },
            ],
          },
        ],
      };
    },
  },
  {
    url: "/api/project/endpoint/getEndpoints",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "",
        data: [
          {
            id: "0-0-0",
            name: "SOAP(CXF)",
            supportedModes: "REQUEST",
          },
          {
            id: "0-0-1",
            name: "HTTP(Netty)",
            supportedModes:"REQUEST",
          }
        ]
      }
    }
  }
];

export default project;
