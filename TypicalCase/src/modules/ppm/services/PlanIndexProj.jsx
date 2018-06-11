import request from "utils/request";
const URL = {
  GET_TREE: "/iuap-example/instit/list",
  GET_TABLE: "/iuap-example/telBook/list"
};
// 获取tree数据
export const get_tree = param => {
  return request(URL.GET_TREE, {
    method: "get",
    data: param
  });
};
//获取 table 数据
export const get_table = param => {
  return request(URL.GET_TABLE, {
    method: "get",
    data: param
  });
};
