import { RESET_COMMENTS } from "../types";

export function resetComments(page) {
    return async (dispatch) => {
        dispatch({
            type: RESET_COMMENTS,
            payload: {page: page || 1}
        });
    }
}
