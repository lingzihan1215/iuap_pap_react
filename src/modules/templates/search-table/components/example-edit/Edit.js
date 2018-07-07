import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import queryString from 'query-string';
import { Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Radio } from "tinper-bee";
import { BpmTaskApprovalWrap } from 'yyuap-bpm';
import AcUpload from 'ac-upload';
import Header from "components/Header";
import DatePicker from 'bee-datepicker';
import Form from 'bee-form';
import Select from 'bee-select';
import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import moment from "moment";
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './edit.less';
import 'ac-upload/build/ac-upload.css';

const FormItem = Form.FormItem;
const Option = Select.Option;

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approvalState: '0',
            closeState: '0',
            confirmState: '0',
            fileNameData: props.rowData.attachment || [],//上传附件数据
            purchasing: [],
            rowData: {},
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
        await actions.searchTable.getOrderTypes();
        let searchObj = queryString.parse(this.props.location.search);
        let { btnFlag } = searchObj;
        if (btnFlag && btnFlag > 0) {
            let { search_id } = searchObj;
            let rowData = await actions.searchTable.queryDetail({ search_id });
            this.setState({
                rowData
            })
        }
        
    }
    save = () => {//保存
        this.props.form.validateFields((err, values) => {
            values.attachment = this.state.fileNameData;
            values.approvalState = Number(values.approvalState);
            values.closeState = Number(values.closeState);
            values.confirmState = Number(values.confirmState);
            values.voucherDate = values.voucherDate != undefined ? values.voucherDate.format('YYYY-MM-DD') : '';
            if (err) {
                Message.create({ content: '数据填写错误', color: 'danger' });
            } else {
                let {rowData} = this.state; 
                if (rowData && rowData.id) {
                    values.id = rowData.id;
                    values.ts = rowData.ts;
                }
                console.log("save values", JSON.stringify(values));
                actions.searchTable.save(values);
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
            pathname: 'example-chart',
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

    // 通过search_id查询数据

    render() {
        const self = this;
        const option = {
            title: '',
            refType: 5,//1:树形 2.单表 3.树卡型 4.多选 5.default
            className: '',
            param: {//url请求参数
                refCode: 'common_ref',
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            refModelUrl:{
                TreeUrl:'/newref/rest/iref_ctr/blobRefTree', //树请求
                TableBodyUrl:'/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求//ref/rest/iref_ctr/blobRefTreeGrid
                TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求ref/rest/iref_ctr/refInfo
            },
            filterRefUrl:'/iuap_pap_quickstart/common/filterRef',//get
            keyList:self.state.purchasing,//选中的key
            // checkedArray: [],
            onCancel: function (p) {
                console.log(p)
            },
            onSave: function (sels) {
                console.log(sels);
                var temp = sels.map(v => v.key)
                self.setState({
                    purchasing: temp,
                })

            },
            filterKey: [{ title: '人员名称人员名称人员名称', key: 'peoname' }, { title: '人员名称', key: 'peoname' }, { title: '人员名称', key: 'peoname' }, { title: '人员名称', key: 'peoname' }, { title: '人员名称', key: 'peoname' }, { title: '人员名称', key: 'peoname' }, { title: '人员名称', key: 'peoname' }, { title: '人员名称', key: 'peoname' }, { title: '人员名称', key: 'peoname' }, { title: '人员名称', key: 'peoname' }, { title: '人员名称', key: 'peoname' }],
            textOption: {
                modalTitle: '选择品类',
                leftTitle: '品类结构',
                rightTitle: '品类列表',
                leftTransferText: '待选品类',
                rightTransferText: '已选品类',
                leftInfo: [{ text: '流水号', key: 'refname' }, { text: '品类编码', key: 'refname' }, { text: '品类描述', key: 'refname' }],
                rightInfo: [{ text: '流水号', key: 'refname' }, { text: '品类编码', key: 'refname' }, { text: '品类描述', key: 'refname' }],
            }
        }
        let { btnFlag } = queryString.parse(this.props.location.search);
        btnFlag = Number(btnFlag);
        let {rowData } = this.state;
        let title = this.onChangeHead(btnFlag);
        console.log("detailData", rowData);
        let { orderCode, supplier, supplierName, type, purchasing, purchasingGroup, voucherDate, approvalState, confirmState, closeState } = rowData;
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className='order-detail'>
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
                            订单编号：
                        </Label>
                        <FormControl disabled={true}
                            placeholder="使用编码规则生成"
                            {
                            ...getFieldProps('orderCode', {
                                initialValue: orderCode || '使用编码规则生成'
                            }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            供应商名称：
                        </Label>
                        <FormControl disabled={btnFlag == 2}
                            {
                            ...getFieldProps('supplierName', {
                                validateTrigger: 'onBlur',
                                initialValue: supplierName || '',
                                rules: [{
                                    type:'string',required: true, message: '请输入供应商名称',
                                }],
                            }
                            )}
                        />
                        <span className='error'>
                            {getFieldError('supplierName')}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            类型：
                        </Label>
                        {
                            (btnFlag < 2) ? (
                                <Select
                                    {
                                    ...getFieldProps('type', {
                                        initialValue: type || '',
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            type:'string',required: true, message: '请选择类型',
                                        }],
                                    }
                                    )}>
                                    <Option value="">请选择</Option>
                                    {
                                        self.props.orderTypes.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.code}>{item.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            ) : (<FormControl disabled={btnFlag == 2} />)
                        }

                        <span className='error'>
                            {getFieldError('type')}
                        </span>

                    </Col>
                    <Col md={4} xs={6}>

                        <Label>
                            采购组织：
                        </Label>

                        {/*<FormControl disabled={btnFlag==2}
                            {
                            ...getFieldProps('purchasing', {
                                initialValue: purchasing || ''
                            }
                            )}
                        />*/}
                        <RefWithInput option={option} />

                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            采购组：
                        </Label>
                        <FormControl disabled={btnFlag == 2}
                            {
                            ...getFieldProps('purchasingGroup', {
                                initialValue: purchasingGroup || '',
                                validateTrigger: 'onBlur',
                                rules: [{
                                    type:'string',required: true, message: '请输入采购组',
                                }],
                            }
                            )}
                        />
                        <span className='error'>
                            {getFieldError('purchasingGroup')}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label className='datepicker'>
                            凭证日期：
                        </Label>
                        <DatePicker className='form-item' disabled={btnFlag == 2}
                            format="YYYY-MM-DD"
                            {
                            ...getFieldProps('voucherDate', {
                                initialValue: moment(voucherDate),
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: '请选择日期',
                                }],
                            }
                            )}
                        />
                        <span className='error'>
                            {getFieldError('voucherDate')}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            审批状态：
                        </Label>
                        {
                            (btnFlag < 2) ?
                                (<Radio.RadioGroup
                                    disabled={true}
                                    selectedValue={this.state.approvalState}
                                    {
                                    ...getFieldProps('approvalState', {
                                        initialValue: '0',
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, message: '请选择审批状态',
                                        }],
                                        onChange(value) {
                                            self.setState({ approvalState: value });
                                        },
                                    }
                                    )}
                                >
                                    <Radio value="0" disabled={true}>未审批</Radio>
                                    <Radio value="1" disabled={true}>已审批</Radio>
                                </Radio.RadioGroup>) : (
                                    <FormControl disabled={btnFlag == 2} value={approvalState} />
                                )
                        }
                        <span className='error'>
                            {getFieldError('approvalState')}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            确认状态：
                        </Label>
                        {(btnFlag < 2) ? (
                            <Radio.RadioGroup
                                selectedValue={this.state.confirmState}
                                {
                                ...getFieldProps('confirmState', {
                                    initialValue: '0',
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        required: true, message: '请选择确认状态',
                                    }],
                                    onChange(value) {
                                        self.setState({ confirmState: value });
                                    },
                                }
                                )}
                            >
                                <Radio value="0" disabled={true} >未确认</Radio>
                                <Radio value="1" disabled={true} >已确认</Radio>
                                <Radio value="2" disabled={true}>拒绝</Radio>
                            </Radio.RadioGroup>
                        ) : (<FormControl disabled={btnFlag == 2} value={confirmState} />)}
                        <span className='error'>
                            {getFieldError('confirmState')}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            关闭状态：
                        </Label>
                        {
                            (btnFlag < 2) ? (<Radio.RadioGroup
                                selectedValue={this.state.closeState}
                                {
                                ...getFieldProps('closeState', {
                                    initialValue: '0',
                                    onChange(value) {
                                        self.setState({ closeState: value });
                                    },
                                }
                                )}
                            >
                                <Radio value="0" disabled={true} >未关闭</Radio>
                                <Radio value="1" disabled={true} >已关闭</Radio>
                            </Radio.RadioGroup>) : (
                                    <FormControl disabled={btnFlag == 2} value={closeState} />
                                )
                        }
                        <span className='error'>
                            {getFieldError('closeState')}
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
            </div>
        )
    }
}

export default Form.createForm()(Edit);