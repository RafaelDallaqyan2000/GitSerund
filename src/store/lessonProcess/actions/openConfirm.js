import {OPEN_CONFIRM_ACTION} from "../types";

export const openConfirm = (value) => {
    return {
        type: OPEN_CONFIRM_ACTION,
        payload: {
            openConfirmValue : value
        }
    };
};