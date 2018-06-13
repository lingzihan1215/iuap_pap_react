import request from "utils/request";

let BASE_URL_PATH = '';

if(__MODE__ == "development"){
    BASE_URL_PATH = ""
} else {
    BASE_URL_PATH = ""
}

const URL = {
    "GET_LIST":  "/system/user/list",
    "SAVE_USER":  "/system/user/save",
}

export const getList = (params) => {
    return request(URL.GET_LIST, {
        method: "post",
        data: params
    });
}
export const saveUser = (params) => {
    return request(URL.SAVE_USER, {
        method: "post",
        data: params
    });
}