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
            let { customerCredit, customerCreditDetailList} = processData(await api.getSalesInfo(param));
            // let { userName, creditLine,totalCredit,saleValue,accountsReceivable,
            //     specialLiabilities, unmadeDelivery, tax,overdue,creditDisclosure} = customerCredit;

            actions.salesNotice.updateState({
                // userName,
                // creditLine,
                // totalCredit,
                // saleValue,
                // accountsReceivable,
                // specialLiabilities,
                // unmadeDelivery,
                // tax,
                // overdue,
                // creditDisclosure,
                customerCredit: customerCredit,
                list: customerCreditDetailList
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
