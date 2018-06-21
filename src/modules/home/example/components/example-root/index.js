import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import Header from 'components/Header';
import BoardForm from '../example-form/index';
import BoardTable from '../example-table/index';
import './index.less';


/**
 * ExampleRoot Component
 */
class ExampleRoot  extends Component {
    constructor(props) { // 如果不需要state可不写
        super(props);
        this.state = {
            voucherDate:[]
        }
    }

    componentDidMount() {
        this.getTableData();
    }
    /**
     * 获取table表格数据
     */
    getTableData(){
        actions.example.loadList();
    }
    /**
     * 获得订单类型列表数据
     */
    getOrderTypes(){
        actions.example.getOrderTypes();
    }

    render() {
        const self=this;
        return (
            <div className='manage-order-manage'> 
                <Header title='订单测试'/>
                <BoardForm { ...this.props }/>
                <BoardTable { ...this.props }/>
            </div>
        )
    }
}
export default ExampleRoot;