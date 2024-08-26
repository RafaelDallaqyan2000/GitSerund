import {ACTION_AND_METHOD_ID} from "../types";

export const setActionAndMethodId = (actionId, methodId, order) => {
    return {
        type : ACTION_AND_METHOD_ID,
        payload : {
            actionId,
            methodId,
            order
        }
    }
}