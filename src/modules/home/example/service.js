import request from "utils/request";

//定义接口地址
const URL = { 
    "GET_LIST":  `${GROBAL_HTTP_CTX}/sany_order/list`,
    "GET_SELECT":''
}

/**
 * 获取列表
 * @param {*} params 
 */
export const getList = (params) => { 
    return request(URL.GET_LIST, {
        method: "get",
        data: params
    });
}

/**
 * 获取下拉列表
 * @param {*} params 
 */
export const getSelect = (params) => { 
    return request(URL.GET_SELECT, {
        method: "get",
        data: params
    });
}