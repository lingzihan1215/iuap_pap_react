import React, { Component } from "react";
import { actions } from "mirrorx";
import {
  Table,
  Button,
  Col,
  Row,
  Switch,
  Tree,
  Form,
  FormControl,
  Icon,
  Modal,
  Checkbox
} from "tinper-bee";
import PageJump from "components/PageJump";
import CheckTable from "components/CheckTable";
import { Info, Error } from "utils";
import { log } from "util";
import DeleteModal from "components/DeleteModal";
import NoData from "components/NoData";

import "./index.less";

const TreeNode = Tree.TreeNode;
const FormItem = Form.FormItem;

const PlanIndexProj = ({
  PlanIndexProj,
  selectedRow,
  selectedList,
  searchParam,
  checkFormNow,
  expandedKeys,
  selectedKeys,
  autoExpandParent,
  modalstate,
  showModal,
  showAddModal,
  treeNodes,
  dataList,
  size,
  number,
  totalPages,
  totalElements,
  location
}) => {
  const editPageHandler = () => {
    if (
      PlanIndexProj.values == undefined ||
      (PlanIndexProj.values && PlanIndexProj.values.id.value == undefined)
    ) {
      Info("未选中项目,无法编辑！");
    } else {
      actions.PlanIndexProj.change_modalstate("edit");
      actions.PlanIndexProj.showAddModal();
    }
  };
  const deleteHandler = () => {
    if (selectedList == [] || selectedList[0] == undefined) {
      Info("未选中项目,无法删除！");
    } else {
      actions.PlanIndexProj.showModal();
    }
  };
  const AddPageHandler = () => {
    actions.PlanIndexProj.change_modalstate("add");
    actions.PlanIndexProj.showAddModal();
  };
  const selectPageHandler = (selectedKeys, data) => {
    actions.PlanIndexProj.load_proj(selectedKeys);
  };
  const clickPageHandler = (record, index, event) => {
    actions.PlanIndexProj.row_click({ record: record, index: index });
  };
  const checkForm = (flag, obj) => {
    if (flag) {
      actions.PlanIndexProj.changeCheckFlag({
        checkFormNow: false,
        isCheckOk: true
      });
    } else {
      actions.PlanIndexProj.changeCheckFlag({
        checkFormNow: false,
        isCheckOk: false
      });
    }
    actions.PlanIndexProj.saveData(obj);
  };
  const LoadDataHandler = node => {
    actions.PlanIndexProj.loadData(node);
    return datathen;
  };
  let datathen = {
    then: fun => {
      fun();
    }
  };
  function rowClassNameHandler(record, index, indent) {
    if (selectedRow[index]) {
      return "selected";
    } else {
      return "";
    }
  }
  const ExpandHandler = (expandedKeys, data) => {
    actions.PlanIndexProj.ExpandHandler(expandedKeys);
  };
  const columns = [
    {
      title: "指标项目编码",
      dataIndex: "index_code",
      key: "index_code",
      width: 222,
      render(text, record, index) {
        return (
          <div>
            {record.values.index_code ? record.values.index_code.value : "——"}
          </div>
        );
      }
    },
    {
      title: "指标项目名称",
      dataIndex: "index_name",
      key: "index_name",
      width: 222,
      render(text, record, index) {
        return (
          <div>
            {record.values.index_name ? record.values.index_name.value : "——"}
          </div>
        );
      }
    },
    {
      title: "指标计量单位",
      dataIndex: "measureunit",
      key: "measureunit",
      width: 222,
      render(text, record, index) {
        return (
          <div>
            {record.values.measureunit ? record.values.measureunit.value : "——"}
          </div>
        );
      }
    },
    {
      title: "是否自动分解",
      dataIndex: "isauto",
      key: "isauto",
      width: 222,
      render(text, record, index) {
        return (
          <div>
            <Switch
              disable
              checked={
                record.values.isauto ? record.values.isauto.value == 0 : 0
              }
            />
          </div>
        );
      }
    }
  ];

  return (
    <div className="me-wraps">
      <div className="me-header">
        <div className="header-btn">
          <Button
            className="header-btn-item"
            colors="primary"
            onClick={AddPageHandler}
          >
            新增
          </Button>
          <Button
            className="header-btn-item "
            colors="primary"
            onClick={editPageHandler}
          >
            编辑
          </Button>
          <Button
            colors="primary"
            className="header-btn-item"
            onClick={() =>
              actions.PlanIndexProj.en_disable({
                type: "enable"
              })
            }
          >
            启用
          </Button>
          <Button
            shape="border"
            colors="danger"
            className="warning-btn header-btn-item"
            onClick={() =>
              actions.PlanIndexProj.en_disabled({
                type: "disable"
              })
            }
          >
            停用
          </Button>
          <Button
            className="header-btn-item warning-btn "
            onClick={deleteHandler}
          >
            删除
          </Button>
          <DeleteModal
            showDelModal={showModal}
            closeDelModal={actions.PlanIndexProj.closeModal}
            delData={actions.PlanIndexProj.delete}
          />
        </div>

        <div className="header-filter">
          <div className="filter-item">
            指标项目编码：<FormControl
              value={searchParam.code}
              placeholder="请输入指标项目编码"
              onChange={param =>
                actions.PlanIndexProj.qryValueChange({
                  param: param,
                  key: "code"
                })
              }
            />
          </div>
          <div className="filter-item">
            指标项目名称：<FormControl
              value={searchParam.name}
              placeholder="请输入指标项目名称"
              onChange={param =>
                actions.PlanIndexProj.qryValueChange({
                  param: param,
                  key: "name"
                })
              }
            />
          </div>
          <Checkbox
            className="filter-item"
            onChange={param =>
              actions.PlanIndexProj.qryValueChange({
                param: param,
                key: "seeDisable"
              })
            }
            checked={searchParam.seeDisable}
          >
            显示停用
          </Checkbox>
          <Button
            colors="primary"
            className="header-btn-item"
            onClick={actions.PlanIndexProj.qryByParam}
          >
            查询
          </Button>
          <Button
            style={{ color: "black" }}
            className="header-btn-item"
            onClick={actions.PlanIndexProj.qryValueClear}
          >
            重置
          </Button>
        </div>
      </div>
      <div className="page">
        <Row className="u-row">
          <Col className="treeCol" md={3} xs={3} sm={3}>
            <div className="treeDiv">
              <Tree
                className="tree"
                onSelect={selectPageHandler}
                loadData={LoadDataHandler}
                onExpand={ExpandHandler}
                expandedKeys={expandedKeys}
                selectedKeys={selectedKeys}
                autoExpandParent={autoExpandParent}
              >
                {treeNodes}
              </Tree>
            </div>
          </Col>
          <Col className="tableCol" md={8} xs={8} sm={8}>
            <CheckTable
              columns={columns}
              data={dataList}
              className="me-table"
              onRowClick={clickPageHandler}
              selectedList={checkedList =>
                actions.PlanIndexProj.selectDel(checkedList)
              }
              emptyText={() => {
                return <NoData />;
              }}
              rowClassName={rowClassNameHandler}
            />
            <PageJump
              pageSize={size}
              activePage={number}
              maxPage={totalPages}
              totalSize={totalElements}
              onChangePageSize={page =>
                actions.PlanIndexProj.onChangePageSize(page)
              }
              onChangePageIndex={value =>
                actions.PlanIndexProj.onChangePageIndex(value)
              }
            />
            <Modal
              show={showAddModal}
              style={{ width: 500 }}
              className="modal-style"
              onHide={actions.PlanIndexProj.closeAddModal}
            >
              <Modal.Header className="u-modal-header" closeButton>
                <Modal.Title>
                  {modalstate == "add" ? "新增" : "编辑"}
                </Modal.Title>
              </Modal.Header>

              <Modal.Body className="u-modal-body">
                <Form
                  showSubmit={false}
                  useRow={false}
                  submitCallBack={(flag, obj) => checkForm(flag, obj)}
                  checkFormNow={checkFormNow}
                >
                  <FormItem
                    className="u-form-item"
                    showMast={true}
                    labelName="指标项目编码:"
                    isRequire={true}
                    errorMessage="请输入指标项目编码"
                    method="blur"
                    inline={true}
                  >
                    <FormControl
                      name="index_code"
                      placeholder="请输入指标项目编码"
                      value={
                        modalstate === "edit"
                          ? PlanIndexProj.values
                            ? PlanIndexProj.values.index_code
                              ? PlanIndexProj.values.index_code.value
                              : ""
                            : ""
                          : ""
                      }
                    />
                  </FormItem>
                  <FormItem
                    className="u-form-item"
                    showMast={true}
                    labelName="指标项目名称:"
                    isRequire={true}
                    errorMessage="请输入指标项目名称"
                    method="blur"
                    inline={true}
                  >
                    <FormControl
                      name="index_name"
                      placeholder="请输入指标项目名称"
                      value={
                        modalstate === "edit"
                          ? PlanIndexProj.values
                            ? PlanIndexProj.values.index_name
                              ? PlanIndexProj.values.index_name.value
                              : ""
                            : ""
                          : ""
                      }
                    />
                  </FormItem>

                  <FormItem
                    className="u-form-item"
                    showMast={true}
                    labelName="指标计量单位:"
                    isRequire={true}
                    errorMessage="请输入指标计量单位"
                    method="blur"
                    inline={true}
                  >
                    <FormControl
                      name="measureunit"
                      placeholder="请输入指标计量单位"
                      value={
                        modalstate === "edit"
                          ? PlanIndexProj.values
                            ? PlanIndexProj.values.measureunit
                              ? PlanIndexProj.values.measureunit.value
                              : ""
                            : ""
                          : ""
                      }
                    />
                  </FormItem>

                  <FormItem
                    className="u-form-item"
                    showMast={true}
                    labelName="是否自动分解:"
                    isRequire={false}
                    method="blur"
                    inline={true}
                  >
                    <Switch
                      name="isauto"
                      defaultChecked={
                        modalstate === "edit"
                          ? PlanIndexProj.values
                            ? PlanIndexProj.values.isauto
                              ? PlanIndexProj.values.isauto.value == 0
                              : 1
                            : 1
                          : 1
                      }
                    />
                  </FormItem>
                </Form>
              </Modal.Body>

              <Modal.Footer className="u-modal-footer">
                <Button
                  colors="primary"
                  className="btn-ok"
                  onClick={actions.PlanIndexProj.startCheck}
                >
                  保存
                </Button>
                <Button
                  className="btn-cancel"
                  onClick={actions.PlanIndexProj.closeAddModal}
                >
                  取消
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PlanIndexProj;
