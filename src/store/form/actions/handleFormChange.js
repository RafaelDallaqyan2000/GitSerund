import {HANDLE_FORM_CHANGE} from "../types";

export const handleFormChange = (key, value) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_FORM_CHANGE,
            payload: {
                key,
                value,
            },
        });
    };
};
