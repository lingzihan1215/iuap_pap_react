/**
 * 计划申请请求
 */

import request from "utils/request";

const URL = {
    "GET_LIST": "/iuap-example/sany_delivery/list",
    "DELETE": "/iuap-example/sany_delivery/delete",
    "SAVE": "/iuap-example/sany_delivery/save"
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