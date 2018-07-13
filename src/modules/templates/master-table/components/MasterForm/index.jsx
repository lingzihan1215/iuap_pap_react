import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import queryString from 'query-string';
import { InputNumber, Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Radio } from "tinper-bee";
import NoData from 'components/NoData';
import { BpmTaskApprovalWrap } from 'yyuap-bpm';
import AcUpload from 'ac-upload';
import Header from "components/Header";
import DatePicker from 'bee-datepicker';
import Form from 'bee-form';
import Select from 'bee-select';
import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import moment from "moment";

import ChildTable from '../ChildTable'
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './index.less';
import 'ac-upload/build/ac-upload.css';

const FormItem = Form.FormItem;
const Option = Select.Option;

class MasterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approvalState: '0',
            closeState: '0',
            confirmState: '0',
            fileNameData: props.rowData.attachment || [],//上传附件数据
            purchasing: [],
            rowData: {},
            refKeyArray: [],
        }
    }
    async componentWillMount() {
        if (this.props.rowData && this.props.rowData.id) {
            let { approvalState, closeState, confirmState } = this.props.rowData;
            this.setState({
                approvalState: String(approvalState),
                closeState: String(closeState),
                confirmState: String(confirmState)
            })
        }
        await actions.mastertable.getOrderTypes();
        let searchObj = queryString.parse(this.props.location.search);
        let { btnFlag } = searchObj;
        if (btnFlag && btnFlag > 0) {
            let { search_id } = searchObj;
            let tempRowData = await actions.mastertable.queryDetail({ search_id });
            let rowData = {};
            if (tempRowData) {
                let temppetId = tempRowData.petId
                let temppetIdSr = tempRowData.petIdSr
                this.setState({
                    refKeyArray: temppetId ? [temppetId] : [],
                })
                rowData = Object.assign({}, tempRowData,
                    { petId: temppetIdSr },
                )
            }
            console.log('rowData', rowData);
            this.setState({
                rowData: rowData,
            })
        }

    }
    save = () => {//保存
        this.props.form.validateFields((err, values) => {
            values.attachment = this.state.fileNameData;
            values.complete = Boolean(values.complete);
            if (err) {
                Message.create({ content: '数据填写错误', color: 'danger' });
            } else {
                let { rowData, refKeyArray } = this.state;
                if (rowData && rowData.id) {
                    values.id = rowData.id;
                    values.ts = rowData.ts;
                }
                values.petId = refKeyArray.join();
                let {childList} = this.props;
                let commitData = {
                    entity : values,
                    sublist:{
                        showOffDetailList:childList
                    }
                };
                console.log("save values", JSON.stringify(commitData));
                actions.mastertable.save(commitData);
            }
        });
    }
    cancel = () => {
        window.history.go(-1);
    }
    // 跳转到流程图
    onClickToBPM = (rowData) => {
        console.log("actions", actions);
        actions.routing.push({
            pathname: 'ShowOff-chart',
            search: `?id=${rowData.id}`
        })
    }

    // 动态显示标题
    onChangeHead = (btnFlag) => {
        let msg = "";
        switch (btnFlag) {
            case 0:
                msg = "新增";
                break;
            case 1:
                msg = "编辑";
                break;
            case 2:
                msg = "详情"
                break;
        }
        return msg;
    }

    //上传成功后的回调
    handlerUploadSuccess = (data) => {
        let searchObj = queryString.parse(this.props.location.search);
        let id = searchObj.search_id;
        if (searchObj.btnFlag == 0) {

        } else if (searchObj.btnFlag == 1) {
            // if (data.length > 0) {
            //     data[0]['id'] = id;
            // }
        }

        this.setState(({ fileNameData }) => {
            //拿到当前原始对象
            let newFileList = [];
            //找到历史数据合并
            newFileList = newFileList.concat(fileNameData);
            //原始数据合并新数据
            newFileList = newFileList.concat(data);
            return {
                fileNameData: newFileList
            };
        });
    }
    //删除文件的回调
    handlerUploadDelete = (file) => {
        this.setState(({ fileNameData }) => {
            for (let i = 0; i < fileNameData.length; i++) {
                if (fileNameData[i].fileName == file.name) {
                    fileNameData[i]['del'] = 'del';
                }
            }
            return {
                fileNameData
            }
        });
    }

    showBpmComponent = (btnFlag, rowData) => {
        // btnFlag为2表示为详情
        if ((btnFlag == 2) && rowData && rowData['id']) {
            console.log("showBpmComponent", btnFlag)
            return (
                <BpmTaskApprovalWrap
                    id={rowData.id}
                    onBpmFlowClick={() => { this.onClickToBPM(rowData) }}
                    appType={"1"}
                />
            );
        }
    }

    // 标签切换
    taskSwitch = flag => {
        return ()=>{
            actions.mastertable.updateState({childPageFlag:flag})
        }
    }

    onAddEmptyRow = ()=>{

    }

    render() {
        const self = this;

        let { btnFlag } = queryString.parse(this.props.location.search);
        btnFlag = Number(btnFlag);
        let { rowData, refKeyArray,column } = this.state;
        let title = this.onChangeHead(btnFlag);
        // 任务分解与附件信息切换标识
        let {childPageFlag} = this.props;
        // console.log("detailData", rowData);
        let { petId, quantity, shipDate, status, complete, } = rowData;
        const { getFieldProps, getFieldError } = this.props.form;
        let optionpetId = {
            title: '',
            refType: 5,//1:树形 2.单表 3.树卡型 4.多选 5.default
            className: '',
            param: {//url请求参数
                refCode: 'common_ref',
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            refModelUrl: {
                TreeUrl: '/newref/rest/iref_ctr/blobRefTree', //树请求
                TableBodyUrl: '/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求//ref/rest/iref_ctr/blobRefTreeGrid
            },
            filterRefUrl: '/iuap_pap_quickstart/common/filterRef',//get
            keyList: refKeyArray,//选中的key
            // checkedArray: [],
            onCancel: function (p) {
                console.log(p)
            },
            onSave: function (sels) {
                console.log(sels);
                var temp = sels.map(v => v.key)
                console.log("temp", temp);
                self.setState({
                    refKeyArray: temp,
                })
            },
            textOption: {
                modalTitle: '选择品类',
                leftTitle: '品类结构',
                rightTitle: '品类列表',
                leftTransferText: '待选品类',
                rightTransferText: '已选品类',
                leftInfo: [
                    { text: '人员名称', key: 'peoname' },
                    { text: '人员编码', key: 'peocode' },
                ],
                rightInfo: [
                    { text: '人员名称', key: 'peoname' },
                    { text: '人员编码', key: 'peocode' },
                ],
            },
            showKey: 'peoname',
            verification: true,//是否进行校验
            verKey: 'petId',//校验字段
            verVal: petId
        }

        return (
            <div className='masterform-detail'>
                <Loading
                    showBackDrop={true}
                    loadingType="line"
                    show={this.props.showLoading}
                />
                <Header title={title} back={true}>
                    {(btnFlag < 2) ? (
                        <div className='head-btn'>
                            <Button className='head-cancel' onClick={this.cancel}>取消</Button>
                            <Button className='head-save' onClick={this.save}>保存</Button>
                        </div>
                    ) : ''}
                </Header>
                {
                    self.showBpmComponent(btnFlag, rowData)
                }
                <Row className='detail-body'>

                    <Col md={4} xs={6}>
                        <Label>
                            宠物标识：
                            </Label>
                        <RefWithInput disabled={btnFlag == 2} option={optionpetId} form={this.props.form} />

                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            单价：
                            </Label>

                        <InputNumber
                            precision={2}
                            min={0}
                            className={"input-number"}
                            disabled={btnFlag == 2}
                            {
                            ...getFieldProps('quantity', {
                                initialValue: quantity && Number(quantity).toFixed(2) || '0.00',
                                rules: [{ type: 'string', pattern: /^(?:(?!0\.00$))[\d\D]*$/ig, message: '请输入数字' }],
                            })
                            }
                        />
                        <span className='error'>
                            {getFieldError('quantity')}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label class="datepicker">
                            发货日期：
                            </Label>
                        <DatePicker className='form-item' disabled={btnFlag == 2}
                            format="YYYY-MM-DD"
                            {
                            ...getFieldProps('shipDate', {
                                initialValue: moment(shipDate),
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: '请选择发货日期',
                                }],
                            }
                            )}
                        />
                        <span className='error'>
                            {getFieldError('shipDate')}
                        </span>

                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            状态：
                            </Label>

                        {
                            (btnFlag < 2) ?
                                (<Radio.RadioGroup
                                    disabled={true}
                                    selectedValue={this.state.status || '0'}
                                    {
                                    ...getFieldProps('status', {
                                        initialValue: status || '0',
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, message: '请选择状态',
                                        }],
                                        onChange(value) {
                                            self.setState({ status: value });
                                        },
                                    }
                                    )}
                                >
                                    <Radio value="0">开发</Radio>
                                    <Radio value="1">测试</Radio>
                                    <Radio value="2">发布</Radio>
                                </Radio.RadioGroup>) : (
                                    <FormControl disabled={btnFlag == 2} value={status} />
                                )
                        }
                        <span className='error'>
                            {getFieldError('status')}
                        </span>

                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            完成状态：
                            </Label>
                        <FormControl disabled={btnFlag == 2}
                            {
                            ...getFieldProps('complete', {
                                validateTrigger: 'onBlur',
                                initialValue: complete || '',
                                rules: [{
                                    required: true, message: '请输入完成状态',
                                }],
                            }
                            )}
                        />
                        <span className='error'>
                            {getFieldError('complete')}
                        </span>

                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            附件：
                        </Label>
                        {
                            (btnFlag < 2) ? (<AcUpload
                                title={"附件上传"}
                                multiple={false}
                                defaultFileList={this.state.fileNameData}
                                onError={() => console.log('上传报错了')}
                                onSuccess={this.handlerUploadSuccess}
                                onDelete={this.handlerUploadDelete}
                            >
                                <Button colors="info">上传</Button>
                            </AcUpload>) : (
                                    <AcUpload
                                        title={"查看附件"}
                                        defaultFileList={this.state.fileNameData}
                                        multiple={false}
                                        isView={true}
                                        onError={() => console.log('上传报错了')}
                                        onSuccess={this.handlerUploadSuccess}
                                    >
                                        <Button colors="info">查看</Button>
                                    </AcUpload>
                                )
                        }
                    </Col>
                </Row>
                <div className="master-tag">
                    <div className="childhead">
                        <span className={childPageFlag?"workbreakdown":"annexinfo"} onClick={this.taskSwitch(true)}>任务分解</span>
                        <span className={childPageFlag?"annexinfo":"workbreakdown"} onClick={this.taskSwitch(false)}>附件信息</span>
                    </div>
                </div>
                {
                    function (childPageFlag){
                        if(childPageFlag){
                            return (
                                <div>
                                    <ChildTable />
                                </div>
                            )
                        }
                    }(childPageFlag)
                }
            </div>
        )
    }
}

export default Form.createForm()(MasterForm);