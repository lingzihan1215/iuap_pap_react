import React, { Component } from 'react';

import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './style.css'

class RefTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnDisable:false,
            saveKeys:[],
        };

    }
    setDisable(){
        this.setState({
            btnDisable:!this.state.btnDisable,
        })
    }

    render() {
        var self = this;
        const option = {
            title:'',
            refType:5,//1:树形 2.单表 3.树卡型 4.多选 5.default
            className:'',
            param: {//url请求参数
                refCode: 'common_ref',
                tenantId: '',
                sysId: '',
                transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            refModelUrl:{
                TreeUrl:'/newref/rest/iref_ctr/blobRefTree', //树请求
                TableBodyUrl:'/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求//ref/rest/iref_ctr/blobRefTreeGrid
                TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求ref/rest/iref_ctr/refInfo
            },

            // checkedArray: [],
            filterRefUrl:'/iuap_pap_quickstart/common/filterRef',//get
            keyList:self.state.saveKeys,//选中的key
            onCancel: function (p) {
              console.log(p)
            },
            onSave: function (sels) {
              console.log(sels);
              var temp = sels.map(v=>v.key)
              self.setState({
                saveKeys:temp,
              })
            },
            textOption:{
                modalTitle:'选择品类',
                leftTitle:'品类结构',
                rightTitle:'品类列表',
                leftTransferText:'待选品类',
                rightTransferText:'已选品类',
                leftInfo:[{text:'流水号',key:'refname'},{text:'品类编码',key:'refname'},{text:'品类描述',key:'refname'}],
                rightInfo:[{text:'流水号',key:'refname'},{text:'品类编码',key:'refname'},{text:'品类描述',key:'refname'}],
            },
            showKey:'peoname',
            verification:false,//是否进行校验
            verKey:'aaaa',//校验字段
            verVal:'111'
        }

        return (
            <div className="ref-page">
                <button onClick={this.setDisable.bind(this)}>{this.state.btnDisable?'禁用状态':'使用状态'}</button>
                <h2>参照示例:</h2>
                <div>穿梭框</div>
                <RefWithInput option={option} disabled={this.state.btnDisable}/>
                <div>穿梭框选中数据key数组:{this.state.saveKeys}</div>
                <h1>参数说明</h1>
                <div>
                    <h2>0、使用</h2>
                    <h4>
                    import RefWithInput from 'yyuap-ref/dist2/refWithInput'<br/>
                    import 'yyuap-ref/dist2/yyuap-ref.css'<br/>
                    {`<RefWithInput option={option} disabled={this.state.btnDisable}/> form={this.props.form}`}<br/>
                    option:控制参照 disbaled:控制是否禁用 form:表单检验(verification为true)
                    </h4>
                    <h2>1、初始渲染(2选1)</h2>
                    <h4>filterRefUrl: 根据选中key获取全部数据</h4>
                    <h4>keyList:选中的key </h4>
                    或者<br/>
                    <h4>checkedArray:选中的全部数据 </h4>

                    <h2>2、调整文字 textOption</h2>
                    <h2>3、打开表单校验</h2>
                    <h4>
                        verification:false,//是否进行校验<br/>
                        verKey:'aaaa',//校验字段<br/>
                        verVal:'111',//初始值
                    </h4>
                    <h2>具体文档<a href='https://www.npmjs.com/package/yyuap-ref' target='blank'>https://www.npmjs.com/package/yyuap-ref</a></h2>
                </div>
            </div>
        );
    }
}

export default RefTransfer;
