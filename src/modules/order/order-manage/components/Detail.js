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
        let {orderCode,supplier,supplierName,type,purchasing,purchasingGroup,voucherDate,approvalState,confirmState,closeState} = this.props.location.detailObj;
        return (
            <div className='order-detail'>
                <Header title='订单详情' back={true}/>
                <Row>
                    <Col md={4} xs={6}>
                        <Label>
                            订单编号：
                        </Label>
                        <span>
                            {orderCode}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        供应商：
                        </Label>
                        <span>
                            {supplier}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        供应商名称：
                        </Label>
                        <span>
                            {supplierName}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        类型：
                        </Label>
                        <span>
                            {type}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            采购组织：
                        </Label>
                        <span>
                            {purchasing}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            采购组：
                        </Label>
                        <span>
                            {purchasingGroup}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            凭证日期：
                        </Label>
                        <span>
                            {voucherDate}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            审批状态：
                        </Label>
                        <span>
                            {approvalState}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            确认状态：
                        </Label>
                        <span>
                            {confirmState}
                        </span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            关闭状态：
                        </Label>
                        <span>
                            {closeState}
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Detail;