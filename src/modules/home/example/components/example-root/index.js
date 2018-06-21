import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import Header from 'components/Header';
import BoardForm from '../example-form/index';
import BoardTable from '../example-table/index';
// import SelectTable from '../example-select-table/index';//多选table
import EditTable from '../example-edit-table/index';//可编辑table
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
            <div className='example-root'> 
                <Header title='示例节点'/>
                <BoardForm { ...this.props }/>
                <BoardTable { ...this.props }/>
                {/* <SelectTable { ...this.props }/> */}
                {/* <EditTable { ...this.props }/> */}
            </div>
        )
    }
}
export default ExampleRoot;