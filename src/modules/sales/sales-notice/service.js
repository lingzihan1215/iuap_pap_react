import request from "utils/request";

//定义接口地址
const URL = { 
    "SALES_INFO":  `/sales/customer/search`,
    "SALES_CREATE":  `/sales/customer/create`,
    // "SALES_INFO":  `${GROBAL_HTTP_CTX}/sales/customer/search`,
}


/**
 * 获取下拉列表
 * @param {*} params 
 */
export const getSalesInfo = (params) => { 
    return request(URL.SALES_INFO, {
        method: "post",
        data: params
    });
}

/**
 * 创建销货通知单
 * @param {*} params 
 */
export const createSalesNotice = (params) => { 
    return request(URL.SALES_CREATE, {
        method: "post",
        data: params
    });
}
