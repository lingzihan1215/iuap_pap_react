import request from "utils/request";

let BASE_URL_PATH = '';

if(__MODE__ == "development"){
    BASE_URL_PATH = ""
} else {
    BASE_URL_PATH = ""
}

const URL = {
    "GET_LIST":  "/order/manage/list",
    "GET_BODYLIST": BASE_URL_PATH + "/oprtparamconfig/queryBodyByParentid",    
    "ADD_SAVE": BASE_URL_PATH + "/oprtparamconfig/add",
    "EDIT_SAVE": BASE_URL_PATH + "/oprtparamconfig/update",
    "DELETE_ITEMS": "/iuap-example/demo_order/delete",
    "ENABLE": BASE_URL_PATH + "/oprtparamconfig/enable",
    "DISABLE": BASE_URL_PATH + "/oprtparamconfig/disable"    
}

export const getList = (params) => {
    return request(URL.GET_LIST, {
        method: "post",
        data: params
    });
}
export const delItems = (params) => {
    return request(URL.DELETE_ITEMS, {
        method: "post",
        data: params
    });
}

export const getBodyList = (params) => {
    return request(URL.GET_BODYLIST, {
        method: "post",
        data: params
    });
}

export const addSave = (params) => {
    return request(URL.ADD_SAVE, {
        method: "post",
        data: params
    });
}

export const editSave = (params) => {
    return request(URL.EDIT_SAVE, {
        method: "post",
        data: params
    });
}



export const enable = (params) => {
    return request(URL.ENABLE, {
        method: "post",
        data: params
    });
}

export const disable = (params) => {
    return request(URL.DISABLE, {
        method: "post",
        data: params
    });
}

