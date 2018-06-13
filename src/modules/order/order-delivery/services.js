/**
 * 送货单请求
 */

import request from "utils/request";

const URL = {
    "GET_LIST": "/order/delivery/list",
    "DELETE": "/order/delivery/removelist"
}

export const getList = (param) => {
    return request(URL.GET_LIST, {
        method: "get",
        param
    });
}

export const deleteList = (data) => {
    return request(URL.DELETE, {
        method: "post",
        data
    });
}
