import React, { Component } from "react";
import { Link } from "mirrorx";
import "./index.less";

const urlListPreview = [
  // 订单管理
  { url: "/order/managelist", name: "订单列表" },
  { url: "/order/delivery", name: "送货单" },
  { url: "/system/rolelist", name: "角色管理" },
  { url: "/interimplan/planapply", name: "计划申请" },
  { url: "/resource/research", name: "资源调查表" },

  { url: "/system/person-manage", name: "人员管理" },
  { url: "/contract/manage", name: "合同管理" },
  
  // 供应商管理
  { url: "/supplier/register", name: "供应商注册" },
  { url: "/supplier/list", name: "供应商管理" },
  { url: "/supplier/detail", name: "供应商详情" },

  //示例节点
  { url: "/home/example", name: "单表查询" },
  { url: "/home/example-edit", name: "表格多选" },
  { url: "/home/example-select", name: "表格编辑" },
  { url: "/home/example-step", name: "STEP示例" }

];

const getURLList = () => {
  return urlListPreview.map((item, index) => {
    return (
      <li key={index} className="index-li">
        <Link to={item.url}>{item.name}</Link>
      </li>
    );
  });
};

export default class MainLayout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="index">
        <div className="index-header">
          <ul className="index-main">
            <li className="index-main-li">
              <span className="index-main-title">iuap 应用平台前端典型案例</span>
              <ul className="index-ul">{getURLList()}</ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
