import request from "utils/request";
const URL = {
  GET_TREE: "http://10.10.24.43:8080/iuap-example/instit/list"
};
export const get_tree = param => {
  return request(URL.GET_TREE, {
    method: "post",
    data: param
  });
};
