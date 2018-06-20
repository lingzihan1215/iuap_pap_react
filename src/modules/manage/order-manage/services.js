import request from "utils/request";

let BASE_URL_PATH = '';


const URL = { //定义接口地址
    "GET_LIST":  `${GROBAL_HTTP_CTX}/sany_order/list`,
}


export const getList = (params) => { //定义并到处获取接口数据的方法
    //这里可以对传入的参数处理
    return request(URL.GET_LIST, {
        method: "get",
        data: params
    });
}