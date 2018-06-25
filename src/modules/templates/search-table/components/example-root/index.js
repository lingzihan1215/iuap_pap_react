import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import {Button} from 'tinper-bee';
import Header from 'components/Header';
import BoardForm from '../example-form/index';
import BoardTable from '../example-table/index';
import './index.less';


/**
 * ExampleRoot Component
 */
class ExampleRoot  extends Component {
    constructor(props) { 
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.getTableData();
    }
    /**
     * 获取table表格数据
     */
    getTableData=()=>{
        actions.example.loadList();
    }
    /**
     * 获得订单类型列表数据
     */
    getOrderTypes=()=>{
        actions.example.getOrderTypes();
    }
    render() {
        const self=this;
        let { pageSize, pageIndex, totalPages} = this.props;
        return (
            <div className='example-root'>
                <Header title='示例节点'/>
                <BoardForm { ...this.props }/>
                <BoardTable { ...this.props }/>
            </div>
        )
    }
}
export default ExampleRoot;