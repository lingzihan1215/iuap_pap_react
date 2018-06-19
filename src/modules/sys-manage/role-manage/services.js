import request from "utils/request";

const URL = {
    "GET_LIST":  `${GROBAL_HTTP_CTX}/sany_role/list`,
    "SAVE_ROLE":  `${GROBAL_HTTP_CTX}/sany_role/save`,
    "DEL_ROLE":  `${GROBAL_HTTP_CTX}/sany_role/delete`,
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
export const saveRole = (params) => {
    return request(URL.SAVE_ROLE, {
        method: "post",
        data: params
    });
}
export const delRole = (params) => {
    return request(URL.DEL_ROLE, {
        method: "post",
        data: params
    });
}
