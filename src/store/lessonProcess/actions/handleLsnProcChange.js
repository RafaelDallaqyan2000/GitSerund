import {HANDLE_CHANGE_LSN_PROC} from "../types";

export const handleLsnProcChange = (key, value) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_CHANGE_LSN_PROC,
            payload: {
                key,
                value,
            },
        });
    };
};