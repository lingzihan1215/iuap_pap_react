
import { actions } from "mirrorx";
import services, { getList } from "./service";

export default {
    name: "dashboard",
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
    // 异步操作，
    effects: {
        async getInfoData(data, getState){
            let initState = getState().dashboard;
          
            actions.dashboard.updateData({
                title: "新供应商门户"
            })

            return getList()
        }
    }
}