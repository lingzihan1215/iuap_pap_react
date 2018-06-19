import request from "utils/request";


const URL = {
    "GET_LIST": `${GROBAL_HTTP_CTX}/sany_supplier/list` ,
    "SAVE_REGISTER_INFO":`${GROBAL_HTTP_CTX}/sany_supplier/save` 
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

export const onSave = (data)=>{
    return request(URL.SAVE_REGISTER_INFO, {
        method: "post",
        data: data
    })
}