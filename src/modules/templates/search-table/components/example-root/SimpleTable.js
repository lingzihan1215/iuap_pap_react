import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";

import Header from 'components/Header';
import ExampleForm from '../example-form';
import ExampleTable from '../example-table';

import './index.less';

/**
 * ExampleRoot Component
 */
class ExampleRoot  extends Component {
    constructor(props) { 
        super(props);
        this.state = { }
    }
    /**
     * 
     */
    componentWillMount() {
        this.getTableData();
    }
    /**
     * 获取table表格数据
     */
    getTableData = () => {
        actions.searchTable.loadList();
    }
   
    render() {
        let { pageSize, pageIndex, totalPages} = this.props;
        return (
            <div className='example-root'>
                <Header title='简单单表查询示例'/>
                <ExampleForm { ...this.props }/>
                <ExampleTable { ...this.props }/>
            </div>
        )
    }
}
export default ExampleRoot;