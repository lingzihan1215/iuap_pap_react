import request from "utils/request";
import { paramToUrl } from "utils";

const URL = {
    "GET_LIST":  `${GROBAL_HTTP_CTX}/inter/selectAllByPage`,
    "SAVE_INTER":  `${GROBAL_HTTP_CTX}/inter/save`,
    "UPDATE_STATUS":  `${GROBAL_HTTP_CTX}/inter/batchUpdateStatus`,
    "DEL_ORDER":  `${GROBAL_HTTP_CTX}/sany_order/delete`,
    "GET_ORDER_TYPE": "/order/manage/orderType"
}

export const getList = (params) => {
    let url =paramToUrl(URL.GET_LIST,params);
    return request(url, {
        method: "get",
        data: params
    });
}
export const getOrderType = (params) => {
    return request(URL.GET_ORDER_TYPE, {
        method: "get",
        data: params
    });
}
export const saveInter = (params) => {
    return request(URL.SAVE_INTER, {
        method: "post",
        data: params
    });
}
export const updateStatus = (params) => {
    return request(URL.UPDATE_STATUS, {
        method: "post",
        data: params
    });
}
export const delOrder = (params) => {
    return request(URL.DEL_ORDER, {
        method: "post",
        data: params
    });
}
