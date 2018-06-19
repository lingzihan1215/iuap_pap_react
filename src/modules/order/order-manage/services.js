import request from "utils/request";

const URL = {
    "GET_LIST":  `${GROBAL_HTTP_CTX}/sany_order/list`,
    "SAVE_ORDER":  `${GROBAL_HTTP_CTX}/sany_order/save`,
    "DEL_ORDER":  `${GROBAL_HTTP_CTX}/sany_order/delete`,
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
