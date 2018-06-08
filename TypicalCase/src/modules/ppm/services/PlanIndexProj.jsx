import request from "utils/request";

const URL = {
    "GET_CLASS": process.env.PPM_PATH + "/planindexclass/list",
    "GET_PLANPROJ": process.env.PPM_PATH + "/planindexproject/list",
    "ADD_PLANPROJ": process.env.PPM_PATH + "/planindexproject/add",
    "UPDATE_PLANPROJ": process.env.PPM_PATH + "/planindexproject/update",
    "DELETE_PLANPROJ": process.env.PPM_PATH + "/planindexproject/del",
    "QUERY_PLANPROJ": process.env.PPM_PATH + "/planindexproject/query",
}

export const get_class = (param) => {
    return request(URL.GET_CLASS, {
        method: "post",
        data: param
    });
}

export const get_proj = (param) => {
    return request(URL.GET_PLANPROJ, {
        method: "post",
        data: param
    });
}

export const add = (param) => {
    return request(URL.ADD_PLANPROJ, {
        method: "post",
        data: param
    });
}

export const update = (param) => {
    return request(URL.UPDATE_PLANPROJ, {
        method: "post",
        data: param
    });
}

export const remove = (param) => {
    return request(URL.DELETE_PLANPROJ, {
        method: "post",
        data: param
    });
}

export const query = (param) => {
    return request(URL.QUERY_PLANPROJ, {
        method: "post",
        data: param
    });
}