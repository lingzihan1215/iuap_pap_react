import request from "utils/request";

const URL = {
    "GET_MONITORSVG" : process.env.IMS_PATH + "/monitorsvg/list" ,
};

export function getMonitorSvg(param){
    return request(URL.GET_MONITORSVG,{
        method : 'post',
        data:param
    });
}