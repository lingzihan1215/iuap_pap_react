import React, { Component } from "react";
import { actions } from "mirrorx";
import { Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select } from "tinper-bee";
import Form from 'bee-form';
import Pagination from 'bee-pagination';
import 'bee-pagination/build/Pagination.css';
import Header from "components/Header";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import './list.less';
const FormItem = Form.FormItem;


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.column = [
            {
                title: "订单编号",
                dataIndex: "orderCode",
                key: "orderCode",
                width: 100
            },
            {
                title: "订单名称",
                dataIndex: "orderName",
                key: "orderName",
                width: 100
            },
            {
                title: "客户",
                dataIndex: "customer",
                key: "customer",
                width: 200
            },
            {
                title: "业务员",
                dataIndex: "busiman",
                key: "busiman",
            },
            {
                title: "所属单位",
                dataIndex: "dept",
                key: "dept",
            },
            {
                title: "订单状态",
                dataIndex: "orderState",
                key: "orderState",
            },
        ];
    }
    componentDidMount() {

    }
    render() {

        return (
            <div className='order-delivery-wrap'>
                order_delivery
            </div>
        )
    }
}

export default Form.createForm()(List);
