import React, { Component } from 'react';

import CommonTitle from '../CommonTitle';
import Header from 'components/Header';
import SearchForm from './SearchForm';
import CustomerInfo from './CustomerInfo';
import GoodsInfo from './GoodsInfo';
import EditSalesTable from './EditSalesTable';
import EditSalesForm from './EditSalesForm';

import './index.less'

class SalesNotice extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="sales-notice">
                <Header title="销货通知单" back={true} />
                <SearchForm {...this.props} />
                <CustomerInfo {...this.props} />
                <EditSalesForm {...this.props} /> 
                <GoodsInfo {...this.props} />
                <EditSalesTable {...this.props} />
            </div>
        )
    }
};

export default SalesNotice