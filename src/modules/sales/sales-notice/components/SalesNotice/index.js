import React, { Component } from 'react';
import { actions } from 'mirrorx';
import Form from 'bee-form';
import { Col, Row, FormControl, Label, Select, Radio, Button } from "tinper-bee";
const FormItem = Form.FormItem;

import Header from 'components/Header';
import SearchForm from './SearchForm';
import CustomerInfo from './CustomerInfo';
import EditSalesForm from './EditSalesForm';
import GoodsInfo from './GoodsInfo';
import EditSalesTable from './EditSalesTable';

import './index.less'

class SalesNotice extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    saveForm = () => {

    }
    render(){

        return (
            <div className="sales-notice">
                <Header title="销货通知单" back={true}>
                    <div className='head-btn' >
                        <Button className='head-save' onClick={this.saveForm}>确认创建</Button>
                    </div>
                </Header>
                <SearchForm {...this.props} />
                <CustomerInfo customerInfo={ this.props.customerInfo } />
                <EditSalesForm {...this.props} />
                <GoodsInfo {...this.props} />
                <EditSalesTable {...this.props} />
            </div>
        )
    }
}

export default SalesNotice 