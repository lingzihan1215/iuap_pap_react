import React, { Component } from 'react';
import {Button,Loading} from 'tinper-bee';
import mirror, { actions, connect } from "mirrorx";
import Form from 'bee-form';

import UserInfo from '../UserInfo';
import EnterpriseInfo from '../EnterpriseInfo';
import AssetsInfo from '../AssetsInfo';
import BankInfo from '../BankInfo';
import ContactInfo from '../ContactInfo';
import Header from 'components/Header';

import './index.less';

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
];

class RegisterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showLine:false
        };
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
                this.setState({
                    showLine: true
                })
                // done表示是否加载完毕
                let {done} = await actions.supplier.onSave(value);
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
        console.log(this.props);
        return (
            <div>
                <Header title="供应商注册" back={true} >
                    <div className='head-btn'>
                        <Button className='head-save' onClick={this.onSave}>保存</Button>
                    </div>
                </Header>
                <UserInfo form ={this.props.form} />
                <EnterpriseInfo form ={this.props.form}/>
                <AssetsInfo form ={this.props.form}/>
                <BankInfo form ={this.props.form}/>
                <ContactInfo form ={this.props.form}/>
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