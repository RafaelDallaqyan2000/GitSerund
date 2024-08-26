import {
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
} from "../types";
import Api from "../../../Api/ApiComments";

export function deleteComment(params) {
    const {id, parentCommentId} = params;
    return async (dispatch) => {
        try {
            dispatch({
                type: DELETE_COMMENT_REQUEST,
                payload: {status: 'request'}
            });

            const {data} = await Api.deleteComment(id);

            if(data.success !== true) throw new Error();

            dispatch({
                type: DELETE_COMMENT_SUCCESS,
                payload: {
                    status: 'success',
                    deletedComId: id,
                    parentCommentId
                },
            });
        } catch (e) {
            dispatch({
                type: DELETE_COMMENT_FAILURE,
                payload: {
                    status: 'fail'
                },
            });
        }
    }
}
