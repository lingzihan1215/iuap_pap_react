import React, { Component } from "react";
import { Link } from "mirrorx";
import "./index.less";

const urlListPreview = [
  // 标准示例
  { url: "/templates/simple-table", name: "简单单表示例" },
  { url: "/templates/select-table", name: "简单多选表格示例" },
  { url: "/templates/pagination-table", name: "简单分页表格示例" },
  { url: "/templates/card-table", name: "可编辑表格示例" },
  { url: "/templates/complex-form", name: "复杂表单注册" },
  { url: "/templates/ref-exmaple", name: "参照功能示例" },
  { url: "/templates/bpm-table", name: "流程组件示例" },

  
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
