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
    "banktype","bankpro","bankcity",
    "bankname","bankconnum",
    "accountnum","accountname",
    "detection","businesslicense"
];

// 国家、省、市级联
const provinceData = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"]
};

class BankInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedValue:"0",
            cities:[],
            bankpro:"",
            bankcity:""
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
            bankcity:value
        })
    }

    onProSelect = (value)=>{
        console.log("cityData[value]",value);
        this.setState({
            bankpro:value,
            cities:cityData[value],
            bankcity:""
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
        let { getFieldProps, getFieldError,getFieldDecorator} = this.props.form;
        let provinceOptions = provinceData.map((province,index) => {
            return <Option key={province}>{province}</Option>
        });
        let cityOptions = this.state.cities.map((city,index) => {
            return <Option key={city}>{city}</Option>
        });
        let {bankpro,bankcity} = this.state;
        return (
            <div className="supplier-enterprise-page">
                <div className="bank-info-form">
                    <Form>
                        <Row>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">开户行类型&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl className="supplier-input-adjust"
                                            {
                                                ...getFieldProps('banktype', {
                                                    initialValue: "储蓄卡",
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
                                        <Select
                                            className = "width32"
                                            onSelect = {this.onProSelect}
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('bankpro', {
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择省、市!' }],
                                            })
                                            }
                                        >
                                            {provinceOptions}
                                        </Select>
                                        <Select
                                            onSelect = {this.onCitySelect}
                                            className = "width32 ml4"
                                            searchPlaceholder="标签模式"
                                            {
                                            ...getFieldProps('bankcity', {
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请选择省、市!' }],
                                            })
                                            }
                                        >
                                            {cityOptions}
                                        </Select>
                                        {/* <CitySelect 
                                            onChange = {this.onCitySelect}
                                        /> */}
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
                                                initialValue:   "工行",
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
                                                initialValue:   "1234444122",
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
                                                initialValue:   "1234444122",
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
                                                initialValue:   "1234444122",
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
                                                    rules: [{ required: false, message: '请上传营业执照!' }],
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

export default BankInfo;