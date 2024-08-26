import {
    GET_USER_COMMENTS_REQUEST,
    GET_USER_COMMENTS_SUCCESS,
    GET_USER_COMMENTS_FAILURE,
} from "../types";
import ApiProfile from "../../../Api/ApiProfile";

export function getUserComments(params) {
    let {userId, page, rowCount = 5} = params;
    page = parseInt(page) || 1;

    return async (dispatch) => {
        try {
            dispatch({
                type: GET_USER_COMMENTS_REQUEST,
                payload: {status: "request"},
            });

            const {data} = await ApiProfile.getComments(userId, page, rowCount);

            dispatch({
                type: GET_USER_COMMENTS_SUCCESS,
                payload: {
                    status: "success",
                    comments: [...data.data.comments],
                    count: data.data.count,
                    rowCount
                },
            });
        } catch (e) {
            dispatch({
                type: GET_USER_COMMENTS_FAILURE,
                payload: {
                    status: "fail",
                },
            });
        }
    };
}
