import { HANDLE_LSN_PLAN_AND_LSN_PROC } from "../types";

export const handleLsnPlanAndLsnProcChange = (key, value) => {

    return (dispatch) => {
        dispatch({
            type: HANDLE_LSN_PLAN_AND_LSN_PROC,
            payload: {
                key,
                value,
            },
        });
    };
};
