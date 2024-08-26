import {CHANGE_COMMENT_PAGE} from "../types";

export function changeCommentPage(page) {
    return async (dispatch) => {
        dispatch({
            type: CHANGE_COMMENT_PAGE,
            payload: {
                page: page
            },
        });
    }
}
