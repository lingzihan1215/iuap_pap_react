import request from "utils/request";

const URL = {
    "GET_LIST": "/iuap-example/demo_order/list"
}

export const getList = (data) => {
    return request(url, {
        method: "get",
        data
    });
}