import {
    GET_ALL_COMMENTS_REQUEST,
    GET_ALL_COMMENTS_SUCCESS,
    GET_ALL_COMMENTS_FAILURE,
} from "../types";
import ApiComments from "../../../Api/ApiComments";

export function getAllLessonPlanComments(params) {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_ALL_COMMENTS_REQUEST,
                payload: {status: 'request'}
            });

            const {data} = await ApiComments.getAllLessonPlanComments(params);

            dispatch({
                type: GET_ALL_COMMENTS_SUCCESS,
                payload: {
                    status: 'success',
                    comments: data.data,
                },
            });
        } catch (e) {
            dispatch({
                type: GET_ALL_COMMENTS_FAILURE,
                payload: {
                    status: 'fail'
                },
            });
        }
    }
}
