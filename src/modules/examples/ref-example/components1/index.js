import React, { Component } from 'react';

import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './style.css'

class RefTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveKeys:[]
        };

    }
    render() {
        var self = this;
        const option1 = {
            title:'',
            refType:5,//1:树形 2.单表 3.树卡型 4.多选 5.default
            className:'',
            param:{//url请求参数
                refCode:'common_ref',
                tenantId:'',
                sysId:'',
                transmitParam:'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            refModelUrl:{
                TreeUrl:'/newref/rest/iref_ctr/blobRefTree', //树请求
                TableBodyUrl:'/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求//ref/rest/iref_ctr/blobRefTreeGrid
                TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求ref/rest/iref_ctr/refInfo
            },
            filterRefUrl:'/iuap_pap_quickstart/common/filterRef',//get
            keyList:self.state.saveKeys1,//选中的key
            // checkedArray: [],
            onCancel: function (p) {
              console.log(p)
            },
            onSave: function (sels) {
              console.log(sels);
              var temp = sels.map(v=>v.key)
              self.setState({
                saveKeys1:temp,
              })
            },
            filterKey:[{title:'人员名称人员名称人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'}],
            textOption:{
                modalTitle:'选择品类',
                leftTitle:'品类结构',
                rightTitle:'品类列表',
                leftTransferText:'待选品类',
                rightTransferText:'已选品类',
                leftInfo:[{text:'流水号',key:'refname'},{text:'品类编码',key:'refname'},{text:'品类描述',key:'refname'}],
                rightInfo:[{text:'流水号',key:'refname'},{text:'品类编码',key:'refname'},{text:'品类描述',key:'refname'}],
            }
        }
        const option2 = {
            title:'',
            refType:6,//1:树形 2.单表 3.树卡型 4.多选 5.default
            className:'',
            param:{//url请求参数
                refCode:'common_ref',
                tenantId:'',
                sysId:'',
                transmitParam:'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
            },
            refModelUrl:{
                TreeUrl:'/newref/rest/iref_ctr/blobRefTree', //树请求
                TableBodyUrl:'/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求//ref/rest/iref_ctr/blobRefTreeGrid
                TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求ref/rest/iref_ctr/refInfo
            },
            filterRefUrl:'/iuap_pap_quickstart/common/filterRef',//get
            keyList:self.state.saveKeys2,//选中的key
            // checkedArray: [],
            onCancel: function (p) {
              console.log(p)
            },
            onSave: function (sels) {
              console.log(sels);
              var temp = sels.map(v=>v.key)
              self.setState({
                saveKeys2:temp,
              })
            },
            filterKey:[{title:'人员名称人员名称人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'},{title:'人员名称',key:'peoname'}],
            textOption:{
                modalTitle:'选择品类',
                leftTitle:'品类结构',
                rightTitle:'品类列表',
                leftTransferText:'待选品类',
                rightTransferText:'已选品类',
                leftInfo:[{text:'流水号',key:'refname'},{text:'品类编码',key:'refname'},{text:'品类描述',key:'refname'}],
                rightInfo:[{text:'流水号',key:'refname'},{text:'品类编码',key:'refname'},{text:'品类描述',key:'refname'}],
            }
        }

        return (
            <div className="ref-page">
                <h2>参照示例:</h2>
                <div>穿梭框</div>
                <RefWithInput option={option1} disabled={false}/>
                <div>穿梭框选中数据:{this.state.saveKeys1}</div>

                <div>多过滤</div>
                <RefWithInput option={option2} disabled={false}/>
                <div>多过滤选中数据:{this.state.saveKeys2}</div>
            </div>
        );
    }
}

export default RefTransfer;
