import {
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAILURE,
} from "../types";
import Api from "../../../Api/ApiComments";
import store from '../../../store';

export function getCommentList(params) {
    const {
        lessonPlanId,
        typeId,
        userMethodId,
        rowCount,
        page,
    } = params;

    return async (dispatch) => {
        try {
            const isFetching = store.getState().detailsLsnPlanAndProcReducer.status === 'request';

            if(isFetching) return;

            dispatch({
                type: GET_COMMENTS_REQUEST,
                payload: {status: 'request'}
            });

            const {data} = await Api.getComments({
                lessonPlanId,
                typeId,
                userMethodId,
                rowCount,
                page,
            });

            dispatch({
                type: GET_COMMENTS_SUCCESS,
                payload: {
                    status: 'success',
                    comments: data.data,
                    page
                },
            });
        } catch (e) {
            dispatch({
                type: GET_COMMENTS_FAILURE,
                payload: {
                    status: 'fail'
                },
            });
        }
    }
}
