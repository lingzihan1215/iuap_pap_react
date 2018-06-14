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
    "engname","componyurl","companyphone","createtime",
    "country", "province","city","addressdetail",
    "entrepresent","totalemplyee",
    "amount","regmeasure","fixedassets","fixedmeasure",
    "trancur","annualsales","annualmeasure",
    "supplycategory","mainproduct",
    "agency","brand",
    "totalfunds","totalmeasure",
    "totalfunds","agengcyqualify",
    "maincustomer","secmaincus","thirdmaincus",
    "banktype","bankpro","bankcity",
    "bankname","bankconnum",
    "accountnum","accountname",
    "detection","businesslicense"
];

class EnterpriseInfo extends Component {
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
                <div className="supplier-user-head"><Icon type="uf-2collayout" />企业信息:</div>
                <div className="company-info-form">
                    <Form>
                        <Row>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">公司英文名称&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('engname', {
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入公司英文名称',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('engname')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">创立日期&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('createtime', {
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入创立日期',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('createtime')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">公司电话&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('companyphone', {
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入公司电话',
                                                }],
                                            })} />
                                        
                                        <span className='error'>
                                            {getFieldError('companyphone')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col md={1} xs={1} sm={1}>
                                    <span className="ft12 dis-inline-block vertical-center">(000-0000000)</span> 
                                </Col>
                                <Col className="height40" md={4} xs={4}  sm={4} >
                                    <FormItem>
                                        <span className="supplier-label-adjust">公司网址&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('componyurl', {
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入公司网址',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('componyurl')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
                            <div className="clearfix mt20">
                                <Col className="height40" md={9} mdOffset={1} xs={9} xsOffset={1} sm={9} smOffset={1}>
                                    <FormItem>
                                        <span className="dis-inline-block supplier-span-width">公司地址&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <Select
                                            className = "special-sel"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('country', {
                                                initialValue: "cn",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择国家!' }],
                                            })
                                            }
                                        >
                                            <Option value="cn">中国</Option>
                                            <Option value="en">英国</Option>
                                            <Option value="usa">美国</Option>
                                            <Option value="rus">俄罗斯</Option>
                                            <Option value="other">其他</Option>
                                        </Select>
                                        <Select
                                            className = "special-sel ml1"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('province', {
                                                initialValue: "beijing",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择省份!' }],
                                            })
                                            }
                                        >
                                            <Option value="beijing">北京</Option>
                                            <Option value="tianjin">天津</Option>
                                            <Option value="hebei">河北</Option>
                                        </Select>
                                        <Select
                                            className = "special-sel ml1"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('city', {
                                                initialValue: "shijiaz",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择市!' }],
                                            })
                                            }
                                        >
                                            <Option value="shijiaz">石家庄</Option>
                                            <Option value="jinan">济南</Option>
                                            <Option value="taiyuan">太原</Option>
                                        </Select>
                                        <FormControl  className="special-input"

                                            {...getFieldProps('addressdetail', {
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入公司地址',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('addressdetail')}
                                        </span>
                                    </FormItem>
                                    
                                </Col>
                            </div>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">法人代表&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('entrepresent', {
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '法人代表',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('entrepresent')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">员工总人数&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('totalemplyee', {
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入员工总人数',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('totalemplyee')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
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
                                        <span className="supplier-label-adjust">企业近一年营业额&nbsp;:&nbsp; </span>
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
                                                    initialValue: "",
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
                                                initialValue:   "",
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
                                                initialValue:   "",
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
                                                    rules: [{ required: true, message: '请上传代理资质证书!' }],
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
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入主要客户',
                                                }],
                                            })} />
                                        <FormControl className="supplier-maincus"

                                            {...getFieldProps('secmaincus', {
                                                initialValue: "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: false, message: '请输入员工总人数',
                                                }],
                                            })} />
                                        <FormControl className="supplier-maincus"

                                            {...getFieldProps('thirdmaincus', {
                                                initialValue: "",
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
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">开户行类型&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl className="supplier-input-adjust"
                                            {
                                                ...getFieldProps('banktype', {
                                                    initialValue: "",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请选择开户行类型!' }],
                                                })
                                            }
                                        />
                                        <Icon type="uf-navmenu" key={"icon"} className="reficon_adjust" onClick={this.onRefClick("banktype", this.props.form)}></Icon>
                                        <span className='error'>
                                            {getFieldError('banktype')}
                                        </span>

                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} xs={4}  sm={4} mdOffset={1} xsOffset={1} smOffset={1} >
                                    <FormItem>
                                        <span className="supplier-label-adjust">省、市&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        {/* <Select
                                            className = "width32"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('bankpro', {
                                                initialValue: "beijing",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择省、市!' }],
                                            })
                                            }
                                        >
                                            <Option value="beijing">北京</Option>
                                            <Option value="hebei">河北</Option>
                                            
                                        </Select>
                                        <Select
                                            className = "width32 ml4"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('bankcity', {
                                                initialValue: "beijing",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择省、市!' }],
                                            })
                                            }
                                        >
                                            <Option value="beijing">北京</Option>
                                            <Option value="jinan">济南</Option>
                                            <Option value="taiyuan">太原</Option>
                                        </Select> */}
                                        <CitySelect 
                                            onChange = {this.onCitySelect}
                                            /* {
                                                ...getFieldProps('bankpro', {
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请选择省、市!' }],
                                                })
                                            } */
                                        />
                                        <span className='error'>
                                            {getFieldError('bankpro')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">开户行名称&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('bankname', {
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入公司开户行名称',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('bankname')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">开户行联行号&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('bankconnum', {
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入开户行联行号',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('bankconnum')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">开户行账号&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('accountnum', {
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入开户行账号',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('accountnum')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">银行账户名称&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('accountname', {
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入银行账户名称',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('accountname')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
                            <div className="clearfix mt20">
                                <Col className="height40 clearfix pt0" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem className="supplier-detect-item">
                                        <span className="supplier-label-adjust span-pos-adjust">是否属强制执行有关质量或安全行业&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust icon-pos-adjust">*</span>
                                        <Select
                                            className="supplier-detect-sel input-pos"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('detection', {
                                                initialValue: "0",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择是否属强制执行有关质量或安全行业!' }],
                                            })
                                            }
                                        >
                                            <Option value="0">是</Option>
                                            <Option value="1">否</Option>
                                        </Select>
                                        <span className='error'>
                                            {getFieldError('trancur')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">营业执照&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <Button shape="border" colors="info">+&nbsp;证书上传</Button>
                                        <FormControl className="supplier-upinput"
                                            {
                                                ...getFieldProps('businesslicense', {
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请上传营业执照!' }],
                                                })
                                            }
                                        />
                                        <span className='error'>
                                            {getFieldError('businesslicense')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
                            {/* <Button colors="primary" onClick={this.onVerifyClick}>保存</Button> */}
                        </Row>
                    </Form>
                </div>
                
            </div>
        );
    }
}

export default Form.createForm()(EnterpriseInfo);