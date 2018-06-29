import React, { Component } from 'react'
import { Table,Button,Tree,Row,Col,FormControl} from 'tinper-bee'
import moment from "moment/moment";
import { actions } from "mirrorx";
import Pagination from 'bee-pagination';
import 'bee-pagination/build/Pagination.css';
import Header from 'components/Header'
import './index.less';
const TreeNode = Tree.TreeNode;

class TreeTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        actions.tree.getTreeData();//请求树的数据
    }
    /**
     * 渲染树节点
     */
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
            }
            return <TreeNode {...item} />;
        });
    }
    /**
     * 树节点选中事件
     */
    treeSelect = (select)=>{
        console.log(select);
        this.getTableData({
            pageIndex: this.props.pageIndex-1,
            pageSize: this.props.pageSize
        },select)
    }
    /**
     * 切换分页事件
     */
    onPageSelect = (value) => {
        this.getTableData({
            pageIndex: value,
            pageSize: this.props.pageSize
        })
    }
    /**
     * 每页多少条事件
     */
    dataNumSelect = (value) => {
        let pageSize = (value + 1) * 5;//针对于5条/10条/15条/20条选项
        this.getTableData({
            pageSize: pageSize,
            pageIndex: 1
        })
    }
    /**
     * 获得表格数据
     */
    getTableData = (pageObj,param)=>{
        actions.tree.getTableData(param)
    }
    render(){
        const self=this;
        const { treeData,list,showLoading,pageSize, pageIndex, totalPages } = this.props;
        const column = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 80,
                render(record, text, index) {
                    return index + 1;
                }
            },
            {
                title: "订单编号",
                dataIndex: "orderCode",
                key: "orderCode",
                width: 200
            },
            {
                title: "供应商名称",
                dataIndex: "supplierName",
                key: "supplierName",
                width: 200
            },
            {
                title: "类型",
                dataIndex: "type_name",
                key: "type_name",
                width: 100
            },
            {
                title: "采购组织",
                dataIndex: "purchasing",
                key: "purchasing",
                width: 100
            },
            {
                title: "采购组",
                dataIndex: "purchasingGroup",
                key: "purchasingGroup",
                width: 100
            },
            {
                title: "凭证日期",
                dataIndex: "voucherDate",
                key: "voucherDate",
                width: 100,
                render(record, text, index) {
                    return moment(text).format('YYYY-MM-DD')
                }
            },
            {
                title: "审批状态",
                dataIndex: "approvalState_name",
                key: "approvalState_name",
                width: 100
            },
            {
                title: "确认状态",
                dataIndex: "confirmState_name",
                key: "confirmState_name",
                width: 100
            },
            {
                title: "关闭状态",
                dataIndex: "closeState_name",
                key: "closeState_name",
                width: 100
            }
        ];
        return (
            <div className="tree-table">
                <Header title='树表' />
                <Row>
                    <Col md={3} sm={6} xs={12} className='tree-col'>
                        <div className='tree-header'>
                            我是tree的标题
                        </div>
                        <Tree 
                            onSelect={this.treeSelect}
                            defaultExpandedKeys={["0-0"]}
                        >
                            {this.renderTreeNodes(treeData)}
                        </Tree>
                    </Col>
                    <Col md={9} sm={6} xs={12} className='table-col'>
                        <div className='table-header'>
                            我是table的标题
                        </div>
                        <Table
                            loading={{show:showLoading,loadingType:"line"}}
                            rowKey={(r,i)=>i}
                            columns={column}
                            data={list}
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
                                onDataNumSelect={this.dataNumSelect}
                                onSelect={this.onPageSelect}
                                showJump={true}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TreeTable;