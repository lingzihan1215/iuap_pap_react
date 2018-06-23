import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Table, Popover, Checkbox, Icon } from 'tinper-bee';
import PropTypes from 'prop-types';
import Pagination from 'bee-pagination';
import multiSelect from "tinper-bee/lib/multiSelect.js";
import filterColumn from "tinper-bee/lib/filterColumn";
import dragColumn from "tinper-bee/lib/dragColumn";

import 'bee-pagination/build/Pagination.css';
import './index.less'

const MultiSelectTable = multiSelect(Table, Checkbox);
const DragColumnFilterTable = dragColumn(MultiSelectTable);

const FilterColumnTable = filterColumn(MultiSelectTable, Checkbox, Popover, Icon);

const propTypes = {
    // 表格行数据
    data: PropTypes.array.isRequired,
    // 显示是否展示 Loading 图标
    showLoading: PropTypes.bool.isRequired, 
    // 表格当前展示多少行数据，默认为10
    pageSize: PropTypes.number, 
    // 当前选中，对应activePage
    pageIndex: PropTypes.number.isRequired, 
    // 总页数数量，默认为 5
    totalPages: PropTypes.number, 
    // 定义表格列
    columns: PropTypes.array.isRequired,
    // 返回已选中的所有数据
    onTableSelectedData: PropTypes.func.isRequired,
    // 单页显示多少条，点击联动
    onPageSizeSelect: PropTypes.func.isRequired,
    // 页索引编号点击选中回调方法
    onPageIndexSelect: PropTypes.func.isRequired
};

const defaultProps = {
    data: [],
    showLoading: false, 
    pageSize: 10, 
    pageIndex: 1, 
    totalPages: 1, 
    columns: [],
    onTableSelectedData: (value) => { },
    onPageSizeSelect: (value) => { },
    onPageIndexSelect: (value) => { }
};

/**
 * PaginationTable 组件功能说明：
 * 1、默认支持表格多选
 * 2、表格默认自带分页组件
 */
class PaginationTable extends Component {
    constructor(props){
        super(props);
        this.state = { }
    }
    render(){
        const { 
            data, showLoading, pageSize,
            pageIndex, totalPages, columns,
            onTableSelectedData, onPageSizeSelect, onPageIndexSelect
        } = this.props;

        let dataNumSelect = [pageSize, pageSize * 2, pageSize * 3, pageSize * 4];
        
        return (
            <div className="table-list">
                <FilterColumnTable
                    bordered
                    loading={{ show: showLoading, loadingType: "line" }}
                    rowKey={(r, i) => i}
                    columns={columns}
                    data={data}
                    multiSelect={{ type: "checkbox" }}
                    getSelectedDataFunc={onTableSelectedData}
                    scroll={{ x: 190, y: 500 }}
                    draggable={true} 
                />
                <div className='pagination'>
                    <Pagination
                        first
                        last
                        prev
                        next
                        boundaryLinks
                        items={totalPages}
                        activePage={pageIndex}
                        onDataNumSelect={onPageSizeSelect}
                        onSelect={onPageIndexSelect}
                        showJump={true}
                        dataNum={4}
                        maxButtons={5}
                        dataNumSelect={dataNumSelect}
                    />
                </div>
            </div>
        )
    }
}

PaginationTable.propTypes = propTypes;
PaginationTable.defaultProps = defaultProps;

export default PaginationTable