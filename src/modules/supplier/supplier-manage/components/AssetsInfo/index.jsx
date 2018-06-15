import React, { Component } from 'react';
import {Radio,Row,Col,FormControl,Label,Button,Icon} from 'tinper-bee';
import mirror, { actions, connect } from "mirrorx";
import Form from 'bee-form';
import CitySelect from 'bee-city-select';
import Select from 'bee-select';
import createModal from 'yyuap-ref';
import DatePicker from 'bee-datepicker';
import "bee-datepicker/build/DatePicker.css";
import moment from "moment";
import './index.less';

const Option = Select.Option;
const FormItem = Form.FormItem;
const format = 'YYYY-MM-DD';
const fieldArray = [
    "amount","regmeasure","fixedassets","fixedmeasure",
    "trancur","annualsales","annualmeasure",
    "supplycategory","mainproduct",
    "agency","brand",
    "totalfunds","totalmeasure","agengcyqualify",
    "maincustomer","secmaincus","thirdmaincus",
];

class AssetsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedValue:"0",
            bankpro :{ province:'北京',city:'北京',area:'东城区'}
        };
    }

    onRefClick = (inputid,propForm)=>{
        // 弹出参照
        return ()=>{
            
            let option = {
                title: '参照类型',
                refType:2,//1:树形 2.单表 3.树卡型 4.多选 5.default
                isRadio:false,//1.true 单选 2.false多选
                hasPage:true,
                tabData:[//tab标签
                    {"title":"常用","key":"commonUse"},
                    {"title":"全部","key":"total"},
                    {"title":"推荐","key":"recommed"}
                ],// option中可增加defaultActiveKey作为默认tab标签
                param:{//url请求参数
                    refCode:'newuser',
                    tenantId:'',
                    sysId:'',
                },
                refModelUrl:{
                    TableBodyUrl:'/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求
                    TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                },
                checkedArray:[],
                onCancel: function (p) {
                    console.log(p)
                },
                onSave: function (sels) {
                  console.log("sels",sels,inputid);
                    let param = {
                        inputid:inputid,
                        singleRefData:sels
                    }
                    // actions.master.setInputFromRef(param);
                    let {setFieldsValue} = propForm;
                    console.log(sels[0]["refname"]);
                    let obj={};
                    obj[inputid+""]=sels[0]["refname"];  
                    console.log(obj)
                    setFieldsValue(obj);
                },
            }
            createModal(option);
               
        }
    }

    onHandleChange = (value)=>{
        console.log(value);
        this.setState({
            selectedValue:value
        })
    }

    // 上传证书
    onUpAgency = ()=>{
        // 上传证书
    }

    // 获取城市数据
    onCitySelect = (value)=>{
        console.log(value);
        this.setState({
            bankpro:value
        })
    }

    // 验证表单数据
    onVerifyClick = ()=>{
        this.props.form.validateFields(fieldArray,{
            first:false,
            force:true
        },async (error,value)=>{
            console.log("error",error,value);
            if(!error){
                this.setState({
                    showLine: true
                })
                // done表示是否加载完毕
                let {done} = await actions.master.onSave(value);
                if (done) {
                    this.setState({
                        showLine: false
                    }) 
                    Message.create({content: '单据保存成功', color: 'success'});
                    
                }else {
                    this.setState({showLine: false})
                }
                
            }
        });
    }
    render() {
        const { getFieldProps, getFieldError,getFieldDecorator} = this.props.form;
        return (
            <div className="supplier-enterprise-page">
                <div className="assets-info-form">
                    <Form>
                        <Row>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">注册资金&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl className = "supplier-spec-input"
                                            {
                                            ...getFieldProps('amount', {
                                                initialValue: 10,
                                                validateTrigger: 'onBlur',
                                                rules: [{ type:"number",required: true, message: '请填写注册资金' }],
                                            })
                                            }
                                        />
                                        <Select
                                            className = "supplier-special-sel"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('regmeasure', {
                                                initialValue: "0",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择单位!' }],
                                            })
                                            }
                                        >
                                            <Option value="0">亿元</Option>
                                            <Option value="1">万元</Option>
                                        </Select>
                                        <span className='error'>
                                            {getFieldError('amount')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">固定资产&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl className = "supplier-spec-input"
                                            {
                                            ...getFieldProps('fixedassets', {
                                                initialValue: 10,
                                                validateTrigger: 'onBlur',
                                                rules: [{ type:"number",required: true, message: '请填写固定资产' }],
                                            })
                                            }
                                        />
                                        <Select
                                            className = "supplier-special-sel"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('fixedmeasure', {
                                                initialValue: "0",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择单位!' }],
                                            })
                                            }
                                        >
                                            <Option value="0">亿元</Option>
                                            <Option value="1">万元</Option>
                                        </Select>
                                        <span className='error'>
                                            {getFieldError('fixedassets')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">交易币种&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <Select
                                            className="supplier-sel-adjust"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('trancur', {
                                                initialValue: "USD",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择交易币种!' }],
                                            })
                                            }
                                        >
                                            <Option value="USD">美元</Option>
                                            <Option value="CNY">人民币</Option>
                                        </Select>
                                        <span className='error'>
                                            {getFieldError('trancur')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">企业近一年营业额:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl className = "supplier-spec-input"
                                            {
                                            ...getFieldProps('annualsales', {
                                                initialValue: 10,
                                                validateTrigger: 'onBlur',
                                                rules: [{ type:"number",required: true, message: '请填写企业近一年营业额' }],
                                            })
                                            }
                                        />
                                        <Select
                                            className = "supplier-special-sel"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('annualmeasure', {
                                                initialValue: "0",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择单位!' }],
                                            })
                                            }
                                        >
                                            <Option value="0">亿元</Option>
                                            <Option value="1">万元</Option>
                                        </Select>
                                        <span className='error'>
                                            {getFieldError('annualsales')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">可供货品类&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl className="supplier-input-adjust"
                                            {
                                                ...getFieldProps('supplycategory', {
                                                    initialValue: "螺丝钉",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请选择可供货品类!' }],
                                                })
                                            }
                                        />
                                        <Icon type="uf-navmenu" key={"icon"} className="reficon_adjust" onClick={this.onRefClick("supplycategory", this.props.form)}></Icon>
                                        <span className='error'>
                                            {getFieldError('supplycategory')}
                                        </span>

                                    </FormItem>
                                </Col>
                                <Col md={1} xs={1} sm={1}>
                                    <span className="ft12 dis-inline-block vertical-center color-blue">品类规则</span> 
                                </Col>
                                <Col className="height40" md={4} xs={4}  sm={4} >
                                    <FormItem>
                                        <span className="supplier-label-adjust">主要产品&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('mainproduct', {
                                                initialValue:   "钢铁",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入主要产品',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('mainproduct')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">是否为代理商&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <Select
                                            className="supplier-sel-adjust"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('agency', {
                                                initialValue: "0",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择是否为代理商!' }],
                                            })
                                            }
                                        >
                                            <Option value="0">是</Option>
                                            <Option value="1">否</Option>
                                        </Select>
                                        <span className='error'>
                                            {getFieldError('agency')}
                                        </span>
                                        {/* <Radio.RadioGroup
                                            className="supplier-radio"
                                            name="isagency"
                                            selectedValue={this.state.selectedValue}
                                            onChange = {this.onHandleChange}
                                            {
                                                ...getFieldProps('agency', {
                                                    // initialValue: "0",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请选择是否为代理商!' }],
                                                })
                                            }
                                            >

                                            <Radio value="0" >是</Radio>
                                            <Radio value="1" >否</Radio>
                                        </Radio.RadioGroup> */}
                                        
                                    </FormItem>
                                </Col>
                                <Col className="height40 pt2" md={4} xs={4}  sm={4} mdOffset={1} xsOffset={1} smOffset={1}  >
                                    <FormItem>
                                        <span className="supplier-label-adjust">代理品牌&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('brand', {
                                                initialValue:   "钢铁侠",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入代理品牌',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('brand')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
                            <div className="clearfix mt20">
                                <Col className="height40 clearfix" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">总资产&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl className="supplier-spec-input"
                                            {
                                            ...getFieldProps('totalfunds', {
                                                initialValue: 10,
                                                validateTrigger: 'onBlur',
                                                rules: [{ type: "number", required: true, message: '请填写总资金' }],
                                            })
                                            }
                                        />
                                        <Select
                                            className="supplier-special-sel"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('totalmeasure', {
                                                initialValue: "0",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择单位!' }],
                                            })
                                            }
                                        >
                                            <Option value="0">亿元</Option>
                                            <Option value="1">万元</Option>
                                        </Select>
                                        <span className='error'>
                                            {getFieldError('totalfunds')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">代理资质证书&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <Button shape="border" colors="info" onClick={this.onUpAgency}>+&nbsp;证书上传</Button>
                                        <FormControl className="supplier-upinput"
                                            {
                                                ...getFieldProps('agengcyqualify', {
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: false, message: '请上传代理资质证书!' }],
                                                })
                                            }
                                        />
                                        <span className='error'>
                                            {getFieldError('agengcyqualify')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
                            <div className="clearfix mt20">
                                <Col className="height40" md={9} mdOffset={1} xs={9} xsOffset={1} sm={9} smOffset={1}>
                                    <FormItem>
                                        <span className="dis-inline-block supplier-maicur-label">主要客户&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="width25"

                                            {...getFieldProps('maincustomer', {
                                                initialValue:   "客户一",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入主要客户',
                                                }],
                                            })} />
                                        <FormControl className="supplier-maincus"

                                            {...getFieldProps('secmaincus', {
                                                initialValue: "客户二",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: false, message: '请输入员工总人数',
                                                }],
                                            })} />
                                        <FormControl className="supplier-maincus"

                                            {...getFieldProps('thirdmaincus', {
                                                initialValue: "客户三",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: false, message: '请输入员工总人数',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('maincustomer')}
                                        </span>
                                    </FormItem>
                                </Col>
                                
                            </div>
                        </Row>
                    </Form>
                </div>
                
            </div>
        );
    }
}

export default AssetsInfo;