import React, { Component } from 'react';

import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './style.css'

class RefMultiple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveKeys:[],
        };

    }
    render() {
        var self = this;
        const option = {
            title:'',
            refType:6,//1:树形 2.单表 3.树卡型 4.多选 5.default
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
            filterRefUrl:'/iuap_pap_quickstart/common/filterRef',//get
            keyList:self.state.saveKeys,//选中的key
            // checkedArray: [],
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
            filterKey:[{title:'人员名称人员名称人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'}],
            showKey:'peoname',
            verification:false,//是否进行校验
            verKey:'aaaa',//校验字段
            verVal:'111'
        }

        return (
            <div className="ref-page">
                <h2>参照示例:</h2>
                <div>多选</div>
                <RefWithInput option={option} disabled={false}/>
                <div>多选选中数据:{this.state.saveKeys}</div>

            </div>
        );
    }
}

export default RefMultiple;
