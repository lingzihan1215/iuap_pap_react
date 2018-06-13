import React, { Component } from 'react';
import {Radio,Row,Col,FormControl,Label,Button,Icon} from 'tinper-bee';
import Form from 'bee-form';
import Select from 'bee-select';

import './index.less';
const Option = Select.Option;
const FormItem = Form.FormItem;
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
            selectedValue:"0"
        };
    }

    onRefClick = (inputid,propForm)=>{
        // 弹出参照
        return ()=>{
            alert("弹出参照");
        }
    }

    onHandleChange = (value)=>{
        console.log(value);
        this.setState({
            selectedValue:value
        })
    }

    onUpAgency = ()=>{
        // 上传证书
    }
    render() {
        const { getFieldProps, getFieldError,getFieldDecorator} = this.props.form;
        return (
            <div className="supplier-page">
                <div className="supplier-user-head">企业信息:</div>
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
                                                initialValue:   "",
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
                                        {/* <Select
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
                                        </span> */}
                                        <Radio.RadioGroup
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
                                        </Radio.RadioGroup>
                                        
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
                                        <Icon type="uf-navmenu" key={"icon"} className="reficon_adjust" onClick={this.onRefClick("depositbank", this.props.form)}></Icon>
                                        <span className='error'>
                                            {getFieldError('banktype')}
                                        </span>

                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} xs={4}  sm={4} mdOffset={1} xsOffset={1} smOffset={1} >
                                    <FormItem>
                                        <span className="supplier-label-adjust">省、市&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <Select
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
                                        </Select>
                                        <span className='error'>
                                            {getFieldError('mainproduct')}
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
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'number', required: true, message: '请输入开户行账号',
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
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'number', required: true, message: '请输入银行账户名称',
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
                        </Row>
                    </Form>
                </div>
                
            </div>
        );
    }
}

export default Form.createForm()(EnterpriseInfo);