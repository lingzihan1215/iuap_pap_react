/**
 * 监视画面业务组件
 */
import React, { Component } from "react";
import { actions, Link } from "mirrorx";
import {
  Button,
  Form,
  FormControl,
  Tree,
  Row,
  Col,
  InputGroup,
  FormGroup,
  Upload,
  Icon
} from "tinper-bee";
import DeleteModal from "components/DeleteModal";

import "./index.less";
import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants";

const TreeNode = Tree.TreeNode;
const FormItem = Form.FormItem;

const MonitorSvg = props => {
  let { treeNodes, monitorcode, monitorname, searchValue, bgName } = props;
	//生成树
  const loop = data =>
    data.map(item => {
      const index = item.key.search(searchValue);
      const beforeStr = item.key.substr(0, index);
      const afterStr = `${item.key} -> ${item.title}`.substr(
        index + searchValue.length
      );
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="u-tree-searchable-filter">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{`${item.key} -> ${item.title}`}</span>
        );
      if (item.children) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    });
  const valueChange = type => {
    return e => {
      actions.monitorsvg.handleValueChange({ [type]: e });
    };
	};
	// 选择树节点
  const onTreeNodeSelect = (selectedKeys, e) => {
    let selectNode = {};
    if (e.selected) {
      selectNode.monitorname = e.selectedNodes[0].props.monitorname;
      selectNode.monitorcode = e.selectedNodes[0].props.monitorcode;
    } else {
      selectNode.monitorname = null;
      selectNode.title = null;
    }
    actions.monitorsvg.onTreeNodeSelect(selectNode);
  };

  return (
    <div className="me-wraps">
      <div className="me-header">
        <div className="header-btn">
          {props.pagestate == "viewstate" ? (
            <Button
              colors="primary"
              className="header-btn-item"
              onClick={actions.monitorsvg.onSameLevelClick}
            >
              同级增加
            </Button>
          ) : (
            ""
          )}
          {props.pagestate == "viewstate" ? (
            <Button
              colors="primary"
              className="header-btn-item"
              onClick={actions.monitorsvg.onSubLevelClick}
            >
              下级增加
            </Button>
          ) : (
            ""
          )}
          {props.pagestate == "viewstate" ? (
            <Button
              colors="primary"
              className="header-btn-item"
              onClick={actions.monitorsvg.handleEdit}
            >
              编辑
            </Button>
          ) : (
            ""
          )}
          {props.pagestate == "viewstate" ? (
            <Button
              shape="border"
              colors="danger"
              className="header-btn-item warning-btn"
              onClick={actions.monitorsvg.onDelClick}
            >
              删除
            </Button>
          ) : (
            ""
          )}
          {props.pagestate == "viewstate" ? (
            <Button
              colors="primary"
              className="header-btn-item"
              onClick={actions.monitorsvg.handleEditSvg}
            >
              编辑底图
            </Button>
          ) : (
            ""
          )}
          <Upload
            showUploadList={false}
            disabled={bgName ? true : false}
            onChange={res => actions.monitorsvg.handleUpLoad(res)}
          >
            {props.pagestate == "viewstate" ? (
              <Button
                colors="primary"
                className="header-btn-item"
                onClick={actions.monitorsvg.handleUpPic}
              >
                导入底图
              </Button>
            ) : (
              ""
            )}
          </Upload>
          {props.pagestate == "viewstate" ? (
            <Button
              shape="border"
              colors="danger"
              className="header-btn-item warning-btn"
              onClick={actions.monitorsvg.onSameLevelClick}
            >
              删除底图
            </Button>
          ) : (
            ""
          )}
          <div className="btn-save-edit">
            {props.pagestate != "viewstate" ? (
              <Button
                className="header-btn-item"
                colors="primary"
                onClick={actions.monitorsvg.saveHandler}
              >
                保存
              </Button>
            ) : (
              ""
            )}
            {props.pagestate != "viewstate" ? (
              <Button
                className="header-btn-item warning-btn"
                onClick={actions.monitorsvg.cancelHandler}
              >
                取消
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="page">
        <Row className="u-row">
          <Col className="treeCol" md={3} xs={3} sm={3}>
            <div className="treeDiv">
              <InputGroup simple>
                <FormControl
                  style={{ width: 260, marginLeft: 20 }}
                  placeholder="请输入编码搜索"
                  onChange={value =>
                    actions.monitorsvg.onSearchValueChange(value)
                  }
                />
                <InputGroup.Button shape="border">
                  <span className="uf uf-search"> </span>
                </InputGroup.Button>
              </InputGroup>
              <Tree
                className="tree"
                showLine
                multiple={false}
                onSelect={(selectedKeys, e) =>
                  onTreeNodeSelÎect(selectedKeys, e)
                }
              >
                {loop(props.treeData)}
              </Tree>
            </div>
          </Col>
          <Col className="tableCol" md={8} xs={8} sm={8}>
            <Form useRow={true} showSubmit={false}>
              <FormItem
                showMast={true}
                inline={true}
                labelMd={2}
                md={4}
                labelName="监视图编码："
                isRequire={false}
                method="blur"
              >
                <FormControl
                  disabled={props.pagestate == "viewstate"}
                  name="monitorcode"
                  value={monitorcode}
                />
              </FormItem>
              <FormItem
                showMast={true}
                inline={true}
                labelMd={2}
                md={4}
                labelName="监视图名称："
                isRequire={false}
                method="blur"
              >
                <FormControl
                  disabled={props.pagestate == "viewstate"}
                  name="monitorname"
                  value={monitorname}
                />
              </FormItem>
            </Form>
            {bgName ? (
              <img
                style={{ width: "100%", height: 370 }}
                src={require("../../../../static/images/" + bgName)}
              />
            ) : (
              ""
            )}
          </Col>
        </Row>
        <DeleteModal
          showDelModal={props.showDelModal}
          content="确定要删除吗？"
          closeDelModal={actions.monitorsvg.handleDelCancel}
          delData={actions.monitorsvg.handleDelConfirm}
        />
      </div>
    </div>
  );
};

export default MonitorSvg;
