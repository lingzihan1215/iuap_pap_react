import request from "utils/request";

let BASE_URL_PATH = '';

if(__MODE__ == "development"){
    BASE_URL_PATH = ""
} else {
    BASE_URL_PATH = ""
}

const URL = {
    "GET_LIST":  "/order/manage/list",
    "GET_ORDER_TYPE": "/order/manage/orderType"
}

export const getList = (params) => {
    return request(URL.GET_LIST, {
        method: "post",
        data: params
    });
}
export const getOrderType = (params) => {
    return request(URL.GET_ORDER_TYPE, {
        method: "get",
        data: params
    });
}
