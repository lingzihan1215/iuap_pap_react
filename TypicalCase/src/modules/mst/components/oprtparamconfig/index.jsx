import React, { Component } from "react";
import { actions } from "mirrorx";
import {
  Table,
  Button,
  Col,
  Row,
  Icon,
  InputGroup,
  FormControl,
  Checkbox,
  Pagination,
  Modal
} from "tinper-bee";
import NoData from "components/NoData";
import CheckTable from "components/CheckTable";
import DeleteModal from "components/DeleteModal";
import PageJump from "components/PageJump";

const OprtParamConfig = props => {
  const columns = [
    {
      title: "运行参数名称",
      dataIndex: "name",
      key: "name",
      width: 200
    },
    {
      title: "运行参数编码",
      dataIndex: "code",
      key: "code",
      width: 200
    },
    {
      title: "运行参数分类",
      dataIndex: "oprtparamclsname",
      key: "oprtparamclsname",
      width: 200
    },
    {
      title: "启用状态",
      dataIndex: "enablestate",
      key: "enablestate",
      width: 200
    },
    {
      title: "所属车间",
      dataIndex: "pk_workshop_name",
      key: "pk_workshop_name",
      width: 200
    },
    {
      title: "所属工段",
      dataIndex: "pk_section_name",
      key: "pk_section_name",
      width: 200
    },
    {
      title: "备注",
      dataIndex: "note",
      key: "note",
      width: 200
    }
  ];
  const childColumns = [
    {
      title: "行号",
      dataIndex: "crowno",
      key: "crowno",
      width: 100,
      render: (text, record, index) => {
        return <div>{index + 1}</div>;
      }
    },
    {
      title: "监视单元名称",
      dataIndex: "name",
      key: "name",
      width: 200
    },
    {
      title: "监视单元编码",
      dataIndex: "code",
      key: "code",
      width: 200
    },
    {
      title: "仪表位号编码",
      dataIndex: "instnocode",
      key: "instnocode",
      width: 200
    },
    {
      title: "仪表位号名称",
      dataIndex: "instnoname",
      key: "instnoname",
      width: 200
    },
    {
      title: "工况上限",
      dataIndex: "uplimit",
      key: "uplimit",
      width: 200
    },
    {
      title: "工况下限",
      dataIndex: "downlimit",
      key: "downlimit",
      width: 200
    },
    {
      title: "备注",
      dataIndex: "bodynote",
      key: "bodynote",
      width: 200
    }
  ];
  let handleSearchChange = key => {
    return e => {
      actions.oprtparamconfig.handleSearchChange({ [key]: e });
    };
  };
  return (
    <div className="me-wraps">
      <div className="me-header">
        <div className="header-btn">
          <Button
            colors="primary"
            className="header-btn-item"
            onClick={actions.oprtparamconfig.addHandler}
          >
            新增
          </Button>
          <Button
            colors="primary"
            className="header-btn-item"
            onClick={actions.oprtparamconfig.editHandler}
          >
            编辑
          </Button>
          <Button
            colors="primary"
            className="header-btn-item"
            onClick={actions.oprtparamconfig.enabledHandler}
          >
            启用
          </Button>
          <Button
            shape="border"
            colors="danger"
            className="header-btn-item warning-btn"
            onClick={actions.oprtparamconfig.disabledHandler}
          >
            停用
          </Button>
          <Button
            shape="border"
            colors="danger"
            className="header-btn-item warning-btn"
            onClick={actions.oprtparamconfig.delHandler}
          >
            删除
          </Button>
        </div>
        <div className="header-filter">
          <div className="filter-item">
            编码：<FormControl
              placeholder="请输入运行参数编码"
              value={props.scode}
              onChange={param =>
                actions.oprtparamconfig.handleSearchChange({
                  param: param,
                  key: "scode"
                })
              }
            />
          </div>
          <div className="filter-item">
            名称：<FormControl
              placeholder="请输入运行参数名称"
              value={props.sname}
              onChange={param =>
                actions.oprtparamconfig.handleSearchChange({
                  param: param,
                  key: "sname"
                })
              }
            />
          </div>
          <Button
            colors="primary"
            className="header-btn-item"
            onClick={actions.oprtparamconfig.handleQuery}
          >
            查询
          </Button>
          <Button
            style={{ color: "black" }}
            className="header-btn-item"
            onClick={actions.oprtparamconfig.clearHandler}
          >
            重置
          </Button>
        </div>
      </div>
      <CheckTable
        className="me-table"
        columns={columns}
        data={props.list}
        rowClassName={(record, index, event) =>
          actions.oprtparamconfig.rowClassNameHandler({ record, index, event })
        }
        onRowClick={(record, index, event) =>
          actions.oprtparamconfig.handleRowClick({ record, index, event })
        }
        selectedList={actions.oprtparamconfig.handleSelect}
        emptyText={NoData}
        rowKey={record => record.id}
      />
      <PageJump
        onChangePageSize={actions.oprtparamconfig.handleChangePageSize}
        onChangePageIndex={actions.oprtparamconfig.handleChangePageIndex}
        totalSize={props.totalSize}
        activePage={props.activePage}
        maxPage={Math.ceil(props.totalSize / props.pageSize)}
        pageSize={props.pageSize}
      />
      <Table
        className="me-table"
        style={{ marginTop: 20 }}
        columns={childColumns}
        data={props.bodyList}
        emptyText={NoData}
        rowKey={record => record.id}
      />
      <DeleteModal
        showDelModal={props.showDeleteModal}
        content="确定要删除吗"
        closeDelModal={actions.oprtparamconfig.handleDelCancel}
        delData={actions.oprtparamconfig.handleDelConfirm}
      />
    </div>
  );
};

export default OprtParamConfig;
