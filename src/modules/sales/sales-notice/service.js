import request from "utils/request";

//定义接口地址
const URL = { 
    "SALES_INFO":  `/customer_credit/getAssoVo`,
    "SALES_CREATE":  `/sales/customer/create`
    // "SALES_CREATE":  `${GROBAL_HTTP_CTX}/sale_order/SaveAssoVo`,
    // "SALES_INFO":  `${GROBAL_HTTP_CTX}/customer_credit/getAssoVo`
}


/**
 * 获取下拉列表
 * @param {*} params 
 */
export const getSalesInfo = (params) => { 
    let search_id = params.search_id
    let reuestURL = `${URL.SALES_INFO}?search_id=${search_id}`;

    return request(reuestURL, {
        method: "get",
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
