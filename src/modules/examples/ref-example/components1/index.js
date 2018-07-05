import React, { Component } from 'react';

import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './style.css'

const option = {
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
        TreeUrl:'http://10.10.24.43:8080/newref/rest/iref_ctr/blobRefTree', //树请求
        TableBodyUrl:'/tablebody',//表体请求
        TableBarUrl:'/tablebar',//表头请求
    },
    filterRefUrl:'/iuap_pap_quickstart/filterRef',//get
    keyList:[],//选中的key
    // checkedArray: [],
    onCancel: function (p) {
      console.log(p)
    },
    onSave: function (sels) {
      console.log(sels);
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


class RefTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveKeys:[]
        };

    }
    render() {
        var self = this;
        const option = {
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
                TreeUrl:'http://10.10.24.43:8080/newref/rest/iref_ctr/blobRefTree', //树请求
                TableBodyUrl:'/tablebody',//表体请求
                TableBarUrl:'/tablebar',//表头请求
            },
            filterRefUrl:'/iuap_pap_quickstart/filterRef',//get
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
                参照示例:
                <RefWithInput option={option}/>
            </div>
        );
    }
}

export default RefTransfer;
