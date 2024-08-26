import {ACTION_SAVED_VALUE} from "../types";

export const actionSaved = (value) => {
    return {
        type : ACTION_SAVED_VALUE,
        payload : {
            actionSavedValue : value
        }
    }
}