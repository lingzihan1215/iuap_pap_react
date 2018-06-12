/**
 * 送货单请求
 */

import request from "utils/request";

const URL = {
    "GET_LIST": "/order/delivery/list"
}

export const getList = () => {
    return request(URL.GET_LIST, {
        method: "get"
    });
}