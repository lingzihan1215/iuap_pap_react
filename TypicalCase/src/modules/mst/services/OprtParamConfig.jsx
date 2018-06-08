import request from "utils/request";

const URL = {
    "GET_LIST": process.env.IMS_PATH + "/oprtparamconfig/list",
    "GET_BODYLIST": process.env.IMS_PATH + "/oprtparamconfig/queryBodyByParentid",    
    "ADD_SAVE": process.env.IMS_PATH + "/oprtparamconfig/add",
    "EDIT_SAVE": process.env.IMS_PATH + "/oprtparamconfig/update",
    "DELETE_ITEMS": process.env.IMS_PATH + "/oprtparamconfig/del",
    "ENABLE": process.env.IMS_PATH + "/oprtparamconfig/enable",
    "DISABLE": process.env.IMS_PATH + "/oprtparamconfig/disable"    
}

export const getList = (params) => {
    return request(URL.GET_LIST, {
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

export const delItems = (params) => {
    return request(URL.DELETE_ITEMS, {
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

