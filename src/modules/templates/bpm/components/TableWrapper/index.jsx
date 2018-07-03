
import React, { Component } from 'react';
import {Loading,Message, Table, Checkbox,Button,Popconfirm,Icon } from 'tinper-bee';
import {actions,routing,connect} from 'mirrorx';
import Pagination from 'bee-pagination';
import {BpmButtonSubmit,BpmButtonRecall} from 'yyuap-bpm';
import AcUpload from 'ac-upload';//加载组件
import 'ac-upload/build/ac-upload.css';//加载组件样式
import './index.less';

const defaultPropsSelf = {
    prefixCls: "bee-table",
    multiSelect: {
      type: "checkbox",
      param: "key"
    }
}


const masterCols = [
    {
        title: "工单编码",
        dataIndex: "code",
        key: "code",
        width: 150
    },
    {
        title: "工单名称",
        dataIndex: "name",
        key: "name",
        width: 150
    },
    {
        title: "工单类型",
        dataIndex: "type",
        key: "type",
        width: 150,
    },
    {
        title: "申请人",
        dataIndex: "applicant",
        key: "applicant",
        width: 150,
    },
    {
        title: "申请时间",
        dataIndex: "applyTime",
        key: "applyTime",
        width: 150,
    },
    {
        title: "最后修改时间",
        dataIndex: "lastModifyUser",
        key: "lastModifyUser",
        width: 150,
    }
];

let isInitChecked = true;

//设置默认设置
Message.config({
    top: 20,  //顶上显示时距顶部的位置
    duration: 2, //显示持续时间
    width: 500, //左下左上右下右上显示时的宽度
    size:"large"
});

/*
    showLine为是否显示加载提示
*/

class TableWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedAll: false,
            checkedArray: [],
            commitFlag:0,
            showLine:false,
        };
    }
    
    componentWillReceiveProps = (nextProps)=>{
        console.log("nextProps",nextProps)
        let data = nextProps.masterData;
        let length = data ? data.length : 20;
        let checkedArray = []
        for (var i = 0; i < length; i++) {
            checkedArray.push(false);
        }
        this.setState({checkedArray:checkedArray});
        // actions.master.save({ checkedArray });
        
    }

    async componentDidMount() {
        await actions.master.load();
        /* this.setState({
            showLine:!this.state.showLine
        }) */
    }
    onAllCheckChange = () => {
        let self = this;
        let checkedArray = [];
        let listData = this.props.masterData.concat();
        let selIds = [];
        // let id = self.props.multiSelect.param;
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            checkedArray[i] = !self.state.checkedAll;
        }
        self.setState({
            checkedAll: !self.state.checkedAll,
            checkedArray: checkedArray,
            // selIds: selIds
        });
        // self.props.onSelIds(selIds);
    };
    onCheckboxChange = (text, record, index) => {
        let self = this;
        let allFlag = false;
        let checkedArray = self.state.checkedArray.concat();
        checkedArray[index] = !self.state.checkedArray[index];
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            if (!checkedArray[i]) {
                allFlag = false;
                break;
            } else {
                allFlag = true;
            }
        }
        self.setState({
            checkedAll: allFlag,
            checkedArray: checkedArray,
        });
    };

    // 编辑修改
    onEdit=(text, record, index)=>{
        
        return async ()=>{
            console.log("点击修改",record,index);
            let tempState = {
                "btnFlag":1,
                "rowData":record,
            }
            await actions.master.save(tempState);
            await actions.routing.push({
                pathname:'/templates/bpm-card'
            })
        }
    }

    // 行删除
    onRowDel = (text, record, index)=>{
        return async ()=>{
            console.log("点击删除",record,index);
            this.setState({
                showLine:true
            },async ()=>{
                let {done,message} = await actions.master.remove([{"id":record["id"]}]);
                if(done){
                    console.log("this.props",this.props);
                    let {masterData} = this.props;
                    masterData.splice(index, 1);
                    let tempState = {
                        masterData: masterData
                    }
                    await actions.master.save(tempState)
                    this.setState({
                        showLine:false
                    })
                    Message.create({content: '单据删除成功', color: 'success'});
                }else {
                    Message.create({content: message, color: 'danger'});
                }
            })
            
            
            
        }
        
    }

    onExamine = (text, record, index)=> {
        return async ()=>{
            console.log("record", record);
            let tempState = {
                "btnFlag": 2,
                "rowData": record
            }
            await actions.master.save(tempState);
            actions.routing.push({
                pathname:'/templates/bpm-card',
            })
        }
        
    }

    onLoad = ()=>{
        this.setState({
            showLine: true
        },async ()=>{
            // done表示是否加载完毕
            let {done} = await actions.master.load();
            if (done) {
                this.setState({
                    showLine: false
                }) 
            }
        })
    }

    renderColumnsMultiSelect(columns) {
        const { checkedArray } = this.state;
        const { multiSelect } = this.props;
        let select_column = {};
        let indeterminate_bool = false;
        // let indeterminate_bool1 = true;
        if (multiSelect && multiSelect.type === "checkbox") {
            let i = checkedArray.length;
            while (i--) {
                if (checkedArray[i]) {
                    indeterminate_bool = true;
                    break;
                }
            }
            let defaultColumns = [
                {
                    title: (
                        <Checkbox
                            className="table-checkbox"
                            checked={this.state.checkedAll}
                            indeterminate={indeterminate_bool && !this.state.checkedAll}
                            onChange={this.onAllCheckChange}
                        />
                    ),
                    key: "checkbox",
                    dataIndex: "checkbox",
                    width: "50px",
                    render: (text, record, index) => {
                        return (
                            <Checkbox
                                className="table-checkbox"
                                checked={this.state.checkedArray[index]}
                                onChange={this.onCheckboxChange.bind(this, text, record, index)}
                            />
                        );
                    }
                }
            ];
            const operateCols = [
                {
                    title: "操作",
                    dataIndex: "operate",
                    key: "operate",
                    width : "350px",
                    render:(text, record, index)=> {
                        return (
                            <div>
                                {/* <span className="bcolor" onClick={this.onEdit(text, record, index)}>编辑</span> */}
                                <Button className="inline-btn" size="sm" onClick={this.onEdit(text, record, index)}>编辑</Button>
                                {/* <span className="span-adjust" onClick={this.onRowDel(text, record, index)} >删除</span> */}
                                {/* <span className="span-adjust " onClick={this.onExamine(text, record, index)}>查看</span> */}
                                <Button className="inline-btn ml5" size="sm"  onClick={this.onEdit(text, record, index)}>查看</Button>
                                <Popconfirm content="确认删除?" id="aa" onClose={this.onRowDel(text, record, index)}>
                                    {/* <Icon type="uf-del" className="tablewrapper-delicon"/> */}
                                    <Button className="inline-btn ml5" size="sm" >删除</Button>
                                </Popconfirm>
                            </div>
                        );
                    }
                }
            ]
            columns = defaultColumns.concat(columns).concat(operateCols);
        }
        return columns;
    }

    // 添加数据
    onAdd = () => {
        console.log("添加数据");
        let tempState = {
            "btnFlag":0,
            "rowData":{}
        }
        actions.master.changePage(tempState);
        actions.routing.push({
            pathname:'/templates/bpm-card'
        })
    }

    // 查看方法
    onCheck = ()=>{
        let {checkedArray} = this.state;
        let rowData,data=this.props.masterData;
        // 查看时检查是否已选中数据
        let checkedFlag = false;
        for(var i=0;i<checkedArray.length;i++){
            if(checkedArray[i]){
                checkedFlag = true;
                rowData = data[i];
                break;
            }
        }

        if(!checkedFlag){
            Message.create({content: '请选择查看的数据', color: 'warning', duration: 1});
            return;
        }else {
            let tempState = {
                "btnFlag":2,
                "rowData":rowData
            }
            actions.master.save(tempState)
            actions.routing.push({
                pathname:'/templates/bpm-card',
            })
        }
        
    }

    // 多行删除
    onMultiDel= async ()=>{
        let {checkedArray} = this.state;
        let data = this.props.masterData;
        console.log("data",data);
        let length = (data.length<checkedArray.length)?data.length:checkedArray.length;
        let delArray = [],tempArray=[];
        for(var i=0;i<checkedArray.length;i++){
            if(checkedArray[i]){
                delArray.push({"id":data[i]["id"]});
            }else {
                tempArray.push(data[i])
            }
        }
        console.log("delArray",delArray);
        if(delArray.length>0){
            this.setState({
                showLine:true
            },async ()=>{
                let {done} = await actions.master.remove(delArray);
                if(done){
                    await actions.master.save({
                        masterData:tempArray
                    })
                    this.setState({
                        showLine:false
                    });
                    Message.create({content: '单据删除成功', color: 'success'});
                }
            })    
                

        }else {
            // 弹出提示请选择数据
            Message.create({content: '请选择删除数据', color: 'warning'});
        }
        
    }

    onRowDoubleClick=(record, index, event)=>{
        console.log("双击",record,event);
        let tempState = {
            "btnFlag":2,
            "rowData":record
        }
        actions.master.save(tempState)
        actions.routing.push({
            pathname:'/templates/bpm-card',
        })
    }

    onSubmitSuc = async ()=>{
        let {done} = await actions.master.load();
        this.setState({showLine:false });
        Message.create({content: '单据提交成功', color: 'success'}); 
    }
    // 提交操作初始执行操作
    onSubmitStart = ()=>{
        this.setState({showLine:true});
        
    }
    // 提交失败回调函数
    onSubmitFail = ()=>{
        this.setState({showLine:false});
        Message.create({content: "单据提交失败", color: 'danger'});
    }

    // 撤回成功，失败，开始回调函数
    onRecallSuc = async ()=>{
        console.log("onRecallSuc 成功进入recall回调");
        await  actions.master.load();
        this.setState({showLine:false });
        Message.create({content: '单据撤回成功', color: 'success'}); 
    }
    onRecallFail = ()=>{
        this.setState({showLine:false});
        Message.create({content: "单据撤回失败", color: 'danger'});
    }
    onRecallStart = ()=>{
        this.setState({showLine:true});
    }

    onHandleSelect = (eventKey)=>{
        console.log("eventKey",eventKey);
        actions.master.save({
            paginationParam:{
                pageIndex:eventKey-1,
                pageSize:this.props.paginationParam.pageSize,
                activePage:eventKey
            }
        })
        this.onLoad();
    }

    onDataNumSelect = (index,value)=> {
        console.log(index,value);
        let {pageSize,pageIndex,activePage} = this.props.paginationParam;
        actions.master.save({
            paginationParam:{
                pageIndex:pageIndex,
                pageSize:value,
                activePage
            }
        })
        
    }

    onLoad = ()=>{
        this.setState({
            showLine: true
        },async ()=>{
            // done表示是否加载完毕
            let {done} = await actions.master.load();
            this.setState({
                showLine: false
            }) 
        })
    }
    // 导入
    onImport = ()=>{

    }
    // 导出
    onExport = ()=>{
        
    }

    render() {
        let columns = this.renderColumnsMultiSelect(masterCols);
        let {masterData} = this.props,
            {checkedArray} = this.state;
        let {totalElements,totalPages} = this.props.paginationRes;
        console.log("选中数组",checkedArray);
        console.log(this.props);
        return (
            <div>
                <div >
                    <Button className="editable-add-btn"  size="sm" colors="primary" onClick={this.onAdd} style={{ marginLeft: "8px" }} >新增</Button>
                    {/* <Button className="editable-add-btn" size="sm" colors="primary" onClick={this.onCheck} style={{ marginLeft: "5px" }} >查看</Button> */}
                    <BpmButtonSubmit 
                        className="editable-add-btn ml5 "
                        data = {masterData}
                        checkedArray = {checkedArray}
                        funccode = "react"
                        nodekey = "003"
                        url = "/iuap_pap_quickstart/example_workorder/submit"
                        onSuccess = {this.onSubmitSuc}
                        onError = {this.onSubmitFail}
                        onStart={this.onSubmitStart}
                    />
                    {/* <Button className="editable-add-btn" size="sm" colors="primary" onClick={this.onRecall} style={{ marginLeft: "5px" }}>收回</Button> */}
                    <BpmButtonRecall 
                        className="editable-add-btn ml5 "
                        data = {masterData}
                        checkedArray = {checkedArray}
                        url = "/iuap_pap_quickstart/example_workorder/recall"
                        onSuccess = {this.onRecallSuc}
                        onError = {this.onRecallFail}
                        onStart = {this.onRecallStart}
                    />
                    <Button className="editable-add-btn" size="sm" shape="border" colors="info" onClick={this.onMultiDel} style={{ marginLeft: "5px" }}>删除</Button>
                </div>
                <Table 
                    columns={columns} 
                    data={masterData} 
                    rowKey={(record)=>record.id}
                    onRowDoubleClick={this.onRowDoubleClick}
                    scroll = {{x:1300}}
                    footer={() => <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={totalPages}
                        maxButtons={5}
                        activePage={this.props.paginationParam.activePage}
                        onSelect={this.onHandleSelect} 
                        onDataNumSelect = {this.onDataNumSelect} 
                        showJump={true}
                        dataNum={1}
                        />}
                />
                <Loading
                    fullScreen
                    showBackDrop={true}
                    loadingType="line"
                    show={this.state.showLine}
                />
            </div>
        )
        
    }

    
}

TableWrapper.defaultProps = defaultPropsSelf;

export default connect(state => state.master)(TableWrapper);