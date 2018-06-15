import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import {
    Col, Row, FormControl, Checkbox, Label
} from "tinper-bee";
import Header from "components/Header";
import './index.less';
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
        supplierCode: "",
        supplierName: "",
        registeredCapital: "",
        turnover: "",
        contacts: "",
        phone: "",
        mainProducts: "",
        supplierCategory: "",
        supplierType: "",
        mainGoods: "",
        usableGoods: ""
    }
    render() {

        // mock data
        let { id, unisocialcode, suppliername, identifycode,
            entrepresent, phonenum, firmnature, province, engname,
            email } = this.props.location.detailObj;
        return (
            <div className='supplier-detail'>
                <Header title='供应商详情' back={true} />
                <Row className='detail-body'>
                    <Col md={4} xs={6}>
                        <Label>
                            供应商编码：
                        </Label>
                        <FormControl disabled value={id} />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            供应商名称：
                        </Label>
                        <FormControl disabled value={unisocialcode} />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            注册资金：
                        </Label>
                        <FormControl disabled value={suppliername} />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            近一年营业额：
                        </Label>
                        <FormControl disabled value={identifycode} />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            联系人：
                        </Label>
                        <FormControl disabled value={entrepresent} />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            手机号码：
                        </Label>
                        <FormControl disabled value={phonenum} />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            主要产品：
                        </Label>
                        <FormControl disabled value={firmnature} />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            供应商类别：
                        </Label>
                        <FormControl disabled value={province} />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            供应商类型：
                        </Label>
                        <FormControl disabled value={engname} />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            主供货品类：
                        </Label>
                        <FormControl disabled value={email} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Detail;