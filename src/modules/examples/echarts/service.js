import request from "utils/request";
import { paramToUrl } from "utils";

//定义接口地址
const URL = { 
    "GET_BAR":  `${GROBAL_HTTP_CTX}/sany_chart/bar`,
    "GET_LINE":  `${GROBAL_HTTP_CTX}/sany_chart/line`,
    "GET_PIE":  `${GROBAL_HTTP_CTX}/sany_chart/pie`,
    "GET_BAR_LINE":  `${GROBAL_HTTP_CTX}/sany_chart/bar_line`,
}

/**
 * 获取柱状图数据
 * @param {*} params 
 */
export const getBarOption = (params) => { 
    return request(URL.GET_BAR, {
        method: "get",
        data: params
    });
}
/**
 * 获取折线图数据
 * @param {*} params 
 */
export const getLineOption = (params) => { 
    return request(URL.GET_LINE, {
        method: "get",
        data: params
    });
}
/**
 * 获取柱状折线图数据
 * @param {*} params 
 */
export const getBarLineOption = (params) => { 
    return request(URL.GET_BAR_LINE, {
        method: "get",
        data: params
    });
}
/**
 * 获取饼状图数据
 * @param {*} params 
 */
export const getPieOption = (params) => { 
    return request(URL.GET_PIE, {
        method: "get",
        data: params
    });
}
/** 
 * 获取雷达图数据
 * @param {*} params 
 */
export const getRadarOption = (params) => { 
    return request(URL.GET_PIE, {
        method: "get",
        data: params
    });
}

