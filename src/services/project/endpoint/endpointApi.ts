import { HttpRequest } from "@/utils/request";
import { EndpointModel, EndpointType } from "./endpointModel";

export enum EndpointApi {
    // 获取所有端点类型
    getEndpointType = '/project/endpoint/getEndpointType',
    // 查询所有端点
    getEndpoints = '/project/endpoint/getEndpoints'
}

/**
 * 查询端点类型（左边树结构）
 * 
 * @param type 查询条件
 */
export const getEndpointType = (type?: string) => {
    return HttpRequest.get<EndpointType[]>({url: EndpointApi.getEndpointType, params: type}, {successMessageMode: 'none'});
}

/**
 * 查询所有的端点信息
 * @param endpoint 端点的查询条件
 */
export const getEndpoints = (endpoint?: EndpointModel) => {
    return HttpRequest.get<EndpointModel[]>({url: EndpointApi.getEndpoints, params: endpoint}, {successMessageMode: 'none'});
}