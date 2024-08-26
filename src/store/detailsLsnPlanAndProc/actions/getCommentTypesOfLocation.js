import {
    GET_COMMENT_TYPES_OF_LOCATION_REQUEST,
    GET_COMMENT_TYPES_OF_LOCATION_SUCCESS,
    GET_COMMENT_TYPES_OF_LOCATION_FAILURE,
} from "../types";
import Api from "../../../Api/ApiComments";

export function getCommentTypesOfLocation() {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_COMMENT_TYPES_OF_LOCATION_REQUEST,
                payload: {status: 'request'}
            });

            const {data} = await Api.getCommentTypesOfLocation();

            dispatch({
                type: GET_COMMENT_TYPES_OF_LOCATION_SUCCESS,
                payload: {
                    status: 'success',
                    commentTypesOfLocation: data.types,
                },
            });
        } catch (e) {
            dispatch({
                type: GET_COMMENT_TYPES_OF_LOCATION_FAILURE,
                payload: {
                    status: 'fail'
                },
            });
        }
    }
}
