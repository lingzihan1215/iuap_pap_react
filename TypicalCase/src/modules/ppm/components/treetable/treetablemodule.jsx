import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "bee-form";
import {
  Table,
  Button,
  Col,
  Row,
  Modal,
  FormControl,
  Pagination
} from "tinper-bee";
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
const TD = [
  {
    id: "cde88da4-756d-40af-8acc-7aed6473861a",
    dr: 0,
    ts: null,
    version: 0,
    lastModified: null,
    lastModifyUser: null,
    createTime: null,
    createUser: null,
    peoname: "小芳",
    peocode: "01_02",
    institid: "536aab12-819f-48b4-93f5-5ac8f76b1f4b",
    institname: "用友财务_01",
    worktel: "18701517173",
    email: null,
    sex: null,
    tel: null,
    office: null,
    countryzone: null,
    operate: null,
    key: 1
  },
  {
    id: "d3fd49d7-cb90-4640-8464-7c2e0d9cabb1",
    dr: 0,
    ts: null,
    version: 0,
    lastModified: null,
    lastModifyUser: null,
    createTime: null,
    createUser: null,
    peoname: "小帅(请勿删除哦)",
    peocode: "0203",
    institid: "536aab12-819f-48b4-93f5-5ac8f76b1f4b",
    institname: "用友财务_01",
    worktel: "18701517173",
    email: null,
    sex: null,
    tel: null,
    office: null,
    countryzone: null,
    operate: null,
    key: 2
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
    console.log(e);
  };
  dataNumSelect = e => {
    console.log(e);
  };
  render() {
    return (
      <div>
        <Col md={8} xs={8} sm={8}>
          <Col md={4} xs={4} sm={4}>
            <Button colors="primary">新增人员</Button>
          </Col>
          <Col md={4} xs={4} sm={4}>
            节点名称
          </Col>
          <Col md={4} xs={4} sm={4}>
            <FormControl
              className="demo5-input"
              onSearch={this.onSearch}
              type="search"
            />
          </Col>
          <div>
            <Col md={12} xs={12} sm={12}>
              <Table columns={columns} data={TD} />
            </Col>
            <Col md={12} xs={12} sm={12}>
              <Pagination
                first
                last
                prev
                next
                boundaryLinks
                items={11}
                maxButtons={5}
                activePage={this.state.activePage}
                onSelect={this.handleSelect.bind(this)}
              />
            </Col>
          </div>
        </Col>
      </div>
    );
  }
}

TreeTableModule.propTypes = {};

export default TreeTableModule;
