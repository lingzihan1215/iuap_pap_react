import { actions } from 'mirrorx'
import * as api from './service'
import { processData } from 'utils';

export default {
    name: "salesNotice",
    initialState: {
        customerCode: "",
        customerInfo: {
            customerName: "华新丽华",
            edu: "1000,00"
        }
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
                customerInfo: res.customerInfo
            })
        }
    }
}
