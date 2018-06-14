/**
 * 模拟数据设置
 */

module.exports = {
  "GET": [{
    "/local/user/get": "./mock/user/get.json"
  }, {
    "/order/delivery/list": "./mock/order/delivery/list.json"
  }, {
    "/order/manage/orderType": "./mock/order/manage/orderType.json",
  }, {
    "/supplier/manage/list": "./mock/supplier/supplier-manage/supplier-list.json",
  }],
  "POST": [{
    "/system/role/list": "./mock/sys-manage/role-manage/list.json",
  }, {
    "/order/manage/list": "./mock/order/manage/list.json",
  }, {
    "/order/delivery/removelist": "./mock/order/delivery/removeList.json",
  }]
}