import { HANDLE_ADMIN_PAGE_CHANGE } from "../types";

export const changeAdminPageProperty = (key, value) => {

    return (dispatch) => {
        dispatch({
            type: HANDLE_ADMIN_PAGE_CHANGE,
            payload: {
                key,
                value,
            },
        });
    };
};
