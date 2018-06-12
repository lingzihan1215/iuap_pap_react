import React, { Component } from "react";
import { actions } from "mirrorx";
import { Table, Button, Col, Row, Con } from "tinper-bee";
import NoData from 'components/NoData';
import Form from 'bee-form';
import './list.less';
const FormItem = Form.FormItem;


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.columns = [
            {
                title: "订单号",
                dataIndex: "orderCode",
                key: "orderCode",
                width: 100
            },
            {
                title: "序号",
                dataIndex: "id",
                key: "id",
                width: 100
            },
            {
                title: "生产批次",
                dataIndex: "prodbatch",
                key: "prodbatch",
                width: 100
            },
            {
                title: "物料编码",
                dataIndex: "code",
                key: "code",
                width: 100
            },
            {
                title: "物料名称",
                dataIndex: "name",
                key: "name",
                width: 100
            },
            {
                title: "订单数量",
                dataIndex: "orderNumber",
                key: "orderNumber",
                width: 60
            },
            {
                title: "已收数量",
                dataIndex: "receNumber",
                key: "receNumber",
                width: 60
            },
            {
                title: "发货数量",
                dataIndex: "deliveNumber",
                key: "deliveNumber",
                width: 60
            },
            {
                title: "单位",
                dataIndex: "unit",
                key: "unit",
                width: 100
            },
            {
                title: "操作",
                dataIndex: "op",
                key: "op",
                width: 100
            }
        ];
    }
    componentDidMount() {
        actions.delivery.getList();
    }
    render() {
        let { list } = this.props;
        return (
            <div className='order-delivery-wrap'>
                <Row>
                    <Col md={12}>
                        <Table
                            bordered
                            title={() => <Button onClick={() => actions.delivery.getList()} colors="primary">添加明细</Button>}
                            emptyText={() => <NoData />}
                            data={list}
                            rowKey={r => r.id}
                            columns={this.columns}
                            scroll={{ y: 400 }}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(List);
