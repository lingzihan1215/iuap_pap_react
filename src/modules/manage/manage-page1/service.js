import request from 'utils/request'

const URLLIST = {
    GET_LIST : "/order/delivery/list"
}

export const getList = (params) => {
    return request(URLLIST.GET_LIST, {
        method: "get",
        data: params
    })
}