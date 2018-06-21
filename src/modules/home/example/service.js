import request from "utils/request";

//定义接口地址
const URL = { 
    "GET_LIST":  `${GROBAL_HTTP_CTX}/sany_order/list`
}

/**
 * 获取列表
 * @param {*} params 
 */
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

/**
 * 获取下拉列表
 * @param {*} params 
 */
export const getSelect = (params) => { 
    return request(URL.GET_SELECT, {
        method: "get",
        data: params
    });
}