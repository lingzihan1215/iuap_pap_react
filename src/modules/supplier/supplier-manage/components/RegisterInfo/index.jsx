import React, { Component } from 'react';
import {Button} from 'tinper-bee';
import UserInfo from '../UserInfo';
import EnterpriseInfo from '../EnterpriseInfo';
import AssetsInfo from '../AssetsInfo';
import BankInfo from '../BankInfo';

import ContactInfo from '../ContactInfo';
import Form from 'bee-form';

import './index.less';

const fieldArray = [
    "suppliername","firmnature","unisocialcode",
    "contactname","phonenum","email","identifycode",
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
    "detection","businesslicense",
    "busincontact","contactinfo"
];

class RegisterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
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
                /* this.setState({
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
                } */
                
            }
        });
    }
    render() {
        const { getFieldProps, getFieldError,getFieldDecorator} = this.props.form;
        console.log(this.props);
        return (
            <div>
                <div className="register-head">
                    <div className="top-part">
                        <Button size="sm" colors="primary" className="cancel-btn">取消</Button>
                        <Button size="sm" colors="primary" className="save-btn" onClick={this.onSave}>保存</Button>
                    </div>
                </div>
                <UserInfo form ={this.props.form} />
                <EnterpriseInfo form ={this.props.form}/>
                <AssetsInfo form ={this.props.form}/>
                <BankInfo form ={this.props.form}/>
                <ContactInfo form ={this.props.form}/>
            </div>
        );
    }
}

export default Form.createForm()(RegisterInfo);