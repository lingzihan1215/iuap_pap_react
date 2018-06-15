import request from "utils/request";

const URL = {
    "GET_LIST":  "/supplier/manage/list" ,
    "SAVE_REGISTER_INFO":"" 
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
    request(URL.SAVE_REGISTER_INFO, {
        method: "post",
        data: data
    })
}