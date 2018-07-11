import request from "utils/request";

//定义接口地址
const URL = { 
    "SALES_INFO":  `${GROBAL_HTTP_CTX}/sales/customer/info`,
}


/**
 * 获取下拉列表
 * @param {*} params 
 */
export const getSalesInfo = (params) => { 
    return request(URL.SALES_INFO, {
        method: "get",
        data: params
    });
}
