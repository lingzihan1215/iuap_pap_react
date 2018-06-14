import request from "utils/request";

const URL = {
    "GET_LIST":  "/supplier/manage/list"  
}

export const getList = (params) => {
    let url =URL.GET_LIST+'?1=1';
    for(let attr in params){
        url+='&search_'+attr+'='+params[attr];
    }
    return request(url, {
        method: "get",
        data: params
    });
}