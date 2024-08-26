import {
    GET_COMMENT_TYPES_REQUEST,
    GET_COMMENT_TYPES_SUCCESS,
    GET_COMMENT_TYPES_FAILURE,
} from "../types";
import Api from "../../../Api/ApiComments";

export function getCommentTypes() {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_COMMENT_TYPES_REQUEST,
                payload: {status: 'request'}
            });

            const {data} = await Api.getCommentTypes();

            dispatch({
                type: GET_COMMENT_TYPES_SUCCESS,
                payload: {
                    status: 'success',
                    commentTypes: data.types,
                },
            });
        } catch (e) {
            dispatch({
                type: GET_COMMENT_TYPES_FAILURE,
                payload: {
                    status: 'fail'
                },
            });
        }
    }
}
