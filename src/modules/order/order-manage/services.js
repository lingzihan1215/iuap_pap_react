import request from "utils/request";

let BASE_URL_PATH = '';

if(__MODE__ == "development"){
    BASE_URL_PATH = ""
} else {
    BASE_URL_PATH = ""
}

const URL = {
    "GET_LIST":  "/iuap-example/sany_order/list",
    "SAVE_ORDER":  "/iuap-example/sany_order/save",
    "DEL_ORDER":  "/iuap-example/sany_order/delete",
    "GET_ORDER_TYPE": "/order/manage/orderType"
}

export const getList = (params) => {
    let url =URL.GET_LIST+'?1=1';
    for(let attr in params){
        if((attr!='pageIndex')&&(attr!='pageSize')){
            url+='&search_'+attr+'='+params[attr];
        }else{
            url+='&'+attr+'='+params[attr];
        }
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
