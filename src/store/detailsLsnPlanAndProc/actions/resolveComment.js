import {
    RESOLVE_COMMENT_REQUEST,
    RESOLVE_COMMENT_SUCCESS,
    RESOLVE_COMMENT_FAILURE,
} from "../types";
import ApiComments from "../../../Api/ApiComments";

export function resolveComment(commentId, lessonPlanId) {
    return async (dispatch) => {
        try {
            dispatch({
                type: RESOLVE_COMMENT_REQUEST,
                payload: {status: 'request'}
            });

            await ApiComments.commentResolve(commentId, lessonPlanId);

            dispatch({
                type: RESOLVE_COMMENT_SUCCESS,
                payload: {
                    status: 'success',
                    resolveComId: commentId,
                },
            });
        } catch (e) {
            dispatch({
                type: RESOLVE_COMMENT_FAILURE,
                payload: {
                    status: 'fail'
                },
            });
        }
    }
}