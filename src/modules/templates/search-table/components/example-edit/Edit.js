import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select, Radio } from "tinper-bee";
import { BpmTaskApprovalWrap } from 'yyuap-bpm';
import AcUpload from 'ac-upload';
import Header from "components/Header";
import DatePicker from 'bee-datepicker';
import Form from 'bee-form';
import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import moment from "moment";
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './edit.less';

const FormItem = Form.FormItem;


class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approvalState: '0',
            closeState: '0',
            confirmState: '0',
            fileNameData: [{"fileName":"123","accessAddress":"123"},
                {"fileName":"123456","accessAddress":"123456"}
            ],
            purchasing:[]
        }
    }
    componentWillMount() {
        if (this.props.location.detailObj && this.props.location.detailObj.id) {
            let { approvalState, closeState, confirmState } = this.props.location.detailObj;
            this.setState({
                approvalState: String(approvalState),
                closeState: String(closeState),
                confirmState: String(confirmState)
            })
        }
    }
    save = () => {//保存
        this.props.form.validateFields((err, values) => {
            values.attachment = this.state.fileNameData ;
            values.approvalState = Number(values.approvalState);
            values.closeState = Number(values.closeState);
            values.confirmState = Number(values.confirmState);
            values.voucherDate = values.voucherDate != undefined ? values.voucherDate.format('YYYY-MM-DD') : '';
            if (err) {
                Message.create({ content: '数据填写错误', color: 'danger' });
            } else {
                if (this.props.location.detailObj && this.props.location.detailObj.id) {
                    values.id = this.props.location.detailObj.id;
                    values.ts = this.props.location.detailObj.ts;
                }
                console.log("save values",JSON.stringify(values));
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

    handlerUploadSuccess = (data) => {
        console.log(data);
        this.setState({
            fileNameData: data
        });
    }

    showBpmComponent = (editFlag,rowData)=> {
        if(!editFlag && rowData && rowData['id']) {
            console.log("showBpmComponent",editFlag)
            return (
                <BpmTaskApprovalWrap
                    id={rowData.id}
                    onBpmFlowClick={()=>{this.onClickToBPM(rowData)}}
                    appType={"1"}
                />
            );
        }
    }

    render() {
        const self = this;
        const option = {
            title:'',
            refType:5,//1:树形 2.单表 3.树卡型 4.多选 5.default
            className:'',
            param:{//url请求参数
                refCode:'common_ref',
                tenantId:'',
                sysId:'',
                transmitParam:'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            refModelUrl:{
                TreeUrl:'/newref/rest/iref_ctr/blobRefTree', //树请求
                TableBodyUrl:'/tablebody',//表体请求
                TableBarUrl:'/tablebar',//表头请求
            },
            filterRefUrl:'/iuap_pap_quickstart/filterRef',//get
            keyList:self.state.purchasing,//选中的key
            // checkedArray: [],
            onCancel: function (p) {
              console.log(p)
            },
            onSave: function (sels) {
              console.log(sels);
              var temp = sels.map(v=>v.key)
              self.setState({
                purchasing:temp,
              })

            },
            filterKey:[{title:'人员名称人员名称人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'}],
            textOption:{
                modalTitle:'选择品类',
                leftTitle:'品类结构',
                rightTitle:'品类列表',
                leftTransferText:'待选品类',
                rightTransferText:'已选品类',
                leftInfo:[{text:'流水号',key:'refname'},{text:'品类编码',key:'refname'},{text:'品类描述',key:'refname'}],
                rightInfo:[{text:'流水号',key:'refname'},{text:'品类编码',key:'refname'},{text:'品类描述',key:'refname'}],
            }
        }
        let {rowData,btnFlag} = self.props;
        let { orderCode, supplier, supplierName, type, purchasing, purchasingGroup, voucherDate, approvalState, confirmState, closeState } = rowData;
        let {editFlag} = self.props.location;
        // console.log("edit editFlag",editFlag)
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className='order-detail'>
                <Loading
                    showBackDrop={true}
                    loadingType="line"
                    show={this.props.showLoading}
                />
                <Header title={this.onChangeHead(btnFlag)} back={true}>
                    {editFlag ? (
                        <div className='head-btn'>
                            <Button className='head-cancel' onClick={this.cancel}>取消</Button>
                            <Button className='head-save' onClick={this.save}>保存</Button>
                        </div>
                    ) : ''}
                </Header>
                {
                    self.showBpmComponent(editFlag,rowData)
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
                                initialValue: orderCode||'使用编码规则生成'
                            }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            供应商名称：
                        </Label>
                        <FormControl disabled={!editFlag}
                            {
                            ...getFieldProps('supplierName', {
                                initialValue: supplierName||''
                            }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            类型：
                        </Label>
                        {
                            editFlag ? (
                                <Select
                                    {
                                    ...getFieldProps('type', {
                                        initialValue: type || '',
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
                            ) : (<FormControl disabled={!editFlag} />)
                        }


                    </Col>
                    <Col md={4} xs={6}>
                        
                        <Label>
                            采购组织：
                        </Label>
                        
                        {/*<FormControl disabled={!editFlag}
                            {
                            ...getFieldProps('purchasing', {
                                initialValue: purchasing || ''
                            }
                            )}
                        />*/}
                        <RefWithInput option={option}/>
                        
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            采购组：
                        </Label>
                        <FormControl disabled={!editFlag}
                            {
                            ...getFieldProps('purchasingGroup', {
                                initialValue: purchasingGroup || ''
                            }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label className='time'>
                            凭证日期：
                        </Label>
                        <DatePicker className='form-item' disabled={!editFlag}
                            defaultValue={moment(voucherDate)}
                            format="YYYY-MM-DD"
                            {
                            ...getFieldProps('voucherDate', {
                                initialValue: moment(voucherDate)
                            }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            审批状态：
                        </Label>
                        {
                            editFlag?
                            (<Radio.RadioGroup
                                disabled = {true}
                                selectedValue={this.state.approvalState}
                                {
                                    ...getFieldProps('approvalState', {
                                        initialValue: '0',
                                        onChange(value) {
                                            self.setState({ approvalState: value });
                                        },
                                    }
                                    ) }
                                >
                                <Radio value="0" disabled={true}>未审批</Radio>
                                <Radio value="1" disabled={true}>已审批</Radio>
                                </Radio.RadioGroup>):(
                                <FormControl disabled={!editFlag} value={approvalState}/>
                            )
                        }
                        
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            确认状态：
                        </Label>
                        {editFlag?(
                                <Radio.RadioGroup
                                selectedValue={this.state.confirmState}
                                    {
                                        ...getFieldProps('confirmState', {
                                            initialValue: '0',
                                            onChange(value) {
                                                self.setState({ confirmState: value });
                                            },
                                        }
                                        ) }
                                    >
                                   <Radio value="0" disabled={true} >未确认</Radio>
                                    <Radio value="1" disabled={true} >已确认</Radio>
                                    <Radio value="2" disabled={true}>拒绝</Radio>
                                </Radio.RadioGroup>
                        ):(<FormControl disabled={!editFlag} value={confirmState}/>)}
                        
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            关闭状态：
                        </Label>
                        {
                            editFlag?(<Radio.RadioGroup
                                selectedValue={this.state.closeState}
                                    {
                                        ...getFieldProps('closeState', {
                                            initialValue: '0',
                                            onChange(value) {
                                                self.setState({ closeState: value });
                                            },
                                        }
                                        ) }
                                    >
                                    <Radio value="0" disabled={true} >未关闭</Radio>
                                    <Radio value="1" disabled={true} >已关闭</Radio>
                                </Radio.RadioGroup>):(
                                    <FormControl disabled={!editFlag} value={closeState}/>
                                )
                        }
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            附件：
                        </Label>
                        {
                            editFlag ? (<AcUpload
                                multiple={false}
                                isShow={true}
                                onError={() => console.log('上传报错了')}
                                onSuccess={this.handlerUploadSuccess}
                            >
                                <Button colors="info">上传</Button>
                            </AcUpload>) : (
                                    <span>查看附件</span>
                                )
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(Edit);