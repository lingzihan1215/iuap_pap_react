import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select,Radio } from "tinper-bee";
import Header from "components/Header";
import './detail.less';
class Detail extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render (){
        let {supplierCode,supplierName,registeredCapital,turnover,contacts,phone,mainProducts,supplierCategory,supplierType,mainGoods,usableGoods} = this.props.location.detailObj;
        return (
            <div className='supplier-detail'>
                <Header title='供应商详情' back={true}/>
                <Row className='detail-body'>
                    <Col md={4} xs={6}>
                        <Label>
                            供应商编码：
                        </Label>
                        <FormControl disabled value={supplierCode}/>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        供应商名称：
                        </Label>
                        <FormControl disabled value={supplierName}/>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        注册资金：
                        </Label>
                        <FormControl disabled value={registeredCapital}/>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        近一年营业额：
                        </Label>
                        <FormControl disabled value={turnover}/>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        联系人：
                        </Label>
                        <FormControl disabled value={contacts}/>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        手机号码：
                        </Label>
                        <FormControl disabled value={phone}/>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        主要产品：
                        </Label>
                        <FormControl disabled value={mainProducts}/>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        供应商类别：
                        </Label>
                        <FormControl disabled value={supplierCategory}/>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        供应商类型：
                        </Label>
                        <FormControl disabled value={supplierType}/>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        主供货品类：
                        </Label>
                        <FormControl disabled value={mainGoods}/>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        供应商类型：
                        </Label>
                        <FormControl disabled value={usableGoods}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Detail;