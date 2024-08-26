import {HANDLE_HOME_CHANGE} from "../types";

export const handleHomeChange = (key, value) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_HOME_CHANGE,
            payload: {
                key,
                value,
            },
        });
    };
};
