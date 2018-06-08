import React, { Component } from "react";
import { actions } from "mirrorx";
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Select,
  Form,
  Switch,
  Modal,
  Icon
} from "tinper-bee";
import CheckTable from "components/CheckTable";
import NoData from "components/NoData";
import RefControl from "components/RefControl";
import createModal from "yyuap-ref";
import DeleteModal from "components/DeleteModal";
import commonref from "utils/commonref";
import docInfo from "utils/docInfo";
const FormItem = Form.FormItem;

const AlertConfigAdd = props => {
  const columns = [
    {
      title: "行号",
      dataIndex: "rownum",
      key: "rownum",
      width: 50,
      render: (text, record, index) => {
        return <div>{index + 1}</div>;
      }
    },
    {
      title: "监视单元名称",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text, record, index) => (
        <FormControl
          value={record.name}
          onChange={value => bodyValueChange("name", value, record)}
        />
      )
    },
    {
      title: "监视单元编码",
      dataIndex: "code",
      key: "code",
      width: 400,
      render: (text, record, index) => (
        <FormControl
          value={record.code}
          onChange={value => bodyValueChange("code", value, record)}
        />
      )
    },
    {
      title: "仪表位号名称",
      dataIndex: "instnoname",
      key: "instnoname",
      width: 200,
      render: (text, record, index) => (
        <div>
          <span className="table-require">*</span>
          <RefControl
            value={record.instnoname}
            onSearch={() =>
              commonrefFun({
                title: "仪表位号",
                refType: 2,
                isRadio: true,
                hasPage: true,
                refCode: "commongrid",
                callback: BodyRefcallback,
                fieldName: { index: index, flag: "name" },
                queryparams: {
                  tablename: "ims_instagno",
                  codefield: "vcode",
                  namefield: "vname"
                }
              })
            }
            placeholder="请选择仪表位号名称"
          />
        </div>
      )
    },
    {
      title: "仪表位号编码",
      dataIndex: "instnocode",
      key: "code",
      width: 400,
      render: (text, record, index) => (
        <FormControl
          disabled
          value={record.instnocode}
          onChange={value => bodyValueChange("instnocode", value, record)}
        />
      )
    },
    {
      title: "工况上限",
      dataIndex: "uplimit",
      key: "uplimit",
      width: 200,
      render: (text, record, index) => (
        <FormControl
          value={record.uplimit}
          onChange={value => bodyValueChange("uplimit", value, record)}
        />
      )
    },
    {
      title: "工况下限",
      dataIndex: "downlimit",
      key: "downlimit",
      width: 200,
      render: (text, record, index) => (
        <FormControl
          value={record.downlimit}
          onChange={value => bodyValueChange("downlimit", value, record)}
        />
      )
    },
    {
      title: "备注",
      dataIndex: "bodynote",
      key: "bodynote",
      width: 200,
      render: (text, record, index) => (
        <FormControl
          value={record.bodynote}
          onChange={value => bodyValueChange("bodynote", value, record)}
        />
      )
    }
  ];
  let commonrefFun = params => {
    var option = commonref(params);
    createModal(option);
  };
  const BodyRefcallback = (ref, param) => {
    actions.oprtparamconfig.bodyRefAction({
      ref: ref,
      index: param.index,
      flag: param.flag
    });
  };
  const HeadRefcallback = (ref, param) => {
    actions.oprtparamconfig.headRefAction({ ref, param });
  };
  let headValueChange = type => {
    return e => {
      actions.oprtparamconfig.handleHeadChange({ [type]: e });
    };
  };
  let bodyValueChange = (type, value, record) => {
    let data = { type, value, record };
    actions.oprtparamconfig.handleBodyChange(data);
  };
  return (
    <div className="me-wraps">
      <div className="edit-btns">
        <Button
          colors="primary"
          isSubmit={true}
          onClick={actions.oprtparamconfig.handleSubmit}
        >
          保存
        </Button>
        <Button shape="border" onClick={actions.oprtparamconfig.handleCancle}>
          取消
        </Button>
      </div>
      <Form
        className="edit-form"
        useRow={true}
        showSubmit={false}
        checkFormNow={props.checkFormNow}
      >
        <FormItem
          showMast={true}
          labelMd={2}
          md={4}
          labelName="运行参数编码："
          isRequire={true}
          reg={/^[A-Za-z0-9]+$/}
          valuePropsName="code"
          method="blur"
          errorMessage="运行参数编码格式错误"
          inline={true}
        >
          <FormControl
            name="code"
            type="input"
            value={props.code}
            onChange={headValueChange("code")}
            placeholder="请输入运行参数编码"
          />
        </FormItem>
        <FormItem
          showMast={true}
          labelMd={2}
          md={4}
          labelName="运行参数名称："
          isRequire={true}
          valuePropsName="name"
          method="blur"
          errorMessage="请输入运行参数名称"
          inline={true}
        >
          <FormControl
            name="name"
            type="input"
            value={props.name}
            onChange={headValueChange("name")}
            placeholder="请输入运行参数名称"
          />
        </FormItem>
        <FormItem
          labelMd={2}
          md={4}
          labelName="启用状态："
          valuePropsName="enablestate"
          inline={true}
        >
          <FormControl disabled value={props.enablestate} />
        </FormItem>
        <FormItem
          showMast={true}
          labelMd={2}
          md={4}
          labelName="所属车间："
          isRequire={true}
          valuePropsName="pk_workshop_name"
          method="change"
          errorMessage="请输入车间"
          inline={true}
        >
          <RefControl
            name="pk_workshop_name"
            value={props.pk_workshop_name}
            onSearch={() =>
              commonrefFun({
                title: "车间",
                refType: 1,
                isRadio: true,
                hasPage: true,
                refCode: "commontree",
                callback: HeadRefcallback,
                fieldName: { key: "pk_workshop" },
                queryparams: { ...docInfo("dept"), condition: { dr: "0" } }
              })
            }
            placeholder="请选择车间"
          />
        </FormItem>
        <FormItem
          showMast={true}
          labelMd={2}
          md={4}
          labelName="所属工段："
          isRequire={true}
          valuePropsName="pk_section_name"
          method="change"
          errorMessage="请输入工段"
          inline={true}
        >
          <RefControl
            name="pk_section_name"
            value={props.pk_section_name}
            onSearch={() =>
              commonrefFun({
                title: "工段",
                refType: 2,
                isRadio: true,
                hasPage: true,
                refCode: "commongrid",
                callback: HeadRefcallback,
                fieldName: { key: "pk_section" },
                queryparams: { ...docInfo("process"), condition: { dr: "0" } }
              })
            }
            placeholder="请选择工段"
          />
        </FormItem>
        <FormItem
          showMast={true}
          labelMd={2}
          md={4}
          labelName="运行参数分类："
          isRequire={true}
          valuePropsName="oprtparamclsname"
          method="change"
          errorMessage="请输入运行参数分类"
          inline={true}
        >
          <FormControl
            name="oprtparamclsname"
            type="input"
            value={props.oprtparamclsname}
            onChange={headValueChange("oprtparamclsname")}
            placeholder="请输入运行参数分类"
          />
        </FormItem>
        <FormItem
          showMast={false}
          labelMd={2}
          md={4}
          labelName="备注："
          isRequire={false}
          valuePropsName="note"
          method="blur"
          errorMessage="请输入备注"
          inline={true}
        >
          <FormControl
            name="note"
            type="input"
            value={props.note}
            onChange={headValueChange("note")}
            placeholder="请输入备注"
          />
        </FormItem>
      </Form>
      <div className="me-header">
        <div className="header-btn">
          <Button
            colors="primary"
            className="header-btn-item"
            onClick={actions.oprtparamconfig.handleAddRow}
          >
            增行
          </Button>
          <Button
            colors="primary"
            className="header-btn-item"
            onClick={actions.oprtparamconfig.handleDelRow}
          >
            删行
          </Button>
        </div>
      </div>
      <CheckTable
        className="me-table"
        columns={columns}
        data={props.addList}
        selectedList={actions.oprtparamconfig.addHandleSelect}
        emptyText={NoData}
        rowKey={record => record.crowno}
      />
      <DeleteModal
        showDelModal={props.addShowDeleteModal}
        content="确定要删除吗"
        closeDelModal={actions.oprtparamconfig.addHandleDelCancel}
        delData={actions.oprtparamconfig.addHandleDelConfirm}
      />
      <Modal
        show={props.showSaveModel}
        style={{ width: 500 }}
        className="modal-style"
        onHide={actions.oprtparamconfig.closeSaveModal}
      >
        <Modal.Header className="u-modal-header" closeButton>
          <Modal.Title>确认取消</Modal.Title>
        </Modal.Header>

        <Modal.Body className="u-modal-body">
          <Icon type="uf-exc-t-o" />
          确认取消吗
        </Modal.Body>

        <Modal.Footer
          className="u-modal-footer "
          style={{ background: "white" }}
        >
          <Button
            colors="primary"
            className="btn-ok"
            onClick={actions.oprtparamconfig.leaveSave}
          >
            确认
          </Button>
          <Button
            className="btn-cancel"
            onClick={actions.oprtparamconfig.closeSaveModal}
          >
            取消
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AlertConfigAdd;
