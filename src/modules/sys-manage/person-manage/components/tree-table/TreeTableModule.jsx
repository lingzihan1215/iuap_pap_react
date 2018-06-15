import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "mirrorx";

import Form from "bee-form";
import { Table,Button,Col,Row,Modal,FormControl} from "tinper-bee";
import Pagination from 'bee-pagination'
import 'bee-pagination/build/Pagination.css'

import './index.less'

const columns = [
  {
    title: "姓名",
    dataIndex: "peoname",
    key: "peoname"
  },
  {
    title: "员工编号",
    dataIndex: "peocode",
    key: "peocode"
  },
  {
    title: "所属机构",
    dataIndex: "institname",
    key: "institname",
    sorter: (a, b) => a.c - b.c
  },
  {
    title: "办公电话",
    dataIndex: "worktel",
    key: "worktel"
  },
  {
    title: "电子邮箱",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "操作",
    dataIndex: "f",
    key: "f",
    render(text, record, index) {
      return (
        <div style={{ position: "relative" }} title={text}>
          <Button colors="primary">修改</Button>
          <Button colors="danger">删除</Button>
        </div>
      );
    }
  }
];
class TreeTableModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  //分页
  handleSelect = e => {

  }
  dataNumSelect = e => {

  }
  onAddTable = () => {
    actions.PlanIndexProj.showModul(true);
  };
  render() {
    return (
      <div className="person-table-list">
        <div className="action-panel">
          <Button colors="primary">新增人员</Button>
          <Button colors="primary" onClick={this.onAddTable}>
            增加
          </Button>
          <Button colors="primary">修改</Button>
          <Button colors="danger">删除</Button>
          {this.props.currentNode}
          <FormControl
            className="demo5-input"
            onSearch={this.onSearch}
            type="search"
          />
        </div>
        <Table
          className="role-table"
          columns={columns}
          data={this.props.tableData}
          rowKey={recode => recode.id}
        />
        <Pagination
          first
          last
          prev
          next
          boundaryLinks
          items={this.props.totalPages}
          maxButtons={5}
          onSelect={this.handleSelect.bind(this)}
        />
      </div>
    );
  }
}

TreeTableModule.propTypes = {};

export default connect(state => state.PlanIndexProj)(TreeTableModule);
