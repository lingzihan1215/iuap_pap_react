
import { actions } from "mirrorx";
import { getList } from './service'

// store 数据源

export default {
    name: "manage",
    initialState: {
        name: "sany",
        title: "供应商门户"
    },
    // 纯函数，只负责如何修改数据。
    // 输入 -> 逻辑 -> 得到结果
    reducers: {
        updateData(state, data){
            console.log(data)
        
            return { ...state, ...data }
        }
    },
    effects: {
        async getInfoData(data, getState){
            
            let listData = await getList();
            let a = {};

            return getList()
        }
    }
}