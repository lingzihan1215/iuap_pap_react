
import { actions } from "mirrorx";
import services, { getList } from "./service";

export default {
    name: "dashboard",
    initState: {
        name: "sany"
    },
    reducers: {
        addData(state, data){
            return { ...state, ...data }
        }
    },
    effects: {
        async getInfoData(param){
            return getList()
        }
    }
}