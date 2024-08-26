import { ADD_REPLY_COMMENT } from "../types";

export function addReplyComment(params) {
    const {lastReplyDate, commentId} = params;

    return async (dispatch) => {
        dispatch({
            type: ADD_REPLY_COMMENT,
            payload: {
                commentId,
                lastReplyDate,
            }
        });
    };
}
