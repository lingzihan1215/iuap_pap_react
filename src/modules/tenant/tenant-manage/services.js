import request from "utils/request";
import { paramToUrl } from "utils";

const URL = {
    "GET_LIST":  `${GROBAL_HTTP_CTX}/tenant/selectAllByPage`,
    "SAVE_ORDER":  `${GROBAL_HTTP_CTX}/sany_order/save`,
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
export const saveOrder = (params) => {
    return request(URL.SAVE_ORDER, {
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
