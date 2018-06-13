import request from "utils/request";

let BASE_URL_PATH = '';

if(__MODE__ == "development"){
    BASE_URL_PATH = ""
} else {
    BASE_URL_PATH = ""
}

const URL = {
    "GET_LIST":  "/iuap-example/sany_order/list",
    "GET_ORDER_TYPE": "/order/manage/orderType"
}

export const getList = (params) => {
    console.log(params);
    let url =URL.GET_LIST+'?1=1';
    for(let attr in params){
        url+='&'+attr+'='+params[attr];
    }
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
