import {METHOD_AND_ACTION_INDEX} from "../types";

export const methodAndActionIndex = (proc, methodIndexInAction, actionIndexInAction) => {
    return {
        type : METHOD_AND_ACTION_INDEX,
        payload : {
            proc,
            methodIndexInAction,
            actionIndexInAction
        }
    }
}