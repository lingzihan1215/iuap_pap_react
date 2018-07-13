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
        searchParam: {},
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
            let res = processData(await api.getSalesInfo(param));

            actions.salesNotice.updateState({
                customerInfo: res.customerInfo,
                list: res.content,
                totalPages: res.totalPages
            })
        },
        
        async postAllData(param, getState){
            return await api.createSalesNotice({
                table: param.tableEditedData,
                form: param.formData
            })
        }
    }
}
