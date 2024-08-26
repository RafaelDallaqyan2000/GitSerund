import {HANDLE_AUTH_CHANGE} from "../types";

export const handleAuthChange = (key, value) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_AUTH_CHANGE,
            payload: {
                key,
                value,
            },
        });
    };
};