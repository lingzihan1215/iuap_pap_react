import request from "utils/request";
const URL = {
  GET_TREE: "/iuap-example/instit/list"
};
export const get_tree = param => {
  return request(URL.GET_TREE, {
    method: "get",
    data: param
  });
};
