import React, { Component } from "react";
import { actions } from "mirrorx";
import {
  Panel,
  Button,
  Select,
  Table,
  Form,
  FormControl,
  InputGroup,
  Icon,
  Row,
  Col,
  Label
} from "tinper-bee";
import queryString from "query-string";
import commonref from "utils/commonref";
import createModal from "yyuap-ref";
import RefControl from "components/RefControl/index.js";
import Thermometer from "components/Thermometer/Thermometer";
import ContentGage from "components/Thermometer/ContentGage";
import Dnd from "tinper-bee/lib/Dnd";
import "./montiorsvgAdd.less";

const Option = Select.Option;
const FormItem = Form.FormItem;

const MonitorsvgAdd = props => {
  let {
    bgName,
    open,
    preview,
    tools,
    type,
    editState,
    editItems,
    coordinatex,
    coordinatey,
    high,
    width,
    vsize,
    vcolor,
    value,
    code,
    name,
    url,
    openway,
    vdatatype,
    dataSet,
    video,
    scale,
    data,
    showItem,
    attributex,
    attributey
  } = props;
  let {
    handleClickTools,
    handleChange,
    handleSubmit,
    save,
    handleCancelPreview,
    handlePreview,
    getPageXY,
    handleCancel,
    handleCloseEchart,
    handleOpenEchart,
    handleEditControl,
    handleMoveStart,
    handleMoveStop
  } = actions.monitorsvg;

  let qs = queryString.parse(location.search);

  let handleClick = type => () => handleClickTools({ type });
  let attributeValueChange = (type, typeNum) => e =>
    handleChange({ [type]: e, type, typeNum });
  let submit = type => () => handleSubmit(type);

  let moveStart = (result, position) => handleMoveStart({ result, position });
  let moveStop = (result, position) => handleMoveStop({ result, position });
  let editControl = itemId => e => handleEditControl(itemId);

  let HeadRefcallback = (ref, filedName) =>
    handleHeadChange({ ref: ref, type: filedName.type });
  let commonrefFun = params => {
    var option = commonref(params);
    createModal(option);
  };
  return (
    <div className="me-wraps">
      <div className="edit-btn">
        <div>
          <Button
            disabled={preview}
            colors="primary"
            className="header-btn-item"
            onClick={() => save({ open: !open })}
          >
            工具箱
          </Button>
          {preview ? (
            <Button
              colors="primary"
              className="header-btn-item"
              onClick={handleCancelPreview}
            >
              取消预览
            </Button>
          ) : (
            <Button
              colors="primary"
              className="header-btn-item"
              onClick={handlePreview}
            >
              预览
            </Button>
          )}
        </div>
        <div>
          <Button
            shape="border"
            style={{ color: "#000" }}
            onClick={actions.routing.goBack}
          >
            返回
          </Button>
        </div>
      </div>
      <Panel className="panel" collapsible expanded={open}>
        <div className="panel-item" onClick={handleClick(1)}>
          <Icon type="uf-file-o" />
          <span>静态文本</span>
        </div>
        <div className="panel-item" onClick={handleClick(2)}>
          <Icon type="iconfont icon-data" />
          <span>数据标签</span>
        </div>
        <div className="panel-item" onClick={handleClick(3)}>
          <Icon type="uf-link" />
          <span>链接</span>
        </div>
        <div className="panel-item" onClick={handleClick(4)}>
          <Icon type="iconfont icon-icon-test" />
          <span>开关量</span>
        </div>
        <div className="panel-item" onClick={handleClick(5)}>
          <Icon type="iconfont icon-yibiaopan" />
          <span>仪表盘</span>
        </div>
        <div className="panel-item" onClick={handleClick(6)}>
          <Icon type="iconfont icon-yewei" />
          <span>液位计</span>
        </div>
        <div className="panel-item" onClick={handleClick(7)}>
          <Icon type="iconfont icon-iconset0480" />
          <span>温度计</span>
        </div>
        <div className="panel-item" onClick={handleClick(8)}>
          <Icon type="uf-play-o" />
          <span>视频控件</span>
        </div>
        <div className="panel-item" onClick={handleClick(9)}>
          <Icon type="uf-histogram-s-o-2" />
          <span>图表控件</span>
        </div>
      </Panel>
      <div
        id="containSvg"
        style={{
          position: "relative",
          width: "100%"
          // backgroundImage: `url(${bgName ? require('../../../../static/images/' + bgName) : ''})`
        }}
      >
        <img
          style={{ width: "100%" }}
          src={bgName ? require("../../../../static/images/" + bgName) : ""}
        />
        <div
          className="tools-item"
          style={{ cursor: tools ? "crosshair" : "" }}
          onClick={e => getPageXY(e)}
        >
          {editItems.map((item, index) => {
            console.log(editItems, "eee");
            if (item.type == 1) {
              const itemId = item.id;
              return <div key={index} />;
            } else if (item.type == 2) {
              const itemId = item.id;
              return <div key={index} />;
            } else if (item.type == 3) {
              const itemId = item.id;
              return <div key={index} />;
            } else if (item.type == 4) {
              const itemId = item.id;
              return <div key={index} />;
            } else if (item.type == 5) {
              let option1 = {
                series: [
                  {
                    name: "业务指标",
                    type: "gauge",
                    min: 0, //最小范围
                    max: 220, //最大范围
                    splitNumber: Number(item.scale), //分割线个数
                    startAngle: 215, //开始角度
                    endAngle: -35, //结束角度
                    // 坐标轴线
                    axisLine: {
                      lineStyle: {
                        color: [
                          [0.2, "lime"],
                          [0.8, "#1e88e5"],
                          [1, "#ff4500"]
                        ],
                        width: 2,
                        shadowColor: "#fff", //默认透明
                        shadowBlur: 10
                      }
                    },
                    // 坐标轴小标记
                    axisLabel: {
                      textStyle: {
                        fontSize: 12,
                        color: "#fff",
                        shadowColor: "#fff", //默认透明
                        shadowBlur: 10
                      }
                    },
                    // 坐标轴小标记
                    axisTick: {
                      length: item.width > 299 ? 10 : 7, // 属性length控制线长
                      lineStyle: {
                        color: "auto",
                        shadowColor: "#fff",
                        shadowBlur: 10
                      }
                      //show:false
                    },
                    //分割线
                    splitLine: {
                      length: item.width > 299 ? 13 : 10, // 属性length控制线长
                      lineStyle: {
                        width: 2,
                        color: "#fff",
                        shadowColor: "#fff", //默认透明
                        shadowBlur: 10
                      }
                    },
                    //指针样式
                    pointer: {
                      length: "80%",
                      width: 3,
                      shadowColor: "#fff", //默认透明
                      shadowBlur: 5
                    },
                    //指针的圆点
                    markPoint: {
                      symbol: "circle",
                      symbolSize: 4,
                      data: [
                        {
                          x: "center",
                          y: "center",
                          itemStyle: { color: "#fff" }
                        }
                      ]
                    },
                    title: {
                      offsetCenter: ["0", Number(item.width) * 0.28],
                      textStyle: {
                        fontWeight: "bolder",
                        fontSize: item.vsize,
                        color: item.vcolor,
                        shadowColor: item.vcolor,
                        shadowBlur: 10
                      }
                    },
                    //显示具体的值
                    detail: {
                      textStyle: {
                        fontSize: 14,
                        fontWeight: "bolder"
                      },
                      offsetCenter: ["0", "50%"],
                      formatter: "{value}%"
                    },
                    //指针的值
                    data: [{ value: Number(item._data), name: item.name }]
                  }
                ]
              };
              const itemId = item.id;
              return <div key={index} />;
            } else if (item.type == 6) {
              const itemId = item.id;
              return (
                <div key={index}>
                  <ContextMenuTrigger id={"ALERT_MENU" + itemId}>
                    <Dnd
                      bounds=".tools-item"
                      onStart={(result, position) =>
                        moveStart(result, position)
                      }
                      onStop={(result, position) => moveStop(result, position)}
                    >
                      <div
                        id={itemId}
                        style={{
                          position: "absolute",
                          left: Number(item.coordinatex),
                          top: Number(item.coordinatey),
                          fontSize: Number(item.vsize),
                          color: item.vcolor,
                          fontWeight: 600,
                          cursor: "pointer",
                          textAlign: "center"
                        }}
                      >
                        <ContentGage
                          theme="light"
                          value={item._data}
                          max="100"
                          steps={item.scale}
                          format="L"
                          size={item.width}
                          height={item.high}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            bottom: 0,
                            width: "100%",
                            textAlign: "center"
                          }}
                        >
                          {item.name}
                        </div>
                      </div>
                    </Dnd>
                  </ContextMenuTrigger>
                  {preview ? (
                    ""
                  ) : (
                    <ContextMenu id={"ALERT_MENU" + itemId}>
                      <MenuItem
                        data={{ foo: "bar" }}
                        onClick={editControl(itemId)}
                      >
                        编辑
                      </MenuItem>
                      <MenuItem data={{ foo: "bar" }}>删除</MenuItem>
                      <MenuItem data={{ foo: "bar" }}>趋势</MenuItem>
                    </ContextMenu>
                  )}
                </div>
              );
            } else if (item.type == 7) {
              const itemId = item.id;
              return <div key={index} />;
            } else if (item.type == 8) {
              const itemId = item.id;
              return <div key={index} />;
            } else if (item.type == 9) {
              let option = {
                title: {
                  text: ""
                },
                tooltip: {
                  trigger: "axis"
                },
                legend: {
                  left: "left",
                  data: ["邮件", "联盟", "视频", "访问", "搜索"]
                },
                grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "3%",
                  containLabel: true
                },
                toolbox: {
                  show: true,
                  feature: {
                    dataZoom: {
                      yAxisIndex: "none"
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ["line", "bar"] },
                    restore: {}
                    //saveAsImage: {}
                  }
                },
                xAxis: {
                  type: "category",
                  boundaryGap: false,
                  data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                },
                yAxis: {
                  type: "value"
                },
                series: [
                  {
                    name: "邮件",
                    type: "line",
                    stack: "总量",
                    data: [120, 132, 101, 134, 90, 230, 210]
                  },
                  {
                    name: "联盟",
                    type: "line",
                    stack: "总量",
                    data: [220, 182, 191, 234, 290, 330, 310]
                  },
                  {
                    name: "视频",
                    type: "line",
                    stack: "总量",
                    data: [150, 232, 201, 154, 190, 330, 410]
                  },
                  {
                    name: "访问",
                    type: "line",
                    stack: "总量",
                    data: [320, 332, 301, 334, 390, 330, 320]
                  },
                  {
                    name: "搜索",
                    type: "line",
                    stack: "总量",
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                  }
                ]
              };
              const itemId = item.id;
              return <div key={index} />;
            }
          })}
        </div>
        <div
          className="attribute"
          style={{
            display: editState ? "" : "none",
            position: "absolute",
            left: Number(attributex),
            top: Number(attributey),
            zIndex: 10,
            borderRadius: 3
          }}
        >
          <p>属性</p>
          <div className="layout">
            <span>样式</span>
            <div className="layout-item">
              <span className="item-title">x</span>
              <FormControl
                type="text"
                value={coordinatex}
                onChange={attributeValueChange("coordinatex", type)}
              />
            </div>
            <div className="layout-item">
              <span className="item-title">y</span>
              <FormControl
                type="text"
                value={coordinatey}
                onChange={attributeValueChange("coordinatey", type)}
              />
            </div>
            {type == 6 || type == 7 ? (
              <div>
                <div className="layout-item">
                  <span className="item-title">高度</span>
                  <FormControl
                    type="text"
                    value={high}
                    onChange={attributeValueChange("high")}
                  />
                </div>
                <div className="layout-item">
                  <span className="item-title">宽度</span>
                  <Select
                    className="select"
                    value={width}
                    onChange={attributeValueChange("width")}
                    defauleValue={width}
                  >
                    <Option value="small">较小</Option>
                    <Option value="normal">正常</Option>
                    <Option value="large">较大</Option>
                  </Select>
                </div>
              </div>
            ) : type == 5 || type == 8 || type == 9 ? (
              <div>
                <div className="layout-item">
                  <span className="item-title">高度</span>
                  <FormControl
                    type="text"
                    value={high}
                    onChange={attributeValueChange("high", type)}
                  />
                </div>
                <div className="layout-item">
                  <span className="item-title">宽度</span>
                  <FormControl
                    type="text"
                    value={width}
                    onChange={attributeValueChange("width", type)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div>
              <div className="layout-item">
                <span className="item-title">字体大小</span>
                <FormControl
                  type="text"
                  value={vsize}
                  onChange={attributeValueChange("vsize")}
                />
              </div>
              <div className="layout-item">
                <span className="item-title">字体颜色</span>
                <FormControl
                  type="color"
                  value={vcolor}
                  onChange={attributeValueChange("vcolor")}
                />
              </div>
            </div>
          </div>
          <div className="layout">
            <span>数据</span>
            <div className="layout-item">
              <span className="item-title">编码</span>
              <FormControl disabled type="text" value={code} />
            </div>
            {type == 1 ? (
              <div className="layout-item">
                <span className="item-title">文本</span>
                <FormControl
                  type="text"
                  value={value}
                  onChange={attributeValueChange("value")}
                />
              </div>
            ) : (
              ""
            )}
            {type != 1 ? (
              <div className="layout-item">
                <span className="item-title">名称</span>
                <FormControl
                  type="text"
                  value={name}
                  onChange={attributeValueChange("name")}
                />
              </div>
            ) : (
              ""
            )}
            {type == 3 ? (
              <div>
                <div className="layout-item">
                  <span className="item-title">源url</span>
                  <FormControl
                    type="text"
                    value={url}
                    onChange={attributeValueChange("url")}
                  />
                </div>
                <div className="layout-item">
                  <span className="item-title">打开方式</span>
                  <Select
                    className="select"
                    value={openway}
                    onChange={attributeValueChange("openway")}
                    defauleValue={openway}
                  >
                    <Option value="1">新窗口打开</Option>
                    <Option value="2">本窗口打开</Option>
                  </Select>
                </div>
              </div>
            ) : (
              ""
            )}
            {type == 9 ? (
              <div className="layout-item">
                <span className="item-title">数据类型</span>
                <FormControl
                  type="text"
                  value={vdatatype}
                  onChange={attributeValueChange("vdatatype")}
                />
              </div>
            ) : (
              ""
            )}
            {type != 1 && type != 3 && type != 8 ? (
              <div className="layout-item">
                <span className="item-title">数据集</span>
                <FormControl
                  type="text"
                  value={dataSet}
                  onChange={attributeValueChange("dataSet")}
                />
                <i className="iconfont icon-canzhao" />
              </div>
            ) : (
              ""
            )}
            {type == 8 ? (
              <div className="layout-item">
                <span className="item-title">视频服务</span>
                <FormControl
                  type="text"
                  value={video}
                  onChange={attributeValueChange("video")}
                />
              </div>
            ) : (
              ""
            )}
            {type == 5 || type == 6 || type == 7 ? (
              <div className="layout-item">
                <span className="item-title">分度格数</span>
                <FormControl
                  type="text"
                  value={scale}
                  onChange={attributeValueChange("scale")}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="layout">
            <Button colors="primary" onClick={submit(type)}>
              保存
            </Button>
            <Button
              shape="border"
              style={{ color: "#000" }}
              onClick={handleCancel}
            >
              取消
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MonitorsvgAdd;
