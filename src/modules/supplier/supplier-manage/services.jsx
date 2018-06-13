import request from "utils/request";

const URL = {
    "GET_LIST":  "/iuap-example/demo_order/list"  
}

export const getList = (params) => {
    return request(url, {
        method: "post",
        data: params
    });
}