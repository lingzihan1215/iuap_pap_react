import React, { Component } from 'react';
import {Button,Loading,Step,Message} from 'tinper-bee';
import mirror, { actions, connect } from "mirrorx";
import Form from 'bee-form';

import UserInfo from '../UserInfo';
import EnterpriseInfo from '../EnterpriseInfo';
import AssetsInfo from '../AssetsInfo';
import BankInfo from '../BankInfo';
import ContactInfo from '../ContactInfo';
import Header from 'components/Header';

import './index.less';

const Steps = Step.Steps;
/* 
const fieldArray = [
    
    "suppliername","firmnature","unisocialcode",
    "contactname","phonenum","email","identifycode",
    "engname","componyurl","companyphone","establishtime",
    "country", "province","city","addressdetail",
    "entrepresent","totalemplyee",
    "amount","regmeasure","fixedassets","fixedmeasure",
    "trancur","annualsales","annualmeasure",
    "supplycategory","mainproduct",
    "agency","brand",
    "totalfunds","totalmeasure","agengcyqualify",
    "maincustomer","secmaincus","thirdmaincus",
    "banktype","bankpro","bankcity",
    "bankname","bankconnum",
    "accountnum","accountname",
    "detection","businesslicense",
    "busincontact","contactinfo"
]; */

const fieldArray = [
    ["suppliername","firmnature","unisocialcode",
    "contactname","phonenum"],
    ["engname","componyurl","companyphone","establishtime",
    "country", "province","city","addressdetail",
    "entrepresent","totalemplyee"],
    ["amount","regmeasure","fixedassets","fixedmeasure",
    "trancur","annualsales","annualmeasure",
    "supplycategory","mainproduct",
    "agency","brand",
    "totalfunds","totalmeasure","agengcyqualify",
    "maincustomer","secmaincus","thirdmaincus"],
    ["banktype","bankpro","bankcity",
    "bankname","bankconnum",
    "accountnum","accountname",
    "detection","businesslicense"],
    ["busincontact","contactinfo"]
]

const steps = [{
    title: 'First',
    content: 'First-content',
}, {
    title: 'Second',
    content: 'Second-content',
}, {
    title: 'third',
    content: 'third-content',
}, {
    title: 'fourth',
    content: 'fourth-content',
}, {
    title: 'Last',
    content: 'Last-content',
}];

const valueField = ['userform','enterpriseform','assetsform','bankform','contactform'];
/**
 *
 * @class RegisterInfo
 * @extends {Component}
 * formValue       保存每页表单的数据，字段分别为
 * userform        用户表单信息
 * enterpriseform  企业表单信息
 * assetsform      资产表单
 * bankform        银行信息表单
 * contactform     联系人表单信息
 */
class RegisterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showLine:false,
            current:0,
            formValue:{}
        };

    }

    validateFields = (current)=>{

        this.props.form.validateFields(fieldArray[current],{
            first:false,
            force:true
        },(error,value)=>{
            console.log(value);
            if(!error) {
                console.log("表单字段",valueField[current]);
                let {formValue} = this.state;
                formValue[valueField[current]] = value;
                current = current + 1;
                this.setState({ current });
            }
            
        })
    }

    next() {
        let {current} = this.state;
        this.validateFields(current);
        
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    async alertDone() {
        // Message.create({ content: '完成', color: 'info' });
        let {current} = this.state;
        this.validateFields(current);
        let {formValue} = this.state,commiteValue = {};
        for (const key in formValue) {
            if (formValue.hasOwnProperty(key)) {
                const element = formValue[key];
                Object.assign(commiteValue,element);
            }
        }
        console.log("commiteValue",commiteValue);
        this.setState({
            showLine: true
        })
        // done表示是否加载完毕
        let {done} = await actions.supplier.onSave(commiteValue);
        if (done) {
            this.setState({
                showLine: false
            }) 
            Message.create({content: '单据保存成功', color: 'success'});
            
        }else {
            this.setState({showLine: false})
        }
    }

    onSave = ()=>{
        console.log("保存事件");
        this.props.form.validateFields(fieldArray,{
            first:false,
            force:true
        },async (error,value)=>{
            // console.log("error",error,value);
            if(!error){
                console.log("value",value);
                
                
            }
        });
    }
    render() {
        const { getFieldProps, getFieldError,getFieldDecorator} = this.props.form;
        let {current} = this.state;
        return (
            <div className="register-page">
                <Header title="供应商注册" back={true} >
                    <div className='head-btn'>
                        {/* <Button className='head-save' onClick={this.onSave}>保存</Button> */}
                    </div>
                </Header>
                <div>
                    <Steps current={current} className="bgwhite">
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div>
                        {
                            function chooseCon(current,form){
                                switch(current) {
                                    case 0:
                                        return <UserInfo form ={form} />;
                                    case 1:
                                        return <EnterpriseInfo form ={form}/>;
                                    case 2:
                                        return <AssetsInfo form ={form}/>;
                                    case 3:
                                        return <BankInfo form ={form}/>;
                                    case 4:
                                        return <ContactInfo form ={form}/>;

                                }
                            }(current,this.props.form)
                        }
                    </div>

                    <div className="steps-action">
                        {
                            this.state.current < steps.length - 1
                            &&
                            <Button colors="primary" onClick={() => this.next()}>下一页</Button>
                        }
                        {
                            this.state.current === steps.length - 1
                            &&
                            <Button colors="primary" onClick={() => this.alertDone()}>完成</Button>
                        }
                        {
                            this.state.current > 0
                            &&
                            <Button colors="primary" style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                上一页
                            </Button>
                        }
                    </div>

                </div>
                
                

                {/* <UserInfo form ={this.props.form} />
                <EnterpriseInfo form ={this.props.form}/>
                <AssetsInfo form ={this.props.form}/>
                <BankInfo form ={this.props.form}/>
                <ContactInfo form ={this.props.form}/> */}
                <Loading
                    showBackDrop={true}
                    loadingType="line"
                    show={this.state.showLine}
                />
            </div>
        );
    }
}

export default Form.createForm()(RegisterInfo);