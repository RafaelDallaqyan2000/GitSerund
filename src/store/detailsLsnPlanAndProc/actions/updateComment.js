import {
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAILURE,
} from "../types";
import Api from "../../../Api/ApiComments";

export function updateComment(params) {
    const {
        commentId,
        comment,
        commentTypeId,
        isAuthorAgree,
    } = params;

    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_COMMENT_REQUEST,
                payload: {status: 'request'}
            });

            const {data} = await Api.updateComment({
                commentId,
                comment,
                commentTypeId,
                isAuthorAgree,
            });

            if(data.success !== true) throw new Error();

            dispatch({
                type: UPDATE_COMMENT_SUCCESS,
                payload: {
                    status: 'success',
                    updatedComment: {
                        commentId,
                        comment,
                        commentTypeId
                    }
                },
            });
        } catch (e) {
            dispatch({
                type: UPDATE_COMMENT_FAILURE,
                payload: {
                    status: 'fail'
                },
            });
        }
    }
}
