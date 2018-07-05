import { actions } from 'mirrorx';
import * as api from "./service.js";

export default {
    name: "upload",
    initialState: {

    },
    reducers: {
        save(state, data) {
            return {
                ...state,
                ...data
            }
        }
    },
    effects: {
        async upload(data, getState) {

        }
    }
}