/**
 * 模拟数据设置
 */

module.exports = {
  "GET": [
    { "/local/user/get": "./mock/user/get.json" }, 
    { "/order/delivery/list": "./mock/order/delivery/list.json" }, 
    { "/order/manage/orderType": "./mock/order/manage/orderType.json" },
    { "/route/data": "./mock/sidebar.json" }
  ],
  "POST": [
    { "/system/role/list": "./mock/sys-manage/role-manage/list.json" }, 
    { "/order/manage/list": "./mock/order/manage/list.json" }, 
    { "/order/delivery/removelist": "./mock/order/delivery/removeList.json" },
    // 销货通知单
    { "/sales/customer/search": "./mock/sales/customer-info.json" },
    { "/sales/customer/create": "./mock/sales/customer-create.json" }
  ]
}