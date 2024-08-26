import { RESET_USER_DATA } from "../types";

export function resetUser() {
    return async (dispatch) => {
        dispatch({
            type: RESET_USER_DATA,
        });
    };
}
