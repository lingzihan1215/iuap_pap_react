/**
 * 送货单请求
 */

import request from "utils/request";

const URL = {
    "GET_LIST": `${GROBAL_HTTP_CTX}/sany_delivery/list`,
    "DELETE": `${GROBAL_HTTP_CTX}/sany_delivery/delete`,
    "SAVE": `${GROBAL_HTTP_CTX}/sany_delivery/save`,
    "SAVE_ALL": `${GROBAL_HTTP_CTX}/sany_delivery/batchSave`
}

export const getList = (param) => {
    return request(URL.GET_LIST, {
        method: "get",
        param
    });
}

export const deleteList = (data) => {
    return request(URL.DELETE, {
        method: "post",
        data
    });
}

export const saveList = (data) => {
    return request(URL.SAVE, {
        method: "post",
        data
    });
}

export const saveAllList = (data) => {
    return request(URL.SAVE_ALL, {
        method: "post",
        data
    });
}