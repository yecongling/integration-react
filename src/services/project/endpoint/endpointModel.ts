
/**
 * 定义端点模型
 */
export interface EndpointModel {

}

/**
 * 定义端点类型
 */
export interface EndpointType {
    id: string;
    name: string;
    supportedModes: string;
    children?: EndpointType[];
}