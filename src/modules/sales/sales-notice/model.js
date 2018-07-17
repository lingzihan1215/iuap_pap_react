import { actions } from 'mirrorx'
import * as api from './service'
import { processData } from 'utils';

export default {
    name: "salesNotice",
    initialState: {
        customerCredit: {},
        rowData:{},
        showLoading:false,
        list: [],
        orderTypes:[],
        pageIndex:1,
        pageSize:10,
        totalPages:1,
        selectData: [],
        tableEditedData: [],
        search_id: ""
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
            let { entity, customerCreditDetailList} = processData(await api.getSalesInfo(param));
        
            actions.salesNotice.updateState({
                customerCredit: entity,
                list: customerCreditDetailList
            })

        },
        
        async postAllData(param, getState){
           
            return await api.createSalesNotice({
                sublist: {
                    saleOrderDetailList: param.tableEditedData
                },
                entity: param.formData
            })
        }
    }
}
