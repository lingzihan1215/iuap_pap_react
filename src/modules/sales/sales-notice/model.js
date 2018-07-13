import { actions } from 'mirrorx'
import * as api from './service'
import { processData } from 'utils';

export default {
    name: "salesNotice",
    initialState: {
        customerCode: "",
        customerInfo: {
            customerName: "",
            cradit: "",
            total: ""
        },
        rowData:{},
        showLoading:false,
        list: [],
        orderTypes:[],
        pageIndex:1,
        pageSize:10,
        totalPages:1,
        selectData: [],
        searchParam:{},
        tableEditedData: []
    },
    reducers: {
        updateState(state, data) { 
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {
        async searchCustomerInfo(param, getState){
            // 调用 getList 请求数据
            let res = processData(await api.getSalesInfo(param));

            actions.salesNotice.updateState({
                customerInfo: res.customerInfo,
                list: res.content,
                totalPages: res.totalPages
            })
        },
        
        postAllData({formData, tableEditedData}){
            return processData(api.createSalesNotice({
                table: formData,
                form: tableEditedData
            }))
        }
    }
}
