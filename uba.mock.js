/**
 * 模拟数据设置
 */

module.exports = {
  "GET": [{
    "/local/user/get": "./mock/user/get.json"
  }, {
    "/order/delivery/list": "./mock/order/delivery/list.json"
  }],
  "POST": [{
    "/system/user/list": "./mock/sys-manage/user-manage/list.json",
  }]
}